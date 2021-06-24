import React, { useMemo, useRef, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Section, { SectionDivider, SectionHeader, TweetSection } from './section'
import TweetsLoader from './tweets-loader'
import TweetsSelect from './tweets-select'
import TweetsFilter from './tweets-filter'
import { createDayString, sortModes } from '../lib/utils'
import { FormRow } from './form'
import { debounce } from 'lodash'
import TweetsTools from './tweets-tools'

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    font-family: sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  :root {
    --border: 1px solid #ccc;
    --border-strong: 1.3px solid #666;
  }
`

const Tweet = styled.blockquote`
  white-space: pre-wrap;
  word-break: break-word;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 35rem;
  margin: 0 auto;
  max-width: 100%;
  align-items: center;
  padding: 1rem;
  padding-top: 2rem;

  & > input {
    width: 100%;
  }
`

const Line = styled.hr`
  border: none;
  border-top: var(--border-strong);
  width: 60%;
  margin: 1.5rem;
`

const SearchBar = styled.label`
  display: flex;
  width: 100%;
  align-items: baseline;
  & > input {
    margin-left: 0.5rem;
    flex: 1;
  }
`

const tweetTypesOptions = {
  regular: 'Regular tweets',
  replies: 'Replies',
  retweets: 'Retweets'
}

const App = () => {
  const [allTweets, setAllTweets] = useState([])
  const [queriedTweets, setQueriedTweets] = useState([])
  const [filterText, setFilterText] = useState('')
  const [showTweets, setShowTweets] = useState(true)
  const [searchString, setSearchString] = useState('')
  const [customExpression, setCustomExpression] = useState('')
  const [isRegExp, setIsRegExp] = useState(false)
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [error, setError] = useState(null)
  const [includeTweets, setIncludeTweets] = useState({
    regular: true,
    replies: true,
    retweets: true
  })

  const tweetsSorted = useMemo(
    () => sortModes.oldest.fn(allTweets),
    [allTweets]
  )

  const tweetIsRetweet = (tweet) => tweet.full_text.startsWith('RT @')
  const tweetIsReply = (tweet) => 'in_reply_to_screen_name' in tweet

  const tweets = useMemo(() => {
    try {
      const regExp = isRegExp
        ? new RegExp(searchString, caseSensitive ? '' : 'i')
        : null
      const hasCustomExpression = customExpression.trim().length > 0
      if (isRegExp || hasCustomExpression) setError(null)
      const func = hasCustomExpression
        ? // eslint-disable-next-line
          new Function('t', `return ${customExpression}`)
        : null
      return tweetsSorted
        .filter((tweet) => {
          if (isRegExp) {
            return regExp.test(tweet.full_text)
          } else {
            const text = caseSensitive
              ? tweet.full_text
              : tweet.full_text.toLowerCase()
            const compareText = caseSensitive
              ? searchString
              : searchString.toLowerCase()
            return text.includes(compareText)
          }
        })
        .filter((t) => {
          const isReply = tweetIsReply(t)
          const isRetweet = tweetIsRetweet(t)
          const isRegular = !isReply && !isRetweet

          return (
            (isRegular && includeTweets.regular) ||
            (isReply && includeTweets.replies) ||
            (isRetweet && includeTweets.retweets)
          )
        })
        .filter((t) => {
          return hasCustomExpression ? func(t) : true
        })
    } catch (err) {
      setError(err.toString())
      return []
    }
  }, [
    tweetsSorted,
    searchString,
    caseSensitive,
    isRegExp,
    includeTweets,
    customExpression
  ])

  const tweetsPerDay = useMemo(() => {
    const obj = {}
    tweets.forEach((tweet) => {
      const dateString = createDayString(tweet.created_at)
      obj[dateString] = (obj[dateString] || 0) + 1
    })
    return obj
  }, [tweets])

  const isTweetHidden = (tweet) =>
    !tweet.full_text.toLowerCase().includes(filterText.toLowerCase())

  const handleChangeCustomExpression = useRef(
    debounce((event) => setCustomExpression(event.target.value), 600)
  ).current

  const handleChangeSearchText = useRef(
    debounce((event) => setSearchString(event.target.value), 600)
  ).current

  return (
    <Main>
      <GlobalStyle />
      <Section>
        <SectionHeader>Load Tweet archive</SectionHeader>
        {allTweets.length === 0 && (
          <>
            <p>
              Use the file picker to load your Twitter archive ZIP file, or just
              the contained <code>tweet.js</code> file.
            </p>
            <p>
              If you don't have a Twitter archive yet, you can request and
              download it in your{' '}
              <a href="https://twitter.com/settings/download_your_data">
                Twitter settings
              </a>
              . In this case, see you in a few hours! (Or days, depending on
              your Twitter usage)
            </p>
          </>
        )}
        <TweetsLoader setTweets={setAllTweets} />
        {allTweets.length > 0 && <p>{allTweets.length} tweets loaded</p>}
      </Section>
      {allTweets.length > 0 && (
        <>
          <Section>
            <SectionHeader>Query tweets</SectionHeader>
            <FormRow>
              <SearchBar>
                Search{' '}
                <input
                  type="text"
                  placeholder={
                    isRegExp
                      ? 'Enter a regular expression, e.g. ^Hello, .+!$'
                      : 'Enter text…'
                  }
                  onChange={handleChangeSearchText}
                />
              </SearchBar>
            </FormRow>
            <FormRow>
              <label>
                <input
                  type="checkbox"
                  checked={isRegExp}
                  onChange={(event) =>
                    Boolean(setIsRegExp(event.target.checked))
                  }
                />{' '}
                <abbr
                  title={
                    'Advanced. Lets you define a regular expression, ' +
                    'allowing to search for more specific text patterns.'
                  }
                >
                  Regular expression
                </abbr>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={caseSensitive}
                  onChange={(event) =>
                    Boolean(setCaseSensitive(event.target.checked))
                  }
                />{' '}
                <abbr
                  title={
                    'Case sensitive search makes the search sensitive to ' +
                    'lower- and uppercase letters, such as "a" and "A"'
                  }
                >
                  Case sensitive
                </abbr>
              </label>
            </FormRow>
            <SectionDivider />
            <SearchBar>
              <abbr
                title={
                  'Advanced. Optionally provide a JavaScript expression to ' +
                  'filter tweets. The tweet object is provided as variable "' +
                  't" and the expression can be as simple as "true" or "false".'
                }
              >
                JavaScript
              </abbr>{' '}
              <input
                type="text"
                placeholder={
                  "Optional; example: t.in_reply_to_user_id !== '12345'"
                }
                onChange={handleChangeCustomExpression}
              />
            </SearchBar>
            <SectionDivider />
            <FormRow>
              <span>Include</span>
              {Object.keys(tweetTypesOptions).map((mode) => (
                <label key={mode}>
                  <input
                    type="checkbox"
                    name="replies"
                    onChange={(event) =>
                      setIncludeTweets((o) => ({
                        ...o,
                        [mode]: event.target.checked
                      }))
                    }
                    checked={includeTweets[mode]}
                  />{' '}
                  {tweetTypesOptions[mode]}
                </label>
              ))}
            </FormRow>
            <SectionDivider />
            {tweets.length > 0 ? (
              <TweetsSelect
                tweets={tweets}
                tweetsPerDay={tweetsPerDay}
                handleQueryTweets={(t, showTweets) => {
                  setQueriedTweets(t)
                  setShowTweets(showTweets)
                }}
              />
            ) : (
              <p>{error || 'No matching tweets found'}</p>
            )}
          </Section>
        </>
      )}
      {queriedTweets.length > 0 && (
        <>
          {showTweets && (
            <>
              <Line />
              <TweetsFilter
                filterText={filterText}
                setFilterText={(text) => setFilterText(text)}
              />
            </>
          )}
          {showTweets &&
            queriedTweets.map((tweet) => (
              <TweetSection
                key={tweet.id}
                style={isTweetHidden(tweet) ? { display: 'none' } : {}}
              >
                <Tweet className="twitter-tweet">
                  <p dangerouslySetInnerHTML={{ __html: tweet.full_text }} />
                  <a href={`https://twitter.com/_/status/${tweet.id}`}>
                    {tweet.created_at}
                  </a>
                </Tweet>
              </TweetSection>
            ))}
          <Line />
          <Section>
            <SectionHeader>Tweet utils</SectionHeader>
            <TweetsTools tweets={queriedTweets} />
          </Section>
        </>
      )}
    </Main>
  )
}

export default App
