"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Minus, Plus } from "lucide-react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import Pattern from "@/components/ui/pattern";

export default function Home() {
	const [showPattern, setShowPattern] = useState<boolean>(true);
	const [simplestPattern, setSimplestPattern] = useState<number[]>([]);

	const calculatePattern = (current_masks: number, added_amount: number) => {
		const average_distance = (current_masks + added_amount) / added_amount;
		const find_gcd = (a: number, b: number): number => {
			return b ? find_gcd(b, a % b) : a;
		};

		const isOdd = (a: number) => a % 2 === 1;

		if (Number.isInteger(average_distance)) {
			return setSimplestPattern([average_distance]);
		}

		const long_distance = Math.ceil(average_distance);
		const short_distance = long_distance - 1;

		let num_long_mask = (current_masks + added_amount) % added_amount;
		let num_short_mask = added_amount - num_long_mask;

		const gcd = find_gcd(num_long_mask, num_short_mask);

		num_long_mask = num_long_mask / gcd;
		num_short_mask = num_short_mask / gcd;

		const middle = [];
		if (isOdd(num_long_mask)) {
			num_long_mask--;
			middle.push(long_distance);
		}
		if (isOdd(num_short_mask)) {
			num_short_mask--;
			middle.push(short_distance);
		}

		const shortest_period = num_long_mask + num_short_mask

		if (shortest_period == 0) {
			return middle;
		}

		let simplest_period = [...Array(shortest_period / 2 + 1).keys()]
			.slice(1)
			.map((num) => {
				const least_common =
					num_long_mask > num_short_mask
						? [short_distance, num_short_mask]
						: [long_distance, num_long_mask];
				const most_common =
					least_common[0] === short_distance
						? [long_distance, num_long_mask]
						: [short_distance, num_short_mask];
				if (!isOdd(num) && least_common[1] >= num) {
					return least_common[0];
				}
				return most_common[0];
			});
		simplest_period = [
			...simplest_period,
			...middle,
			...simplest_period.toReversed(),
		];

		setSimplestPattern(simplest_period);
		return;
	};

	return (
		<main className="flex h-screen max-h-screen w-srceen flex-col items-center justify-between py-24">
			<h1 className="text-5xl font-bold text-soft-blue">
				Jevn fordeling av nye masker
			</h1>
			{simplestPattern.length > 0 &&
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
			}
			<div className="flex flex-col justify-center items-center w-full">
				<div>
					<AddStitchesDrawer calculatePattern={calculatePattern} />
				</div>
			</div>
		</main>
	);
}

const formSchema = z.object({
	current_mask_num: z.number({ coerce: true }).int().min(0),
	masks_to_add: z.number({ coerce: true }).min(1, {
		message: "Minst en",
	}),
});

type AddStitchesFormProps = {
	calculatePattern: (a: number, b: number) => void;
	current_num: number;
	current_to_add_num: number;
};

function AddStitchesForm({
	calculatePattern,
	current_num,
	current_to_add_num,
}: AddStitchesFormProps) {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			current_mask_num: current_num,
			masks_to_add: current_to_add_num,
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		calculatePattern(values.current_mask_num, values.masks_to_add);
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
					name="current_mask_num"
					render={({ field }) => (
						<FormItem>
							<div className="flex flex-row items-center justify-between pr-14">
								<FormLabel>Masker</FormLabel>
								<div className="flex flex-row items-center justify-around w-7/12 gap-2">
									<Button
										variant="outline"
										size="icon"
										className="h-8 w-8 shrink-0 rounded-full"
										onClick={() =>
											changeVal("current_mask_num", -10)
										}
										disabled={
											form.getValues("current_mask_num") <
											2
										}
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
										onClick={() =>
											changeVal("current_mask_num", 10)
										}
										disabled={
											form.getValues("current_mask_num") >
											10000
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
					name="masks_to_add"
					render={({ field }) => (
						<FormItem>
							<div className="flex flex-row items-center justify-between pr-14">
								<FormLabel>Nye Masker</FormLabel>
								<div className="flex flex-row items-center justify-around w-7/12 gap-2">
									<Button
										variant="outline"
										size="icon"
										className="h-8 w-8 shrink-0 rounded-full"
										onClick={() =>
											changeVal("masks_to_add", -10)
										}
										disabled={
											form.getValues("masks_to_add") < 2
										}
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
										onClick={() =>
											changeVal("masks_to_add", 10)
										}
										disabled={
											form.getValues("masks_to_add") >
											10000
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

const AddStitchesDrawer = ({
	calculatePattern,
}: {
	calculatePattern: (a: number, b: number) => void;
}) => {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button>
					Legg til masker
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader></DrawerHeader>
					<Card>
						<CardHeader>
							<CardTitle>Tittel</CardTitle>
							<CardDescription>Beskrivelse</CardDescription>
						</CardHeader>
						<CardContent>
							<AddStitchesForm
								calculatePattern={calculatePattern}
								current_to_add_num={30}
								current_num={170}
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
