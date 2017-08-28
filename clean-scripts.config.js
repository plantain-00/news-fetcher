const childProcess = require('child_process')

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
    () => new Promise((resolve, reject) => {
      const fetch = require('node-fetch')
      const server = childProcess.spawn('node', ['./dist/start.js'])
      server.stdout.pipe(process.stdout)
      server.stderr.pipe(process.stderr)
      setTimeout(() => {
        fetch('http://localhost:9994/items')
          .then(res => {
            res.text().then(text => {
              if (text !== '{"isSuccess":true,"items":[]}') {
                throw new Error('Error when get items')
              }
              server.kill('SIGINT')
              resolve()
            })
          }, error => {
            server.kill('SIGINT')
            reject(error)
          })
      }, 1000)
    }),
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
