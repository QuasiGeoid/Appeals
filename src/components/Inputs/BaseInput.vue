<template>
  <div class="base-input">
    <label v-if="label" :for="id" class="base-input__label">{{ label }}</label>
    <div class="base-input__container">
      <component
        :is="inputType"
        ref="input"
        :id="id"
        :type="type"
        :value="localValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="handleInput"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @click="$emit('click')"
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localValue: this.value,
    };
  },
  computed: {
    inputType() {
      return this.type === "textarea" ? "textarea" : "input";
    },
  },
  methods: {
    handleInput(event) {
      this.localValue = event?.target?.value || "";
      this.$emit("input", this.localValue);
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
