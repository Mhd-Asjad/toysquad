"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa6";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Battery, Zap, Gauge, Radio, Shield, CircleCheckBigIcon } from "lucide-react";
import Image from "next/image";
import { PacmanLoader } from "react-spinners";

export default function ProductDetailPage() {
    const params = useParams();
    const { id } = params;
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        async function fetchProduct() {
            const res = await fetch(`/api/products/${id}`);
            const data = await res.json();
            setProduct(data);
        }
        fetchProduct();
    }, [id]);

    if (!product) return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <PacmanLoader color="#4F46E5" size={40} />
            <p className="text-gray-600 mt-6 font-medium text-lg">Loading product details...</p>
        </div>
    );

    const generateWhatsAppMessage = () => {
        const message = `Hello! I'm interested in ordering ${quantity}x ${product.name} (₹${product.price?.toLocaleString('en-IN')} each). Total: ₹${(product.price * quantity).toLocaleString('en-IN')}`;
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/6282022424?text=${encodedMessage}`;
    };

    const images = [product.image, product.image, product.image]; // Replace with actual multiple images

    return (
        <div className="min-h-screen bg-white pt-20 lg:pt-28">
            {/* Header Navigation */}
            <div className="border-b border-gray-200 bg-white ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link href="/products">
                        <motion.button
                            whileHover={{ x: -4 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Products
                        </motion.button>
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column - Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden"
                        >
                            <Image
                                src={`/${images[selectedImage]}` || "/images/placeholder.jpg"}
                                alt={product.name}
                                fill
                                className="object-contain p-8"
                                priority
                            />
                            
                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {product.discount > 0 && (
                                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        -{product.discount}% OFF
                                    </span>
                                )}
                                {product.isNew && (
                                    <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        NEW
                                    </span>
                                )}
                            </div>
                        </motion.div>

                        {/* Thumbnail Images */}
                        <div className="grid grid-cols-3 gap-3">
                            {images.map((img, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setSelectedImage(index)}
                                    className={`aspect-square bg-gray-50 rounded-xl overflow-hidden border-2 transition-all ${
                                        selectedImage === index 
                                            ? "border-indigo-600" 
                                            : "border-transparent hover:border-gray-300"
                                    }`}
                                >
                                    <Image
                                        src={`/${img}`}
                                        alt={`${product.name} view ${index + 1}`}
                                        width={200}
                                        height={200}
                                        className="object-contain p-4"
                                    />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Product Info */}
                    <div className="space-y-6">
                        {/* Product Title */}
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                {product.name}
                            </h1>
                            {!product.inStock && (
                                <span className="inline-block text-sm text-red-600 font-medium">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
                            <span className="text-4xl font-bold text-gray-900">
                                ₹{product.price?.toLocaleString("en-IN")}
                            </span>
                            {product.originalPrice > product.price && (
                                <span className="text-xl text-gray-400 line-through">
                                    ₹{product.originalPrice?.toLocaleString("en-IN")}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Key Features */}
                        {product.features?.length > 0 && (
                            <div className="py-6 border-y border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                                <ul className="space-y-3">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0"></div>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Quantity Selector */}
                        <div>
                            <label className="block text-sm text-center font-medium text-gray-900 mb-3">
                                QUANTITY:
                            </label>
                            <div className="flex items-center justify-center gap-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-xl text-gray-600">−</span>
                                </button>
                                <span className="w-12 text-center text-lg font-medium text-gray-900">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-xl text-gray-600">+</span>
                                </button>
                            </div>
                        </div>

                        {/* WhatsApp Order Button */}
                        <Link href={generateWhatsAppMessage()} target="_blank">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={!product.inStock}
                                className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all ${
                                    product.inStock
                                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                            >
                                <FaWhatsapp className="w-6 h-6" />
                                {product.inStock ? "Order via WhatsApp" : "Out of Stock"}
                            </motion.button>
                        </Link>

                        {/* Stock Status */}
                        {product.inStock && (
                            <p className="text-sm text-gray-600 flex items-center gap-2 mt-2">
                                <CircleCheckBigIcon className="text-green-600" size={18} />
                                In Stock 
                            </p>
                        )}
                    </div>
                </div>

                {/* Technical Specifications Section */}
                <div className="mt-16">
                    {/* <h2 className="text-2xl font-bold text-gray-900 mb-8">Specifications</h2> */}
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Power System */}
                        {/* <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <Battery className="w-5 h-5 text-indigo-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900">Power System</h3>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Battery Type:</span>
                                    <span className="font-medium text-gray-900">LiPo</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Motor:</span>
                                    <span className="font-medium text-gray-900">Brushless</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">ESC:</span>
                                    <span className="font-medium text-gray-900">Waterproof</span>
                                </div>
                            </div>
                        </div> */}

                        {/* Performance */}
                        {/* <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <Gauge className="w-5 h-5 text-indigo-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900">Performance</h3>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Max Speed:</span>
                                    <span className="font-medium text-gray-900">45 km/h</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Range:</span>
                                    <span className="font-medium text-gray-900">100m</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Runtime:</span>
                                    <span className="font-medium text-gray-900">20-25 mins</span>
                                </div>
                            </div>
                        </div> */}

                        {/* Build Quality */}
                        {/* <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-indigo-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900">Build Quality</h3>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Material:</span>
                                    <span className="font-medium text-gray-900">ABS Plastic</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Durability:</span>
                                    <span className="font-medium text-gray-900">Impact Resistant</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Finish:</span>
                                    <span className="font-medium text-gray-900">Premium Paint</span>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>


            </div>
        </div>
    );
}