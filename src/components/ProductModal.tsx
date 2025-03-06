
import React, { useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "../data/products";
import QuantityCounter from "./QuantityCounter";
import { useCart } from "../context/CartContext";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
    setQuantity(1); // Reset quantity
  };

  // Calculate price per item if package quantity exists
  const pricePerItem = product.packageQuantity && product.packageQuantity > 1
    ? (product.price / product.packageQuantity).toFixed(2)
    : null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[850px] p-0 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Product Image - White background */}
          <div className="w-full lg:w-1/2 bg-white flex items-center justify-center">
            <div className="relative aspect-square w-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain animate-blur-in"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2 p-6 flex flex-col h-[80vh] lg:h-auto">
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            
            <div className="flex-1 overflow-auto pr-2">
              <div className="mb-2 flex flex-wrap gap-2">
                {product.category && (
                  <Badge variant="secondary" className="text-xs font-medium">
                    {product.category}
                  </Badge>
                )}
                {product.type && product.type !== "Accessory" && (
                  <Badge variant="secondary" className="text-xs font-medium">
                    {product.type}
                  </Badge>
                )}
              </div>
              
              <h2 className="text-2xl font-medium tracking-tight">{product.name}</h2>
              
              {/* Price section with per item calculation */}
              <div className="mt-2 mb-4">
                <p className="text-2xl font-medium">${product.price.toFixed(2)}</p>
                {pricePerItem && (
                  <p className="text-sm text-muted-foreground">
                    ${pricePerItem} per item
                  </p>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <QuantityCounter
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={10}
                />
              </div>
              
              <Button 
                onClick={handleAddToCart} 
                className="w-full"
                size="lg"
              >
                Add to Cart
              </Button>
              
              {/* Accordions for additional details */}
              <div className="mt-4">
                <Accordion type="single" collapsible className="w-full">
                  {/* Product Details Accordion */}
                  <AccordionItem value="details">
                    <AccordionTrigger className="text-sm">Additional Details</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm">
                        {product.brand && (
                          <div className="flex gap-2">
                            <span className="font-medium">Brand:</span>
                            <span className="text-muted-foreground">{product.brand}</span>
                          </div>
                        )}
                        
                        {product.type && product.type !== "Accessory" && (
                          <div className="flex gap-2">
                            <span className="font-medium">Type:</span>
                            <span className="text-muted-foreground">{product.type}</span>
                          </div>
                        )}
                        
                        {product.thcContent && (
                          <div className="flex gap-2">
                            <span className="font-medium">THC Content:</span>
                            <span className="text-muted-foreground">{product.thcContent}</span>
                          </div>
                        )}
                        
                        {product.weight && (
                          <div className="flex gap-2">
                            <span className="font-medium">Weight:</span>
                            <span className="text-muted-foreground">{product.weight}</span>
                          </div>
                        )}
                        
                        {product.packageQuantity && product.packageQuantity > 1 && (
                          <div className="flex gap-2">
                            <span className="font-medium">Package Quantity:</span>
                            <span className="text-muted-foreground">{product.packageQuantity} items</span>
                          </div>
                        )}
                        
                        {product.details?.material && (
                          <div className="flex gap-2">
                            <span className="font-medium">Material:</span>
                            <span className="text-muted-foreground">{product.details.material}</span>
                          </div>
                        )}
                        
                        {product.details?.dimensions && (
                          <div className="flex gap-2">
                            <span className="font-medium">Dimensions:</span>
                            <span className="text-muted-foreground">{product.details.dimensions}</span>
                          </div>
                        )}
                        
                        {product.details?.weight && (
                          <div className="flex gap-2">
                            <span className="font-medium">Weight:</span>
                            <span className="text-muted-foreground">{product.details.weight}</span>
                          </div>
                        )}
                        
                        {product.details?.color && (
                          <div className="space-y-2">
                            <span className="font-medium">Available Colors:</span>
                            <div className="flex flex-wrap gap-2">
                              {product.details.color.map((color) => (
                                <span key={color} className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                                  {color}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Usage Instructions Accordion - Static content */}
                  <AccordionItem value="usage">
                    <AccordionTrigger className="text-sm">Usage Instructions</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>For adult use only. Keep out of reach of children and pets.</p>
                        <p>Follow local regulations regarding use and consumption.</p>
                        {product.type === "Edibles" && (
                          <p>Start with a small amount and wait at least 90 minutes before consuming more.</p>
                        )}
                        {product.type === "Flower" && (
                          <p>Store in a cool, dry place away from direct sunlight.</p>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Legal Information Accordion - Static content */}
                  <AccordionItem value="legal">
                    <AccordionTrigger className="text-sm">Legal Information</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>Products contain cannabis which can be intoxicating and may be habit forming.</p>
                        <p>Cannabis can impair concentration, coordination, and judgment.</p>
                        <p>Do not operate a vehicle or machinery under the influence of this drug.</p>
                        <p>There may be health risks associated with consumption of these products.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
