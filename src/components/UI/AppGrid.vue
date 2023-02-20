<template>
  <div class="grid" v-if="values.length">
    <div class="grid-item" v-for="item in values" :key="item">
      <slot :value="item">
        {{ item }}
      </slot>
    </div>
  </div>
  <p v-else>Список пуст</p>
</template>

<script>
export default {
  props: {
    values: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding-bottom: 30px;
}
</style>
