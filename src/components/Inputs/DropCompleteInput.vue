<template>
  <div class="drop-complete">
    <BaseInput
      v-model="searchTerm"
      type="text"
      :placeholder="placeholder"
      size="m"
      @input="inputUpdate"
      @focus="showDropdown = true"
      @blur="closeDropdown"
      class="drop-complete__input"
    />
    <ul v-if="showDropdown" class="drop-complete__dropdown">
      <li v-if="loading" class="drop-complete__loading">Поиск...</li>
      <li v-else-if="!options.length">Ничего не найдено</li>
      <li
        v-else
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
        class="drop-complete__option"
      >
        {{ option.label }}
      </li>
    </ul>
    <div
      class="drop-complete__container-icon"
      @click="showDropdown = !showDropdown"
    >
      <SvgIcon
        type="mdi"
        :path="iconPath"
        class="drop-complete__icon"
      ></SvgIcon>
    </div>
  </div>
</template>

<script>
import { BaseInput } from "@/components/Inputs";
import { mdiMenuDown } from "@mdi/js";

export default {
  name: "DropCompleteInput",
  components: { BaseInput },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchTerm: "",
      showDropdown: false,
      iconPath: mdiMenuDown,
    };
  },
  watch: {
    value(newVal) {
      const selectedOption = this.options.find(
        (option) => option.value === newVal
      );
      this.searchTerm = selectedOption ? selectedOption.label : "";
    },
  },
  methods: {
    inputUpdate(value) {
      this.$emit("search", value);
    },
    selectOption(option) {
      this.searchTerm = option.label;
      this.showDropdown = false;
      this.$emit("input", option.value);
    },
    closeDropdown() {
      // Delay to allow for click events to register before closing dropdown
      setTimeout(() => {
        this.showDropdown = false;
      }, 200);
    },
  },
};
</script>

<style lang="sass" scoped>
.drop-complete
  position: relative
  z-index: 2
  width: 100%

  &__input
    width: 100%

  &__dropdown
    position: absolute
    top: 100%
    left: 0
    width: 100%
    max-height: 50vh
    overflow-y: auto
    background-color: $color-background-primary
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
    z-index: 10
    margin-top: 0
    padding: 0

  &__option
    padding: 0.5rem
    cursor: pointer
    &:hover
      background-color: darken($color-background-primary, 10%)


  &__container
    cursor: pointer

    &-icon
      cursor: pointer
      position: absolute
      top: 0
      right: 1rem
      transform: scale(1.2)
      color: $color-placeholder
</style>
