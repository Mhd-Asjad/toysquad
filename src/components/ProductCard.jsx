// components/ProductCard.jsx
"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";
import Image from "next/image";

const ProductCard = ({
  filteredProducts,
  viewMode,
  onProductClick,
  clearAllFilters,
  searchTerm,
  selectedCategory,
  selectedPriceRange,
}) => {
  
  return (
    <div>
      {/* Grid / List Wrapper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            : "space-y-6"
        }
      >
        <AnimatePresence>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product._id || product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer group ${
                viewMode === "list" ? "flex items-center p-6 gap-6" : "p-6"
              }`}
              onClick={() => onProductClick(product._id || product.id)}
              whileHover={{ y: -5 }}
            >
              {/* Image Section */}
              <div
                className={`relative ${
                  viewMode === "list"
                    ? "w-32 h-32 flex-shrink-0"
                    : "aspect-square mb-4"
                } rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-pink-100`}
              >
                <Image
                  src={`${product.image}` || "/logo.png"}
                  alt={product.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.discount > 0 && (
                    <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
                      -{product.discount}%
                    </span>
                  )}
                  {!product.inStock && (
                    <span className="bg-gray-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
                      OUT OF STOCK
                    </span>
                  )}
                </div>

                {/* Quick Action */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-blue-100"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Eye className="w-5 h-5 text-blue-600" />
                  </motion.button>
                </div>
              </div>

              {/* Info Section */}
              <div className={viewMode === "list" ? "flex-1" : ""}>
                {/* Category */}
                {product.category && (
                  <span className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full mb-2">
                    {product.category.name}
                  </span>
                )}

                {/* Product Name */}
                <h3
                  className={`font-bold text-gray-800 leading-snug group-hover:text-blue-600 transition-colors ${
                    viewMode === "list" ? "text-lg" : "text-base"
                  }`}
                >
                  {product.name}
                </h3>

                {/* Description */}
                {product.description && (
                  <p className="text-sm text-gray-500 mt-1 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                )}

                {/* Price */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl font-extrabold text-blue-600">
                    ₹{product.price?.toLocaleString("en-IN")}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.originalPrice?.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                {/* Stock */}
                <p
                  className={`text-sm font-medium ${
                    product.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🚙</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your filters or search terms
          </p>

          {(searchTerm ||
            selectedCategory !== "all" ||
            selectedPriceRange !== "all") && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearAllFilters}
              className="bg-gradient-to-r from-blue-600 to-pink-500 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg"
            >
              Clear All Filters
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ProductCard;
