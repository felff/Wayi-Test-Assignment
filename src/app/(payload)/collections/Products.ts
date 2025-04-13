// src/collections/Products.ts
import { CollectionConfig } from 'payload';

const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: '商品',
    plural: '商品',
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: '商品名稱',
      type: 'text',
      required: true,
    },
    {
      name: 'quantity',
      label: '數量',
      type: 'number',
      required: true,
    },
    {
      name: 'createdAt',
      label: '上架日期',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'description',
      label: '商品描述',
      type: 'textarea',
    },
    {
      name: 'image',
      label: '商品圖片',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
};

export default Products;
