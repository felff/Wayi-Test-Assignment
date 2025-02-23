import { getTaskList } from '@/actions/task';
import { TaskList } from '@/types/task';
import { useCallback, useEffect, useState } from 'react';

const PAGE_SIZE = 10;

export const useTaskListPagination = () => {
  const [pageData, setPageData] = useState<{
    tasksData: TaskList;
    totalCount: number;
  }>({ tasksData: [], totalCount: PAGE_SIZE });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const totalPages = Math.ceil(pageData.totalCount / PAGE_SIZE);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const fetchTasks = useCallback(async (page: number = 1) => {
    setIsLoading(true);
    try {
      const { data: tasksData, total: totalCount } = await getTaskList(page);
      setPageData({ tasksData, totalCount });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const goToNextPage = () => {
    if (!isLastPage) {
      fetchTasks(currentPage + 1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (!isFirstPage) {
      fetchTasks(currentPage - 1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const updateTasks = async () => {
    await fetchTasks();
    setCurrentPage(1);
  };

  return {
    isLoading,
    currentPage,
    pageData,
    isFirstPage,
    isLastPage,
    updateTasks,
    goToNextPage,
    goToPrevPage,
  };
};
