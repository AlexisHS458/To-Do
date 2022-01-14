import { Task } from "./Task";

export interface ShortTask extends Partial<Task> {
  title: string;
  is_completed: number;
  due_date?: string;
  id: string;
}
