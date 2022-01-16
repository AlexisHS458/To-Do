<template>
  <div v-if="!isLoadingTask">
    <v-card color="transparent" flat height="100" class="flex-column d-flex">
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            required
            v-model="taskUpdate.title"
            label="Titulo"
            :rules="[rules.required]"
            color="secondary"
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
                color="secondary"
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
            color="secondary"
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
            color="secondary"
            prepend-inner-icon="mdi-card-text-outline"
            autocomplete="off"
            no-resize
            height="100"
          ></v-textarea>
          <v-text-field
            label="Tags"
            required
            v-model="taskUpdate.tags"
            color="secondary"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-end flex-grow-0 flex-shrink-1">
        <v-btn
          text
          color="success"
          :loading="status.loadingPutTask"
          @click="updateTask()"
          >Actualizar</v-btn
        >
        <v-btn text color="error" @click="cancel()">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <div v-else class="progress-circular">
    <v-progress-circular indeterminate :size="60" :width="4" color="secondary">
    </v-progress-circular>
  </div>
</template>

<script lang="ts">
import { Ref, Watch } from "nuxt-property-decorator";
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { PutTask } from "~/models/putTask";
import { Task } from "~/models/Task";
import { VForm } from "~/utils/types";
const Task = namespace("modules/task");

@Component
export default class TaskClass extends Vue {
  //Mandar a llamar la función infoTask si el id en la ruta cambia
  @Watch("$route.params.taskId")
  onChildChanged() {
    this.infoTask();
  }

  @Ref("form") readonly form!: VForm;

  /*
   Actions obtenidos del modulo de task
   */
  @Task.Action
  private getTask!: (TaskId: string) => Promise<void>;

  @Task.Action
  private putTask!: (putTask: PutTask) => Promise<void>;

  /*
   States obtenidos del modulo de task
   */
  @Task.State("selectedTask")
  private task!: Task;

  @Task.State("status")
  private status!: any;

  /*
   Getter obtenido del modulo de task
   */
  @Task.Getter("isLoadingTask")
  private isLoadingTask!: boolean;

  public taskUpdate = {} as Task;
  public visibility = false;
  public menuDate = false;
  public valid = true;
  //Variable para no poder seleccionar días antes
  public minDate = new Date(Date.now() - 8640000).toISOString().substr(0, 10);
  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
  };

  //Obtener información de las tareas por primera vez
  async created() {
    await this.infoTask();
  }

  //Obtener las infromación de las tareas
  async infoTask() {
    await this.getTask(this.$route.params.taskId);
    //Crear clone del arreglo original de task para poder editar la infomación
    this.taskUpdate = { ...this.task };
    if (Object.entries(this.taskUpdate).length === 0) {
      this.$router.push("/notFoundTask");
    }
  }

  //Actualizar tarea
  async updateTask() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      console.log(this.taskUpdate);

      await this.putTask(this.taskUpdate);
    }
  }

  //Resetear formulario de editar con la información de la tarea
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

.text {
  text-align: center;
}
</style>