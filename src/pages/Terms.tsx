
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms: React.FC = () => {
  return (
    <div className="pt-20 pb-20 md:pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Terms & Conditions</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our website and services.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: January 1, 2025
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Agreement to Terms */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Agreement to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                By accessing and using this website, you accept and agree to be bound by the terms and provision 
                of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          {/* Use License */}
          <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle>Use License</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Permission is granted to temporarily download one copy of RAVIO materials for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                This license shall automatically terminate if you violate any of these restrictions and may be 
                terminated by RAVIO at any time. Upon terminating your viewing of these materials or upon the 
                termination of this license, you must destroy any downloaded materials in your possession.
              </p>
            </CardContent>
          </Card>

          {/* Purchases and Payment */}
          <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle>Purchases and Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Order Acceptance</h4>
                <p className="text-muted-foreground">
                  All orders are subject to acceptance by RAVIO. We reserve the right to refuse or cancel any order 
                  for any reason, including but not limited to product availability, errors in product information, 
                  or problems identified by our fraud prevention systems.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Pricing</h4>
                <p className="text-muted-foreground">
                  All prices are in US dollars and are subject to change without notice. We reserve the right to 
                  modify prices at any time. Price changes will not affect orders that have already been processed.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Payment</h4>
                <p className="text-muted-foreground">
                  Payment is due at the time of purchase. We accept major credit cards and other payment methods 
                  as displayed on our website. By providing payment information, you represent that you are 
                  authorized to use the payment method.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Shipping and Delivery */}
          <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <CardTitle>Shipping and Delivery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Shipping and delivery terms are subject to our Shipping Policy. Risk of loss and title for items 
                purchased pass to you upon delivery to the shipping carrier. Delivery dates are estimates only 
                and we are not liable for delays caused by shipping carriers or other factors beyond our control.
              </p>
            </CardContent>
          </Card>

          {/* Returns and Refunds */}
          <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <CardTitle>Returns and Refunds</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Returns and refunds are governed by our Returns & Refunds Policy. All sales are final unless 
                the item is defective or we made an error in your order. Items must be returned in original 
                condition within 14 days of delivery.
              </p>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
            <CardHeader>
              <CardTitle>User Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Account Responsibility</h4>
                <p className="text-muted-foreground">
                  You are responsible for maintaining the confidentiality of your account credentials and for all 
                  activities that occur under your account. You must notify us immediately of any unauthorized use.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Accurate Information</h4>
                <p className="text-muted-foreground">
                  You agree to provide accurate, current, and complete information during registration and to 
                  update such information to keep it accurate, current, and complete.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Uses */}
          <Card className="animate-fade-in" style={{ animationDelay: '600ms' }}>
            <CardHeader>
              <CardTitle>Prohibited Uses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">
                You may not use our website or services:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
                <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                <li>For any obscene or immoral purpose</li>
                <li>To interfere with or circumvent the security features of the service</li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="animate-fade-in" style={{ animationDelay: '700ms' }}>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The service and its original content, features, and functionality are and will remain the exclusive 
                property of RAVIO and its licensors. The service is protected by copyright, trademark, and other laws. 
                Our trademarks and trade dress may not be used in connection with any product or service without our 
                prior written consent.
              </p>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="animate-fade-in" style={{ animationDelay: '800ms' }}>
            <CardHeader>
              <CardTitle>Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The materials on RAVIO's website are provided on an 'as is' basis. RAVIO makes no warranties, 
                expressed or implied, and hereby disclaims and negates all other warranties including without 
                limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, 
                or non-infringement of intellectual property or other violation of rights.
              </p>
              <p className="text-muted-foreground mt-4">
                Further, RAVIO does not warrant or make any representations concerning the accuracy, likely results, 
                or reliability of the use of the materials on its website or otherwise relating to such materials 
                or on any sites linked to this site.
              </p>
            </CardContent>
          </Card>

          {/* Limitations */}
          <Card className="animate-fade-in" style={{ animationDelay: '900ms' }}>
            <CardHeader>
              <CardTitle>Limitations of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                In no event shall RAVIO or its suppliers be liable for any damages (including, without limitation, 
                damages for loss of data or profit, or due to business interruption) arising out of the use or 
                inability to use the materials on RAVIO's website, even if RAVIO or an authorized representative 
                has been notified orally or in writing of the possibility of such damage. Because some jurisdictions 
                do not allow limitations on implied warranties, or limitations of liability for consequential or 
                incidental damages, these limitations may not apply to you.
              </p>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card className="animate-fade-in" style={{ animationDelay: '1000ms' }}>
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                These terms and conditions are governed by and construed in accordance with the laws of New York, 
                United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that 
                state or location.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="animate-fade-in" style={{ animationDelay: '1100ms' }}>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                RAVIO reserves the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will try to provide at least 30 days notice prior to any new terms 
                taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="animate-fade-in" style={{ animationDelay: '1200ms' }}>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> <a href="mailto:legal@ravio.store" className="text-primary hover:underline">legal@ravio.store</a></p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Address:</strong></p>
                <p className="ml-4 text-muted-foreground">
                  RAVIO<br />
                  123 Design Street<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;
