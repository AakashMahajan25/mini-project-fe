import React from 'react'
import './Answer.scss'

const STAGE_LABELS = {
    understanding: () => 'Understanding your question',
    retrieving: () => 'Searching documents & news',
    answering: () => 'Drafting a cited answer',
    verifying: () => 'Checking every claim against its sources',
    translating: (info) => `Translating to ${info?.language || 'your language'}`,
}

// One-line live status while an answer is produced, from the chat socket's `stage` event
function AnswerProgress({ stage }) {
    const label = STAGE_LABELS[stage?.stage]?.(stage)
    if (!label) return null
    return (
        <div className="answer-progress" role="status" aria-live="polite">
            <span className="answer-progress-dot" aria-hidden="true" />
            <span className="answer-progress-label" key={stage.stage}>{label}</span>
            <span className="answer-progress-ellipsis" aria-hidden="true"><i /><i /><i /></span>
        </div>
    )
}

export default AnswerProgress
