"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { socialLinks, footerSections } from "../data";
import { Mail, Star, MapPin, Phone, Sparkles, Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
    // Handle newsletter subscription logic here
  };

  return (
    <footer className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className={`absolute w-4 h-4 rounded-full opacity-10 ${
              i % 4 === 0
                ? "bg-orange-400"
                : i % 4 === 1
                ? "bg-pink-400"
                : i % 4 === 2
                ? "bg-yellow-400"
                : "bg-purple-400"
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Features Section */}
      <div className="relative z-10 border-b border-orange-200/30"></div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-3"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">TS</span>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1"
                >
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </motion.div>
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  ToySquad
                </h3>
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </motion.div>

            <p className="text-gray-600 leading-relaxed">
              Creating magical moments and inspiring young minds through
              carefully curated toys that educate, entertain, and bring families
              together.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 text-gray-600 hover:text-orange-600 transition-colors cursor-pointer"
              >
                <MapPin className="w-5 h-5" />
                <span>123 Toy Street, Playtown, PT 12345</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 text-gray-600 hover:text-orange-600 transition-colors cursor-pointer"
              >
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-TOYS</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 text-gray-600 hover:text-orange-600 transition-colors cursor-pointer"
              >
                <Mail className="w-5 h-5" />
                <span>hello@toysquad.com</span>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 bg-white/70 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-gray-600 ${social.color} ${social.bg}`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, sectionIndex) => (
            <div key={section.title} className="space-y-4">
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="font-bold text-gray-800 text-lg"
              >
                {section.title}
              </motion.h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: sectionIndex * 0.1 + linkIndex * 0.05,
                    }}
                  >
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 5, color: "#ea580c" }}
                      className="text-gray-600 hover:text-orange-600 transition-all duration-200 flex items-center space-x-1"
                    >
                      <span>{link.name}</span>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1, x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sparkles className="w-3 h-3" />
                      </motion.div>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-orange-200/30 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-600"
            >
              <span>© 2025 ToySquad. All rights reserved.</span>
              <div className="flex items-center space-x-4">
                <span>Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </motion.div>
                <span>for amazing kids</span>
              </div>
            </motion.div>

            {/* <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>We accept:</span>
              <div className="flex space-x-2">
                {["VISA", "MC", "AMEX", "PayPal"].map((payment, index) => (
                  <motion.div
                    key={payment}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="px-2 py-1 bg-white/80 rounded text-xs font-semibold text-gray-700 shadow-sm"
                  >
                    {payment}
                  </motion.div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </footer>
  );
};

export default Footer;
