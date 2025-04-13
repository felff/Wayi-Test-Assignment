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
  fields: [],
};

export default Media;
