<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['btn', `btn_size-${size}`]"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    type: {
      type: String,
      default: "submit",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "m",
      validator(value) {
        return ["s", "m"].includes(value);
      },
    },
  },
  methods: {
    onClick(event) {
      this.$emit("click", event);
    },
  },
};
</script>

<style lang="sass" scoped>
.btn
  font-family: $font-family-secondary
  background-color: $color-primary
  transition: background-color 0.3s ease
  color: $color-text-secondary
  border: none
  cursor: pointer
  width: 100%

  &_size-s
    max-width: 78px
    font-size: 0.625rem
    padding: 0.5rem 1rem
    border-radius: 2px

  &_size-m
    max-width: 110px
    font-size: 0.875rem
    padding: 0.65rem 1rem
    border-radius: 4px

  &:hover
    background-color: $color-button-hover

  &:active
    background-color: $color-button-active

  &[disabled]
    +disabled
</style>
