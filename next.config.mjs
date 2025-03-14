/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	// Compress images for better performance
	images: {
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 31536000, // 1 year
	},
	// Enable gzip compression for better performance
	compress: true,
	// Configure headers for optimal caching
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/_next/static/(.*)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/images/(.*)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/api/(.*)",
				headers: [
					{
						key: "Cache-Control",
						value: "no-store, max-age=0",
					},
				],
			},
		];
	},
	// Enable static optimization
	experimental: {
		optimizeCss: true,
		optimizeServerReact: true,
	},
	// Configure webpack for better code splitting and smaller bundles
	webpack: (config, { dev, isServer }) => {
		// Only enable chunk optimization in production
		if (!dev) {
			config.optimization.splitChunks = {
				chunks: "all",
				cacheGroups: {
					default: false,
					vendors: false,
					// Create a chunk for each game mode
					guessTheFlag: {
						test: /[\\/]app[\\/]gamemodes[\\/]guess-the-flag[\\/]/,
						name: "guess-the-flag",
						chunks: "all",
						priority: 10,
					},
					nameTheCountry: {
						test: /[\\/]app[\\/]gamemodes[\\/]name-the-country[\\/]/,
						name: "name-the-country",
						chunks: "all",
						priority: 10,
					},
					findTheCountry: {
						test: /[\\/]app[\\/]gamemodes[\\/]find-the-country[\\/]/,
						name: "find-the-country",
						chunks: "all",
						priority: 10,
					},
					// Separate chunk for the settings
					settings: {
						test: /[\\/]app[\\/]settings[\\/]/,
						name: "settings",
						chunks: "all",
						priority: 10,
					},
					// Create a commons chunk for shared code
					commons: {
						name: "commons",
						minChunks: 2,
						priority: 1,
					},
					// Create a vendors chunk for node_modules
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendors",
						chunks: "all",
						priority: 20,
					},
				},
			};
		}

		return config;
	},
};

export default nextConfig;
