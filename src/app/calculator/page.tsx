"use client";
import Pattern from "@/components/ui/pattern";
import CalculationFormDrawer from "./components/input-drawer";
import React, { useState, useRef } from "react";

export default function Page() {
	const [simplestPattern, setSimplestPattern] = useState<number[]>([]);
	const patternParentElement = useRef<HTMLDivElement>(null);
	

	return (
		<main className="flex h-full w-full flex-col items-center justify-between py-24">
			<h1 className="text-5xl font-bold text-soft-blue">
				Jevn fordeling av nye masker
			</h1>
			{simplestPattern.length > 0 && (
				<div className="flex flex-col gap-5 items-center w-full" ref={patternParentElement}>
					<Pattern
						simplestPattern={simplestPattern}
					/>
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
