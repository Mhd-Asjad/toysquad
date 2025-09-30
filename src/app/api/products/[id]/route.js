import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/config/mongodb";
import { ObjectId } from "mongodb";
import clientPromise from "@/libs/mongodb";
import cloudinary from "@/libs/cloudinary";

export async function GET(_, { params }) {
    await connectDB();
    try {
        const product = await Product.findById((await params).id);
        if (product) {
            return NextResponse.json(product, { status: 200 });
        }
        return NextResponse.json({ message: "product not found" });
    } catch (err) {
        console.log(err, "error while Get particular prod");
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { message: "Product ID is required" },
                { status: 400 }
            );
        }

        const formData = await req.formData();
        const name = formData.get("name");
        const description = formData.get("description");
        const categoryId = formData.get("category");
        const originalPrice = Number(formData.get("originalPrice"));
        const price = formData.get("price")
            ? Number(formData.get("price"))
            : null;
        const discount = formData.get("discount")
            ? Number(formData.get("discount"))
            : null;
        const inStock = formData.get("inStock") === "false" ? false : true;
        const image = formData.get("image");

        if (!name || !categoryId || !originalPrice) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        let imageUrl = null;
        if (image instanceof File) {
            const arrayBuffer = await image.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64Image = `data:${image.type};base64,${buffer.toString(
                "base64"
            )}`;

            const uploadRes = await cloudinary.uploader.upload(base64Image, {
                folder: "products",
            });
            imageUrl = uploadRes.secure_url;
        } else if (typeof image === "string" && image) {
            imageUrl = image;
        }

        const client = await clientPromise;
        const db = client.db("toysquad");

        // Fetch category document
        const categoryDoc = await db
            .collection("categories")
            .findOne({ _id: new ObjectId(categoryId) });
        if (!categoryDoc) {
            return NextResponse.json(
                { message: "Invalid category" },
                { status: 400 }
            );
        }

        const updateResult = await db.collection("products").findOneAndUpdate(
            { _id: new ObjectId(id) },
            {
                $set: {
                    name,
                    description,
                    category: categoryDoc._id,
                    originalPrice,
                    price,
                    discount,
                    inStock,
                    ...(imageUrl && { image: imageUrl }),
                    updatedAt: new Date(),
                },
            },
            { returnDocument: "after" }
        );

        if (!updateResult) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            _id: updateResult._id,
            name: updateResult.name,
            description: updateResult.description,
            category: { _id: categoryDoc._id, name: categoryDoc.name },
            originalPrice: updateResult.originalPrice,
            price: updateResult.price,
            discount: updateResult.discount,
            inStock: updateResult.inStock,
            image: updateResult.image,
            isBlocked: updateResult.isBlocked,
            createdAt: updateResult.createdAt
        });
    } catch (error) {
        console.error("Update product error:", error);
        return NextResponse.json(
            { message: "Failed to update product" },
            { status: 500 }
        );
    }
}

export async function PATCH(req, { params }) {
    try {
        const client = await clientPromise;
        const db = client.db("toysquad");

        const { id } = await params;
        const body = await req.json();

        if (typeof body.isBlocked !== "boolean") {
            return NextResponse.json(
                { error: "isBlocked must be a boolean" },
                { status: 400 }
            );
        }

        const updated = await db
            .collection("products")
            .findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: { isBlocked: body.isBlocked } },
                { returnDocument: "after" }
            );

        if (!updated) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: `Product ${
                body.isBlocked ? "blocked" : "unblocked"
            } successfully`,
            data: updated,
        });
    } catch (error) {
        console.error("Error updating product status:", error);
        return NextResponse.json(
            { error: "Failed to update product status" },
            { status: 500 }
        );
    }
}

export async function DELETE(_, { params }) {
    await connectDB();
    await Product.findByIdAndDelete((await params).id);
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}
