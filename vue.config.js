const data = require('./data.json')
const isDev = process.env.NODE_ENV === 'development'
let config = {}
if (isDev) {
	config = {
	devServer: {
		port: 8000,
		before(app) {
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
		}
	}
}
}
module.exports = config