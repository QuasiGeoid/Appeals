<template>
  <div class="base-modal">
    <BaseOverlay @close="handleClose" />
    <div class="base-modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { BaseOverlay } from "@/components/common";

export default {
  name: "BaseModal",
  components: { BaseOverlay },
  methods: {
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="sass" scoped>
.base-modal
  transition: opacity 0.3s ease
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh

  &__content
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    justify-content: center
    align-items: center
    background-color: $color-background-primary
    padding: 1.5rem 2rem
    border-radius: 0.5rem
    z-index: $z-index-modal
</style>
