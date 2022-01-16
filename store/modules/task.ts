import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { CreatedTask } from "~/models/createdTask";
import { Task } from "~/models/Task";
import TaskService from "~/services/task.service";
import { store } from "..";
import { ShortTask } from "~/models/shortTask";
import Vue from "vue";

@Module({ namespaced: true, name: "TaskModule", store })
export default class TaskModule extends VuexModule {
  public status: any = {
    loadingCreateTask: false,
    loadingGetTasks: true,
    loadingDeleteTask: false,
    loadingGetTask: false,
    loadingPutTask: false,
  };

  public errors: any = {
    errorCreateTask: "",
    errorGetTasks: "",
    erroDeleteTask: "",
    errorGetTask: "",
    errorPutTask: "",
  };

  public messages: any = {
    messageCreateTask: "",
    messageDeleteTask: "",
    messageUpdateTask: "",
  };

  public snackbarStatus: any = {
    statusCreateTask: false,
    statusDeleteTask: false,
    statusUpdateTask: false,
  };

  public taskList?: ShortTask[] = undefined;
  public selectedTask?: Task = undefined;

  /**
   * Asignar mensaje que regresa el servidor
   * @param {data} data - Recibe el nombre del mensaje de messages y el mesnaje
   */
  @Mutation setMessage(data: { messageName: string; message: string }) {
    this.messages[data.messageName] = data.message;
  }

  /**
   * Asignar status para poder hacer visible o quitar el snackbar
   * @param {data} data - Recibe el nombre del status de snackbarStatus y un booleano
   */
  @Mutation setSnackbar(data: { statusName: string; status: boolean }) {
    this.snackbarStatus[data.statusName] = data.status;
  }

  /**
   * Asignar status para poder saber si la actions terminaron su proceso
   * @param {data} data - Recibe el nombre del status de cargando de status y un booleano
   */
  @Mutation
  public setLoading(data: { loadingName: string; status: boolean }): void {
    this.status[data.loadingName] = data.status;
  }

  /**
   * Asignar error que regresa el servidor
   * @param {data} data - Recibe el nombre del error de erros y el mesnaje error
   */
  @Mutation
  public setError(data: { errorName: string; message: string }): void {
    this.status[data.errorName] = data.message;
  }

  /**
   * Asignar información todas las tareas
   * @param {ShortTask[]} data - Arreglo de tareas obtenidas del servidor
   */
  @Mutation
  public setTaskList(data: ShortTask[]): void {
    this.taskList = data.reverse(); //Invertir arreglo
  }

  /**
   * Asignar información una tarea en especifica
   * @param {Task} data - Tarea obtenida de la respuesta del servidor
   */
  @Mutation
  public setSelectedTask(data: Task): void {
    this.selectedTask = data;
  }

  /**
   * Agregar tarea al principio de las lista de Tareas
   * @param {Task} data - Tarea a crear
   */
  @Mutation
  public addTask(data: Task): void {
    if (this.taskList) {
      this.taskList.unshift(data);
    }
  }

  /**
   * Actualizar la tarea seleccionada
   * @param {string} taskId - Id de la tarea
   */
  @Mutation
  public removeTask(taskId: string) {
    if (this.taskList) {
      const index = this.taskList.findIndex((task) => {
        return task.id == taskId;
      });
      Vue.delete(this.taskList, index);
    }
  }

  /**
   * Actualizar la tarea seleccionada
   * @param {Task} task - Infromación de la tarea que se va actualizar
   */
  @Mutation
  public updateTask(task: Task) {
    if (this.taskList) {
      const index = this.taskList.findIndex((task) => {
        return task.id == task.id;
      });
      Vue.set(this.taskList, index, task);
    }
  }

  /**
   * Mandar datos de la tarea al servicio de task
   * @param {CreatedTask} task - Datos de la tarea a crear
   * @type {Promise<void>}
   */
  @Action({ rawError: true })
  public async createTask(task: CreatedTask): Promise<void> {
    this.context.commit("setLoading", {
      loadingName: "loadingCreateTask",
      status: true,
    });
    return await TaskService.createTask(task)
      .then((data: any) => {
        this.context.commit("addTask", data.task);
        this.context.commit("setLoading", {
          loadingName: "loadingCreateTask",
          status: false,
        });
        this.context.commit("setMessage", {
          messageName: "messageCreateTask",
          message: data.detail,
        });
        this.context.commit("setSnackbar", {
          statusName: "statusCreateTask",
          status: true,
        });
      })
      .catch((error: any) => {
        this.context.commit("setError", {
          errorName: "errorCreateTask",
          message: error,
        });
        this.context.commit("setLoading", {
          loadingName: "loadingCreateTask",
          status: false,
        });
      });
  }

