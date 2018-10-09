const data = require('./data.json')

module.exports = {
  devServer: {
    port: 3000,
    before(app) {
      app.get('/api/seller', (req, res) => {
        res.json({
          errCode: 0,
          data: data.seller,
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
