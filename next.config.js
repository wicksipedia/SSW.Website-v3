module.exports = {
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	poweredByHeader: false,
	images: {
		domains: ["assets.tina.io", "i.ytimg.com", "ssw.com.au", "www.ssw.com.au"],
	},
	output: "standalone", // required for Docker support
	swcMinify: false,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
	async rewrites() {
		return [
			{
				source: "/",
				destination: "/home",
			},
		];
	},
	async redirects() {
		return [
			{
				source: "/admin",
				destination: "/admin/index.html",
				permanent: true,
			},
		];
	},
};
