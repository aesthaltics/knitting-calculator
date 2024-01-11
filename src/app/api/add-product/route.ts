import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const productName = searchParams.get("productName");
	const ownerName = searchParams.get("ownerName");

	try {
		if (!productName || !ownerName)
			throw new Error("product and owner names required");
		await sql`INSERT INTO products (Name, Owner) VALUES (${productName}, ${ownerName});`;
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}

	const products = await sql`SELECT * FROM products;`;
	return NextResponse.json({ products }, { status: 200 });
}
