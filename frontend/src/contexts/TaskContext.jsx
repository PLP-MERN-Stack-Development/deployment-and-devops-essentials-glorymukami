import React, { createContext, useState, useContext } from 'react';
import { taskService } from '../services/taskService';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskService.getTasks();
      setTasks(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      setError(null);
      const response = await taskService.createTask(taskData);
      setTasks(prev => [response.data, ...prev]);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
      throw err;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      setError(null);
      const response = await taskService.updateTask(id, taskData);
      setTasks(prev => prev.map(task => 
        task._id === id ? response.data : task
      ));
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      setError(null);
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
      throw err;
    }
  };

  const value = {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    setError
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};