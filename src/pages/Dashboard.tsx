import { useState } from "react";
import { Shield, AlertTriangle, TrendingUp, Clock, Eye, FileText, MapPin, Filter, Search, ChevronRight, BarChart3, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";

const summaryCards = [
  { label: "Deepfakes Today", value: "47", change: "+12%", icon: AlertTriangle, color: "text-deepfake" },
  { label: "Active Campaigns", value: "8", change: "+3", icon: Activity, color: "text-suspicious" },
  { label: "Pending Actions", value: "23", change: "-5", icon: FileText, color: "text-primary" },
  { label: "Avg Detection", value: "38s", change: "-12%", icon: Clock, color: "text-genuine" },
];

const trendData = [
  { day: "Mar 31", deepfakes: 28, genuine: 142 },
  { day: "Apr 1", deepfakes: 35, genuine: 158 },
  { day: "Apr 2", deepfakes: 42, genuine: 163 },
  { day: "Apr 3", deepfakes: 31, genuine: 155 },
  { day: "Apr 4", deepfakes: 56, genuine: 171 },
  { day: "Apr 5", deepfakes: 44, genuine: 149 },
  { day: "Apr 6", deepfakes: 47, genuine: 167 },
];

const typeData = [
  { name: "Video", value: 58 },
  { name: "Audio", value: 28 },
  { name: "Image", value: 14 },
];
const TYPE_COLORS = ["hsl(145,70%,45%)", "hsl(38,92%,50%)", "hsl(0,84%,60%)"];

const topTargets = [
  { name: "Politician A", count: 24, state: "UP" },
  { name: "Politician B", count: 18, state: "MH" },
  { name: "Politician C", count: 15, state: "TN" },
  { name: "Politician D", count: 12, state: "WB" },
  { name: "Politician E", count: 9, state: "KA" },
];

const incidents = [
  { id: "INC-4821", politician: "Leader X", verdict: "deepfake" as const, language: "Hindi", state: "Uttar Pradesh", platform: "WhatsApp", views: "2.4M", time: "12 min ago" },
  { id: "INC-4820", politician: "Leader Y", verdict: "suspicious" as const, language: "Tamil", state: "Tamil Nadu", platform: "YouTube", views: "890K", time: "25 min ago" },
  { id: "INC-4819", politician: "Leader Z", verdict: "deepfake" as const, language: "Telugu", state: "Telangana", platform: "Facebook", views: "1.1M", time: "42 min ago" },
  { id: "INC-4818", politician: "Leader W", verdict: "genuine" as const, language: "Bengali", state: "West Bengal", platform: "Twitter", views: "340K", time: "1h ago" },
  { id: "INC-4817", politician: "Leader V", verdict: "deepfake" as const, language: "Marathi", state: "Maharashtra", platform: "Instagram", views: "670K", time: "1.5h ago" },
];

const verdictBadge = (v: string) => {
  if (v === "deepfake") return <Badge className="bg-deepfake/10 text-deepfake border-deepfake/30 hover:bg-deepfake/20">Deepfake</Badge>;
  if (v === "suspicious") return <Badge className="bg-suspicious/10 text-suspicious border-suspicious/30 hover:bg-suspicious/20">Suspicious</Badge>;
  return <Badge className="bg-genuine/10 text-genuine border-genuine/30 hover:bg-genuine/20">Genuine</Badge>;
};

const languageData = [
  { lang: "Hindi", count: 142 },
  { lang: "Tamil", count: 89 },
  { lang: "Telugu", count: 76 },
  { lang: "Bengali", count: 64 },
  { lang: "Marathi", count: 51 },
  { lang: "Gujarati", count: 38 },
  { lang: "Kannada", count: 33 },
  { lang: "Malayalam", count: 28 },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold">ECI Command Dashboard</h1>
              <p className="text-muted-foreground text-sm mt-1">Real-time deepfake monitoring across India</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-genuine/10 border border-genuine/30">
                <span className="w-2 h-2 rounded-full bg-genuine animate-pulse" />
                <span className="text-sm text-genuine font-medium">Live</span>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {summaryCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl border border-border bg-card"
              >
                <div className="flex items-start justify-between mb-3">
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                  <span className="text-xs text-genuine font-medium">{card.change}</span>
                </div>
                <div className="text-2xl font-heading font-bold text-foreground">{card.value}</div>
                <div className="text-sm text-muted-foreground">{card.label}</div>
              </motion.div>
            ))}
          </div>

          <Tabs defaultValue="analytics" className="space-y-6">
            <TabsList className="bg-secondary border border-border">
              <TabsTrigger value="analytics" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                <BarChart3 className="w-4 h-4 mr-2" /> Analytics
              </TabsTrigger>
              <TabsTrigger value="incidents" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                <AlertTriangle className="w-4 h-4 mr-2" /> Incidents
              </TabsTrigger>
              <TabsTrigger value="map" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                <MapPin className="w-4 h-4 mr-2" /> Map View
              </TabsTrigger>
            </TabsList>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Trend Chart */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-heading font-semibold mb-4 text-foreground">Detection Trend (7 Days)</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(150,15%,15%)" />
                      <XAxis dataKey="day" stroke="hsl(145,10%,55%)" fontSize={12} />
                      <YAxis stroke="hsl(145,10%,55%)" fontSize={12} />
                      <Tooltip contentStyle={{ background: "hsl(150,18%,7%)", border: "1px solid hsl(150,15%,15%)", borderRadius: "8px", color: "hsl(140,30%,92%)" }} />
                      <Line type="monotone" dataKey="deepfakes" stroke="hsl(0,84%,60%)" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="genuine" stroke="hsl(145,70%,45%)" strokeWidth={2} dot={{ r: 4 }} />
                      <Legend />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Type Distribution */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-heading font-semibold mb-4 text-foreground">Content Type Distribution</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={typeData} cx="50%" cy="50%" outerRadius={90} innerRadius={50} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                        {typeData.map((_, i) => <Cell key={i} fill={TYPE_COLORS[i]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: "hsl(150,18%,7%)", border: "1px solid hsl(150,15%,15%)", borderRadius: "8px", color: "hsl(140,30%,92%)" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Top Targets */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-heading font-semibold mb-4 text-foreground">Most Targeted Politicians</h3>
                  <div className="space-y-3">
                    {topTargets.map((t, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground w-5">{i + 1}</span>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-foreground">{t.name} <span className="text-muted-foreground">({t.state})</span></span>
                            <span className="text-sm text-primary font-medium">{t.count}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full gradient-primary" style={{ width: `${(t.count / 24) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Language Breakdown */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-heading font-semibold mb-4 text-foreground">Deepfakes by Language</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={languageData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(150,15%,15%)" />
                      <XAxis type="number" stroke="hsl(145,10%,55%)" fontSize={12} />
                      <YAxis type="category" dataKey="lang" stroke="hsl(145,10%,55%)" fontSize={12} width={80} />
                      <Tooltip contentStyle={{ background: "hsl(150,18%,7%)", border: "1px solid hsl(150,15%,15%)", borderRadius: "8px", color: "hsl(140,30%,92%)" }} />
                      <Bar dataKey="count" fill="hsl(145,70%,45%)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            {/* Incidents Tab */}
            <TabsContent value="incidents">
              <div className="rounded-xl border border-border bg-card">
                <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search incidents..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-secondary border-border" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[140px] bg-secondary border-border">
                      <SelectValue placeholder="Verdict" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="deepfake">Deepfake</SelectItem>
                      <SelectItem value="suspicious">Suspicious</SelectItem>
                      <SelectItem value="genuine">Genuine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="divide-y divide-border">
                  {incidents.map((inc) => (
                    <div key={inc.id} className="p-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors cursor-pointer">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-foreground">{inc.politician}</span>
                          {verdictBadge(inc.verdict)}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span>{inc.id}</span>
                          <span>{inc.language}</span>
                          <span>{inc.state}</span>
                          <span>{inc.platform}</span>
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{inc.views}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-muted-foreground">{inc.time}</p>
                        <ChevronRight className="w-4 h-4 text-muted-foreground mt-1 ml-auto" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Map Tab */}
            <TabsContent value="map">
              <div className="rounded-xl border border-border bg-card p-6 min-h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">Interactive Map View</h3>
                  <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-4">Real-time incident mapping with constituency-level detail. Connect to backend API for live data.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
                    {[{s:"Uttar Pradesh",c:12},{s:"Maharashtra",c:9},{s:"Tamil Nadu",c:7},{s:"West Bengal",c:6}].map(item => (
                      <div key={item.s} className="p-3 rounded-lg bg-secondary border border-border">
                        <div className="text-lg font-bold text-primary">{item.c}</div>
                        <div className="text-xs text-muted-foreground">{item.s}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
