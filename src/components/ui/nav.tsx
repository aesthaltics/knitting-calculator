"use client";
import Link from "next/link";

const pageLinks = [
	{
		name: "Kalkulator",
		href: "/",
	},
	{
		name: "Butikk",
		href: "/store",
	},
];

const Nav = () => {
	return (
		<div className="flex flex-row items-center gap-2">
			{pageLinks.map((pageLink) => {
				return (
					<Link
						href={pageLink.href}
						key={pageLink.href}
						className="flex items-center justify-center rounded-full px-4 text-center text-sm outline"
					>
						{pageLink.name}
					</Link>
				);
			})}
		</div>
	);
};

export default Nav;
