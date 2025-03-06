
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ProductPriceCardProps {
  price: number;
  packUnit: string;
  packageQuantity?: number;
  pricePerItem: string | null;
  inventory?: number | null;
  backordered?: boolean;
}

const ProductPriceCard: React.FC<ProductPriceCardProps> = ({ 
  price, 
  packUnit, 
  packageQuantity, 
  pricePerItem,
  inventory,
  backordered
}) => {
  const isOutOfStock = inventory === 0 || inventory === null;
  const cardClassName = `mt-3 mb-4 shadow-sm ${(!isOutOfStock && !backordered) ? 'bg-white' : ''}`;

  return (
    <Card className={cardClassName}>
      <CardContent className="p-3">
        <div className="flex flex-col gap-1">
          {/* Price section with pack unit type */}
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-medium">${price.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">per {packUnit}</p>
          </div>
          
          {/* Package quantity and price per item */}
          {packageQuantity && packageQuantity > 1 && (
            <div className="text-sm text-muted-foreground">
              Contains {packageQuantity} items at ${pricePerItem} per item
            </div>
          )}

          {/* Inventory status */}
          {!backordered && inventory !== undefined && (
            <div className={`text-sm font-medium mt-1 ${isOutOfStock ? 'text-red-600' : 'text-emerald-600'}`}>
              {isOutOfStock
                ? 'Out of Stock' 
                : inventory < 5 
                  ? `Only ${inventory} left in stock!` 
                  : `${inventory} in stock`}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductPriceCard;
