
import { DashboardData } from '@/types/dashboard';
import { WidgetDefinition } from '@/types/widget';


const API_URL = 'http://localhost:5000/api';


const fetchDashboardData = async (demoMode: boolean): Promise<DashboardData> => {
  try {

    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Fetching data from backend with demoMode:', demoMode);
   
    const response = await fetch(`${API_URL}/dashboard/data?demoMode=${demoMode}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }
    
    const data = await response.json();
    console.log('Received data from backend:', data);
    return data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

const saveDashboardLayout = async (widgets: WidgetDefinition[]): Promise<void> => {
  try {
   
    await new Promise(resolve => setTimeout(resolve, 500));
    
   
    const response = await fetch(`${API_URL}/dashboard/layout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ widgets }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save dashboard layout');
    }
    
    console.log('Dashboard layout saved successfully');
  } catch (error) {
    console.error('Error saving dashboard layout:', error);
    throw error;
  }
};


const fetchWidgets = async (): Promise<WidgetDefinition[]> => {
  try {

    const response = await fetch(`${API_URL}/dashboard/widgets`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch widgets');
    }
    
    const widgets = await response.json();
    return widgets;
  } catch (error) {
    console.error('Error fetching widgets:', error);
    throw error;
  }
};


const saveWidgets = async (widgets: WidgetDefinition[]): Promise<void> => {
  try {
  
    const response = await fetch(`${API_URL}/dashboard/widgets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ widgets }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save widgets');
    }
  } catch (error) {
    console.error('Error saving widgets:', error);
    throw error;
  }
};


const updateWidget = async (widget: WidgetDefinition): Promise<void> => {
  try {
  
    const response = await fetch(`${API_URL}/dashboard/widgets/${widget.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ widget }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update widget');
    }
  } catch (error) {
    console.error('Error updating widget:', error);
    throw error;
  }
};


const deleteWidget = async (widgetId: string): Promise<void> => {
  try {

    const response = await fetch(`${API_URL}/dashboard/widgets/${widgetId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete widget');
    }
  } catch (error) {
    console.error('Error deleting widget:', error);
    throw error;
  }
};

export const api = {
  fetchDashboardData,
  saveDashboardLayout,
  fetchWidgets,
  saveWidgets,
  updateWidget,
  deleteWidget
};
