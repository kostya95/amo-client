<template>
  <div class="box">
    <h3 class="box-title" v-if="title" v-text="title"></h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style scoped>
.box {
  background: var(--bg-second);
  border-radius: 14px;
  padding: 16px 24px;
}
.box-title {
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.01em;
  margin-bottom: 16px;
}
</style>
