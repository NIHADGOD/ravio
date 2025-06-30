
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy: React.FC = () => {
  return (
    <div className="pt-20 pb-20 md:pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your privacy matters to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: January 1, 2025
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Information We Collect */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <p className="text-muted-foreground mb-2">
                  When you create an account, place an order, or contact us, we may collect:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Name and contact information (email, phone, address)</li>
                  <li>Payment information (processed securely by our payment partners)</li>
                  <li>Order history and preferences</li>
                  <li>Communications with our customer service team</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Automatically Collected Information</h4>
                <p className="text-muted-foreground mb-2">
                  When you visit our website, we automatically collect:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                  <li>Website usage patterns and preferences</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Order Processing & Customer Service</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Process and fulfill your orders</li>
                  <li>Send order confirmations and shipping updates</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Handle returns and refunds</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Marketing & Communications</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Send promotional emails and newsletters (with your consent)</li>
                  <li>Personalize your shopping experience</li>
                  <li>Inform you about new products and sales</li>
                  <li>Conduct market research and gather feedback</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Website Improvement</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Analyze website usage and performance</li>
                  <li>Improve our products and services</li>
                  <li>Prevent fraud and ensure security</li>
                  <li>Comply with legal requirements</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle>How We Share Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Service Providers</h4>
                <p className="text-muted-foreground">
                  We share your information with trusted third-party service providers who help us operate our business:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                  <li>Payment processors (to handle transactions securely)</li>
                  <li>Shipping companies (to deliver your orders)</li>
                  <li>Email service providers (to send communications)</li>
                  <li>Analytics providers (to improve our website)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Legal Requirements</h4>
                <p className="text-muted-foreground">
                  We may disclose your information when required by law, to protect our rights, 
                  or to comply with legal processes such as court orders or government requests.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Business Transfers</h4>
                <p className="text-muted-foreground">
                  In the event of a merger, acquisition, or sale of our business, 
                  your information may be transferred as part of that transaction.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers and data centers</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and employee training</li>
                <li>Payment data processed by PCI-compliant providers</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                However, no method of transmission over the Internet is 100% secure. 
                While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <CardTitle>Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Account Information</h4>
                <p className="text-muted-foreground">
                  You can access, update, or delete your account information at any time by logging into your account 
                  or contacting us directly.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Marketing Communications</h4>
                <p className="text-muted-foreground">
                  You can opt out of marketing emails at any time by clicking the unsubscribe link in our emails 
                  or by contacting us. You'll still receive important order-related communications.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Cookies</h4>
                <p className="text-muted-foreground">
                  You can control cookies through your browser settings. However, disabling cookies may affect 
                  your ability to use certain features of our website.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Data Deletion</h4>
                <p className="text-muted-foreground">
                  You can request deletion of your personal data by contacting us. We'll respond to your request 
                  within 30 days, subject to legal retention requirements.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* GDPR Compliance */}
          <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
            <CardHeader>
              <CardTitle>GDPR Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If you are a resident of the European Union, you have additional rights under the 
                General Data Protection Regulation (GDPR):
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><strong>Right to access:</strong> Request copies of your personal data</li>
                <li><strong>Right to rectification:</strong> Request correction of inaccurate data</li>
                <li><strong>Right to erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Right to restrict processing:</strong> Request limitation of data processing</li>
                <li><strong>Right to data portability:</strong> Request transfer of your data</li>
                <li><strong>Right to object:</strong> Object to processing of your personal data</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card className="animate-fade-in" style={{ animationDelay: '600ms' }}>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our website is not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13. If you are a parent or guardian and believe 
                your child has provided us with personal information, please contact us immediately.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Policy */}
          <Card className="animate-fade-in" style={{ animationDelay: '700ms' }}>
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time to reflect changes in our practices 
                or for legal reasons. We'll notify you of any material changes by email or by posting 
                a notice on our website. Your continued use of our services after any changes indicates 
                your acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="animate-fade-in" style={{ animationDelay: '800ms' }}>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this privacy policy or our data practices, 
                please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> <a href="mailto:privacy@ravio.store" className="text-primary hover:underline">privacy@ravio.store</a></p>
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

export default Privacy;
