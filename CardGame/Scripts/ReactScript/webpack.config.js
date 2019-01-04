module.exports = {
    context: __dirname,
    entry: {
        index: __dirname + '/index.jsx'
    },
    output:
    {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    },
    watch: true,
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            //{
            //    test: /\.css$/,
            //    loader: 'url-loader?limit=100000',
            //},
            //{
            //    test: /\.css$/,
            //    loader: 'style-loader!css-loader'
            //},
            //{
            //    test: /\.s[a|c]ss$/,
            //    loader: 'sass-loader!style-loader!css-loader'
            //},
            //{
            //    test: /\.(jpg|png|gif|jpeg|woff|woff2|eot|ttf|svg)$/,
            //    loader: 'url-loader?limit=100000'
            //}
        ]
    }
    
    //plugins: [
    //    new webpack.DefinePlugin({
    //        //IDENTITY_API: JSON.stringify('http://52.187.246.133:60968'),
    //        //PROFILE_API: JSON.stringify('http://52.187.246.133:60190'),
    //        //LISTING_API: JSON.stringify('http://52.187.246.133:51689'),
    //        //SCHEDULE_API: JSON.stringify('http://52.187.246.133:58297')
    //        IDENTITY_API: JSON.stringify('http://localhost:60968'),
    //        PROFILE_API: JSON.stringify('http://localhost:60190'),
    //        LISTING_API: JSON.stringify('http://localhost:51689'),
    //        SCHEDULE_API: JSON.stringify('http://localhost:58297')
    //    })
    //]
}