export type Product = {
  id: number;
  name: string;
  description: string;
  sku?: string | null;
  price: number;
  old_price?: number | null;
  category: string;
  tags: string[];
  stock: number;
  weight: number;
  color: string;
  images: string[];
  unit_type: string;
  created_at: number;
  updated_at: number;
};
