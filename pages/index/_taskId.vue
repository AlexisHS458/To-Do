<template>
  <v-card
    v-if="!isLoadingTask"
    color="transparent"
    flat
    height="100"
    class="flex-column d-flex"
  >
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          required
          v-model="taskUpdate.title"
          label="Titulo"
        ></v-text-field>
        <v-menu
          v-model="menuDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="taskUpdate.due_date"
              label="Fecha"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              clearable
            ></v-text-field>
          </template>

          <v-date-picker
            color="primary"
            :min="minDate"
            v-model="taskUpdate.due_date"
            @input="menuDate = false"
          ></v-date-picker>
        </v-menu>
        <v-textarea
          label="Comentarios"
          v-model="taskUpdate.comments"
          :placeholder="task.comments"
          outlined
          dense
          color="primary"
          prepend-inner-icon="mdi-card-text-outline"
          autocomplete="off"
          no-resize
          height="100"
        ></v-textarea>
        <v-textarea
          v-model="taskUpdate.description"
          label="Descripción"
          :placeholder="taskUpdate.description"
          outlined
          dense
          color="primary"
          prepend-inner-icon="mdi-card-text-outline"
          autocomplete="off"
          no-resize
          height="100"
        ></v-textarea>
        <v-text-field
          label="Tags"
          required
          v-model="taskUpdate.tags"
        ></v-text-field>
      </v-form>
      <!--  </v-container> -->
    </v-card-text>
    <v-card-actions class="justify-end flex-grow-0 flex-shrink-1">
      <v-btn text color="success" @click="updateTask()">Actualizar</v-btn>
      <v-btn text color="error" @click="cancel()">Cancelar</v-btn>
    </v-card-actions>
  </v-card>

  <div v-else class="progress-circular">
    <v-progress-circular indeterminate :size="60" :width="4" color="primary">
    </v-progress-circular>
  </div>
</template>

<script lang="ts">
import { Watch } from "nuxt-property-decorator";
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { PutTask } from "~/models/putTask";
import { Task } from "~/models/Task";
const Task = namespace("modules/task");

@Component
export default class TaskClass extends Vue {
  @Watch("$route.params.taskId")
  onChildChanged() {
    this.infoTask();
  }

  @Task.Action
  private getTask!: (TaskId: string) => Promise<void>;

  @Task.Action
  private putTask!: (putTask: PutTask) => Promise<void>;

  @Task.State("selectedTask")
  private task!: Task;

  @Task.Getter("isLoadingTask")
  private isLoadingTask!: boolean;

  public taskUpdate = {} as Task;
  public visibility = false;
  public menuDate = false;
  public valid = true;
  public minDate = new Date(Date.now() - 8640000).toISOString().substr(0, 10);

  async created() {
    console.log(this.$route.params.taskId);

    await this.infoTask();
  }

  async infoTask() {
    await this.getTask(this.$route.params.taskId);
    this.taskUpdate = { ...this.task };
  }

  async updateTask() {
    await this.putTask(this.taskUpdate);
  }

  cancel() {
    this.taskUpdate = { ...this.task };
  }
}
</script>

<style scoped>
.progress-circular {
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>