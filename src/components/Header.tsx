
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, LogOut } from 'lucide-react';
import { toast } from 'sonner';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Drops', href: '/drops' },
    { name: 'Lookbook', href: '/lookbook' },
    { name: 'Contact', href: '/contact' },
    ...(isAdmin ? [{ name: 'Admin', href: '/admin' }] : []),
  ];

  const isActive = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl md:text-3xl font-playfair font-bold tracking-tight">
            RAVIO
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-gray-600 ${
                  isActive(item.href) ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm text-gray-600">
                    {profile?.full_name || profile?.email || 'User'}
                  </span>
                  {isAdmin && (
                    <span className="text-xs bg-gray-900 text-white px-2 py-1 rounded">
                      Admin
                    </span>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => navigate('/login')}
                className="flex items-center space-x-1"
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="mb-8">
                  <Link to="/" className="text-2xl font-playfair font-bold" onClick={() => setIsOpen(false)}>
                    RAVIO
                  </Link>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col space-y-4 flex-grow">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors py-2 ${
                        isActive(item.href) ? 'text-gray-900 border-l-2 border-gray-900 pl-2' : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Auth Section */}
                <div className="mt-auto pt-8 border-t">
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
                    </div>
                  ) : user ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span className="text-sm text-gray-600">
                          {profile?.full_name || profile?.email || 'User'}
                        </span>
                        {isAdmin && (
                          <span className="text-xs bg-gray-900 text-white px-2 py-1 rounded">
                            Admin
                          </span>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleSignOut();
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center justify-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigate('/login');
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2"
                    >
                      <User className="h-4 w-4" />
                      <span>Sign In</span>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
