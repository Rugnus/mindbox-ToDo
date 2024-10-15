import { Button, Checkbox, Divider, Input, List, Typography } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { todoService } from "../services/todoService";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const { Item } = List;

const Todo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const storedTasks = todoService.getAllTodos();
    setTasks(storedTasks);
  }, []);

  const addTask = () => {
    if (inputValue.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: inputValue,
        completed: false,
      };

      todoService.addTodo(newTask);
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const toggleTaskCompletion = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    const updatedTask = updatedTasks.find((task) => task.id === id);
    if (updatedTask) {
      todoService.updateTodo(updatedTask);
    }
    setTasks(updatedTasks);
  };

  const removeTask = (id: number) => {
    todoService.deleteTodo(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const incompletedTasks = useMemo(
    () => tasks.filter((task) => !task.completed),
    [tasks]
  );
  const completed = useMemo(
    () => tasks.filter((task) => task.completed),
    [tasks]
  );

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={3}>Todo List</Typography.Title>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Добавить новую задачу"
        style={{ width: "300px", marginRight: "10px" }}
        onPressEnter={addTask} // Вместо этого еще можно использовать onKeyPress и проверкой event.key === "Enter" вызывать addTask
      />
      <Button type="primary" onClick={addTask}>
        Добавить
      </Button>
      <Divider />
      <Typography.Title level={4}>Невыполненные задачи</Typography.Title>
      <List
        bordered
        dataSource={incompletedTasks}
        renderItem={(task) => (
          <Item
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
          </Item>
        )}
      />
      <Typography.Title level={4}>Выполненные задачи</Typography.Title>
      <List
        bordered
        dataSource={completed}
        renderItem={(task) => (
          <Item
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
          </Item>
        )}
      />
    </div>
  );
};

export default Todo;
