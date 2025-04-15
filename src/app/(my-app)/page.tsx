import LandingWebsite from '@/app/(my-app)/(home)/template/LandingWebsite';
import { getLineID, getProducts } from '@/actions/payload';

const Home = async () => {
  const id = await getLineID();
  return (
    <main className="w-full h-svh">
      <LandingWebsite id={id} />
    </main>
  );
};
export default Home;
