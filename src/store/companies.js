import { defineStore } from "pinia";
import storage from "../storage";

storage.add("companies", "/companies");
const initialcompanies = storage.getValues("companies");
export const useCompanyStore = defineStore({
  id: "companies",
  state: () => ({
    companies: initialcompanies,
    newValue: {
      name: null,
    },
  }),
  actions: {
    initNewValue() {
      this.newValue = {
        name: null,
      };
    },
    async store() {
      const value = await storage.storeValues("companies", this.newValue);
      if (value) {
        this.companies.unshift(value);
        this.initNewValue();
        return value;
      }
    },
  },
});
