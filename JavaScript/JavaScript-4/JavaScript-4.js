const fs = require('fs')
const path = require('path')
 
const readFile = (dir, cb) => {

  let results = {dirs: [], files: []}

  fs.readdir(dir, (err, items) => {
    var itemList = items.length

    if (err)  {
      return cb(err);
    }
 
    if (!itemList){ 
      return cb(null, results);
    }

    items.forEach((file) => {
      file = path.join(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          results.dirs.push(file);
          readFile(file, (err, res) => {
            results.files = results.files.concat(res.files)
            results.dirs = results.dirs.concat(res.dirs)
            if (!--itemList) cb(null, results)
          })
        } else {
          results.files.push(file)
          if (!--itemList) cb(null, results)
        }
      })
    })
  })
}
 

readFile((base), (err, results) => {
  if (err) throw err;
  console.log(JSON.stringify(results));
});