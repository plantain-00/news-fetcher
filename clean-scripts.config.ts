import { sleep, Service, Program } from 'clean-scripts'

const tsFiles = `"src/**/*.ts" "test/**/*.ts"`

const tscSrcCommand = `tsc -p src`

export default {
  build: [
    `rimraf dist/`,
    tscSrcCommand
  ],
  lint: {
    ts: `eslint --ext .js,.ts,.tsx ${tsFiles}`,
    export: `no-unused-export ${tsFiles}`,
    markdown: `markdownlint README.md`,
    typeCoverage: 'type-coverage -p src'
  },
  test: [
    new Program('clean-release --config clean-run.config.ts', 30000),
    new Service('node ./dist/start.js'),
    () => sleep(1000),
    'ts-node test/index.ts'
  ],
  fix: `eslint --ext .js,.ts,.tsx ${tsFiles} --fix`,
  watch: `${tscSrcCommand} --watch`
}
