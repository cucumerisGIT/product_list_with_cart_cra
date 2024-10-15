const { override, adjustStyleLoaders } = require('customize-cra')
const loaderUtils = require('loader-utils')
const path = require('path')

module.exports = function override(config) {
  // Existing style loader logic
  if (process.env.NODE_ENV === 'production') {
    adjustStyleLoaders(({ use: [, css] }) => {
      if (css.options.modules) {
        css.options.modules.getLocalIdent = (context, localIdentName, localName) => {
          const hash = loaderUtils.getHashDigest(
            path.posix.relative(context.rootContext, context.resourcePath) + localName,
            'md5',
            'base64',
            6
          );
          return `${localName}_${hash}`;
        };
      }
    })(config);
  }

  // Add the path-browserify polyfill
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "path": require.resolve("path-browserify")
  };

  return config;
};