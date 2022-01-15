import { CreatedTask } from "~/models/createdTask";
import { Task } from "~/models/Task";
import { PutTask } from "~/models/putTask";
//import axios from "~/plugins/axios";

//const axios = require("axios").default;

class TaskService {
  async createTask(task: CreatedTask) {
    const responseTask = await window.$nuxt.$axios.$post("/tasks", {
      token:
        "e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd",
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
        token:
          "e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd",
      },
    });
    return responseGetTasks;
  }

  async getTask(TaskId: string) {
    const responseGetTask = await window.$nuxt.$axios.$get("/tasks/" + TaskId, {
      params: {
        token:
          "e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd",
      },
    });

    return responseGetTask[0];
  }

  async deleteTask(taskId: string) {
    const responseDeleteTask = await window.$nuxt.$axios.$delete(
      "/tasks/" + taskId,
      {
        params: {
          token:
            "e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd",
        },
      }
    );
    //  console.log(responseDeleteTask);

    return responseDeleteTask;
  }

  async putTask(task: PutTask) {
    //  console.log(task);

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
