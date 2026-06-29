"use client";

import { useState, useEffect } from "react";
import { Mail, ArrowLeft, Sparkles, MessageCircle } from "lucide-react";
import Link from "next/link";

interface ComingSoonProps {
  pageName?: string;
  launchDate?: string;
  description?: string;
}

export function ComingSoon({
  pageName = "This Page",
  launchDate = "Coming Soon",
  description = "We're working hard to bring you something amazing. Stay tuned!"
}: ComingSoonProps) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 14);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Minutes", value: countdown.minutes },
    { label: "Seconds", value: countdown.seconds }
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Dancing Emoji Header */}
        <div className="mb-6 text-6xl md:text-8xl animate-bounce">
          💃🕺🎉
        </div>

        {/* Logo / Brand */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gold-500 tracking-tight">
            ElimuX
          </h1>
          <div className="h-1 w-24 bg-gold-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Page Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          {pageName}
        </h2>
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="h-5 w-5 text-gold-500 animate-pulse" />
          <p className="text-xl text-gold-400 font-semibold">
            {launchDate}
          </p>
          <Sparkles className="h-5 w-5 text-gold-500 animate-pulse" />
        </div>
        <p className="text-gray-400 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
          {description}
        </p>

        {/* Dancing Emoji Divider */}
        <div className="text-4xl mb-8 animate-pulse">
          🚀✨🔥
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          {timeBlocks.map((block) => (
            <div
              key={block.label}
              className="bg-gold-950/30 border border-gold-900/30 rounded-lg p-4 hover:bg-gold-950/50 transition-colors"
            >
              <div className="text-3xl md:text-4xl font-bold text-gold-500">
                {String(block.value).padStart(2, "0")}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                {block.label}
              </div>
            </div>
          ))}
        </div>

        {/* Notify Me Form */}
        <div className="bg-gold-950/20 border border-gold-900/30 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mail className="h-5 w-5 text-gold-500" />
            <span className="text-white font-medium">Get notified when we launch</span>
            <span className="text-2xl animate-bounce">📬</span>
          </div>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! We'll notify you when this page is ready. 🎉");
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-black border border-gold-900/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-black font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Notify Me</span>
              <span className="animate-bounce">🚀</span>
            </button>
          </form>
        </div>

        {/* WhatsApp Contact */}
        <a
          href="https://wa.me/254793002436"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors mb-8"
        >
          <MessageCircle className="h-5 w-5" />
          <span>Chat on WhatsApp</span>
          <span className="animate-bounce">💬</span>
        </a>

        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
          <span className="animate-pulse">🏠</span>
        </Link>

        {/* Footer with Dancing Emoji */}
        <div className="mt-12 pt-8 border-t border-gold-900/20">
          <p className="text-gray-600 text-sm mb-2">
            &copy; {new Date().getFullYear()} ElimuX. All rights reserved.
          </p>
          <div className="text-2xl animate-bounce">
            🎓🌍💡
          </div>
        </div>
      </div>
    </div>
  );
}
