const path = require("path");

module.exports = {
  entry: "./public/javascripts/index.js", // Titik masuk utama (Entry point)
  output: {
    filename: "bundle.js", // Nama file output
    path: path.resolve(__dirname, "public/dist"), // Direktori output
    publicPath: "/dist/", // Path publik untuk mengakses file output
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Aturan untuk file JavaScript
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Menggunakan Babel untuk kompatibilitas ES6+
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/, // Aturan untuk file CSS
        use: ["style-loader", "css-loader"], // Menggunakan style-loader dan css-loader
      },
      {
        test: /\.(png|jpg|gif|svg)$/, // Aturan untuk file gambar
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]", // Nama file output dengan hash untuk caching
              outputPath: "images/", // Direktori output gambar
            },
          },
        ],
      },
    ],
  },
  mode: "development", // Mode pengembangan
};
