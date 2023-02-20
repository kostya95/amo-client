<template>
  <div class="modal">
    <div class="modal-cont">
      <div class="modal-body">
        <div v-if="title" class="modal-body__header">
          <h2 class="modal-body__header-title">{{ title }}</h2>
        </div>
        <div class="modal-body__cont">
          <slot></slot>
        </div>
        <div class="modal-body__action">
          <div class="row">
            <app-button
              title="Сохранить"
              @click="$emit('save')"
              :is-load="isLoad"
            />
            <app-button
              title="Отмена"
              color="danger"
              @click="$emit('cancel')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "./AppButton.vue";
export default {
  components: { AppButton },
  props: {
    title: {
      type: String,
    },
    isLoad: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["save", "cancel"],
};
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 200;
  background: rgba($color: #ffffff, $alpha: 0.5);
  backdrop-filter: blur(10px);
  overflow: auto;
  &-cont {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    padding: 50px 8px;
  }
  &-body {
    width: 100%;
    max-width: 400px;
    background: #fff;
    border-radius: 14px;
    padding: 16px 24px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    &__header {
      margin-bottom: 30px;
      padding-bottom: 30px;
      border-bottom: 2px solid #dedede;
      &-title {
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        letter-spacing: 0.01em;
      }
    }
    &__action {
      padding-top: 30px;
      border-top: 2px solid #dedede;
      margin-top: 30px;
    }
  }
}
</style>
