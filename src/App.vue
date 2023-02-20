<template>
  <app-box class="section">
    <div class="row">
      <drop-down title="Тип" v-model="currentTab" :values="tabs" />
      <app-button
        title="Создать"
        :disabled="!currentTab"
        @click="$refs.list.openModal()"
      />
    </div>
  </app-box>
  <h2 class="section-title" v-text="tabTitle"></h2>
  <component
    v-if="currentComponent"
    ref="list"
    :is="currentComponent"
  ></component>
</template>
<script>
import DropDown from "./components/UI/DropDown.vue";
import AppButton from "./components/UI/AppButton.vue";
import AppBox from "./components/UI/AppBox.vue";
import LeadsList from "./components/leads/LeadsList.vue";
import CompanyList from "./components/company/CompanyList.vue";
import ContactsList from "./components/conatact/ContactsList.vue";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

export default {
  components: {
    DropDown,
    AppButton,
    AppBox,
    LeadsList,
    CompanyList,
    ContactsList,
  },

  setup() {
    const currentTab = ref(null);
    const tabs = [
      {
        id: "leads",
        title: "Сделки",
      },
      {
        id: "contacts",
        title: "Контакты",
      },
      {
        id: "company",
        title: "Компании",
      },
    ];
    const tabTitle = computed(() => {
      const value = tabs.find((el) => el.id === currentTab.value);
      return value?.title ?? "Выберите тип";
    });
    const currentComponent = computed(() => {
      const components = {
        leads: "LeadsList",
        company: "CompanyList",
        contacts: "ContactsList",
      };
      return components[currentTab.value];
    });
    return { currentTab, tabTitle, tabs, currentComponent };
  },
};
</script>
