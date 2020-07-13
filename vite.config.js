const child = require('child_process')

child.exec('cp -r lib-module playground', (err, sto) => {
  console.log(err)
  console.log(sto)
})
module.exports = {}
