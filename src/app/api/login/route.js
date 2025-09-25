import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // Parse the request body
        const body = await req.json();
        const { email, password } = body;

        const ADMIN = process.env.ADMIN;
        const PASS = process.env.PASS;

        if (!ADMIN) {
            throw new Error("Please add your admin");
        }
        if (!PASS) {
            throw new Error("Please add your pass");
        }

        if (email === ADMIN && password === PASS) {
            return NextResponse.json(
                { message: "Login successful" },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { message: "Invalid email or password" },
            { status: 401 }
        );
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
