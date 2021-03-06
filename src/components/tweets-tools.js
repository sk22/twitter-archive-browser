import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { minify } from 'terser'
import { FormRow } from './form'
import { SectionDivider, SectionHeader } from './section'

const TextFormRow = styled(FormRow)`
  & > input {
    flex: 1;
    width: 100%;
  }
`

const link = window.location.hostname + window.location.pathname

const ScriptletBox = ({ value, name }) => {
  const inputRef = useRef()
  return (
    <TextFormRow>
      <div>{name}:</div>
      <input
        type="text"
        disabled={true}
        ref={inputRef}
        value={value ?? 'Loading…'}
      />
      <button
        onClick={() => navigator.clipboard.writeText(inputRef.current.value)}
      >
        Copy
      </button>
    </TextFormRow>
  )
}

// const TweetJSON = styled.pre`
//   overflow-x: scroll;
//   background: #eee;
//   padding: 1rem;
//   border-radius: 0.5rem;
// `

const Margins = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > * + * {
    margin-top: 0.5rem;
  }
`

const TweetsTools = ({ tweets }) => {
  const [tweetUtils, setTweetUtils] = useState(null)
  const [deleteScript, setDeleteScript] = useState(null)

  const ids = tweets.map((t) => t.id)
  // const fields = useMemo(() => {
  //   let fs = []
  //   tweets.forEach(tweet => {
  //     Object.keys(tweet).forEach(f => {
  //       if (!fs.includes(f)) fs.push(f)
  //     })
  //   })
  //   return fs
  // }, [tweets])
  const blob = new Blob([JSON.stringify(tweets, null, 2)], {
    type: 'application/json'
  })

  const min = (args) => async (fn) => {
    const { code, error } = await minify(
      `(${tweetUtils})(${fn}, ${JSON.stringify(args)})`
    )
    return error ? error.toString() : `${code} /* via ${link} */`
  }

  useEffect(() => {
    ;(async () => {
      const res = await fetch(`${window.location.pathname}/tweet-utils.js`, {
        cache: 'reload'
      })
      const tweetUtils = await res.text()
      setTweetUtils(tweetUtils)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const script = await min({ ids })((utils, { ids }) =>
        utils.deleteTweets(ids).then(utils.alertResponses)
      )
      setDeleteScript(script)
    })()
  })

  return (
    <Margins>
      <TextFormRow>
        <div>Tweet IDs:</div>
        <input type="text" disabled={true} value={ids.join(',')} />
      </TextFormRow>
      {tweetUtils ? (
        <>
          <small>
            Copy one of these scripts into your Twitter tab's browser console
            (Chrome and Firefox: CTRL/CMD+Shift+I, then click on "Console")
          </small>
          <ScriptletBox name="Delete tweets" value={deleteScript} />
        </>
      ) : (
        <p>Tweet utils loading…</p>
      )}
      <SectionDivider />
      <SectionHeader>Download data</SectionHeader>
      {/* {fields.map(field => <label key={field}>
        <input type="checkbox" />
        {field}
      </label>)} */}
      <a download="tweets.json" href={URL.createObjectURL(blob)}>
        Download queried tweets as JSON
      </a>
      {/* For reference, the first resulting tweet contains this data:
      <TweetJSON>{JSON.stringify(tweets[0], null, 2)}</TweetJSON> */}
    </Margins>
  )
}

export default TweetsTools
