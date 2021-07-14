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


    console.log(chars.length)
    // console.log('success convert to json')
    // const ucd = JSON.parse(ucdJson)
    // await fs.writeFile(tempJsonPath, ucdJson)
    // console.log('success export to json file')

  } catch(err) {
      console.log(err)
  }
  // ftpClient.close()
}
