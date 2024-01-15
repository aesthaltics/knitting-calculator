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
				<div className="flex-col py-10 px-5 h-screen">
					<Nav />
					{children}
				</div>

				<Analytics />
			</body>
		</html>
	);
}
