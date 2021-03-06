# news-fetcher

[![Dependency Status](https://david-dm.org/plantain-00/news-fetcher.svg)](https://david-dm.org/plantain-00/news-fetcher)
[![devDependency Status](https://david-dm.org/plantain-00/news-fetcher/dev-status.svg)](https://david-dm.org/plantain-00/news-fetcher#info=devDependencies)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/news-fetcher?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/news-fetcher/branch/master)
![Github CI](https://github.com/plantain-00/news-fetcher/workflows/Github%20CI/badge.svg)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fplantain-00%2Fnews-fetcher%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/news-fetcher)

## install

```bash
git clone https://github.com/plantain-00/news-fetcher-release.git . --depth=1 && npm i --production
```

Set environment variable NEWS_FETCHER_KEY

```bash
node dist/start.js
```

Then open `http://localhost:9994` in your browser.

## docker

```bash
docker run -d -p 9994:9994 plantain/news-fetcher
```
