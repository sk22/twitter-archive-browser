/* global args, callback */

/**
 * @typedef {RequestInit & { id: string; url: string }} RequestDraft
 */

//#region constants

const destroyEndpoint = 'https://twitter.com/i/api/1.1/statuses/destroy.json'
const tweetUrlRegex = /https:\/\/twitter.com\/.+\/status\/(\d+)/
const abortController = new AbortController()
abortController.signal.addEventListener('abort', () => {
  console.log('aborting mission')
})
const maxConcurrent =
  typeof args.maxConcurrent === 'number' ? args.maxConcurrent : 100
const statusNames = {
  200: 'OK',
  404: 'Not Found',
  403: 'Forbidden',
  401: 'Unauthorized',
  429: 'Too Many Requests'
}

//#endregion

//#region helper functions

/**
 * @param {string} name
 * @returns {string}
 */
const getCookie = (name) =>
  document.cookie
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.startsWith(name))[0]
    .slice(name.length + 1)

/**
 * @param {string} t 
 * @returns {string}
 */
const getTweetId = (t) =>
  tweetUrlRegex.test(t) ? t.match?.(tweetUrlRegex)?.[1] ?? t : t

/**
 * @param {string} title
 * @returns {(text: string) => void}
 */
const statusWindow = (title) => {
  const existing = document.getElementById('tweet-utils-overlay')
  if (existing) existing.remove()
  const el = document.createElement('pre')
  el.id = 'tweet-utils-overlay'
  el.style.zIndex = '1000'
  el.style.padding = '16px 24px'
  el.style.border = '2px solid lime'
  el.style.position = 'fixed'
  el.style.background = 'rgba(0, 0, 0, 0.9)'
  el.style.color = 'lime'
  el.style.inset = '5vw 10vw'
  el.style.overflowY = 'auto'
  const titleEl = document.createElement('h2')
  titleEl.innerText = title
  titleEl.style.fontWeight = 'bold'
  titleEl.style.fontSize = '1rem'
  el.append(titleEl)
  const abortButton = document.createElement('button')
  abortButton.textContent = 'Abort'
  abortButton.addEventListener('click', () => abortController.abort())
  abortButton.style.border = '2px solid lime'
  abortButton.style.color = 'lime'
  abortButton.style.background = 'none'
  abortButton.style.fontSize = '1rem'
  abortButton.style.fontFamily = 'monospace'
  abortButton.style.textTransform = 'uppercase'
  abortButton.style.padding = '4px 8px'
  abortButton.style.marginBottom = '16px'
  el.append(abortButton)
  const content = document.createElement('div')
  content.style.wordBreak = 'break-all'
  content.style.whiteSpace = 'pre-wrap'
  el.append(content)
  document.body.prepend(el)
  return (text) => (content.innerText = text)
}

/**
 * @param {string} id 
 * @param {string} url 
 * @param {string} body 
 * @param {string} token 
 * @returns {RequestDraft}
 */
const draftRequest = (id, url, body, token) => ({
  id,
  url,
  body,
  credentials: 'include',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/x-www-form-urlencoded',
    'x-csrf-token': getCookie('ct0'),
    authorization: `Bearer ${token}`
  },
  method: 'POST',
  mode: 'cors'
})

/**
 * @param {Object.<string, Response>} results 
 * @param {number} drafts 
 * @param {() => number} getCurrentProgress 
 * @returns {string}
 */
const getStatusReport = (
  results,
  drafts,
  getCurrentProgress
) => {
  const responses = Object.values(results)
  if (responses.length === 0) return ''
  const status = {}
  responses.forEach((res) => {
    status[res.status] ??= 0
    status[res.status]++
  })
  return (
    `responses: ${responses.length}\n` +
    `current: ${getCurrentProgress()}/${drafts}\n\n` +
    Object.keys(status)
      .map(
        (code) =>
          `${statusNames[code] ?? code} × ${
            status[code]
          }`
      )
      .join('\n') +
    '\n'
  )
}

/**
 * @param {RequestDraft} draft 
 * @param {Object.<string, Response>} results 
 * @param {RequestDraft[]} retry 
 * @param {() => number} getCurrentProgress 
 * @param {number} currentRequests 
 * @param {(text: string) => void} reporter 
 * @param {AbortController} abortCurrentController 
 * @returns {Promise<void>}
 */
