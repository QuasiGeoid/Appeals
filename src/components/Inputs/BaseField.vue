<template>
  <div class="base-field">
    <label
      :for="id"
      :class="['base-field__label', { 'base-field__label_hidden': !showLabel }]"
    >
      {{ label }}
    </label>
    <div class="base-field__container">
      <slot></slot>
    </div>
    <span v-if="error" class="base-field__error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: "BaseField",
  props: {
    label: String,
    id: String,
    error: String,
    showLabel: Boolean,
  },
};
</script>

<style lang="sass" scoped>
.base-field
  width: 100%
  position: relative

  &__label
    +transition(opacity)
    color: $color-primary
    font: $font-secondary
    font-size: 0.75rem
    text-align: left
    margin-bottom: 1rem
    opacity: 1

    &_hidden
      opacity: 0

  &__container
    height: 100%

  &__error
    color: $color-error
    font-size: 0.75rem
    margin-top: 0.25rem
</style>
