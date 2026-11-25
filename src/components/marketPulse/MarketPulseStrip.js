import React from 'react';
import useMarketOverview from './useMarketOverview';
import LiveBadge from './LiveBadge';
import PulseErrorBoundary from './PulseErrorBoundary';
import { BreadthBar, ChangeArrow, ChevronIcon, Skeleton, breadthTotals } from './PulseParts';
import { clockTime, direction, formatNumber, formatPct, marketLabel } from './format';
import './MarketPulse.scss';

// Compact live index strip for the dashboard home; the whole strip opens the full market pulse
function MarketPulseStrip({ market = 'IN', onOpen }) {
    const { data, error, fetchedAt } = useMarketOverview(market);
    const indices = data?.indices || [];
    const { advancing, declining, total } = breadthTotals(data?.breadth);
    const updated = clockTime(data?.movers_updated_at || (data ? fetchedAt : null));

    let body;
    if (!data && !error) {
        body = [0, 1].map(i => (
            <span key={i} className='mp-strip-index'>
                <Skeleton width='72px' size='sm' />
                <Skeleton width='96px' />
            </span>
        ));
    } else if (!data) {
        body = <span className='mp-strip-note'>Market data is unavailable right now. Open the pulse to retry.</span>;
    } else if (indices.length === 0) {
        body = <span className='mp-strip-note'>Index prices appear after the first price update.</span>;
    } else {
        body = indices.map(index => {
            const dir = direction(index.change_pct);
            return (
                <span key={index.symbol || index.label} className='mp-strip-index'>
                    <span className='mp-strip-label'>{index.label}</span>
                    <span className='mp-strip-value'>
                        <span className='mp-strip-price'>{formatNumber(index.price, market)}</span>
                        <span className={`mp-pct ${dir}`}><ChangeArrow dir={dir} />{formatPct(index.change_pct)}</span>
                    </span>
                </span>
            );
        });
    }

    return (
        <button type='button' className='mp-strip' onClick={onOpen}>
            <span className='mp-strip-head'>
                <span className='mp-strip-title'>
                    <LiveBadge pollNote='every 5 minutes' />
                    <span className='mp-strip-name'>Market pulse · {marketLabel(market)}</span>
                </span>
                <span className='mp-strip-cta'>
                    {updated && <span className='mp-strip-updated'>Updated {updated}</span>}
                    <span className='mp-strip-open'>Open<ChevronIcon /></span>
                </span>
            </span>
            <span className='mp-strip-body'>
                {body}
                {data && total > 0 && (
                    <span className='mp-strip-index mp-strip-breadth'>
                        <span className='mp-strip-label'>Breadth</span>
                        <span className='mp-strip-value'>
                            <BreadthBar breadth={data.breadth} thin />
                            <span className='mp-strip-breadth-text'>
                                <span className='mp-pct up'>{advancing} up</span>
                                <span className='mp-pct down'>{declining} down</span>
                            </span>
                        </span>
                    </span>
                )}
            </span>
        </button>
    );
}

export default function MarketPulseStripSection(props) {
    return (
        <PulseErrorBoundary silent>
            <MarketPulseStrip {...props} />
        </PulseErrorBoundary>
    );
}
