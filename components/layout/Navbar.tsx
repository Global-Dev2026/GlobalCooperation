"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import NextImage from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const router = useRouter();
  const pathname = usePathname();

  const { scrollY } = useScroll();

  // HUD-style width transformation based on scroll
  const navWidth = useTransform(scrollY, [0, 100], ["95%", "85%"]);
  const navPadding = useTransform(scrollY, [0, 100], ["1.5rem", "0.75rem"]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state
      setIsScrolled(currentScrollY > 50);

      // Show navbar at the very top
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLinkClick = (href: string) => {
    // 1. Check if it's a hash link for the home page sections (e.g. "/#services")
    if (href.startsWith("/#")) {
      const hash = href.replace("/", ""); // e.g. "#services"

      // If we are already on the home page
      if (pathname === "/") {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // If we are on another page, navigate to home + hash
        router.push(href);
      }
    } else {
      // 2. Normal navigation (e.g. external or internal routes)
      router.push(href);
    }

    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        style={{
          "--nav-width": navWidth,
          "--nav-padding": navPadding,
        } as any}
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -150,
          x: "-50%",
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
          type: "spring",
          damping: 20,
          stiffness: 100
        }}
        className={cn(
          "fixed top-2 lg:top-4 left-1/2 z-[100] flex items-center justify-between px-3 lg:px-8 max-w-7xl transition-[background-color,border-color,box-shadow] duration-700 w-[95%] lg:w-[var(--nav-width)] pt-4 pb-4 lg:pt-[var(--nav-padding)] lg:pb-[var(--nav-padding)]",
          isScrolled || pathname !== "/"
            ? "bg-black/40 backdrop-blur-2xl rounded-full lg:rounded-[3rem] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
            : "bg-black/20 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none rounded-full lg:rounded-none border border-white/10 lg:border-transparent"
        )}
      >
        {/* Futuristic Brand Logo */}
        <div className="flex justify-start">
          <button
            onClick={() => handleLinkClick("/#home")}
            className="group flex items-center gap-2 lg:gap-3 relative z-10"
          >
            <div className="relative">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white/40 transition-all duration-300">
                <NextImage
                  src="/images/companies/logo.png"
                  alt="GS Solution Logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              {/* Pulsing orbit effect */}
              <div className="absolute inset-x-0 inset-y-0 rounded-full border border-white/20 scale-125 animate-pulse" />
            </div>
            <div className="flex flex-col items-center lg:items-start leading-none">
              <span className="text-xs lg:text-sm font-bold tracking-[0.2em] lg:tracking-[0.3em] text-white uppercase">Global Cooperation</span>

            </div>
          </button>
        </div>

        {/* Navigation & Actions - Right Aligned */}
        <div className="flex items-center gap-8">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                onMouseEnter={() => setHoveredLink(link.href)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative px-6 py-2 group"
              >
                <span className={cn(
                  "relative z-10 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500",
                  hoveredLink === link.href ? "text-white" : "text-white/50 group-hover:text-white/80"
                )}>
                  {link.label}
                </span>

                {/* Organic Hover Indicator */}
                <AnimatePresence>
                  {hoveredLink === link.href && (
                    <motion.div
                      layoutId="nav-hover"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-0 bg-white/[0.08] backdrop-blur-md rounded-full border border-white/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 active:scale-95 transition-all"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* HUD Border Glow Mask */}
        <div className="absolute inset-0 rounded-[3rem] pointer-events-none border border-white/0 hover:border-white/10 transition-colors opacity-20" />
      </motion.nav>

      {/* Holographic Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-[100px] flex items-center justify-center p-8"
          >
            {/* Background HUD accents */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full" />
              <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full" />
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-lg space-y-8 lg:space-y-12 relative px-4"
            >
              <div className="grid gap-4 lg:gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    onClick={() => handleLinkClick(link.href)}
                    className="group flex items-center justify-between p-5 lg:p-6 rounded-2xl lg:rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 active:scale-[0.98] transition-all text-left"
                  >
                    <div className="flex items-center gap-4 lg:gap-6">
                      <span className="text-xs font-medium text-white/20 tracking-tighter">0{i + 1}</span>
                      <span className="text-xl lg:text-2xl font-light tracking-[0.15em] lg:tracking-[0.2em] text-white uppercase group-hover:tracking-[0.25em] lg:group-hover:tracking-[0.3em] transition-all">
                        {link.label}
                      </span>
                    </div>
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Globe size={14} className="lg:hidden text-white" />
                      <Globe size={16} className="hidden lg:block text-white" />
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex flex-col items-center gap-6 pb-4">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  onClick={() => setIsOpen(false)}
                  className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black active:scale-95 transition-all"
                  aria-label="Close menu"
                >
                  <X size={24} className="lg:hidden" />
                  <X size={32} className="hidden lg:block" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
