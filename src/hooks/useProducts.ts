import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { productsAPI } from '@/utils/api';

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useProducts = (limit = 12): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await productsAPI.getProducts(limit);
      setProducts(response.products);
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ||
        'An error occurred while loading products. Please try again later.';
      setError(errorMessage);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = async () => {
    await fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  return {
    products,
    isLoading,
    error,
    refetch,
  };
};
