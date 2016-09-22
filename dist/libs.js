"use strict";
const express = require("express");
exports.express = express;
const colors = require("colors");
function green(message) {
    console.log(colors.green(message));
}
exports.green = green;
const bodyParser = require("body-parser");
exports.bodyParser = bodyParser;
const multer = require("multer");
exports.multer = multer;
const tslib_1 = require("tslib");
exports.__awaiter = tslib_1.__awaiter;
//# sourceMappingURL=libs.js.map