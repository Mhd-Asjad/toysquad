import { connectDB } from "../../config/mongodb";
import Product from "../../models/Product";
import { NextResponse } from "next/server";

export async function GET(){
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json(products,{status:200})
}

export async function POST(req){
    await connectDB();
    const body = await req.json();
    console.log('this is the request :',body)
    const product = await Product.create(body)
    return NextResponse.json(product,{status:201})
}