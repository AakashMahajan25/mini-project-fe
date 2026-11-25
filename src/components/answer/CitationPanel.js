import React, { useRef } from 'react'
import { Offcanvas } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { SupportBadge } from './Badges'
import { ExternalIcon } from './icons'
import { SUPPORT_INFO, citationDates, citationHref, citationTitle, pagesLabel, percent, sourceTypeLabel } from './answerData'
import './Answer.scss'

// Side panel (bottom sheet on phones) with the details of one citation
function CitationPanel({ citation, onHide = () => { } }) {
    // Keep showing the last citation while the panel slides out
    const lastCitation = useRef(null)
    if (citation) lastCitation.current = citation
    const c = citation || lastCitation.current

    const isPhone = window.innerWidth < 576
    const href = citationHref(c)
    const pages = pagesLabel(c)
    const dates = citationDates(c)
    const support = SUPPORT_INFO[c?.supported] || SUPPORT_INFO.unchecked

    return (
        <Offcanvas
            show={!!citation}
            onHide={onHide}
            placement={isPhone ? 'bottom' : 'end'}
            className="citation-panel"
            aria-labelledby="citation-panel-title"
        >
            {c && (
                <>
                    <Offcanvas.Header closeButton closeLabel="Close source details">
                        <div className="citation-panel-heading">
                            <div className="citation-panel-kicker">
                                <span className="cite-chip is-static">{c.marker}</span>
                                <span>{sourceTypeLabel(c.source_type)}</span>
                            </div>
                            <h2 className="citation-panel-title" id="citation-panel-title">{citationTitle(c)}</h2>
                        </div>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className="citation-panel-badges">
                            <SupportBadge value={c.supported} />
                            {c.cited === false && <span className="citation-unused-note">Retrieved, not used in the answer</span>}
                        </div>
                        <div className="citation-panel-hint">{support.hint}</div>

                        {(pages || c.section || dates.length > 0 || c.similarity != null) && (
                            <dl className="citation-facts">
                                {pages && <div><dt>Page</dt><dd>{pages}</dd></div>}
                                {c.section && <div><dt>Section</dt><dd>{c.section}</dd></div>}
                                {dates.map(d => <div key={d.label}><dt>{d.label}</dt><dd>{d.value}</dd></div>)}
                                {c.similarity != null && <div><dt>Search match</dt><dd>{percent(c.similarity)}</dd></div>}
                            </dl>
                        )}

                        {c.snippet && (
                            <div className="citation-excerpt">
                                <div className="citation-excerpt-label">Excerpt</div>
                                <blockquote className="citation-snippet">{c.snippet}</blockquote>
                            </div>
                        )}

                        {c.source_type === 'portfolio' ? (
                            <Link to="/portfolio" className="citation-open" onClick={onHide}>
                                Open your portfolio
                            </Link>
                        ) : href ? (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="citation-open">
                                Open source{pages ? ` (${pages})` : ''}
                                <ExternalIcon />
                            </a>
                        ) : null}
                    </Offcanvas.Body>
                </>
            )}
        </Offcanvas>
    )
}

export default CitationPanel
