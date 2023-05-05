import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import PostCssPresetEnv from 'postcss-preset-env';
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = (devMode)? 'web' : 'browserslist';
const devtool = (devMode)? 'source-map': undefined;
export default {
    mode,
    target,
    devtool,
    context: path.resolve('src'),
    entry: ["@babel/polyfill", "./index.js"],
    output: {
        path: path.resolve('dist'),
        clean: true,
        filename: '[main][contenthash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[main][contenthash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.(c|sc)ss$/i,
                use: [
                    (devMode)? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [PostCssPresetEnv],
                                }, 
                            },
                    },                  
                    "sass-loader"
                ]
            },
            {
                test: /\.woff2?$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.(jpe?g|png|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[ext]'
                },
                use: [
                    {
                      loader: 'image-webpack-loader',
                      options: {
                        mozjpeg: {
                          progressive: true,
                        },
                        // optipng.enabled: false will disable optipng
                        optipng: {
                          enabled: false,
                        },
                        pngquant: {
                          quality: [0.65, 0.90],
                          speed: 4
                        },
                        gifsicle: {
                          interlaced: false,
                        },
                        // the webp option will enable WEBP
                        webp: {
                          quality: 75
                        }
                      }
                    }
                ]
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env', { targets: "defaults" }]
                    ]
                  }
                }
            },

        ]
    }
}