"use client";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTrigger,
} from "@/components/ui/drawer";
import React, { useState } from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import CalculationForm from "./calculator-form";
import { addStitchesEvenly, removeStitchesEvenly } from "@/lib/knitting-algos";

const CalculationFormDrawer = ({
	setPattern,
}: {
	setPattern: (pattern: number[]) => void;
}) => {
	const [formValues, setFormValues] = useState({
		field_1: 170,
		field_2: 30,
		field_name_1: "Nåværende masker",
		field_name_2: "Nye masker",
	});
	const [currentAlgo, setCurrentAlgo] =
		useState<algo_name>("Legg til Masker");
	const algos = {
		"Legg til Masker": addStitchesEvenly,
		"Fell Masker": removeStitchesEvenly,
	};
	type algo_name = keyof typeof algos;

	const calculate = (value_1: number, value_2: number) => {
		setFormValues({
			...formValues,
			field_1: value_1,
			field_2: value_2,
		});
		setPattern(algos[currentAlgo](value_1, value_2));
	};

	const fieldNames: {
		[algo: string]: { field_name_1: string; field_name_2: string };
	} = {
		"Legg til Masker": {
			field_name_1: "Nåværende masker",
			field_name_2: "Nye masker",
		},
		"Fell Masker": {
			field_name_1: "Nåværende masker",
			field_name_2: "Masker å fjerne",
		},
	};

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button>Legg inn kalkulasjon</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader></DrawerHeader>
					<Card>
						<CardHeader>
							<DropdownMenu>
								<DropdownMenuTrigger>
									<div className="flex flex-row items-center justify-center gap-1">
										{currentAlgo}
										<ChevronDown />
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel className="text-lg">
										Kalulasjon
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									{Object.keys(algos).map((algo) => {
										return (
											<DropdownMenuItem
												className="text-md py-3"
												key={`algo dropdown ${algo}`}
												onClick={() => {
													setCurrentAlgo(
														algo as algo_name
													);
													setFormValues({
														...formValues,
														...fieldNames[algo],
													});
												}}
											>
												{algo}
											</DropdownMenuItem>
										);
									})}
								</DropdownMenuContent>
							</DropdownMenu>
						</CardHeader>
						<CardContent>
							<CalculationForm
								field_name_1={formValues.field_name_1}
								field_name_2={formValues.field_name_2}
								submitFunc={calculate}
								field_val_1={formValues.field_1}
								field_val_2={formValues.field_2}
							/>
						</CardContent>
					</Card>
					<DrawerFooter>
						<DrawerClose>
							Lukk
							{/* <Button variant="outline">Cancel</Button> */}
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default CalculationFormDrawer;
