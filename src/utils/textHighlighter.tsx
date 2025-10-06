import React from 'react'

/**
 * Utility for highlighting ETH addresses and numbers in text
 */

export interface HighlightedText {
  readonly type: 'text' | 'eth-address' | 'number'
  readonly content: string
  readonly start: number
  readonly end: number
}

export interface HighlighterOptions {
  readonly ethAddressRegex?: RegExp
  readonly numberRegex?: RegExp
  readonly linkEthAddresses?: boolean
  readonly addressUrl?: (addr: string) => string
  readonly className?: {
    readonly ethAddress?: string
    readonly number?: string
  }
}

const DEFAULT_OPTIONS = {
  ethAddressRegex: /\b0x[a-fA-F0-9]{40}\b/g,
  numberRegex: /\b\d+(?:\.\d+)?\b/g,
  linkEthAddresses: true,
  addressUrl: (addr: string) => `https://etherscan.io/address/${addr}`,
  className: {
    ethAddress: 'eth-address',
    number: 'number-token'
  }
} as const

/**
 * Merges user options with defaults using object spread
 */
const mergeOptions = (
  options: HighlighterOptions = {}
): Required<HighlighterOptions> => ({
  ...DEFAULT_OPTIONS,
  ...options,
  className: {
    ...DEFAULT_OPTIONS.className,
    ...options.className
  }
})

/**
 * Creates a combined regex pattern using template literals
 */
const createCombinedRegex = (opts: Required<HighlighterOptions>): RegExp =>
  new RegExp(
    `(${opts.ethAddressRegex.source})|(${opts.numberRegex.source})`,
    'g'
  )

/**
 * Processes text to identify and highlight ETH addresses and numbers
 */
export const highlightText = (
  text: string,
  options: HighlighterOptions = {}
): HighlightedText[] => {
  if (!text?.length) {
    return [{ type: 'text', content: text, start: 0, end: text.length }]
  }

  const opts = mergeOptions(options)
  const segments: HighlightedText[] = []

  try {
    const regex = createCombinedRegex(opts)
    const matches = [...text.matchAll(regex)]

    let lastIndex = 0

    for (const match of matches) {
      const matchStart = match.index!
      const matchEnd = matchStart + match[0].length

      // Add text before match (using optional chaining)
      if (matchStart > lastIndex) {
        segments.push({
          type: 'text',
          content: text.slice(lastIndex, matchStart),
          start: lastIndex,
          end: matchStart
        })
      }

      // Add highlighted segment
      segments.push({
        type: match[1] ? 'eth-address' : 'number',
        content: match[0],
        start: matchStart,
        end: matchEnd
      })

      lastIndex = matchEnd
    }

    // Add remaining text (using nullish coalescing)
    if (lastIndex < text.length) {
      segments.push({
        type: 'text',
        content: text.slice(lastIndex),
        start: lastIndex,
        end: text.length
      })
    }

    return segments
  } catch (error) {
    console.warn('Text highlighting failed:', error)
    return [{ type: 'text', content: text, start: 0, end: text.length }]
  }
}

/**
 * Renders ETH address with proper accessibility
 */
const renderEthAddress = (
  item: HighlightedText,
  opts: Required<HighlighterOptions>,
  key: string
): React.ReactElement => {
  const baseProps = {
    className: opts.className.ethAddress,
    'data-address': item.content,
    'data-testid': 'eth-address',
    key
  }

  return opts.linkEthAddresses ? (
    <a
      {...baseProps}
      href={opts.addressUrl(item.content)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ethereum address ${item.content} (opens in new tab)`}
      title={`View address: ${item.content}`}
    >
      {item.content}
    </a>
  ) : (
    <span
      {...baseProps}
      aria-label={`Ethereum address: ${item.content}`}
      title={item.content}
    >
      {item.content}
    </span>
  )
}

/**
 * Renders number token with accessibility
 */
const renderNumber = (
  item: HighlightedText,
  opts: Required<HighlighterOptions>,
  key: string
): React.ReactElement => (
  <span
    key={key}
    className={opts.className.number}
    data-number={item.content}
    data-testid="number-token"
    aria-label={`Number: ${item.content}`}
  >
    {item.content}
  </span>
)

/**
 * Converts highlighted text to JSX using functional approach
 */
export const renderHighlightedText = (
  highlightedText: HighlightedText[],
  options: HighlighterOptions = {}
): React.ReactNode[] => {
  const opts = mergeOptions(options)

  return highlightedText.map((item, index) => {
    const key = `${item.type}-${index}-${item.start}`

    switch (item.type) {
      case 'text':
        return item.content
      case 'eth-address':
        return renderEthAddress(item, opts, key)
      case 'number':
        return renderNumber(item, opts, key)
      default:
        return item.content
    }
  })
}

/**
 * Simple memoized version using React's built-in memoization
 * For small text snippets, direct processing is fast enough
 */
export const memoizedHighlightText = highlightText
