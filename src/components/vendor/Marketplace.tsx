import React, { useState } from 'react';
import { Package, Search, Filter, Star, Truck, Clock, ArrowUp, ArrowDown, Users } from 'lucide-react';
import { mockProducts, mockSuppliers, mockGroupOrders } from '../../data/mockData';
import { Product, Supplier } from '../../types';

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showCreateGroupOrder, setShowCreateGroupOrder] = useState<string | null>(null);
  const [groupOrderQuantity, setGroupOrderQuantity] = useState<{ [key: string]: number }>({});

  const categories = ['all', 'Vegetables', 'Spices', 'Grains', 'Oils'];
  
  const filteredProducts = mockProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.marketPrice - b.marketPrice;
        case 'savings':
          return (b.marketPrice - b.bulkPrice) - (a.marketPrice - a.bulkPrice);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const getSupplier = (supplierId: string): Supplier | undefined => {
    return mockSuppliers.find(s => s.id === supplierId);
  };

  const calculateSavings = (product: Product) => {
    const savings = product.marketPrice - product.bulkPrice;
    const percentage = Math.round((savings / product.marketPrice) * 100);
    return { amount: savings, percentage };
  };

  const getActiveGroupOrder = (productId: string) => {
    return mockGroupOrders.find(order => 
      order.productId === productId && order.status === 'active'
    );
  };

  const handleCreateGroupOrder = (productId: string) => {
    const quantity = groupOrderQuantity[productId] || 1;
    // In a real app, this would make an API call
    alert(`Created group order for ${quantity} units! Other vendors can now join.`);
    setShowCreateGroupOrder(null);
    setGroupOrderQuantity({ ...groupOrderQuantity, [productId]: 1 });
  };

  const handleJoinGroupOrder = (orderId: string, productId: string) => {
    const quantity = groupOrderQuantity[productId] || 1;
    // In a real app, this would make an API call
    alert(`Joined group order with ${quantity} units!`);
    setGroupOrderQuantity({ ...groupOrderQuantity, [productId]: 1 });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Marketplace</h2>
        <p className="text-gray-600 text-lg">Compare prices and join group orders to get wholesale rates</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent min-w-[150px]"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent min-w-[150px]"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="savings">Sort by Savings</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => {
          const supplier = getSupplier(product.supplierId);
          const savings = calculateSavings(product);
          const activeGroupOrder = getActiveGroupOrder(product.id);
          
          return (
            <div key={product.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="p-6">
                {/* Product Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">per {product.unit}</div>
                    {product.inStock ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Market Price:</span>
                    <span className="text-xl font-semibold text-gray-900">₹{product.marketPrice}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Bulk Price:</span>
                    <span className="text-xl font-semibold text-green-600">₹{product.bulkPrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">You Save:</span>
                    <div className="text-right">
                      <span className="text-lg font-semibold text-orange-600">₹{savings.amount}</span>
                      <span className="text-sm text-orange-600 ml-1">({savings.percentage}% off)</span>
                    </div>
                  </div>
                </div>

                {/* Bulk Requirements */}
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Minimum bulk quantity:</div>
                  <div className="text-lg font-semibold text-gray-900">{product.minBulkQuantity} {product.unit}</div>
                </div>

                {/* Active Group Order */}
                {activeGroupOrder && (
                  <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-orange-800">Active Group Order</span>
                      <Users className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="text-sm text-orange-700 mb-2">
                      {activeGroupOrder.currentQuantity} / {activeGroupOrder.targetQuantity} {product.unit}
                    </div>
                    <div className="w-full bg-orange-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all"
                        style={{ width: `${(activeGroupOrder.currentQuantity / activeGroupOrder.targetQuantity) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-orange-600">
                      {activeGroupOrder.participants.length} vendors participating
                    </div>
                  </div>
                )}

                {/* Supplier Info */}
                {supplier && (
                  <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{supplier.name}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{supplier.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Truck size={12} className="mr-1" />
                      {supplier.deliveryAreas.join(', ')}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  {activeGroupOrder ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="1"
                          max={activeGroupOrder.targetQuantity - activeGroupOrder.currentQuantity}
                          value={groupOrderQuantity[product.id] || 1}
                          onChange={(e) => setGroupOrderQuantity({ 
                            ...groupOrderQuantity, 
                            [product.id]: parseInt(e.target.value) || 1 
                          })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Quantity"
                        />
                        <span className="text-sm text-gray-500">{product.unit}</span>
                      </div>
                      <button
                        onClick={() => handleJoinGroupOrder(activeGroupOrder.id, product.id)}
                        disabled={!product.inStock}
                        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors"
                      >
                        Join Group Order
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {showCreateGroupOrder === product.id ? (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              min="1"
                              max={product.minBulkQuantity}
                              value={groupOrderQuantity[product.id] || 1}
                              onChange={(e) => setGroupOrderQuantity({ 
                                ...groupOrderQuantity, 
                                [product.id]: parseInt(e.target.value) || 1 
                              })}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              placeholder="Your quantity"
                            />
                            <span className="text-sm text-gray-500">{product.unit}</span>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setShowCreateGroupOrder(null)}
                              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleCreateGroupOrder(product.id)}
                              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                            >
                              Create
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowCreateGroupOrder(product.id)}
                          disabled={!product.inStock}
                          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors"
                        >
                          {product.inStock ? 'Start Group Order' : 'Out of Stock'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <Package className="mx-auto h-16 w-16 text-gray-400 mb-6" />
          <h3 className="text-xl font-medium text-gray-900 mb-3">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}