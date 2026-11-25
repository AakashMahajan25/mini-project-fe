import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import ReactGA from 'react-ga4'
import { checkNewsUpdates, fetchNewsFeed, fetchNewsInsights } from './slice'
import { LIVE_RECONNECTED, useLiveEvent } from '../../utils/liveSocket'
import LiveBadge from '../../components/marketPulse/LiveBadge'
import { clockTime, prefersReducedMotion } from '../../components/marketPulse/format'
import FrruitLogoCircle from '../../assets/images/frruit-logo-circle.png'
import BullishImg from '../../assets/images/bullish_img.png'
import BearishImg from '../../assets/images/bearish_img.png'
import './NewsFeed.scss'

const MARKETS = [
    { code: 'IN', label: 'India', flag: 'https://flagcdn.com/32x24/in.png' },
    { code: 'US', label: 'US', flag: 'https://flagcdn.com/32x24/us.png' },
]
const SENTIMENTS = ['Bullish', 'Neutral', 'Bearish']
// Fallback check when the live socket is down; "news:new" events normally trigger it right away
const UPDATE_POLL_MS = 2 * 60 * 1000
// How long newly loaded stories stay highlighted
const NEW_HIGHLIGHT_MS = 8000

// Newest published_at among the stories shown for this market (the list may still hold the previous market's)
function newestPublished(articles, market) {
    let newest = null
    articles.forEach(article => {
        if (article.market && article.market !== market) return
        const time = new Date(article.published_at).getTime()
        if (!Number.isNaN(time) && (!newest || time > newest.time)) newest = { time, iso: article.published_at }
    })
    return newest ? newest.iso : null
}

const laterOf = (a, b) => (!a ? b : !b ? a : new Date(b) > new Date(a) ? b : a)

const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
    </svg>
)

const RefreshIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 3v6h-6" />
    </svg>
)

const ArrowUpIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5" /><path d="M5 12l7-7 7 7" />
    </svg>
)

function SentimentPill({ sentiment }) {
    if (!sentiment) return null
    return (
        <span className={`sentiment-pill ${sentiment.toLowerCase()}`}>
            {sentiment}
            {sentiment === 'Bullish' && <img src={BullishImg} alt="" />}
            {sentiment === 'Bearish' && <img src={BearishImg} alt="" />}
        </span>
    )
}

function NewsCard({ article, isNew, onTickerClick, onAskFrruit }) {
    const published = moment(article.published_at)
    const showSummary = article.summary && article.summary !== article.title

    return (
        <article className={`news-card ${isNew ? 'is-new' : ''}`}>
            <div className='news-card-body'>
                <div className='news-meta'>
                    {isNew && <span className='new-badge'>New</span>}
                    <span className='news-source'>{article.source}</span>
                    <span className='dot'>·</span>
                    <span>{article.category}</span>
                    <span className='dot'>·</span>
                    <span title={published.format('D MMM YYYY, h:mm A')}>{published.fromNow()}</span>
                </div>
                <a className='news-title' href={article.link} target='_blank' rel='noopener noreferrer'>{article.title}</a>
                {showSummary && <p className='news-summary'>{article.summary}</p>}
                <div className='news-footer'>
                    <SentimentPill sentiment={article.sentiment} />
                    {article.tickers?.map(ticker => (
                        <button key={ticker} className='ticker-chip' onClick={() => onTickerClick(ticker)} title={`Show news about ${ticker}`}>{ticker}</button>
                    ))}
                    <button className='ask-frruit-btn' onClick={() => onAskFrruit(article)}>
                        <img src={FrruitLogoCircle} alt="" />
                        Ask Frruit
                    </button>
                </div>
            </div>
            {article.image_url &&
                <a className='news-thumb' href={article.link} target='_blank' rel='noopener noreferrer' tabIndex={-1}>
                    <img src={article.image_url} alt="" loading="lazy" onError={e => { e.currentTarget.parentElement.style.display = 'none' }} />
                </a>
            }
        </article>
    )
}

