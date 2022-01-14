<template>
  <v-card>
    <v-list two-line class="scrollable" v-if="!isLoading">
      <v-list-item-group multiple>
        <template v-for="task in tasks">
          <v-hover :key="task.id" a>
            <v-list-item :to="`${task.id}`" slot-scope="{ hover }">
              <!-- <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox
                    :input-value="active"
                    color="primary"
                  ></v-checkbox>
                </v-list-item-action> -->
              <v-list-item-action>
                <v-checkbox @click.prevent></v-checkbox>
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
const Task = namespace("modules/task");

@Component
export default class Tasks extends Vue {
  @Task.Action
  private getTasks!: () => Promise<void>;

  @Task.Action
  private deleteTask!: (TaskId: string) => Promise<void>;

  @Task.State("dataGetTasks")
  private tasks!: "";

  @Task.Action
  private putTask!: (putTask: PutTask) => Promise<void>;

  @Task.Getter
  private isLoading!: boolean;

  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
  };

  async mounted() {
    await this.getTasks();
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