
export interface StatCard {
  title: string;
  value: string | number;
  change: number;
  period: string;
}

export interface Revenue {
  totalRevenue: number;
  totalTarget: number;
  revenuePercent: number;
  targetPercent: number;
  chartData: ChartDataPoint[];
}

export interface ChartDataPoint {
  date: string;
  revenue: number;
  target: number;
}

export interface CountrySession {
  country: string;
  sessions: number;
  percentage: number;
  flag: string;
}

export interface RegionSales {
  region: string;
  sales: number;
}

export interface PlatformSales {
  platform: string;
  percentage: number;
  icon: string;
}

export interface UserStats {
  totalUsers: number;
  premiumUsers: number;
  basicUsers: number;
}

export interface DashboardData {
  stats: {
    totalIncome: StatCard;
    profit: StatCard;
    totalViews: StatCard;
    conversionRate: StatCard;
  };
  revenue: Revenue;
  sessions: CountrySession[];
  regionSales: RegionSales[];
  platformSales: PlatformSales[];
  userStats: UserStats;
}
