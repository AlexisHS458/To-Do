<template>
  <v-row>
    <v-col cols="12">
      <v-card v-if="!isLoading" two-line height="100%">
        <v-list class="scrollable">
          <v-list-item-group multiple>
            <Task v-for="task in notCompleted" :key="task.id" :task="task" />
            <v-subheader v-if="isCompleted.length > 0">Completadas</v-subheader>
            <Task v-for="task in isCompleted" :key="task.id" :task="task" />
          </v-list-item-group>
        </v-list>
      </v-card>
      <div v-else class="progress-circular">
        <v-progress-circular
          indeterminate
          :size="120"
          :width="4"
          color="secondary"
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
import { ShortTask } from "~/models/shortTask";
import { Task } from "~/models/Task";
const Task = namespace("modules/task");

@Component
export default class Tasks extends Vue {
  //Si el arreglo orginal cambia se vuelven asignar los datos al tasksClone
  @Watch("tasks")
  onChildTask() {
    this.tasksClone = this.tasks.map((tasks) => {
      return { ...tasks };
    });
    this.isCompleted = this.tasksClone.filter((todo) => todo.is_completed);
    this.notCompleted = this.tasksClone.filter((todo) => !todo.is_completed);
  }

  /*
   Action obtenido del modulo de task
   */
  @Task.Action
  private getTasks!: () => Promise<void>;

  /*
   Action obtenido del modulo de task
   */
  @Task.State("taskList")
  private tasks!: ShortTask[];

  /*
   Getter obtenido del modulo de task
   */
  @Task.Getter
  private isLoading!: boolean;

  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
  };

  public tasksClone: ShortTask[] = [];
  public isCompleted: ShortTask[] = [];
  public notCompleted: ShortTask[] = [];
  async mounted() {
    await this.getTasks();

    //Crear clone de las tareas
    this.tasksClone = this.tasks.map((tasks) => {
      return {
        ...tasks,
      };
    });
    this.isCompleted = this.tasksClone.filter((todo) => todo.is_completed);
    this.notCompleted = this.tasksClone.filter((todo) => !todo.is_completed);

    console.log(this.isCompleted);
  }
}
</script>

<style scoped>
.progress-circular {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
</style>