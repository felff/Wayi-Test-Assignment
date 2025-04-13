import { getPayload } from 'payload';
import config from '@payload-config';

const getPayloadClient = async () => {
  const payload = await getPayload({ config });
  if (payload) return payload;
  throw new Error('Payload client not found');
};

export const getLineID = async () => {
  const payload = await getPayloadClient();
  try {
    const data = await payload.find({
      collection: 'settings',
      pagination: false,
    });
    return data;
  } catch (error) {
    console.error('Error fetching tabs:', error);
    throw error;
  }
};

export const getProducts = async () => {
  const payload = await getPayloadClient();
  try {
    const data = await payload.find({
      collection: 'products',
      pagination: false,
    });
    return data;
  } catch (error) {
    console.error('Error fetching tabs:', error);
    throw error;
  }
};
