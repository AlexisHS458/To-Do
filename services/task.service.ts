import { CreatedTask } from "~/models/createdTask";
import { PutTask } from "~/models/putTask";

class TaskService {
  async createTask(task: CreatedTask) {
    const responseTask = await window.$nuxt.$axios.$post("/tasks", {
      token: process.env.TOKEN_SECRET,
      title: task.title,
      is_completed: task.is_completed === 1 ? 0 : 1,
      due_date: task.due_date,
      comments: task.comments,
      description: task.description,
      tags: task.tags,
    });
    return responseTask.task;
  }

  async getTasks() {
    const responseGetTasks = await window.$nuxt.$axios.$get("/tasks", {
      params: {
        token: process.env.TOKEN_SECRET,
      },
    });
    return responseGetTasks;
  }

  async getTask(TaskId: string) {
    const responseGetTask = await window.$nuxt.$axios.$get("/tasks/" + TaskId, {
      params: {
        token: process.env.TOKEN_SECRET,
      },
    });

    return responseGetTask[0];
  }

  async deleteTask(taskId: string) {
    const responseDeleteTask = await window.$nuxt.$axios.$delete(
      "/tasks/" + taskId,
      {
        params: {
          token: process.env.TOKEN_SECRET,
        },
      }
    );
    return responseDeleteTask;
  }

  async putTask(task: PutTask) {
    const responsePutTask = await window.$nuxt.$axios.$put(
      "/tasks/" + task.id,
      null,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          title: task.title,
          is_completed: task.is_completed === 1 ? 0 : 1,
          due_date: task.due_date,
          comments: task.comments,
          description: task.description,
          tags: task.tags,
          created_at: task.created_at,
          id: task.id,
          token: task.token,
          updated_at: task.updated_at,
        },
      }
    );
    console.log(responsePutTask);

    return responsePutTask;
  }
}

export default new TaskService();
