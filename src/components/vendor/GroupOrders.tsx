import React, { useState } from 'react';
import { Users, Clock, MapPin, Package, CheckCircle, AlertCircle, User, Calendar } from 'lucide-react';
import { mockGroupOrders, mockProducts, mockSuppliers } from '../../data/mockData';
import { GroupOrder, Product, Supplier } from '../../types';

export default function GroupOrders() {
  const [filter, setFilter] = useState<'all' | 'active' | 'fulfilled'>('all');
  const [joinQuantity, setJoinQuantity] = useState<{ [key: string]: number }>({});

  const filteredOrders = mockGroupOrders.filter(order => 
    filter === 'all' || order.status === filter
  );

  const getProduct = (productId: string): Product | undefined => {
    return mockProducts.find(p => p.id === productId);
  };

  const getSupplier = (supplierId: string): Supplier | undefined => {
    return mockSuppliers.find(s => s.id === supplierId);
  };

  const getTimeRemaining = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h left`;
    }
    return `${hours}h ${minutes}m left`;
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const handleJoinOrder = (orderId: string, productId: string) => {
    const quantity = joinQuantity[orderId] || 1;
    // In a real app, this would make an API call
    alert(`Joined group order with ${quantity} units!`);
    setJoinQuantity({ ...joinQuantity, [orderId]: 1 });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Group Orders</h2>
        <p className="text-gray-600 text-lg">Join group orders to get wholesale prices and save money</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockGroupOrders.filter(o => o.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Fulfilled</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockGroupOrders.filter(o => o.status === 'fulfilled').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 font-bold text-lg">₹</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Potential Savings</p>
              <p className="text-2xl font-bold text-gray-900">₹2,450</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
        {(['all', 'active', 'fulfilled'] as const).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
              filter === filterOption
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>
        ))}
      </div>

      {/* Group Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order) => {
          const product = getProduct(order.productId);
          const supplier = getSupplier(order.supplierId);
          const progress = getProgressPercentage(order.currentQuantity, order.targetQuantity);
          const timeRemaining = getTimeRemaining(order.deadline);
          const needQuantity = order.targetQuantity - order.currentQuantity;

          if (!product || !supplier) return null;

          return (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Package className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500">by {supplier.name}</p>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'fulfilled' ? 'bg-green-100 text-green-800' :
                          order.status === 'active' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status === 'fulfilled' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {order.status === 'active' && timeRemaining === 'Expired' && <AlertCircle className="w-3 h-3 mr-1" />}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">₹{order.pricePerUnit}</div>
                    <div className="text-sm text-gray-500">per {product.unit}</div>
                    <div className="text-sm text-orange-600 font-medium">
                      Save ₹{(mockProducts.find(p => p.id === product.id)?.marketPrice || 0) - order.pricePerUnit} per {product.unit}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-700">Order Progress</span>
                    <span className="text-sm text-gray-500">
                      {order.currentQuantity} / {order.targetQuantity} {product.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        progress === 100 ? 'bg-green-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
                    {needQuantity > 0 && (
                      <span className="text-sm text-orange-600 font-medium">{needQuantity} {product.unit} needed</span>
                    )}
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{timeRemaining}</div>
                      <div className="text-xs text-gray-500">to join</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Delivery</div>
                      <div className="text-xs text-gray-500">{order.deliveryLocation}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{formatDate(order.deliveryDate)}</div>
                      <div className="text-xs text-gray-500">delivery date</div>
                    </div>
                  </div>
                </div>

                {/* Participants */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Participants ({order.participants.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {order.participants.map((participant) => (
                      <div key={participant.vendorId} className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700 font-medium">{participant.vendorName}</span>
                        <span className="text-sm text-gray-500">({participant.quantity} {product.unit})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Section */}
                {order.status === 'active' && needQuantity > 0 && timeRemaining !== 'Expired' && (
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                      <div className="flex items-center space-x-3">
                        <label htmlFor={`quantity-${order.id}`} className="text-sm font-medium text-gray-700">
                          Quantity:
                        </label>
                        <input
                          id={`quantity-${order.id}`}
                          type="number"
                          min="1"
                          max={needQuantity}
                          value={joinQuantity[order.id] || 1}
                          onChange={(e) => setJoinQuantity({ ...joinQuantity, [order.id]: parseInt(e.target.value) || 1 })}
                          className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <span className="text-sm text-gray-500">{product.unit}</span>
                      </div>
                      
                      <button
                        onClick={() => handleJoinOrder(order.id, order.productId)}
                        className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                      >
                        Join Group Order
                      </button>
                      
                      <div className="text-sm text-gray-600">
                        Total: <span className="font-semibold">₹{(joinQuantity[order.id] || 1) * order.pricePerUnit}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-16">
          <Users className="mx-auto h-16 w-16 text-gray-400 mb-6" />
          <h3 className="text-xl font-medium text-gray-900 mb-3">No group orders found</h3>
          <p className="text-gray-500">
            {filter === 'all' 
              ? 'No group orders available at the moment'
              : `No ${filter} group orders available`
            }
          </p>
        </div>
      )}
    </div>
  );
}