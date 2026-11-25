// Remark plugin: turns inline evidence markers in answer text ([S1], [P1], [W2], also adjacent
// like [S1][S3]) into <cite-ref marker="S1"> elements, which AnswerMarkdown renders as chips.

const MARKER = /\[([SPW]\d{1,3})\]/g
const HAS_MARKER = /\[[SPW]\d{1,3}\]/

// Markers inside links or code stay as written
const SKIP = new Set(['link', 'linkReference', 'definition', 'code', 'inlineCode', 'html'])

const splitText = (node) => {
    const parts = []
    let last = 0
    for (const match of node.value.matchAll(MARKER)) {
        if (match.index > last) parts.push({ type: 'text', value: node.value.slice(last, match.index) })
        parts.push({
            type: 'citationRef',
            data: { hName: 'cite-ref', hProperties: { marker: match[1] } },
            children: [{ type: 'text', value: match[1] }],
        })
        last = match.index + match[0].length
    }
    if (last < node.value.length) parts.push({ type: 'text', value: node.value.slice(last) })
    return parts
}

const visit = (node) => {
    if (!Array.isArray(node.children) || SKIP.has(node.type)) return
    node.children = node.children.flatMap(child => {
        if (child.type === 'text' && HAS_MARKER.test(child.value)) return splitText(child)
        visit(child)
        return [child]
    })
}

export default function remarkCitations() {
    return (tree) => visit(tree)
}
