import { NextResponse } from "next/server";
import clientPromise from "@/libs/mongodb";

export async function POST(req) {
    try {
        const body = await req.json();
        const { name } = body;

        if (!name || name.trim() === "") {
            return NextResponse.json(
                { message: "Category name is required" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("toysquad");

        // Check if category already exists
        const existing = await db.collection("categories").findOne({ name });
        if (existing) {
            return NextResponse.json(
                { message: "Category already exists" },
                { status: 400 }
            );
        }

        const result = await db.collection("categories").insertOne({
            name,
            isBlocked: false,
            createdAt: new Date(),
        });

        return NextResponse.json({
            success: true,
            data: {
                _id: result.insertedId,
                name,
            },
        });
    } catch (error) {
        console.error("Add Category Error:", error);
        return NextResponse.json(
            { message: "Failed to add category" },
            { status: 500 }
        );
    }
}
