import React from 'react'
import { citationTitle } from './answerData'
import './Answer.scss'

const SUPPORT_CLASS = { partial: 'is-partial', unsupported: 'is-unsupported' }

// Inline superscript chip for an [S1]-style marker. Disabled until the citation is known
// (markers arrive while the answer is still streaming, citations with the final `end` event).
function CitationChip({ marker, citation, onOpen = () => { } }) {
    const title = citation ? citationTitle(citation) : null
    return (
        <sup className="cite-ref">
            <button
                type="button"
                className={`cite-chip ${SUPPORT_CLASS[citation?.supported] || ''}`}
                onClick={() => citation && onOpen(citation)}
                disabled={!citation}
                aria-haspopup="dialog"
                aria-label={title ? `Source ${marker}: ${title}` : `Source ${marker}`}
                title={title || undefined}
            >
                {marker}
            </button>
        </sup>
    )
}

export default CitationChip
