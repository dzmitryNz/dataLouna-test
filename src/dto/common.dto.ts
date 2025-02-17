interface ApiError {
  errors: string[];
}

interface Item {
  market_hash_name: string;
  item_page: string;
  market_page: string;
  quantity: number;
  currency: string;
  min_price: number;
  suggested_price: number;
  created_at: number;
  updated_at: number;
}

export type Product = {
  id: string;
  name: string;
  item_page: string;
  quantity: number;
  currency: string;
  price: string;
  created_at: Date;
  updated_at: Date;
}