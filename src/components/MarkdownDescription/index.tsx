import React, { useMemo, useCallback } from 'react'
import Markdown, { Options } from 'react-markdown'

import Button from '@/components/Button'

import {
  memoizedHighlightText,
  renderHighlightedText,
  type HighlighterOptions
} from '@/utils/textHighlighter'

import styles from './MarkdownDescription.module.scss'

export interface MarkdownDescriptionProps extends Options {
  /**
   * Options for highlighting ETH addresses and numbers
   */
  highlightOptions?: HighlighterOptions
  /**
   * Whether to enable auto-highlighting of addresses and numbers
   */
  enableHighlighting?: boolean
}

export const MarkdownDescription = ({
  children,
  allowedElements = [],
  components = {},
  highlightOptions = {},
  enableHighlighting = true,
  ...rest
}: MarkdownDescriptionProps) => {
  // Memoized text component for highlighting
  const textComponent = useCallback(
    ({ children, ...props }: any) => {
      if (!enableHighlighting || typeof children !== 'string') {
        return <span {...props}>{children}</span>
      }

      const highlightedText = memoizedHighlightText(children, highlightOptions)
      const renderedText = renderHighlightedText(
        highlightedText,
        highlightOptions
      )

      return <span {...props}>{renderedText}</span>
    },
    [enableHighlighting, highlightOptions]
  )

  // Memoized components to prevent unnecessary re-renders
  const markdownComponentsProp: MarkdownDescriptionProps['components'] =
    useMemo(
      () => ({
        a: ({ href: markdownLinkHref, children, ...link }) => (
          <a
            target="_blank"
            href={markdownLinkHref || ''}
            rel="noopener noreferrer"
            {...link}
          >
            <Button
              type="link"
              size="small"
              spacing="xs"
              className={styles.linkBtn}
            >
              {children}
            </Button>
          </a>
        ),
        blockquote: ({ children, ...props }) => (
          <blockquote className={styles.blockquote} {...props}>
            {children}
          </blockquote>
        ),
        text: textComponent,
        ...components
      }),
      [textComponent, components]
    )

  const markdownAllowedElementsProp: MarkdownDescriptionProps['allowedElements'] =
    useMemo(
      () => [
        'p',
        'strong',
        'b',
        'a',
        'i',
        'em',
        'ul',
        'ol',
        'li',
        'blockquote',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'pre',
        'code',
        'hr',
        'br',
        ...(allowedElements || [])
      ],
      [allowedElements]
    )

  return (
    <Markdown
      {...rest}
      components={markdownComponentsProp}
      allowedElements={markdownAllowedElementsProp}
    >
      {children}
    </Markdown>
  )
}

export default MarkdownDescription
