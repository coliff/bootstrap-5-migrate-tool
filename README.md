# Bootstrap 5 Migrate Tool

[![LICENSE: MIT](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://raw.githubusercontent.com/coliff/bootstrap-5-migrate-tool/main/LICENSE)
[![GitHub Super-Linter](https://github.com/coliff/bootstrap-5-migrate-tool/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/marketplace/actions/super-linter)
[![GitHub stars image](https://img.shields.io/github/stars/coliff/bootstrap-5-migrate-tool.svg?label=GitHub%20Stars)](https://github.com/coliff/bootstrap-5-migrate-tool)

A command-line script designed to help you upgrade your Bootstrap 4 projects to Bootstrap 5. It uses gulp with gulp-replace to replace class names within your folder of HTML pages/templates.

## Features

- Replaces all the Bootstrap 4 class names with the renamed Bootstrap 5 class names
- Replaces deprecated components (such as `.jumbotron` and `.media`) with utility classes
- Renames all the data attributes (such as `data-toggle` and `data-target`) to the new names
- Updates all Bootstrap v4 CDN links (cloudflare, jsdelivr, stackpath.bootstrapcdn.com and unpkg) to latest version of Bootstrap v5
- Options to overwrite the existing files in place or save the migrated files to a different folder
- Can convert not only HTML files but also ASP, CSHTML, EJS, ERB, HBS, JSP, PHP, VUE, and other template files
- Provides a summary of the changes made

## Usage

Clone this repo and then run the following command:

```bash
npm install
```

Copy your HTML templates to the `src` folder.

Then run the following command to start the migration:

```bash
npx gulp migrate
```

The migrated HTML templates will overwrite the files in place by default. If you want to keep the original files, you can use the `--dest` flag to specify a destination folder. See the [Options](#options) section for more details.

Read the official Bootstrap 5 migration guide here: <https://getbootstrap.com/docs/5.3/migration/>

## Options

Options that may be set via CLI flags.
For example: `npx gulp migrate  --src "./src-dir" --overwrite --verbose`

- `src: './src'` - string that will be passed to the gulp {@link src} function
- `dest: ./`- string that will be passed to the gulp {@link dest} function
- `overwrite: true` - overwrite the existing files in place. **Cannot be used with --dest flag**
- `verbose: true`- print the path of each generated / modified file to the console
- `defaultFileGlob: '**/*.{asp,aspx,cshtml,gohtml,gotmpl,ejs,erb,hbs,html,htm,js,jsp,php,ts,twig,vue}'` - default glob for files to search in. Default: Search all folder and files recursively

## Demo

- Input: [Bootstrap 4 HTML template](https://coliff.github.io/bootstrap-5-migrate-tool/src/index.html)
- Output: [Bootstrap 5 HTML template](https://coliff.github.io/bootstrap-5-migrate-tool/dest/src/index.html)

## Post-migration Tips

- Use the [Bootstrap Deprecated Classes browser extension](https://github.com/julien-deramond/bootstrap-deprecated-classes-extension) on your site post migration to see if anything is missed
- If you used negative margins/padding classes (e.g, `.mt-n1` or `.pb-n2`) note that these are not included in the Bootstrap CSS CDN so you may want to add those
- Note that Bootstrap v5 no longer includes print styles. Consider using: [Bootstrap Print CSS](https://github.com/coliff/bootstrap-print-css)
- Bootstrap has issues with Windows Contrast themes. Consider using: [Bootstrap Forced Colors CSS](https://github.com/coliff/bootstrap-forced-colors-css)
- You probably don't need to support Internet Explorer 11 anymore, but if you do consider using: [Bootstrap-ie11](https://github.com/coliff/bootstrap-ie11)
