
<template>
  <v-snackbar v-model="status" :timeout="timeout" :color="color">
    <p v-html="snackText" class="mb-0"></p>
    <template v-slot:action="{ attrs }">
      <v-btn
        color="white"
        text
        v-bind="attrs"
        @click="setNotVisibleSnackbar(statusModuleSnackBar)"
      >
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { namespace } from "nuxt-property-decorator";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
const Task = namespace("modules/task");

@Component
export default class snackbar extends Vue {
  @Prop({
    required: true,
  })
  public status!: boolean;
  @Prop({
    required: true,
  })
  public timeout!: number;
  @Prop({
    required: true,
  })
  public snackText!: string;

  @Prop({
    required: false,
  })
  public statusModuleSnackBar!: string;

  @Prop({
    required: true,
  })
  public color!: string;

  /*
   Action obtenido del modulo de task
   */
  @Task.Action
  private setNotVisibleSnackbar!: (statusName: string) => void;
}
</script>