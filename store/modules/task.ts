import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { CreatedTask } from "~/models/createdTask";
import { Task } from "~/models/Task";
import { PutTask } from "~/models/putTask";
import TaskService from "~/services/task.service";
import { store } from "..";
import { ShortTask } from "~/models/shortTask";
import Vue from "vue";

@Module({ namespaced: true, name: "TaskModule", store })
export default class TaskModule extends VuexModule {
  public status: any = {
    loadingCreateTask: false,
    loadingGetTasks: false,
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

  public taskList?: ShortTask[] = undefined;
  public selectedTask?: Task = undefined;

  @Mutation
  public setLoading(data: { loadingName: string; status: boolean }): void {
    this.status[data.loadingName] = data.status;
  }

  @Mutation
  public setError(data: { errorName: string; message: string }): void {
    this.status[data.errorName] = data.message;
  }

  @Mutation
  public setTaskList(data: ShortTask[]): void {
    this.taskList = data;
  }

  @Mutation
  public setSelectedTask(data: Task): void {
    this.selectedTask = data;
  }

  @Mutation
  public addTask(data: Task): void {
    if (this.taskList) {
      this.taskList = [...this.taskList, data];
    }
    // this.taskList?.push(data);
  }

  @Action({ rawError: true })
  public async createTask(task: CreatedTask): Promise<void> {
    this.context.commit("setLoading", {
      loadingName: "loadingCreateTask",
      status: true,
    });
    return await TaskService.createTask(task)
      .then((data: Task) => {
        this.context.commit("addTask", data);
        this.context.commit("setLoading", {
          loadingName: "loadingCreateTask",
          status: false,
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
        console.log("Entro a vuex error");
        // this.context.commit("setGetTasks", true);
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
        console.log("Entro a vuex error");
        // this.context.commit("setGetTask", true);
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

  @Action({ rawError: true })
  public async deleteTask(taskId: string): Promise<void> {
    this.context.commit("setLoading", {
      loadingName: "loadingDeleteTask",
      status: true,
    });
    return await TaskService.deleteTask(taskId)
      .then((data: any) => {
        //this.context.commit("setDataDeleteTasks", data);
        this.context.commit("setLoading", {
          loadingName: "loadingDeleteTask",
          status: false,
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

  @Action({ rawError: true })
  public async putTask(task: Task): Promise<void> {
    this.context.commit("setLoading", {
      loadingName: "loadingPutTask",
      status: true,
    });
    return await TaskService.putTask(task)
      .then((data: PutTask) => {
        // this.context.dispatch("getTasks");
        this.context.commit("setLoading", {
          loadingName: "loadingPutTask",
          status: false,
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

  get isLoading(): boolean {
    return this.status.loadingGetTasks;
  }

  get isLoadingTask(): boolean {
    return this.status.loadingGetTask;
  }
}
