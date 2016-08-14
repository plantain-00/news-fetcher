"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const key = process.env.NEWS_FETCHER_KEY;
exports.items = [];
function assert(condition, statusCode, errorMessage) {
    if (!condition) {
        throw [statusCode, errorMessage];
    }
}
function getHistory(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            assert(request.query.key === key, 403, "a key is required");
            const date = Date.now() - 7 * 24 * 3600 * 1000;
            exports.items = exports.items.filter(item => item.createTime > date);
            response.status(200).json({
                isSuccess: true,
                items: exports.items.map(i => i.url),
            });
        }
        catch (error) {
            response.status(error[0]).json({
                isSuccess: false,
                errorMessage: error[1],
            });
        }
    });
}
exports.getHistory = getHistory;
function saveHistory(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            assert(request.query.key === key, 403, "a key is required");
            exports.items.push({
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
    });
}
exports.saveHistory = saveHistory;
//# sourceMappingURL=news.js.map