import { defineStore } from "pinia";
import storage from "../storage";

storage.add("leads", "/leads");
const initialLeads = storage.getValues("leads");
export const useLeadsStore = defineStore({
  id: "leads",
  state: () => ({
    leads: initialLeads,
    newLead: {
      price: null,
      name: null,
    },
  }),
  actions: {
    initNewValue() {
      this.newLead = {
        price: null,
        name: null,
      };
    },
    async store() {
      const lead = await storage.storeValues("leads", this.newLead);

      if (lead) {
        this.leads.unshift(lead);
        this.initNewValue();
        return lead;
      }
    },
  },
});
