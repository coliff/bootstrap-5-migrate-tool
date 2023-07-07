# Bootstrap 5 Migrate Tool

A command-line script designed to help you upgrade your Bootstrap 4 projects to Bootstrap 5. It uses gulp with gulp-replace to replace class names.

It's not perfect, but it can save you a lot of time.

## Features

- Replaces all the Bootstrap 4 class names with the renamed Bootstrap 5 class names
- Replaces deprecated components (such as `.jumbotron` and `.media`) with utility classes
- Updates all Bootstrap v4 CDN links (jsdelivr.net and stackpath.bootstrapcdn.com) to latest version of Bootstrap v5

## Usage

Clone this repo and then run the following command:

```bash
npm install
```

Copy your HTML templates to the `src` folder.

Then run the following command to start the migration:

```bash
gulp migrate
```

The migrated HTML templates will be saved to the `dest` folder.

Read the official Bootstrap 5 migration guide here: <https://getbootstrap.com/docs/5.3/migration/>

## Demo

- Input: [Bootstrap 4 HTML template](https://coliff.github.io/bootstrap-5-migrate-tool/src/index.html)
- Output: [Bootstrap 5 HTML template](https://coliff.github.io/bootstrap-5-migrate-tool/dest/index.html)
