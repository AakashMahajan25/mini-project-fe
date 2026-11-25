import React, { useEffect, useState } from "react";
import moment from "moment";
import api from "../../utils/api";
import { API_ENDPOINTS, METHOD_TYPE } from "../../utils/apiUrls";
import './StockPriceScroll.scss'

// Server pulls quotes hourly; polling its cache more often just picks the new batch up sooner
const POLL_MS = 10 * 60 * 1000;
const SECONDS_PER_ITEM = 3;

const MARKET_FLAGS = {
    IN: { label: 'India', flag: 'https://flagcdn.com/32x24/in.png' },
    US: { label: 'US', flag: 'https://flagcdn.com/32x24/us.png' },
};

export function useTickerQuotes() {
    const [data, setData] = useState({ quotes: [], updatedAt: null });

    useEffect(() => {
        let cancelled = false;
        const load = () => {
            api({ method: METHOD_TYPE.get, url: API_ENDPOINTS.stockTicker })
                .then(res => { if (!cancelled && res.data?.data) setData(res.data.data) })
                .catch(() => {}); // keep showing the last quotes
        };
        load();
        const timer = setInterval(load, POLL_MS);
        return () => {
            cancelled = true;
            clearInterval(timer);
        };
    }, []);

    return data;
}

function formatPrice(quote) {
    const value = quote.price.toLocaleString(quote.market === 'IN' ? 'en-IN' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (quote.type === 'index') return value;
    return (quote.currency === 'INR' ? '₹' : '$') + value;
}

function TickerItems({ quotes, hidden }) {
    return (
        <div className="ticker-items" aria-hidden={hidden || undefined}>
            {quotes.map((quote, index) => {
                const direction = quote.changePct > 0 ? 'up' : quote.changePct < 0 ? 'down' : 'flat';
                const startsMarket = index === 0 || quotes[index - 1].market !== quote.market;
                return (
                    <React.Fragment key={quote.symbol}>
                        {startsMarket &&
                            <span className="ticker-market">
                                <img src={MARKET_FLAGS[quote.market]?.flag} alt="" />
                                {MARKET_FLAGS[quote.market]?.label}
                            </span>
                        }
                        <span className={`ticker-item ${quote.type}`}>
                            <span className="ticker-label">{quote.label}</span>
                            <span className="ticker-price">{formatPrice(quote)}</span>
                            <span className={`ticker-change ${direction}`}>
                                {direction === 'up' ? '▲' : direction === 'down' ? '▼' : ''}
                                {direction === 'flat' ? '0.00%' : `${Math.abs(quote.changePct).toFixed(2)}%`}
                            </span>
                        </span>
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default function StockPriceScroll({ quotes = [], updatedAt, className = '' }) {
    return (
        <div className={`stock-ticker ${className}`} aria-label="Market ticker">
            {quotes.length === 0 ? (
                <div className="ticker-placeholder">Loading market data…</div>
            ) : (
                <div className="ticker-viewport">
                    {/* Two copies so the loop scrolls seamlessly */}
                    <div className="ticker-track" style={{ animationDuration: `${quotes.length * SECONDS_PER_ITEM}s` }}>
                        <TickerItems quotes={quotes} />
                        <TickerItems quotes={quotes} hidden />
                    </div>
                </div>
            )}
            {updatedAt &&
                <div className="ticker-updated" title={`Prices refresh hourly. Last pulled ${moment(updatedAt).format('D MMM, h:mm A')}`}>
                    Updated {moment(updatedAt).format('h:mm A')}
                </div>
            }
        </div>
    );
}
