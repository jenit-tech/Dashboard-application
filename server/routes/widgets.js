
const express = require('express');
const router = express.Router();

// Get available widgets
router.get('/', (req, res) => {
 
  const availableWidgets = [
    { id: 'totalIncome', title: 'Total Income', type: 'statCard' },
    { id: 'profit', title: 'Profit', type: 'statCard' },
    { id: 'totalViews', title: 'Total Views', type: 'statCard' },
    { id: 'conversionRate', title: 'Conversion Rate', type: 'statCard' },
    { id: 'revenueChart', title: 'Revenue Over Time', type: 'chart' },
    { id: 'sessionsByCountry', title: 'Sessions by Country', type: 'chart' },
    { id: 'regionSalesChart', title: 'Sales by Region', type: 'chart' },
    { id: 'platformSalesChart', title: 'Sales by e-commerce platform', type: 'chart' },
    { id: 'userStatsChart', title: 'Registered users', type: 'chart' },
  ];
  
  res.json(availableWidgets);
});

module.exports = router;
