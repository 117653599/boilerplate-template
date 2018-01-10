const path = require('path')
const generator = require('./generator')
const target = path.resolve(process.cwd() + '/template')
const src = path.resolve(process.cwd() + '/dist')
const metadata = {
  projectName: 'test',
  projectVersion: 'test',
  projectVersion: '1.0.0'
}
generator(metadata, src, target)