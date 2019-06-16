import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'

import changelog from '../../CHANGELOG.md'

function useChangelog () {
  const [text, setText] = useState('')
  if (!text) {
    fetch(changelog)
      .then(resp => resp.text())
      .then(setText)
  }
  return text
}

export default function Dashboard () {
  const changelog = useChangelog()
  return (
    <ReactMarkdown source={changelog} />
  )
}
