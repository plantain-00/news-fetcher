[![Dependency Status](https://david-dm.org/plantain-00/news-fetcher.svg)](https://david-dm.org/plantain-00/news-fetcher)
[![devDependency Status](https://david-dm.org/plantain-00/news-fetcher/dev-status.svg)](https://david-dm.org/plantain-00/news-fetcher#info=devDependencies)
[![Build Status](https://travis-ci.org/plantain-00/news-fetcher.svg?branch=master)](https://travis-ci.org/plantain-00/news-fetcher)

# tools and global npm packages

+ node.js >=4
+ typescript
+ gulp
+ mongodb

# development

+ `npm install`
+ `tsc && gulp tslint`
+ `node news.js`

# secure

create a file of `secret.ts`, like:

```typescript
const settings = require("./settings");

export function load() {
    settings.key = "";
    settings.mongodb = {
        url: "",
        options: {
            user: "",
            pass: "",
        },
    };
}

```
