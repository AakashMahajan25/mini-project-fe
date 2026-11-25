import React, { useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { absoluteUrl } from '../documents/documentUtils'
import {
    CLAIM_VERDICTS, DEFAULT_THRESHOLD, FEEDBACK_REASONS, REASONS, SOURCE_LABELS, STATUS_META, SUPPORT_META,
    absoluteTime, actorLabel, confidenceTone, differs, flagLabel, languageName, pageLabel, pct, prettyNote,
    reasonLabel, relativeTime, sourceTimeLabel, statusLabel,
} from './reviewUtils'

const ACTIONS = [
    { status: 'APPROVED', label: 'Approve', tone: 'approve' },
    { status: 'NEEDS_REVISION', label: 'Needs revision', tone: 'revise' },
    { status: 'REJECTED', label: 'Reject', tone: 'reject' },
    { status: 'UNDER_REVIEW', label: 'Mark under review', tone: 'neutral' },
]

const FACTORS = [
    { key: 'support', label: 'Support', help: 'How well the cited sources back each statement' },
    { key: 'coverage', label: 'Coverage', help: 'Share of factual statements that carry a citation' },
    { key: 'retrieval', label: 'Retrieval', help: 'How closely the best sources matched the question' },
]
const DEFAULT_WEIGHTS = { support: 0.5, coverage: 0.25, retrieval: 0.25 }

// ─── Icons ────────────────────────────────────────────────────────────────────
const BackIcon = () => (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'><path d='M15 18l-6-6 6-6' /></svg>
)
const ExternalIcon = () => (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M14 4h6v6M20 4l-9 9' /><path d='M19 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4' />
    </svg>
)
const InboxIcon = () => (
    <svg width='26' height='26' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M4 13l2.5-7.5A2 2 0 0 1 8.4 4h7.2a2 2 0 0 1 1.9 1.5L20 13' /><path d='M4 13v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5h-5a3 3 0 0 1-6 0z' />
    </svg>
)

// ─── Pieces ───────────────────────────────────────────────────────────────────
export function StatusChip({ status }) {
    const meta = STATUS_META[status]
    return (
        <span className={`rv-status ${meta?.tone || 'unknown'}`} title={meta?.hint}>
            {statusLabel(status)}
        </span>
    )
}

// Inline [S1] markers become buttons that jump to the matching citation
const linkMarkers = (text) => String(text || '').replace(/\[([SPW]\d+)\](?!\()/g, '[$1](#cite-$1)')

function AnswerMarkdown({ text, onMarker }) {
    return (
        <div className='rv-markdown' dir='auto'>
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                    a: ({ node, href, children, ...props }) => {
                        if (href && href.startsWith('#cite-')) {
                            const marker = href.slice('#cite-'.length)
                            return (
                                <button type='button' className='cite-marker' onClick={() => onMarker(marker)} aria-label={`Show source ${marker}`}>
                                    {marker}
                                </button>
                            )
                        }
                        return <a href={href} target='_blank' rel='noopener noreferrer' {...props}>{children}</a>
                    },
                    blockquote: ({ node, ...props }) => <blockquote className='md-callout' {...props} />,
                    table: ({ node, ...props }) => <div className='md-table'><table {...props} /></div>,
                }}
            >
                {linkMarkers(text)}
            </Markdown>
        </div>
    )
}

function Meter({ value, threshold }) {
    const width = value == null ? 0 : Math.max(0, Math.min(1, Number(value))) * 100
    return (
        <span className='rv-meter'>
            <span className={`rv-meter-fill ${confidenceTone(value, threshold ?? 0)}`} style={{ width: `${width}%` }} />
            {threshold != null && <span className='rv-meter-threshold' style={{ left: `${threshold * 100}%` }} aria-hidden='true' />}
        </span>
    )
}

