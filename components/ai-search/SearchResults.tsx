"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, MapPin, Clock, DollarSign, Award, Calendar, CheckCircle } from "lucide-react";
import { SearchResult } from "@/lib/ai/types/provider";

interface SearchResultsProps {
  results: SearchResult;
  strategy: string;
}

export function SearchResults({ results, strategy }: SearchResultsProps) {
  if (!results.institutions.length && !results.programs.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No results found. Try a different query.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Explanation */}
      <div className="bg-gold-950/20 border border-gold-900/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="bg-gold-950 text-gold-400 border-gold-800">
            Strategy: {strategy}
          </Badge>
          <Badge variant="secondary" className="bg-gold-950 text-gold-400 border-gold-800">
            Confidence: {results.confidence}%
          </Badge>
        </div>
        <p className="text-gray-400 text-sm">{results.explanation}</p>
      </div>

      {/* Institutions */}
      {results.institutions.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Matching Institutions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.institutions.map((inst) => (
              <Card key={inst.id} className="bg-black border-gold-900/30 hover:border-gold-800/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-white">{inst.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <MapPin className="h-3 w-3" />
                        {inst.country}
                      </div>
                    </div>
                    <Badge className="bg-gold-600 text-black">{inst.matchScore}% Match</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-400">{inst.matchReason}</p>
                  <div className="flex flex-wrap gap-2">
                    {inst.highlights.map((highlight) => (
                      <span key={highlight} className="text-xs bg-gold-950/50 text-gold-400 px-2 py-1 rounded">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span><GraduationCap className="h-3 w-3 inline mr-1" />{inst.programs} programs</span>
                    <span><DollarSign className="h-3 w-3 inline mr-1" />{inst.tuitionRange}</span>
                  </div>
                  <Button variant="outline" className="w-full border-gold-700 text-gold-500 hover:bg-gold-950">
                    View Institution
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Programs */}
      {results.programs.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Matching Programs</h3>
          <div className="space-y-4">
            {results.programs.map((prog) => (
              <Card key={prog.id} className="bg-black border-gold-900/30 hover:border-gold-800/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-white">{prog.name}</h4>
                        <Badge className="bg-gold-600 text-black">{prog.matchScore}% Match</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{prog.institution}</p>
                      <p className="text-sm text-gray-400 mb-3">{prog.matchReason}</p>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                        <span><Award className="h-3 w-3 inline mr-1" />{prog.degreeType}</span>
                        <span><Clock className="h-3 w-3 inline mr-1" />{prog.duration}</span>
                        <span><DollarSign className="h-3 w-3 inline mr-1" />{prog.tuition}</span>
                        {prog.scholarships && (
                          <span className="text-gold-500"><CheckCircle className="h-3 w-3 inline mr-1" />Scholarships Available</span>
                        )}
                      </div>
                    </div>
                    <Button className="bg-gold-600 text-black hover:bg-gold-500 shrink-0">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
