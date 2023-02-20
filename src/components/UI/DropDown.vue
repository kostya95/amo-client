<template>
  <div class="dropdown" :id="'id' + id">
    <div class="dropdown-header" @click="open">
      <div class="dropdown-header__body">
        <span v-if="title">{{ title }}:</span>
        <span>{{ currentTitle }}</span>
      </div>
      <font-awesome-icon
        icon="fa-solid fa-angle-up"
        class="dropdown-header__icon"
        :class="{ 'dropdown-header__icon--open': isOpen }"
      />
    </div>
    <transition>
      <div v-if="isOpen" class="dropdown-body">
        <template v-if="values.length">
          <div
            class="dropdown-body__item"
            v-text="empty"
            @click="choise(null)"
          ></div>
          <div
            class="dropdown-body__item"
            v-for="item in values"
            :key="item.id"
            @click="choise(item.id)"
          >
            <div class="dropdown-body__check">
              <font-awesome-icon
                v-if="item.id == modelValue"
                icon="fa-solid fa-check"
              />
            </div>
            <p class="dropdown-body__text" v-text="item.title"></p>
          </div>
        </template>
        <div v-else class="dropdonw-body__item">Ничего нет</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, toRefs } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
export default {
  props: {
    title: {
      type: String,
    },
    values: {
      type: Array,
      default() {
        return [];
      },
    },
    modelValue: {
      type: String,
    },
    empty: {
      type: String,
      default: "Не выбрано",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const { values, modelValue, empty } = toRefs(props);
    const currentValue = ref("Не указано");
    const isOpen = ref(false);
    const id = ref(Date.now() + Math.floor(Math.random() * 10000));
    onMounted(() => {
      if (modelValue.value) currentValue.value = modelValue.value;
    });
    const currentTitle = computed(() => {
      const value = values.value.find((el) => modelValue.value === el.id);
      return value ? value.title : empty.value;
    });
    const choise = (choisedValue) => {
      document.removeEventListener("click", close);
      emit("update:modelValue", choisedValue);
      isOpen.value = false;
    };
    function close(e) {
      const closest = e.target.closest("#id" + id.value.toString());
      if (!closest) {
        isOpen.value = false;
        document.removeEventListener("click", close);
      }
    }
    const open = () => {
      if (isOpen.value) {
        document.removeEventListener("click", close);
      } else {
        document.addEventListener("click", close);
      }
      isOpen.value = !isOpen.value;
    };
    return { currentValue, choise, currentTitle, isOpen, id, open };
  },
};
</script>

<style scoped lang="scss">
.dropdown {
  max-width: 300px;
  width: 100%;
  cursor: pointer;
  position: relative;
  &-header {
    display: flex;
    align-items: center;
    padding: 8px;
    background: #fafafb;
    border: 2px solid #dedede;
    justify-content: space-between;
    box-shadow: 0px 2px 2px 0px rgb(195 195 195);
    &__icon {
      transform: rotate(0deg);
      transition: transform var(--transititon-time);
      &--open {
        transform: rotate(180deg);
      }
    }
  }
  &-body {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    right: 0;
    border-bottom: 1px solid #dedede;
    background: #fafafb;
    &__check {
      width: 16px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 4px;
    }
    &__item {
      display: flex;
      align-items: center;
      padding: 8px;
      background-color: #fff;
      border: 1px solid #dedede;
      transition: background-color var(--transititon-time);

      &:last-child {
        border-bottom: none;
      }
      &:hover,
      &--active {
        background: rgb(237, 237, 237);
      }
    }
  }
}
</style>
