<template>
  <v-app id="app" dark>
    <v-app-bar flat app fixed>
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>

      <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        v-model="dialog"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-toolbar dark>Nueva tarea</v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="taskModel.title"
                label="Título"
                required
                :rules="[rules.required]"
              ></v-text-field>

              <v-radio-group v-model="isCompleted" row>
                <v-radio label="Completada" :value="1"></v-radio>
                <v-radio label="No completada" :value="0"></v-radio>
              </v-radio-group>
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
                counter
                color="primary"
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
                counter
                color="primary"
                prepend-inner-icon="mdi-card-text-outline"
                autocomplete="off"
                no-resize
                height="100"
              ></v-textarea>
              <v-text-field
                v-model="taskModel.tags"
                label="Tags"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text color="success" @click="sendTask()">Aceptar</v-btn>
            <v-btn text color="error" @click="closeDialog()">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <v-main class="overflow-hidden">
      <v-container class="overflow-hidden">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
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
export default class Default extends Vue {
  @Ref("form") readonly form!: VForm;

  @Watch("isCompleted")
  onChildChanged() {
    if (this.isCompleted == null) {
      this.isCompleted = 0;
    }
  }

  @Task.Action
  private createTask!: (task: CreatedTask) => Promise<void>;

  public taskModel = {} as CreatedTask;

  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
    requireda: (v: string): string | boolean => !!v || "c",
  };

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

  closeDialog() {
    this.form.resetValidation();
    this.resetForm();
    this.dialog = false;
  }

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

  public title = "To Do";
  public isCompleted = 0;
  public dialog = false;
  public valid = true;
  public menuDate = false;
  public date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);
  public minDate = new Date(Date.now() - 8640000).toISOString().substr(0, 10);
}
</script>


<style scoped>
</style>