var webpack = require('webpack');

module.exports = {
	entry: './client/index.js',
	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			}
		]
	},
    plugins:
    [
    	new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.UglifyJsPlugin(
		{
            output: 
            {
                comments: false
            },  
			compress:
			{
				warnings: false
			}
	    })
  	]
};