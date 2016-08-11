"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const libs = require("./libs");
const key = process.env.NEWS_FETCHER_KEY;
let items = [];
const app = libs.express();
app.use(libs.bodyParser.json());
app.use(libs.bodyParser.urlencoded({ extended: true }));
function assert(condition, statusCode, errorMessage) {
    if (!condition) {
        throw [statusCode, errorMessage];
    }
}
app.get("/items", (request, response) => __awaiter(this, void 0, void 0, function* () {
    try {
        assert(request.query.key === key, 403, "a key is required");
        const date = Date.now() - 7 * 24 * 3600 * 1000;
        items = items.filter(item => item.createTime > date);
        response.status(200).json({
            isSuccess: true,
            items: items.map(i => i.url),
        });
    }
    catch (error) {
        response.status(error[0]).json({
            isSuccess: false,
            errorMessage: error[1],
        });
    }
}));
app.post("/items", (request, response) => __awaiter(this, void 0, void 0, function* () {
    try {
        assert(request.query.key === key, 403, "a key is required");
        items.push({
            createTime: Date.now(),
            url: request.body.url,
        });
        response.status(200).json({
            isSuccess: true,
        });
    }
    catch (error) {
        response.status(error[0]).json({
            isSuccess: false,
            errorMessage: error[1],
        });
    }
}));
const port = 9994;
app.listen(port, "0.0.0.0", () => {
    libs.green(`api Server is listening: ${port}`);
});
//# sourceMappingURL=news.js.map