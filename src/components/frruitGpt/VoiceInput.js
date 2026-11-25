import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../utils/api'
import { API_ENDPOINTS, METHOD_TYPE } from '../../utils/apiUrls'
import { getChatLanguage, languageName } from '../../utils/languages'
import './VoiceInput.scss'

// Answer-language codes (LanguageSelect) → speech recognition locales. "auto" listens for Indian English.
const SPEECH_LOCALES = {
    auto: 'en-IN', en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN', gu: 'gu-IN', bn: 'bn-IN', ta: 'ta-IN',
    te: 'te-IN', kn: 'kn-IN', ml: 'ml-IN', pa: 'pa-IN', or: 'or-IN', ur: 'ur-IN',
    es: 'es-ES', fr: 'fr-FR', de: 'de-DE', ar: 'ar-SA', zh: 'zh-CN', ja: 'ja-JP',
}

// Fallback recording formats, in order of preference (Firefox records ogg/webm, Safari mp4)
const RECORDER_TYPES = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/ogg', 'audio/mp4']
const MAX_RECORDING_MS = 60 * 1000

const SpeechRecognitionApi = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null
const canRecord = typeof window !== 'undefined' && !!window.MediaRecorder && !!navigator.mediaDevices?.getUserMedia

const MIC_BLOCKED = "Microphone access is blocked. Allow it in your browser's site settings to use voice input."
const NO_MIC = 'No microphone was found. Connect one and try again.'
const NOTHING_HEARD = "Didn't catch that. Try speaking again."

// What was typed before the mic was turned on, then what was heard
const joinText = (before, heard) => [before.trim(), heard.trim()].filter(Boolean).join(' ')

const MicIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0" />
        <path d="M12 18v3" />
    </svg>
)

