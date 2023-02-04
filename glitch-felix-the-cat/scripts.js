/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"FFZdzqkTvgXOVHRS","label":"learn","bookmarks":[{"id":"e5E5Cv5UomrXZkWh","label":"react","url":"https://scrimba.com/learn/learnreact"},{"id":"e5fnwPybm2SlDhEH","label":"harmonica","url":"https://www.udemy.com/course/benhewlettharmonicatuitionultimate-harmonica-course/"}]},{"id":"vSaqYO8ErCS2cH9G","label":"Stream","bookmarks":[{"id":"ylG8tPAlW5MWdFMf","label":"netflix","url":"https://www.netflix.com/browse"},{"id":"oXlrTCZxoRFZT2YP","label":"hulu","url":"https://www.hulu.com/hub/home"},{"id":"fj8vSLjrp2sLJGhj","label":"hdtoday","url":"https://hdtoday.tv/"},{"id":"thMKpjmrZUvkrszu","label":"9anime","url":"https://9animetv.to/"}]},{"id":"LNm3OXOcn9XPawLB","label":"dev","bookmarks":[{"id":"6qPEtAuWVEXe3q5E","label":"github","url":"https://github.com/"},{"id":"sS87yR6i93zGrKMG","label":"leetcode","url":"leetcode.com/"},{"id":"eF6NPAEGgY1K1oBY","label":"neetcode.io","url":"https://neetcode.io/practice"},{"id":"6aYbRSwQZzssbSGv","label":"stackoverflow","url":"https://stackoverflow.com/"}]},{"id":"tki1GQRs8VreClYT","label":"other","bookmarks":[{"id":"pPEcrHM3TyIFqR3K","label":"source","url":"https://github.com/PrettyCoffee/yet-another-generic-startpage"},{"id":"Ot7vLWI6ScIkrtzu","label":"giffer","url":"https://gifer.com/en"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
