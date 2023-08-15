const replace = require('gulp-replace');
const { src, dest } = require('gulp');

function migrate() {
  return (
    src(['src/*.html'])
      .pipe(
        replace(
          /<link href="https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@4\.\d+\.\d+\/dist\/css\/bootstrap(\.min)?\.css" rel="stylesheet" ?\/?>/g,
          '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">',
        ),
      )
      .pipe(
        replace(
          /<link href="https:\/\/stackpath\.bootstrapcdn\.com\/bootstrap\/4\.\d+\.\d+\/css\/bootstrap(\.min)?\.css" rel="stylesheet" ?\/?>/g,
          '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css">',
        ),
      )
      .pipe(
        replace(
          /<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@4\.\d+\.\d+\/dist\/js\/bootstrap\.bundle(\.min)?\.js">/g,
          '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js">',
        ),
      )
      .pipe(
        replace(
          /<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@4\.\d+\.\d+\/dist\/js\/bootstrap(\.min)?\.js">/g,
          '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js">',
        ),
      )
      .pipe(
        replace(
          /<script src="https:\/\/stackpath\.bootstrapcdn\.com\/bootstrap\/4\.\d+\.\d+\/js\/bootstrap(\.min)?\.js">/g,
          '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js">',
        ),
      )
      .pipe(
        replace(
          /<link href="https:\/\/unpkg\.com\/bootstrap\/4\.\d+\.\d+\/css\/bootstrap(\.min)?\.css" rel="stylesheet" ?\/?>/g,
          '<link href="https://unpkg.com/bootstrap@5.3.1/dist/css/bootstrap.min.css">',
        ),
      )
      .pipe(
        replace(
          /<script src="https:\/\/unpkg\.com\/bootstrap\/4\.\d+\.\d+\/js\/bootstrap(\.min)?\.js">/g,
          '<script src="https://unpkg.com/bootstrap@5.3.1/dist/js/bootstrap.min.js">',
        ),
      )
      .pipe(replace(/\sdata-animation=/g, ' data-bs-animation='))
      .pipe(replace(/\sdata-autohide=/g, ' data-bs-autohide='))
      .pipe(replace(/\sdata-boundary=/g, ' data-bs-boundary='))
      .pipe(replace(/\sdata-container=/g, ' data-bs-container='))
      .pipe(replace(/\sdata-content=/g, ' data-bs-content='))
      .pipe(replace(/\sdata-custom-class=/g, ' data-bs-custom-class='))
      .pipe(replace(/\sdata-delay=/g, ' data-bs-delay='))
      .pipe(replace(/\sdata-html=/g, ' data-bs-html='))
      .pipe(replace(/\sdata-interval=/g, ' data-bs-interval='))
      .pipe(replace(/\sdata-keyboard=/g, ' data-bs-keyboard='))
      .pipe(replace(/\sdata-method=/g, ' data-bs-method='))
      .pipe(replace(/\sdata-offset=/g, ' data-bs-offset='))
      .pipe(replace(/\sdata-pause=/g, ' data-bs-pause='))
      .pipe(replace(/\sdata-placement=/g, ' data-bs-placement='))
      .pipe(replace(/\sdata-ride=/g, ' data-bs-ride='))
      .pipe(replace(/\sdata-selector=/g, ' data-bs-selector='))
      .pipe(replace(/\sdata-slide=/g, ' data-bs-slide='))
      .pipe(replace(/\sdata-slide-to=/g, ' data-bs-slide-to='))
      .pipe(replace(/\sdata-target=/g, ' data-bs-target='))
      .pipe(replace(/\sdata-template=/g, ' data-bs-template='))
      .pipe(replace(/\sdata-title=/g, ' data-bs-title='))
      .pipe(replace(/\sdata-toggle=/g, ' data-bs-toggle='))
      .pipe(replace(/\sdata-touch=/g, ' data-bs-touch='))
      .pipe(replace(/\sdata-trigger=/g, ' data-bs-trigger='))
      .pipe(replace(/\sdata-wrap=/g, ' data-bs-wrap='))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bbadge-danger\b([^"]*")/g, '$1bg-danger$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bbadge-dark\b([^"]*")/g, '$1bg-dark$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bbadge-info\b([^"]*")/g, '$1bg-info$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bbadge-light\b([^"]*")/g, '$1bg-light$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bbadge-pill\b([^"]*")/g, '$1rounded-pill$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bbadge-primary\b([^"]*")/g, '$1bg-primary$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bbadge-secondary\b([^"]*")/g, '$1bg-secondary$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bbadge-success\b([^"]*")/g, '$1bg-success$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bbadge-warning\b([^"]*")/g, '$1bg-warning$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bborder-left\b([^"]*")/g, '$1border-start$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bborder-right\b([^"]*")/g, '$1border-end$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bclose\b([^"]*")/g, '$1btn-close$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bcustom-control-input\b([^"]*")/g, '$1form-check-input$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bcustom-control-label\b([^"]*")/g, '$1form-check-label$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bcustom-control custom-checkbox\b([^"]*")/g, '$1form-check$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bcustom-control custom-radio\b([^"]*")/g, '$1form-check$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bcustom-file-input\b([^"]*")/g, '$1form-control$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bcustom-file-label\b([^"]*")/g, '$1form-label$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bcustom-range\b([^"]*")/g, '$1form-range$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bcustom-select-sm\b([^"]*")/g, '$1form-select-sm$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bcustom-select-lg\b([^"]*")/g, '$1form-select-lg$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bcustom-select\b([^"]*")/g, '$1form-select$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bcustom-control custom-switch\b([^"]*")/g, '$1form-check form-switch$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bdropdown-menu-left\b([^"]*")/g, '$1dropdown-menu-start$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bdropdown-menu-sm-left\b([^"]*")/g, '$1dropdown-menu-sm-start$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bdropdown-menu-md-left\b([^"]*")/g, '$1dropdown-menu-md-start$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bdropdown-menu-lg-left\b([^"]*")/g, '$1dropdown-menu-lg-start$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bdropdown-menu-xl-left\b([^"]*")/g, '$1dropdown-menu-xl-start$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bdropdown-menu-right\b([^"]*")/g, '$1dropdown-menu-end$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bdropdown-menu-sm-right\b([^"]*")/g, '$1dropdown-menu-sm-end$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bdropdown-menu-md-right\b([^"]*")/g, '$1dropdown-menu-md-end$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bdropdown-menu-lg-right\b([^"]*")/g, '$1dropdown-menu-lg-end$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bdropdown-menu-xl-right\b([^"]*")/g, '$1dropdown-menu-xl-end$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bdropleft\b([^"]*")/g, '$1dropstart$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bdropright\b([^"]*")/g, '$1dropend$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bfloat-left\b([^"]*")/g, '$1float-start$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bfloat-sm-left\b([^"]*")/g, '$1float-sm-start$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bfloat-md-left\b([^"]*")/g, '$1float-md-start$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bfloat-lg-left\b([^"]*")/g, '$1float-lg-start$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bfloat-xl-left\b([^"]*")/g, '$1float-xl-start$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bfloat-right\b([^"]*")/g, '$1float-end$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bfloat-sm-right\b([^"]*")/g, '$1float-sm-end$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bfloat-md-right\b([^"]*")/g, '$1float-md-end$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bfloat-lg-right\b([^"]*")/g, '$1float-lg-end$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bfloat-xl-right\b([^"]*")/g, '$1float-xl-end$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bfont-italic\b([^"]*")/g, '$1fst-italic$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bfont-weight-bold\b([^"]*")/g, '$1fw-bold$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bfont-weight-bolder\b([^"]*")/g, '$1fw-bolder$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bfont-weight-light\b([^"]*")/g, '$1fw-light$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bfont-weight-lighter\b([^"]*")/g, '$1fw-lighter$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bfont-weight-normal\b([^"]*")/g, '$1fw-normal$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bform-control-file\b([^"]*")/g, '$1form-control$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bform-control-range\b([^"]*")/g, '$1form-range$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bform-group\b([^"]*")/g, '$1mb-3$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bform-inline\b([^"]*")/g, '$1d-flex align-items-center$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bform-row\b([^"]*")/g, '$1row$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bjumbotron-fluid\b([^"]*")/g, '$1rounded-0 px-0$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bjumbotron\b([^"]*")/g, '$1bg-light mb-4 rounded-2 py-5 px-3$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bmedia-body\b([^"]*")/g, '$1flex-grow-1$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bmedia\b([^"]*")/g, '$1d-flex$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bml-\b([^"]*")/g, '$1ms-$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bml-n\b([^"]*")/g, '$1ms-n$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bmr-\b([^"]*")/g, '$1me-$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bmr-n\b([^"]*")/g, '$1me-n$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bno-gutters\b([^"]*")/g, '$1g-0$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bpl-\b([^"]*")/g, '$1ps-$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bpr-\b([^"]*")/g, '$1pe-$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bpre-scrollable\b([^"]*")/g, '$1overflow-y-scroll$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bembed-responsive-item\b([^"]*")/g, '$1$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bembed-responsive-16by9\b([^"]*")/g, '$1ratio-16x9$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bembed-responsive-1by1\b([^"]*")/g, '$1ratio-1x1$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bembed-responsive-21by9\b([^"]*")/g, '$1ratio-21x9$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bembed-responsive-4by3\b([^"]*")/g, '$1ratio-4x3$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bembed-responsive\b([^"]*")/g, '$1ratio$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\brounded-left\b([^"]*")/g, '$1rounded-start$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\brounded-lg\b([^"]*")/g, '$1rounded-3$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\brounded-right\b([^"]*")/g, '$1rounded-end$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\brounded-sm\b([^"]*")/g, '$1rounded-1$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bsr-only-focusable\b([^"]*")/g, '$1visually-hidden-focusable$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\bsr-only\b([^"]*")/g, '$1visually-hidden$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\btext-hide\b([^"]*")/g, '$1d-none$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\btext-left\b([^"]*")/g, '$1text-start$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\btext-sm-left\b([^"]*")/g, '$1text-sm-start$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\btext-md-left\b([^"]*")/g, '$1text-md-start$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\btext-lg-left\b([^"]*")/g, '$1text-lg-start$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\btext-xl-left\b([^"]*")/g, '$1text-xl-start$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\btext-right\b([^"]*")/g, '$1text-end$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\btext-sm-right\b([^"]*")/g, '$1text-sm-end$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\btext-md-right\b([^"]*")/g, '$1text-md-end$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\btext-lg-right\b([^"]*")/g, '$1text-lg-end$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\btext-xl-right\b([^"]*")/g, '$1text-xl-end$2'))
      .pipe(replace(/(<[^>]*class\s*=\s*"[^"]*)\btext-monospace\b([^"]*")/g, '$1font-monospace$2'))
      .pipe(replace(/<select([^>]*)\bclass=['"]([^'"]*)form-control(-lg|-sm)?([^'"]*)['"]([^>]*)>/g, '<select$1class="$2form-select$3$4"$5>'))
      .pipe(replace(/<select([^>]*)\bclass=['"]([^'"]*)form-control\b([^"]*")/g, '<select$1class="$2form-select$3'))
      .pipe(dest('dest/'))
  );
}

exports.migrate = migrate;
