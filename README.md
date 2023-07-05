# Bootstrap 5 Migrate Tool

A command-line script designed to help you upgrade your Bootstrap 4 projects to Bootstrap 5. It uses gulp with gulp-replace to replace class names.

It's not perfect, but it can save you a lot of time.

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

Read the official Bootstrap 5 migration guide here: <https://getbootstrap.com/docs/5.3/migration/>

## Demo

- Input: [Bootstrap 4 HTML template](https://coliff.github.io/bootstrap-5-migrate-tool/src/index.html)
- Output: [Bootstrap 5 HTML template](https://coliff.github.io/bootstrap-5-migrate-tool/dest/index.html)
