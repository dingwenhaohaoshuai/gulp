const gulp = require("gulp");
const webserver = require("gulp-webserver");
const gulpSass = require("gulp-sass");
const babel = require("gulp-babel");
const cleanCss = require("gulp-clean-css");
const cleanJs = require("gulp-uglify");
//编译sass
gulp.task("sass", () => {
        return gulp.src("./src/scss/**/*.scss")
            .pipe(gulpSass())
            .pipe(gulp.dest("./dist/css"))
    })
    //监听任务
gulp.task("watching", () => {
        return gulp.watch(["./src/scss/**/*.scss", "./src/js/**/*.js"], gulp.series("sass", "devBable"))
    })
    //起服务
gulp.task('server', () => {
        return gulp.src(".")
            .pipe(webserver({
                port: 7000,
                livereload: true,

            }))
    })
    //编译es6转es5
gulp.task("devBable", () => {
        return gulp.src("./src/js/**/*.js")
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(gulp.dest('./dist/js'))
    })
    //管理开发任务
gulp.task("default", gulp.series("sass", "devBable", "server", "watching"))
    //上线任务  压缩 css 
gulp.task("zipCss", () => {
        return gulp.src("./src/css/**/*.css")
            .pipe(cleanCss({ compatibility: 'ie8' }))
            .pipe(gulp.dest("./dist/css"))
    })
    //压缩js
gulp.task("zipJs", () => {
        return gulp.src("./dist/js/**/*.js")
            .pipe(cleanJs())
            .pipe(gulp.dest("./dist/js"))
    })
    //管理上线任务
gulp.task("build", gulp.parallel("zipCss", "zipJs"))