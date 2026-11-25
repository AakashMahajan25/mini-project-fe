import moment from 'moment';

export const MARKETS = [
    { code: 'IN', label: 'India', flag: 'https://flagcdn.com/32x24/in.png' },
    { code: 'US', label: 'US', flag: 'https://flagcdn.com/32x24/us.png' },
];

export const marketLabel = (code) => MARKETS.find(m => m.code === code)?.label || code;

const isNumber = (value) => value !== null && value !== undefined && value !== '' && Number.isFinite(Number(value));

export const direction = (value) => {
    if (!isNumber(value)) return 'flat';
    const n = Number(value);
    return n > 0 ? 'up' : n < 0 ? 'down' : 'flat';
};

export function formatNumber(value, market, digits = 2) {
    if (!isNumber(value)) return '—';
    return Number(value).toLocaleString(market === 'IN' ? 'en-IN' : 'en-US', {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    });
}

export function formatPrice(value, currency, market) {
    if (!isNumber(value)) return '—';
    const code = currency || (market === 'IN' ? 'INR' : 'USD');
    const symbol = code === 'INR' ? '₹' : code === 'USD' ? '$' : '';
    return symbol + formatNumber(value, market);
}

const signOf = (n) => (n > 0 ? '+' : n < 0 ? '-' : '');

export function formatPct(value) {
    if (!isNumber(value)) return '—';
    const n = Number(value);
    return `${signOf(n)}${Math.abs(n).toFixed(2)}%`;
}

export function formatChange(value, market) {
    if (!isNumber(value)) return '';
    const n = Number(value);
    return `${signOf(n)}${formatNumber(Math.abs(n), market)}`;
}

/** "2:05 PM" today, "24 Nov, 2:05 PM" otherwise */
export function clockTime(iso) {
    if (!iso) return null;
    const m = moment(iso);
    if (!m.isValid()) return null;
    return m.isSame(moment(), 'day') ? m.format('h:mm A') : m.format('D MMM, h:mm A');
}

export function timeAgo(iso) {
    if (!iso) return '';
    const m = moment(iso);
    return m.isValid() ? m.fromNow() : '';
}

export function fullTime(iso) {
    if (!iso) return '';
    const m = moment(iso);
    return m.isValid() ? m.format('D MMM YYYY, h:mm A') : '';
}

export const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
