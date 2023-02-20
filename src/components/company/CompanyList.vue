<template>
  <app-grid v-slot="{ value }" :values="store.companies">
    <app-box :title="value.name">
      <p><span>Номер компании:</span> {{ value.id }}</p>
    </app-box>
  </app-grid>
  <transition>
    <app-modal
      v-if="isOpen"
      title="Добавить компанию"
      @cancel="isOpen = false"
      @save="save"
      :is-load="isLoad"
    >
      <form>
        <app-input
          v-model="store.newValue.name"
          label="Название компании"
          placeholder="Введите название"
          class="block"
          name="companies.name"
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
import { useCompanyStore } from "../../store/companies";
import { useSave } from "../../composables/save";

export default {
  components: { AppGrid, AppModal, AppInput, AppBox },
  setup() {
    const store = useCompanyStore();
    const { isOpen, isLoad, openModal, save } = useSave(store);
    return { store, isOpen, isLoad, openModal, save };
  },
};
</script>
