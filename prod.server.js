const express = require('express')
const appRoutes = express.Router()
const data = require('./data.json')
const html = require('fs').readFileSync('./dist/index.html', 'utf-8')
var history = require('connect-history-api-fallback')

const app = express()

app.use(history())
app
	.get('/api/seller', (req, res) => {
		res.json({
			errCode: 0,
			data: data.seller
		})
	})
	.get('/api/goods', (req, res) => {
		res.json({
			errCode: 0,
			data: data.goods
		})
	})
	.get('/api/rating', (req, res) => {
		res.json({
			errCode: 0,
			data: data.ratings
		})
	})

app.use(express.static('./dist', {
	maxAge: 2592000000
}))
app.use(appRoutes)

app.listen(3000, (err) => {
  if (err) console.log(err)
  console.log('Listening at http://localhost:3000')
})