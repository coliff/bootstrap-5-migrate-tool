const replace = require('gulp-replace');
const { src, dest } = require('gulp');

/**
 * Options that may be set via cli flags \
 * For example: \
 * `npx gulp migrate  --src "./src-dir" --overwrite --verbose` */
const DEFAULT_OPTIONS = {
  /** string that will be passed to the gulp {@link src} function */
  src: './src',
  /** string that will be passed to the gulp {@link dest} function */
  dest: `./`,
  /** overwrite the existing files in place. **Cannot be used with --dest flag** */
  overwrite: true,
  /** print the path of each generated / modified file to the console */
  verbose: true,
  /** Default glob for files to search in. Default: Search all folder and files recursively */
  defaultFileGlob: '**/*.{asp,aspx,cshtml,gohtml,gotmpl,ejs,erb,hbs,html,htm,js,jsp,php,ts,twig,vue}',
};

async function migrate(cb) {
  const options = parseArgs();

  console.log(options);
  // process.exit(0)

  let dataAttrChanged = 0;
  let CDNLinksChanged = 0;
  let cssClassChanged = 0;

  return (
    /** when overwrite flag is true, set base option */
    src([`${options.src}/${options.defaultFileGlob}`], { base: options.overwrite ? './' : undefined })
      // CDNJS CSS
      .pipe(
        replace(
          /<link href=["']https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/bootstrap\/4\.\d+\.\d+\/dist\/css\/bootstrap(\.min)?\.css["'] rel=["']stylesheet["'] ?\/?>/g,
          function () {
            CDNLinksChanged++;
            return '<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css" rel="stylesheet">';
          },
        ),
      )
      // JSDelivr CSS
      .pipe(
        replace(/<link href=["']https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@4\.\d+\.\d+\/dist\/css\/bootstrap(\.min)?\.css["'] rel=["']stylesheet["'] ?\/?>/g, function () {
          CDNLinksChanged++;
          return '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">';
        }),
      )
      // Stackpath CSS
      .pipe(
        replace(/<link href=["']https:\/\/stackpath\.bootstrapcdn\.com\/bootstrap\/4\.\d+\.\d+\/css\/bootstrap(\.min)?\.css["'] rel=["']stylesheet["'] ?\/?>/g, function () {
          CDNLinksChanged++;
          return '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">';
        }),
      )
      // UNPKG CSS
      .pipe(
        replace(/<link href=["']https:\/\/unpkg\.com\/bootstrap\/4\.\d+\.\d+\/css\/bootstrap(\.min)?\.css["'] rel=["']stylesheet["'] ?\/?>/g, function () {
          CDNLinksChanged++;
          return '<link href="https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css">';
        }),
      )
      // CDNJS JS
      .pipe(
        replace(/<script src=["']https:\/\/cdn\.cloudflare\.com\/ajax\/libs\/bootstrap\/4\.\d+\.\d+\/dist\/js\/bootstrap(\.min)?\.js["']>/g, function () {
          CDNLinksChanged++;
          return '<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.min.js">';
        }),
      )
      // JSDelivr JS
      .pipe(
        replace(/<script src=["']https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@4\.\d+\.\d+\/dist\/js\/bootstrap(\.min)?\.js["']>/g, function () {
          CDNLinksChanged++;
          return '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js">';
        }),
      )
      // Stackpath JS
      .pipe(
        replace(/<script src=["']https:\/\/stackpath\.bootstrapcdn\.com\/bootstrap\/4\.\d+\.\d+\/js\/bootstrap(\.min)?\.js["']>/g, function () {
          CDNLinksChanged++;
          return '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js">';
        }),
      )
      // UNPKG JS
      .pipe(
        replace(/<script src=["']https:\/\/unpkg\.com\/bootstrap\/4\.\d+\.\d+\/js\/bootstrap(\.min)?\.js["']>/g, function () {
          CDNLinksChanged++;
          return '<script src="https://unpkg.com/bootstrap@5.3.3/dist/js/bootstrap.min.js">';
        }),
      )
      // CDNJS Bundle JS
      .pipe(
        replace(/<script src=["']https:\/\/cdn\.cloudflare\.com\/ajax\/libs\/bootstrap\/4\.\d+\.\d+\/dist\/js\/bootstrap\.bundle(\.min)?\.js["']>/g, function () {
          CDNLinksChanged++;
          return '<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.bundle.min.js">';
        }),
      )
      // JSDelivr Bundle JS
      .pipe(
        replace(/<script src=["']https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@4\.\d+\.\d+\/dist\/js\/bootstrap\.bundle(\.min)?\.js["']>/g, function () {
          CDNLinksChanged++;
          return '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">';
        }),
      )
      // Stackpath Bundle JS
      .pipe(
        replace(/<script src=["']https:\/\/stackpath\.bootstrapcdn\.com\/bootstrap\/4\.\d+\.\d+\/js\/bootstrap\.bundle(\.min)?\.js["']>/g, function () {
          CDNLinksChanged++;
          return '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">';
        }),
      )
      // UNPKG Bundle JS
      .pipe(
        replace(/<script src=["']https:\/\/unpkg\.com\/bootstrap\/4\.\d+\.\d+\/js\/bootstrap\.bundle(\.min)?\.js["']>/g, function () {
          CDNLinksChanged++;
          return '<script src="https://unpkg.com/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">';
        }),
      )
      .pipe(
        replace(
          /\sdata-(animation|autohide|backdrop|boundary|container|content|custom-class|delay|dismiss|display|html|interval|keyboard|method|offset|pause|placement|popper-config|reference|ride|selector|slide(-to)?|target|template|title|toggle|touch|trigger|wrap)=/g,
          function (match, p1) {
            if (p1 === 'toggle' && match.includes('data-bs-toggle="')) {
              return match;
            }
            dataAttrChanged++;
            return ' data-bs-' + p1 + '=';
          },
        ),
      )
      .pipe(
        replace(/\[data-toggle=/g, function () {
          dataAttrChanged++;
          return '[data-bs-toggle=';
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bbadge-danger\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-bg-danger' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bbadge-dark\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-bg-dark' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bbadge-info\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-bg-info' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bbadge-light\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-bg-light' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bbadge-pill\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'rounded-pill' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bbadge-primary\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-bg-primary' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bbadge-secondary\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-bg-secondary' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bbadge-success\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-bg-success' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bbadge-warning\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-bg-warning' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bborder-left\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'border-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bborder-right\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'border-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"])\s*\bclose\b\s*(['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'btn-close' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bcustom-control-input\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-check-input' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bcustom-control-label\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-check-label' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bcustom-control custom-checkbox\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-check' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bcustom-control custom-radio\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-check' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bcustom-file-input\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-control' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bcustom-file-label\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-label' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bcustom-range\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-range' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bcustom-select-sm\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-select-sm' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bcustom-select-lg\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-select-lg' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bcustom-select\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-select' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bcustom-control custom-switch\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-check form-switch' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bdropdown-menu-left\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropdown-menu-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bdropdown-menu-sm-left\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropdown-menu-sm-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bdropdown-menu-md-left\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropdown-menu-md-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bdropdown-menu-lg-left\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropdown-menu-lg-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bdropdown-menu-xl-left\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropdown-menu-xl-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bdropdown-menu-right\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropdown-menu-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bdropdown-menu-sm-right\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropdown-menu-sm-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bdropdown-menu-md-right\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropdown-menu-md-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bdropdown-menu-lg-right\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropdown-menu-lg-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bdropdown-menu-xl-right\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropdown-menu-xl-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bdropleft\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropstart' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bdropright\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropend' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bfloat-left\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'float-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bfloat-sm-left\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'float-sm-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bfloat-md-left\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'float-md-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bfloat-lg-left\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'float-lg-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bfloat-xl-left\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'float-xl-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bfloat-right\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'float-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bfloat-sm-right\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'float-sm-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bfloat-md-right\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'float-md-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bfloat-lg-right\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'float-lg-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bfloat-xl-right\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'float-xl-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bfont-italic\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'fst-italic' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bfont-weight-bold\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'fw-bold' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bfont-weight-bolder\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'fw-bolder' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bfont-weight-light\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'fw-light' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bfont-weight-lighter\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'fw-lighter' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bfont-weight-normal\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'fw-normal' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bform-control-file\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-control' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bform-control-range\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-range' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bform-group\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'mb-3' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bform-inline\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'd-flex align-items-center' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bform-row\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'row' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bjumbotron-fluid\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'rounded-0 px-0' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bjumbotron\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'bg-light mb-4 rounded-2 py-5 px-3' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bmedia-body\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'flex-grow-1' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bmedia\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'd-flex' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bml-\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'ms-' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bml-n\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'ms-n' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bmr-\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'me-' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bmr-n\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'me-n' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bno-gutters\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'g-0' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bpl-\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'ps-' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bpr-\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'pe-' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bpre-scrollable\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'overflow-y-scroll' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bembed-responsive-item\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + '' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bembed-responsive-16by9\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'ratio-16x9' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bembed-responsive-1by1\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'ratio-1x1' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bembed-responsive-21by9\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'ratio-21x9' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bembed-responsive-4by3\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'ratio-4x3' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bembed-responsive\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'ratio' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\brounded-left\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'rounded-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\brounded-lg\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'rounded-3' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\brounded-right\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'rounded-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\brounded-sm\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'rounded-1' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bsr-only sr-only-focusable\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'visually-hidden-focusable' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bsr-only-focusable\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'visually-hidden-focusable' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bsr-only\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'visually-hidden' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\btext-hide\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'd-none' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\btext-left\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\btext-sm-left\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-sm-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\btext-md-left\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-md-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\btext-lg-left\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-lg-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\btext-xl-left\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-xl-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\btext-right\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\btext-sm-right\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-sm-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\btext-md-right\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-md-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\btext-lg-right\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-lg-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\btext-xl-right\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-xl-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\btext-monospace\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'font-monospace' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)\bwidth\b([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'collapse-horizontal' + p2;
        }),
      )
      .pipe(replace(/<select([^>]*)\bclass=['"]([^'"]*)form-control(-lg|-sm)?([^'"]*)['"]([^>]*)>/g, '<select$1class="$2form-select$3$4"$5>'))
      .pipe(replace(/<select([^>]*)\bclass=['"]([^'"]*)form-control\b([^'"]*['"])/g, '<select$1class="$2form-select$3'))
      .pipe(replace('<span aria-hidden="true">&times;</span>', ''))
      .pipe(dest(options.dest))
      .on('data', (data) => {
        if (options.verbose) {
          console.log(`Wrote file: ${data.path}`);
        }
      })
      .on('end', function () {
        console.log(`Completed! Changed ${cssClassChanged} CSS class names, ${dataAttrChanged} data-attributes and ${CDNLinksChanged} CDN links.`);
        cb();
      })
  );
}

/** parses cli args array and return an options object */
function parseArgs() {
  const options = Object.assign({}, DEFAULT_OPTIONS);

  const argv = process.argv;
  argv.forEach((flag, i) => {
    const value = argv[i + 1];
    switch (flag) {
      case '--src': {
        options.src = value;
        break;
      }
      case '--dest': {
        options.dest = value;
        break;
      }
      case '--glob': {
        options.defaultFileGlob = value;
        break;
      }
      case '--overwrite': {
        options.overwrite = true;
        options.dest = './';
        if (argv.includes('--dest')) {
          throw new Error('Cannot use --overwrite and --dest options together.');
        }
        break;
      }
      case '--verbose': {
        options.verbose = true;
        break;
      }

      default:
        break;
    }
  });
  return options;
}

exports.migrate = migrate;
