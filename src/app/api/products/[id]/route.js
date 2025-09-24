import React from 'react'
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/config/mongodb";

export async function GET(req, { params }) {
    await connectDB()
    try {

        const product = await Product.findById(params.id);
        if (product) {

            return NextResponse.json(product, { status: 200 });
        } return NextResponse.json({ message: 'product not found' })

    } catch (err) {
        console.log(err, 'error while Get particular prod')
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });

    }
}

export async function PUT(req, { params }) {
    await connectDB()
    const body = await req.json();
    const product = await Product.findByIdAndUpdate(params.id, body, { new: true })
    return NextResponse.json(product, { status: 200 });

}

export async function DELETE(req, { params }) {
    await connectDB()
    await Product.findByIdAndDelete(params.id)
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}