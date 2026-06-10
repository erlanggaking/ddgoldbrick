'use client';

import { useState } from 'react';
import { Package, ShoppingCart, Users, DollarSign, BarChart3, Search, Eye, Edit, Trash2, Plus, ChevronDown, ChevronUp, Clock, Check, Truck, CreditCard, MapPin, Phone, Mail, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatPrice } from '@/lib/i18n/translations';

const mockStats = {
  totalRevenue: 45750000,
  totalOrders: 156,
  totalProducts: 48,
  totalCustomers: 89,
  revenueChange: 12.5,
  ordersChange: 8.3,
  productsChange: 4.2,
  customersChange: 15.7,
  pendingOrders: 12,
  processingOrders: 8,
  shippedOrders: 15,
  deliveredOrders: 121,
};

const mockOrders = [
  { id: 'ORD-001', customer: 'John Doe', email: 'john@example.com', phone: '+62 812-3456-7890', items: 3, total: 2450000, status: 'delivered', payment: 'bca_va', shipping: 'JNE Regular', date: '2024-01-15', address: '123 Main St, Jakarta' },
  { id: 'ORD-002', customer: 'Jane Smith', email: 'jane@example.com', phone: '+62 813-4567-8901', items: 1, total: 1890000, status: 'processing', payment: 'gopay', shipping: 'SiCepat BEST', date: '2024-01-16', address: '456 Oak Ave, Bandung' },
  { id: 'ORD-003', customer: 'Bob Wilson', email: 'bob@example.com', phone: '+62 814-5678-9012', items: 2, total: 3250000, status: 'pending', payment: 'mandiri_va', shipping: 'JNE YES', date: '2024-01-17', address: '789 Pine Rd, Surabaya' },
  { id: 'ORD-004', customer: 'Alice Brown', email: 'alice@example.com', phone: '+62 815-6789-0123', items: 5, total: 5670000, status: 'shipped', payment: 'credit_card', shipping: 'J&T EZ', date: '2024-01-18', address: '321 Elm St, Yogyakarta' },
  { id: 'ORD-005', customer: 'Charlie Davis', email: 'charlie@example.com', phone: '+62 816-7890-1234', items: 1, total: 890000, status: 'failed', payment: 'dana', shipping: 'POS Regular', date: '2024-01-19', address: '654 Maple Dr, Medan' },
];

const mockProducts = [
  { id: '1', name: 'LEGO Star Wars Millennium Falcon', setNumber: '75192', price: 12500000, stock: 5, category: 'Star Wars', sales: 12 },
  { id: '2', name: 'LEGO Technic Bugatti Chiron', setNumber: '42083', price: 5890000, stock: 8, category: 'Technic', sales: 18 },
  { id: '3', name: 'LEGO Harry Potter Hogwarts Castle', setNumber: '71043', price: 6750000, stock: 3, category: 'Harry Potter', sales: 25 },
  { id: '4', name: 'LEGO Creator Expert Taj Mahal', setNumber: '10256', price: 4250000, stock: 12, category: 'Creator', sales: 8 },
  { id: '5', name: 'LEGO Ideas NASA Apollo Saturn V', setNumber: '21309', price: 1890000, stock: 15, category: 'Ideas', sales: 32 },
  { id: '6', name: 'LEGO Architecture Statue of Liberty', setNumber: '21042', price: 1450000, stock: 20, category: 'Architecture', sales: 15 },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800',
};

const statusLabels: Record<string, string> = {
  pending: 'Pending Payment',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  failed: 'Failed',
  refunded: 'Refunded',
};

