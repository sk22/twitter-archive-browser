// eslint-disable-next-line no-unused-vars
function tweetUtils(callback, args) {
  const abortCurrentController = new AbortController()
  const abortAllController = new AbortController()
  const maxConcurrent = 1000

  const statusNames = {
    0: 'Pending',
    1: 'Error',
    200: 'OK',
    404: 'Not Found',
    403: 'Forbidden',
    401: 'Unauthorized',
    429: 'Too Many Requests'
  }

  const statusWindow = (title) => {
    const existing = document.getElementById('tweet-utils-overlay')
    if (existing) existing.remove()
    const el = document.createElement('pre')
    el.id = 'tweet-utils-overlay'
    el.style.zIndex = '1000'
    el.style.padding = '16px'
    el.style.margin = '64px'
    el.style.border = '2px solid lime'
    el.style.position = 'fixed'
    el.style.background = 'rgba(0, 0, 0, 0.9)'
    el.style.color = 'lime'
    el.style.inset = '0'
    el.style.overflowY = 'auto'
    const titleEl = document.createElement('h2')
    titleEl.innerText = title
    titleEl.style.fontWeight = 'bold'
    titleEl.style.fontSize = '1rem'
    el.append(titleEl)
    const abortButton = document.createElement('button')
    abortButton.textContent = 'Abort'
    abortButton.addEventListener('click', () => abortAllController.abort())
    abortButton.style.border = '2px solid lime'
    abortButton.style.color = 'lime'
    abortButton.style.background = 'none'
    abortButton.style.fontSize = '1rem'
    abortButton.style.fontFamily = 'monospace'
    abortButton.style.textTransform = 'uppercase'
    abortButton.style.padding = '4px 8px'
    abortButton.style.marginBottom = '8px'
    el.append(abortButton)
    const content = document.createElement('div')
    content.style.wordBreak = 'break-all'
    content.style.whiteSpace = 'pre-wrap'
    el.append(content)
    document.body.prepend(el)
    return (text) => (content.innerText = text)
  }

  async function executeRequests(title, requests, lastStatusAmounts = {}) {
    const retryMe = []
    const statusAmounts = {
      ...lastStatusAmounts,
      0: lastStatusAmounts[0] ?? requests.length,
      1: 0
    }

    const updateStatus = () => {
      try {
        const tooManyRequests =
          !abortAllController.signal.aborted && statusAmounts[429]
            ? `\n\nerror occurred. retrying…`
            : ''
  
        reportStatus(
          Object.keys(statusAmounts)
            .map(
              (code) => `${statusNames[code] ?? code} × ${statusAmounts[code]}`
            )
            .join('\n') +
            tooManyRequests +
            (abortAllController.signal.aborted ? '\n\nAborted' : '')
        )
      } catch (err) {}
    }

    const reportStatus = statusWindow(title)
    updateStatus()
    if (abortAllController.signal.aborted) return

    const someRequests = requests.slice(0, maxConcurrent)
    const otherRequests = requests.slice(maxConcurrent)
    console.log('executing requests now: ', someRequests)

    await Promise.all(
      someRequests.map(req =>
        fetch(req.endpoint, req)
          .then((res) => {
            statusAmounts[0]--
            statusAmounts[res.status] ??= 0
            statusAmounts[res.status]++
            if (res.status === 429) {
              console.log('RETRYING THIS:', req, retryMe)
              abortCurrentController.abort()
              retryMe.push(req)
            }
            updateStatus()
          })
          .catch((err) => {
            statusAmounts[0]--
            statusAmounts[1]++
            console.error('request errored', err)
            retryMe.push(req)
            updateStatus()
          })
      )
    )

    if (retryMe.length + otherRequests.length) {
      console.log('retry ???', retryMe)
      const nextRequests = [...otherRequests, ...retryMe]
      updateStatus()
      setTimeout(
        () => {
          statusAmounts[0] += retryMe.length
          delete statusAmounts[1]
          delete statusAmounts[429]
          executeRequests(title, nextRequests, statusAmounts)
        },
        retryMe.length ? 5000 : 0
      )
    }
  }

  const getCookie = (name) =>
    document.cookie
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.startsWith(name))[0]
      .slice(name.length + 1)
  const csrfToken = getCookie('ct0')
  const tweetUrlRegex = /https:\/\/twitter.com\/.+\/status\/(\d+)/
  const getTweetId = (t) =>
    tweetUrlRegex.test(t) ? t.match(tweetUrlRegex)[1] : t

  const utils = {
    async getBearerToken() {
      const mainScriptSrc = document.querySelector('script[src*=\\/main]').src
      const mainScriptText = await (await fetch(mainScriptSrc)).text()
      const findStringsRegex = /="([A-Za-z0-9%]+)"/g
      let match = null
      let longest = ''
      while ((match = findStringsRegex.exec(mainScriptText))) {
        if (match[1].length > longest.length) longest = match[1]
      }
      return longest
    },

    createRequest(endpoint, body, bearerToken) {
      return {
        endpoint,
        body,
        credentials: 'include',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-csrf-token': csrfToken,
          authorization: `Bearer ${bearerToken}`
        },
        method: 'POST',
        mode: 'cors',
        signal: abortCurrentController.signal
      }
    },

    deleteTweet(tweet, bearerToken) {
      return this.createRequest(
        'https://twitter.com/i/api/1.1/statuses/destroy.json',
        `tweet_mode=extended&id=${getTweetId(tweet)}`,
        bearerToken
      )
    },

    async deleteTweets(tweets) {
      const bearerToken = await this.getBearerToken()
      return executeRequests(
        'delete tweets',
        tweets.map((tweet) => this.deleteTweet(tweet, bearerToken))
      )
    },

    async promptDeleteTweets() {
      const promptText = prompt(
        'delete tweet\n(use commas to delete multiple tweets)'
      )
      if (promptText) {
        this.deleteTweets(promptText.split(',').map((s) => s.trim()))
      }
    }
  }

  callback(utils, args)
  return utils
}
