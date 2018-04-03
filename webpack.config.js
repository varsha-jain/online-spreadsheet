const webpack = require('webpack');
const path = require('path');


module.exports= {
    entry: './src/js/spreadsheet.js',
    
    output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/dist'
	},
    module: {
        rules: [{
                test: /\.js$/,
                
                use: [
				{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
				]
		},
				{
                test: /\.css$/,
                use: [
				'style-loader',
				'css-loader'
				]
            }]
		
            
        
    },
    
    watch: true
};