import React, { useState } from 'react';
import { User, Smartphone, ArrowRight, Store, Truck, Users, TrendingDown, Shield } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (userType: 'vendor' | 'supplier', userData: any) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [userType, setUserType] = useState<'vendor' | 'supplier'>('vendor');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || !name || !location) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        phone: phoneNumber,
        location,
        userType
      };
      
      onLogin(userType, userData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white font-bold text-2xl">VS</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">VendorSaathi</h1>
          <p className="text-gray-600 text-lg">Empowering street food vendors through group buying</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          {/* User Type Selection */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-gray-700 mb-4">I am a:</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUserType('vendor')}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  userType === 'vendor'
                    ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Store className="w-8 h-8 mx-auto mb-3" />
                <div className="text-sm font-semibold">Street Vendor</div>
                <div className="text-xs text-gray-500 mt-1">Food seller</div>
              </button>
              
              <button
                type="button"
                onClick={() => setUserType('supplier')}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  userType === 'supplier'
                    ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Truck className="w-8 h-8 mx-auto mb-3" />
                <div className="text-sm font-semibold">Supplier</div>
                <div className="text-xs text-gray-500 mt-1">Raw material seller</div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Phone Number Input */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </div>

            {/* Location Input */}
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <Store className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                  placeholder="e.g., Connaught Place, Delhi"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !phoneNumber || !name || !location}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Get Started
                  <ArrowRight className="ml-2" size={20} />
                </>
              )}
            </button>
          </form>

          {/* Demo Note */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-700">
              <strong>Demo Note:</strong> This is a prototype. In production, you would receive an OTP for verification.
            </p>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600 mb-6 font-medium">Why choose VendorSaathi?</p>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingDown className="w-5 h-5 text-green-600" />
              </div>
              <div className="font-semibold text-gray-900">Save 20-30%</div>
              <div className="text-gray-600 mt-1">on bulk orders</div>
            </div>
            
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div className="font-semibold text-gray-900">Trusted</div>
              <div className="text-gray-600 mt-1">suppliers</div>
            </div>
            
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div className="font-semibold text-gray-900">Group</div>
              <div className="text-gray-600 mt-1">buying power</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}