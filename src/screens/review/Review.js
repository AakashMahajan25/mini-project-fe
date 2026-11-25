import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../utils/api'
import { API_ENDPOINTS } from '../../utils/apiUrls'
import { TICKER_HEIGHT } from '../../utils/utils'
import { apiErrorMessage } from '../documents/documentUtils'
import ReviewDetail, { StatusChip } from './ReviewDetail'
import {
    ALL_STATUSES, STATUS_META, absoluteTime, confidenceTone, flagLabel, languageName, pct, plainPreview, relativeTime,
} from './reviewUtils'
import './Review.scss'

const PAGE_SIZE = 20
const DESKTOP_MIN_WIDTH = 991 // below this the mobile top bar is shown and the page scrolls normally
const NAV_HEIGHT = 68 // desktop top bar without the ticker, as in the other full-height screens
const MIN_DESKTOP_HEIGHT = 640

const TABS = [
    { key: 'attention', label: 'Needs attention', statuses: ['UNCERTAIN', 'NEEDS_REVISION', 'UNDER_REVIEW'], empty: 'Nothing needs attention right now.' },
    { key: 'awaiting', label: 'Awaiting review', statuses: ['CANDIDATE'], empty: 'No answers are waiting for review.' },
    { key: 'approved', label: 'Approved', statuses: ['APPROVED'], empty: 'No approved answers yet.' },
    { key: 'rejected', label: 'Rejected', statuses: ['REJECTED'], empty: 'No rejected answers.' },
    { key: 'all', label: 'All', statuses: ALL_STATUSES, empty: 'No answers have been recorded yet.' },
]

const STAT_ORDER = ['UNCERTAIN', 'NEEDS_REVISION', 'UNDER_REVIEW', 'CANDIDATE', 'APPROVED', 'REJECTED']

const SUCCESS_TEXT = {
    APPROVED: 'Answer approved',
    REJECTED: 'Answer rejected',
    NEEDS_REVISION: 'Sent back for revision',
    UNDER_REVIEW: 'Marked as under review',
}

const isForbidden = (err) => err?.response?.status === 403

// ─── Icons ────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' aria-hidden='true'>
        <circle cx='11' cy='11' r='7' /><path d='M20 20l-3.5-3.5' />
    </svg>
)
const RefreshIcon = () => (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M21 12a9 9 0 1 1-2.64-6.36' /><path d='M21 3v6h-6' />
    </svg>
)
const LockIcon = () => (
    <svg width='26' height='26' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <rect x='5' y='11' width='14' height='9' rx='2' /><path d='M8 11V8a4 4 0 0 1 8 0v3' />
    </svg>
)

function useViewport() {
    const [size, setSize] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }))
    useEffect(() => {
        let frame = null
        const onResize = () => {
            cancelAnimationFrame(frame)
            frame = requestAnimationFrame(() => setSize({ width: window.innerWidth, height: window.innerHeight }))
        }
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
            cancelAnimationFrame(frame)
        }
    }, [])
    return size
}

// ─── Pieces ───────────────────────────────────────────────────────────────────
function StatsStrip({ stats }) {
    if (!stats) {
        return (
            <div className='rv-stats' aria-hidden='true'>
                {[0, 1, 2, 3, 4, 5, 6].map(i => <div key={i} className='rv-stat skeleton' />)}
            </div>
        )
    }
    const by = stats.by_status || {}
    const avg = stats.avg_confidence || {}
    const feedback = stats.feedback || {}
    let weighted = 0
    let counted = 0
    STAT_ORDER.forEach(s => {
        if (avg[s] != null && by[s]) {
            weighted += avg[s] * by[s]
            counted += by[s]
        }
    })
    const total = STAT_ORDER.reduce((n, s) => n + (by[s] || 0), 0)

    return (
        <ul className='rv-stats' aria-label='Answers by status'>
            {STAT_ORDER.map(s => (
                <li key={s} className={`rv-stat ${STATUS_META[s].tone}`} title={STATUS_META[s].hint}>
                    <span className='rv-stat-label'><span className='rv-dot' aria-hidden='true' />{STATUS_META[s].label}</span>
                    <span className='rv-stat-value'>{by[s] || 0}</span>
                    <span className='rv-stat-sub'>{avg[s] != null ? `avg ${pct(avg[s])} confidence` : 'No answers'}</span>
                </li>
            ))}
            <li className='rv-stat overall'>
                <span className='rv-stat-label'>Overall</span>
                <span className='rv-stat-value'>{counted ? pct(weighted / counted) : '—'}</span>
                <span className='rv-stat-sub'>avg confidence · {total} answer{total === 1 ? '' : 's'}</span>
            </li>
            <li className='rv-stat feedback'>
                <span className='rv-stat-label'>User feedback</span>
                <span className='rv-stat-value rv-thumbs'>
                    <span><span role='img' aria-label='Thumbs up'>👍</span> {feedback.up || 0}</span>
                    <span><span role='img' aria-label='Thumbs down'>👎</span> {feedback.down || 0}</span>
                </span>
                <span className='rv-stat-sub'>ratings from users</span>
            </li>
        </ul>
    )
}

