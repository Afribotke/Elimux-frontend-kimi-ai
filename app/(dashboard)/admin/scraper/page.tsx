"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ScraperPage() {
  const [url, setUrl] = useState("");
  const [config, setConfig] = useState(`{
  "nameSelector": "h1",
  "countrySelector": ".country",
  "citySelector": ".city",
  "descriptionSelector": ".description",
  "programSelector": ".program"
}`);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleScrape() {
    setLoading(true);
    try {
      const response = await fetch("/api/scraper/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, config: JSON.parse(config) }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">University Data Scraper</h1>

      <Card className="bg-black border-gold-900/30">
        <CardHeader>
          <CardTitle className="text-white">Scrape Single University</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">University URL</label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://university.edu"
              className="bg-gold-950/30 border-gold-900/30 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">CSS Selectors (JSON)</label>
            <Textarea
              value={config}
              onChange={(e) => setConfig(e.target.value)}
              rows={8}
              className="bg-gold-950/30 border-gold-900/30 text-white font-mono text-sm"
            />
          </div>

          <Button onClick={handleScrape} disabled={loading} className="w-full">
            {loading ? "Scraping..." : "Start Scraping"}
          </Button>

          {result && (
            <div className="mt-4 p-4 bg-gold-950/30 rounded-lg">
              <pre className="text-sm text-gray-300 overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
