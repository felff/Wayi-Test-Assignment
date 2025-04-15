import { CollectionConfig } from 'payload';

const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  labels: {
    singular: '圖片',
    plural: '圖片',
  },
  admin: {
    useAsTitle: 'filename',
  },
  access: {
    read: () => true, // ✅ 開放所有人讀取圖片
  },
  fields: [],
};

export default Media;
