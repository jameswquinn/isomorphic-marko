/**
 * Created by Wu Jian Ping on 2017/3/20.
 */

import webpack from 'webpack'
import sharedClientConfig from './client.shared'

export default Object.assign({}, sharedClientConfig, {
  // devtool: 'eval-source-map',
  devtool: 'eval',

  output: {
    publicPath: '/',
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js', '.marko', '.json'],
    unsafeCache: true
  },

  module: {
    noParse: function(content) {
      return /lodash/.test(content)
    },
    rules: [{
      test: /\.js$/i,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: './.cache/babel-loader',
          compact: false
        }
      }]
    },

    {
      test: /\.marko$/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: './.cache/babel-loader'
        }
      },
      {
        loader: 'marko-loader'
      }
      ]
    },

    {
      test: /\.scss$/i,
      use: [{
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: 'true'
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: './tools/postcss.config.js'
          },
          sourceMap: 'inline'
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
      ]
    },

    {
      test: /\.less$/i,
      use: [{
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: './tools/postcss.config.js'
          },
          sourceMap: 'inline'
        }
      },
      {
        loader: 'less-loader',
        options: {
          sourceMap: true
        }
      }
      ]
    },

    {
      test: /\.css$/i,
      use: [{
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: './tools/postcss.config.js'
          },
          sourceMap: 'inline'
        }
      }
      ]
    },

    {
      test: /\.(ico|gif|png|jpg|jpeg|webp)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }]
    },

    {
      test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }]
    },

    {
      test: /\.(woff2?|ttf|eot|svg)(\?[\s\S])?$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }]
    }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      '__BROWSER__': true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      jQuery: 'jquery'
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  stats: 'errors-only'
  // stats: {
  //   colors: true,
  //   warnings: true
  // }
})
