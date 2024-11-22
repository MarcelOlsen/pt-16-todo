import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { readTodos, writeTodos } from "@/utils/jsonDb";

import { Todo } from "@/types/todo";

export async function GET() {
  const todos = await readTodos();
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const body = await request.json();
  const todos = await readTodos();

  const newTodo: Todo = {
    id: uuidv4(),
    text: body.text,
    completed: false,
    createdAt: new Date(),
  };

  todos.push(newTodo);
  await writeTodos(todos);
  return NextResponse.json(newTodo, { status: 201 });
}
