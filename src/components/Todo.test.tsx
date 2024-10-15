import { fireEvent, render, screen } from "@testing-library/react";
import { todoService } from "../services/todoService";
import Todo from "./Todo";

// Мокаем сервис todoService для тестов
jest.mock("../services/todoService", () => ({
  todoService: {
    getAllTodos: jest.fn(),
    addTodo: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
  },
}));

describe("Todo Component", () => {
  beforeEach(() => {
    // Замокируем `window.matchMedia` чтобы не было проблем с AntDesign компонентами
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test("Добавление новой задачи", () => {
    // Мокаем метод для получения задач
    (todoService.getAllTodos as jest.Mock).mockReturnValueOnce([]);

    render(<Todo />);

    const inputElement = screen.getByPlaceholderText("Добавить новую задачу");
    const addButton = screen.getByText("Добавить");

    // Вводим новую задачу
    fireEvent.change(inputElement, { target: { value: "Новая задача" } });
    fireEvent.click(addButton);

    // Проверяем, что задача добавлена
    expect(screen.getByText("Новая задача")).toBeInTheDocument();

    // Проверяем, что сервис todoService.addTodo был вызван
    expect(todoService.addTodo).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Новая задача",
        completed: false,
      })
    );
  });

  test("переключение состояния задачи (выполнена/не выполнена)", () => {
    const initialTasks = [{ id: 1, title: "Задача 1", completed: false }];

    // Мокаем метод для получения задач
    (todoService.getAllTodos as jest.Mock).mockReturnValueOnce(initialTasks);

    render(<Todo />);

    const completeButton = screen.getByText("Выполнить");

    // Переключаем задачу в состояние выполнена
    fireEvent.click(completeButton);

    // Проверяем, что состояние задачи изменилось
    expect(todoService.updateTodo).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        title: "Задача 1",
        completed: true,
      })
    );
  });

  test("удаление задачи", () => {
    const initialTasks = [{ id: 1, title: "Задача 1", completed: false }];

    // Мокаем метод для получения задач
    (todoService.getAllTodos as jest.Mock).mockReturnValueOnce(initialTasks);

    render(<Todo />);

    const deleteButton = screen.getByText("Удалить");

    // Удаляем задачу
    fireEvent.click(deleteButton);

    // Проверяем, что задача была удалена
    expect(todoService.deleteTodo).toHaveBeenCalledWith(1);
    expect(screen.queryByText("Задача 1")).toBeNull();
  });

  test("загрузка задач из localStorage", () => {
    const initialTasks = [
      { id: 1, title: "Задача 1", completed: false },
      { id: 2, title: "Задача 2", completed: true },
    ];

    // Мокаем метод для получения задач
    (todoService.getAllTodos as jest.Mock).mockReturnValueOnce(initialTasks);

    render(<Todo />);

    // Проверяем, что задачи загружены и отобразились
    expect(screen.getByText("Задача 1")).toBeInTheDocument();
    expect(screen.getByText("Задача 2")).toBeInTheDocument();
  });
});
