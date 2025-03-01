export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
  brand?: string;
  type?: "Indica" | "Sativa" | "Hybrid" | string;
  thcContent?: string;
  weight?: string;
  packageQuantity?: number;
  details?: {
    material?: string;
    dimensions?: string;
    weight?: string;
    color?: string[];
  };
  created_at?: string;
  updated_at?: string;
  brand_id?: string;
  category_id?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium CBD Oil",
    description: "High-quality CBD oil for relaxation and wellness.",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1614927252455-ea5c8a3a4b9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Tinctures",
    featured: true,
    brand: "HealWell",
    type: "Hybrid",
    thcContent: "2%",
    weight: "30ml",
    packageQuantity: 1,
    details: {
      material: "Full Spectrum Extract",
      dimensions: "30ml Bottle",
      weight: "1.2 oz",
      color: ["Clear", "Amber"]
    }
  },
  {
    id: "2",
    name: "Infused Pre-Rolls",
    description: "Expertly crafted pre-rolls for a premium experience.",
    price: 38.00,
    image: "https://images.unsplash.com/photo-1603909223429-69bb7db0c942?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Flower",
    brand: "CloudNine",
    type: "Indica",
    thcContent: "22%",
    weight: "1g each",
    packageQuantity: 5,
    details: {
      material: "Indoor Grown",
      dimensions: "Standard Size",
      weight: "1g each",
      color: ["Green", "Purple"]
    }
  },
  {
    id: "3",
    name: "Cannabis-Infused Gummies",
    description: "Delicious fruit-flavored edibles for a consistent dose.",
    price: 24.50,
    image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Edibles",
    brand: "SweetRelief",
    type: "Hybrid",
    thcContent: "10mg per piece",
    weight: "100mg total",
    packageQuantity: 10,
    details: {
      material: "Natural Ingredients",
      dimensions: "10 pieces per pack",
      weight: "100mg total",
      color: ["Assorted"]
    }
  },
  {
    id: "4",
    name: "Vape Cartridge",
    description: "Premium distillate vape cartridge with natural terpenes.",
    price: 49.00,
    image: "https://images.unsplash.com/photo-1579119165870-8296f3157e38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Concentrates",
    featured: true,
    brand: "VaporPath",
    type: "Sativa",
    thcContent: "85%",
    weight: "1g",
    packageQuantity: 1,
    details: {
      material: "Glass and Metal",
      dimensions: "510 Thread",
      weight: "1g",
      color: ["Gold", "Clear"]
    }
  },
  {
    id: "5",
    name: "Hemp-Infused Salve",
    description: "Soothing topical cream for localized relief.",
    price: 35.99,
    image: "https://images.unsplash.com/photo-1616690248366-8b93fab0bf95?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Topicals",
    brand: "NatureCure",
    type: "CBD",
    thcContent: "0.3%",
    weight: "2oz",
    packageQuantity: 1,
    details: {
      material: "All-Natural",
      dimensions: "2oz Container",
      weight: "2 oz",
    }
  },
  {
    id: "6",
    name: "CBD Sleep Tincture",
    description: "Specialized formula with melatonin for improved sleep.",
    price: 58.00,
    image: "https://images.unsplash.com/photo-1611932843289-31e42dc42c83?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Tinctures",
    brand: "DreamWell",
    type: "CBD",
    thcContent: "1%",
    weight: "30ml",
    packageQuantity: 1,
    details: {
      material: "MCT Oil Base",
      dimensions: "30ml Dropper Bottle",
      color: ["Dark Amber"]
    }
  },
  {
    id: "7",
    name: "Cannabis Terpene Diffuser",
    description: "Aromatherapy device using natural cannabis terpenes.",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1614142729092-ada8560bae78?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Accessories",
    brand: "AromaTech",
    type: "Accessory",
    packageQuantity: 1,
    details: {
      material: "Ceramic",
      dimensions: "6\" × 6\" × 6\"",
      weight: "1.8 lbs",
      color: ["White", "Black", "Green"]
    }
  },
  {
    id: "8",
    name: "Hemp Rolling Papers",
    description: "Premium organic hemp rolling papers with natural gum.",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1580251645806-90408ee84aae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Accessories",
    brand: "PureRoll",
    type: "Accessory",
    packageQuantity: 50,
    details: {
      material: "Organic Hemp",
      dimensions: "King Size",
      weight: "14g",
    }
  }
];
