export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const LOCAL_STORAGE_KEY = "todos";

// Я также могу продемонстрировать работу и с indexedDB, но так как
// у нас довольно простая структура, я решил хранить задачи в localStorage
export const todoService = {
  // Получение всех задач из localStorage
  getAllTodos: (): Task[] => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  },

  // Добавление новой задачи и ее сохранение в localStorage
  addTodo: (newTodo: Task) => {
    const todos = todoService.getAllTodos();
    todos.push(newTodo);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  },

  // Обновление задачи (для изменения состояния выполненности)
  updateTodo: (updatedTodo: Task) => {
    const todos = todoService.getAllTodos();
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
  },

  // Удаление задачи и обновление localStorage
  deleteTodo: (todoId: number) => {
    const todos = todoService.getAllTodos();
    const filteredTodos = todos.filter((todo) => todo.id !== todoId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredTodos));
  },
};
