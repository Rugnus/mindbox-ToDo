import { Button, Checkbox, Divider, Input, List } from "antd";
import React, { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const Todo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    console.log(tasks.filter((task) => !task.completed));
  }, [tasks]);

  const addTask = () => {
    const newTask: Task = {
      id: Date.now(),
      title: inputValue,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    console.log(tasks);

    setTaskTitle(inputValue);
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
    <div style={{ padding: "20px" }}>
      <h2>Todo List</h2>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Добавить новую задачу"
        style={{ width: "300px", marginRight: "10px" }}
      />
      <Button type="primary" onClick={addTask}>
        Добавить
      </Button>
      <Divider />
      <h4>Невыполненные задачи</h4>
      <List
        bordered
        dataSource={tasks.filter((task) => !task.completed)}
        renderItem={(task) => (
          <List.Item
            onClick={() => toggleTaskCompletion(task.id)}
            actions={[
              <Button type="link" onClick={() => toggleTaskCompletion(task.id)}>
                Выполнить
              </Button>,
              <Button type="link" danger onClick={() => removeTask(task.id)}>
                Удалить
              </Button>,
            ]}
          >
            <Checkbox>{task.title}</Checkbox>
          </List.Item>
        )}
      />
      <h4>Выполненные задачи</h4>
      <List
        bordered
        dataSource={tasks.filter((task) => task.completed)}
        renderItem={(task) => (
          <List.Item
            onClick={() => toggleTaskCompletion(task.id)}
            actions={[
              <Button type="link" onClick={() => toggleTaskCompletion(task.id)}>
                Вернуть
              </Button>,
              <Button type="link" danger onClick={() => removeTask(task.id)}>
                Удалить
              </Button>,
            ]}
          >
            <Checkbox checked>{task.title}</Checkbox>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Todo;
