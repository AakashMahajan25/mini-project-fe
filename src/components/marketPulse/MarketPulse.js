import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactGA from 'react-ga4';
import useMarketOverview from './useMarketOverview';
import LiveBadge from './LiveBadge';
import PulseErrorBoundary from './PulseErrorBoundary';
import { BreadthBar, ChangeArrow, ChevronIcon, ExternalIcon, RefreshIcon, Skeleton, breadthTotals } from './PulseParts';
import { MARKETS, clockTime, direction, formatChange, formatNumber, formatPct, formatPrice, fullTime, marketLabel, timeAgo } from './format';
import BullishImg from '../../assets/images/bullish_img.png';
import BearishImg from '../../assets/images/bearish_img.png';
import './MarketPulse.scss';

const TRENDING_PREVIEW = 6;

function MarketToggle({ market, onChange }) {
    if (!onChange) return null;
    return (
        <div className='mp-market-toggle' role='group' aria-label='Market'>
            {MARKETS.map(m => (
                <button
                    key={m.code}
                    type='button'
                    aria-pressed={market === m.code}
                    className={market === m.code ? 'active' : ''}
                    onClick={() => market !== m.code && onChange(m.code)}
                >
                    <img src={m.flag} alt='' />{m.label}
                </button>
            ))}
        </div>
    );
}

// ── Index strip ──────────────────────────────────────────────────────────────
function IndexCard({ index, market }) {
    const dir = direction(index.change_pct);
    const change = formatChange(index.change, market);
    return (
        <div className='mp-card mp-index-card' role='listitem'>
            <div className='mp-index-label'>{index.label}</div>
            <div className='mp-index-price'>{formatNumber(index.price, market)}</div>
            <div className={`mp-change ${dir}`}>
                <ChangeArrow dir={dir} />
                {change && <span>{change}</span>}
                <span>({formatPct(index.change_pct)})</span>
            </div>
        </div>
    );
}

function BreadthCard({ breadth, wide }) {
    const { advancing, declining, unchanged, total } = breadthTotals(breadth);
    return (
        <div className={`mp-card mp-breadth-card ${wide ? 'wide' : ''}`} role='listitem'>
            <div className='mp-index-label'>
                Market breadth
                {total > 0 && <span className='mp-card-meta'>{total} large caps</span>}
            </div>
            {total > 0 ? (
                <>
                    <BreadthBar breadth={breadth} />
                    <div className='mp-breadth-legend'>
                        <span className='up'><strong>{advancing}</strong> advancing</span>
                        <span className='down'><strong>{declining}</strong> declining</span>
                        {unchanged > 0 && <span className='flat'><strong>{unchanged}</strong> unchanged</span>}
                    </div>
                </>
            ) : (
                <p className='mp-empty'>Appears after the first price update.</p>
            )}
        </div>
    );
}

function IndexStrip({ indices: indexList, breadth, market, loading }) {
    const indices = indexList || [];
    if (loading) {
        return (
            <div className='mp-index-strip' style={{ '--mp-index-count': 2 }} aria-busy='true' aria-label='Loading indices'>
                {[0, 1, 2].map(i => (
                    <div key={i} className={`mp-card mp-index-card ${i === 2 ? 'mp-breadth-card' : ''}`}>
                        <Skeleton width='45%' size='sm' />
                        <Skeleton width='70%' size='lg' />
                        <Skeleton width='55%' size='sm' />
                    </div>
                ))}
            </div>
        );
    }
    return (
        <div className='mp-index-strip' style={{ '--mp-index-count': Math.max(indices.length, 1) }} role='list' aria-label='Indices and market breadth'>
            {indices.length > 0
                ? indices.map(index => <IndexCard key={index.symbol || index.label} index={index} market={market} />)
                : (
                    <div className='mp-card mp-index-card' role='listitem'>
                        <div className='mp-index-label'>Indices</div>
                        <p className='mp-empty'>Index prices appear after the first price update (every 15 minutes).</p>
                    </div>
                )}
            <BreadthCard breadth={breadth} wide={Math.max(indices.length, 1) % 2 === 0} />
        </div>
    );
}

