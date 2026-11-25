import React from 'react'

// Small stroke icons used by the answer UI (inherit currentColor)

const Svg = ({ size = 16, children, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
        {children}
    </svg>
)

export const ChevronIcon = ({ size = 14 }) => (
    <Svg size={size}><path d="M6 9l6 6 6-6" /></Svg>
)

export const ExternalIcon = ({ size = 14 }) => (
    <Svg size={size}>
        <path d="M14 4h6v6" />
        <path d="M20 4l-9 9" />
        <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </Svg>
)

export const ThumbUpIcon = ({ size = 16 }) => (
    <Svg size={size}>
        <path d="M7 10v11H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h3z" />
        <path d="M7 10l4-8a3 3 0 0 1 3 3v4h5.3a2 2 0 0 1 2 2.3l-1.3 8A2 2 0 0 1 18 21H7" />
    </Svg>
)

export const ThumbDownIcon = ({ size = 16 }) => (
    <Svg size={size}>
        <path d="M17 14V3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-3z" />
        <path d="M17 14l-4 8a3 3 0 0 1-3-3v-4H4.7a2 2 0 0 1-2-2.3l1.3-8A2 2 0 0 1 6 3h11" />
    </Svg>
)
