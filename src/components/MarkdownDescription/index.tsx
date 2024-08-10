import Markdown, { Options as MarkdownProps } from 'react-markdown';
import cn from 'classnames'


import Button from '@/components/Button';
import styles from './MarkdownDescription.module.scss';


export interface MarkdownDescriptionProps extends MarkdownProps {
    classNames?: {
        root?: string
    }
}

export const MarkdownDescription = ({ children, classNames, allowedElements = [], components = {},  ...rest }: MarkdownDescriptionProps) => {
  const markdownComponentsProp: MarkdownProps['components'] = {
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

  const markdownAllowedElementsProp: MarkdownProps['allowedElements'] = [
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
    <div className={cn('body-sm', 'color-neutral-400', styles.description, classNames?.root)}>
      <Markdown
        {...rest}
        components={markdownComponentsProp}
        allowedElements={markdownAllowedElementsProp}
      >
        {children}
      </Markdown>
    </div>
  )
}

export default MarkdownDescription;