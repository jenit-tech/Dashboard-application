
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WidgetDefinition } from '@/types/widget';
import { Plus, Trash2, LayoutGrid, Database } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

interface CustomizeWidgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  widgets: WidgetDefinition[];
  onSave: (widgets: WidgetDefinition[]) => void;
}

const widgetTypes = [
  { value: 'statCard', label: 'Stat Card' },
  { value: 'chart', label: 'Chart' },
  { value: 'table', label: 'Table' },
  { value: 'custom', label: 'Custom' }
];

const predefinedWidgets = [
  { id: 'totalIncome', title: 'Total Income', type: 'statCard' },
  { id: 'profit', title: 'Profit', type: 'statCard' },
  { id: 'totalViews', title: 'Total Views', type: 'statCard' },
  { id: 'conversionRate', title: 'Conversion Rate', type: 'statCard' },
  { id: 'revenueChart', title: 'Revenue Over Time', type: 'chart' },
  { id: 'sessionsByCountry', title: 'Sessions by Country', type: 'chart' },
  { id: 'regionSalesChart', title: 'Sales by Region', type: 'chart' },
  { id: 'platformSalesChart', title: 'Sales by e-commerce platform', type: 'chart' },
  { id: 'userStatsChart', title: 'Registered users', type: 'chart' },
  { id: 'topProducts', title: 'Top Products', type: 'table' },
  { id: 'recentOrders', title: 'Recent Orders', type: 'table' },
  { id: 'customerList', title: 'Customer List', type: 'table' }
];

