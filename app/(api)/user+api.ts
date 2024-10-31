import { neon } from "@neondatabase/serverless";

const generateSalt = (): string => {
	return Math.random().toString(36).substring(2, 10);
};

const hashPassword = async (password: string): Promise<string> => {
	const encoder = new TextEncoder();
	const data = encoder.encode(password);

	const hashBuffer = await crypto.subtle.digest("SHA-256", data);

	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");

	return hashHex;
};

export async function POST(request: Request) {
	try {
		const sql = neon(`${process.env.DATABASE_URL}`);
		const { name, email, clerkId, password } = await request.json();
		if (!name || !email || !clerkId || !password) {
			return Response.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}
		const salt = generateSalt();
		const saltedPassword = `${password}${salt}`;
		const hashedPassword = await hashPassword(saltedPassword);

		const response = await sql`
		INSERT INTO users (
			name, 
			email, 
			clerk_id,
			password
		  ) 
		  VALUES (
			${name}, 
			${email},
			${clerkId},
			${hashedPassword}
		 );`;

		return new Response(JSON.stringify({ data: response }), {
			status: 200,
		});
	} catch (e) {
		console.log("Erorr creating user: ", e);
		return Response.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
