
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Home, Search, ShoppingBag, User } from 'lucide-react';

const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const { getTotalItems } = useCart();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40">
      <div className="grid grid-cols-4 h-16">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            isActive('/') ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs font-medium">Home</span>
        </Link>

        <Link
          to="/shop"
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            isActive('/shop') ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <Search className="h-5 w-5" />
          <span className="text-xs font-medium">Shop</span>
        </Link>

        <Link
          to="/cart"
          className={`flex flex-col items-center justify-center space-y-1 relative transition-colors ${
            isActive('/cart') ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="text-xs font-medium">Cart</span>
          {getTotalItems() > 0 && (
            <span className="absolute top-1 right-1/2 translate-x-2 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
              {getTotalItems()}
            </span>
          )}
        </Link>

        <Link
          to="/dashboard"
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            isActive('/dashboard') || isActive('/login') ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNavigation;
