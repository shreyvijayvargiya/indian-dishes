const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = () => {
	return {
		experimental: {
			esmExternals: false,
		},
		images: {
			domains: [
				"firebasestorage.googleapis.com",
				"static.toiimg.com",
				"oaidalleapiprodscus.blob.core.windows.net",
				"picsum.photos",
			],
		},
		transpilePackages: ["gsap"],
		webpack: (config) => {
			config.node = {
				fs: "empty",
				child_process: "empty",
				net: "empty",
				dns: "empty",
				tls: "empty",
			};
			return config;
		},
		...withBundleAnalyzer({}),
	};
};
