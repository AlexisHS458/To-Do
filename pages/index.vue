<template>
  <div>
    <v-app-bar app clipped-right flat dark fixed color="primary">
      <v-toolbar-title class="white--text">To Do</v-toolbar-title>
      <v-spacer></v-spacer>
      <AddTask />
      <v-btn
        dar
        @click="drawerNavigator = !drawerNavigator"
        dark
        class="d-lg-none mr-4"
        icon
      >
        <v-icon>mdi-clipboard-edit-outline</v-icon>
      </v-btn>
      <DarkModeSwitch @switched="toggleDarkMode()" :initialState="!darkMode" />
    </v-app-bar>
    <v-navigation-drawer app clipped right v-model="drawerNavigator">
      <NuxtChild />
    </v-navigation-drawer>
    <list-task></list-task>
    <Snackbar
      :color="'success'"
      :snackText="message.messageCreateTask"
      :timeout="timeout"
      :status="snackbarStatus.statusCreateTask"
      :statusModuleSnackBar="'statusCreateTask'"
    />
    <Snackbar
      :color="'success'"
      :snackText="message.messageDeleteTask"
      :timeout="timeout"
      :status="snackbarStatus.statusDeleteTask"
      :statusModuleSnackBar="'statusDeleteTask'"
    />
    <Snackbar
      :color="'success'"
      :snackText="message.messageUpdateTask"
      :timeout="timeout"
      :status="snackbarStatus.statusUpdateTask"
      :statusModuleSnackBar="'statusUpdateTask'"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
const Task = namespace("modules/task");

@Component
export default class Index extends Vue {
  /*
   States obtenidos del modulo de task
   */
  @Task.State("messages")
  private message!: any;

  @Task.State("snackbarStatus")
  private snackbarStatus!: any;

  public darkMode = false;
  public timeout = -1;
  public drawerNavigator = null;

  //Cambiar página a modo oscuro
  toggleDarkMode() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    this.darkMode = !this.darkMode;
  }
}
</script>




