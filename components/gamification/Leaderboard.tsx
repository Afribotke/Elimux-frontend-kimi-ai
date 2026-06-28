"use client";

import { useState, useEffect } from "react";
import { Trophy, Medal, Award } from "lucide-react";

export function Leaderboard() {
  interface LeaderboardUser {
    id: string;
    full_name: string;
    points: number;
    rank: number;
    referral_count?: number;
    total_points?: number;
  }

const [leaders, setLeaders] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/gamification/leaderboard")
      .then(res => res.json())
      .then(data => {
        setLeaders(data.leaderboard || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-400">Loading leaderboard...</p>;

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-gold-500" />;
    if (index === 1) return <Medal className="h-5 w-5 text-gray-300" />;
    if (index === 2) return <Award className="h-5 w-5 text-amber-600" />;
    return <span className="text-gray-500 w-5 text-center">{index + 1}</span>;
  };

  return (
    <div className="bg-black border border-gold-900/30 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">Leaderboard</h3>
      <div className="space-y-3">
        {leaders.map((user, index) => (
          <div key={user.id} className="flex items-center gap-4 p-3 bg-gold-950/20 rounded-lg">
            <div className="flex items-center justify-center w-8">{getRankIcon(index)}</div>
            <div className="flex-1">
              <p className="text-white font-medium">{user.full_name || "Anonymous"}</p>
              <p className="text-xs text-gray-500">{user.referral_count || 0} referrals</p>
            </div>
            <div className="text-right">
              <p className="text-gold-400 font-bold">{user.total_points || 0}</p>
              <p className="text-xs text-gray-500">points</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
