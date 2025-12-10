'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { initOnboard } from 'embeddable-tour-platform';
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  Clock,
  Plus,
  Minus,
  Share2,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import Script from 'next/script';

export default function DemoPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  // useEffect(() => {
  //   if (!window?.initOnboard) return;

  //   const widget = window.initOnboard({
  //     tourId: "demo-tour2",
  //     resume: true,
  //     onEvent: (e) => console.log("analytic", e),
  //     // styles: { tooltip: {...}, button: {...} },
  //   });
  //   widget.start()

  // }, []);

    // const widget = window.initOnboard({ 
    //   tourId: 13, 
    //   secret_key: "33705fc3-019d-43d2-a41a-89947fa0236d",
    //   resume: true,
    //   styles: {
    //     tooltip: {
    //     color: '#fff',
    //     background: 'linear-gradient(145deg, #ff7eb9, #ff758c, #ffafbd, #ffc3a0)',
    //     boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35), 0 0 12px rgba(255, 200, 255, 0.6)',
    //     backdropFilter: 'blur(6px)',
    //     border: '1px solid rgba(255, 255, 255, 0.3)',
    //     textShadow: '0 1px 2px rgba(0,0,0,0.2)',
    //     transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
    //   },
    //   button: {
    //     backgroundColor: 'red'
    //   },
    //   },
    //   onEvent: console.log
    // });

  return (
    <>
      {/* <Script
        src="https://embeddable-tour-platform.vercel.app/onboard.iife.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Tour script loaded");

          // Wait until the global function is really available
          const check = setInterval(() => {
            if (window.initOnboard) {
              clearInterval(check);

              const widget = window.initOnboard({
                tourId: "",
                resume: true,
                onEvent: (e) => console.log("analytics event:", e),
              });

              widget.start();
            }
          }, 200);
        }}
      /> */}

      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header
          className="bg-white shadow-sm border-b sticky top-0 z-50"
          data-tour="header"
          id="header"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <h1 className="text-2xl font-bold bg-linear-to-r from-brand-teal to-brand-sky bg-clip-text text-transparent">
                  ShopStyle
                </h1>
                <nav className="hidden md:flex gap-6">
                  <a href="#" className="text-slate-600 hover:text-brand-teal transition-colors">New</a>
                  <a href="#" className="text-slate-600 hover:text-brand-teal transition-colors">Men</a>
                  <a href="#" className="text-slate-600 hover:text-brand-teal transition-colors">Women</a>
                  <a href="#" className="text-slate-600 hover:text-brand-teal transition-colors">Sale</a>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  data-tour="wishlist-button"
                  id="wishlist-btn"
                >
                  <Heart className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-brand-blush text-white text-xs">
                    3
                  </Badge>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  data-tour="cart-button"
                  id="cart-btn"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-brand-teal text-white text-xs">
                    2
                  </Badge>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-8">
            <a href="#" className="hover:text-brand-teal">Home</a>
            <ChevronRight className="h-4 w-4" />
            <a href="#" className="hover:text-brand-teal">Men</a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-900">Classic Denim Jacket</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            
            <div className="space-y-4" id="product-gallery">
              <Card
                className="overflow-hidden border-2 border-slate-200 rounded-3xl"
                data-tour="product-image"
                id="product-image"
              >
                <div className="aspect-square bg-slate-200 flex items-center justify-center relative">
                  <div className="text-slate-400 text-6xl">🧥</div>
                  <Badge
                    className="absolute top-4 right-4 bg-amber-500 text-white border-0"
                    data-tour="product-badge"
                  >
                    20% OFF
                  </Badge>
                </div>
              </Card>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="aspect-square bg-slate-200 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-brand-teal transition-colors">
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-2xl">
                      🧥
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6" id="product-details">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">
                  Classic Denim Jacket
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-slate-600">4.8 (324 reviews)</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-slate-900">$79.99</span>
                  <span className="text-xl text-slate-400 line-through">$99.99</span>
                  <Badge className="bg-green-100 text-green-700 border-0">Save $20</Badge>
                </div>
              </div>

              <div className="border-t border-b border-slate-200 py-6 space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  A timeless classic reimagined for modern style. This premium denim jacket
                  features a comfortable fit, durable construction, and versatile design that
                  pairs perfectly with any outfit.
                </p>
              </div>

              {/* Size Selection */}
              <div
                data-tour="size-selector"
                id="size-selector"
              >
                <div className="flex items-center justify-between mb-3">
                  <label className="font-semibold text-slate-900">Select Size</label>
                  <a href="#" className="text-sm text-brand-teal hover:underline">Size Guide</a>
                </div>
                <div className="flex gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 rounded-xl border-2 font-semibold transition-all ${
                        selectedSize === size
                          ? 'border-brand-teal bg-brand-teal text-white shadow-lg'
                          : 'border-slate-200 hover:border-brand-teal text-slate-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div
                data-tour="quantity-selector"
                id="quantity-selector"
              >
                <label className="font-semibold text-slate-900 block mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded-none hover:bg-slate-100"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="rounded-none hover:bg-slate-100"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-slate-600">Only 12 items left in stock</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className="flex gap-3"
                data-tour="action-buttons"
                id="action-buttons"
              >
                <Button
                  id="add-to-cart-button" className="flex-1 h-14 text-lg bg-linear-to-r from-brand-teal to-brand-sky hover:from-brand-teal/90 hover:to-brand-sky/90 text-white rounded-full shadow-lg cursor-pointer"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={`h-14 w-14 rounded-full border-2 cursor-pointer transition-all ${
                    isWishlisted
                      ? 'border-brand-blush bg-brand-blush/10'
                      : 'border-slate-300 hover:border-brand-blush'
                  }`}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-brand-blush text-brand-blush' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 rounded-full border-2 border-slate-300 hover:border-brand-teal cursor-pointer"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 text-center border-2 border-slate-100">
                  <Truck className="h-6 w-6 mx-auto mb-2 text-brand-teal" />
                  <p className="text-xs font-medium text-slate-900">Free Shipping</p>
                  <p className="text-xs text-slate-500">On orders $50+</p>
                </Card>
                <Card className="p-4 text-center border-2 border-slate-100">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-brand-teal" />
                  <p className="text-xs font-medium text-slate-900">Secure Payment</p>
                  <p className="text-xs text-slate-500">100% Protected</p>
                </Card>
                <Card className="p-4 text-center border-2 border-slate-100">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-brand-teal" />
                  <p className="text-xs font-medium text-slate-900">Easy Returns</p>
                  <p className="text-xs text-slate-500">30-day policy</p>
                </Card>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div
            className="mt-16"
            data-tour="reviews-section"
            id="reviews-section"
          >
            <h2 className="text-3xl font-bold mb-8 text-slate-900">Customer Reviews</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { name: 'Sarah M.', rating: 5, review: 'Absolutely love this jacket! The fit is perfect and the quality is outstanding.' },
                { name: 'John D.', rating: 4, review: 'Great jacket, runs slightly large but very comfortable and stylish.' }
              ].map((review, i) => (
                <Card key={i} className="p-6 border-2 border-slate-100 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-brand-teal/20 flex items-center justify-center font-bold text-brand-teal">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{review.name}</p>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600">{review.review}</p>
                </Card>
              ))}
            </div>
          </div>
        </main>

        {/* Tour Widget Placeholder - Your embeddable widget will be injected here */}
        <div id="tourguide-widget-root"></div>
      </div>
    </>
  );
}
