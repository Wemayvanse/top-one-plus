'use client';
import { motion, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Home() {
 const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

 const benefitVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

   if (!mounted) {
    return (
      <main className="min-h-screen overflow-x-hidden relative bg-green-50 text-gray-900">
        {/* Simple loading state */}
      </main>
    );
  }

  const currentTheme = resolvedTheme || 'light';


  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`min-h-screen overflow-x-hidden relative ${
          currentTheme === "dark" 
          ? "bg-dark-900 text-gray-100" 
          : "bg-green-50 text-gray-900"
      }`}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className={`absolute inset-0 ${
          currentTheme === "dark" 
              ? "bg-gradient-to-b from-dark-800/30 to-dark-900" 
              : "bg-gradient-to-b from-green-100/30 to-green-50"
          }`} />
        </div>

        <motion.div 
          className="container mx-auto px-4 sm:px-6 py-16 md:py-20 lg:py-24 text-center"
          variants={containerVariants}
        >
          <motion.h1
            variants={itemVariants}
            className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight ${
              currentTheme === "dark"  ? "text-green-400" : "text-green-800"
            }`}
          >
            Boost Crop Yields by{" "}
            <motion.span 
              className={currentTheme === "dark"  ? "text-green-300" : "text-green-600"}
              whileHover={{ scale: 1.05 }}
            >
              100%
            </motion.span>{" "}
            Naturally 🌱
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className={`text-lg sm:text-xl md:text-2xl mb-8 md:mb-10 max-w-3xl mx-auto ${
              currentTheme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Top One Plus Organic Fertilizer enhances plant growth with seaweed extract.
          </motion.p>

          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 sm:px-10 sm:py-4 rounded-xl font-bold shadow-lg transition-all text-lg ${
               currentTheme === "dark" 
                  ? "bg-green-700 hover:bg-green-600 text-white shadow-green-900/30"
                  : "bg-green-600 hover:bg-green-700 text-white shadow-green-800/30"
              }`}
            >
              Order Now →
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className={`relative py-16 md:py-20 ${
          currentTheme === "dark" ? "bg-dark-800" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 ${
             currentTheme === "dark"  ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Why Farmers Love Top One Plus
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: "🌿",
                title: "Stronger Roots",
                desc: "Improves nutrient absorption and root development",
                color: currentTheme === "dark" ? "text-green-400" : "text-green-600"
              },
              {
                icon: "🛡️",
                title: "Disease Resistance",
                desc: "Protects against pests, diseases & drought conditions",
                color: currentTheme === "dark" ? "text-blue-400" : "text-blue-600"
              },
              {
                icon: "📈",
                title: "Higher Yields",
                desc: "Increases harvest quantity by up to 100%",
                color: currentTheme === "dark" ? "text-amber-400" : "text-amber-600"
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={benefitVariants}
                whileHover={{ y: -5 }}
                className={`p-6 sm:p-8 rounded-2xl shadow-lg transition-all ${
                 currentTheme === "dark" 
                    ? "bg-dark-700 hover:bg-dark-600"
                    : "bg-white hover:bg-green-50"
                }`}
              >
                <motion.span 
                  className={`text-5xl mb-4 block ${item.color}`}
                  whileHover={{ scale: 1.1 }}
                >
                  {item.icon}
                </motion.span>
                <h3 className={`text-xl sm:text-2xl font-bold mb-3 ${
                  currentTheme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}>
                  {item.title}
                </h3>
                <p className={`text-md ${
                  currentTheme === "dark"  ? "text-gray-300" : "text-gray-600"
                }`}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={`py-16 md:py-20 ${
         currentTheme === "dark"  ? "bg-dark-700" : "bg-green-100"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`text-3xl sm:text-4xl font-bold text-center mb-12 ${
              currentTheme === "dark" ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Farmer Testimonials
          </motion.h2>
          
          {/* Testimonial cards would go here */}
        </div>
      </motion.section>
    </motion.main>
  );
}