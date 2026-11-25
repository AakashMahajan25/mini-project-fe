import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import moment from 'moment'
import { toast } from 'react-toastify'
import api from '../../utils/api'
import { API_ENDPOINTS } from '../../utils/apiUrls'
import CloseImg from '../../assets/images/close_icon.png'
import {
    ACCEPT_ATTR, ACCEPTED_EXTENSIONS, absoluteUrl, apiErrorMessage, extensionOf,
    fileTypeLabel, fileTypeName, formatBytes, formatCount,
} from './documentUtils'
import './Documents.scss'

const POLL_MS = 2000
const DEFAULT_MAX_MB = 20
const FINISHED_UPLOAD_VISIBLE_MS = 4000

const STATUS = {
    pending: { label: 'Queued', className: 'queued' },
    processing: { label: 'Processing…', className: 'processing' },
    ready: { label: 'Ready', className: 'ready' },
    failed: { label: 'Failed', className: 'failed' },
}

const isBusy = (doc) => doc.status === 'pending' || doc.status === 'processing'

const HOW_IT_WORKS = [
    { title: 'Text is extracted page by page', body: 'Every page is read and kept with its page number. Scanned, image-only PDFs have no text to read.' },
    { title: 'Split into sections', body: 'The text is cut into short, overlapping sections that remember their page and heading.' },
    { title: 'Embedded for search', body: 'Each section is turned into an embedding, so it can be found by meaning as well as by keywords.' },
    { title: 'Searchable in chat', body: 'Ask questions and get answers that cite the exact pages, like [S1] p. 12. Frruit Search uses your ready documents too.' },
]

