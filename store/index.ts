/* import { Store } from "vuex";
import { initialiseStores } from "@/utils/store-accessor";

const initializer = (store: Store<any>) => initialiseStores(store);

export const plugins = [initializer];
export * from "@/utils/store-accessor"; */

/* import Vuex from "vuex";
import TaskModule from "~/store/modules/task";

export function createStore() {
  return new Vuex.Store({
    modules: {
      TaskModule,
    },
  });
}
 */

import Vuex from "vuex";

export const store = new Vuex.Store<any>({});
