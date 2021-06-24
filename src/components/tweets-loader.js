import JSZip from 'jszip'
import React, { createRef, useState } from 'react'
import styled from 'styled-components'

const ErrorOutput = styled.p`
  color: red;
`

const FileInput = styled.input`
  width: 100%;
`

const TweetsLoader = ({ setTweets }) => {
  const [error, setError] = useState(null)
  const inputRef = createRef()

  const handleTweets = ({ tweet }) => {
    const partNames = Object.keys(tweet)
    const allTweets = partNames
      .flatMap((partName) => tweet[partName])
      .filter((item) => Boolean(item.tweet))
      .map((item) => item.tweet)
    setTweets(allTweets)
  }

  const handleTweetJs = (jsText) => {
    window.YTD = { tweet: {} }
    eval(jsText) // eslint-disable-line
    handleTweets(window.YTD)
  }

  const handleFileChange = async () => {
    setError(null)
    if (inputRef.current) {
      const file = inputRef.current.files[0]
      if (file && file.name.endsWith('.js')) {
        const reader = new FileReader()
        reader.readAsText(file, 'utf-8')
        reader.addEventListener('load', (ev) => {
          handleTweetJs(ev.target.result)
        })
        reader.addEventListener('error', () => {
          console.error('error reading file :/')
        })
      } else if (file && file.name.endsWith('.zip')) {
        try {
          const zip = await JSZip.loadAsync(file)
          const files = zip.file(/data\/tweet.js/)
          const tweetJs = await files[0].async('string')
          handleTweetJs(tweetJs)
        } catch (err) {
          setError('zip')
          console.error(err)
        }
      }
    }
  }

  const errorMessages = {
    zip: () => (
      <>
        Could not read the ZIP archive or its contained <code>tweet.js</code>{' '}
        file. The ZIP file might be too big – maybe try manually extracting the
        tweet.js file from the archive ZIP's <code>data</code> subdirectory and
        using it directly.
      </>
    )
  }

  return (
    <>
      <FileInput type="file" ref={inputRef} onChange={handleFileChange} />
      {error && <ErrorOutput>{errorMessages[error]()}</ErrorOutput>}
    </>
  )
}

export default TweetsLoader
