
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted/30 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

          {/* Right Column - Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <div className="space-y-2">
                <Link to="/shop" className="block text-muted-foreground hover:text-foreground transition-colors">
                  All Products
                </Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
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
