"use client";

import { Bell, Search, User } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="bg-black border-b border-gold-900/30 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gold-950/30 border border-gold-900/30 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-700"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-400 hover:text-gold-400">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-gold-600 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-black" />
          </div>
          <span className="text-sm text-white">Admin</span>
        </div>
      </div>
    </header>
  );
}