function QueueItem({ item, selected, onSelect }) {
    const preview = plainPreview(item.answer_preview)
    const language = item.language && item.language !== 'en' ? languageName(item.language) : null
    return (
        <li>
            <button
                type='button'
                className={`rv-queue-item${selected ? ' selected' : ''}`}
                onClick={() => onSelect(item.id)}
                aria-current={selected ? 'true' : undefined}
            >
                <span className='rv-qi-top'>
                    <StatusChip status={item.status} />
                    <span className={`rv-qi-conf ${confidenceTone(item.confidence)}`}>{pct(item.confidence)}</span>
                    <span className='rv-qi-time' title={absoluteTime(item.createdAt)}>{relativeTime(item.createdAt)}</span>
                </span>
                <span className='rv-qi-question' dir='auto'>{item.question || 'Untitled question'}</span>
                {preview && <span className='rv-qi-preview'>{preview}</span>}
                <span className='rv-qi-meta'>
                    {item.user_email && <span className='rv-qi-email' title={item.user_email}>{item.user_email}</span>}
                    <span>{item.citation_count || 0} citation{item.citation_count === 1 ? '' : 's'}</span>
                    <span>{flagLabel(item.flag)}</span>
                    {language && <span>{language}</span>}
                    {item.last_rating && (
                        <span role='img' aria-label={item.last_rating === 'down' ? 'Last rating: thumbs down' : 'Last rating: thumbs up'}>
                            {item.last_rating === 'down' ? '👎' : '👍'}
                        </span>
                    )}
                </span>
            </button>
        </li>
    )
}

