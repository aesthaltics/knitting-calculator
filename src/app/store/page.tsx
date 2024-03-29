import React from "react";

import ItemCard from "@/components/ui/item-card";

import { sql } from "@vercel/postgres";

export type Product = {
	id: string;
	price: number;
	title: string;
	description: string;
	image: string;
};

const Store = async () => {
	const { rows } = await sql<Product>`SELECT * FROM product`;
	return (
		<div className="flex flex-col w-full h-full gap-5">
			<div className="flex items-center justify-center">
				<h1 className="text-4xl">
					Dette er bare en pototype, butikken er ikke klar enda
				</h1>
			</div>
			<div className="w-full columns-2 md:columns-3 lg:columns-4">
				{rows &&
					rows.map((row) => {
						return (
							<div
								className="w-full break-inside-avoid-column py-2"
								key={row.id}
							>
								<ItemCard product={row} />
							</div>
						);
					})}
				{rows &&
					rows.map((row) => {
						return (
							<div
								className="w-full break-inside-avoid-column py-2"
								key={row.id}
							>
								<ItemCard product={row} />
							</div>
						);
					})}
				{rows &&
					rows.map((row) => {
						return (
							<div
								className="w-full break-inside-avoid-column py-2"
								key={row.id}
							>
								<ItemCard product={row} />
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Store;
