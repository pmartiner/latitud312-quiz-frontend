import path from 'path';
import webpack, { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const webpackConfig = (env): Configuration => ({
    entry: {
      polyfills: './src/config/polyfills.ts',
      index: './src/index.tsx',
    },
    ...(env.production || !env.development ? {} : {devtool: 'eval-source-map'}),
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
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      compress: true,
      hot: true,
      // watchContentBase: true,
      // liveReload: true,
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
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
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
              ]
            },
            
          }
        },
        {
          test: /\.(png|svg|jpg|gif)$/i,
          use: ['file-loader']
        },
      ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          hash: true,
          filename: 'index.html',
          template: './public/index.html'
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
        })
    ]
});

export default webpackConfig;