"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Linkedin,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { isValidEmail } from "@/lib/utils";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const turnstileRef = useRef<any>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (!captchaToken) {
      newErrors.captcha = "Please complete the CAPTCHA verification";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken: captchaToken,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setCaptchaToken(null);
        turnstileRef.current?.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        // Handle validation errors from API
        if (data.errors) {
          const apiErrors: Record<string, string> = {};
          data.errors.forEach((err: any) => {
            if (err.path && err.path[0]) {
              apiErrors[err.path[0]] = err.message;
            }
          });
          setErrors(apiErrors);
        } else {
          alert(data.message || "Failed to send message. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-whisper relative overflow-hidden"
    >
      {/* Decorative Shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-burgundy/5" />
      <div className="absolute top-40 right-20 w-12 h-12 bg-gold/20 rotate-45" />
      <div className="absolute bottom-20 left-1/4 w-16 h-16 rounded-full bg-burgundy/10" />
      <div className="absolute bottom-40 right-1/3 w-8 h-8 bg-gold/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
                Let&apos;s talk
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed max-w-md">
                To request a quote or want to meet up for coffee, contact us
                directly or fill out the form and we will get back to you
                promptly.
              </p>
            </div>

            {/* Success Message */}
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-2xl"
              >
                Thank you! We&apos;ll get back to you soon.
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-6 py-4 bg-white border-0 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-burgundy/20 transition-all"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 bg-white border-0 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-burgundy/20 transition-all"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Type something if you want..."
                  className="w-full px-6 py-4 bg-white border-0 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-burgundy/20 transition-all resize-none"
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              {/* Turnstile CAPTCHA */}
              <div>
                <Turnstile
                  ref={turnstileRef}
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  onSuccess={(token) => {
                    setCaptchaToken(token);
                    if (errors.captcha) {
                      setErrors((prev) => ({ ...prev, captcha: "" }));
                    }
                  }}
                  onError={() => {
                    setCaptchaToken(null);
                    setErrors((prev) => ({
                      ...prev,
                      captcha: "CAPTCHA verification failed. Please try again.",
                    }));
                  }}
                  onExpire={() => {
                    setCaptchaToken(null);
                  }}
                  options={{
                    theme: "light",
                    size: "normal",
                  }}
                />
                {errors.captcha && (
                  <p className="mt-2 text-sm text-red-600">{errors.captcha}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-burgundy hover:bg-gold text-white hover:text-pure-black font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Right Column - Illustration & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* Illustration Area */}
            <div className="relative h-[400px] flex items-center justify-center">
              {/* Main Envelope */}
              <div className="relative">
                {/* Floating decorative elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-16 -left-16 w-16 h-16 bg-burgundy/10 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-8 right-0 w-12 h-12 bg-gold/30 rotate-45"
                />
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-0 -right-20 w-8 h-8 bg-burgundy/20 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-8 -left-12 w-10 h-10 bg-gold/20"
                />

                {/* Envelope Icon */}
                <div className="relative bg-gradient-to-br from-burgundy to-burgundy-900 p-16 rounded-3xl shadow-2xl">
                  <Mail className="w-32 h-32 text-white" />

                  {/* Chat Bubble */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-8 -left-8 bg-gold p-4 rounded-2xl shadow-lg"
                  >
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-burgundy rounded-full" />
                      <div className="w-2 h-2 bg-burgundy rounded-full" />
                      <div className="w-2 h-2 bg-burgundy rounded-full" />
                    </div>
                  </motion.div>

                  {/* Paper Plane */}
                  <motion.div
                    animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg"
                  >
                    <Send className="w-8 h-8 text-burgundy" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-burgundy/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-burgundy" />
                </div>
                <div>
                  <p className="text-slate-900 font-medium">
                    {SITE_CONFIG.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-burgundy/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-burgundy" />
                </div>
                <div>
                  <a
                    href={`tel:${SITE_CONFIG.phone.replace(/\D/g, "")}`}
                    className="text-slate-900 font-medium hover:text-burgundy transition-colors"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-burgundy/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-burgundy" />
                </div>
                <div>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-slate-900 font-medium hover:text-burgundy transition-colors"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex gap-4 pt-4">
                <a
                  href={SITE_CONFIG.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our LinkedIn page"
                  className="w-12 h-12 bg-burgundy hover:bg-gold rounded-full flex items-center justify-center transition-all hover:scale-110"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
