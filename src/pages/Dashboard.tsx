
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, ShoppingBag, Heart, Settings } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  // Mock data for user dashboard
  const recentOrders = [
    {
      id: 'ORD-001',
      date: '2025-01-15',
      items: 'Essential White Tee x1',
      total: 49,
      status: 'Delivered'
    },
    {
      id: 'ORD-002',
      date: '2025-01-10',
      items: 'Premium Cotton Tee x2',
      total: 118,
      status: 'Shipped'
    }
  ];

  const wishlistItems = [
    {
      id: '1',
      name: 'Luxury Comfort',
      price: 75,
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300&q=80'
    },
    {
      id: '2',
      name: 'Organic Blend Tee',
      price: 55,
      image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&q=80'
    }
  ];

  return (
    <div className="pt-20 pb-20 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-playfair font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                {user.isAdmin && (
                  <p className="text-sm text-primary font-medium">Admin Account</p>
                )}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Orders Summary */}
          <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{recentOrders.length}</div>
              <p className="text-muted-foreground text-sm mb-4">Total orders placed</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Delivered</span>
                  <span>1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipped</span>
                  <span>1</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wishlist Summary */}
          <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Wishlist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{wishlistItems.length}</div>
              <p className="text-muted-foreground text-sm mb-4">Items saved</p>
              <Button variant="outline" className="w-full">
                View Wishlist
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="mb-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.items}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${order.total}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Wishlist Items */}
        <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle>Wishlist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wishlistItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-grow">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">${item.price}</p>
                    <Button size="sm" variant="outline" className="mt-2">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Admin Panel Access */}
        {user.isAdmin && (
          <Card className="mt-6 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Admin Panel</h3>
                  <p className="text-sm text-muted-foreground">Manage products, orders, and users</p>
                </div>
                <Button onClick={() => navigate('/admin')}>
                  Access Admin Panel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Logout */}
        <div className="text-center mt-8">
          <Button variant="outline" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
