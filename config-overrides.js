const { override, adjustStyleLoaders } = require('customize-cra')
const loaderUtils = require('loader-utils')
const path = require('path')

module.exports = override(
  process.env.NODE_ENV === 'production' &&
    adjustStyleLoaders(({ use: [, css] }) => {
      if (css.options.modules) {
        css.options.modules.getLocalIdent = (context, localIdentName, localName, options) => {
          const hash = loaderUtils.getHashDigest(
            path.posix.relative(context.rootContext, context.resourcePath) + localName,
            'md5',
            'base64',
            6
          )
          return `${localName}_${hash}`;
        }
      }
    })
)