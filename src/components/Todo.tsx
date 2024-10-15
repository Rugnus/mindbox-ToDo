import React, { useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const Todo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState<string>("");

  const addTask = () => {
    if (taskTitle.trim() === "") return;

    const newTask: Task = {
      id: Date.now(),
      title: taskTitle,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskTitle("");
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Введите новую задачу"
      />
      <button onClick={addTask}>Добавить задачу</button>

      <h2>Невыполненные задачи</h2>
      <ul>
        {tasks
          .filter((task) => !task.completed)
          .map((task) => (
            <li key={task.id}>
              <span onClick={() => toggleTaskCompletion(task.id)}>
                {task.title}
              </span>
              <button onClick={() => removeTask(task.id)}>Удалить</button>
            </li>
          ))}
      </ul>

      <h2>Выполненные задачи</h2>
      <ul>
        {tasks
          .filter((task) => task.completed)
          .map((task) => (
            <li key={task.id}>
              <span
                onClick={() => toggleTaskCompletion(task.id)}
                style={{ textDecoration: "line-through" }}
              >
                {task.title}
              </span>
              <button onClick={() => removeTask(task.id)}>Удалить</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Todo;
