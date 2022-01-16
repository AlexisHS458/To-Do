  <template>
  <v-hover>
    <v-list-item :to="`${task.id}`" slot-scope="{ hover }">
      <v-list-item-action>
        <v-checkbox
          color="secondary"
          @change="changeStatus($event, task)"
          @click.prevent
          v-model="task.is_completed"
        ></v-checkbox>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title :class="{ 'is-done': task.is_completed }">
          {{ task.title }}
        </v-list-item-title>
        <v-list-item-subtitle v-text="task.due_date"></v-list-item-subtitle>
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
              <v-card-title dark class="text-h5"> Eliminar Tarea </v-card-title>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  color="success"
                  :loading="status.loadingDeleteTask"
                  @click="
                    confirmDeleteTask(task.id);
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
    </v-list-item>
  </v-hover>
</template>

<script lang="ts">
import { Prop } from "nuxt-property-decorator";
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { PutTask } from "~/models/putTask";
import { ShortTask } from "~/models/shortTask";
import { Task } from "~/models/Task";
const Task = namespace("modules/task");

@Component
export default class OnlyTask extends Vue {
  @Prop({
    required: true,
  })
  public task!: ShortTask;

  /*
   Actions obtenidos del modulo de task
   */
  @Task.Action
  private deleteTask!: (TaskId: string) => Promise<void>;

  @Task.Action
  private putTask!: (putTask: PutTask) => Promise<void>;

  /*
   State obtenido del modulo de task
   */
  @Task.State("status")
  private status!: any;

  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
  };
  public isCompleted = 0;

  //Mandar datos para actualizar si esta completa la tarea
  changeStatus(isCompleted: boolean, task: ShortTask) {
    if (isCompleted) {
      this.isCompleted = 1;
    } else {
      this.isCompleted = 0;
    }

    const putTask: PutTask = {
      ...task,
      is_completed: this.isCompleted,
      token: process.env.TOKEN_SECRET!,
    };
    this.putTask(putTask);
  }

  //Mandar id de la tarea a eliminar
  async confirmDeleteTask(taskId: string) {
    await this.deleteTask(taskId);
    //Si el usuario se encuntra en la routa de la tarea a eliminar se regresa al index
    if (this.$route.path === "/" + taskId) {
      this.$router.replace("/");
    }
  }
}
</script>

<style scoped>
.hidden {
  visibility: hidden;
}

.is-done {
  text-decoration: line-through;
}
</style>