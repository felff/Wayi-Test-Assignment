import { CollectionConfig } from 'payload';

const Settings: CollectionConfig = {
  slug: 'settings',
  labels: {
    singular: 'LINE ID',
    plural: 'LINE ID',
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: '設定名稱',
      type: 'text',
    },
    {
      name: 'lineId',
      label: 'LINE ID',
      type: 'text',
    },
  ],
  hooks: {
    beforeChange: [
      async ({ operation, req }) => {
        if (operation === 'create') {
          const existing = await req.payload.find({
            collection: 'settings',
          });

          if (existing.totalDocs > 0) {
            throw new Error('只能建立一筆設定資料。請編輯現有的設定。');
          }
        }
      },
    ],
  },
};

export default Settings;
