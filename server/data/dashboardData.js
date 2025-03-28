


const demoData = {
  stats: {
    totalIncome: {
      title: 'Total Income',
      value: '$24,851.65',
      change: 5.25,
      period: 'Compared to last month'
    },
    profit: {
      title: 'Profit',
      value: '$8,493.12',
      change: -1.04,
      period: 'Compared to last month'
    },
    totalViews: {
      title: 'Total Views',
      value: '3,847,102',
      change: 2.67,
      period: 'Compared to last month'
    },
    conversionRate: {
      title: 'Conversion Rate',
      value: '3.18%',
      change: 4.45,
      period: 'Compared to last month'
    }
  },
  revenue: {
    totalRevenue: 24851.65,
    totalTarget: 28000.00,
    revenuePercent: 45,
    targetPercent: 55,
    chartData: [
      { date: 'Jan 2023', revenue: 10000, target: 12000 },
      { date: 'Apr 2023', revenue: 12000, target: 13000 },
      { date: 'Jul 2023', revenue: 14000, target: 15000 },
      { date: 'Oct 2023', revenue: 16000, target: 17000 },
      { date: 'Jan 2024', revenue: 18000, target: 20000 },
      { date: 'Apr 2024', revenue: 20000, target: 22000 },
      { date: 'Jul 2024', revenue: 22000, target: 24000 },
      { date: 'Oct 2024', revenue: 24000, target: 28000 }
    ]
  },
  sessions: [
    { country: 'United States', sessions: 845, percentage: 12.8, flag: '🇺🇸' },
    { country: 'United Kingdom', sessions: 612, percentage: 9.3, flag: '🇬🇧' },
    { country: 'Canada', sessions: 498, percentage: 7.6, flag: '🇨🇦' },
    { country: 'Japan', sessions: 382, percentage: 5.8, flag: '🇯🇵' }
  ],
  regionSales: [
    { region: 'North America', sales: 2143 },
    { region: 'Europe', sales: 1879 },
    { region: 'Asia', sales: 1545 },
    { region: 'Oceania', sales: 890 },
    { region: 'South America', sales: 578 },
    { region: 'Africa', sales: 392 }
  ],
  platformSales: [
    { platform: 'Shopify', percentage: 40, icon: 'S' },
    { platform: 'WooCommerce', percentage: 30, icon: 'W' },
    { platform: 'Magento', percentage: 30, icon: 'M' }
  ],
  userStats: {
    totalUsers: 1764,
    premiumUsers: 891,
    basicUsers: 873
  }
};

const realData = {
  stats: {
    totalIncome: {
      title: 'Total Income',
      value: '$32,499.93',
      change: 12.95,
      period: 'Compared to last month'
    },
    profit: {
      title: 'Profit',
      value: '$10,499.93',
      change: -0.33,
      period: 'Compared to last month'
    },
    totalViews: {
      title: 'Total Views',
      value: '5,211,832',
      change: 0.32,
      period: 'Compared to last month'
    },
    conversionRate: {
      title: 'Conversion Rate',
      value: '4.83%',
      change: 8.05,
      period: 'Compared to last month'
    }
  },
  revenue: {
    totalRevenue: 32839.99,
    totalTarget: 30932.12,
    revenuePercent: 55,
    targetPercent: 45,
    chartData: [
      { date: 'Mar 2023', revenue: 20000, target: 18000 },
      { date: 'Jun 2023', revenue: 22000, target: 19000 },
      { date: 'Sep 2023', revenue: 17000, target: 18000 },
      { date: 'Dec 2023', revenue: 19000, target: 17000 },
      { date: 'Mar 2024', revenue: 21000, target: 19000 },
      { date: 'Jun 2024', revenue: 25000, target: 20000 },
      { date: 'Sep 2024', revenue: 29000, target: 23000 },
      { date: 'Dec 2024', revenue: 32000, target: 26000 }
    ]
  },
  sessions: [
    { country: 'Australia', sessions: 634, percentage: 8, flag: '🇦🇺' },
    { country: 'Indonesia', sessions: 589, percentage: 7.2, flag: '🇮🇩' },
    { country: 'Thailand', sessions: 562, percentage: 6.2, flag: '🇹🇭' },
    { country: 'Germany', sessions: 453, percentage: 5.4, flag: '🇩🇪' }
  ],
  regionSales: [
    { region: 'Europe', sales: 2728 },
    { region: 'Americas', sales: 2409 },
    { region: 'Asia', sales: 2843 },
    { region: 'Africa', sales: 3028 },
    { region: 'Pacific', sales: 1838 },
    { region: 'Middle East', sales: 800 }
  ],
  platformSales: [
    { platform: 'Amazon', percentage: 45, icon: 'A' },
    { platform: 'Tokopedia', percentage: 25, icon: 'T' },
    { platform: 'Alibaba', percentage: 30, icon: 'L' }
  ],
  userStats: {
    totalUsers: 2324,
    premiumUsers: 1809,
    basicUsers: 515
  }
};

// Default widgets for first-time setup
const defaultWidgets = [
  { id: 'totalIncome', title: 'Total Income', type: 'statCard', defaultSize: { w: 1, h: 1 }, defaultPosition: { x: 0, y: 0 } },
  { id: 'profit', title: 'Profit', type: 'statCard', defaultSize: { w: 1, h: 1 }, defaultPosition: { x: 1, y: 0 } },
  { id: 'totalViews', title: 'Total Views', type: 'statCard', defaultSize: { w: 1, h: 1 }, defaultPosition: { x: 2, y: 0 } },
  { id: 'conversionRate', title: 'Conversion Rate', type: 'statCard', defaultSize: { w: 1, h: 1 }, defaultPosition: { x: 3, y: 0 } },
  { id: 'revenueChart', title: 'Revenue Over Time', type: 'chart', defaultSize: { w: 2, h: 1 }, defaultPosition: { x: 0, y: 1 } },
  { id: 'sessionsByCountry', title: 'Sessions by Country', type: 'chart', defaultSize: { w: 1, h: 1 }, defaultPosition: { x: 2, y: 1 } },
  { id: 'regionSalesChart', title: 'Sales by Region', type: 'chart', defaultSize: { w: 1, h: 1 }, defaultPosition: { x: 0, y: 2 } },
  { id: 'platformSalesChart', title: 'Sales by e-commerce platform', type: 'chart', defaultSize: { w: 1, h: 1 }, defaultPosition: { x: 1, y: 2 } },
  { id: 'userStatsChart', title: 'Registered users', type: 'chart', defaultSize: { w: 1, h: 1 }, defaultPosition: { x: 2, y: 2 } }
];

module.exports = {
  demoData,
  realData,
  defaultWidgets
};
