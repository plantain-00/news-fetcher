const { sleep, Service, Program } = require('clean-scripts')

const tsFiles = `"src/**/*.ts" "spec/**/*.ts" "test/**/*.ts"`
const jsFiles = `"*.config.js"`

const tscSrcCommand = `tsc -p src`

module.exports = {
  build: [
    `rimraf dist/`,
    tscSrcCommand
  ],
  lint: {
    ts: `tslint ${tsFiles}`,
    js: `standard ${jsFiles}`,
    export: `no-unused-export ${tsFiles}`,
    commit: `commitlint --from=HEAD~1`,
    markdown: `markdownlint README.md`,
    typeCoverage: 'type-coverage -p src --strict'
  },
  test: [
    'tsc -p spec',
    'jasmine',
    'tsc -p test',
    new Program('clean-release --config clean-run.config.js', 30000),
    new Service('node ./dist/start.js'),
    () => sleep(1000),
    'node test/index.js'
  ],
  fix: {
    ts: `tslint --fix ${tsFiles}`,
    js: `standard --fix ${jsFiles}`
  },
  watch: `${tscSrcCommand} --watch`
}
