const express = require('express')
const appRoutes = express.Router()
const data = require('./data.json')
const html = require('fs').readFileSync('./dist/index.html', 'utf-8')
const history = require('connect-history-api-fallback')
const os = require('os')

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

///////////////////获取本机ip///////////////////////
function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
const myHost = getIPAdress();
app.listen(3000, (err) => {
  if (err) console.log(err)
  console.log(`Your application is running here : http://127.0.0.1:3000 and http://${myHost}:3000`)
})