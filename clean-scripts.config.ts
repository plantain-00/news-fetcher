import { sleep, Service, Program } from 'clean-scripts'

const tsFiles = `"src/**/*.ts" "test/**/*.ts"`
const jsFiles = `"*.config.js"`

const tscSrcCommand = `tsc -p src`

export default {
  build: [
    `rimraf dist/`,
    tscSrcCommand
  ],
  lint: {
    ts: `eslint --ext .js,.ts,.tsx ${tsFiles} ${jsFiles}`,
    export: `no-unused-export ${tsFiles}`,
    commit: `commitlint --from=HEAD~1`,
    markdown: `markdownlint README.md`,
    typeCoverage: 'type-coverage -p src'
  },
  test: [
    new Program('clean-release --config clean-run.config.ts', 30000),
    new Service('node ./dist/start.js'),
    () => sleep(1000),
    'ts-node test/index.ts'
  ],
  fix: `eslint --ext .js,.ts,.tsx ${tsFiles} ${jsFiles} --fix`,
  watch: `${tscSrcCommand} --watch`
}
