"use client";

import { useEffect, useState } from "react";

import { Todo } from "@/types/todo";

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTodoText.trim()) return;

    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodoText }),
    });

    const newTodo = await response.json();

    setTodos([...todos, newTodo]);
    setNewTodoText("");
  };

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center gap-y-4">
      <form onSubmit={addTodo} className="flex gap-2">
        <input
          type="text"
          placeholder="Type your todo in here..."
          className="border py-2 px-4 rounded-md border-gray-700"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button
          type="submit"
          disabled={!newTodoText.trim()}
          className="px-4 py-2 rounded-md bg-blue-500 text-white disabled:opacity-75 hover:bg-blue-400"
        >
          Add Task
        </button>
      </form>

      {todos.map((todo, idx) => {
        return (
          <div
            className="px-4 py-2 border rounded-md w-[250px] border-gray-700 hover:opacity-80"
            key={idx}
          >
            {todo.text}
          </div>
        );
      })}
    </div>
  );
};
