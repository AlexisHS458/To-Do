export interface Task {
  title: string;
  is_completed: number;
  due_date?: string;
  comments?: string;
  description?: string;
  tags?: string;
  created_at: string;
  id: string;
  token: string;
  updated_at: string;
}
