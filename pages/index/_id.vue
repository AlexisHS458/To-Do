<template>
  <v-card rounded="lg">
    <v-card-text v-if="!isLoadingTask">
      <v-form ref="form" v-model="valid" lazy-validation>
        {{ visibility }}
        <v-text-field
          required
          v-model="taskUpdate.title"
          label="Titulo"
        ></v-text-field>
        <!-- 
        <v-radio-group v-model="isCompleted" row>
          <v-radio label="Completada" :value="1"></v-radio>
          <v-radio label="No completada" :value="0"></v-radio>
        </v-radio-group> -->
        <v-menu
          v-model="menuDate"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
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
    </v-card-text>

    <div v-else class="div-progress-circular">
      <v-progress-circular indeterminate :size="120" :width="4" color="primary">
      </v-progress-circular>
    </div>
    <v-card-actions class="justify-end">
      <v-btn text color="success" @click="updateTask()" :disabled="visibility"
        >Actualizar</v-btn
      >
      <v-btn text color="error" @click="cancel()">Cancelar</v-btn>
    </v-card-actions>
  </v-card>
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
  @Watch("$route.params.id")
  onChildChanged() {
    console.log("Entro watch");

    this.infoTask();
  }

  @Watch("task")
  onChildTask() {
    this.taskUpdate = { ...this.task };
    if (this.taskUpdate !== this.taskUpdate) {
      console.log("Entro if");

      this.visibility = true;
    }
  }

  @Watch("taskUpdate")
  onChildUpdateTask() {
    if (this.taskUpdate !== this.task) {
      console.log("Entro if");

      this.visibility = true;
    }
  }

  @Task.Action
  private getTask!: (TaskId: string) => Promise<void>;

  @Task.Action
  private putTask!: (putTask: PutTask) => Promise<void>;

  @Task.State("dataGetTask")
  private task!: Task;

  @Task.Getter("isLoadingTask")
  private isLoadingTask!: boolean;

  public taskUpdate = {} as Task;
  public visibility = false;
  public menuDate = false;
  public valid = true;
  public minDate = new Date(Date.now() - 8640000).toISOString().substr(0, 10);

  async created() {
    await this.infoTask();
    this.taskUpdate = { ...this.task };
  }

  async infoTask() {
    await this.getTask(this.$route.params.id);
  }

  async updateTask() {
    console.log(this.taskUpdate);

    await this.putTask(this.taskUpdate);
  }

  cancel() {
    this.taskUpdate = { ...this.task };
  }
}
</script>

<style scoped>
.v-card-title {
  padding-bottom: 0px !important;
}
</style>