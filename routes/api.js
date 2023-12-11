var express = require('express')
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const {Readable} = require('stream')
const decompress = require('decompress')
const {finished} = require('stream/promises')
const Papa  = require('papaparse')
const readDir = require('./../util/readDirectory')
const readline = require('readline')
var router = express.Router()
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function sanitizeCsv(line){
let result = []
	let index = 0
  let lastComma = -1
  let insideQuotes = false
  while(index < line.length){
  	if (!insideQuotes && line[index]=='"'){
    	insideQuotes = true
    }
    else if (insideQuotes && line[index]=='"'){
    	insideQuotes = false
    }
    else if ( insideQuotes ){
    	if (line[index]==',') line = line.replaceAt(index, ' ')
    	index +=1;
      continue;
    }
    index+=1;
  }
 
  return line;
}

router.use('/:userSlug/:datasetSlug', async function(req, res) {
	console.log(req)
	// create a reference name
	const zipFileName = `${req.params.userSlug.replace(/[-_]+/g,"")}_${req.params.datasetSlug.replace(/[-_]+/g,"")}`
	const zipDirectory = 'temp/kaggle/datasetZips'
	const zipFileWDir = zipDirectory+'/'+zipFileName+'.zip'


	const extractDirectory = 'temp/kaggle/datasetExtracted'
	const extractDirectoryDataset = extractDirectory+'/'+zipFileName+'/'

	// create zip file to stream in data
	const stream = fs.createWriteStream(zipFileWDir)

	// Download dataset zip
	const _headers = new Headers({'Authorization': `Basic ${btoa(process.env.KAGGLEUSER+':'+process.env.KAGGLEKEY)}`}) 
	const response = await fetch(`https://www.kaggle.com/api/v1/datasets/download/${req.params.userSlug}/${req.params.datasetSlug}?datasetVersionNumber=1`, {headers:_headers})
	
	// flush to file
	await finished(Readable.fromWeb(response.body).pipe(stream))

	// create directory to store extract
	if (!fs.existsSync(extractDirectoryDataset))
		fs.mkdirSync(extractDirectoryDataset)

	// extract
	await decompress(zipFileWDir,extractDirectoryDataset)

	// delete zip
	fs.unlinkSync(zipFileWDir)

	// create response json
	responseJson = new Object()
	allFiles = []
	await readDir(extractDirectoryDataset, allFiles)
	responseJson['csvfilenames']=[]
	responseJson['csvdata']=[]
	const reFileName = /(?<=\/?)[a-zA-Z-_]+\.csv$/
	const reIsCsv = /.csv$/
	for (let i = 0; i<allFiles.length; i++)
		if (path.extname(allFiles[i])=='.csv'){
			const csvFile = allFiles[i]
			const csvFileName = path.parse(allFiles[i]).base
			responseJson['csvfilenames'].push(csvFileName)
			/*
			const readInterface = readline.createInterface({
				input : fs.createReadStream(csvFile)
			})
			*/
			let fdata = fs.readFileSync(csvFile, 'utf8') + ''
			const headers = fdata.split('\n')[0].split(',')
			const firstLineRe = /^.*?(?=\n)/
			const data = Papa.parse(fdata, {header:true, dynamicTyping: true})
			responseJson['csvdata'].push({'filename':csvFileName, 'data':data.data, 'headers':headers})
			/*
			var data = []
			let headers
			let headerLine = true
			for await ( const line of readInterface) {
				if (headerLine) {
					headers = line.split(',').map( item => item.trim()) 
					headerLine = false
					continue
				}
				data.push( Object.fromEntries( line.split(',').map(item => item.trim()).map( (item,index) => [ headers[index], item ] ) ) ) 
			}
			responseJson['csvdata'].push({ 'filename' : csvFileName, 'data':data, 'headers':headers })
			*/
		}
	//res.setHeader('Content-Type', 'application/json');
	res.json(responseJson)
})

module.exports = router;
