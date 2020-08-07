module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current'
				}
			}
		],
		'@babel/preset-typescript'
	],
	plugins: [
		['module-resolver', {
			alias: {
				'@controllers': './src/controllers',
				'@configs': './src/configs',
				'@guards': './src/guards',
				'@middlewares': './src/middlewares',
				'@routes': './src/routes',
				'@interfaces': './src/interfaces'
			}
		}]
	],
	ignore: [
		'**/*.spec.ts'
	]
}
