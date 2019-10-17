const http = require('http')
const host = '127.0.0.1'
const port = 3000
const results = []
const start = new Date() // для вычисления времени ответа

const requestSrv = (url) => new Promise((resolve, reject) => {
  return new Promise((resolve, reject) => {
    let body = ''
    let r = ''

    http.get(url, (res) => {
      let bodyChunks = [];
      res.on('data', function (chunk) {
        bodyChunks.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(bodyChunks)
        r = 'Request time in ms ' + (new Date() - start) + ' body: ' + body + ' path: ' + res.req.path
        results.push(r)
        resolve(r)
      })
    })
  }).then(r => {
    console.log(r)
    resolve(r)
  })
})

function requestServer(count, type, url) {
  const urls = []

  for (let i = 0; i < count; i++) {
    urls.push(`${url}/${i}`)
  }

  if (type === 'async') {
    Promise.all(urls.map(requestSrv))
      .then(res => {
        console.log(res)
        console.log(`Время выполнения: ${new Date() - start}`)
      })
  } else {
    urls.reduce((prev, current) => {
      return prev.then(() => requestSrv(current))
    }, Promise.resolve())
      .then(() => {
        console.log(results)
      })
  }
};

requestServer(process.argv[2], process.argv[3], process.argv[4] || `http://${host}:${port}`);