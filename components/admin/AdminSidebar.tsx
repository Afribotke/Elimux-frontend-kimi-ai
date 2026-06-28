"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  BookOpen, 
  FileText, 
  CreditCard, 
  BarChart3, 
  Settings,
  Globe,
  LogOut
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/institutions", label: "Institutions", icon: Building2 },
  { href: "/admin/programs", label: "Programs", icon: BookOpen },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/scraper", label: "Scraper", icon: Globe },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-black border-r border-gold-900/30 flex flex-col">
      <div className="p-6 border-b border-gold-900/30">
        <h1 className="text-xl font-bold text-gold-500">ElimuX Admin</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? "bg-gold-950/50 text-gold-400" 
                  : "text-gray-400 hover:bg-gold-950/30 hover:text-gold-400"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gold-900/30">
        <button className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 transition-colors w-full">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
