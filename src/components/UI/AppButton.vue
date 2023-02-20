<template>
  <button :type="type" class="button" :class="classes" :disabled="disabled">
    <AppSpinner size="22px" v-if="isLoad" />
    <span v-else>{{ title }}</span>
  </button>
</template>

<script>
import { toRefs } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import AppSpinner from "./AppSpinner.vue";
export default {
  props: {
    title: {
      type: String,
    },
    type: {
      type: String,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
    },
    isLoad: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { disabled, color } = toRefs(props);
    const classes = computed(() => {
      const classArray = [];
      if (color) classArray.push("button--" + color.value);
      if (disabled.value) classArray.push("button--disabled");
      return classArray;
    });
    return { classes };
  },
  components: { AppSpinner },
};
</script>

<style scoped lang="scss">
.button {
  background-color: var(--button-back);
  color: var(--button-color);
  padding: 8px 16px;
  border-radius: 5px;
  border: 2px solid var(--button-border-color);
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color var(--transititon-time),
    border-color var(--transititon-time), color var(--transititon-time);
  &--danger {
    background: #ff0000;
    border-color: #ff4d4d;
  }
  &--disabled {
    background: #fafafb;
    border-color: #dedede;
    color: #000;
  }
}
</style>
