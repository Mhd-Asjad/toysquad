'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Search, 
  ShoppingCart, 
  Heart, 
  User,
  Star,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/categories' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Sale', href: '/sale', special: true },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-gradient-to-r from-amber-50/95 to-orange-50/95 backdrop-blur-md shadow-lg border-b border-orange-200/30' 
            : 'bg-gradient-to-r from-amber-50/90 to-orange-50/90'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo Section */}
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="relative w-10 h-10 lg:w-12 lg:h-12"
                >
                  <Image
                    src="/logo.png"
                    alt="ToySquad"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                  className="absolute -top-1 -right-1"
                >
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </motion.div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  ToySquad
                </h1>
                <motion.div 
                  className="h-0.5 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    item.special 
                      ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg hover:shadow-xl' 
                      : 'text-gray-700 hover:text-orange-600 hover:bg-white/50'
                  }`}
                >
                  {item.name}
                  {item.special && (
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                      className="absolute -top-1 -right-1"
                    >
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                    </motion.div>
                  )}
                  {!item.special && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-white/70 hover:bg-white text-gray-700 hover:text-orange-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Wishlist Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hidden sm:block p-2 rounded-full bg-white/70 hover:bg-white text-gray-700 hover:text-pink-600 transition-all duration-200 shadow-md hover:shadow-lg relative"
              >
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </motion.button>

              {/* Cart Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-white/70 hover:bg-white text-gray-700 hover:text-orange-600 transition-all duration-200 shadow-md hover:shadow-lg relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                  className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  2
                </motion.span>
              </motion.button>

              {/* User Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hidden sm:block p-2 rounded-full bg-white/70 hover:bg-white text-gray-700 hover:text-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <User className="w-5 h-5" />
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-full bg-white/70 hover:bg-white text-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-16 right-0 bottom-0 w-80 bg-gradient-to-b from-amber-50 to-orange-50 shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Mobile User Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center space-x-3 p-4 bg-white/50 rounded-2xl mb-6"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Welcome!</p>
                    <p className="text-sm text-gray-600">Sign in to continue</p>
                  </div>
                </motion.div>

                {/* Mobile Navigation Links */}
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      onClick={toggleMenu}
                      className={`block w-full p-4 rounded-2xl text-left font-medium transition-all duration-200 ${
                        item.special
                          ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-white/60 hover:text-orange-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        {item.name}
                        {item.special && <Sparkles className="w-5 h-5" />}
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Mobile Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 space-y-3"
                >
                  <button className="w-full flex items-center justify-between p-4 bg-white/60 rounded-2xl text-gray-700 hover:text-pink-600 transition-colors">
                    <span>Wishlist</span>
                    <div className="flex items-center space-x-2">
                      <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">3</span>
                      <Heart className="w-5 h-5" />
                    </div>
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-4 bg-white/60 rounded-2xl text-gray-700 hover:text-orange-600 transition-colors">
                    <span>Shopping Cart</span>
                    <div className="flex items-center space-x-2">
                      <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">2</span>
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;