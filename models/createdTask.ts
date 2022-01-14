import { Task } from "./Task";

export interface CreatedTask extends Partial<Task> {
  title: string;
  is_completed: number;
  due_date?: string;
  comments?: string;
  description?: string;
  tags?: string;
}
