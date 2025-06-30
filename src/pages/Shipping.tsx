
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Clock, Package, MapPin } from 'lucide-react';

const Shipping: React.FC = () => {
  return (
    <div className="pt-20 pb-20 md:pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Shipping Policy</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fast, reliable shipping to get your RAVIO essentials to you quickly and safely.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Shipping Overview */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-6 w-6" />
                Shipping Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Clock className="h-12 w-12 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Processing Time</h3>
                  <p className="text-sm text-muted-foreground">
                    1-3 business days
                  </p>
                </div>
                <div className="text-center">
                  <Package className="h-12 w-12 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Delivery Time</h3>
                  <p className="text-sm text-muted-foreground">
                    5-10 business days
                  </p>
                </div>
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Free Shipping</h3>
                  <p className="text-sm text-muted-foreground">
                    On orders over $80
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Methods */}
          <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle>Shipping Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">Standard Shipping</h4>
                    <span className="font-bold">$9.99</span>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Delivery within 5-10 business days via local courier
                  </p>
                  <p className="text-sm text-green-600 font-medium">
                    ✓ Free on orders over $80
                  </p>
                </div>

                <div className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">Express Shipping</h4>
                    <span className="font-bold">$19.99</span>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Delivery within 2-3 business days via priority courier
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Available for all orders
                  </p>
                </div>

                <div className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">Overnight Shipping</h4>
                    <span className="font-bold">$29.99</span>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Next business day delivery (orders placed before 2 PM EST)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Available Monday-Thursday only
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Processing Information */}
          <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle>Order Processing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Processing Time</h4>
                <p className="text-muted-foreground">
                  All orders are processed within 1-3 business days (Monday through Friday, excluding holidays). 
                  Orders placed on weekends or holidays will be processed the next business day.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Order Confirmation</h4>
                <p className="text-muted-foreground">
                  You'll receive an order confirmation email immediately after placing your order, 
                  followed by a shipping confirmation with tracking information once your order has been dispatched.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Order Cutoff Times</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Standard & Express: Orders placed by 5 PM EST ship same day</li>
                  <li>• Overnight: Orders placed by 2 PM EST ship same day</li>
                  <li>• Weekend orders process on Monday</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Zones */}
          <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <CardTitle>Shipping Locations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Domestic Shipping</h4>
                <p className="text-muted-foreground">
                  We currently ship to all 50 United States, including Alaska and Hawaii, 
                  as well as Puerto Rico and other US territories.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">International Shipping</h4>
                <p className="text-muted-foreground">
                  International shipping is not currently available. We're working to expand 
                  our shipping options and hope to offer international delivery soon.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">PO Boxes & APO/FPO</h4>
                <p className="text-muted-foreground">
                  We can ship to PO Boxes and military addresses (APO/FPO) using standard shipping only. 
                  Express and overnight shipping are not available for these addresses.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Packaging */}
          <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <CardTitle>Packaging & Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Eco-Friendly Packaging</h4>
                <p className="text-muted-foreground">
                  All orders are carefully packaged in recyclable materials. We use minimal packaging 
                  to reduce environmental impact while ensuring your items arrive in perfect condition.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Tracking Information</h4>
                <p className="text-muted-foreground">
                  Once your order ships, you'll receive a tracking number via email. You can track 
                  your package's progress directly through our courier partner's website.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Delivery Requirements</h4>
                <p className="text-muted-foreground">
                  Most deliveries require a signature. If you're not available, the courier will 
                  leave a notice with instructions for redelivery or pickup.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Issues */}
          <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
            <CardHeader>
              <CardTitle>Shipping Issues</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Delayed Shipments</h4>
                <p className="text-muted-foreground">
                  While rare, shipments can be delayed due to weather, high shipping volumes, or other factors. 
                  We'll notify you of any significant delays and provide updated delivery estimates.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Lost or Damaged Packages</h4>
                <p className="text-muted-foreground">
                  If your package is lost or arrives damaged, please contact us immediately at 
                  <a href="mailto:contact@ravio.store" className="text-primary hover:underline"> contact@ravio.store</a>. 
                  We'll work with the courier to resolve the issue and ensure you receive your order.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Address Changes</h4>
                <p className="text-muted-foreground">
                  Address changes can only be made before your order ships. Once shipped, 
                  please contact the courier directly to arrange delivery to a different address.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="animate-fade-in" style={{ animationDelay: '600ms' }}>
            <CardHeader>
              <CardTitle>Questions?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about shipping or need assistance with your order, 
                please don't hesitate to contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> <a href="mailto:contact@ravio.store" className="text-primary hover:underline">contact@ravio.store</a></p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