  /**
   * Mandar a llavar el servicio de task para obtener las tareas
   * @type {Promise<void>}
   */
  @Action({ rawError: true })
  public async getTasks(): Promise<void> {
    this.context.commit("setLoading", {
      loadingName: "loadingGetTasks",
      status: true,
    });
    return await TaskService.getTasks()
      .then((data: ShortTask[]) => {
        this.context.commit("setTaskList", data);
        this.context.commit("setLoading", {
          loadingName: "loadingGetTasks",
          status: false,
        });
      })
      .catch((error: any) => {
        this.context.commit("setError", {
          errorName: "errorGetTasks",
          message: error,
        });
        this.context.commit("setLoading", {
          loadingName: "loadingGetTasks",
          status: false,
        });
      });
  }

  /**
   * Mandar Id de la tarea al servicio de task
   * @param {string} taskId - Datos de la tarea a crear
   * @type {Promise<void>}
   */
  @Action({ rawError: true })
  public async getTask(taskId: string): Promise<void> {
    this.context.commit("setLoading", {
      loadingName: "loadingGetTask",
      status: true,
    });
    return await TaskService.getTask(taskId)
      .then((data: Task) => {
        this.context.commit("setSelectedTask", data);
        this.context.commit("setLoading", {
          loadingName: "loadingGetTask",
          status: false,
        });
      })
      .catch((error: any) => {
        this.context.commit("setError", {
          errorName: "errorGetTask",
          message: error,
        });
        this.context.commit("setLoading", {
          loadingName: "loadingGetTask",
          status: false,
        });
      });
  }

  /**
   * Mandar Id de la tarea a eliminar al servicio
   * @param {string} taskId - Id de la tarea a eliminar
   * @type {Promise<void>}
   */
  @Action({ rawError: true })
  public async deleteTask(taskId: string): Promise<void> {
    this.context.commit("setLoading", {
      loadingName: "loadingDeleteTask",
      status: true,
    });
    return await TaskService.deleteTask(taskId)
      .then((message: any) => {
        this.context.commit("removeTask", taskId);
        this.context.commit("setLoading", {
          loadingName: "loadingDeleteTask",
          status: false,
        });
        this.context.commit("setMessage", {
          messageName: "messageDeleteTask",
          message: message.detail,
        });
        this.context.commit("setSnackbar", {
          statusName: "statusDeleteTask",
          status: true,
        });
      })
      .catch((error: any) => {
        this.context.commit("setError", {
          errorName: "erroDeleteTask",
          message: error,
        });
        this.context.commit("setLoading", {
          loadingName: "loadingDeleteTask",
          status: false,
        });
      });
  }

  /**
   * Mandar datos de la tarea a actualizar al servicio de task
   * @param {Task} task - Datos de la tarea a actualizar
   * @type {Promise<void>}
   */
  @Action({ rawError: true })
  public async putTask(task: Task): Promise<void> {
    this.context.commit("setLoading", {
      loadingName: "loadingPutTask",
      status: true,
    });
    return await TaskService.putTask(task)
      .then((data: any) => {
        this.context.commit("updateTask", data.task);
        this.context.commit("setLoading", {
          loadingName: "loadingPutTask",
          status: false,
        });
        this.context.commit("setMessage", {
          messageName: "messageUpdateTask",
          message: data.detail,
        });
        this.context.commit("setSnackbar", {
          statusName: "statusUpdateTask",
          status: true,
        });
      })
      .catch((error: any) => {
        this.context.commit("setError", {
          errorName: "errorPutTask",
          message: error,
        });
        this.context.commit("setLoading", {
          loadingName: "loadingPutTask",
          status: false,
        });
      });
  }

  /**
   * Asignar statusName y status a la mutación setSnackbar
   * @param statusName nombre del status de snackbarStatus
   */
  @Action
  setNotVisibleSnackbar(statusName: string): void {
    this.context.commit("setSnackbar", {
      statusName: statusName,
      status: false,
    });
  }

  /**
   * Obtener el valor del status de loadingGetTasks
   * @return {boolean} status de loadingGetTasks
   */
  get isLoading(): boolean {
    return this.status.loadingGetTasks;
  }

  /**
   * Obtener el valor del status de loadingGetTask
   * @return {boolean} status de loadingGetTask
   */
  get isLoadingTask(): boolean {
    return this.status.loadingGetTask;
  }
}
