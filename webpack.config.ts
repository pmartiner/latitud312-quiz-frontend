import path from 'path';
import webpack, { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

// Plugins
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

type EnvVars = {
  development?: boolean;
  production?: boolean;
};

const babelOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
      }
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic'
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread'
  ],
  sourceType: 'unambiguous'
};

const webpackConfig = (env: EnvVars): Configuration => {
  if (env.development) {
    babelOptions.plugins.push('react-refresh/babel');
  }

  return {
    entry: {
      polyfills: path.resolve(__dirname, 'src', 'config', 'polyfills.ts'),
      main: path.resolve(__dirname, 'src', 'index.tsx'),
    },
    devtool: env.development ? 'eval' : 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      //TODO waiting on https://github.com/dividab/tsconfig-paths-webpack-plugin/issues/61
      //@ts-ignore
      plugins: [new TsconfigPathsPlugin()],
      alias: {
        'src': path.resolve(__dirname, 'src/'),
        'components': path.resolve(__dirname, 'src/components/'),
      }
    },
    target: env.development ? 'web' : 'browserslist',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      compress: true,
      hot: true,
      overlay: true,
      open: true,
      port: 3000
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name]-[contenthash].js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: babelOptions
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              }
            }
          ]
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: babelOptions
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/i,
          use: 'file-loader'
        },
      ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          hash: true,
          filename: 'index.html',
          template: './public/index.html',
          minify: {
            minifyCSS: true,
            collapseWhitespace: true,
            keepClosingSlash: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          }
        }),
        new ESLintPlugin({
          extensions: ['.tsx', '.ts', '.js']
        }),
        new webpack.DefinePlugin({
          'process.env.PRODUCTION': env.production || !env.development,
          'process.env.NAME': JSON.stringify(require('./package.json').name),
          'process.env.VERSION': JSON.stringify(require('./package.json').version)
        }),
        new ForkTsCheckerWebpackPlugin({
          eslint: {
            files: './src/**/*.{ts,tsx,js,jsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
          }
        }),
        () => new webpack.HotModuleReplacementPlugin(),
        () => env.development && new ReactRefreshPlugin({
          overlay: {
            sockIntegration: 'wds',
          }
        })
    ]
  }
};

export default webpackConfig;