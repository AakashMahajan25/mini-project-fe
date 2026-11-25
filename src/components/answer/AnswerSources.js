import React, { useId, useState } from 'react'
import { SupportBadge } from './Badges'
import { ChevronIcon } from './icons'
import { citationShortDate, citationTitle, pagesLabel, sourceTypeLabel, splitCitations } from './answerData'
import './Answer.scss'

const SUPPORT_CLASS = { partial: 'is-partial', unsupported: 'is-unsupported' }

function SourceRow({ citation, onOpen, detailed }) {
    const facts = [sourceTypeLabel(citation.source_type), pagesLabel(citation), detailed ? citation.section : null, citationShortDate(citation)]
        .filter(Boolean)
    return (
        <div role="listitem" className="source-row">
            <button type="button" className="source-row-btn" onClick={() => onOpen(citation)} aria-haspopup="dialog">
                <span className={`cite-chip is-static ${SUPPORT_CLASS[citation.supported] || ''}`} aria-hidden="true">{citation.marker}</span>
                <span className="visually-hidden">Source {citation.marker}: </span>
                <span className="source-row-body">
                    <span className="source-row-title">{citationTitle(citation)}</span>
                    <span className="source-row-facts">{facts.join(' · ')}</span>
                    {detailed && citation.snippet && <span className="source-row-snippet">{citation.snippet}</span>}
                </span>
                {detailed && <SupportBadge value={citation.supported} className="source-row-support" />}
            </button>
        </div>
    )
}

// Sources the answer cites (numbered by marker) and, collapsed, what was retrieved but not used.
// `detailed` adds the excerpt, section and support verdict (used in the Sources tab).
function AnswerSources({ citations, onOpen = () => { }, detailed = false }) {
    const [showUnused, setShowUnused] = useState(false)
    const unusedId = useId()
    const { cited, unused } = splitCitations(citations)
    if (!cited.length && !unused.length) return null

    return (
        <section className={`answer-sources ${detailed ? 'is-detailed' : 'is-compact'}`} aria-label="Sources for this answer">
            {cited.length > 0 && (
                <>
                    <div className="answer-sources-title">{detailed ? 'Cited in this answer' : 'Sources'}</div>
                    <div role="list" className="answer-sources-list">
                        {cited.map(c => <SourceRow key={c.marker} citation={c} onOpen={onOpen} detailed={detailed} />)}
                    </div>
                </>
            )}
            {cited.length === 0 && <div className="answer-sources-empty">This answer doesn't cite any of the retrieved sources.</div>}
            {unused.length > 0 && (
                <div className="answer-sources-unused">
                    <button
                        type="button"
                        className={`answer-sources-toggle ${showUnused ? 'is-open' : ''}`}
                        aria-expanded={showUnused}
                        aria-controls={unusedId}
                        onClick={() => setShowUnused(v => !v)}
                    >
                        <ChevronIcon />
                        Also retrieved (not used) · {unused.length}
                    </button>
                    {showUnused && (
                        <div role="list" id={unusedId} className="answer-sources-list is-unused">
                            {unused.map(c => <SourceRow key={c.marker} citation={c} onOpen={onOpen} detailed={detailed} />)}
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}

export default AnswerSources
