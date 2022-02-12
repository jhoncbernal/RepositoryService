import path from 'path';
import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import NodemonPlugin from 'nodemon-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import dotenv from 'dotenv';
import fs from 'fs';

const { NODE_ENV = 'production' }: any = process.env;

const copyEnv: any = fs.existsSync('./.env')
  ? [
      new CopyPlugin({
        patterns: [{ from: '.env' }]
      })
    ]
  : [];

const config: webpack.Configuration = {
  entry: [path.resolve(__dirname, 'src')],
  mode: NODE_ENV,
  watch: NODE_ENV === 'development',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.hbs?$/,
        use: 'handlebars-loader'
      }
    ]
  },
  devtool: 'source-map',
  externals: [nodeExternals()] as webpack.Configuration['externals'],
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    }),
    new ESLintPlugin({
      extensions: ['.tsx', '.ts', '.js']
    }),
    new NodemonPlugin({
      ignore: ['./node_modules'],
      verbose: true,
      delay: 500
    }),
    ...copyEnv
  ] as webpack.Configuration['plugins'],
  stats: {
    warnings: true
  }
};

export default config;
