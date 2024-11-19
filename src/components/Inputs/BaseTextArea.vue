<template>
  <div class="base-textarea">
    <label
      :for="id"
      :class="[
        'base-textarea__label',
        { 'base-textarea__label_hidden': !showLabel },
      ]"
    >
      {{ labelVisibility === "onFocus" ? placeholder : label }}
    </label>
    <div class="base-textarea__container">
      <textarea
        ref="textarea"
        :id="id"
        v-model="localValue"
        :placeholder="!focused && placeholder"
        :disabled="disabled"
        :rows="rows"
        :maxlength="maxlength"
        :class="['base-textarea__field', `base-textarea__field_size-${size}`]"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @click="$emit('click')"
      ></textarea>
      <span v-if="error" class="base-textarea__error">{{ error }}</span>
    </div>
  </div>
</template>

<script>
import BaseFieldMixin from "@/mixins/BaseFieldMixin";

export default {
  name: "BaseTextarea",
  mixins: [BaseFieldMixin],
  props: {
    rows: {
      type: Number,
      default: 5,
    },
    maxlength: {
      type: Number,
      default: 500,
    },
  },
};
</script>

<style lang="sass" scoped>
.base-textarea
  width: 100%
  position: relative

  &__label
    color: $color-primary
    font: $font-secondary
    font-size: 0.75rem
    text-align: left
    margin-bottom: 1rem
    transition: 0.3s ease
    opacity: 1

    &_hidden
      opacity: 0

  &__container
    height: 100%

  &__field
    +input-field
    width: 100%
    resize: none
    &::placeholder
      color: $color-placeholder
      opacity: 1 // Firefox
    &::-ms-input-placeholder // Edge 12 -18
      color: $color-placeholder

    &_size-s
      padding: $padding-input-size-s

    &_size-m
      padding: $padding-input-size-m
</style>
