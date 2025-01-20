const path = require('path');

module.exports = {
  mode: 'development', // Setează modul pe 'development' pentru a activa configurațiile specifice dezvoltării
  entry: './src/app.ts', // Punctul de intrare al aplicației tale
  output: {
    filename: 'bundle.js', // Numele fișierului de ieșire
    path: path.resolve(__dirname, 'dist'), // Directorul unde va fi plasat fișierul de ieșire
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Regulă pentru fișierele .ts
        use: 'ts-loader', // Utilizarea ts-loader pentru a compila TypeScript
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'], // Rezolvă extensiile .ts și .js
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    static: {
      directory: path.join(__dirname), // folosește directorul rădăcină
    },
    compress: true,
    port: 9000,
    open: true, // deschide automat browserul
    historyApiFallback: {
      index: 'index.html' // servește index.html pentru toate rutele
    }
  },
};
