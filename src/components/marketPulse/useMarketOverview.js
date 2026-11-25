import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMarketOverview } from '../../screens/dashboard/slice';
import { LIVE_RECONNECTED, useLiveEvent } from '../../utils/liveSocket';

// Safety net in case the live socket is down; live events normally trigger refreshes much sooner
const FALLBACK_REFRESH_MS = 5 * 60 * 1000;
// Coalesce bursts (e.g. "news:new" followed by "market:summary") into one request
const LIVE_DEBOUNCE_MS = 1500;

const EMPTY = { data: null, loading: false, error: null, fetchedAt: null };

const isForMarket = (payload, market) => !payload?.market || String(payload.market).toUpperCase() === market;

/**
 * GET market/overview for one market, cached per market in the dashboard slice.
 * Refetches on live "market:movers" / "market:summary" / "news:new" events for this market,
 * after a socket reconnect, every 5 minutes, and when the tab comes back after being hidden for a while.
 */
export default function useMarketOverview(market) {
    const dispatch = useDispatch();
    const entry = useSelector(state => state.dashboardSlice.marketOverview?.[market]) || EMPTY;

    const fetchedAtRef = useRef(entry.fetchedAt);
    fetchedAtRef.current = entry.fetchedAt;
    const debounceRef = useRef(null);

    const refresh = useCallback(() => {
        clearTimeout(debounceRef.current);
        return dispatch(getMarketOverview(market));
    }, [dispatch, market]);

    const refreshSoon = useCallback(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(refresh, LIVE_DEBOUNCE_MS);
    }, [refresh]);

    useEffect(() => {
        refresh();
        const timer = setInterval(() => {
            if (!document.hidden) refresh();
        }, FALLBACK_REFRESH_MS);
        const onVisibility = () => {
            const fetchedAt = fetchedAtRef.current ? new Date(fetchedAtRef.current).getTime() : 0;
            if (!document.hidden && Date.now() - fetchedAt > FALLBACK_REFRESH_MS) refresh();
        };
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
            clearInterval(timer);
            clearTimeout(debounceRef.current);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [refresh]);

    useLiveEvent('market:movers', (payload) => {
        if (isForMarket(payload, market)) refreshSoon();
    });
    useLiveEvent('market:summary', (payload) => {
        if (isForMarket(payload, market)) refreshSoon();
    });
    useLiveEvent('news:new', (payload) => {
        const added = payload?.byMarket ? payload.byMarket[market] : payload?.added;
        if (added > 0) refreshSoon();
    });
    useLiveEvent(LIVE_RECONNECTED, refreshSoon);

    return { ...entry, refresh };
}
