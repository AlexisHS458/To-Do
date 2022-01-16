import { CreatedTask } from "~/models/createdTask";
import { PutTask } from "~/models/putTask";

class TaskService {
  /**
   * Mandar los datos de la tarea al servidor
   * @param {CreatedTask} task - Datos de la tarea
   */
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

    return responseTask;
  }

  //Obtener datos de las tareas desde el servidor
  async getTasks() {
    const responseGetTasks = await window.$nuxt.$axios.$get("/tasks", {
      params: {
        token: process.env.TOKEN_SECRET,
      },
    });
    return responseGetTasks;
  }

  /**
   * Obtener los datos de una tarea desde el servidor
   * @param {string} TaskId - Id de la tarea a obtener
   */
  async getTask(TaskId: string) {
    const responseGetTask = await window.$nuxt.$axios.$get("/tasks/" + TaskId, {
      params: {
        token: process.env.TOKEN_SECRET,
      },
    });
    if (responseGetTask.detail === "Error, tarea no válida") {
      return {};
    }

    return responseGetTask[0];
  }

  /**
   * ELiminar una tarea del servidor
   * @param {string} TaskId - Id de la tarea a eliminar
   */
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

  /**
   * Actualizar una tarea
   * @param {PutTask} task - Datos de la tarea
   */
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
          /*  is_completed: task.is_completed === 0 ? 1 : 0, */
          is_completed: task.is_completed,
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
    return responsePutTask;
  }
}

export default new TaskService();
