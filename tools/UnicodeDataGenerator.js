'use strict'
const ftp = require("basic-ftp")

const extract = require('extract-zip')
const fs = require('fs/promises');
const fsSync = require('fs');
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
  const ftpClient = new ftp.Client()
  if(fsSync.existsSync(tempDir)) {
    await fs.rmdir(tempDir, { recursive: true, force: true })
  }
  await fs.mkdir(tempDir)

  try {
    await ftpClient.access({host: ucdHost})
    console.log('success access to unicode.org')
    await ftpClient.downloadTo(tempZipPath, remoteZipPath)
    console.log('success download unicode database xml zip')
    await extract(tempZipPath, {dir: `${workDir}/${tempDir}`})
    console.log('success extract unicode database xml')
    const ucdXml = await fs.readFile(tempXmlPath)
    const ucd = convert.xml2js(ucdXml, {compact: true});
    console.log('success convert to js object')
    const chars = ucd.ucd.repertoire.char

    const blockMap = new Map()


    chars.forEach((char, i) => {
      const attr = char._attributes
      if (!attr.cp) {
        return
      }
      if (!blockMap.has(attr.blk)) {
        blockMap.set(attr.blk, [])
      }

      const names = getNames(char)
      const codePoint = Number.parseInt(attr.cp, 16)
      const info = {
        codePoint: attr.cp,
        name: names,
        block: attr.blk,
        category: attr.gc
      }


      const stringified = JSON.stringify(info).replace(/([{,])"([^"]+)":/g,'$1$2:')
      blockMap.get(attr.blk).push(`0x${attr.cp}:${stringified}`)
    })

    if(!fsSync.existsSync('src/app/unicode-dictionary')) {
      await fs.mkdir('src/app/unicode-dictionary')
    }

    for(let blockName of blockMap.keys()) {
      const file = `export default {${blockMap.get(blockName).join(',')}}`
      await fs.writeFile(`src/app/unicode-dictionary/${blockName}.ts`, file)
    }

    console.log('success export to json file')

  } catch(err) {
      console.log(err)
  }
  ftpClient.close()
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
  return names.map(name => name.replace(/-#$/,`-${char._attributes.cp}`))
}
