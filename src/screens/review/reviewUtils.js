import moment from 'moment'
import { CHAT_LANGUAGES } from '../../utils/languages'

export const ALL_STATUSES = ['UNCERTAIN', 'NEEDS_REVISION', 'UNDER_REVIEW', 'CANDIDATE', 'APPROVED', 'REJECTED']

// Fallback when an answer has no stored threshold (matches CONFIDENCE_THRESHOLD on the backend)
export const DEFAULT_THRESHOLD = 0.6

export const STATUS_META = {
    UNCERTAIN: { label: 'Uncertain', tone: 'uncertain', hint: 'Failed the automatic evidence check' },
    NEEDS_REVISION: { label: 'Needs revision', tone: 'revision', hint: 'Thumbs-down from the user, or sent back by a reviewer' },
    UNDER_REVIEW: { label: 'Under review', tone: 'review', hint: 'A reviewer is looking at it' },
    CANDIDATE: { label: 'Awaiting review', tone: 'candidate', hint: 'Passed the evidence check and waits for a person' },
    APPROVED: { label: 'Approved', tone: 'approved', hint: 'Checked and approved by a reviewer' },
    REJECTED: { label: 'Rejected', tone: 'rejected', hint: 'Checked and rejected by a reviewer' },
}

export const statusLabel = (status) => STATUS_META[status]?.label || status || 'Unknown'

export const REASONS = {
    no_sources: { label: 'No source found', detail: 'The answer cites no document, news article or web page.' },
    insufficient_evidence: { label: "Sources don't answer the question", detail: 'Sources were found, but the checker says they do not answer what was asked.' },
    unsupported_claims: { label: 'Unsupported statements', detail: 'Too many statements are not backed by the sources they cite, or cite nothing.' },
    low_confidence: { label: 'Weak evidence', detail: 'The overall confidence score is below the threshold.' },
    verification_unavailable: { label: 'Automatic check could not run', detail: 'The checker model was unavailable, so the score is only a rough estimate.' },
}

export const reasonLabel = (code) => REASONS[code]?.label || String(code || '').replace(/_/g, ' ')

// Per-citation verdict from the evidence check
export const SUPPORT_META = {
    supported: { label: 'Supported', tone: 'good' },
    partial: { label: 'Partly supported', tone: 'warn' },
    unsupported: { label: 'Not supported', tone: 'bad' },
    web: { label: 'Web source, not checked', tone: 'neutral' },
    unchecked: { label: 'Not checked', tone: 'neutral' },
}

// Per-statement verdicts counted in confidence_detail.verdicts
export const CLAIM_VERDICTS = [
    { key: 'supported', label: 'Supported', tone: 'good' },
    { key: 'partial', label: 'Partly supported', tone: 'warn' },
    { key: 'web', label: 'Web only', tone: 'neutral' },
    { key: 'general', label: 'General knowledge', tone: 'neutral' },
    { key: 'uncited', label: 'No citation', tone: 'bad' },
    { key: 'unsupported', label: 'Not supported', tone: 'bad' },
]

export const SOURCE_LABELS = {
    upload: 'Uploaded document',
    seed: 'Reference document',
    news: 'News article',
    web: 'Web page',
    portfolio: 'Portfolio data',
}

export const FEEDBACK_REASONS = {
    incorrect: 'Incorrect',
    outdated: 'Outdated',
    missing_source: 'Missing source',
    wrong_source: 'Wrong source',
    unclear: 'Unclear',
    not_relevant: 'Not relevant',
    other: 'Other',
}

const FLAG_LABELS = {
    fund: 'Fundamentals',
    news: 'Market news',
    news_bing: 'News',
    youtube: 'YouTube',
    reddit: 'Reddit',
    screener: 'Screener',
    portfolio: 'Portfolio',
    docs: 'Document Q&A',
}

export const flagLabel = (flag) => {
    if (!flag) return 'Chat'
    return FLAG_LABELS[flag] || flag.charAt(0).toUpperCase() + flag.slice(1).replace(/_/g, ' ')
}

export const languageName = (code) => {
    if (!code) return null
    return CHAT_LANGUAGES.find(l => l.code === code)?.label || code.toUpperCase()
}

export const pct = (value) => {
    if (value == null || !Number.isFinite(Number(value))) return '—'
    return `${Math.round(Number(value) * 100)}%`
}

export const confidenceTone = (value, threshold = DEFAULT_THRESHOLD) => {
    if (value == null) return 'none'
    return Number(value) >= threshold ? 'good' : 'low'
}

export const relativeTime = (iso) => (iso ? moment(iso).fromNow() : '—')
export const absoluteTime = (iso) => (iso ? moment(iso).format('D MMM YYYY, h:mm A') : '')

const sameText = (a, b) => String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase()
export const differs = (a, b) => !!a && !!b && !sameText(a, b)

// Markdown answer → one line of plain text for the queue (drops the UNCERTAIN banner and citation markers)
export const plainPreview = (text = '') => String(text || '')
    .split('\n')
    .filter(line => !/^\s*>/.test(line) && !/^\s*-{3,}\s*$/.test(line))
    .join(' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[[SPW]\d+\]/g, '')
    .replace(/[*_`#|]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()

export const actorLabel = (entry) => {
    if (entry.actor_type === 'system') return 'Automatic check'
    if (entry.actor_type === 'reviewer') return `${entry.actor_email || 'A reviewer'} (reviewer)`
    return entry.actor_email ? `${entry.actor_email} (user)` : 'The user'
}

// Status-log notes written by the backend, in plain words
export const prettyNote = (note) => {
    if (!note) return null
    const gate = /^Evidence gate:\s*(.+)$/i.exec(note)
    if (gate) return `Flagged by the automatic check: ${gate[1].split(',').map(r => reasonLabel(r.trim())).join(', ')}`
    if (/^Passed evidence gate$/i.test(note.trim())) return 'Passed the automatic evidence check'
    return note.replace(/^User marked unhelpful \((\w+)\)/, (match, reason) => `User marked it unhelpful (${(FEEDBACK_REASONS[reason] || reason).toLowerCase()})`)
}

export const pageLabel = (citation) => {
    const { page_from: from, page_to: to } = citation
    if (from == null) return null
    if (to != null && to !== from) return `Pages ${from}–${to}`
    return `Page ${from}`
}

export const sourceTimeLabel = (citation) => {
    const when = citation.source_timestamp || citation.retrieved_at
    if (!when) return null
    const date = moment(when).format('D MMM YYYY')
    if (!citation.source_timestamp) return `Retrieved ${date}`
    if (citation.source_type === 'news') return `Published ${date}`
    if (citation.source_type === 'upload' || citation.source_type === 'seed') return `Uploaded ${date}`
    return date
}
