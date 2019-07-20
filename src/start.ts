import minimist from 'minimist'

import * as libs from './libs'
import * as news from './news'

const argv = minimist(process.argv.slice(2))

const app = libs.express()
app.use(libs.bodyParser.json())
app.use(libs.bodyParser.urlencoded({ extended: true }))
const upload = libs.multer({ dest: 'uploads/' })

news.bind(app, 'get', '/items', news.getHistory)
news.bind(app, 'post', '/items', news.saveHistory)
news.bind(app, 'post', '/sources', news.saveRawSources)
news.bind(app, 'post', '/logs', news.errorReport, upload)

const port = argv.p || 9994
app.listen(port, '0.0.0.0', () => {
  console.log(libs.colors.green(`api Server is listening: ${port}`))
})

process.on('SIGINT', () => {
  process.exit()
})

process.on('SIGTERM', () => {
  process.exit()
})
