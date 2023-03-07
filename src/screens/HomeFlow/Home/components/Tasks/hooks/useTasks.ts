// SPDX-License-Identifier: BUSL-1.1

import {Task} from '@api/tasks/types';
import {useFocusEffect} from '@react-navigation/native';
import {TasksActions} from '@store/modules/Tasks/actions';
import {tasksSelector} from '@store/modules/Tasks/selectors';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function useTasks() {
  const dispatch = useDispatch();

  const [currentTasks, setCurrentTasks] = useState<Task[]>([]);

  const tasks: ReturnType<typeof tasksSelector> = useSelector(tasksSelector);

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(TasksActions.GET_TASKS.START.create());
    } else if (currentTasks.length === 0 && tasks.length > 0) {
      setCurrentTasks(tasks);
    }
  }, [dispatch, tasks, currentTasks]);

  useFocusEffect(
    useCallback(() => {
      if (
        currentTasks.length > 0 &&
        tasks.length > 0 &&
        JSON.stringify(currentTasks) !== JSON.stringify(tasks)
      ) {
        /** Timeout so user can see the change active tasks animation */
        setTimeout(() => {
          setCurrentTasks(tasks);
        }, 1000);
      }
    }, [tasks, currentTasks]),
  );

  return {
    tasks: currentTasks,
  };
}
