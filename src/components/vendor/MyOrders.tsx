import React, { useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, Truck, Calendar, Users } from 'lucide-react';

interface Order {
  id: string;
  productName: string;
  supplierName: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalAmount: number;
  orderDate: string;
  deliveryDate: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  isGroupOrder: boolean;
  groupOrderId?: string;
  deliveryLocation?: string;
}

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: '1',
    productName: 'Onions',
    supplierName: 'Delhi Fresh Vegetables',
    quantity: 15,
    unit: 'kg',
    pricePerUnit: 18,
    totalAmount: 270,
    orderDate: '2025-01-14T10:00:00Z',
    deliveryDate: '2025-01-16T10:00:00Z',
    status: 'confirmed',
    isGroupOrder: true,
    groupOrderId: '1',
    deliveryLocation: 'Connaught Place Metro Station'
  },
  {
    id: '2',
    productName: 'Basmati Rice',
    supplierName: 'Quality Grains & Pulses',
    quantity: 10,
    unit: 'kg',
    pricePerUnit: 65,
    totalAmount: 650,
    orderDate: '2025-01-13T17:30:00Z',
    deliveryDate: '2025-01-15T11:00:00Z',
    status: 'delivered',
    isGroupOrder: true,
    groupOrderId: '3',
    deliveryLocation: 'Lajpat Nagar Central Market'
  },
  {
    id: '3',
    productName: 'Cooking Oil',
    supplierName: 'Metro Oil & Dairy',
    quantity: 5,
    unit: 'litre',
    pricePerUnit: 100,
    totalAmount: 500,
    orderDate: '2025-01-14T15:00:00Z',
    deliveryDate: '2025-01-18T08:00:00Z',
    status: 'confirmed',
    isGroupOrder: true,
    groupOrderId: '4',
    deliveryLocation: 'India Gate Parking'
  },
  {
    id: '4',
    productName: 'Red Chili Powder',
    supplierName: 'Spice World Wholesale',
    quantity: 2,
    unit: 'kg',
    pricePerUnit: 180,
    totalAmount: 360,
    orderDate: '2025-01-11T11:15:00Z',
    deliveryDate: '2025-01-13T16:00:00Z',
    status: 'cancelled',
    isGroupOrder: false
  },
  {
    id: '5',
    productName: 'Tomatoes',
    supplierName: 'Delhi Fresh Vegetables',
    quantity: 8,
    unit: 'kg',
    pricePerUnit: 22,
    totalAmount: 176,
    orderDate: '2025-01-12T09:30:00Z',
    deliveryDate: '2025-01-14T14:00:00Z',
    status: 'delivered',
    isGroupOrder: false
  }
];

export default function MyOrders() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'delivered' | 'cancelled'>('all');

  const filteredOrders = mockOrders.filter(order => 
    filter === 'all' || order.status === filter
  );

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalOrderValue = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = filteredOrders.length;
  const deliveredOrders = mockOrders.filter(o => o.status === 'delivered').length;
  const groupOrders = filteredOrders.filter(o => o.isGroupOrder).length;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">My Orders</h2>
        <p className="text-gray-600 text-lg">Track your order history and delivery status</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-gray-900">{deliveredOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Group Orders</p>
              <p className="text-2xl font-bold text-gray-900">{groupOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-bold text-lg">₹</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalOrderValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
        {(['all', 'pending', 'confirmed', 'delivered', 'cancelled'] as const).map((filterOption) => (
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

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{order.productName}</h3>
                    <p className="text-sm text-gray-500">by {order.supplierName}</p>
                  </div>
                  <div className="flex space-x-2">
                    {order.isGroupOrder && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        <Users className="w-3 h-3 mr-1" />
                        Group Order
                      </span>
                    )}
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                  <div>
                    <span className="text-gray-500">Quantity:</span>
                    <p className="font-semibold text-gray-900">{order.quantity} {order.unit}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Price per {order.unit}:</span>
                    <p className="font-semibold text-gray-900">₹{order.pricePerUnit}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Order Date:</span>
                    <p className="font-semibold text-gray-900">{formatDate(order.orderDate)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Delivery Date:</span>
                    <p className="font-semibold text-gray-900">{formatDate(order.deliveryDate)}</p>
                  </div>
                </div>

                {order.deliveryLocation && (
                  <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
                    <Truck className="w-4 h-4" />
                    <span>Delivery at: {order.deliveryLocation}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 lg:mt-0 lg:ml-8 flex flex-col items-start lg:items-end space-y-3">
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">₹{order.totalAmount}</p>
                  <p className="text-sm text-gray-500">Total Amount</p>
                </div>
                
                {order.status === 'confirmed' && (
                  <div className="flex items-center space-x-2 text-sm text-blue-600">
                    <Clock className="w-4 h-4" />
                    <span>Preparing for delivery</span>
                  </div>
                )}
                
                {order.status === 'delivered' && (
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Successfully delivered</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-16">
          <Package className="mx-auto h-16 w-16 text-gray-400 mb-6" />
          <h3 className="text-xl font-medium text-gray-900 mb-3">No orders found</h3>
          <p className="text-gray-500">
            {filter === 'all' 
              ? 'You haven\'t placed any orders yet'
              : `No ${filter} orders found`
            }
          </p>
        </div>
      )}
    </div>
  );
}