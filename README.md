# Bootstrap 5 Migrate Tool

A command-line script designed to help you upgrade your Bootstrap 4 projects to Bootstrap 5. It uses gulp with gulp-replace to replace class names within your folder of HTML pages/templates.

## Features

- Replaces all the Bootstrap 4 class names with the renamed Bootstrap 5 class names
- Replaces deprecated components (such as `.jumbotron` and `.media`) with utility classes
- Renames all the data attributes (such as `data-toggle` and `data-target`) to the new names
- Updates all Bootstrap v4 CDN links (jsdelivr.net, unpkg.com and stackpath.bootstrapcdn.com) to latest version of Bootstrap v5

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
- `defaultFileGlob: '**/*.{asp,aspx,cshtml,ejs,erb,hbs,html,htm,jsp,php,twig,vue}'` - default glob for files to search in. Default: Search all folder and files recursively

## Demo

- Input: [Bootstrap 4 HTML template](https://coliff.github.io/bootstrap-5-migrate-tool/src/index.html)
- Output: [Bootstrap 5 HTML template](https://coliff.github.io/bootstrap-5-migrate-tool/dest/src/index.html)
