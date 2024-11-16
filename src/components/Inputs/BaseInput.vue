<template>
  <div class="base-input">
    <label
      :for="id"
      :class="['base-input__label', { 'base-input__label_hidden': !showLabel }]"
      >{{ labelVisibility === "onFocus" ? placeholder : label }}</label
    >
    <div class="base-input__container">
      <component
        :is="inputType"
        ref="input"
        :id="id"
        :type="type"
        :value="localValue"
        :placeholder="!focused && placeholder"
        :disabled="disabled"
        rows="4"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @click="$emit('click')"
        :class="[
          'base-input__field',
          `base-input__field_size-${size}`,
          { 'base-input__field_textarea': inputType === 'textarea' },
        ]"
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
    labelVisibility: {
      type: String,
      default: "onFocus",
      validator(value) {
        return ["hidden", "visible", "onFocus"].includes(value);
      },
    },
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localValue: this.value,
      focused: false,
    };
  },
  computed: {
    inputType() {
      return this.type === "textarea" ? "textarea" : "input";
    },
    showLabel() {
      if (this.labelVisibility === "hidden") return false;
      if (this.labelVisibility === "visible") return true;
      return (
        (this.labelVisibility === "onFocus" &&
          this.placeholder &&
          this.focused) ||
        this.localValue
      );
    },
  },
  methods: {
    onInput(event) {
      this.localValue = event?.target?.value || "";
      this.$emit("input", this.localValue);
    },
    onFocus() {
      this.$emit("focus");
      this.focused = true;
    },
    onBlur() {
      this.$emit("blur");
      this.focused = false;
    },
  },
  watch: {
    value(newVal) {
      this.localValue = newVal;
    },
  },
};
</script>

<style lang="sass" scoped>
.base-input
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

    &_textarea
      resize: none
      box-sizing: border-box
      line-height: 1.5
</style>
