# tools and global npm packages

+ node.js >=4
+ typescript
+ gulp
+ mongodb

# development

+ `npm install`
+ `node news.js`

# secure

create a file of `secret.ts`, like:

```typescript
import * as settings from "./settings";

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
