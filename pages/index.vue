<template>
  <div>
    <v-app-bar app clipped-right flat dark fixed color="primary">
      <v-toolbar-title class="white--text">To Do</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-spacer></v-spacer>
      <add-task></add-task>
      <v-icon
        @click="drawerNavigator = !drawerNavigator"
        dark
        class="d-lg-none mr-4"
        >mdi-clipboard-edit-outline</v-icon
      >
      <DarkModeSwitch @switched="toggleDarkMode()" :initialState="!darkMode" />
    </v-app-bar>

    <v-navigation-drawer app clipped right v-model="drawerNavigator">
      <NuxtChild />
    </v-navigation-drawer>

    <list-task></list-task>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
const Task = namespace("modules/task");

@Component
export default class Index extends Vue {
  @Task.State("statusDrawerNavigator")
  private status!: boolean;

  @Task.Action
  private toggleStatusDrawerNavigator!: () => void;

  public darkMode = false;

  toggleDarkMode() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    this.darkMode = !this.darkMode;
  }

  public drawerNavigator = null;
}
</script>




