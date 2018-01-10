const async = require('async');
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const render = require('consolidate').handlebars.render
const rm = require('rimraf').sync
const path = require('path')

module.exports = function (metadata={}, src, dest) {
  Metalsmith(dest)
    .metadata(metadata)
    .use(template)
    .destination(src)
    .build(function(err){
      err ? console.log(err) : console.log('生成模板成功')
    })
}

const template = function(files, metalsmith, done){
  const keys = Object.keys(files);
  const metadata = metalsmith.metadata();
  async.each(keys, run, done);
  function run(file, done){
    const str = files[file].contents.toString();
    render(str, metadata, function(err, res){
      if (err) return done(err);
      files[file].contents = new Buffer(res);
      done();
    });
  }
}