const sendRequest = async (
  draft,
  results,
  retry,
  getCurrentProgress,
  currentRequests,
  reporter,
  abortCurrentController,
) => {
  if (abortController.signal.aborted) return
  const { id, url, ...req } = draft

  try {
    const res = await fetch(url, {
      ...req,
      signal: abortCurrentController.signal
    })
    if (res.status === 429) {
      // too many requests, cancelling all current requests
      abortCurrentController.abort()
      retry.push(draft)
      console.log('hit rate limit')
    } else {
      results[id] = res
      reporter(getStatusReport(results, currentRequests, getCurrentProgress))
    }
  } catch (err) {
    if (abortController.signal.aborted) {
      // abort button pressed
      abortCurrentController.abort()
      return
    } else if (abortCurrentController.signal.aborted) {
      // encountered too many requests
      retry.push(draft)
    }
  }
}

/**
 * @param {RequestDraft[]} drafts 
 * @param {number} total 
 * @param {(text: string) => void} reporter 
 * @param {Object.<string, Response> = {}} results 
 * @returns 
 */
const requestExecutor = async (
  drafts,
  total,
  reporter,
  results = {},
) => {
  if (abortController.signal.aborted) return
  const progressBefore = Object.keys(results).length
  const getCurrentProgress = () =>
    Object.keys(results).length - progressBefore

  const requestNow = drafts.slice(0, maxConcurrent)
  const requestLater = drafts.slice(maxConcurrent)

  const reportHeader =
    `total: ${total}\n` +
    `chunk: ${Math.floor(Object.keys(results).length / maxConcurrent) + 1}/` +
    `${Math.ceil(total / maxConcurrent)}\n` +
    `pending: ${requestLater.length}\n`

  reporter(
    reportHeader +
      getStatusReport(results, requestNow.length, getCurrentProgress)
  )

  const retry = []
  const abortCurrentController = new AbortController()
  abortController.signal.addEventListener('abort', () => {
    abortCurrentController.abort()
    reporter(
      reportHeader +
        getStatusReport(results, requestNow.length, getCurrentProgress) +
        '\nABORTED'
    )
  })

  await Promise.all(
    requestNow.map((draft) =>
      sendRequest(
        draft,
        results,
        retry,
        getCurrentProgress,
        requestNow.length,
        (text) => reporter(reportHeader + text),
        abortCurrentController
      )
    )
  )

  if (abortController.signal.aborted) return

  let seconds = 10
  const countdown = setInterval(() => {
    if (abortController.signal.aborted) {
      clearInterval(countdown)
      return
    }
    if (retry.length === 0) seconds = 0
    if (seconds === 0) {
      clearInterval(countdown)
      const nextRequests = [...requestLater, ...retry]
      if (nextRequests.length) {
        const freshResults = Object.fromEntries(
          Object.entries(results).filter(([id, res]) => res.status !== 429)
        )
        requestExecutor(nextRequests, total, reporter, freshResults)
      } else {
        reporter(
          reportHeader +
            getStatusReport(results, requestNow.length, getCurrentProgress) +
            '\nDONE'
        )
      }
    } else {
      reporter(
        reportHeader +
          getStatusReport(results, requestNow.length, getCurrentProgress) +
          `\nhit rate limit.\ncontinuing in ${seconds}s…`
      )
      seconds--
    }
  }, 1000)
}

//#endregion

const toolbox = {
  async getBearerToken() {
    const mainScript = document.querySelector('script[src*=\\/main]')
    const mainScriptSrc = mainScript?.src
    if (!mainScriptSrc) throw new Error('Main script not found')
    const mainScriptText = await (await fetch(mainScriptSrc)).text()
    const findStringsRegex = /"([A-Za-z0-9%]+)"/g
    let match = null
    let longest = ''
    while ((match = findStringsRegex.exec(mainScriptText))) {
      if (match[1].length > longest.length) longest = match[1]
    }
    return longest
  },

  async deleteTweets(tweets) {
    const reporter = statusWindow('delete tweets')
    const tweetIds = tweets.map(getTweetId)
    const token = await this.getBearerToken()
    const drafts = tweetIds.map((id) =>
      draftRequest(id, destroyEndpoint, `tweet_mode=extended&id=${id}`, token)
    )
    requestExecutor(drafts, drafts.length, reporter)
  }
}

callback(toolbox, args)
