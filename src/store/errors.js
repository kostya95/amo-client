import { defineStore } from "pinia";

export const useValidationError = defineStore({
  id: "validationErrors",
  state: () => ({
    errors: {},
  }),
  actions: {
    add(name, error) {
      if (!Array.isArray(this.errors[name])) {
        this.errors[name] = [];
      }
      this.errors[name].push(error);
    },
    clear() {
      console.log("clear");
      for (let prop in this.errors) {
        console.log(prop);
        this.errors[prop] = [];
      }
    },
  },
});
