import mongoose  from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number },
        originalPrice: { type: Number, required: true },
        discount: { type: Number },
        image: { type: String, default: "image.png" },
        features: [{ type: String }],
        inStock: { type: Boolean, default: true },
        category: {type: mongoose.Schema.ObjectId, ref:"Category"}
    },
    {timestamps:true}
)
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);