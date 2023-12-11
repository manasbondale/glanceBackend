const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')

function csvFileToObjectArray(csvFile, watch=false){
	const result = []
	fs.createReadStream(csvFile)
	.pipe(csv())
	.on('data', (data) => result.push(data) )
	.on('end', () => { if(watch) console.log(`read ${csvFile}`), return result  } ) 
}
