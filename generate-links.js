const fs = require('fs')
const path = require('path')

const files = fs.readdirSync(path.join(__dirname, '10000 markdown files'))
const names = files.map(p => p.replace('.md', ''))
const wikilinks = names.map(n => `[[${n}]]`)
const getRandomLink = () => wikilinks[Math.floor(Math.random() * wikilinks.length)]
const getRandomLinks = () =>
  new Array(Math.floor(Math.random() * 5) + 1)
  .fill(0)
  .map(() => getRandomLink())

for (const file of files) {
  const filePath = path.join(__dirname, '10000 markdown files', file)
  const links = getRandomLinks()
  // Make sure a link to the backlink load test is included
  if (!links.includes('[[backlink load test]]')) {
    links.push('[[backlink load test]]')
  }
  const contents = fs.readFileSync(filePath).toString()
  if (contents.includes('## Wikilinks load test')) {
    fs.writeFileSync(filePath, contents.replace(/\n## Wikilinks load test[\s\S]+/gm, ''))
  }
  fs.appendFileSync(filePath, `\n## Wikilinks load test\n\n${links.join('\n')}`)
}
