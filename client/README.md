# React CSS Modules Boilerplate

Testing boilerplate setup from ejected [Create React App](https://github.com/facebookincubator/create-react-app) with CSS Modules and SASS added.

This is really more or less an implementation of CRA's [Adding a CSS Preprocessor (Sass, Less etc.)](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc) but to add CSS Modules handling.

## Dependencies

(In addition to CRA's dependencies)

* [node-sass-chokidar](https://github.com/michaelwayman/node-sass-chokidar)
* [sass-loader](https://github.com/webpack-contrib/sass-loader)
* [node-sass](https://github.com/sass/node-sass)
* [npm-run-all](https://github.com/mysticatea/npm-run-all)

Note: current webpack.config setup looks for .css extensions instead of .scss as node-sass-chokidar is converting all .scss files to .css