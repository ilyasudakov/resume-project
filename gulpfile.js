const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sync = require("browser-sync").create();

const generateCSS = (cb) => {
  src("docs/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("docs/css"))
    .pipe(sync.stream());
  cb();
};

const watchFiles = () => {
  sync.init({
    server: {
      baseDir: "docs",
    },
  });
  generateCSS;
  watch("docs/scss/*.scss", generateCSS);
  watch("docs/**.html").on("change", sync.reload);
};

exports.sass = generateCSS;
exports.watch = watchFiles;
