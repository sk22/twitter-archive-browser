// eslint-disable-next-line no-unused-vars
function tweetUtils(callback, args) {
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

  const getStatus = (res) => {
    if (res.statusText.length > 0) return res.statusText
    const names = {
      200: 'OK',
      404: 'Not Found',
      403: 'Forbidden',
      401: 'Unauthorized'
    }
    return names[res.status] || `HTTP ${res.status}`
  }

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

    async makeRequest(endpoint, body, bearerToken) {
      const bearer = bearerToken || (await this.getBearerToken())

      return await fetch(endpoint, {
        credentials: 'include',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-csrf-token': csrfToken,
          authorization: `Bearer ${bearer}`
        },
        body,
        method: 'POST',
        mode: 'cors',
        cache: 'no-store'
      })
    },

    async deleteTweet(tweet, bearerToken) {
      return this.makeRequest(
        'https://twitter.com/i/api/1.1/statuses/destroy.json',
        `tweet_mode=extended&id=${getTweetId(tweet)}`,
        bearerToken
      )
    },

    async deleteTweets(tweets) {
      const bearerToken = await this.getBearerToken()
      return Promise.all(
        tweets.map((tweet) => this.deleteTweet(tweet, bearerToken))
      )
    },

    async promptDeleteTweets() {
      const promptText = prompt(
        'delete tweet\n(use commas to delete multiple tweets)'
      )
      if (promptText) {
        const responses = await this.deleteTweets(
          promptText.split(',').map((s) => s.trim())
        )
        console.log(responses)
        await this.alertResponses(responses)
      }
    },

    async alertResponses(responses) {
      const jsonResponses = await Promise.all(
        responses.map((res) => res.json())
      )
      console.log(jsonResponses)
      const codes = responses.reduce((obj, res) => {
        const status = getStatus(res)
        return { ...obj, [status]: (obj[status] || 0) + 1 }
      }, {})
      alert(
        Object.keys(codes)
          .map((code) => `${code} × ${codes[code]}`)
          .join('\n')
      )
    }
  }

  callback(utils, args)
  return utils
}
