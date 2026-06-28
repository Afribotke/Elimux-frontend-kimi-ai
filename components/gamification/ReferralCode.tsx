"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Share2, Check } from "lucide-react";

export function ReferralCode({ code }) {
  const [copied, setCopied] = useState(false);

  const referralLink = `https://www.elimux.ke/register?ref=${code}`;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  function shareReferral() {
    if (navigator.share) {
      navigator.share({
        title: "Join ElimuX",
        text: "Discover global education opportunities with me!",
        url: referralLink,
      });
    } else {
      copyToClipboard();
    }
  }

  return (
    <div className="bg-black border border-gold-900/30 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-white">Refer & Earn</h3>
      <p className="text-gray-400 text-sm">Invite friends and earn 150 points for each signup!</p>

      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gold-950/30 border border-gold-900/30 rounded-lg px-4 py-3">
          <p className="text-gold-400 font-mono font-bold text-lg">{code || "Generate your code"}</p>
        </div>
        <Button onClick={copyToClipboard} variant="outline" className="border-gold-900/30">
          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>

      <Button onClick={shareReferral} className="w-full">
        <Share2 className="h-4 w-4 mr-2" />
        Share with Friends
      </Button>
    </div>
  );
}
