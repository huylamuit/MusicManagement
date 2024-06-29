// Import các plugin của Gulp
var gulp = require("gulp");


// Đường dẫn tới các file của ứng dụng
var paths = {
  scripts: {
    component: "app/**/*.components.js", // Thay đổi đường dẫn tùy vào cấu trúc dự án của bạn
    child_component: "app/**/**/*.components.js",
    module: "app/**/*.module.js",
    service: "app/**/*.service.js"
  },
  html: {
    parent: "app/**/*.template.html",
    child: "app/**/**/*.temolate.html"
  }
};

// Task để nối và minify các file JavaScript
gulp.task("scripts", function () {
  return gulp
    .src([
      "app/app.module.js",
      "app/app.config.js",
      paths.scripts.component,
      paths.scripts.module,
      paths.scripts.child_component,
      paths.scripts.service
    ])

    .pipe(gulp.dest("dist/js")); // Thư mục đích cho file JavaScript đã build
});

// Task để nối và minify các file CSS
gulp.task("html-css", function () {
  return gulp
    .src("app/app.css")

    .pipe(gulp.dest("dist/css")); // Thư mục đích cho file CSS đã build
});

// Task để minify và đổi tên các file HTML
gulp.task("html", function () {
  return gulp
    .src("app/index.html")
    .pipe(gulp.dest("dist/")); // Thư mục đích cho file HTML đã build
});

// Task mặc định sẽ chạy cả hai task scripts và html-css
gulp.task("build", gulp.series("html", "scripts", "html-css"));
