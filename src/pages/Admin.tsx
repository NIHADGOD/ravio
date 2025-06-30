
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, Users, ShoppingCart, DollarSign, Edit, Trash2, Plus, Upload, Settings, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  // Analytics data
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
    <div className="pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-playfair font-bold mb-2">RAVIO Admin Panel</h1>
          <p className="text-muted-foreground">Welcome back, {profile?.full_name || profile?.email}</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-3xl font-bold">{products.length}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-3xl font-bold">{orders.length}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold">{users.length}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-3xl font-bold">${orders.reduce((sum, order) => sum + Number(order.total_amount), 0).toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="orders" fill="#1f2937" name="Orders" />
                      <Bar dataKey="revenue" fill="#6b7280" name="Revenue ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{order.id.slice(0, 8)}...</p>
                          <p className="text-sm text-muted-foreground">{order.user_email}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${Number(order.total_amount).toFixed(2)}</p>
                          <Badge className={`text-xs ${getStatusColor(order.order_status)}`}>
                            {order.order_status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {users.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{user.full_name || 'No name'}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <Badge variant="outline">{user.role}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            {/* Add Product Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Product
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="original_price">Original Price ($)</Label>
                    <Input
                      id="original_price"
                      type="number"
                      step="0.01"
                      value={newProduct.original_price}
                      onChange={(e) => setNewProduct({...newProduct, original_price: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="sale_price">Sale Price ($)</Label>
                    <Input
                      id="sale_price"
                      type="number"
                      step="0.01"
                      value={newProduct.sale_price}
                      onChange={(e) => setNewProduct({...newProduct, sale_price: e.target.value})}
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <Label htmlFor="shipping_cost">Shipping Cost ($)</Label>
                    <Input
                      id="shipping_cost"
                      type="number"
                      step="0.01"
                      value={newProduct.shipping_cost}
                      onChange={(e) => setNewProduct({...newProduct, shipping_cost: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct({...newProduct, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="essentials">Essentials</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="organic">Organic</SelectItem>
                        <SelectItem value="drop">Drop Collection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newProduct.stock_quantity}
                      onChange={(e) => setNewProduct({...newProduct, stock_quantity: e.target.value})}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="images">Image URLs (one per line)</Label>
                    <Textarea
                      id="images"
                      placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                      value={newProduct.images.join('\n')}
                      onChange={(e) => setNewProduct({...newProduct, images: e.target.value.split('\n').filter(url => url.trim())})}
                      rows={3}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Button type="submit" className="w-full">Add Product</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Products List */}
            <Card>
              <CardHeader>
                <CardTitle>Products ({products.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      {product.images[0] && (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      )}
                      <div className="flex-grow">
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                        <p className="font-bold">
                          ${product.sale_price ? product.sale_price : product.original_price}
                          {product.sale_price && (
                            <span className="ml-2 text-sm text-muted-foreground line-through">
                              ${product.original_price}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Stock: {product.stock_quantity}</p>
                        <div className="flex gap-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleProductVisibility(product.id, product.is_active)}
                          >
                            {product.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Orders ({orders.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{order.id.slice(0, 8)}...</h4>
                        <p className="text-sm text-muted-foreground">{order.user_email}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                        {order.tracking_number && (
                          <p className="text-sm text-muted-foreground">
                            Tracking: {order.tracking_number}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${Number(order.total_amount).toFixed(2)}</p>
                        <Badge className={`mt-2 ${getStatusColor(order.order_status)}`}>
                          {order.order_status}
                        </Badge>
                        <div className="mt-2">
                          <Select
                            value={order.order_status}
                            onValueChange={(value) => handleUpdateOrderStatus(order.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                              <SelectItem value="refunded">Refunded</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Users ({users.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{user.full_name || 'No name'}</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-sm text-muted-foreground">
                          Joined: {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">{user.role}</Badge>
                        <div>
                          <Select
                            value={user.role}
                            onValueChange={(value) => handleUpdateUserRole(user.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="editor">Editor</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Website Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Site Logo URL</Label>
                      <Input 
                        placeholder="https://example.com/logo.png"
                        value={websiteSettings.site_logo?.url || ''}
                      />
                    </div>
                    <div>
                      <Label>Hero Banner Title</Label>
                      <Input 
                        placeholder="Crafted in Clarity"
                        value={websiteSettings.hero_banner?.title || ''}
                      />
                    </div>
                    <div>
                      <Label>Hero Banner Subtitle</Label>
                      <Input 
                        placeholder="Discover our latest collection"
                        value={websiteSettings.hero_banner?.subtitle || ''}
                      />
                    </div>
                    <div>
                      <Label>Contact Email</Label>
                      <Input 
                        placeholder="hello@ravio.store"
                        value={websiteSettings.contact_info?.email || ''}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Newsletter Subscriptions ({newsletters.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {newsletters.map((sub) => (
                      <div key={sub.id} className="flex justify-between items-center p-2 border rounded">
                        <span>{sub.email}</span>
                        <Badge variant={sub.is_active ? "default" : "secondary"}>
                          {sub.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Website Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Social Media Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Instagram URL</Label>
                        <Input placeholder="https://instagram.com/ravio" />
                      </div>
                      <div>
                        <Label>Threads URL</Label>
                        <Input placeholder="https://threads.net/@ravio" />
                      </div>
                      <div>
                        <Label>Pinterest URL</Label>
                        <Input placeholder="https://pinterest.com/ravio" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Collection Visibility</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Drop 01 Collection</span>
                        <Button variant="outline" size="sm">Toggle</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Drop 02 Collection</span>
                        <Button variant="outline" size="sm">Toggle</Button>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
