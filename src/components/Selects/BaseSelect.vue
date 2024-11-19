<template>
  <div class="base-select-wrapper">
    <select
      :class="[
        'base-select-wrapper__select',
        `base-select-wrapper__select_size-${size}`,
        { 'base-select-wrapper__select_placeholder-active': !selectedValue },
      ]"
      v-model="selectedValue"
      @change="onValueChange"
    >
      <option v-if="placeholder && !selectedValue" value="" disabled selected>
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        class="base-select-wrapper__select-option"
      >
        {{ option.label }}
      </option>
    </select>
    <SvgIcon
      type="mdi"
      :path="iconPath"
      :class="[
        'base-select-wrapper__icon',
        `base-select-wrapper__icon_size-${size}`,
      ]"
    ></SvgIcon>
  </div>
</template>

<script>
import { mdiMenuDown } from "@mdi/js";

export default {
  name: "BaseSelect",
  props: {
    options: {
      type: Array,
      validator(options) {
        return options.every(
          (option) =>
            typeof option.value !== "undefined" &&
            typeof option.label !== "undefined"
        );
      },
    },
    value: {
      type: [String, Number],
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: "s",
      validator(value) {
        return ["s", "m", "h"].includes(value);
      },
    },
  },
  data() {
    return {
      iconPath: mdiMenuDown,
      selectedValue: this.value,
    };
  },
  watch: {
    value(newVal) {
      this.selectedValue = newVal;
    },
  },
  methods: {
    onValueChange() {
      this.$emit("input", this.selectedValue);
      this.$emit("change", this.selectedValue);
    },
  },
};
</script>

<style lang="sass" scoped>
.base-select-wrapper
  position: relative

  &__select
    +base-field
    position: relative
    z-index: 2
    background-color: transparent !important
    appearance: none
    width: 100%
    height: 100%

    &_size-s
      padding: $padding-input-size-s

    &_size-m
      padding: $padding-input-size-m

    &_placeholder-active
      color: $color-placeholder

    &-option
      color: $color-text-primary

  &__icon
    position: absolute
    z-index: 1
    right: 16px
    transform: scale(1.2)
    color: $color-placeholder
    cursor: pointer

    &_size-s
      right: 5px

    &_size-m
      right: 12px
</style>
