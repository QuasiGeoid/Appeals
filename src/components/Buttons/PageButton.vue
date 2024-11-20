<template>
  <button
    class="page-button"
    :class="{ 'page-button_selected': selected }"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "PageButton",
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="sass" scoped>
.page-button
  display: inline-flex
  border: none
    radius: 50%
  font-family: $font-family-secondary
  color: $color-nav-btn-txt
  background-color: transparent
  cursor: pointer
  justify-content: center
  padding: 0.5rem 1rem
  width: 1rem
  aspect-ratio: 1 / 1

  &_selected
    +selected
</style>
