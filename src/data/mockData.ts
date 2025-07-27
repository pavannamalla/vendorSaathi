import { Vendor, Supplier, Product, GroupOrder, OrderParticipant } from '../types';

export const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    location: 'Connaught Place, Delhi',
    foodType: 'Chaat & Snacks'
  },
  {
    id: '2', 
    name: 'Priya Sharma',
    phone: '+91 87654 32109',
    location: 'Karol Bagh, Delhi',
    foodType: 'South Indian'
  },
  {
    id: '3',
    name: 'Mohammed Ali',
    phone: '+91 76543 21098',
    location: 'Chandni Chowk, Delhi',
    foodType: 'Kebabs & Non-Veg'
  },
  {
    id: '4',
    name: 'Sunita Devi',
    phone: '+91 65432 10987',
    location: 'Lajpat Nagar, Delhi',
    foodType: 'North Indian'
  },
  {
    id: '5',
    name: 'Amit Singh',
    phone: '+91 54321 09876',
    location: 'India Gate, Delhi',
    foodType: 'Fast Food'
  }
];

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Delhi Fresh Vegetables',
    phone: '+91 98765 12345',
    location: 'Azadpur Mandi, Delhi',
    rating: 4.5,
    deliveryAreas: ['Central Delhi', 'North Delhi'],
    verified: true
  },
  {
    id: '2',
    name: 'Spice World Wholesale',
    phone: '+91 87654 23456',
    location: 'Khari Baoli, Delhi',
    rating: 4.2,
    deliveryAreas: ['Central Delhi', 'Old Delhi'],
    verified: true
  },
  {
    id: '3',
    name: 'Quality Grains & Pulses',
    phone: '+91 76543 34567',
    location: 'Najafgarh, Delhi',
    rating: 4.7,
    deliveryAreas: ['West Delhi', 'South Delhi'],
    verified: true
  },
  {
    id: '4',
    name: 'Metro Oil & Dairy',
    phone: '+91 65432 45678',
    location: 'Ghazipur, Delhi',
    rating: 4.3,
    deliveryAreas: ['East Delhi', 'Central Delhi'],
    verified: true
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Onions',
    category: 'Vegetables',
    unit: 'kg',
    marketPrice: 25,
    bulkPrice: 18,
    minBulkQuantity: 50,
    supplierId: '1',
    inStock: true
  },
  {
    id: '2',
    name: 'Tomatoes',
    category: 'Vegetables', 
    unit: 'kg',
    marketPrice: 30,
    bulkPrice: 22,
    minBulkQuantity: 40,
    supplierId: '1',
    inStock: true
  },
  {
    id: '3',
    name: 'Potatoes',
    category: 'Vegetables',
    unit: 'kg',
    marketPrice: 20,
    bulkPrice: 15,
    minBulkQuantity: 60,
    supplierId: '1',
    inStock: true
  },
  {
    id: '4',
    name: 'Red Chili Powder',
    category: 'Spices',
    unit: 'kg',
    marketPrice: 180,
    bulkPrice: 140,
    minBulkQuantity: 10,
    supplierId: '2',
    inStock: true
  },
  {
    id: '5',
    name: 'Turmeric Powder',
    category: 'Spices',
    unit: 'kg',
    marketPrice: 150,
    bulkPrice: 120,
    minBulkQuantity: 8,
    supplierId: '2',
    inStock: true
  },
  {
    id: '6',
    name: 'Basmati Rice',
    category: 'Grains',
    unit: 'kg',
    marketPrice: 80,
    bulkPrice: 65,
    minBulkQuantity: 25,
    supplierId: '3',
    inStock: true
  },
  {
    id: '7',
    name: 'Whole Wheat Flour',
    category: 'Grains',
    unit: 'kg',
    marketPrice: 35,
    bulkPrice: 28,
    minBulkQuantity: 50,
    supplierId: '3',
    inStock: true
  },
  {
    id: '8',
    name: 'Cooking Oil',
    category: 'Oils',
    unit: 'litre',
    marketPrice: 120,
    bulkPrice: 100,
    minBulkQuantity: 20,
    supplierId: '4',
    inStock: true
  },
  {
    id: '9',
    name: 'Garam Masala',
    category: 'Spices',
    unit: 'kg',
    marketPrice: 200,
    bulkPrice: 160,
    minBulkQuantity: 5,
    supplierId: '2',
    inStock: true
  },
  {
    id: '10',
    name: 'Green Chilies',
    category: 'Vegetables',
    unit: 'kg',
    marketPrice: 40,
    bulkPrice: 32,
    minBulkQuantity: 20,
    supplierId: '1',
    inStock: true
  }
];

export const mockGroupOrders: GroupOrder[] = [
  {
    id: '1',
    productId: '1',
    targetQuantity: 50,
    currentQuantity: 35,
    pricePerUnit: 18,
    deadline: '2025-01-15T18:00:00Z',
    deliveryDate: '2025-01-16T10:00:00Z',
    deliveryLocation: 'Connaught Place Metro Station',
    participants: [
      { vendorId: '1', vendorName: 'Rajesh Kumar', quantity: 15, joinedAt: '2025-01-14T10:00:00Z' },
      { vendorId: '2', vendorName: 'Priya Sharma', quantity: 10, joinedAt: '2025-01-14T11:30:00Z' },
      { vendorId: '4', vendorName: 'Sunita Devi', quantity: 10, joinedAt: '2025-01-14T14:20:00Z' }
    ],
    status: 'active',
    supplierId: '1'
  },
  {
    id: '2',
    productId: '4',
    targetQuantity: 10,
    currentQuantity: 8,
    pricePerUnit: 140,
    deadline: '2025-01-16T20:00:00Z',
    deliveryDate: '2025-01-17T09:00:00Z',
    deliveryLocation: 'Karol Bagh Market',
    participants: [
      { vendorId: '2', vendorName: 'Priya Sharma', quantity: 3, joinedAt: '2025-01-14T09:00:00Z' },
      { vendorId: '3', vendorName: 'Mohammed Ali', quantity: 5, joinedAt: '2025-01-14T12:00:00Z' }
    ],
    status: 'active',
    supplierId: '2'
  },
  {
    id: '3',
    productId: '6',
    targetQuantity: 25,
    currentQuantity: 25,
    pricePerUnit: 65,
    deadline: '2025-01-14T18:00:00Z',
    deliveryDate: '2025-01-15T11:00:00Z',
    deliveryLocation: 'Lajpat Nagar Central Market',
    participants: [
      { vendorId: '4', vendorName: 'Sunita Devi', quantity: 15, joinedAt: '2025-01-13T16:00:00Z' },
      { vendorId: '1', vendorName: 'Rajesh Kumar', quantity: 10, joinedAt: '2025-01-13T17:30:00Z' }
    ],
    status: 'fulfilled',
    supplierId: '3'
  },
  {
    id: '4',
    productId: '8',
    targetQuantity: 20,
    currentQuantity: 12,
    pricePerUnit: 100,
    deadline: '2025-01-17T16:00:00Z',
    deliveryDate: '2025-01-18T08:00:00Z',
    deliveryLocation: 'India Gate Parking',
    participants: [
      { vendorId: '5', vendorName: 'Amit Singh', quantity: 7, joinedAt: '2025-01-14T15:00:00Z' },
      { vendorId: '1', vendorName: 'Rajesh Kumar', quantity: 5, joinedAt: '2025-01-14T16:30:00Z' }
    ],
    status: 'active',
    supplierId: '4'
  }
];