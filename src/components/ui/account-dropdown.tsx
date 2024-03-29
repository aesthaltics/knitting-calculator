import { Button } from "@/components/ui/button";
import {
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
	DropdownMenuContent,
	DropdownMenu,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";



function AccountDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
					size="icon"
					variant="ghost"
				>
					<Image
						alt="Avatar"
						className="rounded-full"
						height="32"
						src="/placeholder.svg"
						style={{
							aspectRatio: "32/32",
							objectFit: "cover",
						}}
						width="32"
					/>
					<span className="sr-only">Toggle user menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem>Support</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
export default AccountDropdown;
