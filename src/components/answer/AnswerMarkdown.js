import React, { useMemo } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkCitations from './remarkCitations'
import CitationChip from './CitationChip'

const REMARK_PLUGINS = [remarkGfm, remarkCitations]

// Answer markdown with [S1]/[P1] markers rendered as clickable citation chips.
// Web links open in a new tab so the chat stays open.
function AnswerMarkdown({ children, citations, onOpenCitation = () => { } }) {
    const components = useMemo(() => {
        const byMarker = new Map((citations || []).map(c => [c.marker, c]))
        return {
            'cite-ref': ({ marker }) => (
                <CitationChip marker={marker} citation={byMarker.get(marker)} onOpen={onOpenCitation} />
            ),
            a: ({ node, children: label, ...rest }) => (
                /^https?:/i.test(rest.href || '')
                    ? <a {...rest} target="_blank" rel="noopener noreferrer">{label}</a>
                    : <a {...rest}>{label}</a>
            ),
        }
    }, [citations, onOpenCitation])

    return (
        <div className="answer-markdown">
            <Markdown remarkPlugins={REMARK_PLUGINS} components={components}>{children || ''}</Markdown>
        </div>
    )
}

export default AnswerMarkdown