// Mic button next to send: Web Speech API where available (live transcript into the input box),
// otherwise records audio and has the server transcribe it. The user reviews the text and presses send.
function VoiceInput({ value = '', onChange = () => { }, disabled = false, className = '' }) {
    const [state, setState] = useState('idle') // idle | listening | transcribing
    const recognitionRef = useRef(null)
    const recorderRef = useRef(null)
    const streamRef = useRef(null)
    const timerRef = useRef(null)
    const baseTextRef = useRef('')
    const mountedRef = useRef(true)
    // True when the current recording should be thrown away instead of transcribed
    const discardRef = useRef(false)
    // Set when the browser has the Speech API but its service is unusable (e.g. Brave)
    const useRecorderRef = useRef(!SpeechRecognitionApi)
    const onChangeRef = useRef(onChange)
    onChangeRef.current = onChange
    const disabledRef = useRef(disabled)
    disabledRef.current = disabled

    const releaseMic = () => {
        clearTimeout(timerRef.current)
        streamRef.current?.getTracks().forEach(track => track.stop())
        streamRef.current = null
    }

    const stop = () => {
        if (recognitionRef.current) recognitionRef.current.stop()
        else if (recorderRef.current && recorderRef.current.state !== 'inactive') recorderRef.current.stop()
    }

    // The question was sent while the mic was on: drop what is still pending so the
    // transcript doesn't refill the input box that was just cleared
    useEffect(() => {
        if (!disabled) return
        if (recognitionRef.current) {
            recognitionRef.current.onresult = null
            recognitionRef.current.abort()
        }
        if (recorderRef.current && recorderRef.current.state !== 'inactive') {
            discardRef.current = true
            recorderRef.current.stop()
        }
    }, [disabled])

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
            if (recognitionRef.current) {
                recognitionRef.current.onresult = null
                recognitionRef.current.onend = null
                recognitionRef.current.onerror = null
                recognitionRef.current.abort()
            }
            if (recorderRef.current && recorderRef.current.state !== 'inactive') recorderRef.current.stop()
            releaseMic()
        }
    }, [])

    const speechError = (error, code) => {
        switch (error) {
            case 'aborted':
                return
            case 'no-speech':
                toast.info(NOTHING_HEARD)
                return
            case 'not-allowed':
                toast.error(MIC_BLOCKED)
                return
            case 'audio-capture':
                toast.error(NO_MIC)
                return
            case 'network':
            case 'service-not-allowed':
            case 'language-not-supported':
                if (canRecord) {
                    useRecorderRef.current = true
                    toast.info("This browser's speech service isn't available. Tap the mic again to record, and Frruit will transcribe it.")
                } else {
                    toast.error(error === 'language-not-supported'
                        ? `Voice input isn't available for ${languageName(code)} in this browser.`
                        : 'Voice input needs an internet connection. Please try again.')
                }
                return
            default:
                toast.error('Voice input stopped unexpectedly. Please try again.')
        }
    }

    const startRecognition = () => {
        const code = getChatLanguage()
        const recognition = new SpeechRecognitionApi()
        recognition.lang = SPEECH_LOCALES[code] || 'en-IN'
        recognition.interimResults = true
        // Android Chrome repeats results in continuous mode; there one phrase per tap works best
        recognition.continuous = !/Android/i.test(navigator.userAgent)
        recognition.maxAlternatives = 1
        recognition.onresult = (event) => {
            const heard = Array.from(event.results).map(result => result[0]?.transcript?.trim()).filter(Boolean).join(' ')
            onChangeRef.current(joinText(baseTextRef.current, heard))
        }
        recognition.onerror = (event) => speechError(event.error, code)
        recognition.onend = () => {
            recognitionRef.current = null
            if (mountedRef.current) setState('idle')
        }
        baseTextRef.current = value
        recognitionRef.current = recognition
        try {
            recognition.start()
            setState('listening')
        } catch {
            recognitionRef.current = null
            toast.error('Voice input could not start. Please try again.')
        }
    }

    const transcribe = async (blob) => {
        setState('transcribing')
        const code = getChatLanguage()
        try {
            const response = await api({
                method: METHOD_TYPE.post,
                url: `${API_ENDPOINTS.voiceTranscribe}${code && code !== 'auto' ? `?language=${encodeURIComponent(code)}` : ''}`,
                data: blob,
                headers: { 'Content-Type': blob.type || 'audio/webm' },
            })
            const text = response?.data?.data?.text?.trim()
            if (disabledRef.current) return
            if (text) onChangeRef.current(joinText(baseTextRef.current, text))
            else toast.info(NOTHING_HEARD)
        } catch (error) {
            const status = error?.response?.status
            if (status === 503) toast.error("Voice input isn't set up on the server yet. Please type your question.")
            else if (status === 413) toast.error('That recording is too long. Try a shorter question.')
            else toast.error(error?.response?.data?.message || 'Could not transcribe your recording. Please try again.')
        } finally {
            if (mountedRef.current) setState('idle')
        }
    }

    const startRecording = async () => {
        let stream
        try {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        } catch (error) {
            if (['NotAllowedError', 'SecurityError', 'PermissionDeniedError'].includes(error?.name)) toast.error(MIC_BLOCKED)
            else if (['NotFoundError', 'DevicesNotFoundError', 'OverconstrainedError'].includes(error?.name)) toast.error(NO_MIC)
            else if (error?.name === 'NotReadableError') toast.error('Your microphone is being used by another app.')
            else toast.error('Could not start the microphone. Please try again.')
            return
        }
        if (!mountedRef.current) {
            stream.getTracks().forEach(track => track.stop())
            return
        }

        const mimeType = RECORDER_TYPES.find(type => window.MediaRecorder.isTypeSupported?.(type)) || ''
        let recorder
        try {
            recorder = new window.MediaRecorder(stream, mimeType ? { mimeType } : undefined)
        } catch {
            stream.getTracks().forEach(track => track.stop())
            toast.error('Recording is not supported in this browser.')
            return
        }

        const chunks = []
        recorder.ondataavailable = (event) => {
            if (event.data?.size) chunks.push(event.data)
        }
        recorder.onstop = () => {
            recorderRef.current = null
            releaseMic()
            if (!mountedRef.current) return
            if (discardRef.current) {
                discardRef.current = false
                setState('idle')
                return
            }
            const blob = new Blob(chunks, { type: recorder.mimeType || mimeType || 'audio/webm' })
            if (!blob.size) {
                setState('idle')
                toast.info(NOTHING_HEARD)
                return
            }
            transcribe(blob)
        }

        baseTextRef.current = value
        streamRef.current = stream
        recorderRef.current = recorder
        recorder.start()
        setState('listening')
        timerRef.current = setTimeout(() => {
            if (recorder.state !== 'inactive') recorder.stop()
        }, MAX_RECORDING_MS)
    }

    const handleClick = () => {
        if (state === 'transcribing') return
        if (state === 'listening') stop()
        else if (useRecorderRef.current) startRecording()
        else startRecognition()
    }

    if (!SpeechRecognitionApi && !canRecord) return null

    const label = state === 'listening' ? 'Stop voice input' : state === 'transcribing' ? 'Transcribing your recording' : 'Ask with your voice'

    return (
        <>
            <button
                type="button"
                className={`voice-input-btn is-${state} ${className}`}
                onClick={handleClick}
                disabled={(disabled && state === 'idle') || state === 'transcribing'}
                aria-label={label}
                aria-pressed={state === 'listening'}
                title={label}
            >
                {state === 'transcribing' ? <span className="voice-input-spinner" aria-hidden="true" /> : <MicIcon />}
            </button>
            <span className="visually-hidden" role="status" aria-live="polite">
                {state === 'listening' ? 'Listening. Press the mic button again to stop.' : state === 'transcribing' ? 'Transcribing your recording.' : ''}
            </span>
        </>
    )
}

export default VoiceInput
