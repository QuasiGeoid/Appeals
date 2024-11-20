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
    +transition(opacity)

  &-enter,
  &-leave-to
    opacity: 0
</style>
