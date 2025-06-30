import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
}

const Shop: React.FC = () => {
  const [sortBy, setSortBy] = useState('featured');
  const [filterCategory, setFilterCategory] = useState('all');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { addItem } = useCart();

  // Mock products data
  const products: Product[] = [
    {
      id: '1',
      name: 'Essential White Tee',
      price: 49,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
      category: 'essentials',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      id: '2',
      name: 'Premium Cotton Tee',
      price: 59,
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&q=80',
      category: 'premium',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: '3',
      name: 'Minimalist Classic',
      price: 45,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&q=80',
      category: 'essentials',
      sizes: ['XS', 'S', 'M', 'L']
    },
    {
      id: '4',
      name: 'Pure Elegance',
      price: 65,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80',
      category: 'premium',
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
      id: '5',
      name: 'Organic Blend Tee',
      price: 55,
      image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&q=80',
      category: 'organic',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      id: '6',
      name: 'Luxury Comfort',
      price: 75,
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80',
      category: 'premium',
      sizes: ['S', 'M', 'L', 'XL']
    }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter(product => product.category === filterCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    return filtered;
  }, [sortBy, filterCategory]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const quickAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: product.sizes[0], // Default to first available size
      image: product.image
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="pt-20 pb-20 md:pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Shop</h1>
          <p className="text-lg text-muted-foreground">
            Discover our collection of premium white T-shirts, each crafted with clarity and purpose.
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="essentials">Essentials</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="organic">Organic</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="product-card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-lg bg-muted/30">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </Link>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-2 rounded-full transition-colors ${
                      wishlist.includes(product.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 text-foreground hover:bg-white'
                    }`}
                  >
                    <Heart className="h-4 w-4" fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => quickAddToCart(product)}
                    className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold mb-1 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-2 capitalize">
                  {product.category}
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-bold">${product.price}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => quickAddToCart(product)}
                    className="text-xs px-3 py-1"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
