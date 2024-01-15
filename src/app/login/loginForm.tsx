"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "../lib/actions";

const LoginForm = () => {
	const [errorMessage, dispatch] = useFormState(authenticate, undefined);
	return (
		<Card className="bg-gray-100 md:w-4/12">
			<CardHeader>
				<CardTitle>Logg Inn</CardTitle>
			</CardHeader>
			<CardContent className="w-full">
				<div className="flex flex-col gap-4 w-full">
					<form className="w-full" action={dispatch}>
						<div className="flex flex-col gap-2 w-full">
							<div>
								<Label htmlFor="username">Brukernavn</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="navn@eksempel.no"
								/>
							</div>
							<div>
								<Label htmlFor="password">Passord</Label>
								<Input
									id="password"
									name="password"
									type="password"
								/>
							</div>
							<EmailLoginButton />
						</div>
					</form>
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-gray-100 px-2 text-muted-foreground">
								Eller fortsett med
							</span>
						</div>
					</div>
					<Button className="bg-blue-600 text-white">Facebook</Button>
					<div className="flex" aria-live="polite" aria-atomic="true">
						{errorMessage && (
							<p className="text-sm text-red-500">
								{errorMessage}
							</p>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

const EmailLoginButton = () => {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" aria-disabled={pending}>
			Logg inn med Email
		</Button>
	);
};

export default LoginForm;
