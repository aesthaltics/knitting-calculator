import React from "react";

import ItemCard from "@/components/ui/item-card";

const Store = () => {
	return (
		<div className="flex flex-col gap-5">
			<div className="flex items-center justify-center">
				<h1 className="text-4xl">
					Dette er bare en pototype, butikken er ikke klar enda
				</h1>
			</div>

			<div className="flex flex-row w-full flex-wrap gap-4 justify-center">
				<div className="w-1/5">
					<ItemCard />
				</div>
				<div className="w-1/5">
					<ItemCard />
				</div>
				<div className="w-1/5">
					<ItemCard />
				</div>
				<div className="w-1/5">
					<ItemCard />
				</div>
				<div className="w-1/5">
					<ItemCard />
				</div>
				<div className="w-1/5">
					<ItemCard />
				</div>
				<div className="w-1/5">
					<ItemCard />
				</div>
				<div className="w-1/5">
					<ItemCard />
				</div>
			</div>
		</div>
	);
};

export default Store;
