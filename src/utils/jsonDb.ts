import { Todo } from "@/types/todo";
import { promises as fs } from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "todos.json");

const ensureDbExists = async () => {
  try {
    await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });

    try {
      await fs.access(dbPath);
    } catch {
      await fs.writeFile(dbPath, JSON.stringify([]));
    }
  } catch (error) {
    console.error("Error initializing database: ", error);
    throw error;
  }
};

export const readTodos = async (): Promise<Todo[]> => {
  await ensureDbExists();
  const data = await fs.readFile(dbPath, "utf-8");

  return JSON.parse(data);
};

export const writeTodos = async (todos: Todo[]): Promise<void> => {
  await ensureDbExists();
  await fs.writeFile(dbPath, JSON.stringify(todos, null, 2));
};
