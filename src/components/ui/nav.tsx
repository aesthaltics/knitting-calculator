// import { signOut } from "@/auth";
import Link from "next/link";


const pageLinks = [
	{
		name: "Kalkulator",
		href: "/calculator",
		icon: "",
	},
	{
		name: "Butikk",
		href: "/store",
		icon: "",
	},
];
// <Link
// 	className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
// 	href="#"
// >
// 	{/* <HomeIcon className="h-4 w-4" /> */}
// 	Home
// </Link>
// <Link
// 	className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
// 	href="#"
// >
// 	{/* <ShoppingCartIcon className="h-4 w-4" /> */}
// 	Orders
// 	{/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">6</Badge> */}
// </Link>
// <Link
// 	className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
// 	href="#"
// >
// 	{/* <PackageIcon className="h-4 w-4" /> */}
// 	Products
// </Link>
// <Link
// 	className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
// 	href="#"
// >
// 	{/* <LineChartIcon className="h-4 w-4" /> */}
// 	Analytics
// </Link>

/* <div className="flex flex-row items-center gap-2">
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
</div> */

const Nav = () => {
	return (
		<div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
			<div className="flex h-full max-h-screen flex-col gap-2">
				<div className="flex h-[60px] items-center border-b px-6">
					<Link
						className="flex items-center gap-2 font-semibold"
						href="/"
					>
						{/* <Package2Icon className="h-6 w-6" /> */}
						<span className="">Strikkekalkulator</span>
					</Link>
				</div>
				<div className="flex-1 overflow-auto py-2">
					<nav className="grid items-start px-4 text-sm font-medium">
						{pageLinks.map((pageLink) => (
							<Link
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
								href={pageLink.href}
								key={pageLink.href}
							>
								{/* <HomeIcon className="h-4 w-4" /> */}
								{pageLink.name}
							</Link>
						))}
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Nav;
