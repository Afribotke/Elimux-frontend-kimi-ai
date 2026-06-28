import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, FileText, CreditCard } from "lucide-react";

const stats = [
  { title: "Total Users", value: "1,234", icon: Users, change: "+12%" },
  { title: "Institutions", value: "56", icon: Building2, change: "+5%" },
  { title: "Applications", value: "3,456", icon: FileText, change: "+23%" },
  { title: "Revenue", value: "$12,345", icon: CreditCard, change: "+18%" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-black border-gold-900/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-gold-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className="text-xs text-green-400">{stat.change} from last month</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black border-gold-900/30">
          <CardHeader>
            <CardTitle className="text-white">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">Application data will be loaded here</p>
          </CardContent>
        </Card>

        <Card className="bg-black border-gold-900/30">
          <CardHeader>
            <CardTitle className="text-white">Revenue Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">Chart will be implemented here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
