import Markdown, { Options } from 'react-markdown'

import Button from '@/components/Button'

import styles from './MarkdownDescription.module.scss'

export type MarkdownDescriptionProps = Options

export const MarkdownDescription = ({
  children,
  allowedElements = [],
  components = {},
  ...rest
}: MarkdownDescriptionProps) => {
  const markdownComponentsProp: MarkdownDescriptionProps['components'] = {
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
    ...components
  }

  const markdownAllowedElementsProp: MarkdownDescriptionProps['allowedElements'] =
    [
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
    ]

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
