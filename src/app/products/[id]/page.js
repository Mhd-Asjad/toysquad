"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa6";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Battery, CheckCircle, Heart, Star } from "lucide-react";
import Image from "next/image";

export default function ProductDetailPage() {
    const params = useParams();
    const { id } = params;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            const res = await fetch(`/api/products/${id}`);
            const data = await res.json();
            setProduct(data);
        }
        fetchProduct();
    }, [id]);

    if (!product) return (
        <div className="flex items-center justify-center h-screen">
            <h1>Loading...</h1>

        </div>
    );

    // WhatsApp message generator
    const generateWhatsAppMessage = () => {
        const message = `Hello! I'm interested in purchasing the ${product.name} (₹${product.price?.toLocaleString('en-IN')}).`;
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/6282022424?text=${encodedMessage}`;
    };

    // // Features list with icons
    // const featureIcons = {
    //     '8S Power System': <Battery className="w-5 h-5 text-blue-600" />,
    //     'Waterproof Electronics': <Shield className="w-5 h-5 text-blue-600" />,
    //     'TSM Stability Management': <Gauge className="w-5 h-5 text-blue-600" />,
    //     'LED Light Kit': <Zap className="w-5 h-5 text-blue-600" />,
    //     '6S Ready': <Battery className="w-5 h-5 text-blue-600" />,
    //     'Aluminum Chassis': <Scale className="w-5 h-5 text-blue-600" />,
    //     'Differential Gears': <Gauge className="w-5 h-5 text-blue-600" />,
    //     'Big Bore Shocks': <Zap className="w-5 h-5 text-blue-600" />,
    //     'Portal Axles': <Scale className="w-5 h-5 text-blue-600" />,
    //     '2-Speed Transmission': <Gauge className="w-5 h-5 text-blue-600" />,
    //     'LED Lights': <Zap className="w-5 h-5 text-blue-600" />,
    //     'Waterproof': <Shield className="w-5 h-5 text-blue-600" />
    // };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 lg:pt-28"
        >
            {/* Back Button */}
            <motion.div custom={0} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <Link href="/products">
                    <motion.button
                        whileHover={{ x: -5, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Products
                    </motion.button>
                </Link>
            </motion.div>

            <motion.div custom={1} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-blue-100"
                >
                    <div className="grid md:grid-cols-2 gap-8 p-8">
                        {/* Product Images */}
                        <motion.div custom={2} className="space-y-6">
                            {/* Main Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                className="aspect-square relative bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl overflow-hidden"
                            >
                                <Image
                                    src={`/${product.image}` || "/images/placeholder.jpg"}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-8"
                                    priority
                                />

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {product.discount > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.4 }}
                                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm px-4 py-2 rounded-full font-semibold shadow-lg"
                                        >
                                            -{product.discount}% OFF
                                        </motion.span>
                                    )}
                                    {!product.inStock && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.4 }}
                                            className="bg-gray-600 text-white text-sm px-4 py-2 rounded-full font-semibold shadow-lg"
                                        >
                                            OUT OF STOCK
                                        </motion.span>
                                    )}
                                    {product.isNew && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.4 }}
                                            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm px-4 py-2 rounded-full font-semibold shadow-lg"
                                        >
                                            NEW ARRIVAL
                                        </motion.span>
                                    )}
                                </div>
                            </motion.div>

                            {/* Additional Images */}
                            <div className="grid grid-cols-3 gap-4">
                                {[1, 2, 3].map((item) => (
                                    <motion.div
                                        key={item}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: item * 0.1 }}
                                        className="aspect-square bg-blue-50 rounded-xl overflow-hidden cursor-pointer hover:bg-blue-100 transition-colors"
                                    >
                                        {/* <Image
                                            src={`/${product.image}` || "/images/placeholder.jpg"}
                                            alt={`${product.name} ${item}`}
                                            fill
                                            className="object-contain p-4"
                                        /> */}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Product Info */}
                        <motion.div custom={3} className="space-y-6">
                            {/* {product.category && (
                                <motion.span
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="inline-block bg-blue-100 text-blue-700 text-sm px-4 py-2 rounded-full font-medium mb-4"
                                >
                                    {product.category.name || product.category}
                                </motion.span>
                            )} */}

                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4"
                            >
                                {product.name}
                            </motion.h1>

                            {/* Rating */}
                            {/* <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center gap-3 mb-4"
                            >
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.rating || 4) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">({product.reviewCount || 12} reviews)</span>
                                <span className="text-sm text-green-600 font-medium">⭐ 4.8/5 Rating</span>
                            </motion.div> */}

                            {/* Price */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex items-center gap-4 mb-6"
                            >
                                <span className="text-3xl font-bold text-blue-700">
                                    ₹{product.price?.toLocaleString("en-IN")}
                                </span>
                                {product.originalPrice > product.price && (
                                    <span className="text-xl text-gray-500 line-through">
                                        ₹{product.originalPrice?.toLocaleString("en-IN")}
                                    </span>
                                )}
                                {product.discount > 0 && (
                                    <span className="text-green-600 font-semibold text-lg">
                                        You save ₹{(product.originalPrice - product.price)?.toLocaleString("en-IN")}
                                    </span>
                                )}
                            </motion.div>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-gray-700 mb-6 leading-relaxed text-lg"
                            >
                                {product.description}
                            </motion.p>

                            {/* Features */}
                            {product.features?.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="space-y-4"
                                >
                                    <h3 className="font-semibold text-gray-800 text-xl">Key Features:</h3>
                                    <div className="grid gap-3">
                                        {product.features.map((feature, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
                                            >
                                                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                                <span className="text-gray-700">{feature}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Stock Status */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className={`p-4 rounded-xl ${product.inStock ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                            >
                                <p className={`font-semibold ${product.inStock ? "text-green-700" : "text-red-700"}`}>
                                    {product.inStock ? "✅ In Stock - Ready to Ship" : "❌ Out of Stock - Backorder Available"}
                                </p>
                                {product.inStock && <p className="text-sm text-green-600 mt-1">Usually ships within 24 hours</p>}
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="flex flex-col sm:flex-row gap-4 pt-6"
                            >
                                <Link href={generateWhatsAppMessage()} target="_blank">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}

                                        className="px-6 py-4 border border-green-300 text-green-500 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
                                    >
                                        <FaWhatsapp className="w-5 h-5" color="" />
                                        Order this product
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Technical Specs Section */}
                    <motion.div custom={4} className="bg-blue-50/70 p-8 border-t border-blue-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Technical Specifications</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Example Spec Box */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <Battery className="w-6 h-6 text-blue-600" />
                                    <h3 className="font-semibold text-gray-800">Power System</h3>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600"><span className="font-medium">Battery Type:</span> LiPo</p>
                                    <p className="text-sm text-gray-600"><span className="font-medium">Motor:</span> Brushless</p>
                                    <p className="text-sm text-gray-600"><span className="font-medium">ESC:</span> Waterproof</p>
                                </div>
                            </motion.div>
                            {/* Repeat similar motion for other spec boxes */}
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
// export async function generateMetadata({ params }) {
//     const product = await getProduct(params.id);

//     if (!product) {
//         return {
//             title: 'Product Not Found | Toy Squad',
//         };
//     }

//     return {
//         title: `${product.name} | Toy Squad`,
//         description: product.description?.substring(0, 160) || 'High-quality RC car from Toy Squad',
//         openGraph: {
//             title: `${product.name} | Toy Squad`,
//             description: product.description?.substring(0, 160) || 'High-quality RC car from Toy Squad',
//             images: [product.image || '/logo.png'],
//         },
//     };
// }

// // Generate static paths for better SEO
// export async function generateStaticParams() {
//     await connectToDB();
//     const products = await Product.find({}).select('_id');

//     return products.map((product) => ({
//         id: product._id.toString(),
//     }));
// } 