// ── Movers ───────────────────────────────────────────────────────────────────
function SkeletonRows({ count, tall = false }) {
    return (
        <div className='mp-skeleton-rows' aria-hidden='true'>
            {Array.from({ length: count }, (_, i) => (
                <div key={i} className={`mp-skeleton-row ${tall ? 'tall' : ''}`}>
                    <Skeleton width='38%' />
                    <Skeleton width='22%' />
                    {tall && <Skeleton width='85%' size='sm' />}
                </div>
            ))}
        </div>
    );
}

function MoversCard({ kind, stocks: stockList, market, loading, onAsk }) {
    const stocks = stockList || [];
    const gainers = kind === 'gainers';
    const titleId = `mp-${kind}-title`;
    return (
        <section className={`mp-card mp-movers ${kind}`} aria-labelledby={titleId} aria-busy={loading || undefined}>
            <div className='mp-card-head'>
                <h2 id={titleId} className='mp-card-title'>{gainers ? 'Top gainers' : 'Top losers'}</h2>
                <span className='mp-card-meta'>Large caps · today</span>
            </div>
            {loading ? <SkeletonRows count={5} /> : stocks.length > 0 ? (
                <ul className='mp-stock-list'>
                    {stocks.map(stock => {
                        const dir = direction(stock.change_pct);
                        const pct = formatPct(stock.change_pct);
                        return (
                            <li key={stock.ticker}>
                                <button
                                    type='button'
                                    className='mp-stock-row'
                                    onClick={() => onAsk(stock)}
                                    title={`Ask Frruit why ${stock.name || stock.ticker} moved ${pct} today`}
                                >
                                    <span className='mp-stock-id'>
                                        <span className='mp-ticker'>{stock.ticker}</span>
                                        {stock.name && stock.name !== stock.ticker && <span className='mp-stock-name'>{stock.name}</span>}
                                    </span>
                                    <span className='mp-stock-quote'>
                                        <span className='mp-price'>{formatPrice(stock.price, stock.currency, market)}</span>
                                        <span className={`mp-pct ${dir}`}><ChangeArrow dir={dir} />{pct}</span>
                                    </span>
                                    <span className='visually-hidden'>. Ask Frruit why it moved.</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className='mp-empty'>{gainers ? 'No large caps are up so far today.' : 'No large caps are down so far today.'}</p>
            )}
        </section>
    );
}

// ── Trending in the news ─────────────────────────────────────────────────────
function SentimentChip({ sentiment, bullish, bearish, mentions }) {
    if (!sentiment) return null;
    const title = mentions
        ? `${bullish || 0} bullish and ${bearish || 0} bearish of ${mentions} ${mentions === 1 ? 'story' : 'stories'}`
        : undefined;
    return (
        <span className={`mp-sentiment ${sentiment.toLowerCase()}`} title={title}>
            {sentiment}
            {sentiment === 'Bullish' && <img src={BullishImg} alt='' />}
            {sentiment === 'Bearish' && <img src={BearishImg} alt='' />}
        </span>
    );
}

function TrendingCard({ trending: trendingList, market, loading, onTickerClick }) {
    const trending = trendingList || [];
    const [expanded, setExpanded] = useState(false);
    const visible = expanded ? trending : trending.slice(0, TRENDING_PREVIEW);
    const hidden = trending.length - visible.length;

    return (
        <section className='mp-card mp-trending' aria-labelledby='mp-trending-title' aria-busy={loading || undefined}>
            <div className='mp-card-head'>
                <h2 id='mp-trending-title' className='mp-card-title'>Trending in the news</h2>
                <span className='mp-card-meta'>Last 24 h · by mentions</span>
            </div>
            {loading ? <SkeletonRows count={4} tall /> : trending.length > 0 ? (
                <>
                    <ol className='mp-trending-list'>
                        {visible.map(item => {
                            const hasQuote = item.change_pct !== null && item.change_pct !== undefined;
                            const dir = direction(item.change_pct);
                            const headline = item.headline || {};
                            return (
                                <li key={item.ticker} className='mp-trending-item'>
                                    <div className='mp-trending-top'>
                                        <button
                                            type='button'
                                            className='mp-ticker-chip'
                                            onClick={() => onTickerClick(item.ticker)}
                                            title={`Show news about ${item.ticker}`}
                                        >
                                            {item.ticker}
                                        </button>
                                        {item.name && item.name !== item.ticker && <span className='mp-trending-name'>{item.name}</span>}
                                        <span className='mp-trending-right'>
                                            {hasQuote && (
                                                <span className='mp-trending-quote'>
                                                    {item.price !== null && item.price !== undefined &&
                                                        <span className='mp-price'>{formatPrice(item.price, item.currency, market)}</span>}
                                                    <span className={`mp-pct ${dir}`}><ChangeArrow dir={dir} />{formatPct(item.change_pct)}</span>
                                                </span>
                                            )}
                                            <SentimentChip sentiment={item.sentiment} bullish={item.bullish} bearish={item.bearish} mentions={item.mentions} />
                                        </span>
                                    </div>
                                    {headline.title && (
                                        <p className='mp-trending-headline'>
                                            {headline.link
                                                ? <a href={headline.link} target='_blank' rel='noopener noreferrer'>{headline.title}</a>
                                                : headline.title}
                                        </p>
                                    )}
                                    <div className='mp-meta-line'>
                                        {headline.source && <span className='mp-source-name'>{headline.source}</span>}
                                        {headline.published_at &&
                                            <time dateTime={headline.published_at} title={fullTime(headline.published_at)}>{timeAgo(headline.published_at)}</time>}
                                        <span>{item.mentions} {item.mentions === 1 ? 'story' : 'stories'}</span>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                    {(hidden > 0 || expanded) && trending.length > TRENDING_PREVIEW && (
                        <button type='button' className='mp-link-btn mp-more-btn' onClick={() => setExpanded(v => !v)} aria-expanded={expanded}>
                            {expanded ? 'Show fewer' : `Show ${hidden} more`}
                        </button>
                    )}
                </>
            ) : (
                <div className='mp-empty-state'>
                    <p className='mp-empty-title'>No trending stocks yet</p>
                    <p className='mp-empty'>Companies show up here once today's headlines have been tagged with the stocks they mention.</p>
                </div>
            )}
        </section>
    );
}

// ── Market summary ───────────────────────────────────────────────────────────
function SourceLink({ source }) {
    const ago = timeAgo(source.published_at);
    const text = [source.source || 'Source', ago].filter(Boolean).join(' · ');
    if (!source.link) return <span className='mp-source' title={source.title}>{text}</span>;
    return (
        <a
            className='mp-source'
            href={source.link}
            target='_blank'
            rel='noopener noreferrer'
            title={source.title}
            aria-label={`${source.title || 'Source'} (${[source.source, ago].filter(Boolean).join(', ')}, opens in a new tab)`}
        >
            {text}<ExternalIcon />
        </a>
    );
}

function SummaryCard({ summary, loading }) {
    const ai = summary?.generated_by === 'ai';
    const points = summary?.points || [];
    const generated = clockTime(summary?.generated_at);
    const count = summary?.article_count ?? points.length;
    const label = !summary ? null : ai
        ? `AI summary of ${count} ${count === 1 ? 'headline' : 'headlines'}${generated ? ` · generated ${generated}` : ''}`
        : 'Latest headlines (AI summary pending)';

    return (
        <section className='mp-card mp-summary' aria-labelledby='mp-summary-title' aria-busy={loading || undefined}>
            <div className='mp-card-head'>
                <h2 id='mp-summary-title' className='mp-card-title'>Market summary</h2>
                {label && (
                    <span className={`mp-summary-label ${ai ? 'ai' : 'pending'}`} title={ai ? fullTime(summary.generated_at) : undefined}>
                        {label}
                    </span>
                )}
            </div>
            {loading ? (
                <div className='mp-skeleton-rows' aria-hidden='true'>
                    <Skeleton width='96%' size='sm' />
                    <Skeleton width='90%' size='sm' />
                    <Skeleton width='70%' size='sm' />
                </div>
            ) : !summary ? (
                <p className='mp-empty'>The market summary isn't available yet.</p>
            ) : (
                <>
                    {summary.drivers && <p className='mp-drivers'>{summary.drivers}</p>}
                    {points.length > 0 ? (
                        <div className='mp-points'>
                            {points.map((point, index) => (
                                <article key={`${index}-${point.title}`} className='mp-point'>
                                    <h3 className='mp-point-title'>{point.title}</h3>
                                    {point.summary && point.summary !== point.title && <p className='mp-point-text'>{point.summary}</p>}
                                    {point.sources?.length > 0 && (
                                        <ul className='mp-sources' aria-label='Sources'>
                                            {point.sources.map((source, i) => (
                                                <li key={source.id ?? i}><SourceLink source={source} /></li>
                                            ))}
                                        </ul>
                                    )}
                                </article>
                            ))}
                        </div>
                    ) : (
                        <p className='mp-empty'>No headlines from the last 24 hours yet.</p>
                    )}
                    <p className='mp-disclaimer'>Generated only from the headlines listed above. Not investment advice.</p>
                </>
            )}
        </section>
    );
}

// ── Page ─────────────────────────────────────────────────────────────────────
function MarketPulse({ market = 'IN', onMarketChange, onBack }) {
    const navigate = useNavigate();
    const { data, loading, error, fetchedAt, refresh } = useMarketOverview(market);
    const initialLoading = !data && !error;
    const updatedIso = data?.movers_updated_at || (data ? fetchedAt : null);
    const updated = clockTime(updatedIso);

    const askFrruit = (stock) => {
        ReactGA.event({ category: 'Dashboard', action: 'market_pulse_ask_frruit', label: 'Ask Frruit about a market mover' });
        const move = direction(stock.change_pct) === 'down' ? 'down' : 'up';
        const pct = formatPct(stock.change_pct).replace(/^[+-]/, '');
        navigate('/frruit-gpt', {
            state: { question: `Why is ${stock.name || stock.ticker} (${stock.ticker}) ${move} ${pct} today?`, fundamental: 'news' },
        });
    };

    const openTickerNews = (ticker) => {
        ReactGA.event({ category: 'Dashboard', action: 'market_pulse_ticker_news', label: 'Open news for a trending ticker' });
        navigate('/news-feed', { state: { q: ticker, market } });
    };

    return (
        <div className='market-pulse'>
            <div className='mp-toprow'>
                {onBack ? (
                    <button type='button' className='mp-back-btn' onClick={onBack}>
                        <ChevronIcon left /> Back
                    </button>
                ) : <span />}
                <MarketToggle market={market} onChange={onMarketChange} />
            </div>

            <header className='mp-header'>
                <h1 className='mp-title'>Market pulse <span className='mp-title-market'>· {marketLabel(market)}</span></h1>
                <div className='mp-subtitle'>
                    <LiveBadge pollNote='every 5 minutes' />
                    {updated && (
                        <span title={`Prices refresh every 15 minutes; news and the summary update as headlines arrive. Last checked ${fullTime(fetchedAt)}.`}>
                            Updated {updated}
                        </span>
                    )}
                    <button
                        type='button'
                        className='mp-icon-btn'
                        onClick={refresh}
                        disabled={loading}
                        aria-label='Refresh market data'
                        title='Refresh'
                    >
                        <RefreshIcon spinning={loading && !!data} />
                    </button>
                </div>
            </header>

            {error && !data ? (
                <div className='mp-card mp-error' role='alert'>
                    <p>Couldn't load market data right now.</p>
                    <button type='button' className='mp-outline-btn' onClick={refresh} disabled={loading}>
                        {loading ? 'Retrying…' : 'Try again'}
                    </button>
                </div>
            ) : (
                <>
                    {error && data && (
                        <div className='mp-stale' role='status'>
                            Couldn't refresh{fetchedAt ? `, showing data from ${clockTime(fetchedAt)}` : ''}.
                            <button type='button' className='mp-link-btn' onClick={refresh} disabled={loading}>Retry</button>
                        </div>
                    )}

                    <IndexStrip indices={data?.indices} breadth={data?.breadth} market={market} loading={initialLoading} />

                    <div className='mp-grid'>
                        <MoversCard kind='gainers' stocks={data?.gainers} market={market} loading={initialLoading} onAsk={askFrruit} />
                        <MoversCard kind='losers' stocks={data?.losers} market={market} loading={initialLoading} onAsk={askFrruit} />
                        <TrendingCard key={market} trending={data?.trending} market={market} loading={initialLoading} onTickerClick={openTickerNews} />
                    </div>

                    <SummaryCard summary={data?.summary} loading={initialLoading} />
                </>
            )}
        </div>
    );
}

export default function MarketPulseSection(props) {
    return (
        <PulseErrorBoundary>
            <MarketPulse {...props} />
        </PulseErrorBoundary>
    );
}
