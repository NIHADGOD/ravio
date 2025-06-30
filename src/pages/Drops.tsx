
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Instagram, Share } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

const Drops: React.FC = () => {
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 30,
    seconds: 45
  });

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dropItems = [
    {
      id: 1,
      name: 'Essential White Tee',
      price: '$45',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=600&fit=crop',
      available: true
    },
    {
      id: 2,
      name: 'Premium Cotton Blend',
      price: '$65',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=600&fit=crop',
      available: true
    },
    {
      id: 3,
      name: 'Oversized Comfort',
      price: '$55',
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=500&h=600&fit=crop',
      available: false
    },
    {
      id: 4,
      name: 'Minimalist Classic',
      price: '$50',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=600&fit=crop',
      available: true
    }
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Drop signup:', email);
    setEmail('');
  };

  const handleShare = (platform: string) => {
    console.log(`Share on ${platform}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="outline" className="mb-6 text-sm font-medium">
            NEW RELEASE
          </Badge>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4 tracking-tight">
            DROP 01 — ELEMENTS
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our inaugural collection celebrates the fundamental beauty of simplicity. 
            Four essential pieces, crafted in clarity.
          </p>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="py-8 px-4 bg-muted/20">
        <div className="container mx-auto text-center">
          <p className="text-sm uppercase tracking-wide text-muted-foreground mb-4">
            Available in
          </p>
          <div className="flex justify-center space-x-6 md:space-x-8">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="text-2xl md:text-3xl font-bold font-mono">
                  {value.toString().padStart(2, '0')}
                </div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  {unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Product */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Badge variant="outline" className="mb-4">
                HERO PIECE
              </Badge>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                Essential White Tee
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                The cornerstone of conscious dressing. Crafted from organic cotton 
                with a modern fit that transcends seasons and trends.
              </p>
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-2xl font-bold">$45</span>
                <Badge>Free Shipping</Badge>
              </div>
              <Button size="lg" className="w-full md:w-auto">
                Shop Now
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-square bg-muted/30 rounded-lg overflow-hidden group cursor-zoom-in">
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=600&fit=crop"
                  alt="Essential White Tee"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drop Items Carousel */}
      <section className="py-16 px-4 bg-muted/10">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
              Complete Collection
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Four thoughtfully designed pieces that form the foundation of a conscious wardrobe.
            </p>
          </div>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {dropItems.map((item) => (
                <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="border-0 shadow-none">
                    <CardContent className="p-0">
                      <div className="aspect-[4/5] bg-muted/30 rounded-lg overflow-hidden mb-4 group">
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-lg font-bold">{item.price}</p>
                        <Button 
                          variant={item.available ? "default" : "outline"} 
                          size="sm" 
                          className="w-full"
                          disabled={!item.available}
                        >
                          {item.available ? 'Add to Cart' : 'Notify Me'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-8">
              The Philosophy
            </h3>
          </div>
          
          <div className="prose prose-lg mx-auto text-center">
            <p className="text-muted-foreground leading-relaxed mb-8">
              In a world of endless choices, we choose clarity. Each piece in Drop 01 
              represents our commitment to thoughtful design, sustainable practices, 
              and timeless aesthetics. We believe that true luxury lies not in excess, 
              but in the perfect execution of the essential.
            </p>
            
            <blockquote className="text-2xl md:text-3xl font-playfair italic font-light border-l-4 border-primary pl-6 my-12 text-left">
              "Simplicity is the ultimate sophistication. Every thread, every seam, 
              every detail serves a purpose."
            </blockquote>
            
            <p className="text-muted-foreground leading-relaxed">
              Drop 01 — Elements marks the beginning of a new chapter. Four pieces 
              that embody our vision of conscious fashion: purposeful, beautiful, 
              and built to last.
            </p>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-2xl text-center">
          <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
            Stay in the Loop
          </h3>
          <p className="text-muted-foreground mb-8">
            Be the first to know about new drops, exclusive content, and behind-the-scenes updates.
          </p>
          
          <form onSubmit={handleEmailSubmit} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground mb-6">Share the Drop</p>
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleShare('instagram')}
              className="flex items-center space-x-2"
            >
              <Instagram className="h-4 w-4" />
              <span>Instagram</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleShare('general')}
              className="flex items-center space-x-2"
            >
              <Share className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Drops;
