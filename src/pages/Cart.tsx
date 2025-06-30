
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-20 pb-20 md:pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16 animate-fade-in">
            <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-playfair font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/shop">
              <Button size="lg" className="btn-primary">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-playfair font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <Card key={`${item.id}-${item.size}`} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted/30 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                        </div>
                        <p className="font-bold">${item.price}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="w-8 h-8 border rounded-md hover:bg-muted transition-colors flex items-center justify-center"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="w-8 h-8 border rounded-md hover:bg-muted transition-colors flex items-center justify-center"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id, item.size)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{getTotalPrice() >= 80 ? 'Free' : '$9.99'}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>
                        ${(getTotalPrice() >= 80 ? getTotalPrice() : getTotalPrice() + 9.99).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {getTotalPrice() < 80 && (
                  <div className="mb-6 p-3 bg-muted/50 rounded-lg text-sm">
                    Add ${(80 - getTotalPrice()).toFixed(2)} more for free shipping!
                  </div>
                )}

                <div className="space-y-3">
                  <Link to="/checkout" className="block">
                    <Button className="w-full btn-primary" size="lg">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Link to="/shop" className="block">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
