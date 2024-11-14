<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: "FadeTransition",
};
</script>

<style lang="sass" scoped>
.fade
  &-enter-active,
  &-leave-active
    transition: opacity 0.5s ease

  &-enter,
  &-leave-to
    opacity: 0
</style>
