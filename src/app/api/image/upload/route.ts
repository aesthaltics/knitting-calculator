import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
	const { searchParams } = new URL(request.url);
	const filename = searchParams.get("filename");

	if (filename === null) {
		return Promise.reject('could not find filename')
	}
	if (request.body === null) {
		return Promise.reject('request body is empty')
	}
	// ⚠️ The below code is for App Router Route Handlers only
	const blob = await put(filename, request.body, {
		access: "public",
	});


	return NextResponse.json(blob);
}
