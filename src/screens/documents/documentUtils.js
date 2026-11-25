// Small helpers shared by the Documents and Review screens

const API_BASE = (process.env.REACT_APP_API_URL || 'http://localhost:4000').replace(/\/$/, '')

export const ACCEPTED_EXTENSIONS = ['pdf', 'docx', 'doc', 'txt', 'md']
export const ACCEPT_ATTR = ACCEPTED_EXTENSIONS.map(ext => `.${ext}`).join(',')

// Backend file links may be relative ("/api/documents/12/file?access=…"): point them at the API server
export const absoluteUrl = (url) => {
    if (!url) return null
    if (/^https?:\/\//i.test(url)) return url
    if (url.startsWith('/')) return `${API_BASE}${url}`
    return url
}

export const extensionOf = (name = '') => {
    const match = /\.([a-z0-9]+)$/i.exec(String(name))
    return match ? match[1].toLowerCase() : ''
}

// "PDF", "DOCX", "DOC", "TXT" or "MD", from the stored kind or else the file name
export const fileTypeLabel = (kind, filename) => {
    const ext = extensionOf(filename)
    if (ext === 'md' || kind === 'md') return 'MD'
    const value = kind || ext
    return value ? value.toUpperCase() : 'FILE'
}

export const fileTypeName = (label) => ({
    PDF: 'PDF document',
    DOCX: 'Word document',
    DOC: 'Word document',
    TXT: 'Text file',
    MD: 'Markdown file',
}[label] || 'File')

export const formatBytes = (bytes) => {
    if (bytes == null || !Number.isFinite(Number(bytes))) return '—'
    const n = Number(bytes)
    if (n < 1024) return `${n} B`
    if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`
    return `${(n / (1024 * 1024)).toFixed(n < 10 * 1024 * 1024 ? 1 : 0)} MB`
}

export const formatCount = (n) => (n == null ? '—' : Number(n).toLocaleString('en-IN'))

// Message from a `{ status, message }` error response, or a fallback
export const apiErrorMessage = (err, fallback = 'Something went wrong') => {
    const data = err?.response?.data
    if (data && typeof data === 'object' && data.message) return data.message
    if (err?.response?.status === 413) return 'This file is too large to upload.'
    if (err?.code === 'ERR_NETWORK') return "Can't reach the server. Check your connection and try again."
    return fallback
}
