const express = require('express')
const next = require('next')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const glob = require('glob')

const filename = file => file.originalname.replace(' ', '-').toLowerCase()

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'static/uploads')
  },
  filename: function(req, file, cb) {
    cb(null, filename(file))
  },
})

const upload = multer({ storage })

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.get('/images', (req, res) => {
    const files = glob.sync('*', {
      matchBase: true,
      cwd: path.resolve(process.cwd(), 'static/uploads'),
    })
    res.status(200).send(files.map(file => path.join('/static/uploads', file)))
  })
  server.post('/upload/handler', upload.single('file'), (req, res) => {
    res.status(200).send(path.join('/static/uploads', filename(req.file)))
  })
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
