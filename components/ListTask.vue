<template>
  <v-row>
    <v-col cols="12">
      <v-card v-if="!isLoading" two-line height="100%">
        <v-list class="scrollable">
          <v-list-item-group multiple>
            <template v-for="task in tasksClone">
              <Task
                v-if="task.is_completed === 0"
                :key="task.id"
                :task="task"
              />
            </template>
          </v-list-item-group>
          <v-subheader>Completadas</v-subheader>
          <v-list-item-group multiple>
            <template v-for="task in tasksClone">
              <Task
                v-if="task.is_completed === 1"
                :key="task.id"
                :task="task"
              />
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
      <div v-else class="progress-circular">
        <v-progress-circular
          indeterminate
          :size="120"
          :width="4"
          color="primary"
        >
        </v-progress-circular>
      </div>
    </v-col>
  </v-row>
</template>


<script lang="ts">
import { Watch } from "nuxt-property-decorator";
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { PutTask } from "~/models/putTask";
import { ShortTask } from "~/models/shortTask";
import { Task } from "~/models/Task";
const Task = namespace("modules/task");

@Component
export default class Tasks extends Vue {
  @Watch("tasks")
  onChildTask() {
    console.log("Ento watch tasks");

    this.tasksClone = this.tasks.map((tasks) => {
      return { ...tasks, is_completed: tasks.is_completed === 1 ? 0 : 1 };
    });
  }

  @Task.Action
  private getTasks!: () => Promise<void>;

  @Task.State("taskList")
  private tasks!: ShortTask[];

  @Task.Getter
  private isLoading!: boolean;

  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
  };

  public tasksClone: ShortTask[] = [];

  async mounted() {
    await this.getTasks();
    this.tasksClone = this.tasks.map((tasks) => {
      return { ...tasks, is_completed: tasks.is_completed === 1 ? 0 : 1 };
    });
    const hola = this.tasksClone.filter((isCompleted) => {
      return isCompleted.is_completed === 0;
    });
    console.log(hola);
  }
}
</script>

<style scoped>
.scrollable {
  overflow-y: auto;
  height: auto;
  /*  display: flex;  */
}

.progress-circular {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
</style>