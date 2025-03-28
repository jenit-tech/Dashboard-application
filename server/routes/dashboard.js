
const express = require('express');
const router = express.Router();
const Dashboard = require('../models/Dashboard');
const dashboardData = require('../data/dashboardData');
const mongoose = require('mongoose');


router.get('/data', async (req, res) => {
  try {

    const demoMode = req.query.demoMode === 'true';
    
    console.log('Backend received demoMode request:', demoMode);
    
 
    if (demoMode) {
      res.json(dashboardData.realData);
    } else {
      res.json(dashboardData.demoData);
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
});

router.get('/widgets', async (req, res) => {
  try {
  
    const widgets = await Dashboard.findOne({ isDefault: true });
    
    if (widgets && widgets.widgets && widgets.widgets.length > 0) {
      return res.json(widgets.widgets);
    }
    
   
    res.json(dashboardData.defaultWidgets);
  } catch (error) {
    console.error('Error fetching widgets:', error);
    res.status(500).json({ message: 'Error fetching widgets' });
  }
});

router.post('/widgets', async (req, res) => {
  try {
    const { widgets } = req.body;
    
    if (!widgets || !Array.isArray(widgets)) {
      return res.status(400).json({ message: 'Invalid widgets data' });
    }
    
    console.log('Saving widgets to database:', widgets.length);
    
  
    const userId = mongoose.Types.ObjectId();
   
    let dashboard = await Dashboard.findOne({ isDefault: true });
    
    if (!dashboard) {
      dashboard = new Dashboard({
        id: `dashboard-${Date.now()}`,
        name: 'Default Dashboard',
        widgets: [],
        userId,
        isDefault: true
      });
    }
    
 
    dashboard.widgets = widgets;
    await dashboard.save();
    
    res.status(200).json({ message: 'Widgets saved successfully' });
  } catch (error) {
    console.error('Error saving widgets:', error);
    res.status(500).json({ message: 'Error saving widgets' });
  }
});


router.put('/widgets/:widgetId', async (req, res) => {
  try {
    const { widgetId } = req.params;
    const { widget } = req.body;
    
    if (!widget || !widget.id) {
      return res.status(400).json({ message: 'Invalid widget data' });
    }
    
    console.log('Updating widget:', widgetId);
    

    const dashboard = await Dashboard.findOne({ isDefault: true });
    
    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found' });
    }

    const widgetIndex = dashboard.widgets.findIndex(w => w.id === widgetId);
    
    if (widgetIndex === -1) {
      return res.status(404).json({ message: 'Widget not found' });
    }
    
    dashboard.widgets[widgetIndex] = widget;
    await dashboard.save();
    
    res.status(200).json({ message: 'Widget updated successfully' });
  } catch (error) {
    console.error('Error updating widget:', error);
    res.status(500).json({ message: 'Error updating widget' });
  }
});


router.delete('/widgets/:widgetId', async (req, res) => {
  try {
    const { widgetId } = req.params;
    
    console.log('Deleting widget:', widgetId);
    

    const dashboard = await Dashboard.findOne({ isDefault: true });
    
    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found' });
    }
    

    dashboard.widgets = dashboard.widgets.filter(w => w.id !== widgetId);
    await dashboard.save();
    
    res.status(200).json({ message: 'Widget deleted successfully' });
  } catch (error) {
    console.error('Error deleting widget:', error);
    res.status(500).json({ message: 'Error deleting widget' });
  }
});


router.get('/layout/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    

    let dashboard = await Dashboard.findOne({ 
      userId, 
      isDefault: true 
    });
    
  
    if (!dashboard) {
      dashboard = new Dashboard({
        id: `dashboard-${Date.now()}`,
        name: 'Default Dashboard',
        widgets: dashboardData.defaultWidgets,
        userId,
        isDefault: true
      });
      
      await dashboard.save();
    }
    
    res.json(dashboard);
  } catch (error) {
    console.error('Error fetching dashboard layout:', error);
    res.status(500).json({ message: 'Error fetching dashboard layout' });
  }
});


router.post('/layout', async (req, res) => {
  try {
    const { dashboardId, widgets, userId } = req.body;
    
    
    console.log('Received layout to save:', widgets);
 
    const defaultUserId = userId || mongoose.Types.ObjectId();
  
    let dashboard = await Dashboard.findOne({ isDefault: true });
    
    if (!dashboard) {
      dashboard = new Dashboard({
        id: dashboardId || `dashboard-${Date.now()}`,
        name: 'Default Dashboard',
        widgets,
        userId: defaultUserId,
        isDefault: true
      });
    } else {
      dashboard.widgets = widgets;
    }
    
    await dashboard.save();
    
    res.status(200).json({ message: 'Layout saved successfully' });
  } catch (error) {
    console.error('Error saving dashboard layout:', error);
    res.status(500).json({ message: 'Error saving dashboard layout' });
  }
});

module.exports = router;
