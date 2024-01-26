import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/ui/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Knitting Calculator",
	description: "Calculator for knitting",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="flex h-screen min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
					<Nav />
					<div className="flex flex-grow w-0">
						{children}
					</div>
				</div>
				<Analytics />
			</body>
		</html>
	);
}
