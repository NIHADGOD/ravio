
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const Returns: React.FC = () => {
  return (
    <div className="pt-20 pb-20 md:pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Returns & Refunds</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We want you to love your RAVIO purchase. If you're not completely satisfied, here's how our return process works.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Return Policy Overview */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-6 w-6" />
                Return Policy Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Clock className="h-12 w-12 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">14-Day Window</h3>
                  <p className="text-sm text-muted-foreground">
                    Returns must be initiated within 14 days of delivery
                  </p>
                </div>
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Original Condition</h3>
                  <p className="text-sm text-muted-foreground">
                    Items must be unworn with original packaging and tags
                  </p>
                </div>
                <div className="text-center">
                  <AlertCircle className="h-12 w-12 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Return Shipping</h3>
                  <p className="text-sm text-muted-foreground">
                    Customer pays return shipping unless item is defective
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Return Process */}
          <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle>How to Return Your Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Contact Us</h4>
                    <p className="text-muted-foreground">
                      Email us at <a href="mailto:contact@ravio.store" className="text-primary hover:underline">contact@ravio.store</a> with your order number and reason for return.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Receive Return Authorization</h4>
                    <p className="text-muted-foreground">
                      We'll send you a return authorization number and instructions within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Package Your Item</h4>
                    <p className="text-muted-foreground">
                      Place the item in its original packaging with tags attached. Include the return authorization number.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Ship Your Return</h4>
                    <p className="text-muted-foreground">
                      Send the package to our returns center using a trackable shipping method.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Receive Your Refund</h4>
                    <p className="text-muted-foreground">
                      Once we receive and inspect your return, we'll process your refund within 3-5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Return Conditions */}
          <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle>Return Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">✓ Returnable Items</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Items in original condition with tags</li>
                    <li>• Unworn and unwashed products</li>
                    <li>• Items in original packaging</li>
                    <li>• Returns within 14 days of delivery</li>
                    <li>• Defective or damaged items</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-red-600">✗ Non-Returnable Items</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Worn or washed items</li>
                    <li>• Items without original tags</li>
                    <li>• Items past the 14-day return window</li>
                    <li>• Items damaged by customer</li>
                    <li>• Sale or clearance items (unless defective)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refund Information */}
          <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <CardTitle>Refund Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Processing Time</h4>
                <p className="text-muted-foreground">
                  Refunds are processed within 3-5 business days after we receive and inspect your return. 
                  The time it takes for the refund to appear in your account depends on your payment method and bank.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Refund Method</h4>
                <p className="text-muted-foreground">
                  Refunds will be issued to the original payment method used for the purchase. 
                  We cannot process refunds to a different payment method.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Partial Refunds</h4>
                <p className="text-muted-foreground">
                  In some cases, partial refunds may be issued for items that show signs of use, 
                  missing tags, or other conditions that affect the item's resale value.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Exchanges */}
          <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <CardTitle>Exchanges</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We currently don't offer direct exchanges. If you need a different size or have received 
                a defective item, please return the original item for a refund and place a new order.
              </p>
              <p className="text-muted-foreground">
                For defective items, we'll provide a prepaid return label and expedite the processing 
                of your refund so you can reorder quickly.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about our return policy or need assistance with a return, 
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

export default Returns;
