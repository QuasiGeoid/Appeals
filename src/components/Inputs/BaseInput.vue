<template>
  <div class="base-input">
    <label v-if="label" :for="id" class="base-input__label">{{ label }}</label>
    <div class="base-input__container">
      <input
        :id="id"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        :class="['base-input__field', `base-input__field_size-${size}`]"
      />
      <span v-if="error" class="base-input__error">{{ error }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    label: String,
    id: String,
    value: String,
    type: {
      type: String,
      default: "text",
    },
    placeholder: String,
    error: String,
    size: {
      type: String,
      default: "s",
      validator(value) {
        return ["s", "m", "h"].includes(value);
      },
    },
  },
};
</script>

<style lang="sass" scoped>
.base-input
  width: 100%

  &__label
    color: $color-primary
    font: $font-secondary
    font-size: 0.75rem
    text-align: left
    display: block
    margin-bottom: 16px

  &__container
    height: 100%

  &__field
    +input-field
    width: 100%
    &::placeholder
      color: $color-placeholder
      opacity: 1 // Firefox
    &::-ms-input-placeholder // Edge 12 -18
      color: $color-placeholder
    &::-webkit-clear-button,
    &::-webkit-search-cancel-button
      display: none

    &_size-s
      padding: $padding-input-size-s

    &_size-m
      padding: $padding-input-size-m
</style>