function MarketMood({ insights }) {
    const mood = insights?.mood || {}
    const total = SENTIMENTS.reduce((sum, s) => sum + (mood[s] || 0), 0)

    return (
        <div className='side-card'>
            <div className='side-card-title'>Market mood <span>last 24h</span></div>
            {total === 0 ? (
                <p className='side-card-empty'>Sentiment appears here once today's stories are analysed.</p>
            ) : (
                <>
                    <div className='mood-bar'>
                        {SENTIMENTS.map(s => mood[s] > 0 &&
                            <div key={s} className={`mood-segment ${s.toLowerCase()}`} style={{ flexGrow: mood[s] }} title={`${s}: ${mood[s]}`} />
                        )}
                    </div>
                    <div className='mood-legend'>
                        {SENTIMENTS.map(s => (
                            <div key={s} className='mood-legend-item'>
                                <span className={`mood-dot ${s.toLowerCase()}`} />
                                {s}
                                <strong>{Math.round(((mood[s] || 0) / total) * 100)}%</strong>
                            </div>
                        ))}
                    </div>
                    <p className='side-card-note'>Based on {total} stories, tagged by AI.</p>
                </>
            )}
        </div>
    )
}

function TrendingTickers({ insights, activeQuery, onTickerClick }) {
    const tickers = insights?.trendingTickers || []
    return (
        <div className='side-card'>
            <div className='side-card-title'>Most mentioned <span>last 24h</span></div>
            {tickers.length === 0 ? (
                <p className='side-card-empty'>No company mentions yet.</p>
            ) : (
                <div className='trending-tickers'>
                    {tickers.map(({ ticker, count }) => (
                        <button
                            key={ticker}
                            className={`ticker-chip large ${activeQuery === ticker ? 'active' : ''}`}
                            onClick={() => onTickerClick(ticker)}
                        >
                            {ticker}<span className='ticker-count'>{count}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

function NewsFeed() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { articles, nextCursor, categories, lastUpdated, insights, isLoading, isLoadingMore, isRefreshing, error } = useSelector(state => state.newsFeedSlice)

    // Links from the dashboard's market pulse open the feed filtered to a ticker: state { q, market }
    const linkState = location.state || {}
    const linkQuery = typeof linkState.q === 'string' ? linkState.q : ''

    const [market, setMarket] = useState(() => {
        if (MARKETS.some(m => m.code === linkState.market)) return linkState.market
        return localStorage.getItem('selectedCountry') === 'US' ? 'US' : 'IN'
    })
    const [category, setCategory] = useState('')
    const [sentiment, setSentiment] = useState('')
    const [searchInput, setSearchInput] = useState(linkQuery)
    const [query, setQuery] = useState(linkQuery.trim())

    // Debounce typing so each keystroke doesn't hit the API
    useEffect(() => {
        const timer = setTimeout(() => setQuery(searchInput.trim()), 400)
        return () => clearTimeout(timer)
    }, [searchInput])

    const filters = useMemo(() => ({
        market,
        category: category || undefined,
        sentiment: sentiment || undefined,
        q: query || undefined,
    }), [market, category, sentiment, query])

    useEffect(() => {
        dispatch(fetchNewsFeed(filters))
    }, [dispatch, filters])

    useEffect(() => {
        dispatch(fetchNewsInsights(market))
    }, [dispatch, market])

    // ── Live updates: "news:new" → count stories newer than the newest one shown → "N new stories" pill ──
    const [newCount, setNewCount] = useState(0)
    const [highlightIds, setHighlightIds] = useState(() => new Set())
    const [isShowingNew, setIsShowingNew] = useState(false)
    const newestSeenRef = useRef({}) // market -> newest published_at loaded so far (kept across filter changes)
    const checkSeqRef = useRef(0)
    const listRef = useRef(null)

    const newestShown = useMemo(() => newestPublished(articles, market), [articles, market])

    useEffect(() => {
        if (newestShown) newestSeenRef.current[market] = laterOf(newestSeenRef.current[market], newestShown)
    }, [newestShown, market])

    // A new market or filter loads a fresh first page, so the old count no longer applies
    useEffect(() => {
        checkSeqRef.current += 1
        setNewCount(0)
    }, [filters])

    const liveStateRef = useRef({})
    liveStateRef.current = { market, filters, newestShown, isLoading, isRefreshing, hasArticles: articles.length > 0 }

    const checkForNew = useCallback(() => {
        const { market: currentMarket, filters: currentFilters, newestShown: shown, isLoading: loading, isRefreshing: refreshing, hasArticles } = liveStateRef.current
        if (loading || refreshing) return
        if (!hasArticles) {
            // Nothing on screen yet (e.g. the server was still fetching on first start): just load quietly
            dispatch(fetchNewsFeed({ ...currentFilters, silent: true }))
            return
        }
        // With filters on, the newest story shown can be old; the newest one seen unfiltered is a better baseline
        const since = laterOf(newestSeenRef.current[currentMarket], shown)
        if (!since) return
        const seq = ++checkSeqRef.current
        dispatch(checkNewsUpdates({ market: currentMarket, since })).unwrap()
            .then(res => {
                if (seq === checkSeqRef.current) setNewCount(Number(res?.count) || 0)
            })
            .catch(() => { /* keep what is shown; the next event or poll tries again */ })
    }, [dispatch])

    useLiveEvent('news:new', (payload) => {
        const added = payload?.byMarket ? payload.byMarket[market] : payload?.added
        if (added > 0) {
            checkForNew()
            dispatch(fetchNewsInsights(market))
        }
    })
    useLiveEvent(LIVE_RECONNECTED, checkForNew)

    useEffect(() => {
        const timer = setInterval(() => {
            if (!document.hidden) checkForNew()
        }, UPDATE_POLL_MS)
        const onVisibility = () => {
            if (!document.hidden) checkForNew()
        }
        document.addEventListener('visibilitychange', onVisibility)
        return () => {
            clearInterval(timer)
            document.removeEventListener('visibilitychange', onVisibility)
        }
    }, [checkForNew])

    useEffect(() => {
        if (highlightIds.size === 0) return undefined
        const timer = setTimeout(() => setHighlightIds(new Set()), NEW_HIGHLIGHT_MS)
        return () => clearTimeout(timer)
    }, [highlightIds])

    const showNewStories = () => {
        const shownIds = new Set(articles.map(a => a.id))
        checkSeqRef.current += 1
        setIsShowingNew(true)
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
        ReactGA.event({
            category: 'News',
            action: 'news_show_new_stories',
            label: 'Show new stories from the live pill'
        });
        dispatch(fetchNewsFeed({ ...filters, silent: true })).unwrap()
            .then(payload => {
                const fresh = (payload?.articles || []).filter(a => !shownIds.has(a.id)).map(a => a.id)
                setHighlightIds(new Set(fresh))
                setNewCount(0)
                if (listRef.current) listRef.current.focus({ preventScroll: true })
            })
            .catch(() => { /* the pill stays so the user can try again */ })
            .finally(() => setIsShowingNew(false))
    }

    const hasFilters = !!(category || sentiment || query)

    const handleMarketChange = (code) => {
        if (code === market) return
        setMarket(code)
        setCategory('')
    }

    const handleTickerClick = (ticker) => {
        setSearchInput(ticker)
        setQuery(ticker)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const clearFilters = () => {
        setCategory('')
        setSentiment('')
        setSearchInput('')
        setQuery('')
    }

    const handleRefresh = () => {
        checkSeqRef.current += 1
        setNewCount(0)
        dispatch(fetchNewsFeed(filters))
        dispatch(fetchNewsInsights(market))
    }

    const handleAskFrruit = (article) => {
        ReactGA.event({
            category: 'News',
            action: 'news_ask_frruit',
            label: 'Ask Frruit about a news story'
        });
        navigate('/frruit-gpt', {
            state: { question: `${article.title} — what does this mean for investors?`, fundamental: 'news' },
        })
    }

    return (
        <div className='news-feed-page'>
            <div className='news-feed-header'>
                <div>
                    <h1 className='news-feed-title'>Market News</h1>
                    <div className='news-feed-subtitle'>
                        <LiveBadge pollNote='every 2 minutes' />
                        <span>Live headlines from leading financial publishers</span>
                        {lastUpdated &&
                            <span className='news-updated' title={`Feeds last checked ${moment(lastUpdated).fromNow()}`}>· Updated {clockTime(lastUpdated)}</span>
                        }
                        <button className='refresh-btn' onClick={handleRefresh} title='Refresh' aria-label='Refresh news'><RefreshIcon /></button>
                    </div>
                    <span className='visually-hidden' aria-live='polite'>
                        {newCount > 0 ? `${newCount} new ${newCount === 1 ? 'story' : 'stories'} available` : ''}
                    </span>
                </div>
                <div className='market-toggle' role='tablist' aria-label='Market'>
                    {MARKETS.map(m => (
                        <button
                            key={m.code}
                            role='tab'
                            aria-selected={market === m.code}
                            className={market === m.code ? 'active' : ''}
                            onClick={() => handleMarketChange(m.code)}
                        >
                            <img src={m.flag} alt="" />{m.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className='news-toolbar'>
                <div className='news-search'>
                    <SearchIcon />
                    <input
                        type='text'
                        placeholder='Search headlines or tickers, e.g. Infosys, NVDA'
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                    />
                    {searchInput && <button className='clear-search' onClick={() => { setSearchInput(''); setQuery('') }} aria-label='Clear search'>×</button>}
                </div>
                <div className='news-filters'>
                    <div className='category-chips'>
                        {['', ...categories].map(c => (
                            <button key={c || 'all'} className={`filter-chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>
                                {c || 'All'}
                            </button>
                        ))}
                    </div>
                    <div className='sentiment-filter'>
                        {['', ...SENTIMENTS].map(s => (
                            <button key={s || 'any'} className={`filter-chip ${s ? s.toLowerCase() : ''} ${sentiment === s ? 'active' : ''}`} onClick={() => setSentiment(s)}>
                                {s || 'Any sentiment'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className='news-layout'>
                <aside className='news-sidebar'>
                    <MarketMood insights={insights} />
                    <TrendingTickers insights={insights} activeQuery={query} onTickerClick={handleTickerClick} />
                </aside>

                <main className='news-list' ref={listRef} tabIndex={-1} aria-label='Stories' aria-busy={isLoading || isRefreshing || undefined}>
                    {newCount > 0 && !isLoading &&
                        <div className='new-stories-bar'>
                            <button type='button' className='new-stories-pill' onClick={showNewStories} disabled={isShowingNew}>
                                <ArrowUpIcon />
                                {isShowingNew ? 'Loading new stories…' : `${newCount} new ${newCount === 1 ? 'story' : 'stories'}`}
                            </button>
                        </div>
                    }

                    {isLoading && [0, 1, 2, 3, 4].map(i => (
                        <div key={i} className='news-card skeleton'>
                            <div className='news-card-body'>
                                <div className='sk sk-meta' />
                                <div className='sk sk-title' />
                                <div className='sk sk-title short' />
                                <div className='sk sk-text' />
                            </div>
                            <div className='sk sk-thumb' />
                        </div>
                    ))}

                    {!isLoading && error &&
                        <div className='news-empty'>
                            <p>Couldn't load news right now.</p>
                            <button className='primary-outline-btn' onClick={handleRefresh}>Try again</button>
                        </div>
                    }

                    {!isLoading && !error && articles.length === 0 &&
                        <div className='news-empty'>
                            {hasFilters ? (
                                <>
                                    <p>No stories match these filters.</p>
                                    <button className='primary-outline-btn' onClick={clearFilters}>Clear filters</button>
                                </>
                            ) : (
                                <>
                                    <p>Fetching the latest headlines. This takes a few seconds on first start.</p>
                                    <button className='primary-outline-btn' onClick={handleRefresh}>Refresh</button>
                                </>
                            )}
                        </div>
                    }

                    {!isLoading && articles.map(article => (
                        <NewsCard key={article.id} article={article} isNew={highlightIds.has(article.id)} onTickerClick={handleTickerClick} onAskFrruit={handleAskFrruit} />
                    ))}

                    {!isLoading && nextCursor &&
                        <button
                            className='load-more-btn'
                            disabled={isLoadingMore}
                            onClick={() => dispatch(fetchNewsFeed({ ...filters, cursor: nextCursor }))}
                        >
                            {isLoadingMore ? 'Loading…' : 'Load more stories'}
                        </button>
                    }
                </main>
            </div>
        </div>
    )
}

export default NewsFeed
