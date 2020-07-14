const fs = require('fs')
const child = require('child_process')
const path = require('path')
let dev = false

!dev && child.exec('vite serve playground', function(err, sto){
  if (!err) dev = true
  console.log(sto)
})

fs.watch(path.resolve(__dirname, '../src/index.ts'), function(event, fileName) {
  if (event) {
    child.exec('npm run build', (err, sto) => {
      console.log(err)
      console.log(sto)
    })
  }
})
