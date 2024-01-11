"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
const formSchema = z.object({
	field_1: z.number({ coerce: true }).int().min(0),
	field_2: z.number({ coerce: true }).min(1, {
		message: "Minst en",
	}),
});

import { useForm } from "react-hook-form";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";


import { Input } from "@/components/ui/input";

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

export default CalculationForm