"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Minus, Plus, ChevronDown } from "lucide-react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import Pattern from "@/components/ui/pattern";

import { addStitchesEvenly, removeStitchesEvenly } from "@/lib/knitting-algos";

// type page = "calculator" | "store";

export default function Home() {
	const [showPattern, setShowPattern] = useState<boolean>(true);
	const [simplestPattern, setSimplestPattern] = useState<number[]>([]);
	// const [currentPage, setCurrentPage] = useState<page>("calculator");

	return (
		<main className="flex h-screen max-h-screen w-srceen flex-col items-center justify-between py-24">
			<h1 className="text-5xl font-bold text-soft-blue">
				Jevn fordeling av nye masker
			</h1>
			{simplestPattern.length > 0 && (
				<div className="flex flex-col gap-5 items-center w-full">
					<Button
						onClick={() =>
							setShowPattern((showPattern) => !showPattern)
						}
						className="w-min"
					>
						{showPattern ? "Vis Tall" : "Vis Mønster"}
					</Button>
					<Pattern
						showPattern={showPattern}
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

const formSchema = z.object({
	field_1: z.number({ coerce: true }).int().min(0),
	field_2: z.number({ coerce: true }).min(1, {
		message: "Minst en",
	}),
});

type CalculationFormProps = {
	field_name_1: string;
	field_name_2: string;

	submitFunc: (field_val_1: number, field_val_2: number) => void;
	field_val_1: number;
	field_val_2: number;
};

function CalculationForm({
	field_name_1,
	field_name_2,
	submitFunc,
	field_val_1,
	field_val_2,
}: CalculationFormProps) {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			field_1: field_val_1,
			field_2: field_val_2,
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		submitFunc(values.field_1, values.field_2);
	}

	const changeVal = (name: keyof typeof formSchema.shape, amount: number) => {
		let curVal = form.getValues(name);
		if (isNaN(curVal)) {
			curVal = 0;
		}
		const newVal =
			amount > 0
				? Math.min(curVal + amount, 10000)
				: Math.max(curVal + amount, 0);
		form.setValue(name, newVal);
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="field_1"
					render={({ field }) => (
						<FormItem>
							<div className="flex flex-row items-center justify-between pr-14">
								<FormLabel>{field_name_1}</FormLabel>
								<div className="flex flex-row items-center justify-around w-7/12 gap-2">
									<Button
										variant="outline"
										size="icon"
										className="h-8 w-8 shrink-0 rounded-full"
										onClick={() =>
											changeVal("field_1", -10)
										}
										disabled={form.getValues("field_1") < 2}
									>
										<Minus className="h-4 w-4" />
										<span className="sr-only">
											Decrease
										</span>
									</Button>

									<FormControl>
										<Input className="w-full" {...field} />
									</FormControl>
									<Button
										variant="outline"
										size="icon"
										className="h-8 w-8 shrink-0 rounded-full"
										onClick={() => changeVal("field_1", 10)}
										disabled={
											form.getValues("field_1") > 10000
										}
									>
										<Plus className="h-4 w-4" />
										<span className="sr-only">
											Increase
										</span>
									</Button>
								</div>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="field_2"
					render={({ field }) => (
						<FormItem>
							<div className="flex flex-row items-center justify-between pr-14">
								<FormLabel>{field_name_2}</FormLabel>
								<div className="flex flex-row items-center justify-around w-7/12 gap-2">
									<Button
										variant="outline"
										size="icon"
										className="h-8 w-8 shrink-0 rounded-full"
										onClick={() =>
											changeVal("field_2", -10)
										}
										disabled={form.getValues("field_2") < 2}
									>
										<Minus className="h-4 w-4" />
										<span className="sr-only">
											Decrease
										</span>
									</Button>

									<FormControl>
										<Input className="w-full" {...field} />
									</FormControl>
									<Button
										variant="outline"
										size="icon"
										className="h-8 w-8 shrink-0 rounded-full"
										onClick={() => changeVal("field_2", 10)}
										disabled={
											form.getValues("field_2") > 10000
										}
									>
										<Plus className="h-4 w-4" />
										<span className="sr-only">
											Increase
										</span>
									</Button>
								</div>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="w-full" type="submit">
					Kalkuler
				</Button>
			</form>
		</Form>
	);
}

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
