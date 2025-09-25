import { NextResponse } from "next/server";
import clientPromise from "@/libs/mongodb";
import cloudinary from "@/libs/cloudinary";
import { ObjectId } from "mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("toysquad");

        const products = await db
            .collection("products")
            .aggregate([
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "categoryData",
                    },
                },
                {
                    $unwind: {
                        path: "$categoryData",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        name: 1,
                        description: 1,
                        price: 1,
                        originalPrice: 1,
                        discount: 1,
                        image: 1,
                        inStock: 1,
                        isBlocked: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        category: {
                            _id: "$categoryData._id",
                            name: "$categoryData.name",
                        },
                    },
                },
            ])
            .toArray();

        return NextResponse.json(products);
    } catch (error) {
        console.error("Get products error:", error);
        return NextResponse.json(
            { message: "Failed to fetch products" },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const formData = await req.formData();

        const name = formData.get("name");
        const description = formData.get("description");
        const categoryId = formData.get("category");

        const originalPrice = formData.get("originalPrice");
        const price = formData.get("price");
        const discount = formData.get("discount");
        const inStock = formData.get("inStock") === "true";

        const image = formData.get("image");

        // 🔹 Required validation
        if (!name || !description || !categoryId || !originalPrice) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        let imageUrl;

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

        const categoryDoc = await db
            .collection("categories")
            .findOne({ _id: new ObjectId(categoryId) });

        if (!categoryDoc) {
            return NextResponse.json(
                { message: "Invalid category" },
                { status: 400 }
            );
        }

        const result = await db.collection("products").insertOne({
            name,
            description,
            category: new ObjectId(categoryDoc._id), 
            image: imageUrl,
            originalPrice: Number(originalPrice),
            price: price ? Number(price) : null,
            discount: discount ? Number(discount) : null,
            inStock,
            isBlocked: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return NextResponse.json({
            _id: result.insertedId,
            name,
            description,
            category: { _id: categoryDoc._id, name: categoryDoc.name },
            image: imageUrl,
            originalPrice: Number(originalPrice),
            price: price ? Number(price) : null,
            discount: discount ? Number(discount) : null,
            inStock,
            isBlocked: false,
            createdAt: new Date(),
        });
    } catch (error) {
        console.error("Add product error:", error);
        return NextResponse.json(
            { message: "Failed to add product" },
            { status: 500 }
        );
    }
}