function CitationItem({ citation, flash }) {
    const support = SUPPORT_META[citation.supported] || SUPPORT_META.unchecked
    const href = absoluteUrl(citation.file_url || citation.source_url)
    const meta = [
        pageLabel(citation),
        citation.section && citation.section !== citation.title ? citation.section : null,
        sourceTimeLabel(citation),
        citation.similarity != null ? `${pct(citation.similarity)} match` : null,
    ].filter(Boolean)
    return (
        <li id={`rv-cite-${citation.marker}`} className={`rv-citation${flash ? ' flash' : ''}${citation.cited === false ? ' unused' : ''}`}>
            <div className='rv-citation-head'>
                <span className={`rv-marker ${citation.source_type || ''}`}>{citation.marker}</span>
                <span className='rv-source-type'>{SOURCE_LABELS[citation.source_type] || 'Source'}</span>
                <span className={`rv-support ${support.tone}`}>{support.label}</span>
            </div>
            <div className='rv-citation-title'>{citation.title || 'Untitled source'}</div>
            {meta.length > 0 && <div className='rv-citation-meta'>{meta.join(' · ')}</div>}
            {citation.snippet && <p className='rv-snippet'>{citation.snippet}</p>}
            {href && (
                <a className='rv-open-link' href={href} target='_blank' rel='noopener noreferrer'>
                    Open source <ExternalIcon />
                </a>
            )}
        </li>
    )
}

function Section({ title, aside, children, className = '' }) {
    return (
        <section className={`rv-section ${className}`}>
            <div className='rv-section-head'>
                <h3 className='rv-section-title'>{title}</h3>
                {aside && <span className='rv-section-aside'>{aside}</span>}
            </div>
            {children}
        </section>
    )
}

function DetailSkeleton() {
    return (
        <div className='rv-detail-skeleton' aria-hidden='true'>
            <div className='sk sk-line short' />
            <div className='sk sk-line' />
            <div className='sk sk-block' />
            <div className='sk sk-block tall' />
        </div>
    )
}

