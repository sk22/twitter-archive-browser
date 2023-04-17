import React, { useEffect, useRef, useState, useCallback } from 'react'
import styled from 'styled-components'
import { minify } from 'terser'
import { Tweet } from '../lib/utils'
import { FormRow } from './form'
import { SectionDivider, SectionHeader } from './section'

type TweetToolbox = {
  deleteTweets: (tweets: string[]) => void
}

const TextFormRow = styled(FormRow)`
  & > input {
    flex: 1;
    width: 100%;
  }
`

const link = window.location.hostname + window.location.pathname

const ScriptletBox = ({ value, name }: { value?: string; name: string }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
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
        onClick={() =>
          void (
            inputRef.current &&
            navigator.clipboard.writeText(inputRef.current.value)
          )
        }
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

const TweetsTools = ({ tweets }: { tweets: Tweet[] }) => {
  const [toolsScript, setToolsScript] = useState<string>()
  const [deleteScript, setDeleteScript] = useState<string>('Loading…')

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/tools.js')
      .then((res) => res.text())
      .then((script) => {
        setToolsScript(script)
      })
  }, [])

  const ids = tweets.map((t) => t.id)
  const blob = new Blob([JSON.stringify(tweets, null, 2)], {
    type: 'application/json'
  })

  useEffect(() => {
    if (toolsScript === undefined) return

    function min<T>(args: T) {
      return async (fn: (toolbox: TweetToolbox, args: T) => void) => {
        const { code } = await minify(
          `((callback, args) => {
            ${toolsScript}
          })(${fn}, ${JSON.stringify(args)})`
        )
        return `${code} /* via ${link} */`
      }
    }

    ;(async () => {
      const script = await min({ ids })((utils, { ids }) =>
        utils.deleteTweets(ids)
      )
      setDeleteScript(script)
    })()
  }, [toolsScript, ids])

  return (
    <Margins>
      <TextFormRow>
        <div>Tweet IDs:</div>
        <input type="text" disabled={true} value={ids.join(',')} />
      </TextFormRow>
      <small>
        Copy one of these scripts into your Twitter tab's browser console
        (Chrome and Firefox: Ctrl/Cmd+Shift+I, then click on "Console")
      </small>
      <ScriptletBox name="Delete tweets" value={deleteScript} />
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
