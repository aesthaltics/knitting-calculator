import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "./button";
import ItemDialog from "./item-dialog";
import "@/../public/votter.jpg";

// type Props = {};
const ItemCard = () => {
	const imageSource = "votter.jpg";
	const altText = "knitted sweater";
	return (
		<div className="w-full">
			<Card>
				<CardContent className="p-0">
					<div className="w-full overflow-hidden bg-black rounded-t-lg">
						<img
							src={imageSource}
							alt={altText}
							className="hover:scale-110 duration-100 opacity-80 hover:opacity-100"
						/>
					</div>
				</CardContent>
				<CardHeader>
					<CardTitle>Ullvotter</CardTitle>
					<CardDescription>Votter i merinoull</CardDescription>
				</CardHeader>
				<CardFooter className="px-0">
					<div className="flex flex-row items-center justify-around w-full text-sm">
						<p className="text-center">NOK 500</p>
						<ItemDialog imageSource={imageSource} altText={altText}>
							<Button className="bg-green-400 hover:bg-green-600 px-4">
								Legg inn bestilling
							</Button>
						</ItemDialog>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};
export default ItemCard;
