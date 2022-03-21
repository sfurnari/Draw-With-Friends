const express = require('express')
const cors = require('cors')
const app = express()
const router = express.Router()

router.use(cors())

router.get('/', (req, res) => {
  res.send('server is up and running')
})

router.get('/game', (req, res) => {
  
})

module.exports = router