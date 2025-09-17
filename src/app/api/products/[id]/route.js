import { NextResponse } from "next/server";
import Product from "@/app/models/Product";
import { connectDB } from "@/app/config/mongodb";

export async function GET(req ,{ params }) { 
    await connectDB()
    try{
        console.log(params)
        const product = await Product.findById(params.id);
        if (product){

            return NextResponse.json(product,{status:200});
        }return NextResponse.json({message:'product not found'})
        
    }catch(err){
        console.log(err,'eroor while Get particular prod')
    }
}

export async function PUT(req,{params}){
    await connectDB()
    const body = await req.json();
    const product = await Product.findByIdAndUpdate(params.id, body, {new:true})
    return NextResponse.json(product,{status:200});

}

export async function DELETE(req,{params}){
    await connectDB()
    await Product.findByIdAndDelete(params.id)
    return NextResponse.json({ message: "Product deleted" },{status:200});
}