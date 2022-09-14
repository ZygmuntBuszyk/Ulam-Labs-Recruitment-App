const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

module.exports = withPlugins([withImages], {
	async redirects() {
		return [
			{
				source: '/home',
				destination: '/',
				permanent: true
			}
		];
	},
	typescript: { ignoreBuildErrors: true },
	env: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_COINGECKO_API_URL
	}
});
