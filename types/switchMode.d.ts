declare module "vue-dark-mode-switch" {
  import { VueConstructor } from "vue";
  export default DarkModeSwitch;
  export const DarkModeSwitch: DarkModeSwitchConstructor;

  export interface VueDarkModeSwitchProps {
    initialState: boolean;
  }

  export interface VueDarkModeSwitchData {
    isEnabled: boolean;
  }

  export interface DarkModeSwitchConstructor extends VueConstructor {
    props: VueDarkModeSwitchProps;
    data: () => VueDarkModeSwitchData;
  }
}
