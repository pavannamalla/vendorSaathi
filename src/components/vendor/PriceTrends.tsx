import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Calendar, BarChart3, AlertTriangle, Info } from 'lucide-react';

interface PriceData {
  productName: string;
  category: string;
  currentPrice: number;
  previousPrice: number;
  weeklyChange: number;
  monthlyChange: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  forecast: 'rising' | 'falling' | 'stable';
}

const mockPriceData: PriceData[] = [
  {
    productName: 'Onions',
    category: 'Vegetables',
    currentPrice: 25,
    previousPrice: 22,
    weeklyChange: 13.6,
    monthlyChange: 25.0,
    unit: 'kg',
    trend: 'up',
    forecast: 'rising'
  },
  {
    productName: 'Tomatoes',
    category: 'Vegetables',
    currentPrice: 30,
    previousPrice: 35,
    weeklyChange: -14.3,
    monthlyChange: -12.5,
    unit: 'kg',
    trend: 'down',
    forecast: 'stable'
  },
  {
    productName: 'Potatoes',
    category: 'Vegetables',
    currentPrice: 20,
    previousPrice: 20,
    weeklyChange: 0,
    monthlyChange: 5.3,
    unit: 'kg',
    trend: 'stable',
    forecast: 'stable'
  },
  {
    productName: 'Red Chili Powder',
    category: 'Spices',
    currentPrice: 180,
    previousPrice: 175,
    weeklyChange: 2.9,
    monthlyChange: 8.4,
    unit: 'kg',
    trend: 'up',
    forecast: 'rising'
  },
  {
    productName: 'Turmeric Powder',
    category: 'Spices',
    currentPrice: 150,
    previousPrice: 160,
    weeklyChange: -6.3,
    monthlyChange: -3.2,
    unit: 'kg',
    trend: 'down',
    forecast: 'falling'
  },
  {
    productName: 'Basmati Rice',
    category: 'Grains',
    currentPrice: 80,
    previousPrice: 78,
    weeklyChange: 2.6,
    monthlyChange: 14.3,
    unit: 'kg',
    trend: 'up',
    forecast: 'stable'
  },
  {
    productName: 'Whole Wheat Flour',
    category: 'Grains',
    currentPrice: 35,
    previousPrice: 35,
    weeklyChange: 0,
    monthlyChange: 2.9,
    unit: 'kg',
    trend: 'stable',
    forecast: 'stable'
  },
  {
    productName: 'Cooking Oil',
    category: 'Oils',
    currentPrice: 120,
    previousPrice: 125,
    weeklyChange: -4.0,
    monthlyChange: -8.0,
    unit: 'litre',
    trend: 'down',
    forecast: 'falling'
  },
  {
    productName: 'Green Chilies',
    category: 'Vegetables',
    currentPrice: 40,
    previousPrice: 38,
    weeklyChange: 5.3,
    monthlyChange: 18.2,
    unit: 'kg',
    trend: 'up',
    forecast: 'rising'
  },
  {
    productName: 'Garam Masala',
    category: 'Spices',
    currentPrice: 200,
    previousPrice: 195,
    weeklyChange: 2.6,
    monthlyChange: 7.1,
    unit: 'kg',
    trend: 'up',
    forecast: 'stable'
  }
];

export default function PriceTrends() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['all', 'Vegetables', 'Spices', 'Grains', 'Oils'];

  const filteredData = mockPriceData
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.currentPrice - a.currentPrice;
        case 'weekly':
          return Math.abs(b.weeklyChange) - Math.abs(a.weeklyChange);
        case 'monthly':
          return Math.abs(b.monthlyChange) - Math.abs(a.monthlyChange);
        default:
          return a.productName.localeCompare(b.productName);
      }
    });

  const getTrendIcon = (trend: PriceData['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-green-500" />;
      case 'stable':
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getForecastIcon = (forecast: PriceData['forecast']) => {
    switch (forecast) {
      case 'rising':
        return <TrendingUp className="w-3 h-3 text-red-500" />;
      case 'falling':
        return <TrendingDown className="w-3 h-3 text-green-500" />;
      case 'stable':
        return <Minus className="w-3 h-3 text-gray-500" />;
    }
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-red-600';
    if (change < 0) return 'text-green-600';
    return 'text-gray-600';
  };

  const getChangeBgColor = (change: number) => {
    if (change > 0) return 'bg-red-50 border-red-200';
    if (change < 0) return 'bg-green-50 border-green-200';
    return 'bg-gray-50 border-gray-200';
  };

  const risingPrices = mockPriceData.filter(item => item.weeklyChange > 0).length;
  const fallingPrices = mockPriceData.filter(item => item.weeklyChange < 0).length;
  const stablePrices = mockPriceData.filter(item => item.weeklyChange === 0).length;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Price Trends</h2>
        <p className="text-gray-600 text-lg">Monitor market price changes to make informed purchasing decisions</p>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Price Increases</p>
              <p className="text-3xl font-bold text-red-600">{risingPrices}</p>
              <p className="text-xs text-gray-500">products this week</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Price Decreases</p>
              <p className="text-3xl font-bold text-green-600">{fallingPrices}</p>
              <p className="text-xs text-gray-500">products this week</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Stable Prices</p>
              <p className="text-3xl font-bold text-gray-600">{stablePrices}</p>
              <p className="text-xs text-gray-500">products this week</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="name">Product Name</option>
              <option value="price">Current Price</option>
              <option value="weekly">Weekly Change</option>
              <option value="monthly">Monthly Change</option>
            </select>
          </div>
        </div>
      </div>

      {/* Price Trends Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {filteredData.map((item, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{item.productName}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getTrendIcon(item.trend)}
                <span className="text-sm text-gray-600 capitalize">{item.trend}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Current Price</p>
                <p className="text-2xl font-bold text-gray-900">₹{item.currentPrice}</p>
                <p className="text-xs text-gray-500">per {item.unit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Previous Price</p>
                <p className="text-lg font-semibold text-gray-700">₹{item.previousPrice}</p>
                <p className="text-xs text-gray-500">per {item.unit}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className={`p-3 rounded-lg border ${getChangeBgColor(item.weeklyChange)}`}>
                <p className="text-xs text-gray-600 mb-1">Weekly Change</p>
                <p className={`text-lg font-semibold ${getChangeColor(item.weeklyChange)}`}>
                  {item.weeklyChange > 0 ? '+' : ''}{item.weeklyChange.toFixed(1)}%
                </p>
              </div>
              <div className={`p-3 rounded-lg border ${getChangeBgColor(item.monthlyChange)}`}>
                <p className="text-xs text-gray-600 mb-1">Monthly Change</p>
                <p className={`text-lg font-semibold ${getChangeColor(item.monthlyChange)}`}>
                  {item.monthlyChange > 0 ? '+' : ''}{item.monthlyChange.toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Forecast:</span>
                {getForecastIcon(item.forecast)}
                <span className="text-sm font-medium text-gray-900 capitalize">{item.forecast}</span>
              </div>
              {item.forecast === 'rising' && (
                <div className="flex items-center space-x-1 text-orange-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-xs">Consider buying now</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Market Insights */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
            <Info className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Market Insights & Recommendations</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <p>Onion prices have increased by 25% this month due to seasonal demand - consider joining group orders for better rates</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <p>Cooking oil prices are trending down - good time to stock up for the next month</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <p>Spice prices are volatile due to weather conditions - consider group buying for better stability</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <p>Green chili prices expected to rise further - stock up now or join active group orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}