"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa6";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Battery, CheckCircle, Heart, Star, Shield, Truck, Clock, Award } from "lucide-react";
import Image from "next/image";
import { PacmanLoader } from "react-spinners";

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
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <PacmanLoader color="#60A5FA" size={40} />
            <p className="text-slate-600 mt-6 font-bold text-2xl">Loading product details...</p>
        </div>
    );

    // WhatsApp message generator
    const generateWhatsAppMessage = () => {
        const message = `Hello! I'm interested in purchasing the ${product.name} (₹${product.price?.toLocaleString('en-IN')}).`;
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/6282022424?text=${encodedMessage}`;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                duration: 0.6
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 pt-20 lg:pt-28"
            >
                {/* Enhanced Back Button */}
                <motion.div 
                    variants={itemVariants}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
                >
                    <Link href="/products">
                        <motion.button
                            whileHover={{ x: -8, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center gap-3 text-blue-700 hover:text-blue-600 font-semibold transition-all duration-300 backdrop-blur-sm border border-blue-600 rounded-full px-6 py-3 hover:bg-black/10"
                        >
                            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                            Back to Products
                        </motion.button>
                    </Link>
                </motion.div>

                <motion.div 
                    variants={itemVariants}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
                >
                    <div className="bg-white rounded-3xl shadow-2xl border overflow-hidden">
                        <div className="grid lg:grid-cols-2 gap-0">
                            {/* Enhanced Product Images Section */}
                            <motion.div 
                                variants={itemVariants}
                                className="relative p-8 lg:p-12 bg-gradient-to-br from-black/5 to-transparent"
                            >
                                {/* Main Image with Enhanced Styling */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="aspect-square relative bg-gradient-to-br from-black/20 via-blue-500/20 to-purple-500/20 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm border border-black/30"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-transparent"></div>
                                    <Image
                                        src={`/${product.image}` || "/images/placeholder.jpg"}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-12 relative z-10"
                                        priority
                                    />

                                    {/* Enhanced Badges */}
                                    <div className="absolute top-6 left-6 flex flex-col gap-3 z-20">
                                        {product.discount > 0 && (
                                            <motion.span
                                                initial={{ scale: 0, rotate: -15 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                whileHover={{ scale: 1.1 }}
                                                className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 text-black text-sm font-bold px-4 py-2 rounded-2xl shadow-xl backdrop-blur-sm border border-black/30"
                                            >
                                                -{product.discount}% OFF
                                            </motion.span>
                                        )}
                                        {!product.inStock && (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="bg-gradient-to-r from-gray-700 to-gray-800 text-white text-sm font-bold px-4 py-2 rounded-2xl shadow-xl backdrop-blur-sm border border-black/30"
                                            >
                                                OUT OF STOCK
                                            </motion.span>
                                        )}
                                        {product.isNew && (
                                            <motion.span
                                                initial={{ scale: 0, rotate: 15 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                whileHover={{ scale: 1.1 }}
                                                className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-black text-sm font-bold px-4 py-2 rounded-2xl shadow-xl backdrop-blur-sm border border-black/30"
                                            >
                                                NEW ARRIVAL
                                            </motion.span>
                                        )}
                                    </div>

                                    {/* Heart Icon */}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="absolute top-6 right-6 p-3 bg-black/20 backdrop-blur-sm rounded-full border border-black/30 text-black/80 hover:text-red-400 transition-colors z-20"
                                    >
                                        <Heart className="w-5 h-5" />
                                    </motion.button>
                                </motion.div>

                                {/* Enhanced Thumbnail Grid */}
                                <div className="grid grid-cols-3 gap-4 mt-8">
                                    {[1, 2, 3].map((item) => (
                                        <motion.div
                                            key={item}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: item * 0.1 + 0.5 }}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            className="aspect-square bg-black/10 backdrop-blur-sm rounded-2xl border border-black/20 cursor-pointer hover:bg-black/20 transition-all duration-300 shadow-lg"
                                        >
                                            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Enhanced Product Info Section */}
                            <motion.div 
                                variants={itemVariants}
                                className="p-8 lg:p-12 space-y-8"
                            >
                                {/* Product Title */}
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-4xl lg:text-5xl font-bold bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight"
                                >
                                    {product.name}
                                </motion.h1>

                                

                                {/* Enhanced Price Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="space-y-2"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-4xl lg:text-5xl font-bold text-black">
                                            ₹{product.price?.toLocaleString("en-IN")}
                                        </span>
                                        {product.originalPrice > product.price && (
                                            <span className="text-xl text-black/50 line-through">
                                                ₹{product.originalPrice?.toLocaleString("en-IN")}
                                            </span>
                                        )}
                                    </div>
                                    {product.discount > 0 && (
                                        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4">
                                            <span className="text-green-400 font-bold text-lg">
                                                💰 You save ₹{(product.originalPrice - product.price)?.toLocaleString("en-IN")}
                                            </span>
                                        </div>
                                    )}
                                </motion.div>

                                {/* Enhanced Description */}
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="text-black/80 leading-relaxed text-lg"
                                >
                                    {product.description}
                                </motion.p>

                                {/* Enhanced Features */}
                                {product.features?.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                        className="space-y-4"
                                    >
                                        <h3 className="text-xl font-bold text-black">✨ Key Features</h3>
                                        <div className="grid gap-3">
                                            {product.features.map((feature, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 + 0.8 }}
                                                    whileHover={{ x: 5 }}
                                                    className="flex items-center gap-4 p-4 bg-black/5 backdrop-blur-sm rounded-xl border border-black/10 hover:bg-black/10 transition-all duration-300"
                                                >
                                                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                                                    <span className="text-black/90 font-medium">{feature}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Enhanced Stock Status */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                    className={`p-6 rounded-2xl backdrop-blur-sm border ${
                                        product.inStock 
                                            ? "bg-green-500/10 border-green-500/30" 
                                            : "bg-red-500/10 border-red-500/30"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {product.inStock ? (
                                            <>
                                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                                <p className="font-bold text-green-400 text-lg">
                                                    ✅ In Stock - Ready to Ship
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                                <p className="font-bold text-red-400 text-lg">
                                                    ❌ Out of Stock - Backorder Available
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    {product.inStock && (
                                        <p className="text-green-300/80 mt-2 flex items-center gap-2">
                                            <Truck className="w-4 h-4" />
                                            Usually ships within 24 hours
                                        </p>
                                    )}
                                </motion.div>

                                {/* Enhanced Action Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.0 }}
                                    className="flex flex-col gap-4 pt-4"
                                >
                                    <Link href={generateWhatsAppMessage()} target="_blank">
                                        <motion.button
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full px-8 py-5 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 border border-green-400/30"
                                        >
                                            <FaWhatsapp className="w-6 h-6" />
                                            Order via WhatsApp
                                            <div className="ml-2 px-3 py-1 bg-black/20 rounded-full text-sm">
                                                Fast Response
                                            </div>
                                        </motion.button>
                                    </Link>

                                    {/* Trust Indicators */}
                                    <div className="grid grid-cols-3 gap-4 mt-4">
                                        <div className="flex items-center gap-2 text-black/70 text-sm">
                                            <Shield className="w-4 h-4 text-blue-400" />
                                            <span>Secure</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-black/70 text-sm">
                                            <Clock className="w-4 h-4 text-green-400" />
                                            <span>Fast Ship</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-black/70 text-sm">
                                            <Award className="w-4 h-4 text-purple-400" />
                                            <span>Quality</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Enhanced Technical Specs Section */}
                        <motion.div 
                            variants={itemVariants}
                            className="bg-black/5 backdrop-blur-sm border-t border-black/10 p-8 lg:p-12"
                        >
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1 }}
                                className="text-3xl font-bold text-black mb-8 flex items-center gap-3"
                            >
                                <Battery className="w-8 h-8 text-blue-400" />
                                Technical Specifications
                            </motion.h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Enhanced Spec Boxes */}
                                {[
                                    { icon: Battery, title: "Power System", specs: [
                                        { label: "Battery Type", value: "LiPo" },
                                        { label: "Motor", value: "Brushless" },
                                        { label: "ESC", value: "Waterproof" }
                                    ]},
                                    { icon: Shield, title: "Build Quality", specs: [
                                        { label: "Material", value: "High-grade ABS" },
                                        { label: "Durability", value: "Impact Resistant" },
                                        { label: "Finish", value: "Premium Paint" }
                                    ]},
                                    { icon: Award, title: "Performance", specs: [
                                        { label: "Max Speed", value: "45 km/h" },
                                        { label: "Range", value: "100m" },
                                        { label: "Runtime", value: "20-25 mins" }
                                    ]}
                                ].map((spec, index) => (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 + 1.2 }}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="bg-black/10 backdrop-blur-sm rounded-2xl p-6 border border-black/20 hover:bg-black/15 transition-all duration-300 shadow-xl"
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-400/30">
                                                <spec.icon className="w-6 h-6 text-blue-400" />
                                            </div>
                                            <h3 className="font-bold text-black text-lg">{spec.title}</h3>
                                        </div>
                                        <div className="space-y-3">
                                            {spec.specs.map((item, i) => (
                                                <div key={i} className="flex justify-between items-center">
                                                    <span className="text-black/70 text-sm font-medium">{item.label}:</span>
                                                    <span className="text-black font-semibold">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}