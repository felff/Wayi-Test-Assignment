import sharp from 'sharp';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import type { SharpDependency } from 'payload';
import { buildConfig } from 'payload';
import Products from '@/app/(payload)/collections/Products';
import Media from '@/app/(payload)/collections/Media';
import Setting from '@/app/(payload)/collections/Setting';
import { s3Storage } from '@payloadcms/storage-s3';

// @ts-ignore
const sharpAdapter: SharpDependency = (input, options) => sharp(input, options);

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  collections: [Media, Products, Setting],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp: sharpAdapter,
  plugins: [
    s3Storage({
      collections: {
        [Media.slug]: true,
      },
      bucket: process.env.PAYLOAD_S3_BUCKET_NAME || '',
      config: {
        credentials: {
          accessKeyId: process.env.PAYLOAD_S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.PAYLOAD_S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.PAYLOAD_S3_REGION || 'auto',
        endpoint: process.env.PAYLOAD_S3_ENDPOINT,
      },
    }),
  ],
});
