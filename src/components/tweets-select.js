import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  injectScript,
  createDateString,
  sortModes,
  unixDay
} from '../lib/utils'
import styled from 'styled-components'
import { FormRow } from './form'
import { SectionDivider } from './section'

const AmountRow = styled(FormRow)`
  & > input[type='number'] {
    width: 5rem;
  }

  & > input[type='range'] {
    flex: 1;
    width: 100%;
  }
`

const DateRange = styled.input`
  width: 100%;
`

const TweetsSelect = ({
  tweets,
  tweetsPerDay,
  handleQueryTweets: handleLoadTweets
}) => {
  const [amountState, setAmountState] = useState(1)
  const [nonZeroAmountState, setNonZeroAmountState] = useState(1)
  const [sortMode, setSortMode] = useState('newest')
  const [embedTweets, setEmbedTweets] = useState(true)
  const [showTweets, setShowTweets] = useState(true)

  const sinceRef = useRef()
  const untilRef = useRef()
  const amountRef = useRef()

  const setAmount = (amount) => {
    setAmountState(amount)
    if (amount > 0) setNonZeroAmountState(amount)
    setEmbedTweets(amount < 30)
    setShowTweets(amount < 100)
  }

  const handleAmountChange = (event) =>
    setAmount(event.target.valueAsNumber || Number(event.target.value))

  const oldestTime = new Date(tweets[0].created_at).getTime()
  const newestTime = new Date(tweets[tweets.length - 1].created_at).getTime()

  const [sinceTime, setSinceTime] = useState(oldestTime)
  const [untilTime, setUntilTime] = useState(newestTime)

  const resetTime = (set, time, resetTime) => isNaN(time) && set(resetTime)

  useEffect(
    () => resetTime(setSinceTime, sinceTime, oldestTime),
    [sinceTime, oldestTime]
  )

  useEffect(
    () => resetTime(setUntilTime, untilTime, newestTime),
    [untilTime, newestTime]
  )

  const amountInRange = useMemo(() => {
    const isDayInRange = (day) => {
      const beginningOfDay = new Date(day).getTime()
      return (
        beginningOfDay + unixDay >= sinceTime &&
        beginningOfDay - unixDay <= untilTime
      )
    }
    return Object.keys(tweetsPerDay)
      .filter(isDayInRange)
      .map((day) => tweetsPerDay[day])
      .reduce((sum, count) => sum + count, 0)
  }, [tweetsPerDay, sinceTime, untilTime])

  useEffect(() => {
    if (amountInRange < amountState) {
      setAmount(amountInRange)
    }
    if (amountState === 0 && amountInRange > 0) {
      setAmount(nonZeroAmountState)
    }
  }, [amountInRange, amountState, nonZeroAmountState])

  useEffect(() => {
    if (oldestTime > sinceRef.current.valueAsNumber) setSinceTime(oldestTime)
  }, [oldestTime])

  useEffect(() => {
    if (newestTime < untilRef.current.valueAsNumber) setUntilTime(newestTime)
  }, [newestTime])

  const handleClickQuery = () => {
    const queriedTweets = tweets.filter((tweet) => {
      const since = sinceRef.current.valueAsDate
      const until = untilRef.current.valueAsDate
      if (!since || !until) return false

      const date = new Date(tweet.created_at)
      const sinceDayStart = new Date(since.getTime())
      sinceDayStart.setUTCHours(0, 0, 0, 0)
      const untilDayEnd = new Date(until.getTime() + unixDay)
      untilDayEnd.setUTCHours(0, 0, 0, 0)

      if (sinceDayStart.getTime() >= date.getTime()) return false
      if (untilDayEnd.getTime() <= date.getTime()) return false
      return true
    })

    handleLoadTweets(
      sortModes[sortMode].fn(queriedTweets, amountState),
      showTweets
    )
    if (embedTweets) injectScript()
  }

  return (
    <>
      <label>
        Since{' '}
        <input
          type="date"
          value={createDateString(sinceTime || oldestTime)}
          ref={sinceRef}
          onChange={(event) => setSinceTime(event.target.valueAsNumber)}
        />
      </label>
      <DateRange
        type="range"
        min={oldestTime}
        max={newestTime}
        value={sinceTime || oldestTime}
        step={unixDay}
        onChange={(event) => setSinceTime(Number(event.target.value))}
      />
      <label>
        Until{' '}
        <input
          type="date"
          value={createDateString(untilTime || newestTime)}
          ref={untilRef}
          onChange={(event) => setUntilTime(event.target.valueAsNumber)}
        />
      </label>
      <DateRange
        type="range"
        min={oldestTime}
        max={newestTime}
        value={untilTime || newestTime}
        step={unixDay}
        onChange={(event) => {
          setUntilTime(Number(event.target.value))
        }}
      />
      <SectionDivider />
      <AmountRow htmlFor="amount">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          min={amountInRange > 0 ? 1 : 0}
          max={amountInRange}
          step="1"
          value={amountState}
          onChange={handleAmountChange}
        />
        <p>out&nbsp;of</p>
        <button onClick={() => setAmount(amountInRange)}>
          all {amountInRange}
        </button>
        <input
          type="range"
          min={amountInRange > 0 ? 1 : 0}
          max={Math.min(amountInRange, 99)}
          value={amountState}
          ref={amountRef}
          onChange={handleAmountChange}
        />
      </AmountRow>
      <SectionDivider />
      <FormRow>
        <span>Sort by</span>
        {Object.keys(sortModes).map((mode, i) => (
          <label htmlFor={`query-${mode}`} key={`${i}-${mode}`}>
            <input
              type="radio"
              id={`query-${mode}`}
              name="query-type"
              onChange={() => setSortMode(mode)}
              value={mode}
              checked={sortMode === mode}
            />
            {sortModes[mode].name}
          </label>
        ))}
      </FormRow>
      <SectionDivider />
      <FormRow>
        <input type="submit" onClick={handleClickQuery} value="Query" />
        <label htmlFor="show-tweets">
          <input
            id="show-tweets"
            type="checkbox"
            checked={showTweets}
            onChange={(event) => setShowTweets(Boolean(event.target.checked))}
          />{' '}
          Show tweets
        </label>{' '}
        <label htmlFor="embed-tweets">
          <input
            id="embed-tweets"
            type="checkbox"
            checked={embedTweets}
            onChange={(event) => setEmbedTweets(Boolean(event.target.checked))}
          />{' '}
          Embed tweets
        </label>
      </FormRow>
    </>
  )
}

export default TweetsSelect
