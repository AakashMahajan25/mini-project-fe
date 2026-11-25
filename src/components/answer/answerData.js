import moment from 'moment'

// Shared labels and helpers for structured answers: citations, review status, confidence and feedback.

const API_ORIGIN = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export const SOURCE_TYPE_LABELS = {
    upload: 'Uploaded document',
    seed: 'Reference document',
    news: 'News article',
    web: 'Web page',
    portfolio: 'Your portfolio',
}

// tone → colour family in Answer.scss
export const SUPPORT_INFO = {
    supported: { label: 'Supported', tone: 'good', hint: 'The automatic check found that this source backs the statements that cite it.' },
    partial: { label: 'Partly supported', tone: 'warn', hint: 'This source backs only part of what the answer says with it.' },
    unsupported: { label: 'Not supported', tone: 'bad', hint: 'The automatic check found that this source does not back the statements that cite it.' },
    web: { label: 'Web source', tone: 'neutral', hint: 'Found by web search. Its text was not compared with the answer word for word.' },
    unchecked: { label: 'Not checked', tone: 'muted', hint: 'This source was not compared with the answer.' },
}

export const STATUS_INFO = {
    CANDIDATE: { label: 'Awaiting review', tone: 'info', hint: 'Passed the automatic source check. A reviewer has not approved it yet.' },
    UNCERTAIN: { label: 'Uncertain', tone: 'warn', hint: 'Frruit could not verify this answer against its sources. Treat it as unconfirmed, not as fact.' },
    UNDER_REVIEW: { label: 'Under review', tone: 'review', hint: 'A reviewer is checking this answer.' },
    APPROVED: { label: 'Approved', tone: 'good', hint: 'A reviewer checked this answer against its sources and approved it.' },
    NEEDS_REVISION: { label: 'Needs revision', tone: 'revise', hint: 'This answer was flagged as unhelpful or wrong and is waiting to be corrected.' },
    REJECTED: { label: 'Rejected', tone: 'bad', hint: 'A reviewer found this answer incorrect. Do not rely on it.' },
}

export const UNCERTAIN_REASON_TEXT = {
    no_sources: 'No source could be found for it',
    insufficient_evidence: "The sources found don't answer the question",
    unsupported_claims: "Some statements aren't backed by the cited sources",
    low_confidence: 'The supporting evidence is weak',
    verification_unavailable: "The automatic source check couldn't run",
}

export const FEEDBACK_REASONS = [
    { value: 'incorrect', label: 'Incorrect information' },
    { value: 'outdated', label: 'Out of date' },
    { value: 'missing_source', label: 'Missing a source' },
    { value: 'wrong_source', label: 'Wrong source cited' },
    { value: 'unclear', label: 'Unclear or confusing' },
    { value: 'not_relevant', label: "Doesn't answer my question" },
    { value: 'other', label: 'Something else' },
]

export const percent = (value) => `${Math.round(Number(value) * 100)}%`

export const sourceTypeLabel = (type) => SOURCE_TYPE_LABELS[type] || 'Source'

export const isDocument = (citation) => citation?.source_type === 'upload' || citation?.source_type === 'seed'

// Backend file links can be relative ("/api/documents/12/file?access=…#page=3")
export const absoluteUrl = (url) => {
    if (!url || typeof url !== 'string') return null
    return url.startsWith('/') && !url.startsWith('//') ? `${API_ORIGIN}${url}` : url
}

// Where "Open source" goes: the document at its page, or the article / web page
export const citationHref = (citation) => {
    if (!citation) return null
    if (isDocument(citation)) return absoluteUrl(citation.file_url || citation.source_url)
    return absoluteUrl(citation.source_url || citation.url)
}

const hostname = (url) => {
    try {
        return new URL(url).hostname.replace(/^www\./, '')
    } catch {
        return null
    }
}

export const citationTitle = (citation) =>
    citation?.title || citation?.heading || hostname(citation?.source_url || citation?.url) || 'Untitled source'

export const pagesLabel = (citation) => {
    if (!citation?.page_from) return null
    return citation.page_to && citation.page_to !== citation.page_from
        ? `pp. ${citation.page_from}–${citation.page_to}`
        : `p. ${citation.page_from}`
}

const formatDate = (value, format = 'D MMM YYYY, h:mm a') =>
    value && moment(value).isValid() ? moment(value).format(format) : null

// Published (news) / uploaded (documents) date, then when Frruit retrieved the source
export const citationDates = (citation) => {
    if (!citation) return []
    const dates = []
    const source = formatDate(citation.source_timestamp)
    if (source && citation.source_type === 'news') dates.push({ label: 'Published', value: source })
    else if (source && isDocument(citation)) dates.push({ label: 'Uploaded', value: source })
    const retrieved = formatDate(citation.retrieved_at)
    if (retrieved) dates.push({ label: citation.source_type === 'portfolio' ? 'Prices as of' : 'Retrieved', value: retrieved })
    if (!dates.length) {
        const fallback = formatDate(citation.source_date)
        if (fallback) dates.push({ label: 'Date', value: fallback })
    }
    return dates
}

export const citationShortDate = (citation) =>
    formatDate(citation?.source_timestamp || citation?.source_date || citation?.retrieved_at, 'D MMM YYYY')

// S1, S2 … then P1, then W1 …
const MARKER_GROUP = { S: 0, P: 1, W: 2 }
const markerKey = (marker = '') => [MARKER_GROUP[marker[0]] ?? 3, parseInt(marker.slice(1), 10) || 0]

export const splitCitations = (citations) => {
    const list = (Array.isArray(citations) ? citations : [])
        .filter(Boolean)
        .sort((a, b) => {
            const [groupA, numberA] = markerKey(a.marker)
            const [groupB, numberB] = markerKey(b.marker)
            return groupA - groupB || numberA - numberB
        })
    return {
        cited: list.filter(c => c.cited !== false),
        unused: list.filter(c => c.cited === false),
    }
}

// Answer fields from a socket `end` meta / REST meta, for storing on a chat message
export const answerFieldsFromMeta = (meta) => ({
    answer_id: meta?.answer_id ?? null,
    status: meta?.status ?? null,
    confidence: meta?.confidence ?? null,
    uncertain_reasons: meta?.uncertain_reasons || [],
    confidence_detail: meta?.confidence_detail || null,
    citations: Array.isArray(meta?.citations) ? meta.citations : [],
})

// One shape for history rows, freshly pushed messages (fields + meta) and a live stream's meta
export const answerInfo = (item) => {
    if (!item) return null
    const meta = item.meta || {}
    const pick = (key) => (item[key] !== undefined && item[key] !== null ? item[key] : meta[key])
    const citations = pick('citations')
    return {
        answerId: pick('answer_id') ?? null,
        status: pick('status') ?? null,
        confidence: pick('confidence') ?? null,
        reasons: pick('uncertain_reasons') || [],
        detail: pick('confidence_detail') || null,
        citations: Array.isArray(citations) ? citations : [],
        myRating: item.my_rating ?? null,
    }
}
