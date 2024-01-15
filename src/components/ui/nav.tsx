import Link from "next/link";
import { signOut } from "@/auth";
import { Button } from "./button";

const pageLinks = [
	{
		name: "Kalkulator",
		href: "/calculator",
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
						key={pageLink.href}
						href={pageLink.href}
						className="flex items-center justify-center"
					>
						<Button>{pageLink.name}</Button>
					</Link>
				);
			})}
			<form
				action={async () => {
					"use server";
					await signOut();
				}}
			>
				<Button type="submit">Logg ut</Button>
			</form>
		</div>
	);
};

export default Nav;
