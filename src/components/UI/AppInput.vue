<template>
  <div class="input">
    <label v-if="label" class="input-label" v-text="label"></label>
    <input
      :placeholder="placeholder"
      :value="modelValue"
      :type="type"
      @input="(e) => $emit('update:modelValue', e.target.value)"
      class="input-input"
    />
    <div v-if="store.errors[name]?.length" class="errors">
      <p
        v-for="error in store.errors[name]"
        :key="error"
        v-text="error"
        class="error"
      ></p>
    </div>
  </div>
</template>

<script>
import { useValidationError } from "../../store/errors";
export default {
  props: {
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
    },
  },
  emits: ["update:modelValue"],
  setup() {
    const store = useValidationError();
    return { store };
  },
};
</script>

<style lang="scss" scoped>
.input {
  &-label {
    display: block;
    font-size: 14px;
    margin-bottom: 10px;
    color: #6e6e6e;
  }
  &-input {
    border: 2px solid #6e6e6e;
    border-radius: 5px;
    padding: 8px 16px;
  }
}
.error {
  font-size: 13px;
  color: #ff0000;
}
</style>