const CustomizeWidgetDialog: React.FC<CustomizeWidgetDialogProps> = ({
  open,
  onOpenChange,
  widgets,
  onSave
}) => {
  const [editableWidgets, setEditableWidgets] = useState<WidgetDefinition[]>(widgets);
  const [showPredefinedList, setShowPredefinedList] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);
  

  useEffect(() => {
    if (open) {
      setEditableWidgets([...widgets]);
      setShowPredefinedList(false);
      setActiveTab('general');
      setSelectedWidgetId(null);
    }
  }, [open, widgets]);
  
  const handleAddWidget = () => {
    const newWidget: WidgetDefinition = {
      id: `widget-${Date.now()}`,
      title: 'New Widget',
      type: 'statCard',
      defaultSize: { w: 1, h: 1 },
      defaultPosition: { x: 0, y: 0 },
      config: {
        dataSource: 'custom',
        data: {}
      }
    };
    
    setEditableWidgets([...editableWidgets, newWidget]);
    setSelectedWidgetId(newWidget.id);
    toast.success('New widget added');
  };

  const handleAddPredefinedWidget = (predefined: typeof predefinedWidgets[0]) => {

    if (editableWidgets.some(w => w.id === predefined.id)) {
      toast.error(`${predefined.title} is already on your dashboard`);
      return;
    }

    const defaultSize = predefined.type === 'chart' ? { w: 2, h: 1 } : 
                        predefined.type === 'table' ? { w: 2, h: 2 } : 
                        { w: 1, h: 1 };

    const newWidget: WidgetDefinition = {
      id: predefined.id,
      title: predefined.title,
      type: predefined.type as 'statCard' | 'chart' | 'table' | 'custom',
      defaultSize,
      defaultPosition: { x: 0, y: 0 },
      config: {
        dataSource: 'api',
        endpoint: `/api/widgets/${predefined.id}`,
        data: {}
      }
    };
    
    setEditableWidgets([...editableWidgets, newWidget]);
    setSelectedWidgetId(newWidget.id);
    toast.success(`${predefined.title} added to dashboard`);
    setShowPredefinedList(false);
  };
  
  const handleRemoveWidget = (id: string) => {
    setEditableWidgets(editableWidgets.filter(widget => widget.id !== id));
    if (selectedWidgetId === id) {
      setSelectedWidgetId(null);
    }
    toast.success('Widget removed');
  };
  
  const handleWidgetTitleChange = (id: string, title: string) => {
    setEditableWidgets(editableWidgets.map(widget => {
      if (widget.id === id) {
        return { ...widget, title };
      }
      return widget;
    }));
  };
  
  const handleWidgetTypeChange = (id: string, type: 'statCard' | 'chart' | 'table' | 'custom') => {
    setEditableWidgets(editableWidgets.map(widget => {
      if (widget.id === id) {
        
        const defaultSize = type === 'chart' ? { w: 2, h: 1 } : 
                           type === 'table' ? { w: 2, h: 2 } : 
                           { w: 1, h: 1 };
        
        return { 
          ...widget, 
          type,
          defaultSize,
         
          config: {
            ...widget.config,
            data: type === 'table' ? { columns: [], rows: [] } :
                 type === 'chart' ? { series: [], labels: [] } :
                 type === 'statCard' ? { value: '', change: 0, period: 'vs. last period' } :
                 {}
          }
        };
      }
      return widget;
    }));
  };
  
  const handleWidgetConfigChange = (id: string, configKey: string, value: any) => {
    setEditableWidgets(editableWidgets.map(widget => {
      if (widget.id === id) {
        return { 
          ...widget, 
          config: {
            ...widget.config,
            [configKey]: value
          }
        };
      }
      return widget;
    }));
  };
  
  const handleWidgetDataSourceChange = (id: string, dataSource: 'api' | 'custom') => {
    setEditableWidgets(editableWidgets.map(widget => {
      if (widget.id === id) {
        return { 
          ...widget, 
          config: {
            ...widget.config,
            dataSource,
            endpoint: dataSource === 'api' ? `/api/widgets/${widget.id}` : undefined
          }
        };
      }
      return widget;
    }));
  };
  
  const handleSave = () => {
    onSave(editableWidgets);
    toast.success('Dashboard layout saved successfully');
    onOpenChange(false);
  };

  const handleCancel = () => {
    setEditableWidgets(widgets);
    onOpenChange(false);
  };
  
  const renderWidgetForm = (widget: WidgetDefinition) => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor={`widget-title-${widget.id}`}>Widget Title</Label>
              <Input 
                id={`widget-title-${widget.id}`}
                value={widget.title}
                onChange={(e) => handleWidgetTitleChange(widget.id, e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Widget Type</Label>
              <Select 
                value={widget.type} 
                onValueChange={(value: 'statCard' | 'chart' | 'table' | 'custom') => handleWidgetTypeChange(widget.id, value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {widgetTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Size</Label>
              <div className="flex gap-2 mt-1">
                <div>
                  <Label htmlFor={`widget-width-${widget.id}`} className="text-xs">Width</Label>
                  <Select 
                    value={widget.defaultSize.w.toString()} 
                    onValueChange={(value) => setEditableWidgets(editableWidgets.map(w => {
                      if (w.id === widget.id) {
                        return { 
                          ...w, 
                          defaultSize: { 
                            ...w.defaultSize, 
                            w: parseInt(value) 
                          } 
                        };
                      }
                      return w;
                    }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Width" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 (Small)</SelectItem>
                      <SelectItem value="2">2 (Medium)</SelectItem>
                      <SelectItem value="3">3 (Large)</SelectItem>
                      <SelectItem value="4">4 (Full Width)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`widget-height-${widget.id}`} className="text-xs">Height</Label>
                  <Select 
                    value={widget.defaultSize.h.toString()} 
                    onValueChange={(value) => setEditableWidgets(editableWidgets.map(w => {
                      if (w.id === widget.id) {
                        return { 
                          ...w, 
                          defaultSize: { 
                            ...w.defaultSize, 
                            h: parseInt(value) 
                          } 
                        };
                      }
                      return w;
                    }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Height" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 (Small)</SelectItem>
                      <SelectItem value="2">2 (Medium)</SelectItem>
                      <SelectItem value="3">3 (Large)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'data':
        return (
          <div className="space-y-4">
            <div>
              <Label>Data Source</Label>
              <Select 
                value={widget.config?.dataSource || 'api'} 
                onValueChange={(value: 'api' | 'custom') => handleWidgetDataSourceChange(widget.id, value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select data source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="api">API Endpoint (Backend)</SelectItem>
                  <SelectItem value="custom">Custom Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {widget.config?.dataSource === 'api' ? (
              <div>
                <Label>API Endpoint</Label>
                <Input 
                  value={widget.config?.endpoint || `/api/widgets/${widget.id}`}
                  onChange={(e) => handleWidgetConfigChange(widget.id, 'endpoint', e.target.value)}
                  className="mt-1 font-mono text-sm"
                  disabled={true}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This widget will fetch data from the backend API endpoint.
                </p>
              </div>
            ) : (
              <div>
                <Label>Custom Data</Label>
                {widget.type === 'statCard' && (
                  <div className="space-y-2 mt-2">
                    <div>
                      <Label htmlFor={`stat-value-${widget.id}`} className="text-xs">Value</Label>
                      <Input 
                        id={`stat-value-${widget.id}`}
                        value={widget.config?.data?.value || ''}
                        onChange={(e) => handleWidgetConfigChange(widget.id, 'data', {
                          ...widget.config?.data,
                          value: e.target.value
                        })}
                        className="mt-1"
                        placeholder="e.g. $1,234.56"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`stat-change-${widget.id}`} className="text-xs">Change (%)</Label>
                      <Input 
                        id={`stat-change-${widget.id}`}
                        type="number"
                        value={widget.config?.data?.change || 0}
                        onChange={(e) => handleWidgetConfigChange(widget.id, 'data', {
                          ...widget.config?.data,
                          change: parseFloat(e.target.value)
                        })}
                        className="mt-1"
                        placeholder="e.g. 12.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`stat-period-${widget.id}`} className="text-xs">Period</Label>
                      <Input 
                        id={`stat-period-${widget.id}`}
                        value={widget.config?.data?.period || 'vs. last period'}
                        onChange={(e) => handleWidgetConfigChange(widget.id, 'data', {
                          ...widget.config?.data,
                          period: e.target.value
                        })}
                        className="mt-1"
                        placeholder="e.g. vs. last month"
                      />
                    </div>
                  </div>
                )}
                
                {widget.type === 'chart' && (
                  <div className="mt-2">
                    <Textarea
                      placeholder="Enter chart data in JSON format. Example: { 'labels': ['Jan', 'Feb'], 'series': [10, 20] }"
                      className="font-mono text-sm h-32"
                      value={typeof widget.config?.data === 'object' ? JSON.stringify(widget.config?.data, null, 2) : '{}'}
                      onChange={(e) => {
                        try {
                          const jsonData = JSON.parse(e.target.value);
                          handleWidgetConfigChange(widget.id, 'data', jsonData);
                        } catch (error) {
                        
                        }
                      }}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter valid JSON data for the chart.
                    </p>
                  </div>
                )}
                
                {widget.type === 'table' && (
                  <div className="mt-2">
                    <Textarea
                      placeholder="Enter table data in JSON format. Example: { 'columns': ['Name', 'Value'], 'rows': [['Item 1', 100], ['Item 2', 200]] }"
                      className="font-mono text-sm h-32"
                      value={typeof widget.config?.data === 'object' ? JSON.stringify(widget.config?.data, null, 2) : '{}'}
                      onChange={(e) => {
                        try {
                          const jsonData = JSON.parse(e.target.value);
                          handleWidgetConfigChange(widget.id, 'data', jsonData);
                        } catch (error) {
                        
                        }
                      }}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter valid JSON data for the table.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Customize Widgets</DialogTitle>
          <DialogDescription>
            Add, remove or edit widgets on your dashboard.
          </DialogDescription>
        </DialogHeader>
        
        {showPredefinedList ? (
          <div className="max-h-[60vh] overflow-y-auto py-4">
            <div className="mb-4">
              <Button 
                variant="outline" 
                onClick={() => setShowPredefinedList(false)}
              >
                Back to Widget Editor
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {predefinedWidgets.map((widget) => (
                <Card 
                  key={widget.id} 
                  className={`cursor-pointer hover:border-primary transition-colors ${
                    editableWidgets.some(w => w.id === widget.id) ? 'opacity-50' : ''
                  }`}
                  onClick={() => handleAddPredefinedWidget(widget)}
                >
                  <CardHeader className="py-3 px-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{widget.title}</span>
                      <span className="text-xs px-2 py-1 bg-muted rounded-full">
                        {widget.type === 'statCard' ? 'Stat Card' : 
                         widget.type === 'table' ? 'Table' : 'Chart'}
                      </span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto py-4">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {editableWidgets.map((widget) => (
                  <Card 
                    key={widget.id} 
                    className={`cursor-pointer transition-colors ${
                      selectedWidgetId === widget.id ? 'border-primary' : ''
                    }`}
                    onClick={() => setSelectedWidgetId(widget.id)}
                  >
                    <CardHeader className="py-2 px-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm truncate">{widget.title}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs px-1.5 py-0.5 bg-muted rounded-full">
                            {widget.type === 'statCard' ? 'Stat' : 
                             widget.type === 'table' ? 'Table' : 'Chart'}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-6 w-6 text-destructive hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveWidget(widget.id);
                            }}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
              
              {selectedWidgetId && (
                <Card className="p-4 mt-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">{editableWidgets.find(w => w.id === selectedWidgetId)?.title || 'Widget Settings'}</h3>
                    <div className="flex items-center">
                      <Database className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {editableWidgets.find(w => w.id === selectedWidgetId)?.config?.dataSource === 'api' ? 'API Data' : 'Custom Data'}
                      </span>
                    </div>
                  </div>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-4">
                      <TabsTrigger value="general">General</TabsTrigger>
                      <TabsTrigger value="data">Data</TabsTrigger>
                    </TabsList>
                    <TabsContent value="general">
                      {selectedWidgetId && renderWidgetForm(editableWidgets.find(w => w.id === selectedWidgetId)!)}
                    </TabsContent>
                    <TabsContent value="data">
                      {selectedWidgetId && renderWidgetForm(editableWidgets.find(w => w.id === selectedWidgetId)!)}
                    </TabsContent>
                  </Tabs>
                </Card>
              )}
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 flex-1"
                  onClick={() => setShowPredefinedList(true)}
                >
                  <LayoutGrid size={16} />
                  <span>Add from Predefined</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 flex-1"
                  onClick={handleAddWidget}
                >
                  <Plus size={16} />
                  <span>Create Custom Widget</span>
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizeWidgetDialog;
