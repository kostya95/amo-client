<template>
  <app-grid v-slot="{ value }" :values="store.leads">
    <app-box :title="value.name">
      <p><span>Номер сделки:</span> {{ value.id }}</p>
      <p><span>Сроимость:</span> {{ value.price || "Не указано" }}</p>
    </app-box>
  </app-grid>
  <transition>
    <app-modal
      v-if="isOpen"
      title="Добавить сделку"
      @cancel="isOpen = false"
      @save="save"
      :is-load="isLoad"
    >
      <form>
        <app-input
          v-model="store.newLead.name"
          label="Название"
          placeholder="Введите название"
          class="block"
          name="leads.name"
        />
        <app-input
          v-model.number="store.newLead.price"
          label="Цена"
          placeholder="Введите цену"
          type="number"
          name="leads.price"
        />
      </form>
    </app-modal>
  </transition>
</template>
<script>
import AppGrid from "../UI/AppGrid.vue";
import AppModal from "../UI/AppModal.vue";
import AppInput from "../UI/AppInput.vue";
import AppBox from "../UI/AppBox.vue";
import { useLeadsStore } from "../../store/leads";
import { useSave } from "../../composables/save";

export default {
  components: { AppGrid, AppModal, AppInput, AppBox },
  setup() {
    const store = useLeadsStore();
    const { isOpen, isLoad, openModal, save } = useSave(store);
    return { store, isOpen, isLoad, openModal, save };
  },
};
</script>
