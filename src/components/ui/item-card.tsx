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

import Image from "next/image";

import { Product } from "@/app/store/page";

type Props = {
	product: Product;
};
const ItemCard = ({ product }: Props) => {
	const { image, title, description, price } = product;
	return (
		<div className="w-full">
			<Card>
				<CardContent className="p-0">
					<div className="w-full overflow-hidden bg-black rounded-t-lg">
						<Image
							src={image}
							alt={title}
							className="hover:scale-110 duration-100 opacity-80 hover:opacity-100"
							width={0}
							height={0}
							sizes="100vw"
							style={{ width: "100%", height: "auto" }}
						/>
					</div>
				</CardContent>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardFooter className="px-0">
					<div className="flex flex-col md:flex-row items-center justify-around w-full text-sm">
						<p className="text-center">{price}</p>
						<ItemDialog imageSource={image} altText={title}>
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
