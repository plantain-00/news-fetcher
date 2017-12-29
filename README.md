# news-fetcher

[![Dependency Status](https://david-dm.org/plantain-00/news-fetcher.svg)](https://david-dm.org/plantain-00/news-fetcher)
[![devDependency Status](https://david-dm.org/plantain-00/news-fetcher/dev-status.svg)](https://david-dm.org/plantain-00/news-fetcher#info=devDependencies)
[![Build Status: Linux](https://travis-ci.org/plantain-00/news-fetcher.svg?branch=master)](https://travis-ci.org/plantain-00/news-fetcher)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/news-fetcher?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/news-fetcher/branch/master)

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
