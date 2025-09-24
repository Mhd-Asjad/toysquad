import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name: {type:String, required:true, unique:true},
        isBlocked: {type:Boolean, default:false},
    },
    {
        timestamps:true
    }
)

export default mongoose.models.Category || mongoose.model("Category",CategorySchema) 