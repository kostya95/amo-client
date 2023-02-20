import { defineStore } from "pinia";
import storage from "../storage";

storage.add("contacts", "/contacts");
const initialContacts = storage.getValues("contacts");
export const useContactsStore = defineStore({
  id: "contacts",
  state: () => ({
    contacts: initialContacts,
    newValue: {
      name: null,
      first_name: null,
      last_name: null,
    },
  }),
  actions: {
    initNewValue() {
      this.newValue = {
        name: null,
        first_name: null,
        last_name: null,
      };
    },
    async store() {
      const value = await storage.storeValues("contacts", this.newValue);
      if (value) {
        this.contacts.unshift(value);
        this.initNewValue();
        return value;
      }
    },
  },
});
