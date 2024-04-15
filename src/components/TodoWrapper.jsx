import { useState, useEffect } from "react";
// import { Todo } from "./Todo";
import Todo from "./Todo";
import { TodoForm } from "./TodoForm";
import "./styles/TodoWrapper.css";

import { v4 as uuidv4 } from "uuid";
import { EditTodo } from "./EditTodo";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  const updateLocalStorage = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const addTodo = (todo) => {
    const newTodos = [
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ];
    setTodos(newTodos);
    updateLocalStorage(newTodos);
  };

  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    updateLocalStorage(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    updateLocalStorage(newTodos);
  };

  const editTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
    updateLocalStorage(newTodos);
  };

  const editTask = (task, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
    updateLocalStorage(newTodos);
  };

  return (
    <div className="TodoWrapper">
      <h1>Make Life Easier</h1>
      <TodoForm addTodo={addTodo} />

      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodo key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
