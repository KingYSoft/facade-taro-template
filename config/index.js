/* tslint:disable */
/* eslint-disable */

const path = require('path')
const env = process.env.TARO_ENV

const config = {
  projectName: 'FacadeCompanyName.FacadeProjectName',
  date: '2020-2-28',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist/' + env,
  babel: {
    sourceMap: true,
    presets: [
      [
        'env',
        {
          modules: false,
        },
      ],
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      [
        'transform-runtime',
        {
          helpers: false,
          polyfill: false,
          regenerator: true,
          moduleName: 'babel-runtime',
        },
      ],
    ],
  },
  plugins: ['@tarojs/plugin-sass', '@tarojs/plugin-terser'],
  defineConstants: {},
  mini: {
    commonChunks(commonChunks) {
      commonChunks.push('vendors-tarojs')
      return commonChunks
    },
    webpackChain(chain, webpack) {
      chain.merge({
        optimization: {
          splitChunks: {
            cacheGroups: {
              tarojs: {
                name: 'vendors-tarojs',
                priority: 1000,
                test(module) {
                  // console.log(module.context.replace(/\\/g, '/'))
                  const context = module.context.replace(/\\/g, '/')
                  return /node_modules[\\/]@tarojs/.test(context)
                },
              },
            },
          },
        },
      })
      // chain
      //   .plugin('analyzer')
      //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8'],
        },
      },
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 10240, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8'],
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  sass: {
    resource: ['src/custom-variables.scss'],
    projectDirectory: path.resolve(__dirname, '..'),
  },
}

module.exports = function(merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
