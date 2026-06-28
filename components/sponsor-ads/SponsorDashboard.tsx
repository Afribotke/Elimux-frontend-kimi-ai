"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, MousePointer, DollarSign, TrendingUp } from "lucide-react";

export function SponsorDashboard({ sponsorId }) {
  const [campaigns, setCampaigns] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/sponsor-ads/sponsor/${sponsorId}`)
      .then(res => res.json())
      .then(data => {
        setCampaigns(data.campaigns || []);
        setSummary(data.summary || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sponsorId]);

  if (loading) return <p className="text-gray-400">Loading dashboard...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Sponsor Dashboard</h2>

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SummaryCard icon={DollarSign} label="Total Spent" value={`$${summary.total_spent?.toFixed(2) || 0}`} />
          <SummaryCard icon={Eye} label="Impressions" value={summary.total_impressions || 0} />
          <SummaryCard icon={MousePointer} label="Clicks" value={summary.total_clicks || 0} />
          <SummaryCard icon={TrendingUp} label="CTR" value={`${summary.avg_ctr || 0}%`} />
        </div>
      )}

      <Card className="bg-black border-gold-900/30">
        <CardHeader>
          <CardTitle className="text-white">Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          {campaigns.length === 0 ? (
            <p className="text-gray-400">No campaigns yet.</p>
          ) : (
            <div className="space-y-3">
              {campaigns.map((campaign) => (
                <CampaignRow key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value }) {
  return (
    <Card className="bg-black border-gold-900/30">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-gold-500" />
          <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-xl font-bold text-white">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CampaignRow({ campaign }) {
  const statusColors = {
    active: "bg-green-500/20 text-green-400",
    paused: "bg-yellow-500/20 text-yellow-400",
    pending: "bg-gray-500/20 text-gray-400",
    completed: "bg-blue-500/20 text-blue-400",
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gold-950/20 rounded-lg">
      <div>
        <h4 className="text-white font-medium">{campaign.title}</h4>
        <p className="text-xs text-gray-500">
          ${campaign.spent?.toFixed(2) || 0} / ${campaign.budget} spent
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm text-gray-400">{campaign.impressions || 0} views</p>
          <p className="text-sm text-gray-400">{campaign.clicks || 0} clicks</p>
        </div>
        <Badge className={statusColors[campaign.status] || statusColors.pending}>
          {campaign.status}
        </Badge>
      </div>
    </div>
  );
}
