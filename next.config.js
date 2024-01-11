/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "hljxiwp7neocz5wf.public.blob.vercel-storage.com",
			},
		],
	},
};

module.exports = nextConfig;
