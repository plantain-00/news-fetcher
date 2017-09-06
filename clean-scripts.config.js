const childProcess = require('child_process')
const { sleep } = require('clean-scripts')

module.exports = {
  build: [
    `rimraf dist/`,
    `tsc -p src`
  ],
  lint: {
    ts: `tslint "src/**/*.ts"`,
    js: `standard "**/*.config.js"`,
    export: `no-unused-export "src/**/*.ts"`
  },
  test: [
    'tsc -p spec',
    'jasmine',
    async () => {
      const fetch = require('node-fetch')
      const server = childProcess.spawn('node', ['./dist/start.js'])
      server.stdout.pipe(process.stdout)
      server.stderr.pipe(process.stderr)
      await sleep(1000)
      try {
        const res = await fetch('http://localhost:9994/items')
        const text = await res.text()
        if (text !== '{"isSuccess":true,"items":[]}') {
          throw new Error('Error when get items')
        }
        server.kill('SIGINT')
      } catch (error) {
        server.kill('SIGINT')
        throw error
      }
    },
    () => new Promise((resolve, reject) => {
      childProcess.exec('git status -s', (error, stdout, stderr) => {
        if (error) {
          reject(error)
        } else {
          if (stdout) {
            reject(new Error(`generated files doesn't match.`))
          } else {
            resolve()
          }
        }
      }).stdout.pipe(process.stdout)
    })
  ],
  fix: {
    ts: `tslint --fix "src/**/*.ts"`,
    js: `standard --fix "**/*.config.js"`,
    export: `no-unused-export "src/**/*.ts"`
  },
  release: `clean-release`,
  watch: `watch-then-execute "src/**/*.ts" --script "npm run build"`
}
