
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingBag, Shield, Truck, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  // Featured products data
  const featuredProducts = [
    {
      id: '1',
      name: 'Essential White Tee',
      price: 49,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
      description: 'Our signature piece'
    },
    {
      id: '2',
      name: 'Premium Cotton Tee',
      price: 59,
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&q=80',
      description: 'Luxury comfort'
    },
    {
      id: '3',
      name: 'Minimalist Classic',
      price: 45,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&q=80',
      description: 'Timeless design'
    },
    {
      id: '4',
      name: 'Pure Elegance',
      price: 65,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80',
      description: 'Refined simplicity'
    }
  ];

  const lifestyleImages = [
    'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&q=80',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80'
  ];

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&q=80)',
            filter: 'brightness(0.7)'
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"
        />
        
        <div className="relative z-10 text-center text-white px-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 tracking-tight">
            Crafted in Clarity
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light">
            Discover the perfect white T-shirt. Minimalist design meets premium quality for the modern individual.
          </p>
          <Link to="/shop">
            <Button size="lg" className="btn-primary text-lg px-12 py-4 animate-zoom-in">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              Featured Collection
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Each piece is carefully crafted to embody our philosophy of clarity and simplicity.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id}
                className="product-card animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to={`/product/${product.id}`}>
                  <div className="relative overflow-hidden rounded-lg bg-muted/30">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white">
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="pt-4 text-center">
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                    <p className="font-bold">${product.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop">
              <Button variant="outline" size="lg" className="px-8">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Lifestyle Grid */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              Live in Clarity
            </h2>
            <p className="text-muted-foreground text-lg">
              See how RAVIO fits into your everyday moments.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
            {lifestyleImages.map((image, index) => (
              <div 
                key={index}
                className="relative overflow-hidden rounded-lg aspect-square group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <img
                  src={image}
                  alt={`Lifestyle ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-6 animate-fade-in">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Secure Payment</h3>
                <p className="text-sm text-muted-foreground">
                  Your payment information is protected with industry-standard encryption.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardContent className="pt-6">
                <Truck className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Fast Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Free shipping on orders over $80. Delivery within 5-10 business days.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <CardContent className="pt-6">
                <Star className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  14-day return policy. We stand behind the quality of every piece.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              Stay in the Loop
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Be the first to know about new collections and exclusive offers.
            </p>

            {isSubmitted ? (
              <div className="text-lg font-medium animate-fade-in">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow bg-white text-primary placeholder:text-muted-foreground"
                />
                <Button type="submit" variant="secondary" className="px-8">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
