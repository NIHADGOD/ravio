
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  // Mock product data (in real app, this would be fetched based on ID)
  const product = {
    id: id || '1',
    name: 'Essential White Tee',
    price: 49,
    originalPrice: 65,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80'
    ],
    description: 'Our signature Essential White Tee represents the perfect balance of minimalist design and premium quality. Crafted from 100% organic cotton, this piece embodies our philosophy of clarity in both form and function.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: [
      '100% Organic Cotton',
      'Pre-shrunk Fabric',
      'Reinforced Seams',
      'Tagless Design',
      'Machine Washable'
    ]
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        image: product.images[0]
      });
    }

    toast.success(`${product.name} (${selectedSize}) added to cart`);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <div className="pt-20 pb-20 md:pb-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8 animate-fade-in">
          <Link 
            to="/shop" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Product Images */}
          <div className="space-y-4 animate-fade-in">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted/30">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative overflow-hidden rounded-md flex-1 aspect-square ${
                    currentImageIndex === index ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div>
              <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border rounded-md font-medium transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border rounded-md hover:bg-muted transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border rounded-md hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 btn-primary"
                size="lg"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={toggleWishlist}
                variant="outline"
                size="lg"
                className={isWishlisted ? 'text-red-500 border-red-500' : ''}
              >
                <Heart 
                  className="h-5 w-5" 
                  fill={isWishlisted ? 'currentColor' : 'none'} 
                />
              </Button>
            </div>

            {/* Features List */}
            <div>
              <h3 className="font-semibold mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="care">Care Info</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6">
              <div className="prose prose-neutral max-w-none">
                <p>
                  The Essential White Tee is more than just a garment—it's a statement of intentional living. 
                  Each piece is carefully constructed using premium organic cotton that's been ethically sourced 
                  and processed without harmful chemicals.
                </p>
                <p>
                  Our commitment to clarity extends to every aspect of production, from the selection of materials 
                  to the final quality check. The result is a T-shirt that not only looks and feels exceptional 
                  but also aligns with your values.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="care" className="mt-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Care Instructions:</h4>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Machine wash cold with like colors</li>
                  <li>Use gentle cycle and mild detergent</li>
                  <li>Tumble dry low or hang to dry</li>
                  <li>Iron on low heat if needed</li>
                  <li>Do not bleach or dry clean</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  Following these care instructions will help maintain the quality and longevity of your RAVIO tee.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Shipping Information:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong>Processing Time:</strong> 1-3 business days</li>
                  <li><strong>Delivery Time:</strong> 5-10 business days</li>
                  <li><strong>Free Shipping:</strong> On orders over $80</li>
                  <li><strong>Express Shipping:</strong> Available at checkout</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  All orders are carefully packaged and shipped via our trusted courier partners. 
                  You'll receive a tracking number once your order ships.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
