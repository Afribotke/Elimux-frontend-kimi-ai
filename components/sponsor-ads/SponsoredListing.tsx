"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export function SponsoredListing({ country, category }) {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (country) params.append("country", country);
    if (category) params.append("category", category);

    fetch(`/api/sponsor-ads/active?${params}`)
      .then(res => res.json())
      .then(data => setAds(data.ads || []))
      .catch(() => setAds([]));
  }, [country, category]);

  if (ads.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-gray-400">Sponsored</h3>
        <div className="flex-1 h-px bg-gold-900/30" />
      </div>

      {ads.map((ad) => (
        <SponsoredCard key={ad.id} ad={ad} />
      ))}
    </div>
  );
}

function SponsoredCard({ ad }) {
  function handleClick() {
    fetch(`/api/sponsor-ads/click/${ad.id}`, { method: "POST" });
    window.open(ad.target_url, "_blank");
  }

  return (
    <div 
      onClick={handleClick}
      className="bg-black border border-gold-900/30 rounded-lg p-4 cursor-pointer hover:border-gold-700 transition-colors"
    >
      <div className="flex items-start gap-4">
        {ad.image_url && (
          <img src={ad.image_url} alt={ad.title} className="w-20 h-20 object-cover rounded-lg" />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-semibold">{ad.title}</h4>
            <Badge variant="outline" className="text-xs border-gold-900/30 text-gold-400">Sponsored</Badge>
          </div>
          <p className="text-gray-400 text-sm line-clamp-2">{ad.description}</p>
          <div className="flex items-center gap-1 mt-2 text-gold-400 text-sm">
            <ExternalLink className="h-3 w-3" />
            <span>Learn more</span>
          </div>
        </div>
      </div>
    </div>
  );
}
