/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const makeCreatedComparator =
  (invert = false) =>
  (t1, t2) => {
    const getTime = (tweet) => new Date(tweet.created_at).getTime()
    return getTime(invert ? t2 : t1) - getTime(invert ? t1 : t2)
  }

export const createDateString = (d) => {
  const date = d instanceof Date ? d : new Date(d)
  const pad = (num) =>
    num.toString().length === 1 ? `0${num}` : num.toString()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${year}-${pad(month)}-${pad(day)}`
}

export const createDayString = (createdAt) =>
  createdAt.slice(4, 11) + createdAt.slice(-4)

export const sortBy = {
  random: (tweets, amount) => {
    const randomTweets = []
    for (let i = 0; i < amount && i < tweets.length; i++) {
      const tweetIndex = getRandomInt(0, tweets.length - 1)
      const tweet = tweets.splice(tweetIndex, 1)[0]
      randomTweets.push(tweet)
    }
    return randomTweets
  },
  oldest: (tweets, amount) =>
    tweets.sort(makeCreatedComparator()).slice(0, amount),
  newest: (tweets, amount) =>
    tweets.sort(makeCreatedComparator(true)).slice(0, amount),
  likes: (tweets, amount) =>
    tweets
      .sort((t1, t2) => Number(t2.favorite_count) - Number(t1.favorite_count))
      .slice(0, amount)
}

export const sortModes = {
  newest: { name: 'Newest', fn: sortBy.newest },
  oldest: { name: 'Oldest', fn: sortBy.oldest },
  random: { name: 'Random', fn: sortBy.random },
  likes: { name: 'Likes', fn: sortBy.likes }
}

export function injectScript() {
  const script = document.createElement('script')
  script.src = 'https://platform.twitter.com/widgets.js'
  document.head.appendChild(script)
  return script
}

export const unixDay = 1000 * 60 * 60 * 24
