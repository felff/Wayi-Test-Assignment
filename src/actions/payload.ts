import { getPayload } from 'payload';
import config from '@payload-config';

const getPayloadClient = async () => {
  const payload = await getPayload({ config });
  if (payload) return payload;
  throw new Error('Payload client not found');
};

// ✅ 1. Server-side 用法：get all products (or paginated)
export const getProducts = async (page = 1, limit = 12) => {
  const payload = await getPayloadClient();
  try {
    const data = await payload.find({
      collection: 'products',
      pagination: true,
      limit,
      page,
      sort: '-quantity',
    });
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// ✅ Server-side 讀取設定資料
export const getLineID = async () => {
  const payload = await getPayloadClient();
  try {
    const data = await payload.find({
      collection: 'settings',
      pagination: false,
    });
    return data;
  } catch (error) {
    console.error('Error fetching line ID:', error);
    throw error;
  }
};

//client
export const fetchProducts = async (page = 1, limit = 12) => {
  const res = await fetch(`/api/products?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};
