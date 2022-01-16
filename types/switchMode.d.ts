/* Crear modulo para el componente de DarkModeSwitch
Componente extraído de https://github.com/ismailnguyen/vue-dark-mode-switch */
declare module "vue-dark-mode-switch" {
  import { VueConstructor } from "vue";
  //Exportar el componente
  export default DarkModeSwitch;
  export const DarkModeSwitch: DarkModeSwitchConstructor;

  //Interfaz creada a partir de la estructura de los props del componente
  export interface VueDarkModeSwitchProps {
    initialState: boolean;
  }

  //Interfaz creada a partir de la estructura de los datos del componente
  export interface VueDarkModeSwitchData {
    isEnabled: boolean;
  }

  //Construir componente para poder utilizar su tipado
  export interface DarkModeSwitchConstructor extends VueConstructor {
    props: VueDarkModeSwitchProps;
    data: () => VueDarkModeSwitchData;
  }
}
