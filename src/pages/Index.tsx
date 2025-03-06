
import React, { useState, useMemo, useEffect } from "react";
import { Product } from "../data/products";
import ProductModal from "../components/ProductModal";
import CartDrawer from "../components/CartDrawer";
import CartTab from "../components/CartTab";
import { CartProvider } from "../context/CartContext";
import { useQuery } from "@tanstack/react-query";
import { getProductsWithCategories } from "@/services/supabaseProductService";
import { getCategories } from "@/services/categoryService";
import ProductSearch from "@/components/ProductSearch";
import CategoryFilter from "@/components/CategoryFilter";
import ProductGrid from "@/components/ProductGrid";
import ProductCount from "@/components/ProductCount";

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Get hierarchical categories instead of flat categories
  const { data: allCategories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: getProductsWithCategories
  });

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
  };

  // Set up event listener for resetFilters from ProductGrid component
  useEffect(() => {
    const handleResetFilters = () => resetFilters();
    window.addEventListener('resetFilters', handleResetFilters);
    return () => window.removeEventListener('resetFilters', handleResetFilters);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (product.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
      
      // Check if product matches any selected category or its subcategories
      const matchesCategory = () => {
        if (selectedCategories.length === 0) return true;
        
        // Check direct category match
        if (selectedCategories.includes(product.category)) return true;
        
        // Find selected parent categories that have subcategories
        for (const category of allCategories) {
          if (selectedCategories.includes(category.name) && category.subcategories) {
            // Check if product's category is a subcategory of this selected parent
            const isSubcategory = category.subcategories.some(sub => sub.name === product.category);
            if (isSubcategory) return true;
          }
        }
        
        return false;
      };
      
      return matchesSearch && matchesCategory();
    });
  }, [searchQuery, selectedCategories, products, allCategories]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <header className="mb-10">
            <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">Product Catalogue</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Browse our collection of premium products
            </p>
          </header>

          <div className="mb-8 space-y-4">
            <ProductSearch 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />

            <CategoryFilter 
              allCategories={allCategories} 
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              resetFilters={resetFilters}
            />
          </div>

          <ProductCount 
            filteredCount={filteredProducts.length} 
            totalCount={products.length} 
          />

          <ProductGrid 
            products={filteredProducts} 
            onProductClick={openProductModal} 
            isLoading={isLoadingProducts}
          />
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeProductModal}
      />

      <CartDrawer />
      <CartTab />
    </CartProvider>
  );
};

export default Index;
