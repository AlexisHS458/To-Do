<template>
  <v-card>
    <v-list two-line class="scrollable" v-if="!isLoading">
      <v-list-item-group multiple>
        <template v-for="task in tasksClone">
          <v-hover :key="task.id" a>
            <v-list-item :to="`${task.id}`" slot-scope="{ hover }">
              <v-list-item-action>
                <v-checkbox
                  @change="changeStatus($event, task)"
                  @click.prevent
                  v-model="task.is_completed"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="task.title"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="task.due_date"
                ></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-dialog transition="dialog-top-transition" max-width="300">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      icon
                      :class="{ hidden: !hover }"
                      @click.prevent
                    >
                      <v-icon color="error" dense>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-card-title dark class="text-h5">
                        Eliminar Tarea
                      </v-card-title>
                      <v-card-actions class="justify-end">
                        <v-btn
                          text
                          color="success"
                          @click="
                            deleteTask(task.id);
                            dialog.value = false;
                          "
                          >Eliminar</v-btn
                        >
                        <v-btn text color="error" @click="dialog.value = false"
                          >Cerrar</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-list-item-action>
              <!--   </template> -->
            </v-list-item>
          </v-hover>
        </template>
      </v-list-item-group>
    </v-list>
    <div v-else class="div-progress-circular">
      <v-progress-circular indeterminate :size="120" :width="4" color="primary">
      </v-progress-circular>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { PutTask } from "~/models/putTask";
import { ShortTask } from "~/models/shortTask";
import { Task } from "~/models/Task";
const Task = namespace("modules/task");

@Component
export default class Tasks extends Vue {
  @Task.Action
  private getTasks!: () => Promise<void>;

  @Task.Action
  private deleteTask!: (TaskId: string) => Promise<void>;

  @Task.State("taskList")
  private tasks!: ShortTask[];

  @Task.Action
  private putTask!: (putTask: PutTask) => Promise<void>;

  @Task.Getter
  private isLoading!: boolean;

  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
  };

  public tasksClone: ShortTask[] = [];

  changeStatus(isCompleted: number, task: ShortTask) {
    const putTask: PutTask = {
      ...task,
      is_completed: isCompleted,
      token:
        "e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd",
    };
    this.putTask(putTask);
  }

  async mounted() {
    await this.getTasks();
    //Query inveritda o put
    this.tasksClone = this.tasks.map((tasks) => {
      return { ...tasks, is_completed: tasks.is_completed === 1 ? 0 : 1 };
    });

    console.log(this.tasksClone);
  }
}
</script>

<style scoped>
.scrollable {
  overflow-y: auto;
  height: 100vh;
  /*  display: flex;  */
}

.div {
  height: 100vh;
  display: flex;
}

.hidden {
  visibility: hidden;
}
</style>