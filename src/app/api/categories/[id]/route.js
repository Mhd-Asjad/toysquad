import clientPromise from "@/libs/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(req, { params }) {
    const client = await clientPromise;
    const db = client.db("toysquad");

    const body = await req.json();
    const { id } = await params;

    if (!body.name || typeof body.name !== "string") {
        return NextResponse.json(
            { error: "Name is required" },
            { status: 400 }
        );
    }

    const updated = await db
        .collection("categories")
        .findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { name: body.name } },
            { returnDocument: "after" }
        );

    if (!updated) {
        return NextResponse.json(
            { error: "Category not found" },
            { status: 404 }
        );
    }
    return NextResponse.json(updated, { status: 200 });
}

export async function DELETE(_, { params }) {
    const client = await clientPromise;
    const db = client.db("toysquad");

    const { id } = await params;

    const deleted = await db.collection("categories").deleteOne({
        _id: new ObjectId(id),
    });

    if (deleted.deletedCount === 0) {
        return NextResponse.json(
            { error: "Category not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({ message: "Category deleted successfully" });
}
