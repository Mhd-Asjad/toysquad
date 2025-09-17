// app/products/page.js
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Filter,
    Grid3X3,
    List,
    ArrowUpDown,
    X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ProductCard from "../components/ProductCard";
import { categories, productsData, sortOptions, priceRanges } from "@/app/data/index";

const ProductsPage = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedPriceRange, setSelectedPriceRange] = useState("all");
    const [sortBy, setSortBy] = useState("name");
    const [viewMode, setViewMode] = useState("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Initialize products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true)
                setError(true);

                const res = await fetch("/api/products");

                if (!res.ok) {
                    throw new Error(`Failed to fetch products : ${res.status} `)
                }
                const productData = await res.json()

                console.log("this is the product data " , productData)

                if (!Array.isArray(productData)) {
                    throw new Error("Invalid data format recieved from api")
                }
                else {
                    console.log("The product data is array")
                }
                setProducts(productData)
                setFilteredProducts(productData)
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(err.message);
            } finally {
                setIsLoading(false)
            }
        }

        fetchProducts();
    }, []);

    // Filter and sort products
    useEffect(() => {`1`
        let filtered = [...products];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(
                (product) =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (selectedCategory !== "all") {
            filtered = filtered.filter(
                (product) => product.category === selectedCategory
            );
        }

        // Price filter
        if (selectedPriceRange !== "all") {
            const [min, max] = selectedPriceRange.split("-").map(Number);
            filtered = filtered.filter((product) => {
                if (selectedPriceRange === "75+") return product.price >= 75;
                return product.price >= min && product.price <= max;
            });
        }

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "price-low":
                    return a.price - b.price;
                case "price-high":
                    return b.price - a.price;
                case "rating":
                    return b.rating - a.rating;
                case "newest":
                    return new Date(b.createdAt) - new Date(a.createdAt);
                default:
                    return 0;
            }
        });

        setFilteredProducts(filtered);
    }, [products, searchTerm, selectedCategory, selectedPriceRange, sortBy]);

    const handleProductClick = (productId) => {
        router.push(`/products/${productId}`);
    };

    // Function to clear all filters
    const clearAllFilters = () => {
        setSearchTerm("");
        setSelectedCategory("all");
        setSelectedPriceRange("all");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 pt-20 lg:pt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                            Our Products
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our premium collection of high-performance RC cars for enthusiasts of all ages
                    </p>
                </motion.div>

                {/* Filters and Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg "
                >
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 items-start sm:items-center">
                        {/* Search Bar */}
                        <div className="flex-1 min-w-[200px]">
                            <Search className="absolute left-8 top-12 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search RC cars..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-orange-200/50 bg-white/80 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all text-black placeholder:text-black/50"
                            />
                        </div>

                        {/* Filter + Sort + View */}
                        <div className="flex flex-wrap gap-2 sm:gap-4 items-center w-full sm:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${showFilters
                                    ? "bg-orange-500 text-white shadow-lg"
                                    : "bg-white/80 text-gray-700 hover:bg-white"
                                    }`}
                            >
                                <Filter className="w-5 h-5" />
                                <span>Filters</span>
                            </motion.button>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 rounded-xl border border-orange-200/50 bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-orange-300 font-medium"
                            >
                                {sortOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <div className="flex bg-white/80 rounded-xl p-1 border border-orange-200/50">
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-lg transition-all ${viewMode === "grid"
                                        ? "bg-orange-500 text-white"
                                        : "text-gray-600"
                                        }`}
                                >
                                    <Grid3X3 className="w-5 h-5" />
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-lg transition-all ${viewMode === "list"
                                        ? "bg-orange-500 text-white"
                                        : "text-gray-600"
                                        }`}
                                >
                                    <List className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </div>
                    </div>


                    {/* Expandable Filters */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-6 pt-6 border-t border-orange-200/50"
                            >
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Category Filter */}
                                    <div>
                                        <h3 className="font-semibold text-gray-700 mb-3">
                                            Categories
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {categories.map((category) => {
                                                const IconComponent = category.icon;
                                                return (
                                                    <motion.button
                                                        key={category.value}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => setSelectedCategory(category.value)}
                                                        className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category.value
                                                            ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                                                            : "bg-white/60 text-gray-700 hover:bg-white"
                                                            }`}
                                                    >
                                                        <IconComponent className="w-4 h-4" />
                                                        <span>{category.label}</span>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Price Filter */}
                                    <div>
                                        <h3 className="font-semibold text-gray-700 mb-3">
                                            Price Range
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {priceRanges.map((range) => (
                                                <motion.button
                                                    key={range.value}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setSelectedPriceRange(range.value)}
                                                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${selectedPriceRange === range.value
                                                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                                                        : "bg-white/60 text-gray-700 hover:bg-white"
                                                        }`}
                                                >
                                                    {range.label}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Results Count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                >
                    <p className="text-gray-600">
                        Showing{" "}
                        <span className="font-semibold text-orange-600">
                            {filteredProducts.length}
                        </span>{" "}
                        of <span className="font-semibold">{products.length}</span> products
                    </p>
                </motion.div>

                {/* Product Grid/List */}
                <ProductCard
                    filteredProducts={filteredProducts}
                    viewMode={viewMode}
                    onProductClick={handleProductClick}
                    clearAllFilters={clearAllFilters}
                    searchTerm={searchTerm}
                    selectedCategory={selectedCategory}
                    selectedPriceRange={selectedPriceRange}
                />
            </div>
        </div>
    );
};

export default ProductsPage;