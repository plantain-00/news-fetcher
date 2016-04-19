/// <reference path="typings/tsd.d.ts" />

import * as express from "express";
export {express};

const colors = require("colors");

export function green(message: string) {
    console.log(colors.green(message));
}

export const bodyParser = require("body-parser");
