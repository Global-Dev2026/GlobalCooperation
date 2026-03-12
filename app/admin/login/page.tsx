'use client';

import { useState, useTransition, Suspense } from 'react';
import { authenticate } from '@/lib/actions';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, LogIn, ShieldCheck, ChevronRight, Eye, EyeOff, AlertCircle } from 'lucide-react';

/**
 * LoginForm - Premium, Cinematic Design
 */
function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/admin/jobs';
    const [isPending, startTransition] = useTransition();
    const [serverError, setServerError] = useState<string | undefined>(undefined);
    const [showPassword, setShowPassword] = useState(false);
    
    const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
    
    const validate = (formData: FormData) => {
        const errors: { email?: string; password?: string } = {};
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        
        if (!email) {
            errors.email = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        
        return errors;
    };

    const handleFormAction = async (formData: FormData) => {
        setServerError(undefined);
        const errors = validate(formData);
        
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }
        
        setFieldErrors({});
        startTransition(async () => {
            const result = await authenticate(undefined, formData);
            if (result) {
                setServerError(result);
            }
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#252525] font-sans">
            {/* ── Cinematic Background Elements ── */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Gradient Mesh */}
                <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-[#841818]/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-[#E0BB20]/10 blur-[120px]" />
                
                {/* Subtle Grid Overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.03]" 
                    style={{ backgroundImage: 'radial-gradient(circle, #841818 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
                />
            </div>

            {/* ── Login Card ── */}
            <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-md px-6"
            >
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#2D2D2D]/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
                    {/* Top Accent Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#841818] to-transparent" />
                    
                    <div className="mb-10 text-center">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#841818] to-[#631212] shadow-lg shadow-[#841818]/20"
                        >
                            <ShieldCheck className="h-8 w-8 text-white" />
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
                        >
                            Admin Portal
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-2 text-sm text-white/50"
                        >
                            Global Cooperation Management System
                        </motion.p>
                    </div>

                    <form action={handleFormAction} className="space-y-5">
                        <input type="hidden" name="redirectTo" value={callbackUrl} />
                        
                        {/* Email Input */}
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-2"
                        >
                            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-[#E0BB20]">
                                Email Address
                            </label>
                            <div className="group relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors group-focus-within:text-[#E0BB20] text-white/30">
                                    <Mail size={18} />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    onChange={() => setFieldErrors(prev => ({ ...prev, email: undefined }))}
                                    className={`block w-full rounded-xl border ${fieldErrors.email ? 'border-red-500/50' : 'border-white/5'} bg-[#333333] py-3.5 pl-11 pr-4 !text-white !caret-white placeholder-white/20 outline-none transition-all focus:border-[#841818]/50 focus:bg-[#3D3D3D] focus:ring-1 focus:ring-[#841818]/50 sm:text-sm [&:-webkit-autofill]:[WebkitTextFillColor:white] [&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s] [color-scheme:dark]`}
                                />
                            </div>
                            <AnimatePresence>
                                {fieldErrors.email && (
                                    <motion.p 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-[11px] font-medium text-red-500 flex items-center gap-1 mt-1 pl-1"
                                    >
                                        <AlertCircle size={12} />
                                        {fieldErrors.email}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Password Input */}
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-widest text-[#E0BB20]">
                                    Password
                                </label>
                            </div>
                            <div className="group relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors group-focus-within:text-[#E0BB20] text-white/30">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    onChange={() => setFieldErrors(prev => ({ ...prev, password: undefined }))}
                                    className={`block w-full rounded-xl border ${fieldErrors.password ? 'border-red-500/50' : 'border-white/5'} bg-[#333333] py-3.5 pl-11 pr-12 !text-white !caret-white placeholder-white/20 outline-none transition-all focus:border-[#841818]/50 focus:bg-[#3D3D3D] focus:ring-1 focus:ring-[#841818]/50 sm:text-sm [&:-webkit-autofill]:[WebkitTextFillColor:white] [&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s] [color-scheme:dark]`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/30 hover:text-[#E0BB20] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <AnimatePresence>
                                {fieldErrors.password && (
                                    <motion.p 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-[11px] font-medium text-red-500 flex items-center gap-1 mt-1 pl-1"
                                    >
                                        <AlertCircle size={12} />
                                        {fieldErrors.password}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <div className="h-6 overflow-hidden">
                            {serverError && (
                                <motion.div 
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-xs font-medium text-red-500 flex items-center gap-1.5 justify-center"
                                >
                                    <AlertCircle size={14} />
                                    {serverError}
                                </motion.div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            type="submit"
                            disabled={isPending}
                            className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#841818] to-[#a31e1e] py-3.5 text-sm font-bold tracking-widest uppercase text-white shadow-lg shadow-[#841818]/20 outline-none transition-all hover:scale-[1.02] hover:shadow-[#841818]/40 active:scale-95 disabled:opacity-70 disabled:grayscale disabled:hover:scale-100"
                        >
                            <div className="relative z-10 flex items-center gap-2">
                                {isPending ? (
                                    <>
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                                        <span>Signing In...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </div>
                            <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#E0BB20]/0 via-[#E0BB20]/20 to-[#E0BB20]/0 translate-x-[-150%] transition-transform duration-700 group-hover:translate-x-[150%]" />
                        </motion.button>
                    </form>
                    
                    <div className="mt-8 text-center">
                        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/20">
                            &copy; 2026 GLOBAL COOPERATION
                        </p>
                    </div>
                </div>

                {/* Bottom Reflection Effect */}
                <div className="mt-8 flex justify-center opacity-30 blur-2xl">
                    <div className="h-4 w-48 rounded-full bg-[#841818]" />
                </div>
            </motion.div>
        </div>
    );
}

// Wrap in Suspense — required for useSearchParams() in Next.js 14+
export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-[#252525]">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#841818] border-t-transparent" />
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}
