
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';

const Lookbook: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const lookbook = {
    'DROP 01': [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=1000&fit=crop',
        title: 'Urban Minimalist',
        description: 'Essential White Tee styled for city living',
        products: ['Essential White Tee - $45']
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1000&fit=crop',
        title: 'Studio Sessions',
        description: 'Premium Cotton Blend in creative spaces',
        products: ['Premium Cotton Blend - $65']
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=1000&fit=crop',
        title: 'Casual Comfort',
        description: 'Oversized Comfort for relaxed moments',
        products: ['Oversized Comfort - $55']
      },
      {
        id: 4,
        image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=1000&fit=crop',
        title: 'Modern Living',
        description: 'Minimalist Classic in contemporary settings',
        products: ['Minimalist Classic - $50']
      }
    ],
    'DROP 02': [
      {
        id: 5,
        image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=1000&fit=crop&brightness=0.9',
        title: 'Coming Soon',
        description: 'Next collection preview',
        products: ['New Arrivals - TBA']
      },
      {
        id: 6,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1000&fit=crop&brightness=0.9',
        title: 'Preview',
        description: 'Sneak peek of upcoming designs',
        products: ['Future Release - TBA']
      }
    ]
  };

  const allImages = [...lookbook['DROP 01'], ...lookbook['DROP 02']];

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = allImages.findIndex(img => img.id === selectedImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : allImages.length - 1;
    } else {
      newIndex = currentIndex < allImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(allImages[newIndex].id);
  };

  const selectedImageData = selectedImage ? allImages.find(img => img.id === selectedImage) : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto text-center">
          <div className="relative inline-block mb-6">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold tracking-tight">
              Lookbook
            </h1>
            <div className="absolute -bottom-2 -right-8 text-xs text-muted-foreground opacity-60 rotate-12">
              RAVIO
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visual stories of clarity and purpose. Discover how RAVIO pieces integrate 
            seamlessly into modern life.
          </p>
        </div>
      </section>

      {/* Collection Tabs */}
      <section className="px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="DROP 01" className="w-full">
            <TabsList className="grid w-full max-w-sm mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="DROP 01">DROP 01</TabsTrigger>
              <TabsTrigger value="DROP 02">DROP 02</TabsTrigger>
            </TabsList>

            {Object.entries(lookbook).map(([collection, images]) => (
              <TabsContent key={collection} value={collection}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {images.map((item, index) => (
                    <Card 
                      key={item.id} 
                      className="group cursor-pointer border-0 shadow-none overflow-hidden"
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => openLightbox(item.id)}
                    >
                      <CardContent className="p-0 relative">
                        <div className="aspect-[4/5] overflow-hidden rounded-lg">
                          <img 
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                          />
                          
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                            <Button variant="secondary" size="sm" className="opacity-90">
                              View Look
                            </Button>
                          </div>
                          
                          {/* Watermark */}
                          <div className="absolute bottom-4 right-4 text-white/60 text-xs font-medium tracking-wide">
                            RAVIO
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{item.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {collection}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl w-full h-[90vh] p-0 border-0 bg-black">
          {selectedImageData && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={() => navigateLightbox('prev')}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={() => navigateLightbox('next')}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Image */}
              <img 
                src={selectedImageData.image}
                alt={selectedImageData.title}
                className="max-w-full max-h-full object-contain"
              />

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-playfair font-bold mb-2">
                      {selectedImageData.title}
                    </h3>
                    <p className="text-white/80 mb-4">
                      {selectedImageData.description}
                    </p>
                    <div className="space-y-1">
                      {selectedImageData.products.map((product, index) => (
                        <p key={index} className="text-sm text-white/60">
                          {product}
                        </p>
                      ))}
                    </div>
                  </div>
                  
                  <Button variant="secondary" className="flex items-center space-x-2">
                    <ShoppingBag className="h-4 w-4" />
                    <span>Shop This Look</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-muted/10">
        <div className="container mx-auto text-center max-w-2xl">
          <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
            Your Story Awaits
          </h3>
          <p className="text-muted-foreground mb-8">
            Each piece is designed to be part of your personal narrative. 
            Discover the collection and create your own moments of clarity.
          </p>
          <Button size="lg" asChild>
            <a href="/shop">Shop the Collection</a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Lookbook;
