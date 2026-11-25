import React from 'react';

export function ChangeArrow({ dir }) {
    if (dir !== 'up' && dir !== 'down') return null;
    return <span className='mp-arrow' aria-hidden='true'>{dir === 'up' ? '▲' : '▼'}</span>;
}

export function Skeleton({ width = '100%', size = 'md' }) {
    return <span className={`mp-sk mp-sk-${size}`} style={{ width }} aria-hidden='true' />;
}

export function breadthTotals(breadth) {
    const advancing = Number(breadth?.advancing) || 0;
    const declining = Number(breadth?.declining) || 0;
    const unchanged = Number(breadth?.unchanged) || 0;
    return { advancing, declining, unchanged, total: advancing + declining + unchanged };
}

// Advancing vs declining bar, segments sized by count
export function BreadthBar({ breadth, thin = false }) {
    const { advancing, declining, unchanged, total } = breadthTotals(breadth);
    if (!total) return null;
    return (
        <span
            className={`mp-breadth-bar ${thin ? 'thin' : ''}`}
            role='img'
            aria-label={`${advancing} advancing, ${declining} declining, ${unchanged} unchanged`}
        >
            {advancing > 0 && <span className='seg adv' style={{ flexGrow: advancing }} />}
            {unchanged > 0 && <span className='seg unch' style={{ flexGrow: unchanged }} />}
            {declining > 0 && <span className='seg dec' style={{ flexGrow: declining }} />}
        </span>
    );
}

export const RefreshIcon = ({ spinning }) => (
    <svg className={spinning ? 'mp-spin' : ''} width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M21 12a9 9 0 1 1-2.64-6.36' /><path d='M21 3v6h-6' />
    </svg>
);

export const ChevronIcon = ({ left = false }) => (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        {left ? <path d='M15 18l-6-6 6-6' /> : <path d='M9 18l6-6-6-6' />}
    </svg>
);

export const ExternalIcon = () => (
    <svg width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.4' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M14 4h6v6' /><path d='M20 4L10 14' /><path d='M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5' />
    </svg>
);
