import JSZip from 'jszip'
import React, { createRef } from 'react'

const TweetsLoader = ({ setTweets }) => {
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
        const zip = await JSZip.loadAsync(file)
        const files = zip.file(/data\/tweet.js/)
        const tweetJs = await files[0].async('string')
        handleTweetJs(tweetJs)
      }
    }
  }

  return (
    <>
      <input type="file" ref={inputRef} onChange={handleFileChange} />
    </>
  )
}

export default TweetsLoader
