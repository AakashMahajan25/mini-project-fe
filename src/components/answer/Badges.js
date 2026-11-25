import React from 'react'
import { STATUS_INFO, SUPPORT_INFO } from './answerData'
import './Answer.scss'

// Review status of an answer: "Awaiting review", "Uncertain", "Approved" …
export function StatusBadge({ status, className = '' }) {
    const info = STATUS_INFO[status]
    if (!info) return null
    return (
        <span className={`answer-status-badge tone-${info.tone} ${className}`} title={info.hint}>
            <span className="answer-status-dot" aria-hidden="true" />
            {info.label}
        </span>
    )
}

// How well one source backs the answer: "Supported", "Partly supported" …
export function SupportBadge({ value, className = '' }) {
    const info = SUPPORT_INFO[value] || SUPPORT_INFO.unchecked
    return (
        <span className={`support-badge tone-${info.tone} ${className}`} title={info.hint}>
            <span className="support-badge-dot" aria-hidden="true" />
            {info.label}
        </span>
    )
}
