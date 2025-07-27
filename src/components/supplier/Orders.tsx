import React, { useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, User, MapPin, Calendar, Phone } from 'lucide-react';

interface SupplierOrder {
  id: string;
  productName: string;
  vendorName: string;
  vendorPhone: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalAmount: number;
  orderDate: string;
  deliveryDate: string;
  deliveryLocation: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  isGroupOrder: boolean;
  groupOrderId?: string;
  participantCount?: number;
}

// Mock data for supplier orders
const mockSupplierOrders: SupplierOrder[] = [
  {
    id: '1',
    productName: 'Onions',
    vendorName: 'Rajesh Kumar',
    vendorPhone: '+91 98765 43210',
    quantity: 15,
    unit: 'kg',
    pricePerUnit: 18,
    totalAmount: 270,
    orderDate: '2025-01-14T10:00:00Z',
    deliveryDate: '2025-01-16T10:00:00Z',
    deliveryLocation: 'Connaught Place Metro Station',
    status: 'confirmed',
    isGroupOrder: true,
    groupOrderId: '1',
    participantCount: 3
  },
  {
    id: '2',
    productName: 'Onions',
    vendorName: 'Priya Sharma',
    vendorPhone: '+91 87654 32109',
    quantity: 10,
    unit: 'kg',
    pricePerUnit: 18,
    totalAmount: 180,
    orderDate: '2025-01-14T11:30:00Z',
    deliveryDate: '2025-01-16T10:00:00Z',
    deliveryLocation: 'Connaught Place Metro Station',
    status: 'confirmed',
    isGroupOrder: true,
    groupOrderId: '1',
    participantCount: 3
  },
  {
    id: '3',
    productName: 'Tomatoes',
    vendorName: 'Mohammed Ali',
    vendorPhone: '+91 76543 21098',
    quantity: 25,
    unit: 'kg',
    pricePerUnit: 22,
    totalAmount: 550,
    orderDate: '2025-01-13T14:20:00Z',
    deliveryDate: '2025-01-15T09:00:00Z',
    deliveryLocation: 'Chandni Chowk Market',
    status: 'delivered',
    isGroupOrder: false
  },
  {
    id: '4',
    productName: 'Potatoes',
    vendorName: 'Sunita Devi',
    vendorPhone: '+91 65432 10987',
    quantity: 30,
    unit: 'kg',
    pricePerUnit: 15,
    totalAmount: 450,
    orderDate: '2025-01-12T16:45:00Z',
    deliveryDate: '2025-01-14T11:00:00Z',
    deliveryLocation: 'Lajpat Nagar Market',
    status: 'delivered',
    isGroupOrder: false
  },
  {
    id: '5',
    productName: 'Cooking Oil',
    vendorName: 'Amit Singh',
    vendorPhone: '+91 54321 09876',
    quantity: 7,
    unit: 'litre',
    pricePerUnit: 100,
    totalAmount: 700,
    orderDate: '2025-01-14T15:00:00Z',
    deliveryDate: '2025-01-18T08:00:00Z',
    deliveryLocation: 'India Gate Parking',
    status: 'pending',
    isGroupOrder: true,
    groupOrderId: '4',
    participantCount: 2
  }
];

export default function Orders() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'delivered' | 'cancelled'>('all');

  const filteredOrders = mockSupplierOrders.filter(order => 
    filter === 'all' || order.status === filter
  );

  const getStatusIcon = (status: SupplierOrder['status']) => {
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

  const getStatusColor = (status: SupplierOrder['status']) => {
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

  const handleStatusChange = (orderId: string, newStatus: SupplierOrder['status']) => {
    // In a real app, this would make an API call
    alert(`Order ${orderId} status changed to ${newStatus}`);
  };

  const totalOrderValue = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = filteredOrders.length;
  const pendingOrders = mockSupplierOrders.filter(o => o.status === 'pending').length;
  const deliveredOrders = mockSupplierOrders.filter(o => o.status === 'delivered').length;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Orders Management</h2>
        <p className="text-gray-600 text-lg">Manage incoming orders and track deliveries</p>
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
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
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
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {order.vendorName}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {order.vendorPhone}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {order.isGroupOrder && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        Group Order ({order.participantCount} vendors)
                      </span>
                    )}
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm mb-4">
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

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Delivery at: {order.deliveryLocation}</span>
                </div>
              </div>

              <div className="mt-6 lg:mt-0 lg:ml-8 flex flex-col items-start lg:items-end space-y-4">
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">₹{order.totalAmount}</p>
                  <p className="text-sm text-gray-500">Total Amount</p>
                </div>
                
                {/* Action Buttons */}
                {order.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusChange(order.id, 'confirmed')}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleStatusChange(order.id, 'cancelled')}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
                
                {order.status === 'confirmed' && (
                  <button
                    onClick={() => handleStatusChange(order.id, 'delivered')}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Mark Delivered
                  </button>
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
              ? 'No orders have been placed yet'
              : `No ${filter} orders found`
            }
          </p>
        </div>
      )}
    </div>
  );
}