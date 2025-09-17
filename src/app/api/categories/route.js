import { NextResponse } from "next/server";
import Category from "@/app/models/Category";
import { connectDB } from "@/app/config/mongodb";

export async function GET(){
    await connectDB()
    const categories = await Category.find({});
    return NextResponse.json(categories,{status:200})
}

export async function POST(req){
    try {

        await connectDB();
        const body = await req.json();
        console.log('this is the request :',body)
        const category = await Category.create(body)
        return NextResponse.json(category,{status:201})

    }catch(err){

        console.error(err)
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}