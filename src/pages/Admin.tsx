import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, Users, ShoppingCart, DollarSign, Edit, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '@/components/AdminLayout';
import StatsCard from '@/components/admin/StatsCard';
import CollapsibleSection from '@/components/admin/CollapsibleSection';
import LoadingSpinner from '@/components/admin/LoadingSpinner';

interface Product {
  id: string;
  name: string;
  description: string;
  original_price: number;
  sale_price: number | null;
  shipping_cost: number;
  category: string;
  sizes: string[];
  tags: string[];
  stock_quantity: number;
  images: string[];
  is_featured: boolean;
  is_active: boolean;
}

interface Order {
  id: string;
  user_email: string;
  order_status: string;
  total_amount: number;
  shipping_cost: number;
  tracking_number: string | null;
  order_items: any;
  created_at: string;
}

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}

const Admin: React.FC = () => {
  const { user, profile, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [websiteSettings, setWebsiteSettings] = useState<any>({});
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    original_price: '',
    sale_price: '',
    shipping_cost: '',
    category: 'essentials',
    sizes: [] as string[],
    tags: [] as string[],
    stock_quantity: '',
    images: [] as string[]
  });

  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user || !isAdmin) {
        navigate('/login');
        return;
      }
      fetchAllData();
    }
  }, [user, isAdmin, loading, navigate]);

  const fetchAllData = async () => {
    setIsLoadingData(true);
    try {
      await Promise.all([
        fetchProducts(),
        fetchOrders(),
        fetchUsers(),
        fetchNewsletters(),
        fetchWebsiteSettings()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setIsLoadingData(false);
    }
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data || []);
    }
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching orders:', error);
    } else {
      setOrders(data || []);
    }
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching users:', error);
    } else {
      setUsers(data || []);
    }
  };

  const fetchNewsletters = async () => {
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching newsletters:', error);
    } else {
      setNewsletters(data || []);
    }
  };

  const fetchWebsiteSettings = async () => {
    const { data, error } = await supabase
      .from('website_settings')
      .select('*');
    
    if (error) {
      console.error('Error fetching website settings:', error);
    } else {
      const settings: any = {};
      data?.forEach(item => {
        settings[item.setting_key] = item.setting_value;
      });
      setWebsiteSettings(settings);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('products')
        .insert([{
          name: newProduct.name,
          description: newProduct.description,
          original_price: parseFloat(newProduct.original_price),
          sale_price: newProduct.sale_price ? parseFloat(newProduct.sale_price) : null,
          shipping_cost: parseFloat(newProduct.shipping_cost) || 0,
          category: newProduct.category,
          sizes: newProduct.sizes,
          tags: newProduct.tags,
          stock_quantity: parseInt(newProduct.stock_quantity) || 0,
          images: newProduct.images
        }]);

      if (error) throw error;

      toast.success('Product added successfully!');
      setNewProduct({
        name: '',
        description: '',
        original_price: '',
        sale_price: '',
        shipping_cost: '',
        category: 'essentials',
        sizes: [],
        tags: [],
        stock_quantity: '',
        images: []
      });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ order_status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) throw error;

      toast.success('Order status updated!');
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order status');
    }
  };

  const handleUpdateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (error) throw error;

      toast.success('User role updated!');
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    }
  };

  const toggleProductVisibility = async (productId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: !currentStatus })
        .eq('id', productId);

      if (error) throw error;

      toast.success(`Product ${!currentStatus ? 'activated' : 'deactivated'} successfully!`);
      fetchProducts();
    } catch (error) {
      console.error('Error toggling product visibility:', error);
      toast.error('Failed to update product visibility');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading || isLoadingData) {
    return (
      <AdminLayout title="Loading..." subtitle="Please wait while we load your data">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <p className="text-gray-600">Loading your admin dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!user || !isAdmin) {
    return (
      <AdminLayout title="Access Denied" subtitle="You don't have permission to view this page">
        <div className="text-center py-20">
          <div className="bg-red-50 rounded-xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl">🚫</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Restricted</h2>
            <p className="text-gray-600 mb-6">Only administrators can access this area.</p>
            <Button onClick={() => navigate('/')} className="rounded-lg">
              Return to Homepage
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const analyticsData = [
    { name: 'Mon', orders: orders.filter(o => new Date(o.created_at).getDay() === 1).length, revenue: orders.filter(o => new Date(o.created_at).getDay() === 1).reduce((sum, o) => sum + Number(o.total_amount), 0) },
    { name: 'Tue', orders: orders.filter(o => new Date(o.created_at).getDay() === 2).length, revenue: orders.filter(o => new Date(o.created_at).getDay() === 2).reduce((sum, o) => sum + Number(o.total_amount), 0) },
    { name: 'Wed', orders: orders.filter(o => new Date(o.created_at).getDay() === 3).length, revenue: orders.filter(o => new Date(o.created_at).getDay() === 3).reduce((sum, o) => sum + Number(o.total_amount), 0) },
    { name: 'Thu', orders: orders.filter(o => new Date(o.created_at).getDay() === 4).length, revenue: orders.filter(o => new Date(o.created_at).getDay() === 4).reduce((sum, o) => sum + Number(o.total_amount), 0) },
    { name: 'Fri', orders: orders.filter(o => new Date(o.created_at).getDay() === 5).length, revenue: orders.filter(o => new Date(o.created_at).getDay() === 5).reduce((sum, o) => sum + Number(o.total_amount), 0) },
    { name: 'Sat', orders: orders.filter(o => new Date(o.created_at).getDay() === 6).length, revenue: orders.filter(o => new Date(o.created_at).getDay() === 6).reduce((sum, o) => sum + Number(o.total_amount), 0) },
    { name: 'Sun', orders: orders.filter(o => new Date(o.created_at).getDay() === 0).length, revenue: orders.filter(o => new Date(o.created_at).getDay() === 0).reduce((sum, o) => sum + Number(o.total_amount), 0) }
  ];

  return (
    <AdminLayout 
      title="Welcome back!" 
      subtitle={`Good to see you, ${profile?.full_name || profile?.email}. Here's what's happening with RAVIO today.`}
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Products"
          value={products.length}
          icon={Package}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Orders"
          value={orders.length}
          icon={ShoppingCart}
          color="green"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Total Users"
          value={users.length}
          icon={Users}
          color="purple"
          trend={{ value: 23, isPositive: true }}
        />
        <StatsCard
          title="Total Revenue"
          value={`$${orders.reduce((sum, order) => sum + Number(order.total_amount), 0).toFixed(2)}`}
          icon={DollarSign}
          color="orange"
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Analytics Chart */}
      <div className="mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Weekly Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar dataKey="orders" fill="#1f2937" name="Orders" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" fill="#6b7280" name="Revenue ($)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Recent Orders</h3>
            <Button variant="outline" size="sm" className="rounded-lg">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-500">{order.user_email}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">${Number(order.total_amount).toFixed(2)}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    order.order_status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.order_status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    order.order_status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.order_status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">New Users</h3>
            <Button variant="outline" size="sm" className="rounded-lg">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {(user.full_name || user.email).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.full_name || 'No name'}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Add Product */}
      <CollapsibleSection title="✨ Add New Product" defaultOpen={false}>
        <form onSubmit={handleAddProduct} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                Product Name *
              </Label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                placeholder="Enter product name"
                className="rounded-lg border-gray-200 focus:border-black focus:ring-black"
                required
              />
            </div>
            <div>
              <Label htmlFor="category" className="text-sm font-medium text-gray-700 mb-2 block">
                Category
              </Label>
              <Select
                value={newProduct.category}
                onValueChange={(value) => setNewProduct({...newProduct, category: value})}
              >
                <SelectTrigger className="rounded-lg border-gray-200 focus:border-black focus:ring-black">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="essentials">Essentials</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="organic">Organic</SelectItem>
                  <SelectItem value="drop">Drop Collection</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="original_price" className="text-sm font-medium text-gray-700 mb-2 block">
                Original Price ($) *
              </Label>
              <Input
                id="original_price"
                type="number"
                step="0.01"
                value={newProduct.original_price}
                onChange={(e) => setNewProduct({...newProduct, original_price: e.target.value})}
                placeholder="0.00"
                className="rounded-lg border-gray-200 focus:border-black focus:ring-black"
                required
              />
            </div>
            <div>
              <Label htmlFor="sale_price" className="text-sm font-medium text-gray-700 mb-2 block">
                Sale Price ($)
              </Label>
              <Input
                id="sale_price"
                type="number"
                step="0.01"
                value={newProduct.sale_price}
                onChange={(e) => setNewProduct({...newProduct, sale_price: e.target.value})}
                placeholder="Optional sale price"
                className="rounded-lg border-gray-200 focus:border-black focus:ring-black"
              />
            </div>
            <div>
              <Label htmlFor="shipping_cost" className="text-sm font-medium text-gray-700 mb-2 block">
                Shipping Cost ($)
              </Label>
              <Input
                id="shipping_cost"
                type="number"
                step="0.01"
                value={newProduct.shipping_cost}
                onChange={(e) => setNewProduct({...newProduct, shipping_cost: e.target.value})}
                placeholder="0.00"
                className="rounded-lg border-gray-200 focus:border-black focus:ring-black"
              />
            </div>
            <div>
              <Label htmlFor="stock" className="text-sm font-medium text-gray-700 mb-2 block">
                Stock Quantity *
              </Label>
              <Input
                id="stock"
                type="number"
                value={newProduct.stock_quantity}
                onChange={(e) => setNewProduct({...newProduct, stock_quantity: e.target.value})}
                placeholder="0"
                className="rounded-lg border-gray-200 focus:border-black focus:ring-black"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-2 block">
              Product Description
            </Label>
            <Textarea
              id="description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              placeholder="Describe your product..."
              rows={4}
              className="rounded-lg border-gray-200 focus:border-black focus:ring-black"
            />
          </div>
          
          <div>
            <Label htmlFor="images" className="text-sm font-medium text-gray-700 mb-2 block">
              Product Images
            </Label>
            <Textarea
              id="images"
              placeholder="Enter image URLs, one per line&#10;https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              value={newProduct.images.join('\n')}
              onChange={(e) => setNewProduct({...newProduct, images: e.target.value.split('\n').filter(url => url.trim())})}
              rows={4}
              className="rounded-lg border-gray-200 focus:border-black focus:ring-black"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full rounded-lg bg-black hover:bg-gray-800 text-white py-3 font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </form>
      </CollapsibleSection>
    </AdminLayout>
  );
};

export default Admin;
