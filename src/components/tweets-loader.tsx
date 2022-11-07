import JSZip from 'jszip'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Tweet } from '../lib/utils'

const ErrorOutput = styled.div`
  color: red;
`

const FileInput = styled.input`
  width: 100%;
`

const errorMessages: Record<string, () => ReactNode> = {
  zip: () => (
    <p>
      Could not read the ZIP archive or its contained <code>tweets.js</code>
      {' '}file. The ZIP file might be too big – maybe try manually extracting
      the file from the archive ZIP's <code>data</code> subdirectory and using
      it directly.
    </p>
  ),
  file: () => <p>An error occured while trying to read the file.</p>
}

const TweetsLoader = ({ setTweets }: { setTweets: (tweets: Tweet[]) => void}) => {
  const [error, setError] = useState<[keyof typeof errorMessages, string] | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [tweetJs, setTweetJs] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleTweetJs = (jsText?: string | null) => {
    if (!jsText) return
    window.YTD = { tweets: {} }
    window.YTD.tweet = window.YTD.tweets // link for backwards compatibility
    setStatus('Loading…')
    setTweetJs(jsText)
  }

  useEffect(() => {
    const handleTweets = (ytd: Window['YTD']) => {
      const parts = ytd?.tweets ?? {}
      const allTweets = Object.keys(parts)
        .flatMap((partName) => parts[partName])
        .filter((item) => Boolean(item.tweet))
        .map((item) => item.tweet)
      setTweets(allTweets)
    }
    if (tweetJs) {
      eval(tweetJs) // eslint-disable-line
      handleTweets(window.YTD)
      setStatus(null)
      setTweetJs(null)
    }
  }, [tweetJs, setTweets])

  const handleFileChange = async () => {
    setError(null)
    setTweets([])
    setStatus('Reading…')
    if (inputRef.current) {
      const file = inputRef.current.files?.[0]
      if (file && file.name.endsWith('.js')) {
        const reader = new FileReader()
        reader.readAsText(file, 'utf-8')
        reader.addEventListener('load', (ev) => {
          handleTweetJs(ev.target?.result as string | null)
        })
        reader.addEventListener('error', (err) => {
          setError(['file', err.toString()])
          setStatus(null)
        })
      } else if (file && file.name.endsWith('.zip')) {
        try {
          const zip = await JSZip.loadAsync(file)
          // older archives use "tweet.js"
          const files = zip.file(/data\/tweets?.js/)
          const tweetJs = await files[0].async('string')
          handleTweetJs(tweetJs)
        } catch (err: unknown) {
          setError(['zip', (err as Error)?.toString()])
          console.error(err)
          setStatus(null)
        }
      }
    }
  }

  return (
    <>
      <FileInput type="file" ref={inputRef} onChange={handleFileChange} />
      {error && (
        <ErrorOutput>
          {errorMessages[error[0]]()}
          <pre>{error[1]}</pre>
        </ErrorOutput>
      )}
      {status && <p>{status}</p>}
    </>
  )
}

export default TweetsLoader
