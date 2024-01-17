const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
const workboxPlugin = new InjectManifest({
  swSrc: './src-sw.js', // Path to your service worker file
  swDest: 'service-worker.js', // Output service worker file name
});


const pwaManifestPlugin = new WebpackPwaManifest({
  name: 'Your PWA Name',
  short_name: 'PWA',
  description: 'Description of your PWA',
  background_color: '#ffffff',
  theme_color: '#000000',
  icons: [
    {
      src: path.resolve('./src/images/logo.png'), // Path to your app icon
      sizes: [96, 128, 192, 256, 384, 512],
      destination: path.join('assets', 'icons'),
    },
  ],
});

// TODO: Add CSS loaders and babel to webpack.
const cssLoader = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
};

const babelLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  },
};

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      header: './src/js/header.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        chunks: ['main'],
      }),
       //Add HtmlWebpackPlugin for header.js if it has an associated HTML file
       new HtmlWebpackPlugin({
         template: './src/js/header.html',
         filename: 'header.html',
         chunks: ['header'],
       }),
      // TODO: Include workboxPlugin and pwaManifestPlugin in the plugins array
      workboxPlugin,
      pwaManifestPlugin,
    ],
    module: {
      rules: [cssLoader, babelLoader],
    },
  };
};
