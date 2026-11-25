import React, { useEffect, useId, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import api from '../../utils/api'
import { API_ENDPOINTS, METHOD_TYPE } from '../../utils/apiUrls'
import { submitAnswerFeedback } from '../../screens/frruitGPT/slice'
import { StatusBadge } from './Badges'
import { ChevronIcon, ThumbDownIcon, ThumbUpIcon } from './icons'
import { FEEDBACK_REASONS, STATUS_INFO, UNCERTAIN_REASON_TEXT, percent } from './answerData'
import './Answer.scss'

const DEFAULT_THRESHOLD = 0.6

const FACTORS = [
    { key: 'support', label: 'Claims backed by their sources' },
    { key: 'coverage', label: 'Statements that cite a source' },
    { key: 'retrieval', label: 'Strength of the sources found' },
]

const VERDICT_LABELS = {
    supported: 'supported',
    partial: 'partly supported',
    unsupported: 'not supported',
    uncited: 'without a citation',
    web: 'backed by web pages',
    general: 'general statements',
}

const clampPercent = (value) => percent(Math.min(1, Math.max(0, Number(value) || 0)))

// Support / coverage / retrieval behind the confidence score, against the pass threshold
function ConfidenceBreakdown({ confidence, detail }) {
    const threshold = detail.threshold ?? DEFAULT_THRESHOLD
    const verdicts = Object.entries(detail.verdicts || {})
        .filter(([, count]) => count > 0)
        .map(([verdict, count]) => `${count} ${VERDICT_LABELS[verdict] || verdict}`)

    return (
        <div className="confidence-breakdown">
            {confidence != null && (
                <div className="confidence-factor is-total">
                    <div className="confidence-factor-head">
                        <span><strong>Overall confidence</strong> · {percent(threshold)} needed to pass</span>
                        <span className="confidence-factor-value">{percent(confidence)}</span>
                    </div>
                    <div className="confidence-bar" aria-hidden="true">
                        <span className={confidence < threshold ? 'is-low' : ''} style={{ width: clampPercent(confidence) }} />
                        <i className="confidence-threshold" style={{ left: clampPercent(threshold) }} />
                    </div>
                </div>
            )}
            {FACTORS.filter(f => detail[f.key] != null).map(f => (
                <div className="confidence-factor" key={f.key}>
                    <div className="confidence-factor-head">
                        <span>
                            {f.label}
                            {detail.weights?.[f.key] != null && <span className="confidence-weight"> · {percent(detail.weights[f.key])} of the score</span>}
                        </span>
                        <span className="confidence-factor-value">{percent(detail[f.key])}</span>
                    </div>
                    <div className="confidence-bar" aria-hidden="true">
                        <span style={{ width: clampPercent(detail[f.key]) }} />
                    </div>
                </div>
            ))}
            {detail.claims > 0 && (
                <div className="answer-details-muted">
                    {detail.claims} {detail.claims === 1 ? 'statement' : 'statements'} checked
                    {detail.verifier ? ` by ${detail.verifier}` : ''}
                    {verdicts.length ? `: ${verdicts.join(', ')}` : ''}.
                </div>
            )}
        </div>
    )
}

// Review status, confidence (with its breakdown) and thumbs up / down for one answer
function AnswerMeta({ info }) {
    const dispatch = useDispatch()
    const answerId = info?.answerId
    // Feedback sent in this session (rating + the status it produced), by answer id
    const saved = useSelector(state => (answerId ? state.fruitGPTSlice.answerFeedback?.[answerId] : undefined))
    const [showDetails, setShowDetails] = useState(false)
    const [fetched, setFetched] = useState({ state: 'idle', detail: null })
    const [formOpen, setFormOpen] = useState(false)
    const [reason, setReason] = useState('')
    const [comment, setComment] = useState('')
    const [sending, setSending] = useState(null)
    const reasonRef = useRef(null)
    const uid = useId()

    useEffect(() => {
        if (formOpen) reasonRef.current?.focus()
    }, [formOpen])

    if (!answerId) return null

    const status = saved?.status || info.status
    const rating = saved?.rating || info.myRating
    const statusInfo = STATUS_INFO[status]
    const detail = info.detail || fetched.detail
    const threshold = detail?.threshold ?? DEFAULT_THRESHOLD
    const hasConfidence = info.confidence != null
    const detailsId = `${uid}-details`
    const formId = `${uid}-form`

    const toggleDetails = () => {
        const opening = !showDetails
        setShowDetails(opening)
        // History rows carry no score breakdown: fetch it from the answer record when first opened
        if (opening && !detail && fetched.state === 'idle') {
            setFetched({ state: 'loading', detail: null })
            api({ method: METHOD_TYPE.get, url: `${API_ENDPOINTS.answers}${answerId}` })
                .then(res => setFetched({ state: 'done', detail: res?.data?.data?.confidence_detail || null }))
                .catch(() => setFetched({ state: 'done', detail: null }))
        }
    }

    const sendFeedback = (payload) => {
        setSending(payload.rating)
        return dispatch(submitAnswerFeedback({ answerId, ...payload }))
            .unwrap()
            .then(result => {
                toast.success(payload.rating === 'down'
                    ? 'Thanks. The answer was sent back for a reviewer to correct.'
                    : 'Thanks for the feedback!')
                return result
            })
            .catch(message => {
                toast.error(typeof message === 'string' ? message : 'Could not send your feedback. Please try again.')
                throw message
            })
            .finally(() => setSending(null))
    }

    const rateUp = () => {
        if (rating === 'up' || sending) return
        setFormOpen(false)
        sendFeedback({ rating: 'up' }).catch(() => { })
    }

    const submitDown = (e) => {
        e.preventDefault()
        if (!reason || sending) return
        sendFeedback({ rating: 'down', reason, comment: comment.trim() })
            .then(() => {
                setFormOpen(false)
                setComment('')
            })
            .catch(() => { })
    }

    return (
        <div className="answer-meta">
            <div className="answer-meta-row">
                <div className="answer-meta-status">
                    <StatusBadge status={status} />
                    {(hasConfidence || statusInfo) && (
                        <button
                            type="button"
                            className={`answer-confidence-toggle ${hasConfidence && info.confidence < threshold ? 'is-low' : ''} ${showDetails ? 'is-open' : ''}`}
                            aria-expanded={showDetails}
                            aria-controls={detailsId}
                            onClick={toggleDetails}
                        >
                            {hasConfidence ? `Confidence ${percent(info.confidence)}` : 'Details'}
                            <ChevronIcon size={12} />
                        </button>
                    )}
                </div>
                <div className="answer-feedback" role="group" aria-label="Rate this answer">
                    <button
                        type="button"
                        className={`answer-feedback-btn is-up ${rating === 'up' ? 'is-active' : ''}`}
                        aria-pressed={rating === 'up'}
                        aria-label="Helpful"
                        title="Helpful"
                        onClick={rateUp}
                        disabled={!!sending}
                    >
                        <ThumbUpIcon />
                    </button>
                    <button
                        type="button"
                        className={`answer-feedback-btn is-down ${rating === 'down' ? 'is-active' : ''}`}
                        aria-expanded={formOpen}
                        aria-controls={formId}
                        aria-label={rating === 'down' ? 'Marked not helpful. Edit your feedback' : 'Not helpful'}
                        title="Not helpful"
                        onClick={() => setFormOpen(open => !open)}
                        disabled={!!sending}
                    >
                        <ThumbDownIcon />
                    </button>
                </div>
            </div>

            {showDetails && (
                <div className="answer-details" id={detailsId}>
                    {statusInfo && (
                        <div className="answer-details-status"><strong>{statusInfo.label}.</strong> {statusInfo.hint}</div>
                    )}
                    {info.reasons.length > 0 && (
                        <div className="answer-details-reasons">
                            <div className="answer-details-subtitle">Why the source check failed</div>
                            <div role="list" className="answer-details-list">
                                {info.reasons.map(r => <div role="listitem" key={r}>{UNCERTAIN_REASON_TEXT[r] || r}</div>)}
                            </div>
                        </div>
                    )}
                    {detail ? (
                        <ConfidenceBreakdown confidence={info.confidence} detail={detail} />
                    ) : fetched.state === 'loading' ? (
                        <div className="answer-details-muted">Loading the score breakdown…</div>
                    ) : hasConfidence ? (
                        <div className="answer-details-muted">A score breakdown isn't available for this answer.</div>
                    ) : null}
                </div>
            )}

            {formOpen && (
                <form className="answer-feedback-form" id={formId} onSubmit={submitDown} aria-label="Report a problem with this answer">
                    <div className="answer-feedback-form-title">What's wrong with this answer?</div>
                    <label className="answer-field-label" htmlFor={`${uid}-reason`}>Reason</label>
                    <select
                        id={`${uid}-reason`}
                        ref={reasonRef}
                        className="answer-field"
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        required
                    >
                        <option value="" disabled>Choose a reason</option>
                        {FEEDBACK_REASONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                    <label className="answer-field-label" htmlFor={`${uid}-comment`}>
                        Comment <span className="answer-field-optional">(optional)</span>
                    </label>
                    <textarea
                        id={`${uid}-comment`}
                        className="answer-field"
                        rows={3}
                        maxLength={2000}
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="What should it have said, or which source is wrong?"
                    />
                    <div className="answer-feedback-form-actions">
                        <button type="button" className="answer-btn is-secondary" onClick={() => setFormOpen(false)}>Cancel</button>
                        <button type="submit" className="answer-btn is-primary" disabled={!reason || !!sending}>
                            {sending === 'down' ? 'Sending…' : 'Send feedback'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default AnswerMeta
