'use strict'
const ftp = require("basic-ftp")

const extract = require('extract-zip')
const fs = require('fs/promises');
const convert = require('xml-js');

const tempDir = 'tmp'
const ucdHost = 'www.unicode.org'
const ucdXmlRemoteDir = '/Public/UCD/latest/ucdxml/'
const ucdXmlFileNameBase = 'ucd.all.flat'
const ucdZipFileName = `${ucdXmlFileNameBase}.zip`
const ucdXmlFileName = `${ucdXmlFileNameBase}.xml`
const remoteZipPath = `${ucdXmlRemoteDir}${ucdZipFileName}`
const tempZipPath = `${tempDir}/${ucdZipFileName}`
const tempXmlPath = `${tempDir}/${ucdXmlFileName}`
const workDir = process.cwd()
const ucdJsonFileName = 'ucd.json'
const tempJsonPath = `${tempDir}/${ucdJsonFileName}`

main()

async function main() {
  // const ftpClient = new ftp.Client()
  // await fs.mkdir(tempDir)

  try {
    // await ftpClient.access({host: ucdHost})
    // console.log('success access to unicode.org')
    // await ftpClient.downloadTo(tempZipPath, remoteZipPath)
    // console.log('success download unicode database xml zip')
    // await extract(tempZipPath, {dir: `${workDir}/${tempDir}`})
    // console.log('success extract unicode database xml')
    const ucdXml = await fs.readFile(tempXmlPath)
    // const ucdJson = convert.xml2json(ucdXml, {compact: true, spaces: 2});
    const ucd = convert.xml2js(ucdXml, {compact: true});
    console.log('success convert to js object')
    const chars = ucd.ucd.repertoire.char

    const categoryMsp = new Map()


    const charInfoStrings = chars.forEach((char, i) => {
      const attr = char._attributes

      if (!categoryMsp.has(attr.gc)) {
        categoryMsp.set(attr.gc, [])
      }

      const names = getNames(char)
      const codePoint = Number.parseInt(attr.cp, 16)
      const info = {
        codePoint: codePoint,
        name: names,
        age: attr.age,
        block: attr.blk,
        generalCategory: attr.gc
      }

      if (i === 0 ) {
        console.log(JSON.stringify(info))
        console.log(JSON.stringify(info).replace(/([{,])"([^"]+)":/g,'$1$2:'))
      }

      const stringified = JSON.stringify(info).replace(/([{,])"([^"]+)":/g,'$1$2:')
      categoryMsp.get(attr.gc).push(`${codePoint}:${stringified}`)
    })



    // console.log('success convert to json')
    // const ucd = JSON.parse(ucdJson)

    for(let categoryName of categoryMsp.keys()) {
      const file = `export default {${categoryMsp.get(categoryName).join(',')}}`
      await fs.writeFile(`src/app/unicodeDictionary/${categoryName}.ts`, file)
    }

    // await fs.writeFile(tempJsonPath, JSON.stringify(charInfo, null, 2))
    console.log('success export to json file')



  } catch(err) {
      console.log(err)
  }
  // ftpClient.close()
}

function getNames(char) {
  const names = []
  const name = char._attributes.na
  const nameAlias = char['name-alias']
  const pushName = (name) => names.push(name)
  if (name) {
    pushName(name)
  }
  if (nameAlias) {
    if (Array.isArray(nameAlias)) {
      nameAlias
        .map(nA => nA._attributes.alias)
        .forEach(pushName)
    } else {
      pushName(nameAlias._attributes.alias)
    }
  }
  return names
}
