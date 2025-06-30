
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, Users, ShoppingCart, DollarSign, Edit, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

const Admin: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Essential White Tee',
      price: 49,
      category: 'essentials',
      stock: 150,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80'
    },
    {
      id: '2',
      name: 'Premium Cotton Tee',
      price: 59,
      category: 'premium',
      stock: 85,
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&q=80'
    }
  ]);

  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      total: 49,
      status: 'shipped',
      date: '2025-01-15',
      items: 'Essential White Tee x1'
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      total: 118,
      status: 'processing',
      date: '2025-01-14',
      items: 'Premium Cotton Tee x2'
    }
  ]);

  const [users] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      orders: 3,
      totalSpent: 147,
      joinDate: '2024-12-01'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      orders: 1,
      totalSpent: 118,
      joinDate: '2025-01-10'
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'essentials',
    stock: '',
    description: '',
    image: ''
  });

  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  // Analytics data
  const analyticsData = [
    { name: 'Mon', orders: 4, revenue: 196 },
    { name: 'Tue', orders: 3, revenue: 147 },
    { name: 'Wed', orders: 6, revenue: 294 },
    { name: 'Thu', orders: 8, revenue: 392 },
    { name: 'Fri', orders: 5, revenue: 245 },
    { name: 'Sat', orders: 7, revenue: 343 },
    { name: 'Sun', orders: 2, revenue: 98 }
  ];

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseInt(newProduct.price),
      category: newProduct.category,
      stock: parseInt(newProduct.stock),
      image: newProduct.image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80'
    };
    
    setProducts([...products, product]);
    setNewProduct({ name: '', price: '', category: 'essentials', stock: '', description: '', image: '' });
    toast.success('Product added successfully!');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Product deleted successfully!');
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success('Order status updated!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <div className="pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-playfair font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage your RAVIO store</p>
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
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-3xl font-bold">$1,715</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

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
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full px-3 py-2 border rounded-md"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    >
                      <option value="essentials">Essentials</option>
                      <option value="premium">Premium</option>
                      <option value="organic">Organic</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                      placeholder="https://example.com/image.jpg"
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
                <CardTitle>Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-grow">
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                        <p className="font-bold">${product.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                        <div className="flex gap-2 mt-2">
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
                <CardTitle>Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{order.id}</h4>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.items}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${order.total}</p>
                        <Badge className={`mt-2 ${getStatusColor(order.status)}`}>
                          {order.status}
                        </Badge>
                        <div className="mt-2">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className="text-xs px-2 py-1 border rounded"
                          >
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
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
                <CardTitle>Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{user.name}</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-sm text-muted-foreground">Joined: {user.joinDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{user.orders} orders</p>
                        <p className="text-sm text-muted-foreground">Total: ${user.totalSpent}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Orders & Revenue</CardTitle>
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
                    <CardTitle>Top Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Essential White Tee</span>
                        <span className="font-bold">12 sold</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Premium Cotton Tee</span>
                        <span className="font-bold">8 sold</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Minimalist Classic</span>
                        <span className="font-bold">5 sold</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <p>New order ORD-003 received</p>
                      <p>Product "Luxury Comfort" updated</p>
                      <p>Order ORD-001 marked as delivered</p>
                      <p>New user registration: Mike Johnson</p>
                      <p>Inventory alert: Low stock on size M</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
