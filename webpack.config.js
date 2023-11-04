const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devtool: "source-map",
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname + '/dist')
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [

            {
                test: /\.tsc?$/,
                use: [
                        {
                            loader: "ts-loader",
                            // options: {
                            //     // 指定特定的ts编译配置，为了区分脚本的ts配置
                            //     configFile: resolve(__dirname, './tsconfig.json'),
                            // },
                        }
                    // {
                    //     loader: "awesome-typescript-loader"
                    // }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                  // [style-loader](/loaders/style-loader)
                  { loader: 'style-loader' },
                  // [css-loader](/loaders/css-loader)
                  {
                    loader: 'css-loader',
                  },
                  {
                	loader: 'postcss-loader',
                  },
                  // [sass-loader](/loaders/sass-loader)
                  { loader: 'less-loader' }
                ]
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: 'index.html'})
    ],
    devServer: {
        static: "./dist",
        compress: false,
        host: "localhost",
        port: 8080
    }

}
