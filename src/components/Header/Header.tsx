"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Navigation items
  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "Product",
      path: "/product",
      dropdown: [
        { name: "Seaweed Extract", path: "/product/seaweed" },
        { name: "Organic Formula", path: "/product/organic" },
        { name: "Crop Solutions", path: "/product/solutions" },
      ],
    },
    {
      name: "Application",
      path: "/application",
      dropdown: [
        { name: "Cocoa & Tree Crops", path: "/application/cocoa" },
        { name: "Vegetables", path: "/application/vegetables" },
        { name: "Cereals", path: "/application/cereals" },
      ],
    },
    { name: "Contact", path: "/contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    if (!isOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (openDropdown && !target.closest(".dropdown-container")) {
          setOpenDropdown(null);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [openDropdown, isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.classList.remove("menu-open");
    };
  }, [isOpen]);

  // Mounted effect to prevent SSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a simple header without theme classes during SSR
    return (
      <header className="sticky top-0 z-50 bg-white">
        <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6">
          <Link href="/" className="z-50">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-green-600">🌱</span>
              <span className="text-xl font-bold">Top One Plus</span>
            </div>
          </Link>
        </div>
      </header>
    );
  }

  // Use resolvedTheme which gives us the actual calculated theme (light/dark)
  const currentTheme = resolvedTheme || 'light';


  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 ${
        isScrolled
          ? "bg-white dark:bg-dark-800 shadow-md" // Scrolled state
          : "bg-white dark:bg-dark-800" // Default state
      } transition-all duration-300`}
      style={{ ["--header-height" as any]: "72px" }}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="z-50">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              🌱
            </span>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-200">
              Top One Plus
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-6 lg:gap-8 justify-center items-center">
            {navItems.map((item) => (
              <motion.li
                key={item.name}
                className="relative dropdown-container"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.name)}
                onMouseLeave={() => item.dropdown && setOpenDropdown(null)}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="flex items-center gap-1">
                  <Link
                    href={item.path}
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors px-2 py-1 rounded"
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <motion.span
                      animate={{ rotate: openDropdown === item.name ? 180 : 0 }}
                      className="text-xs"
                    >
                      ▼
                    </motion.span>
                  )}
                </div>

                {/* Desktop Dropdown Menu */}
                {item.dropdown && (
                  <AnimatePresence>
                    {openDropdown === item.name && (
                      <motion.ul
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-dark-700 rounded-lg shadow-lg py-2 z-50 border border-gray-100 dark:border-gray-700"
                      >
                        {item.dropdown.map((subItem) => (
                          <motion.li
                            key={subItem.name}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-4 py-2 hover:bg-green-50 dark:hover:bg-dark-600"
                          >
                            <Link
                              href={subItem.path}
                              className="block text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
                            >
                              {subItem.name}
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                )}
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Theme Toggle and Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-700 dark:text-gray-200 z-50 relative md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <motion.span
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                className="text-2xl block"
              >
                ✕
              </motion.span>
            ) : (
              <motion.span
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                className="text-2xl block"
              >
                ☰
              </motion.span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-[9998] md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-[100dvh] w-[85vw] max-w-xs bg-white dark:bg-dark-800 z-[9999] shadow-2xl pt-16 px-6 overflow-y-auto md:hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-2xl text-gray-700 dark:text-gray-200 z-[10001]"
                aria-label="Close menu"
              >
                ✕
              </button>

              <nav className="relative z-[9999]">
                <ul className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <li key={item.name} className="relative">
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.path}
                          className="text-lg text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors py-2"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                        {item.dropdown && (
                          <button
                            onClick={() =>
                              setOpenDropdown(
                                openDropdown === item.name ? null : item.name
                              )
                            }
                            className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors text-xl"
                            aria-label={`Toggle ${item.name} submenu`}
                          >
                            {openDropdown === item.name ? "−" : "+"}
                          </button>
                        )}
                      </div>

                      {/* Mobile Dropdown Menu */}
                      {item.dropdown && openDropdown === item.name && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-2 pl-4 border-l-2 border-green-600 dark:border-green-400 space-y-2"
                        >
                          {item.dropdown.map((subItem) => (
                            <motion.li
                              key={subItem.name}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="py-1"
                            >
                              <Link
                                href={subItem.path}
                                className="block text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                                onClick={() => setIsOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
