import { v2 as cloudinary } from "cloudinary";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;

if (!CLOUDINARY_CLOUD_NAME) {
    throw new Error("Please add your cloud name");
}
if (!CLOUDINARY_API_KEY) {
    throw new Error("Please add your cloud api key");
}
if (!CLOUDINARY_API_SECRET) {
    throw new Error("Please add your cloud api secret");
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
