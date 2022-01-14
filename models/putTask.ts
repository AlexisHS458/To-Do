import { Task } from "./Task";

export interface PutTask extends Partial<Task> {
  title?: string;
  is_completed?: number;
  due_date?: string;
  comments?: string;
  description?: string;
  tags?: string;
  token: string;
}
