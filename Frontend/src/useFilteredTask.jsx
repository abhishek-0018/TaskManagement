import { useState, useEffect } from 'react';

const useFilteredTasks = (tasks, filter) => {
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredTasks(tasks);
    } else if (filter === 'complete') {
      setFilteredTasks(tasks.filter(task => task.status === 'complete'));
    } else if (filter === 'incomplete') {
      setFilteredTasks(tasks.filter(task => task.status === 'incomplete'));
    }
  }, [tasks, filter]);

  return filteredTasks;
};

export default useFilteredTasks;