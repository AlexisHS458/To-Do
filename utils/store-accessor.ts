import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import task from "~/store/modules/task";

let taskStore: task;

function initialiseStores(store: Store<any>): void {
  taskStore = getModule(task, store);
}

export { initialiseStores, taskStore };
