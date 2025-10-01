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
  // Merge highlighter options with CSS module classes
  const mergedHighlightOptions = useMemo(
    () => ({
      ...highlightOptions,
      className: {
        ethAddress: styles['eth-address'],
        number: styles['number-token'],
        ...highlightOptions.className
      }
    }),
    [highlightOptions]
  )
  // Memoized text component for highlighting
  const textComponent = useCallback(
    (props: { children?: React.ReactNode; value?: string }) => {
      const textContent =
        props.value ||
        (typeof props.children === 'string' ? props.children : '')

      if (!enableHighlighting || !textContent) {
        return <>{textContent}</>
      }

      const highlightedText = memoizedHighlightText(
        textContent,
        mergedHighlightOptions
      )
      const renderedText = renderHighlightedText(
        highlightedText,
        mergedHighlightOptions
      )

      return <>{renderedText}</>
    },
    [enableHighlighting, mergedHighlightOptions]
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
        // Also handle other text-containing elements
        p: ({ children, ...props }) => {
          if (!enableHighlighting) {
            return <p {...props}>{children}</p>
          }

          // Process text content in paragraphs
          const processedChildren = React.Children.map(
            children,
            (child): React.ReactNode => {
              if (typeof child === 'string') {
                const highlightedText = memoizedHighlightText(
                  child,
                  mergedHighlightOptions
                )
                const renderedText = renderHighlightedText(
                  highlightedText,
                  mergedHighlightOptions
                )
                return renderedText
              }
              return child
            }
          )

          return <p {...props}>{processedChildren}</p>
        },
        ...components
      }),
      [textComponent, components, enableHighlighting, mergedHighlightOptions]
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
