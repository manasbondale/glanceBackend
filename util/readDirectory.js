const fs = require('fs')
const path = require('path')

async function readDir(directory, files=[]){
	fs.readdirSync(directory).forEach(file => {
		const newpath = path.join(directory,file) 
		if (fs.statSync(newpath).isDirectory()) return readDir(newpath, files)
		else return files.push(newpath)
	})
}

module.exports = readDir
