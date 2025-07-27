import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import Navigation from './components/Navigation';

// Vendor Components
import Marketplace from './components/vendor/Marketplace';
import GroupOrders from './components/vendor/GroupOrders';
import MyOrders from './components/vendor/MyOrders';
import PriceTrends from './components/vendor/PriceTrends';

// Supplier Components
import Products from './components/supplier/Products';
import Orders from './components/supplier/Orders';

interface User {
  id: string;
  name: string;
  phone: string;
  location: string;
  userType: 'vendor' | 'supplier';
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('marketplace');

  const handleLogin = (userType: 'vendor' | 'supplier', userData: any) => {
    setUser({ ...userData, userType });
    
    // Set default tab based on user type
    if (userType === 'vendor') {
      setActiveTab('marketplace');
    } else {
      setActiveTab('products');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('marketplace');
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderContent = () => {
    if (user.userType === 'vendor') {
      switch (activeTab) {
        case 'marketplace':
          return <Marketplace />;
        case 'group-orders':
          return <GroupOrders />;
        case 'my-orders':
          return <MyOrders />;
        case 'price-trends':
          return <PriceTrends />;
        default:
          return <Marketplace />;
      }
    } else {
      switch (activeTab) {
        case 'products':
          return <Products />;
        case 'orders':
          return <Orders />;
        case 'group-orders':
          return <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Group Orders Management</h2>
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-600">Group orders management interface coming soon...</p>
            </div>
          </div>;
        case 'analytics':
          return <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Analytics Dashboard</h2>
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-600">Analytics dashboard coming soon...</p>
            </div>
          </div>;
        default:
          return <Products />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        userType={user.userType}
        userName={user.name}
        onLogout={handleLogout}
      />
      
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;