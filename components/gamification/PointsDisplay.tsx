"use client";

import { Trophy, Star, TrendingUp } from "lucide-react";

export function PointsDisplay({ points, badges = [] }) {
  const latestBadge = badges[0];

  return (
    <div className="bg-black border border-gold-900/30 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trophy className="h-8 w-8 text-gold-500" />
          <div>
            <p className="text-sm text-gray-400">Total Points</p>
            <p className="text-3xl font-bold text-white">{points}</p>
          </div>
        </div>
        {latestBadge && (
          <div className="text-right">
            <p className="text-xs text-gray-400">Latest Badge</p>
            <p className="text-gold-400 font-semibold">{latestBadge.badge_name}</p>
          </div>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {badges.map((badge) => (
          <span key={badge.id} className="px-3 py-1 bg-gold-950/50 text-gold-400 rounded-full text-xs border border-gold-900/30">
            {badge.badge_name}
          </span>
        ))}
      </div>
    </div>
  );
}
