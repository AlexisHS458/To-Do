//Obtener los tipos de v-form para poder formatear los formularios
export type VForm = Vue & {
  validate: () => boolean;
  resetValidation: () => boolean;
  reset: () => void;
};