// ═══════════════════════════════════════════════════════════════════════════════
function Review() {
    const navigate = useNavigate()
    const viewport = useViewport()
    const isDesktop = viewport.width >= DESKTOP_MIN_WIDTH

    const [forbidden, setForbidden] = useState(false)
    const [stats, setStats] = useState(null)
    const [tab, setTab] = useState('attention')
    const [search, setSearch] = useState('')
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [queue, setQueue] = useState(null)
    const [queueLoading, setQueueLoading] = useState(true)
    const [queueError, setQueueError] = useState(null)
    const [selectedId, setSelectedId] = useState(null)
    const [detail, setDetail] = useState(null)
    const [detailLoading, setDetailLoading] = useState(false)
    const [detailError, setDetailError] = useState(null)
    const [acting, setActing] = useState(null)

    const mounted = useRef(true)
    const queueSeq = useRef(0)
    const detailSeq = useRef(0)
    const listScroll = useRef(0)

    useEffect(() => {
        mounted.current = true
        return () => { mounted.current = false }
    }, [])

    const statuses = TABS.find(t => t.key === tab).statuses

    const loadStats = useCallback(async () => {
        try {
            const res = await api.get(API_ENDPOINTS.reviewStats)
            if (mounted.current) setStats(res.data?.data || null)
        } catch (err) {
            if (mounted.current && isForbidden(err)) setForbidden(true)
        }
    }, [])

    const loadQueue = useCallback(async () => {
        const seq = ++queueSeq.current
        setQueueLoading(true)
        try {
            const res = await api.get(API_ENDPOINTS.reviewQueue, {
                params: { status: statuses.join(','), q: query || undefined, page, limit: PAGE_SIZE },
            })
            if (!mounted.current || seq !== queueSeq.current) return
            const data = res.data?.data || {}
            setQueue({ items: data.items || [], total: data.total || 0, page: data.page || page, limit: data.limit || PAGE_SIZE })
            setQueueError(null)
        } catch (err) {
            if (!mounted.current || seq !== queueSeq.current) return
            if (isForbidden(err)) setForbidden(true)
            else setQueueError(apiErrorMessage(err, "Couldn't load the review queue."))
        } finally {
            if (mounted.current && seq === queueSeq.current) setQueueLoading(false)
        }
    }, [statuses, query, page])

    const loadDetail = useCallback(async (id, { quiet = false } = {}) => {
        const seq = ++detailSeq.current
        setDetailLoading(true)
        if (!quiet) setDetailError(null)
        try {
            const res = await api.get(`${API_ENDPOINTS.reviewAnswer}${id}`)
            if (!mounted.current || seq !== detailSeq.current) return
            setDetail(res.data?.data || null)
            setDetailError(null)
        } catch (err) {
            if (!mounted.current || seq !== detailSeq.current) return
            if (isForbidden(err)) setForbidden(true)
            else setDetailError(apiErrorMessage(err, "Couldn't load this answer."))
        } finally {
            if (mounted.current && seq === detailSeq.current) setDetailLoading(false)
        }
    }, [])

    useEffect(() => { loadStats() }, [loadStats])
    useEffect(() => { loadQueue() }, [loadQueue])

    useEffect(() => {
        if (selectedId) loadDetail(selectedId)
    }, [selectedId, loadDetail])

    // Debounced search; a new search starts from the first page
    useEffect(() => {
        const next = search.trim()
        if (next === query) return
        const timer = setTimeout(() => {
            setQuery(next)
            setPage(1)
        }, 350)
        return () => clearTimeout(timer)
    }, [search, query])

    // Desktop shows the first item straight away so the detail pane is never blank
    useEffect(() => {
        if (isDesktop && !selectedId && queue?.items.length) setSelectedId(queue.items[0].id)
    }, [isDesktop, selectedId, queue])

    const changeTab = (key) => {
        if (key === tab) return
        setTab(key)
        setPage(1)
        setQueue(null) // so the first item of the new tab, not the old one, gets auto-selected
        setSelectedId(null)
        setDetail(null)
    }

    const selectItem = (id) => {
        if (!isDesktop) {
            listScroll.current = window.scrollY
            window.scrollTo(0, 0)
        }
        setSelectedId(id)
    }

    const backToQueue = () => {
        setSelectedId(null)
        requestAnimationFrame(() => window.scrollTo(0, listScroll.current))
    }

    const refreshAll = () => {
        loadStats()
        loadQueue()
        if (selectedId) loadDetail(selectedId, { quiet: true })
    }

    const changeStatus = async (status, note) => {
        if (!selectedId) return false
        const id = selectedId
        setActing(status)
        try {
            await api.post(`${API_ENDPOINTS.reviewAnswer}${id}/status`, note ? { status, note } : { status })
            toast.success(SUCCESS_TEXT[status] || 'Status updated')
            await Promise.all([loadDetail(id, { quiet: true }), loadStats(), loadQueue()])
            return true
        } catch (err) {
            if (isForbidden(err)) setForbidden(true)
            toast.error(apiErrorMessage(err, "Couldn't update the status."))
            return false
        } finally {
            if (mounted.current) setActing(null)
        }
    }

    if (forbidden) {
        return (
            <div className='review-page'>
                <section className='rv-card rv-access' role='alert'>
                    <span className='rv-access-icon'><LockIcon /></span>
                    <h1>Reviewer access required</h1>
                    <p>
                        The review queue is only open to reviewers. If you should have access, ask the project admin to add
                        your email to the reviewer list, then reload this page.
                    </p>
                    <button type='button' className='blue-btn px-4' onClick={() => navigate('/dashboard')}>Back to Home</button>
                </section>
            </div>
        )
    }

    const by = stats?.by_status || {}
    const tabCount = (t) => (stats ? t.statuses.reduce((n, s) => n + (by[s] || 0), 0) : null)
    const items = queue?.items || []
    const total = queue?.total || 0
    const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))
    const from = total ? (page - 1) * PAGE_SIZE + 1 : 0
    const to = Math.min(total, page * PAGE_SIZE)
    const activeTab = TABS.find(t => t.key === tab)

    const showList = isDesktop || !selectedId
    const showDetail = isDesktop || !!selectedId
    const pageHeight = isDesktop ? Math.max(MIN_DESKTOP_HEIGHT, viewport.height - TICKER_HEIGHT - NAV_HEIGHT) : undefined

    return (
        <div className={`review-page${isDesktop ? ' desktop' : ''}`} style={pageHeight ? { height: pageHeight } : undefined}>
            {showList && (
                <>
                    <div className='rv-header'>
                        <div>
                            <h1 className='rv-title'>Review queue</h1>
                            <div className='rv-subtitle'>
                                Check answers against their sources before they count as verified.
                                <button type='button' className='rv-refresh' onClick={refreshAll} title='Refresh' aria-label='Refresh queue and stats' disabled={queueLoading}>
                                    <RefreshIcon />
                                </button>
                            </div>
                        </div>
                    </div>

                    <StatsStrip stats={stats} />

                    <div className='rv-toolbar'>
                        <div className='rv-tabs' role='tablist' aria-label='Filter by status'>
                            {TABS.map(t => {
                                const count = tabCount(t)
                                return (
                                    <button
                                        key={t.key}
                                        type='button'
                                        role='tab'
                                        aria-selected={tab === t.key}
                                        className={`rv-tab${tab === t.key ? ' active' : ''}`}
                                        onClick={() => changeTab(t.key)}
                                    >
                                        {t.label}
                                        {count != null && <span className='rv-tab-count'>{count}</span>}
                                    </button>
                                )
                            })}
                        </div>
                        <div className='rv-search'>
                            <SearchIcon />
                            <input
                                type='search'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder='Search questions and answers'
                                aria-label='Search questions and answers'
                            />
                        </div>
                    </div>
                </>
            )}

            <div className='rv-panes'>
                {showList && (
                    <section className='rv-card rv-queue' aria-label={`${activeTab.label} queue`}>
                        <div className='rv-queue-scroll'>
                            {queueLoading && !queue && (
                                <div className='rv-queue-skeleton' aria-hidden='true'>
                                    {[0, 1, 2, 3].map(i => <div key={i} className='sk sk-item' />)}
                                </div>
                            )}
                            {queueError && (
                                <div className='rv-banner error' role='alert'>
                                    {queueError} <button type='button' onClick={loadQueue}>Try again</button>
                                </div>
                            )}
                            {queue && items.length === 0 && !queueError && (
                                <div className='rv-queue-empty'>
                                    {query ? `No answers match “${query}”.` : activeTab.empty}
                                </div>
                            )}
                            {items.length > 0 && (
                                <ul className={`rv-queue-list${queueLoading ? ' refreshing' : ''}`}>
                                    {items.map(item => (
                                        <QueueItem key={item.id} item={item} selected={item.id === selectedId} onSelect={selectItem} />
                                    ))}
                                </ul>
                            )}
                        </div>
                        {total > 0 && (
                            <nav className='rv-pager' aria-label='Queue pages'>
                                <span className='rv-pager-text'>{from}–{to} of {total}</span>
                                <div className='rv-pager-btns'>
                                    <button type='button' onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1 || queueLoading}>Previous</button>
                                    <button type='button' onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page >= pages || queueLoading}>Next</button>
                                </div>
                            </nav>
                        )}
                    </section>
                )}

                {showDetail && (
                    <section className='rv-card rv-detail' aria-label='Answer details'>
                        <ReviewDetail
                            key={selectedId || 'none'}
                            selectedId={selectedId}
                            detail={detail}
                            loading={detailLoading}
                            error={detailError}
                            onReload={() => selectedId && loadDetail(selectedId)}
                            onBack={isDesktop ? null : backToQueue}
                            onAction={changeStatus}
                            acting={acting}
                        />
                    </section>
                )}
            </div>
        </div>
    )
}

export default Review
