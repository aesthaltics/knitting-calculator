import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const Page = () => {
	return (
		<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
			<div className="flex items-center gap-4">
				<h1 className="font-semibold text-lg md:text-xl">
					Sales Summary
				</h1>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Revenue</CardTitle>
					</CardHeader>
					<CardContent>
						{/* <LineChart className="w-full aspect-[4/3]" /> */}
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Number of Orders</CardTitle>
					</CardHeader>
					<CardContent>
						{/* <LineChart className="w-full aspect-[4/3]" /> */}
					</CardContent>
				</Card>
			</div>
			<div className="flex items-center gap-4">
				<h1 className="font-semibold text-lg md:text-xl">
					Recent Orders
				</h1>
			</div>
			<div className="grid grid-cols-1 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Order #1234</CardTitle>
					</CardHeader>
					<CardContent>
						<p>3 items - $150.00</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Order #1235</CardTitle>
					</CardHeader>
					<CardContent>
						<p>2 items - $100.00</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Order #1236</CardTitle>
					</CardHeader>
					<CardContent>
						<p>1 item - $50.00</p>
					</CardContent>
				</Card>
			</div>
			<div className="flex items-center gap-4">
				<h1 className="font-semibold text-lg md:text-xl">
					Product Inventory
				</h1>
			</div>
			<div className="grid grid-cols-1 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Product A</CardTitle>
					</CardHeader>
					<CardContent>
						<p>50 units in stock</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Product B</CardTitle>
					</CardHeader>
					<CardContent>
						<p>30 units in stock</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Product C</CardTitle>
					</CardHeader>
					<CardContent>
						<p>20 units in stock</p>
					</CardContent>
				</Card>
			</div>
			<div className="flex items-center gap-4">
				<h1 className="font-semibold text-lg md:text-xl">
					Manage Product Listings
				</h1>
			</div>
			<div className="grid grid-cols-1 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Product A</CardTitle>
					</CardHeader>
					<CardContent>
						<Button variant="outline">Edit</Button>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Product B</CardTitle>
					</CardHeader>
					<CardContent>
						<Button variant="outline">Edit</Button>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Product C</CardTitle>
					</CardHeader>
					<CardContent>
						<Button variant="outline">Edit</Button>
					</CardContent>
				</Card>
			</div>
		</main>
	);
};

export default Page;
