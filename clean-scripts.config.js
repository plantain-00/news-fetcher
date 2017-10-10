const childProcess = require('child_process')
const { sleep, Service } = require('clean-scripts')
const util = require('util')

const execAsync = util.promisify(childProcess.exec)

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
    'tsc -p test',
    new Service('node ./dist/start.js'),
    () => sleep(1000),
    'node test/index.js',
    async () => {
      const { stdout } = await execAsync('git status -s')
      if (stdout) {
        console.log(stdout)
        throw new Error(`generated files doesn't match.`)
      }
    }
  ],
  fix: {
    ts: `tslint --fix "src/**/*.ts"`,
    js: `standard --fix "**/*.config.js"`,
    export: `no-unused-export "src/**/*.ts"`
  },
  release: `clean-release`,
  watch: `watch-then-execute "src/**/*.ts" --script "npm run build"`
}
