import * as express from "express";
export { express };

const colors = require("colors");

export function green(message: string) {
    console.log(colors.green(message));
}

import * as bodyParser from "body-parser";
export { bodyParser };
