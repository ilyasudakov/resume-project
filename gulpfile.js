const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sync = require("browser-sync").create();

const generateCSS = (cb) => {
  src("app/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("app/css"))
    .pipe(sync.stream());
  cb();
};

const watchFiles = () => {
  sync.init({
    server: {
      baseDir: "app",
    },
  });
  generateCSS;
  watch("app/scss/*.scss", generateCSS);
  watch("app/**.html").on("change", sync.reload);
};

exports.sass = generateCSS;
exports.watch = watchFiles;
