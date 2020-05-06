const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const isDevMode = process.env.NODE_ENV === "development";

function optimization() {
  const config = {
    splitChunks: {
      chunks: "all"
    }
  };

  if (!isDevMode) {
    config.minimizer = [new TerserPlugin(), new OptimizeCSSAssetsPlugin()];
  }
  return config;
}

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "[hash]_bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    port: 4200,
    hot: !!isDevMode
  },
  optimization: optimization(),
  module: {
    rules: [
      {
        test: /\.js$i/,
        exclude: /node_modules/,
        loader: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.ts$/i,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.html$/i,
        loader: "html-loader"
      },
      {
        test: /\.(png|jpg|svg|git)$/i,
        use: ["file-loader"]
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        use: ["file-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: {
        collapseWhitespace: !isDevMode
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "public/images"),
        to: path.resolve(__dirname, "dist/images")
      }
    ]),
    new MiniCssExtractPlugin({
      filename: "[hash]_styles.css"
    })
  ]
};