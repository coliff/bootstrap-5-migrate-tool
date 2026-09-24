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

  let dataAttrChanged = 0;
  let CDNLinksChanged = 0;
  let cssClassChanged = 0;

  return (
    /** when overwrite flag is true, set base option */
    src([`${options.src}/${options.defaultFileGlob}`], { base: options.overwrite ? './' : undefined })
      // CDNJS CSS
      .pipe(
        replace(/(href=["'])(https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/bootstrap\/4\.\d+\.\d+\/dist\/css\/bootstrap(\.min)?\.css)(["'])/g, function (match, p1, p2, p3, p4) {
          CDNLinksChanged++;
          return p1 + 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.8/css/bootstrap.min.css' + p4;
        }),
      )
      // JSDelivr CSS
      .pipe(
        replace(/(href=["'])(https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@4\.\d+\.\d+\/dist\/css\/bootstrap(\.min)?\.css)(["'])/g, function (match, p1, p2, p3, p4) {
          CDNLinksChanged++;
          return p1 + 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css' + p4;
        }),
      )
      // Stackpath CSS
      .pipe(
        replace(/(href=["'])(https:\/\/stackpath\.bootstrapcdn\.com\/bootstrap\/4\.\d+\.\d+\/css\/bootstrap(\.min)?\.css)(["'])/g, function (match, p1, p2, p3, p4) {
          CDNLinksChanged++;
          return p1 + 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css' + p4;
        }),
      )
      // UNPKG CSS
      .pipe(
        replace(/(href=["'])(https:\/\/unpkg\.com\/bootstrap\/4\.\d+\.\d+\/css\/bootstrap(\.min)?\.css)(["'])/g, function (match, p1, p2, p3, p4) {
          CDNLinksChanged++;
          return p1 + 'https://unpkg.com/bootstrap@5.3.8/dist/css/bootstrap.min.css' + p4;
        }),
      )
      // CDNJS JS
      .pipe(
        replace(/(src=["'])(https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/bootstrap\/4\.\d+\.\d+\/dist\/js\/bootstrap(\.min)?\.js)(["'])/g, function (match, p1, p2, p3, p4) {
          CDNLinksChanged++;
          return p1 + 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.8/js/bootstrap.min.js' + p4;
        }),
      )
      // JSDelivr JS
      .pipe(
        replace(/(src=["'])(https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@4\.\d+\.\d+\/dist\/js\/bootstrap(\.min)?\.js)(["'])/g, function (match, p1, p2, p3, p4) {
          CDNLinksChanged++;
          return p1 + 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.min.js' + p4;
        }),
      )
      // Stackpath JS
      .pipe(
        replace(/(src=["'])(https:\/\/stackpath\.bootstrapcdn\.com\/bootstrap\/4\.\d+\.\d+\/js\/bootstrap(\.min)?\.js)(["'])/g, function (match, p1, p2, p3, p4) {
          CDNLinksChanged++;
          return p1 + 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.min.js' + p4;
        }),
      )
      // UNPKG JS
      .pipe(
        replace(/(src=["'])(https:\/\/unpkg\.com\/bootstrap\/4\.\d+\.\d+\/js\/bootstrap(\.min)?\.js)(["'])/g, function (match, p1, p2, p3, p4) {
          CDNLinksChanged++;
          return p1 + 'https://unpkg.com/bootstrap@5.3.8/dist/js/bootstrap.min.js' + p4;
        }),
      )
      // CDNJS Bundle JS
      .pipe(
        replace(
          /(src=["'])(https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/bootstrap\/4\.\d+\.\d+\/dist\/js\/bootstrap\.bundle(\.min)?\.js)(["'])/g,
          function (match, p1, p2, p3, p4) {
            CDNLinksChanged++;
            return p1 + 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.8/js/bootstrap.bundle.min.js' + p4;
          },
        ),
      )
      // JSDelivr Bundle JS
      .pipe(
        replace(/(src=["'])(https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@4\.\d+\.\d+\/dist\/js\/bootstrap\.bundle(\.min)?\.js)(["'])/g, function (match, p1, p2, p3, p4) {
          CDNLinksChanged++;
          return p1 + 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js' + p4;
        }),
      )
      // Stackpath Bundle JS
      .pipe(
        replace(/(src=["'])(https:\/\/stackpath\.bootstrapcdn\.com\/bootstrap\/4\.\d+\.\d+\/js\/bootstrap\.bundle(\.min)?\.js)(["'])/g, function (match, p1, p2, p3, p4) {
          CDNLinksChanged++;
          return p1 + 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js' + p4;
        }),
      )
      // UNPKG Bundle JS
      .pipe(
        replace(/(src=["'])(https:\/\/unpkg\.com\/bootstrap\/4\.\d+\.\d+\/js\/bootstrap\.bundle(\.min)?\.js)(["'])/g, function (match, p1, p2, p3, p4) {
          CDNLinksChanged++;
          return p1 + 'https://unpkg.com/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js' + p4;
        }),
      )
      .pipe(
        replace(
          /\sdata-(animation|autohide|backdrop|boundary|container|content|custom-class|delay|dismiss|display|html|interval|keyboard|method|offset|pause|placement|popper-config|reference|ride|selector|slide(-to)?|target|template|title|toggle|touch|trigger|wrap)=/g,
          function (match, p1) {
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
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])badge-danger(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-bg-danger' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])badge-dark(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-bg-dark' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])badge-info(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-bg-info' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])badge-light(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-bg-light' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])badge-pill(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'rounded-pill' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])badge-primary(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-bg-primary' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])badge-secondary(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-bg-secondary' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])badge-success(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-bg-success' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])badge-warning(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-bg-warning' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])border-left(?=(?:-0)?(?![\w-]))([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'border-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])border-right(?=(?:-0)?(?![\w-]))([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'border-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])close(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'btn-close' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])custom-control-input(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-check-input' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])custom-control-label(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-check-label' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])custom-control custom-checkbox(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-check' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])custom-control custom-radio(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-check' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])custom-file-input(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-control' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])custom-file-label(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-label' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])custom-range(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-range' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])custom-select-sm(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-select-sm' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])custom-select-lg(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-select-lg' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])custom-select(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-select' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])custom-control custom-switch(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-check form-switch' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])dropdown-menu-left(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropdown-menu-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])dropdown-menu-sm-left(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropdown-menu-sm-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])dropdown-menu-md-left(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropdown-menu-md-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])dropdown-menu-lg-left(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropdown-menu-lg-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])dropdown-menu-xl-left(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropdown-menu-xl-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])dropdown-menu-right(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropdown-menu-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])dropdown-menu-sm-right(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropdown-menu-sm-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])dropdown-menu-md-right(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropdown-menu-md-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])dropdown-menu-lg-right(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropdown-menu-lg-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])dropdown-menu-xl-right(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropdown-menu-xl-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])dropleft(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropstart' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])dropright(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'dropend' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])float-left(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'float-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])float-sm-left(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'float-sm-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])float-md-left(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'float-md-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])float-lg-left(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'float-lg-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])float-xl-left(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'float-xl-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])float-right(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'float-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])float-sm-right(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'float-sm-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])float-md-right(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'float-md-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])float-lg-right(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'float-lg-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])float-xl-right(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'float-xl-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])font-italic(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'fst-italic' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])font-weight-bold(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'fw-bold' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])font-weight-bolder(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'fw-bolder' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])font-weight-light(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'fw-light' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])font-weight-lighter(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'fw-lighter' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])font-weight-normal(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'fw-normal' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])form-control-file(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-control' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])form-control-range(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'form-range' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])form-group(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'mb-3' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])form-inline(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'd-flex align-items-center' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])form-row(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'row' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])jumbotron-fluid(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'rounded-0 px-0' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])jumbotron(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'bg-light mb-4 rounded-2 py-5 px-3' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])media-body(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'flex-grow-1' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])media(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'd-flex' + p2;
        }),
      )
      // Rewrite every ml-*, mr-*, pl-* and pr-* utility in a class attribute (not just the first one)
      .pipe(
        replace(/(<[^>]*\sclass\s*=\s*['"])([^'"]*)(['"])/g, function (match, p1, classes, p2) {
          const updated = classes.replace(/(?<![\w-])([mp])([lr])-(?=\w)/g, function (token, type, side) {
            cssClassChanged++;
            return type + (side === 'l' ? 's' : 'e') + '-';
          });
          return p1 + updated + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])no-gutters(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'g-0' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])pre-scrollable(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'overflow-y-scroll' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])embed-responsive-item(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + '' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])embed-responsive-16by9(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'ratio-16x9' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])embed-responsive-1by1(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'ratio-1x1' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])embed-responsive-21by9(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'ratio-21x9' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])embed-responsive-4by3(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'ratio-4x3' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])embed-responsive(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'ratio' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])rounded-left(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'rounded-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])rounded-lg(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'rounded-3' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])rounded-right(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'rounded-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])rounded-sm(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'rounded-1' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])sr-only sr-only-focusable(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'visually-hidden-focusable' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])sr-only-focusable(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'visually-hidden-focusable' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])sr-only(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'visually-hidden' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])text-hide(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'd-none' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])text-left(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])text-sm-left(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-sm-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])text-md-left(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-md-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])text-lg-left(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-lg-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])text-xl-left(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-xl-start' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])text-right(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])text-sm-right(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-sm-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])text-md-right(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-md-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])text-lg-right(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-lg-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])text-xl-right(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'text-xl-end' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])text-monospace(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'font-monospace' + p2;
        }),
      )
      .pipe(
        replace(/(<[^>]*class\s*=\s*['"][^'"]*)(?<![\w-])width(?![\w-])([^'"]*['"])/g, function (match, p1, p2) {
          cssClassChanged++;
          return p1 + 'collapse-horizontal' + p2;
        }),
      )
      .pipe(replace(/<select([^>]*)\bclass=['"]([^'"]*)(?<![\w-])form-control(-lg|-sm)?(?![\w-])([^'"]*)['"]([^>]*)>/g, '<select$1class="$2form-select$3$4"$5>'))
      .pipe(replace(/<select([^>]*)\bclass=['"]([^'"]*)(?<![\w-])form-control(?![\w-])([^'"]*['"])/g, '<select$1class="$2form-select$3'))
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
