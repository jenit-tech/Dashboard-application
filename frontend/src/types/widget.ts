
export interface WidgetDefinition {
  id: string;
  title: string;
  type: 'statCard' | 'chart' | 'table' | 'custom';
  defaultSize: {
    w: number;
    h: number;
  };
  defaultPosition: {
    x: number;
    y: number;
  };
  minSize?: {
    w: number;
    h: number;
  };
  config?: {
    dataSource?: 'api' | 'custom';
    endpoint?: string;
    data?: any;
    [key: string]: any;
  };
}

export interface DashboardLayout {
  id: string;
  name: string;
  widgets: WidgetDefinition[];
  userId: string;
  isDefault: boolean;
}
