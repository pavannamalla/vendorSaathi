export interface Vendor {
  id: string;
  name: string;
  phone: string;
  location: string;
  foodType: string;
  avatar?: string;
}

export interface Supplier {
  id: string;
  name: string;
  phone: string;
  location: string;
  rating: number;
  deliveryAreas: string[];
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  marketPrice: number;
  bulkPrice: number;
  minBulkQuantity: number;
  supplierId: string;
  inStock: boolean;
}

export interface GroupOrder {
  id: string;
  productId: string;
  targetQuantity: number;
  currentQuantity: number;
  pricePerUnit: number;
  deadline: string;
  deliveryDate: string;
  deliveryLocation: string;
  participants: OrderParticipant[];
  status: 'active' | 'fulfilled' | 'expired';
  supplierId: string;
}

export interface OrderParticipant {
  vendorId: string;
  vendorName: string;
  quantity: number;
  joinedAt: string;
}

export interface Order {
  id: string;
  vendorId: string;
  productId: string;
  supplierId: string;
  quantity: number;
  pricePerUnit: number;
  totalAmount: number;
  orderDate: string;
  deliveryDate: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  groupOrderId?: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  userType: 'vendor' | 'supplier';
  location?: string;
  businessName?: string;
}