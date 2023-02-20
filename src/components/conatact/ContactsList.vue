<template>
  <app-grid v-slot="{ value }" :values="store.contacts">
    <app-box :title="value.name">
      <p><span>Номер контакта:</span> {{ value.id }}</p>
      <p><span>Имя:</span> {{ value.first_name || "Не указано" }}</p>
      <p><span>Фамилия:</span> {{ value.last_name || "Не указано" }}</p>
    </app-box>
  </app-grid>
  <transition>
    <app-modal
      v-if="isOpen"
      title="Добавить контакт"
      @cancel="isOpen = false"
      @save="save"
      :is-load="isLoad"
    >
      <form>
        <app-input
          v-model="store.newValue.name"
          label="Название контакта"
          placeholder="Введите название"
          class="block"
          name="contacts.name"
        />
        <app-input
          v-model="store.newValue.first_name"
          label="Имя"
          placeholder="Введите имя"
          class="block"
          name="contacts.first_name"
        />
        <app-input
          v-model="store.newValue.last_name"
          label="Фамилия"
          placeholder="Введите фамилию"
          class="block"
          name="contacts.last_name"
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
import { useContactsStore } from "../../store/contacts";
import { useSave } from "../../composables/save";

export default {
  components: { AppGrid, AppModal, AppInput, AppBox },
  setup() {
    const store = useContactsStore();
    const { isOpen, isLoad, openModal, save } = useSave(store);
    return { store, isOpen, isLoad, openModal, save };
  },
};
</script>
