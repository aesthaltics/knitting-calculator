"use client";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import { ReactNode } from "react";


const formSchema = z.object({
	midje: z.number({ coerce: true }).min(0, "Det går ikke an å være så tynn!"),
	mål2: z.number({ coerce: true }).min(0, "Det går ikke an å være så tynn!"),
	mål3: z.number({ coerce: true }).min(0, "I wish"),
});
type Props = {
	children: ReactNode;
	imageSource: string;
	altText: string;
};
const ItemDialog = ({ children, imageSource, altText }: Props) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			midje: 20,
			mål2: 20,
			mål3: 20,
		},
	});
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-full w-8/12 px-2">
				<div className="flex w-full gap-4">
					<div className="w-1/3">
						<img
							src={imageSource}
							alt={altText}
							className="rounded"
						/>
					</div>

					<DialogHeader className="flex-grow">
						<DialogTitle>Ullgenser</DialogTitle>
						<DialogDescription>merino ull</DialogDescription>
					</DialogHeader>
					<div className="w-1/3">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="flex flex-col h-full gap-3"
							>
								<FormField
									control={form.control}
									name="midje"
									render={({ field }) => (
										<FormItem className="space-y-0">
											<FormLabel>Midje</FormLabel>
											<FormControl>
												<Input
													placeholder="20"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												This is your public display
												name.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="mål2"
									render={({ field }) => (
										<FormItem className="space-y-0">
											<FormLabel>Mål 2</FormLabel>
											<FormControl>
												<Input
													placeholder="20"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="mål3"
									render={({ field }) => (
										<FormItem className="space-y-0">
											<FormLabel>Mål 3</FormLabel>
											<FormControl>
												<Input
													placeholder="20"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex flex-grow items-end justify-end">
									<Button
										type="submit"
										className="bg-green-400 hover:bg-green-600"
									>
										Bestill
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
export default ItemDialog;
