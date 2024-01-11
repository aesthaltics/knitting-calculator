"use client";
import Pattern from "@/components/ui/pattern";
import CalculationFormDrawer from "./components/input-drawer";
import React, { useState } from "react";

export default function Page() {
	const [simplestPattern, setSimplestPattern] = useState<number[]>([]);

	return (
		<main className="flex h-screen max-h-screen w-srceen flex-col items-center justify-between py-24">
			<h1 className="text-5xl font-bold text-soft-blue">
				Jevn fordeling av nye masker
			</h1>
			{simplestPattern.length > 0 && (
				<div className="flex flex-col gap-5 items-center w-full">
					<Pattern simplestPattern={simplestPattern} />
				</div>
			)}
			<div className="flex flex-col justify-center items-center w-full">
				<div>
					<CalculationFormDrawer setPattern={setSimplestPattern} />
				</div>
			</div>
		</main>
	);
}
