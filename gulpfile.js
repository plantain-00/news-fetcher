"use strict";

const gulp = require("gulp");
const tslint = require("gulp-tslint");

gulp.task("tslint", () => {
    return gulp.src(["*.ts"])
        .pipe(tslint({
            tslint: require("tslint")
        }))
        .pipe(tslint.report("prose", { emitError: true }));
});
