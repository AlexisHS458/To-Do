<template>
  <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark class="mr-4" icon v-bind="attrs" v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="primary"
        ><v-toolbar-title class="white--text"
          >Crear nueva tarea</v-toolbar-title
        ></v-toolbar
      >
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="taskModel.title"
            label="Título"
            required
            :rules="[rules.required]"
            color="secondary"
          ></v-text-field>

          <v-radio-group v-model="isCompleted" row>
            <v-radio color="secondary" label="Completada" :value="1"></v-radio>
            <v-radio
              color="secondary"
              label="No completada"
              :value="0"
            ></v-radio>
          </v-radio-group>
          <v-menu
            v-model="menuDate"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                color="secondary"
                v-model="date"
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
              v-model="date"
              @input="menuDate = false"
            ></v-date-picker>
          </v-menu>
          <v-textarea
            label="Comentarios"
            v-model="taskModel.comments"
            outlined
            dense
            color="secondary"
            prepend-inner-icon="mdi-card-text-outline"
            autocomplete="off"
            no-resize
            height="100"
          ></v-textarea>
          <v-textarea
            v-model="taskModel.description"
            label="Descripción"
            outlined
            dense
            color="secondary"
            prepend-inner-icon="mdi-card-text-outline"
            autocomplete="off"
            no-resize
            height="100"
          ></v-textarea>
          <v-text-field
            v-model="taskModel.tags"
            label="Tags"
            required
            color="secondary"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          text
          color="success"
          :loading="status.loadingCreateTask"
          @click="sendTask()"
          >Aceptar</v-btn
        >
        <v-btn text color="error" @click="closeDialog()">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Ref, Watch } from "nuxt-property-decorator";
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { CreatedTask } from "~/models/createdTask";
import { VForm } from "@/utils/types";
const Task = namespace("modules/task");
@Component
export default class AddTask extends Vue {
  @Ref("form") readonly form!: VForm;

  /*
   Action obtenido del modulo de task
   */
  @Task.Action
  private createTask!: (task: CreatedTask) => Promise<void>;

  /*
   State obtenido del modulo de task
   */
  @Task.State("status")
  private status!: any;

  public taskModel = {} as CreatedTask;
  public title = "To Do";
  public isCompleted = 0;
  public dialog = false;
  public valid = true;
  public menuDate = false;
  //Variable para obtener la fecha actual
  public date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);
  //Variable para no poder seleccionar días antes
  public minDate = new Date(Date.now() - 8640000).toISOString().substr(0, 10);
  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
  };

  //Mandar datos de la tarea para crearla
  async sendTask() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.taskModel.due_date = this.date;
      this.taskModel.is_completed = this.isCompleted;
      await this.createTask(this.taskModel);
      this.form.resetValidation();
      this.resetForm();
      this.dialog = false;
    }
  }

  //Cerrar dialogo y resetear errores de validación
  closeDialog() {
    this.form.resetValidation();
    this.resetForm();
    this.dialog = false;
  }

  //Resetear formulario
  resetForm() {
    this.taskModel = {
      title: "",
      comments: "",
      tags: "",
      description: "",
      is_completed: 0,
      due_date: "",
    };
  }
}
</script>


