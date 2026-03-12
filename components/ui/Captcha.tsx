"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";

interface CaptchaProps {
    onChange: (value: string) => void;
    onRefresh?: () => void;
}

export default function Captcha({ onChange, onRefresh }: CaptchaProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [captcha, setCaptcha] = useState("");

    const generateCaptcha = () => {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
        let result = "";
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptcha(result);
        onChange(result);
        if (onRefresh) onRefresh();
    };

    const drawCaptcha = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Noisy background gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, "#eef2f7");
        gradient.addColorStop(0.5, "#f5f7fa");
        gradient.addColorStop(1, "#e8edf4");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dense noise dots in background
        for (let i = 0; i < 120; i++) {
            const r = Math.floor(Math.random() * 200);
            const g = Math.floor(Math.random() * 200);
            const b = Math.floor(Math.random() * 200);
            ctx.fillStyle = `rgba(${r},${g},${b},${Math.random() * 0.25 + 0.05})`;
            ctx.beginPath();
            ctx.arc(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                Math.random() * 2.5,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }

        // Heavy noise lines crossing the canvas
        for (let i = 0; i < 14; i++) {
            ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 180)},${Math.floor(Math.random() * 60)},${Math.floor(Math.random() * 60)},${Math.random() * 0.35 + 0.15})`;
            ctx.lineWidth = Math.random() * 2.5 + 0.5;
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            // Curve lines for extra confusion
            ctx.bezierCurveTo(
                Math.random() * canvas.width, Math.random() * canvas.height,
                Math.random() * canvas.width, Math.random() * canvas.height,
                Math.random() * canvas.width, Math.random() * canvas.height
            );
            ctx.stroke();
        }

        // Wave distortion grid overlay
        for (let x = 0; x < canvas.width; x += 8) {
            ctx.strokeStyle = `rgba(100,120,160,${Math.random() * 0.08})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x + (Math.random() - 0.5) * 6, canvas.height);
            ctx.stroke();
        }

        // Draw distorted characters
        const colors = ["#841818", "#1e3a5f", "#2d5a27", "#5a2d7a", "#7a4a00", "#1a4a4a"];
        const fontFamilies = ['"Georgia", serif', '"Arial", sans-serif', '"Courier New", monospace', '"Trebuchet MS", sans-serif'];

        for (let i = 0; i < captcha.length; i++) {
            const char = captcha[i];
            const fontSize = Math.floor(Math.random() * 10 + 22); // 22–32px
            const fontFamily = fontFamilies[Math.floor(Math.random() * fontFamilies.length)];
            const fontWeight = Math.random() > 0.4 ? "bold" : "900";
            ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
            ctx.textBaseline = "middle";

            const x = 18 + i * 27;
            const y = canvas.height / 2 + (Math.random() - 0.5) * 16;
            const angle = (Math.random() - 0.5) * 0.7; // up to ±40°
            const skewX = (Math.random() - 0.5) * 0.45; // horizontal shear

            const fillColor = colors[Math.floor(Math.random() * colors.length)];

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.transform(1, Math.random() * 0.3 - 0.15, skewX, 1, 0, 0); // skew transform

            // Draw outline stroke slightly offset for extra readability interference
            ctx.strokeStyle = `rgba(200,200,200,0.6)`;
            ctx.lineWidth = 3;
            ctx.strokeText(char, 1, 1);

            // Shadow/ghost copy slightly offset
            ctx.fillStyle = `rgba(180,180,200,0.35)`;
            ctx.fillText(char, 2, 2);

            // Actual character
            ctx.fillStyle = fillColor;
            ctx.fillText(char, 0, 0);

            ctx.restore();
        }

        // Final overlay noise pass on top of text
        for (let i = 0; i < 60; i++) {
            ctx.fillStyle = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.random() * 0.15})`;
            ctx.beginPath();
            ctx.arc(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                Math.random() * 2,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    useEffect(() => {
        if (captcha) {
            drawCaptcha();
        }
    }, [captcha]);

    return (
        <div className="flex items-center gap-4">
            <div className="relative group">
                <canvas
                    ref={canvasRef}
                    width={200}
                    height={50}
                    className="rounded-xl border border-gray-200 bg-white shadow-sm transition-all group-hover:border-gray-300"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
            </div>
            <button
                type="button"
                onClick={generateCaptcha}
                className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 hover:text-[#841818] hover:border-[#841818]/20 hover:bg-[#841818]/5 transition-all active:scale-95"
                title="Refresh CAPTCHA"
            >
                <RefreshCw className="w-4 h-4" />
            </button>
        </div>
    );
}
