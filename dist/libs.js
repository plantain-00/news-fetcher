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
//# sourceMappingURL=libs.js.map