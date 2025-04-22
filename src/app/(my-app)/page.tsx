export const dynamic = 'force-dynamic';

import LandingWebsite from '@/app/(my-app)/(home)/template/LandingWebsite';
import { getLineID, getProducts } from '@/actions/payload';

const Home = async () => {
  const id = await getLineID();
  const productsData = await getProducts();

  return (
    <main className="w-full h-svh">
      <LandingWebsite
        id={id}
        initialProducts={productsData.docs}
        hasNextPage={productsData.hasNextPage}
      />
    </main>
  );
};
export default Home;
