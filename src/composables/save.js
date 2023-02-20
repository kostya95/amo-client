import { useValidationError } from "../store/errors";
import { ref } from "@vue/reactivity";

export function useSave(store) {
  const errors = useValidationError();
  const isOpen = ref(false);
  const isLoad = ref(false);

  function openModal() {
    store.initNewValue();
    errors.clear();
    isOpen.value = true;
  }

  function save() {
    isLoad.value = true;
    store.store().then(() => {
      isLoad.value = false;
    });
  }
  return { isOpen, isLoad, openModal, save };
}
