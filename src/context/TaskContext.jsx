import React, { createContext, useState, useEffect } from 'react';

// Create a context for task management
const TaskContext = createContext();

// Define the TaskProvider component
const TaskProvider = ({ children }) => {
  // Initialize task state with an empty array
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // Update local storage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task
  const addTask = (task) => {
    if (!task || !task.name || !task.description) {
      console.error('Task must have a name and description');
      return;
    }
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  // Function to update an existing task
  const updateTask = (id, updates) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  // Function to delete a task by id
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Function to toggle task completion status
  const toggleTaskCompleted = (id) => {
    updateTask(id, { completed: !tasks.find((task) => task.id === id).completed });
  };

  // Provide task state and actions to components
  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompleted,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, TaskContext };