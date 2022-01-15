<template>
  <div>
    <v-app-bar app clipped-right flat>
      <v-toolbar-title>To Do</v-toolbar-title>
      <v-spacer></v-spacer>
      <add-task></add-task>
      <v-icon @click="drawerNavigator = !drawerNavigator" class="d-lg-none"
        >mdi-clipboard-edit-outline</v-icon
      >
    </v-app-bar>

    <v-navigation-drawer app clipped right dark v-model="drawerNavigator">
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

  mounted() {
    console.log(this.status);
  }

  public drawerNavigator = null;
}
</script>



