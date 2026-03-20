"use client";

import { FOOTER_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Linkedin, Twitter, Github, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import NextImage from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    linkedin: Linkedin,
    twitter: Twitter,
    github: Github,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="bg-burgundy text-white border-t border-white/5">
      <motion.div
        className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 items-center w-full">
          {/* Company Info - Compact */}
          <motion.div
            className="flex items-center justify-start gap-6"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <NextImage
                  src="/images/companies/logo.png"
                  alt="GS Solution Logo"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-heading font-bold">
                {SITE_CONFIG.name}
              </span>
            </div>
            {/* Social Icons */}
            <div className="flex gap-2">
              {Object.entries(SITE_CONFIG.social).map(([key, url]) => {
                const Icon = socialIcons[key as keyof typeof socialIcons];
                return (
                  <motion.a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-white/10 hover:bg-gold hover:text-burgundy rounded-lg flex items-center justify-center transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={key}
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links - Horizontal */}
          <motion.nav
            className="flex flex-wrap items-center justify-center gap-4 text-sm"
            variants={itemVariants}
          >
            {FOOTER_LINKS.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-gold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.nav>

          {/* Contact - Compact */}
          <motion.div
            className="flex items-center justify-center md:justify-end gap-4 text-sm"
            variants={itemVariants}
          >
            <motion.a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center gap-1.5 text-white/70 hover:text-gold transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Mail size={16} className="text-gold" />
              <span className="hidden sm:inline">{SITE_CONFIG.email}</span>
            </motion.a>
            <motion.a
              href={`tel:${SITE_CONFIG.phone.replace(/\D/g, "")}`}
              className="flex items-center gap-1.5 text-white/70 hover:text-gold transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Phone size={16} className="text-gold" />
              <span className="hidden sm:inline">{SITE_CONFIG.phone}</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Strategic Financing Partner */}
        <motion.div 
          className="flex flex-col items-start justify-start gap-5 mb-4 pt-4 w-full border-t border-white/10"
          variants={itemVariants}
        >
          <div className="text-[11px] font-medium text-white/50 leading-relaxed max-w-2xl uppercase tracking-wider">
            Customer financing solutions are facilitated through{" "}
            <a 
              href="https://mi.com.lk/en/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gold transition-colors underline underline-offset-4"
            >
              Mercantile Investments and Finance PLC
            </a>
            , an independent financial institution.
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
          variants={itemVariants}
        >
          <p className="text-white/50">
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <motion.div
            className="flex items-start sm:items-center gap-2 text-white/50"
            whileHover={{ scale: 1.02 }}
          >
            <MapPin size={14} className="text-gold/70 shrink-0 mt-0.5 sm:mt-0" />
            <span>{SITE_CONFIG.address}</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
