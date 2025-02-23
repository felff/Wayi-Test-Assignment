import { getTaskList } from '@/actions/task';
import { TaskList } from '@/types/task';
import DesktopOrMobile from './(home)/template/DesktopOrMobile';

const Home = async () => {
  const { data }: { data: TaskList } = await getTaskList();
  console.log(data);

  return (
    <main className="w-full h-svh flex justify-center items-center px-20">
      <DesktopOrMobile data={data} />
    </main>
  );
};
export default Home;
