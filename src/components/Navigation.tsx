import React from 'react';
import { Users, Package, ShoppingCart, TrendingUp, User, LogOut } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userType: 'vendor' | 'supplier';
  userName: string;
  onLogout: () => void;
}

export default function Navigation({ activeTab, onTabChange, userType, userName, onLogout }: NavigationProps) {
  const vendorTabs = [
    { id: 'marketplace', label: 'Marketplace', icon: Package },
    { id: 'group-orders', label: 'Group Orders', icon: Users },
    { id: 'my-orders', label: 'My Orders', icon: ShoppingCart },
    { id: 'price-trends', label: 'Price Trends', icon: TrendingUp }
  ];

  const supplierTabs = [
    { id: 'products', label: 'My Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'group-orders', label: 'Group Orders', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  const tabs = userType === 'vendor' ? vendorTabs : supplierTabs;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">VS</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">VendorSaathi</h1>
              <p className="text-xs text-gray-500">Group Buying Platform</p>
            </div>
          </div>
          
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-orange-100 text-orange-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-gray-900">{userName}</div>
                <div className="text-xs text-gray-500 capitalize">{userType}</div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}