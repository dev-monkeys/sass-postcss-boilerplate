/**
 * @license Copyright (c) 2015-present, Absolvent.pl
 * For licensing, see LICENSE
 */
"use strict";

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    browsersync = require("browser-sync"),
    sourcemaps = require('gulp-sourcemaps'),
    gulpPostCss = require('gulp-postcss'),
    postcss = require('postcss'),
    reload = browsersync.reload,
    supportedBrowsers = "last 4 versions",
    doiuse = require('doiuse'),
    autoprefixer = require('autoprefixer'),
    postcssDiscardDuplicates = require('postcss-discard-duplicates'),
    postcssDiscardEmpty = require('postcss-discard-empty'),
    postcssRoundSubpixels = require('postcss-round-subpixels'),
    postcssFlexbugsFixes = require('postcss-flexbugs-fixes'),
    postcssFocus = require('postcss-focus'),
    postcssZindex = require('postcss-zindex'),
    postcssVmin = require('postcss-vmin'),
    postcssOpacity = require('postcss-opacity');

gulp.task("sass", function () {
    gulp.src("./scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            "errLogToConsole": true,
            "outputStyle": "compressed"
        }))
        .pipe(gulpPostCss([
            autoprefixer({
                "browsers": supportedBrowsers
            }),
            postcssDiscardDuplicates,
            postcssDiscardEmpty,
            postcssRoundSubpixels,
            postcssFlexbugsFixes,
            postcssFocus,
            postcssZindex,
            postcssVmin,
            postcssOpacity
        ]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./css"))
        .pipe(reload({
            "stream": true
        }));
});

gulp.task("doiuse", function () {
    gulp.src("./css/**/*.css")
        .pipe(gulpPostCss([
            doiuse({
                browsers: supportedBrowsers,
                onFeatureUsage: function (usageInfo) {
                    console.log(usageInfo.message);
                }
            })
        ]));
});

gulp.task("watch", function () {
    gulp.watch("./scss/**/*.scss", ["sass", "doiuse"]);
});

gulp.task("serve", ["watch"], function () {
    browsersync({
        "server": "./"
    });

    gulp.watch("./css/*.css").on("change", reload);
    gulp.watch("./*.html").on("change", reload);
});


