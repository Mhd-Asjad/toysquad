/* eslint-disable */

import clientPromise from "@/libs/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PATCH(_, { params }) {
    try {
        const client = await clientPromise;
        const db = client.db("toysquad");

        const { id } = await params;

        // Find the category
        const category = await db.collection("categories").findOne({
            _id: new ObjectId(id),
        });

        if (!category) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }

        // Toggle isBlocked (default false if not present)
        const newStatus = !category.isBlocked;

        const updated = await db
            .collection("categories")
            .findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: { isBlocked: newStatus } },
                { returnDocument: "after" }
            );

        if (!updated) {
            return NextResponse.json(
                { error: "Failed to update category" },
                { status: 500 }
            );
        }

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error blocking/unblocking category:", error);
        return NextResponse.json(
            { error: "Failed to update category" },
            { status: 500 }
        );
    }
}
