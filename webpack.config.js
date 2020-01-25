const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDevelopment = true;
module.exports = {
  entry: "./src/app.js",
  output: {
    path: `${__dirname}/public/build`,
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /\.(png|jpg|gif)$/, loader: "url-loader" },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
