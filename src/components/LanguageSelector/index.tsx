import React from 'react'

import LanguageSelectorStyle from './LanguageSelector.module.scss'
import { FLAG_POSITION, languageFlags, languageLabels } from './constants'

export * from './constants'

export interface LanguageSelectorProps {
  flagPosition?: FLAG_POSITION
  showWeblateLink?: boolean
  i18n: {
    changeLanguage: (lang: string) => void
    language?: string
  }
}

export function LanguageSelector({
  flagPosition = FLAG_POSITION.PREPEND,
  i18n
}: LanguageSelectorProps) {
  const currentLanguage = i18n.language || 'en'

  const handleChangeLanguage = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage)
  }

  const renderOption = (lang: string) => {
    const flag = languageFlags[lang]
    const label = languageLabels[lang]

    return (
      <option key={lang} value={lang}>
        {flagPosition === FLAG_POSITION.PREPEND ? (
          <>
            {flag}&#160;&#160;&#160;&#160;{label}
          </>
        ) : null}
        {flagPosition === FLAG_POSITION.APPEND ? (
          <>
            {label} {flag}
          </>
        ) : null}
        {flagPosition === FLAG_POSITION.NONE ? <>{label}</> : null}
      </option>
    )
  }

  return (
    <>
      <div className={LanguageSelectorStyle.selectContainer}>
        <select
          className={LanguageSelectorStyle.styledSelect}
          data-testid="selectLanguage"
          value={currentLanguage}
          onChange={(e) => handleChangeLanguage(e.target.value)}
        >
          {Object.keys(languageLabels).map(renderOption)}
        </select>
      </div>
    </>
  )
}