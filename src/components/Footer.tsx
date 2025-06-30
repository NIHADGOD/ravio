
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
    // Add newsletter signup logic here
  };

  return (
    <footer className="bg-muted/30 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Brand */}
          <div className="space-y-4">
            <Link 
              to="/" 
              className="text-2xl font-playfair font-bold tracking-tight hover:opacity-80 transition-opacity"
            >
              RAVIO
            </Link>
            <p className="text-muted-foreground max-w-md">
              Crafted in Clarity. Premium white T-shirts designed for the modern individual who values simplicity and quality.
            </p>
          </div>

          {/* Middle Column - Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Navigate</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
                <Link to="/shop" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Shop
                </Link>
                <Link to="/drops" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Drops
                </Link>
                <Link to="/lookbook" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Lookbook
                </Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <Link to="/returns" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Returns & Refunds
                </Link>
                <Link to="/shipping" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Shipping Policy
                </Link>
                <Link to="/privacy" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
                <a 
                  href="https://instagram.com/ravio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold">Stay Updated</h4>
            <p className="text-muted-foreground text-sm">
              Get notified about new drops and exclusive content.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 RAVIO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
