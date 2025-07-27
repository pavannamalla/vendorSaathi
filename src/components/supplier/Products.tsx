import React, { useState } from 'react';
import { Package, Plus, Edit, Eye, Trash2, Star, MapPin, TrendingUp, Users } from 'lucide-react';
import { mockProducts, mockSuppliers, mockGroupOrders } from '../../data/mockData';

export default function Products() {
  const [showAddForm, setShowAddForm] = useState(false);
  
  // For demo, assuming we're logged in as supplier with ID '1'
  const currentSupplierId = '1'; 
  const currentSupplier = mockSuppliers.find(s => s.id === currentSupplierId);
  const myProducts = mockProducts.filter(p => p.supplierId === currentSupplierId);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Vegetables',
    unit: 'kg',
    marketPrice: '',
    bulkPrice: '',
    minBulkQuantity: '',
    inStock: true
  });

  const categories = ['Vegetables', 'Spices', 'Grains', 'Oils', 'Dairy', 'Frozen Foods'];
  const units = ['kg', 'litre', 'piece', 'dozen', 'gram'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    alert('Product added successfully!');
    setNewProduct({
      name: '',
      category: 'Vegetables',
      unit: 'kg',
      marketPrice: '',
      bulkPrice: '',
      minBulkQuantity: '',
      inStock: true
    });
    setShowAddForm(false);
  };

  const calculateSavings = (marketPrice: number, bulkPrice: number) => {
    const savings = marketPrice - bulkPrice;
    const percentage = Math.round((savings / marketPrice) * 100);
    return { amount: savings, percentage };
  };

  const getActiveGroupOrders = (productId: string) => {
    return mockGroupOrders.filter(order => 
      order.productId === productId && order.status === 'active'
    );
  };

  const getTotalRevenue = () => {
    return myProducts.reduce((total, product) => {
      const activeOrders = getActiveGroupOrders(product.id);
      return total + activeOrders.reduce((sum, order) => sum + (order.currentQuantity * order.pricePerUnit), 0);
    }, 0);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">My Products</h2>
          <p className="text-gray-600 text-lg">Manage your product catalog and pricing</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Supplier Info Card */}
      {currentSupplier && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                <Package className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{currentSupplier.name}</h3>
                <div className="flex items-center space-x-6 text-sm text-gray-600 mt-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    {currentSupplier.rating} rating
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {currentSupplier.deliveryAreas.join(', ')}
                  </div>
                  {currentSupplier.verified && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                      ✓ Verified Supplier
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">{myProducts.length}</div>
                <div className="text-sm text-gray-500">Products Listed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">₹{getTotalRevenue().toLocaleString()}</div>
                <div className="text-sm text-gray-500">Active Revenue</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Add New Product</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    id="productName"
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Fresh Onions"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
                      Unit
                    </label>
                    <select
                      id="unit"
                      value={newProduct.unit}
                      onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      {units.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="marketPrice" className="block text-sm font-medium text-gray-700 mb-2">
                      Market Price (₹)
                    </label>
                    <input
                      id="marketPrice"
                      type="number"
                      step="0.01"
                      value={newProduct.marketPrice}
                      onChange={(e) => setNewProduct({ ...newProduct, marketPrice: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="25.00"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="bulkPrice" className="block text-sm font-medium text-gray-700 mb-2">
                      Bulk Price (₹)
                    </label>
                    <input
                      id="bulkPrice"
                      type="number"
                      step="0.01"
                      value={newProduct.bulkPrice}
                      onChange={(e) => setNewProduct({ ...newProduct, bulkPrice: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="18.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="minBulkQuantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Bulk Quantity
                  </label>
                  <input
                    id="minBulkQuantity"
                    type="number"
                    value={newProduct.minBulkQuantity}
                    onChange={(e) => setNewProduct({ ...newProduct, minBulkQuantity: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="50"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="inStock"
                    type="checkbox"
                    checked={newProduct.inStock}
                    onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
                    className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="inStock" className="ml-3 text-sm font-medium text-gray-700">
                    Currently in stock
                  </label>
                </div>

                <div className="flex space-x-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {myProducts.map((product) => {
          const savings = calculateSavings(product.marketPrice, product.bulkPrice);
          const activeGroupOrders = getActiveGroupOrders(product.id);
          const totalActiveQuantity = activeGroupOrders.reduce((sum, order) => sum + order.currentQuantity, 0);
          
          return (
            <div key={product.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="p-6">
                {/* Product Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="flex space-x-1">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Market Price:</span>
                    <span className="text-xl font-semibold text-gray-900">₹{product.marketPrice}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Your Bulk Price:</span>
                    <span className="text-xl font-semibold text-green-600">₹{product.bulkPrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Customer Saves:</span>
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

                {/* Active Group Orders */}
                {activeGroupOrders.length > 0 && (
                  <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-orange-800">Active Group Orders</span>
                      <Users className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="text-sm text-orange-700 mb-1">
                      {activeGroupOrders.length} active order{activeGroupOrders.length > 1 ? 's' : ''}
                    </div>
                    <div className="text-sm text-orange-700">
                      Total quantity: {totalActiveQuantity} {product.unit}
                    </div>
                  </div>
                )}

                {/* Stock Status */}
                <div className="mb-6">
                  {product.inStock ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      ✓ In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      ✗ Out of Stock
                    </span>
                  )}
                </div>

                {/* Performance Metrics */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-800">Performance</span>
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-blue-700">Revenue</div>
                      <div className="font-semibold text-blue-900">
                        ₹{activeGroupOrders.reduce((sum, order) => sum + (order.currentQuantity * order.pricePerUnit), 0)}
                      </div>
                    </div>
                    <div>
                      <div className="text-blue-700">Orders</div>
                      <div className="font-semibold text-blue-900">{activeGroupOrders.length}</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-3 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium">
                    Edit Price
                  </button>
                  <button 
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      product.inStock 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {product.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {myProducts.length === 0 && (
        <div className="text-center py-16">
          <Package className="mx-auto h-16 w-16 text-gray-400 mb-6" />
          <h3 className="text-xl font-medium text-gray-900 mb-3">No products added yet</h3>
          <p className="text-gray-500 mb-6">Start by adding your first product to the catalog</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
          >
            Add Your First Product
          </button>
        </div>
      )}
    </div>
  );
}