// Toasts when a document finishes processing; `known` maps id → last seen status
const announceTransitions = (known, documents) => {
    documents.forEach(doc => {
        const before = known.get(doc.id)
        if (before && before !== doc.status && (before === 'pending' || before === 'processing')) {
            if (doc.status === 'ready') {
                toast.success(`"${doc.title}" is ready: ${formatCount(doc.chunk_count)} sections from ${formatCount(doc.page_count)} page${doc.page_count === 1 ? '' : 's'}`)
            } else if (doc.status === 'failed') {
                toast.error(`"${doc.title}" couldn't be processed`)
            }
        }
        known.set(doc.id, doc.status)
    })
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const UploadIcon = () => (
    <svg width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M12 15V4M7.5 8.5 12 4l4.5 4.5' /><path d='M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3' />
    </svg>
)
const FileIcon = () => (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z' /><path d='M14 3v5h5' />
    </svg>
)
const ExternalIcon = () => (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M14 4h6v6M20 4l-9 9' /><path d='M19 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4' />
    </svg>
)
const TrashIcon = () => (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13' />
    </svg>
)
const ChatIcon = () => (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.1A8 8 0 1 1 20 12z' /><path d='M9 10.5h6M9 13.5h4' />
    </svg>
)
const RetryIcon = () => (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M21 12a9 9 0 1 1-2.64-6.36' /><path d='M21 3v6h-6' />
    </svg>
)
const LibraryIcon = () => (
    <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M4 19.5V5a2 2 0 0 1 2-2h11v15H6a2 2 0 0 0-2 2zm0 0A1.5 1.5 0 0 0 5.5 21H20' /><path d='M8 7h6M8 10.5h4' />
    </svg>
)

// ─── Pieces ───────────────────────────────────────────────────────────────────
function FileBadge({ kind, filename, size = 'md' }) {
    const label = fileTypeLabel(kind, filename)
    const tone = label === 'PDF' ? 'pdf' : label.startsWith('DOC') ? 'word' : 'text'
    return (
        <span className={`file-badge ${tone} ${size}`} title={fileTypeName(label)}>
            <FileIcon />
            <span className='file-badge-label'>{label}</span>
            <span className='visually-hidden'>{fileTypeName(label)}</span>
        </span>
    )
}

function StatusChip({ status }) {
    const meta = STATUS[status] || { label: status, className: 'queued' }
    return <span className={`doc-status ${meta.className}`}>{meta.label}</span>
}

function UploadRow({ item, onDismiss }) {
    const finished = item.state === 'done' || item.state === 'duplicate'
    const label = {
        waiting: 'Waiting…',
        uploading: item.progress >= 100 ? 'Saving…' : `Uploading ${item.progress}%`,
        done: 'Uploaded, processing started',
        duplicate: 'Already in your library',
        error: item.error,
    }[item.state]
    return (
        <li className={`upload-row ${item.state}`}>
            <FileBadge filename={item.name} size='sm' />
            <div className='upload-main'>
                <div className='upload-name-line'>
                    <span className='upload-name' title={item.name}>{item.name}</span>
                    <span className='upload-size'>{formatBytes(item.size)}</span>
                </div>
                {item.state !== 'error' && (
                    <div
                        className='upload-track'
                        role='progressbar'
                        aria-label={`Upload progress for ${item.name}`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={finished ? 100 : item.progress}
                    >
                        <span className='upload-fill' style={{ width: `${finished ? 100 : item.progress}%` }} />
                    </div>
                )}
                <div className='upload-state'>{label}</div>
            </div>
            {(item.state === 'error' || finished) && (
                <button type='button' className='icon-btn' onClick={() => onDismiss(item.key)} aria-label={`Dismiss ${item.name}`} title='Dismiss'>
                    <span aria-hidden='true' className='dismiss-x'>×</span>
                </button>
            )}
        </li>
    )
}

function SkeletonRows() {
    return (
        <div className='doc-skeletons' aria-hidden='true'>
            {[0, 1, 2].map(i => <div key={i} className='doc-skeleton' />)}
        </div>
    )
}

// ═══════════════════════════════════════════════════════════════════════════════
function Documents() {
    const navigate = useNavigate()
    const [library, setLibrary] = useState(null) // { documents, seed, shared, maxMb }
    const [loading, setLoading] = useState(true)
    const [loadError, setLoadError] = useState(null)
    const [uploads, setUploads] = useState([])
    const [dragActive, setDragActive] = useState(false)
    const [askingId, setAskingId] = useState(null)
    const [retryingId, setRetryingId] = useState(null)
    const [toDelete, setToDelete] = useState(null)
    const [deleting, setDeleting] = useState(false)

    const fileInput = useRef(null)
    const mounted = useRef(true)
    const listInFlight = useRef(false)
    const mutationSeq = useRef(0) // bumped on local changes so an older list response can't undo them
    const knownStatus = useRef(new Map()) // id → last seen status, for "ready" / "failed" toasts
    const uploadQueue = useRef([])
    const uploading = useRef(false)
    const timers = useRef([])

    useEffect(() => {
        mounted.current = true
        const pendingTimers = timers.current
        return () => {
            mounted.current = false
            pendingTimers.forEach(clearTimeout)
        }
    }, [])

    const loadLibrary = useCallback(async ({ silent = false } = {}) => {
        if (listInFlight.current) return
        listInFlight.current = true
        try {
            // If an upload/retry/delete lands while the request is out, its answer may be stale: ask again
            for (let attempt = 0; attempt < 3; attempt++) {
                const seq = mutationSeq.current
                const res = await api.get(API_ENDPOINTS.documents)
                if (!mounted.current) return
                if (seq !== mutationSeq.current) continue
                const data = res.data?.data || {}
                const documents = data.documents || []
                announceTransitions(knownStatus.current, documents)
                setLibrary({
                    documents,
                    seed: data.seed_documents || [],
                    shared: data.shared || {},
                    maxMb: data.max_mb || DEFAULT_MAX_MB,
                })
                setLoadError(null)
                break
            }
        } catch (err) {
            if (mounted.current && !silent) setLoadError(apiErrorMessage(err, "Couldn't load your documents."))
        } finally {
            listInFlight.current = false
            if (mounted.current) setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadLibrary()
    }, [loadLibrary])

    // Poll while anything is queued or processing; stops on its own once everything settles
    const hasBusy = !!library?.documents.some(isBusy)
    useEffect(() => {
        if (!hasBusy) return
        const timer = setInterval(() => {
            if (!document.hidden) loadLibrary({ silent: true })
        }, POLL_MS)
        return () => clearInterval(timer)
    }, [hasBusy, loadLibrary])

    // Keep a file dropped next to the drop zone from opening in the browser tab
    useEffect(() => {
        const stop = (e) => {
            if (e.dataTransfer?.types?.includes('Files')) e.preventDefault()
        }
        window.addEventListener('dragover', stop)
        window.addEventListener('drop', stop)
        return () => {
            window.removeEventListener('dragover', stop)
            window.removeEventListener('drop', stop)
        }
    }, [])

    // ── Local library updates ──────────────────────────────────────────────────
    const mergeDocument = (doc) => {
        const { duplicate, ...clean } = doc
        mutationSeq.current += 1
        knownStatus.current.set(clean.id, clean.status)
        setLibrary(lib => {
            const base = lib || { documents: [], seed: [], shared: {}, maxMb: DEFAULT_MAX_MB }
            const exists = base.documents.some(d => d.id === clean.id)
            return {
                ...base,
                documents: exists
                    ? base.documents.map(d => (d.id === clean.id ? { ...d, ...clean } : d))
                    : [clean, ...base.documents],
            }
        })
    }

    const removeDocument = (id) => {
        mutationSeq.current += 1
        knownStatus.current.delete(id)
        setLibrary(lib => lib && { ...lib, documents: lib.documents.filter(d => d.id !== id) })
    }

    // ── Uploads (one at a time) ───────────────────────────────────────────────
    const patchUpload = (key, patch) => setUploads(list => list.map(u => (u.key === key ? { ...u, ...patch } : u)))

    const dismissUpload = (key) => setUploads(list => list.filter(u => u.key !== key))

    const uploadOne = async (item) => {
        patchUpload(item.key, { state: 'uploading', progress: 0 })
        try {
            const res = await api.post(API_ENDPOINTS.documents, item.file, {
                headers: {
                    'Content-Type': item.file.type || 'application/octet-stream',
                    'X-File-Name': encodeURIComponent(item.file.name),
                },
                onUploadProgress: (e) => {
                    if (!e.total) return
                    patchUpload(item.key, { progress: Math.min(100, Math.round((e.loaded / e.total) * 100)) })
                },
            })
            if (!mounted.current) return
            const doc = res.data?.data
            if (doc?.duplicate) {
                toast.info(`"${doc.title || item.name}" is already in your library`)
                patchUpload(item.key, { state: 'duplicate', progress: 100 })
            } else {
                patchUpload(item.key, { state: 'done', progress: 100 })
            }
            if (doc?.id) mergeDocument(doc)
            timers.current.push(setTimeout(() => {
                if (mounted.current) dismissUpload(item.key)
            }, FINISHED_UPLOAD_VISIBLE_MS))
        } catch (err) {
            if (mounted.current) patchUpload(item.key, { state: 'error', error: apiErrorMessage(err, 'Upload failed. Please try again.') })
        }
    }

    const drainQueue = async () => {
        if (uploading.current) return
        uploading.current = true
        while (uploadQueue.current.length && mounted.current) {
            await uploadOne(uploadQueue.current.shift())
        }
        uploading.current = false
    }

    const addFiles = (fileList) => {
        const files = Array.from(fileList || [])
        if (!files.length) return
        const maxMb = library?.maxMb || DEFAULT_MAX_MB
        const items = files.map((file, i) => {
            const ext = extensionOf(file.name)
            let error = null
            if (!ACCEPTED_EXTENSIONS.includes(ext)) error = 'Unsupported file type. Upload a PDF, Word (DOCX, DOC), TXT or Markdown file.'
            else if (file.size === 0) error = 'This file is empty.'
            else if (file.size > maxMb * 1024 * 1024) error = `This file is ${formatBytes(file.size)}. The limit is ${maxMb} MB.`
            return {
                key: `${Date.now()}-${i}-${file.name}`,
                file,
                name: file.name,
                size: file.size,
                progress: 0,
                state: error ? 'error' : 'waiting',
                error,
            }
        })
        setUploads(list => [...list, ...items])
        uploadQueue.current.push(...items.filter(item => item.state === 'waiting'))
        drainQueue()
    }

    const openPicker = () => fileInput.current?.click()

    const onPick = (e) => {
        addFiles(e.target.files)
        e.target.value = '' // lets the same file be picked again
    }

    const hasFiles = (e) => Array.from(e.dataTransfer?.types || []).includes('Files')

    const onDragOver = (e) => {
        if (!hasFiles(e)) return
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
        if (!dragActive) setDragActive(true)
    }

    const onDragLeave = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setDragActive(false)
    }

    const onDrop = (e) => {
        e.preventDefault()
        setDragActive(false)
        addFiles(e.dataTransfer.files)
    }

    // ── Row actions ───────────────────────────────────────────────────────────
    const askDocument = async (doc) => {
        setAskingId(doc.id)
        try {
            const res = await api.post(`${API_ENDPOINTS.documentById}${doc.id}/chat`)
            const promptId = res.data?.data?.prompt_id
            if (!promptId) throw new Error('No chat session returned')
            navigate('/market-content-gpt', { state: { contentPromptId: promptId, fileName: doc.title } })
        } catch (err) {
            toast.error(apiErrorMessage(err, "Couldn't open a chat for this document."))
            if (mounted.current) setAskingId(null)
        }
    }

    const retryDocument = async (doc) => {
        setRetryingId(doc.id)
        try {
            const res = await api.post(`${API_ENDPOINTS.documentById}${doc.id}/reprocess`)
            mergeDocument(res.data?.data?.id ? res.data.data : { ...doc, status: 'pending', error: null })
            toast.info(`Processing "${doc.title}" again`)
        } catch (err) {
            toast.error(apiErrorMessage(err, "Couldn't restart processing."))
        } finally {
            if (mounted.current) setRetryingId(null)
        }
    }

    const confirmDelete = async () => {
        const doc = toDelete
        if (!doc) return
        setDeleting(true)
        try {
            await api.delete(`${API_ENDPOINTS.documentById}${doc.id}`)
            removeDocument(doc.id)
            toast.success(`"${doc.title}" deleted`)
            setToDelete(null)
        } catch (err) {
            toast.error(apiErrorMessage(err, "Couldn't delete this document."))
        } finally {
            if (mounted.current) setDeleting(false)
        }
    }

    // ── Render ────────────────────────────────────────────────────────────────
    const documents = library?.documents || []
    const seedDocs = library?.seed || []
    const shared = library?.shared || {}
    const maxMb = library?.maxMb || DEFAULT_MAX_MB
    const readyCount = documents.filter(d => d.status === 'ready').length
    const busyCount = documents.filter(isBusy).length

    const renderActions = (doc) => {
        const href = absoluteUrl(doc.file_url)
        const ready = doc.status === 'ready'
        return (
            <div className='doc-actions'>
                <button
                    type='button'
                    className='ask-btn'
                    onClick={() => askDocument(doc)}
                    disabled={!ready || askingId === doc.id}
                    title={ready ? `Ask questions about ${doc.title}` : 'Available once processing finishes'}
                >
                    <ChatIcon /> {askingId === doc.id ? 'Opening…' : 'Ask questions'}
                </button>
                {doc.status === 'failed' && (
                    <button type='button' className='retry-btn' onClick={() => retryDocument(doc)} disabled={retryingId === doc.id}>
                        <RetryIcon /> {retryingId === doc.id ? 'Retrying…' : 'Retry'}
                    </button>
                )}
                {href && (
                    <a className='icon-btn' href={href} target='_blank' rel='noopener noreferrer' title='Open file' aria-label={`Open ${doc.title} in a new tab`}>
                        <ExternalIcon />
                    </a>
                )}
                <button type='button' className='icon-btn danger' onClick={() => setToDelete(doc)} title='Delete' aria-label={`Delete ${doc.title}`}>
                    <TrashIcon />
                </button>
            </div>
        )
    }

    return (
        <div className='documents-page'>
            <div className='documents-header'>
                <div>
                    <h1 className='documents-title'>Documents</h1>
                    <div className='documents-subtitle'>
                        Upload reports, filings and research notes, then ask questions answered from them with page citations.
                    </div>
                </div>
                {library && documents.length > 0 && (
                    <div className='library-summary' aria-live='polite'>
                        <span><strong>{documents.length}</strong> document{documents.length === 1 ? '' : 's'}</span>
                        <span><strong>{readyCount}</strong> ready</span>
                        {busyCount > 0 && <span className='busy'><span className='pulse-dot' aria-hidden='true' />{busyCount} processing</span>}
                    </div>
                )}
            </div>

            <div className='documents-layout'>
                <div className='documents-main'>
                    {/* Upload */}
                    <section className='doc-card upload-card' aria-labelledby='upload-heading'>
                        <h2 id='upload-heading' className='visually-hidden'>Upload documents</h2>
                        <div
                            className={`drop-zone${dragActive ? ' active' : ''}`}
                            onDragEnter={onDragOver}
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                            onClick={openPicker}
                        >
                            <span className='drop-icon'><UploadIcon /></span>
                            <div className='drop-title'>{dragActive ? 'Drop to upload' : 'Drag and drop files here'}</div>
                            <div className='drop-hint'>PDF, Word (DOCX, DOC), TXT or Markdown · up to {maxMb} MB each · several at once is fine</div>
                            <button
                                type='button'
                                className='blue-btn choose-btn'
                                onClick={(e) => { e.stopPropagation(); openPicker() }}
                            >
                                Choose files
                            </button>
                            <input
                                ref={fileInput}
                                type='file'
                                accept={ACCEPT_ATTR}
                                multiple
                                className='visually-hidden'
                                tabIndex={-1}
                                aria-hidden='true'
                                onChange={onPick}
                            />
                        </div>
                        {uploads.length > 0 && (
                            <ul className='upload-list' aria-live='polite' aria-label='Uploads'>
                                {uploads.map(item => <UploadRow key={item.key} item={item} onDismiss={dismissUpload} />)}
                            </ul>
                        )}
                    </section>

                    {/* Library */}
                    <section className='doc-card library-card' aria-labelledby='library-heading'>
                        <div className='card-head'>
                            <h2 id='library-heading' className='card-title'>Your library</h2>
                            {busyCount > 0 && <span className='card-note'>Updating every few seconds while files process</span>}
                        </div>

                        {loading && !library && <SkeletonRows />}

                        {loadError && !library && (
                            <div className='doc-banner error' role='alert'>
                                {loadError} <button type='button' onClick={() => { setLoading(true); loadLibrary() }}>Try again</button>
                            </div>
                        )}

                        {library && documents.length === 0 && (
                            <div className='library-empty'>
                                <span className='empty-icon'><LibraryIcon /></span>
                                <h3>No documents yet</h3>
                                <p>
                                    Upload an annual report, an earnings call transcript or a research note. Once it's processed,
                                    ask questions and every answer points to the page it came from.
                                </p>
                                <button type='button' className='blue-btn choose-btn' onClick={openPicker}>Upload your first document</button>
                                {seedDocs.length > 0 && (
                                    <div className='empty-note'>Or try a reference document from the shared knowledge base.</div>
                                )}
                            </div>
                        )}

                        {documents.length > 0 && (
                            <div className='table-scroll'>
                                <table className='doc-table'>
                                    <thead>
                                        <tr>
                                            <th>Document</th>
                                            <th className='num'>Size</th>
                                            <th className='num'>Pages</th>
                                            <th className='num' title='Searchable sections (chunks) made from the text'>Sections</th>
                                            <th>Uploaded</th>
                                            <th>Status</th>
                                            <th><span className='visually-hidden'>Actions</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {documents.map(doc => (
                                            <tr key={doc.id} className={doc.status === 'failed' ? 'has-error' : ''}>
                                                <td className='doc-td'>
                                                    <div className='doc-cell'>
                                                        <FileBadge kind={doc.kind} filename={doc.filename} />
                                                        <div className='doc-names'>
                                                            <span className='doc-title' title={doc.title}>{doc.title}</span>
                                                            {doc.filename && doc.filename !== doc.title && (
                                                                <span className='doc-filename' title={doc.filename}>{doc.filename}</span>
                                                            )}
                                                            {doc.status === 'failed' && (
                                                                <span className='doc-error' role='status'>{doc.error || 'Processing failed.'}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='num' data-label='Size'>{formatBytes(doc.size_bytes)}</td>
                                                <td className='num' data-label='Pages'>{doc.status === 'ready' ? formatCount(doc.page_count) : '—'}</td>
                                                <td className='num' data-label='Sections'>{doc.status === 'ready' ? formatCount(doc.chunk_count) : '—'}</td>
                                                <td data-label='Uploaded'>
                                                    <span title={doc.uploaded_at ? moment(doc.uploaded_at).format('D MMM YYYY, h:mm A') : ''}>
                                                        {doc.uploaded_at ? moment(doc.uploaded_at).fromNow() : '—'}
                                                    </span>
                                                </td>
                                                <td data-label='Status'><StatusChip status={doc.status} /></td>
                                                <td className='actions-td'>{renderActions(doc)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>

                <aside className='documents-side'>
                    <section className='doc-card' aria-labelledby='how-heading'>
                        <h2 id='how-heading' className='card-title'>What happens to an upload</h2>
                        <ol className='how-steps'>
                            {HOW_IT_WORKS.map((step, i) => (
                                <li key={step.title}>
                                    <span className='step-num' aria-hidden='true'>{i + 1}</span>
                                    <div>
                                        <div className='step-title'>{step.title}</div>
                                        <div className='step-body'>{step.body}</div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <div className='privacy-note'>Only you can see and search the files you upload.</div>
                    </section>

                    <section className='doc-card shared-card' aria-labelledby='shared-heading'>
                        <h2 id='shared-heading' className='card-title'>Shared knowledge base</h2>
                        <p className='card-subtitle'>
                            Chat answers also search these shared sources and cite them with page numbers, so every figure can be checked.
                        </p>
                        <div className='shared-counts'>
                            <div className='shared-count'>
                                <span className='count-value'>{library ? formatCount(shared.news || 0) : '—'}</span>
                                <span className='count-label'>news articles</span>
                            </div>
                            <div className='shared-count'>
                                <span className='count-value'>{library ? formatCount(shared.seed ?? seedDocs.length) : '—'}</span>
                                <span className='count-label'>reference documents</span>
                            </div>
                        </div>
                        {seedDocs.length > 0 && (
                            <ul className='seed-list'>
                                {seedDocs.map(doc => {
                                    const href = absoluteUrl(doc.file_url)
                                    return (
                                        <li key={doc.id} className='seed-item'>
                                            <FileBadge kind={doc.kind} filename={doc.filename} size='sm' />
                                            <div className='seed-names'>
                                                <span className='seed-title' title={doc.title}>{doc.title}</span>
                                                <span className='seed-meta'>
                                                    {doc.status === 'ready'
                                                        ? `${formatCount(doc.page_count)} page${doc.page_count === 1 ? '' : 's'} · ${formatCount(doc.chunk_count)} sections`
                                                        : STATUS[doc.status]?.label}
                                                </span>
                                            </div>
                                            <div className='seed-actions'>
                                                {doc.status === 'ready' && (
                                                    <button
                                                        type='button'
                                                        className='icon-btn'
                                                        onClick={() => askDocument(doc)}
                                                        disabled={askingId === doc.id}
                                                        title='Ask questions'
                                                        aria-label={`Ask questions about ${doc.title}`}
                                                    >
                                                        <ChatIcon />
                                                    </button>
                                                )}
                                                {href && (
                                                    <a className='icon-btn' href={href} target='_blank' rel='noopener noreferrer' title='Open file' aria-label={`Open ${doc.title} in a new tab`}>
                                                        <ExternalIcon />
                                                    </a>
                                                )}
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                        {library && seedDocs.length === 0 && (
                            <div className='card-note'>No reference documents have been added yet.</div>
                        )}
                    </section>
                </aside>
            </div>

            <Modal show={!!toDelete} onHide={() => !deleting && setToDelete(null)} size='md' centered className='marketGpt-left-box-modal'>
                <Modal.Header>
                    <div className='d-flex justify-content-between align-items-center mb-2 w-100'>
                        <div className='header-text'>Delete this document?</div>
                        <button type='button' onClick={() => setToDelete(null)} className='border-0 bg-transparent p-0' aria-label='Close' disabled={deleting}>
                            <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} alt='' />
                        </button>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-text-css'>
                        "{toDelete?.title}" and everything extracted from it will be removed, so it can no longer be searched or cited. This can't be undone.
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex justify-content-center align-items-center'>
                        <button type='button' onClick={() => setToDelete(null)} className='light-blue-btn2 mx-2 px-5' disabled={deleting}>Cancel</button>
                        <button type='button' onClick={confirmDelete} className='blue-btn mx-2 px-5' disabled={deleting}>{deleting ? 'Deleting…' : 'Delete'}</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Documents
