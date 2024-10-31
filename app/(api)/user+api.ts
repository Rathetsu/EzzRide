import { neon } from "@neondatabase/serverless";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
	try {
		const sql = neon(`${process.env.DATABASE_URL}`);
		let { name, email, clerkId, password } = await request.json();
		if (!name || !email || !clerkId || !password) {
			return Response.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		password = await bcrypt.hash(password, 10);

		const response = await sql`
		INSERT INTO users (name, email, clerk_id, password)
		VALUES (${name}, ${email}, ${clerkId}, ${password})`;

		return new Response(JSON.stringify(response), {
			status: 200,
		});
	} catch (e) {
		console.log(e);
		return Response.json({ error: e }, { status: 500 });
	}
}