type TabType = 'dashboard' | 'orders' | 'products' | 'customers';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const StatCard = ({ icon: Icon, title, value, change }: { icon: any; title: string; value: number; change: number }) => (
    <div className="bg-white border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-black text-dd-black mt-1">{formatPrice(value)}</p>
        </div>
        <div className="p-3 bg-dd-gold/10"><Icon className="text-dd-gold" size={24} /></div>
      </div>
      {change && (
        <div className="flex items-center gap-1 mt-3">
          {change > 0 ? <ArrowUpRight className="text-green-600" size={16} /> : <ArrowDownRight className="text-red-600" size={16} />}
          <span className={`text-sm font-bold ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>{change > 0 ? '+' : ''}{change}%</span>
          <span className="text-sm text-gray-400 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-dd-black py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Admin Dashboard</h1>
              <p className="text-gray-400 mt-1">Manage your store</p>
            </div>
            <a href="/" className="text-dd-gold font-bold hover:underline">Back to Store</a>
          </div>
        </div>
      </div>

      <div className="bg-white border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {([
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'orders', label: 'Orders', icon: ShoppingCart },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'customers', label: 'Customers', icon: Users },
            ] as const).map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 font-bold uppercase tracking-wider text-sm transition-colors ${activeTab === tab.id ? 'text-dd-gold border-b-2 border-dd-gold' : 'text-gray-500 hover:text-dd-black'}`}>
                <tab.icon size={18} />{tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={DollarSign} title="Total Revenue" value={mockStats.totalRevenue} change={mockStats.revenueChange} />
              <StatCard icon={ShoppingCart} title="Total Orders" value={mockStats.totalOrders} change={mockStats.ordersChange} />
              <StatCard icon={Package} title="Total Products" value={mockStats.totalProducts} change={mockStats.productsChange} />
              <StatCard icon={Users} title="Total Customers" value={mockStats.totalCustomers} change={mockStats.customersChange} />
            </div>
            <div className="bg-white border-2 border-gray-200 p-6">
              <h3 className="text-lg font-black text-dd-black uppercase tracking-tight mb-4">Order Status Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200"><div className="flex items-center gap-2"><Clock className="text-yellow-600" size={20} /><div><p className="text-2xl font-black text-yellow-700">{mockStats.pendingOrders}</p><p className="text-xs text-yellow-600">Pending</p></div></div></div>
                <div className="p-4 bg-blue-50 border border-blue-200"><div className="flex items-center gap-2"><Package className="text-blue-600" size={20} /><div><p className="text-2xl font-black text-blue-700">{mockStats.processingOrders}</p><p className="text-xs text-blue-600">Processing</p></div></div></div>
                <div className="p-4 bg-purple-50 border border-purple-200"><div className="flex items-center gap-2"><Truck className="text-purple-600" size={20} /><div><p className="text-2xl font-black text-purple-700">{mockStats.shippedOrders}</p><p className="text-xs text-purple-600">Shipped</p></div></div></div>
                <div className="p-4 bg-green-50 border border-green-200"><div className="flex items-center gap-2"><Check className="text-green-600" size={20} /><div><p className="text-2xl font-black text-green-700">{mockStats.deliveredOrders}</p><p className="text-xs text-green-600">Delivered</p></div></div></div>
              </div>
            </div>
            <div className="bg-white border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-dd-black uppercase tracking-tight">Recent Orders</h3>
                <button onClick={() => setActiveTab('orders')} className="text-sm text-dd-gold font-bold hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead><tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  </tr></thead>
                  <tbody>
                    {mockOrders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-bold text-dd-black">{order.id}</td>
                        <td className="py-3 px-4 text-gray-600">{order.customer}</td>
                        <td className="py-3 px-4 font-bold text-dd-gold">{formatPrice(order.total)}</td>
                        <td className="py-3 px-4"><span className={`px-2 py-1 text-xs font-bold uppercase tracking-wider ${statusColors[order.status]}`}>{statusLabels[order.status]}</span></td>
                        <td className="py-3 px-4 text-gray-500">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-dd-black uppercase tracking-tight">Top Products</h3>
                <button onClick={() => setActiveTab('products')} className="text-sm text-dd-gold font-bold hover:underline">View All</button>
              </div>
              <div className="space-y-3">
                {mockProducts.slice(0, 5).map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-black text-gray-400 w-8">#{index + 1}</span>
                      <div><p className="font-bold text-dd-black">{product.name}</p><p className="text-xs text-gray-400 font-mono">{product.setNumber}</p></div>
                    </div>
                    <div className="text-right"><p className="font-bold text-dd-gold">{formatPrice(product.price)}</p><p className="text-xs text-gray-500">{product.sales} sales</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="bg-white border-2 border-gray-200 p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="text" placeholder="Search orders..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 focus:border-dd-gold outline-none" />
                </div>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border-2 border-gray-200 focus:border-dd-gold outline-none">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
            <div className="space-y-3">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white border-2 border-gray-200">
                  <div className="p-4 cursor-pointer flex items-center justify-between" onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                    <div className="flex items-center gap-4">
                      <span className="font-black text-dd-black">{order.id}</span>
                      <span className="text-gray-600">{order.customer}</span>
                      <span className="font-bold text-dd-gold">{formatPrice(order.total)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider ${statusColors[order.status]}`}>{statusLabels[order.status]}</span>
                      {expandedOrder === order.id ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                    </div>
                  </div>
                  {expandedOrder === order.id && (
                    <div className="p-4 border-t-2 border-gray-200 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-bold text-dd-black mb-2">Customer Details</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p className="flex items-center gap-2"><Users size={14} /> {order.customer}</p>
                            <p className="flex items-center gap-2"><Mail size={14} /> {order.email}</p>
                            <p className="flex items-center gap-2"><Phone size={14} /> {order.phone}</p>
                            <p className="flex items-center gap-2"><MapPin size={14} /> {order.address}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-dd-black mb-2">Order Details</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p className="flex items-center gap-2"><Package size={14} /> {order.items} items</p>
                            <p className="flex items-center gap-2"><CreditCard size={14} /> {order.payment}</p>
                            <p className="flex items-center gap-2"><Truck size={14} /> {order.shipping}</p>
                            <p className="flex items-center gap-2"><Clock size={14} /> {order.date}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        {order.status === 'pending' && <button className="px-4 py-2 bg-green-600 text-white text-sm font-bold hover:bg-green-700">Confirm Payment</button>}
                        {order.status === 'processing' && <button className="px-4 py-2 bg-purple-600 text-white text-sm font-bold hover:bg-purple-700">Mark as Shipped</button>}
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-bold hover:bg-gray-300">Print Invoice</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="text" placeholder="Search products..." className="pl-10 pr-4 py-2 border-2 border-gray-200 focus:border-dd-gold outline-none" />
                </div>
                <select className="px-4 py-2 border-2 border-gray-200 focus:border-dd-gold outline-none">
                  <option value="all">All Categories</option>
                  <option value="Star Wars">Star Wars</option>
                  <option value="Technic">Technic</option>
                  <option value="Harry Potter">Harry Potter</option>
                  <option value="Creator">Creator</option>
                  <option value="Ideas">Ideas</option>
                </select>
              </div>
              <button className="px-4 py-2 bg-dd-gold text-white font-bold hover:bg-dd-gold-dark flex items-center gap-2"><Plus size={18} /> Add Product</button>
            </div>
            <div className="bg-white border-2 border-gray-200 overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Set #</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Sales</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr></thead>
                <tbody>
                  {mockProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-dd-black">{product.name}</td>
                      <td className="py-3 px-4 text-gray-500 font-mono">{product.setNumber}</td>
                      <td className="py-3 px-4 text-gray-600">{product.category}</td>
                      <td className="py-3 px-4 font-bold text-dd-gold">{formatPrice(product.price)}</td>
                      <td className="py-3 px-4"><span className={`font-bold ${product.stock < 5 ? 'text-red-600' : 'text-green-600'}`}>{product.stock}</span></td>
                      <td className="py-3 px-4 text-gray-600">{product.sales}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-blue-600 hover:bg-blue-50"><Eye size={16} /></button>
                          <button className="p-1 text-yellow-600 hover:bg-yellow-50"><Edit size={16} /></button>
                          <button className="p-1 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="space-y-4">
            <div className="bg-white border-2 border-gray-200 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Search customers..." className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 focus:border-dd-gold outline-none" />
              </div>
            </div>
            <div className="bg-white border-2 border-gray-200 overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Orders</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total Spent</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr></thead>
                <tbody>
                  {mockOrders.map((order, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-dd-black">{order.customer}</td>
                      <td className="py-3 px-4 text-gray-600">{order.email}</td>
                      <td className="py-3 px-4 text-gray-500">{order.phone}</td>
                      <td className="py-3 px-4 text-gray-600">{Math.floor(Math.random() * 10) + 1}</td>
                      <td className="py-3 px-4 font-bold text-dd-gold">{formatPrice(order.total * (Math.floor(Math.random() * 5) + 1))}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-blue-600 hover:bg-blue-50"><Eye size={16} /></button>
                          <button className="p-1 text-yellow-600 hover:bg-yellow-50"><Edit size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}