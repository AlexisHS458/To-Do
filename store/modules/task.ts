import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { CreateTask } from "~/models/createTask";
import { Task } from "~/models/Task";
import { PutTask } from "~/models/putTask";

import TaskService from "~/services/task.service";

import { store } from "..";

@Module({ namespaced: true, name: "TaskModule", store })
export default class TaskModule extends VuexModule {
  public status = {
    loadiingCreateTask: false,
    loadingGetTasks: false,
    loadingDeleteTasks: false,
    loadingGetTask: false,
    loadingPutTask: false,
  };

  public error = "";
  public data = "";
  public dataGetTasks = "";
  public errorGetTasks = "";
  public dataDeleteTask = "";
  public erroDeleteTask = "";
  public dataGetTask?: Task = undefined;
  public errorGetTask = "";
  public errorPutTask = "";
  public dataPutTask?: PutTask = undefined;

  @Mutation
  public setCreateText(status: boolean): void {
    this.status.loadiingCreateTask = status;
  }

  @Mutation
  public setDataCreateTask(data: any): void {
    this.data = data;
  }

  @Mutation
  public setErrorCreateText(error: any): void {
    this.error = error;
  }

  @Mutation
  public setGetTasks(status: boolean): void {
    this.status.loadingGetTasks = status;
  }

  @Mutation
  public setDataGetTasks(data: any): void {
    this.dataGetTasks = data;
  }

  @Mutation
  public setErrorGetTasks(error: any): void {
    this.errorGetTasks = error;
  }

  @Mutation
  public setGetTask(status: boolean): void {
    this.status.loadingGetTask = status;
  }

  @Mutation
  public setDataGetTask(data: Task): void {
    console.log(data);

    this.dataGetTask = data;
  }

  @Mutation
  public setErrorGetTask(error: any): void {
    this.errorGetTask = error;
  }

  @Mutation
  public setDeleteTask(status: boolean): void {
    this.status.loadingDeleteTasks = status;
  }

  @Mutation
  public setDataDeleteTasks(data: any): void {
    this.dataDeleteTask = data;
  }

  @Mutation
  public setErrorDeleteTask(error: any): void {
    this.erroDeleteTask = error;
  }

  @Mutation
  public setPutTask(status: boolean): void {
    this.status.loadingPutTask = status;
  }

  @Mutation
  public setDataPutTasks(data: PutTask): void {
    this.dataPutTask = data;
  }

  @Mutation
  public setErrorPutTask(error: any): void {
    this.errorPutTask = error;
  }

  @Action({ rawError: true })
  public async createTask(task: CreateTask): Promise<void> {
    //console.log(task);

    return await TaskService.createTask(task)
      .then((data: any) => {
        //   console.log(data);
        this.context.commit("setCreateText", true);
        this.context.commit("setDataCreateTask", data);
        this.context.commit("setCreateText", false);
      })
      .catch((error: any) => {
        console.log("Entro a vuex error");
        this.context.commit("setCreateText", true);
        this.context.commit("setErrorCreateText", error);
        this.context.commit("setCreateText", false);
      });
  }

  @Action({ rawError: true })
  public async getTasks(): Promise<void> {
    this.context.commit("setGetTasks", true);
    return await TaskService.getTasks()
      .then((data: any) => {
        this.context.commit("setDataGetTasks", data);
        this.context.commit("setGetTasks", false);
      })
      .catch((error: any) => {
        console.log("Entro a vuex error");
        // this.context.commit("setGetTasks", true);
        this.context.commit("setErrorGetTasks", error);
        this.context.commit("setGetTasks", false);
      });
  }

  @Action({ rawError: true })
  public async getTask(taskId: string): Promise<void> {
    console.log("Hola");

    this.context.commit("setGetTask", true);
    return await TaskService.getTask(taskId)
      .then((data: Task) => {
        this.context.commit("setDataGetTask", data);
        this.context.commit("setGetTask", false);
      })
      .catch((error: any) => {
        console.log("Entro a vuex error");
        // this.context.commit("setGetTask", true);
        this.context.commit("setErrorGetTask", error);
        this.context.commit("setGetTask", false);
      });
  }

  @Action({ rawError: true })
  public async deleteTask(taskId: string): Promise<void> {
    return await TaskService.deleteTask(taskId)
      .then((data: any) => {
        console.log(data);
        this.context.commit("setDeleteTask", true);
        this.context.commit("setDataDeleteTasks", data);
        this.context.commit("setDeleteTask", false);
      })
      .catch((error: any) => {
        console.log("Entro a vuex error");
        this.context.commit("setDeleteTask", true);
        this.context.commit("setErrorDeleteTask", error);
        this.context.commit("setDeleteTask", false);
      });
  }

  @Action({ rawError: true })
  public async putTask(task: Task): Promise<void> {
    this.context.commit("setPutTask", true);
    return await TaskService.putTask(task)
      .then((data: PutTask) => {
        console.log(data);
        this.context.commit("setDataPutTasks", data);
        this.context.commit("setPutTask", false);
      })
      .catch((error: any) => {
        this.context.commit("setErrorPutTask", error);
        this.context.commit("setPutTask", false);
      });
  }

  get isLoading(): boolean {
    return this.status.loadingGetTasks;
  }

  get isLoadingTask(): boolean {
    return this.status.loadingGetTask;
  }
}
