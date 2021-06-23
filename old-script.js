const tweetsInput = document.getElementById('tweetjs')
const countInput = document.getElementById('count')
const errorOutput = document.getElementById('error')
const tweetOutput = document.getElementById('tweets')
const mainElement = document.getElementById('main')
const sinceInput = document.getElementById('since')
const untilInput = document.getElementById('until')
const maxElement = document.getElementById('max')
const searchInput = document.getElementById('search')
const searchButton = document.getElementById('search-button')
const regexCheckbox = document.getElementById('regex')

window.YTD = { tweet: {} }
let allTweets = []
let currentScript = null
let currentTweets = []
let queriedTweets = []

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

function injectScript(src) {
  const script = document.createElement('script')
  script.src = src
  document.head.appendChild(script)
  return script
}

const refreshScript = () => {
  if (currentScript) {
    currentScript.remove()
  }
  currentScript = injectScript('https://platform.twitter.com/widgets.js')
}

const filterTweet = tweet => {
  if (searchInput.value && searchInput.value.length) {
    return regexCheckbox.checked
      ? new RegExp(searchInput.value).test(tweet.full_text)
      : tweet.full_text.includes(searchInput.value)
  } else {
    return true
  }
}

const appendTweet = (tweet, filtering = false) => {
  if (!filterTweet(tweet)) return
  currentTweets.push(tweet)
  if (!filtering) queriedTweets.push(tweet)
  const html = `
    <blockquote class="twitter-tweet">
      <p>${tweet.full_text}</p>
      <a href="https://twitter.com/_/status/${tweet.id}">${tweet.created_at}</a>
    </blockquote>
  `
  tweetOutput.innerHTML += html
}

const clearTweets = () => {
  currentTweets = []
  tweetOutput.innerHTML = ''
}

const setTweets = (tweets, filtering = false) => {
  clearTweets()
  tweets.forEach(t => appendTweet(t, filtering))
  refreshScript()
}

const likeComparator = (t1, t2) => {
  return Number(t2.favorite_count) - Number(t1.favorite_count)
}

const makeCreatedComparator = (invert = false) => (t1, t2) => {
  const getTime = tweet => new Date(tweet.created_at).getTime()
  return getTime(invert ? t2 : t1) - getTime(invert ? t1 : t2)
}

const getTweets = () => {
  const sinceFilter = sinceInput.valueAsDate
  const untilFilter = untilInput.valueAsDate
  return allTweets.filter(tweet => {
    const date = new Date(tweet.created_at)
    if (sinceFilter && sinceFilter.getTime() >= date.getTime()) return false
    if (untilFilter && untilFilter.getTime() <= date.getTime()) return false
    return true
  })
}

const actions = {
  random() {
    clearTweets()
    const tweets = getTweets().filter(filterTweet)
    if (!tweets.length) return
    for (let i = 0; i < countInput.valueAsNumber; i++) {
      const tweetIndex = getRandomInt(0, tweets.length - 1)
      const tweet = tweets.splice(tweetIndex, 1)[0]
      appendTweet(tweet)
    }
    refreshScript()
  },

  mostLiked() {
    mainElement.className = 'loading'
    const tweets = getTweets().filter(filterTweet).sort(likeComparator)
    clearTweets()
    tweets.slice(0, countInput.valueAsNumber).forEach(appendTweet)
    mainElement.className = ''
    refreshScript()
  },

  chronological(descending = false) {
    const tweets = getTweets()
      .filter(filterTweet)
      .sort(makeCreatedComparator(descending))
    clearTweets()
    tweets.slice(0, countInput.valueAsNumber).forEach(appendTweet)
    refreshScript()
  }
}

const createDateString = date => {
  const pad = num => (num.toString().length === 1 ? `0${num}` : num.toString())
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${year}-${pad(month)}-${pad(day)}`
}

const handleTweets = tweetJs => {
  eval(tweetJs)
  mainElement.className = ''
  const partNames = Object.keys(window.YTD.tweet)
  allTweets = partNames
    .flatMap(partName => window.YTD.tweet[partName])
    .filter(item => Boolean(item.tweet))
    .map(item => item.tweet)
  const sortedTweets = allTweets.sort(makeCreatedComparator())
  sinceInput.value = createDateString(new Date(sortedTweets[0].created_at))
  untilInput.value = createDateString(
    new Date(sortedTweets[sortedTweets.length - 1].created_at)
  )
  updateMaxCount()
}

const updateMaxCount = () => {
  const length = getTweets().length
  maxElement.textContent = length
  countInput.setAttribute('max', length)
  if (countInput.valueAsNumber > length) {
    countInput.value = length
  }
}

const filterTweets = () => {
  setTweets(queriedTweets, true)
}

// function later(fn, time) {
//   let timeout = null
//   return () => {
//     if (timeout) clearTimeout(timeout)
//     timeout = setTimeout(fn, time)
//   }
// }

sinceInput.addEventListener('change', updateMaxCount)
untilInput.addEventListener('change', updateMaxCount)
searchButton.addEventListener('click', filterTweets)

tweetsInput.addEventListener('change', () => {
  const file = tweetsInput.files[0]
  if (file) {
    mainElement.className = 'loading'
    const reader = new FileReader()
    reader.readAsText(file, 'utf-8')
    reader.addEventListener('load', ev => {
      handleTweets(ev.target.result)
    })
    reader.addEventListener('error', () => {
      mainElement.className = ''
      errorOutput.textContent = 'error reading file :/'
    })
  }
})
