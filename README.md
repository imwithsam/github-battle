# Github-Battle

## Overview

Github-Battle is a practice app using:
* React.js
* npm / Node.js
* Webpack
* Babel

Refer to http://courses.reactjsprogram.com/courses/reactjsfundamentals/ for more
info.

## Notes

These are my personal notes for setting up a basic React.js app.

1) `npm init`

This creates a `package.json` configuration file in your root directory that npm
uses to store and access basic info about your application. In particular, it
stores your application's packages and dependencies.

2) `npm install --save react react-dom`

This installs the `react` and `react-dom` packages as production dependencies.
`react` is the core React.js package and `react-dom` is used to render React
components to the DOM (as opposed to React Native).

3) `npm install --save-dev html-webpack-plugin webpack webpack-dev-server
   babel-{core,loader} babel-preset-react`

This installs some packages to support building a basic React.js app. These are
installed as development environment dependencies. `webpack` is used to
transform and bundle code. `webpack-dev-server` provides some convenient
features for running your app in development. `babel-core` is the core package
used to transform future versions of JavaScript into ES5. `babel-loader` is used
by Webpack to interface with Babel. `babel-preset-react` is used to transform
your React JSX into JavaScript. `html-webpack-plugin` is used by Webpack to
help generate your production HTML file(s).

4) Create `webpack.config.js`

This file will go in your project root directory and is used by Webpack to
determine:

* the starting point of your app (the root JavaScript file)
* what transformations to make on your code
* where to save the transformed and bundled (production) code

5) Create `.babelrc`

This file will also go in your project root directory and is used to tell Babel
to use `babel-preset-react` to transform your React JSX into JavaScript.

6) Create app subdirectory with `index.html` and `index.js`

You will create an app subdirectory containing an `index.html` file that
`html-webpack-plugin` will use to generate your production HTML file. You will
also create the root JavaScript file you defined in `webpack.config.js` as your
app's entry point.

7) Update `package.json` scripts

Update the `package.json` file created when you ran `npm init`. Replace the
default test script with the following:
```
"scripts": {
  "production": "webpack -p",
  "start": "webpack-dev-server"
}
```
These two scripts will allow you to run `npm run production` and `npm run start`
from the command line. `npm run production` will run Webpack in production mode,
creating a transformed, minified, and bundled version of your app. `npm run
start` will run `webpack-dev-server` which will allow you to serve your app on
`http://localhost:8080/` (by default) with automatic recompiling of any changes.
