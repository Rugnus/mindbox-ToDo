import { Task, todoService } from "./todoService";

describe("todoService", () => {
  beforeEach(() => {
    // Перед каждым тестом очищаем localStorage
    localStorage.clear();
  });

  test("Добавление новой задачи", () => {
    const newTask: Task = { id: 1, title: "Тестовая задача", completed: false };

    todoService.addTodo(newTask);

    const storedTasks = JSON.parse(localStorage.getItem("todos") || "[]");

    expect(storedTasks).toHaveLength(1);
    expect(storedTasks[0]).toEqual(newTask);
  });

  test("Обновление задачи", () => {
    const initialTask: Task = {
      id: 1,
      title: "Тестовая задача",
      completed: false,
    };
    localStorage.setItem("todos", JSON.stringify([initialTask]));

    const updatedTask: Task = { ...initialTask, completed: true };

    todoService.updateTodo(updatedTask);

    const storedTasks = JSON.parse(localStorage.getItem("todos") || "[]");
    expect(storedTasks[0].completed).toBe(true);
  });

  test("Удаление задачи", () => {
    const task1: Task = { id: 1, title: "Задача 1", completed: false };
    const task2: Task = { id: 2, title: "Задача 2", completed: true };
    localStorage.setItem("todos", JSON.stringify([task1, task2]));

    todoService.deleteTodo(1);

    const storedTasks = JSON.parse(localStorage.getItem("todos") || "[]");
    expect(storedTasks).toHaveLength(1);
    expect(storedTasks[0].id).toBe(2);
  });

  test("Получение всех задач", () => {
    const task1: Task = { id: 1, title: "Задача 1", completed: false };
    const task2: Task = { id: 2, title: "Задача 2", completed: true };
    localStorage.setItem("todos", JSON.stringify([task1, task2]));

    const tasks = todoService.getAllTodos();

    expect(tasks).toHaveLength(2);
    expect(tasks[0]).toEqual(task1);
    expect(tasks[1]).toEqual(task2);
  });
});