// ═══════════════════════════════════════════════════════════════════════════════
// Rendered with key={selectedId}, so the note and the answer toggle start fresh for every answer
function ReviewDetail({ selectedId, detail, loading, error, onReload, onBack, onAction, acting }) {
    const [note, setNote] = useState('')
    const [answerView, setAnswerView] = useState('shown')
    const [flash, setFlash] = useState(null)
    const flashTimer = useRef(null)

    useEffect(() => () => clearTimeout(flashTimer.current), [])

    const showMarker = (marker) => {
        const el = document.getElementById(`rv-cite-${marker}`)
        if (!el) return
        const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
        el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' })
        setFlash(marker)
        clearTimeout(flashTimer.current)
        flashTimer.current = setTimeout(() => setFlash(null), 1800)
    }

    const back = onBack && (
        <button type='button' className='rv-back' onClick={onBack}><BackIcon /> Back to queue</button>
    )

    if (!selectedId) {
        return (
            <div className='rv-detail-empty'>
                <span className='rv-empty-icon'><InboxIcon /></span>
                <h2>Select an answer to review</h2>
                <p>Pick an item from the queue to see the question, the answer the user saw, its sources and how confident the evidence check was.</p>
            </div>
        )
    }

    if (error && detail?.id !== selectedId) {
        return (
            <div className='rv-detail-body'>
                {back}
                <div className='rv-banner error' role='alert'>
                    {error} <button type='button' onClick={onReload}>Try again</button>
                </div>
            </div>
        )
    }

    if (!detail || detail.id !== selectedId) {
        return (
            <div className='rv-detail-body'>
                {back}
                <DetailSkeleton />
            </div>
        )
    }

    const cd = detail.confidence_detail || {}
    const threshold = cd.threshold ?? DEFAULT_THRESHOLD
    const weights = cd.weights || DEFAULT_WEIGHTS
    const reasons = detail.uncertain_reasons || []
    const citations = detail.citations || []
    const cited = citations.filter(c => c.cited !== false)
    const unused = citations.filter(c => c.cited === false)
    const feedback = detail.feedback || []
    const log = detail.status_log || []
    const verdicts = CLAIM_VERDICTS.filter(v => cd.verdicts?.[v.key])

    const shownText = detail.answer_shown || detail.answer_en || ''
    const translated = differs(detail.answer_shown, detail.answer_en)
    const answerText = translated && answerView === 'en' ? detail.answer_en : shownText
    const language = languageName(detail.language)
    const above = detail.confidence != null && detail.confidence >= threshold

    const checkNote = cd.verifier
        ? `Statements checked by ${cd.verifier}`
        : reasons.includes('verification_unavailable')
            ? 'Automatic check could not run'
            : cd.note || null

    const submit = async (status) => {
        const ok = await onAction(status, note.trim())
        if (ok) setNote('')
    }

    return (
        <div className={`rv-detail-body${loading ? ' refreshing' : ''}`}>
            {back}

            {/* Header */}
            <header className='rv-detail-head'>
                <div className='rv-head-row'>
                    <StatusChip status={detail.status} />
                    <span className={`rv-conf-badge ${confidenceTone(detail.confidence, threshold)}`}>{pct(detail.confidence)} confidence</span>
                    <span className='rv-answer-id'>Answer #{detail.id}</span>
                </div>
                <div className='rv-head-meta'>
                    <span>{flagLabel(detail.flag)}</span>
                    {detail.user_email && <span>{detail.user_email}</span>}
                    <span title={absoluteTime(detail.createdAt)}>{relativeTime(detail.createdAt)}</span>
                    {language && detail.language !== 'en' && <span>{language}</span>}
                    {detail.model && <span>{detail.model}</span>}
                    {detail.total_ms != null && <span title={detail.retrieval_ms != null ? `Search took ${detail.retrieval_ms} ms` : undefined}>{(detail.total_ms / 1000).toFixed(1)} s</span>}
                </div>
                {detail.reviewed_at && (
                    <div className='rv-last-review'>
                        Last decision by <strong>{detail.reviewer_email || 'a reviewer'}</strong>{' '}
                        <span title={absoluteTime(detail.reviewed_at)}>{relativeTime(detail.reviewed_at)}</span>
                        {detail.review_note && <>: “{detail.review_note}”</>}
                    </div>
                )}
            </header>

            {/* Question */}
            <Section title='Question'>
                <p className='rv-question' dir='auto'>{detail.question || '—'}</p>
                {differs(detail.question, detail.question_en) && (
                    <p className='rv-aside-text'><span>In English:</span> {detail.question_en}</p>
                )}
                {differs(detail.search_query, detail.question_en || detail.question) && (
                    <p className='rv-aside-text'><span>Searched for:</span> {detail.search_query}</p>
                )}
            </Section>

            {/* Answer */}
            <Section
                title='Answer shown to the user'
                aside={translated ? null : language && detail.language !== 'en' ? language : null}
            >
                {translated && (
                    <div className='rv-toggle' role='tablist' aria-label='Answer language'>
                        <button type='button' role='tab' aria-selected={answerView === 'shown'} className={answerView === 'shown' ? 'active' : ''} onClick={() => setAnswerView('shown')}>
                            As shown{language ? ` (${language})` : ''}
                        </button>
                        <button type='button' role='tab' aria-selected={answerView === 'en'} className={answerView === 'en' ? 'active' : ''} onClick={() => setAnswerView('en')}>
                            English original
                        </button>
                    </div>
                )}
                {answerText
                    ? <AnswerMarkdown text={answerText} onMarker={showMarker} />
                    : <p className='rv-muted'>The answer text is not available.</p>}
            </Section>

            {/* Confidence */}
            <Section title='Confidence' className='rv-confidence'>
                <div className='rv-conf-overview'>
                    <div className={`rv-conf-score ${confidenceTone(detail.confidence, threshold)}`}>{pct(detail.confidence)}</div>
                    <div className='rv-conf-text'>
                        <div className='rv-conf-verdict'>
                            {detail.confidence == null ? 'No score recorded' : above ? `Above the ${pct(threshold)} threshold` : `Below the ${pct(threshold)} threshold`}
                        </div>
                        {checkNote && <div className='rv-muted small'>{checkNote}{cd.claims ? ` · ${cd.claims} statement${cd.claims === 1 ? '' : 's'}` : ''}</div>}
                    </div>
                </div>
                <Meter value={detail.confidence} threshold={threshold} />

                <ul className='rv-factors'>
                    {FACTORS.map(f => (
                        <li key={f.key} className='rv-factor'>
                            <div className='rv-factor-head'>
                                <span className='rv-factor-name'>{f.label} <span className='rv-weight'>{pct(weights[f.key])} weight</span></span>
                                <span className='rv-factor-value'>{pct(cd[f.key])}</span>
                            </div>
                            <Meter value={cd[f.key]} />
                            <div className='rv-muted small'>{f.help}</div>
                        </li>
                    ))}
                </ul>

                {verdicts.length > 0 && (
                    <div className='rv-verdicts'>
                        <div className='rv-sub-title'>Statements by verdict</div>
                        <div className='rv-chip-row'>
                            {verdicts.map(v => (
                                <span key={v.key} className={`rv-verdict ${v.tone}`}><strong>{cd.verdicts[v.key]}</strong> {v.label}</span>
                            ))}
                        </div>
                    </div>
                )}

                {reasons.length > 0 && (
                    <div className='rv-reasons'>
                        <div className='rv-sub-title'>Why it was flagged</div>
                        <ul>
                            {reasons.map(r => (
                                <li key={r}>
                                    <strong>{reasonLabel(r)}</strong>
                                    {REASONS[r]?.detail && <span> · {REASONS[r].detail}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </Section>

            {/* Citations */}
            <Section title='Sources' aside={`${cited.length} cited${unused.length ? ` · ${unused.length} not used` : ''}`}>
                {citations.length === 0 && <p className='rv-muted'>No sources were found for this answer.</p>}
                {cited.length > 0 && (
                    <>
                        <div className='rv-sub-title'>Cited in the answer</div>
                        <ul className='rv-citations'>
                            {cited.map(c => <CitationItem key={`${c.marker}-${c.chunk_id || c.source_url}`} citation={c} flash={flash === c.marker} />)}
                        </ul>
                    </>
                )}
                {unused.length > 0 && (
                    <>
                        <div className='rv-sub-title'>Retrieved but not used</div>
                        <ul className='rv-citations'>
                            {unused.map(c => <CitationItem key={`${c.marker}-${c.chunk_id || c.source_url}`} citation={c} flash={flash === c.marker} />)}
                        </ul>
                    </>
                )}
            </Section>

            {/* Feedback */}
            <Section title='User feedback' aside={feedback.length ? `${feedback.length}` : null}>
                {feedback.length === 0 ? (
                    <p className='rv-muted'>The user hasn't rated this answer.</p>
                ) : (
                    <ul className='rv-feedback'>
                        {feedback.map((f, i) => (
                            <li key={f.id || i} className={f.rating === 'down' ? 'down' : 'up'}>
                                <span className='rv-thumb' role='img' aria-label={f.rating === 'down' ? 'Thumbs down' : 'Thumbs up'}>{f.rating === 'down' ? '👎' : '👍'}</span>
                                <div className='rv-feedback-body'>
                                    <div className='rv-feedback-line'>
                                        <strong>{f.rating === 'down' ? 'Not helpful' : 'Helpful'}</strong>
                                        {f.reason && <span className='rv-reason-chip'>{FEEDBACK_REASONS[f.reason] || f.reason}</span>}
                                    </div>
                                    {f.comment && <p className='rv-feedback-comment' dir='auto'>“{f.comment}”</p>}
                                    <div className='rv-muted small'>{f.email || 'User'} · <span title={absoluteTime(f.createdAt)}>{relativeTime(f.createdAt)}</span></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </Section>

            {/* Timeline */}
            <Section title='Status history'>
                {log.length === 0 ? (
                    <p className='rv-muted'>No status changes recorded.</p>
                ) : (
                    <ol className='rv-timeline'>
                        {log.map((entry, i) => (
                            <li key={entry.id || i}>
                                <span className={`rv-tl-dot ${STATUS_META[entry.to_status]?.tone || ''}`} aria-hidden='true' />
                                <div className='rv-tl-body'>
                                    <div className='rv-tl-line'>
                                        <strong>{statusLabel(entry.to_status)}</strong>
                                        {entry.from_status && <span className='rv-muted'> from {statusLabel(entry.from_status)}</span>}
                                    </div>
                                    <div className='rv-muted small'>
                                        {actorLabel(entry)} · <time dateTime={entry.createdAt} title={relativeTime(entry.createdAt)}>{absoluteTime(entry.createdAt)}</time>
                                    </div>
                                    {entry.note && <div className='rv-tl-note' dir='auto'>{prettyNote(entry.note)}</div>}
                                </div>
                            </li>
                        ))}
                    </ol>
                )}
            </Section>

            {/* Decision */}
            <div className='rv-decision'>
                <label htmlFor='rv-note' className='rv-note-label'>
                    Note <span>(optional, saved in the status history)</span>
                </label>
                <textarea
                    id='rv-note'
                    rows={2}
                    maxLength={1000}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder='e.g. Figures match the annual report, page 42'
                />
                <div className='rv-actions'>
                    {ACTIONS.map(a => {
                        const current = detail.status === a.status
                        return (
                            <button
                                key={a.status}
                                type='button'
                                className={`rv-action ${a.tone}`}
                                onClick={() => submit(a.status)}
                                disabled={!!acting || current}
                                title={current ? 'This is the current status' : undefined}
                            >
                                {acting === a.status ? 'Saving…' : a.label}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ReviewDetail
