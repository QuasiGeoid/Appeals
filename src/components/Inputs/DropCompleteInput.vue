<template>
  <div class="drop-complete">
    <BaseInput
      ref="input"
      v-model="searchTerm"
      type="text"
      :placeholder="loading ? `${placeholder} загрузка данных...` : placeholder"
      size="m"
      @input="inputUpdate"
      @focus="showDropdown = true"
      class="drop-complete__input"
      @disabled="loading"
    />
    <FadeTransition>
      <ul v-if="showDropdown" class="drop-complete__dropdown" ref="dropDown">
        <li v-if="loading" class="drop-complete__loading">Поиск...</li>
        <li v-else-if="!options.length">Ничего не найдено</li>
        <template v-else>
          <li
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option)"
            class="drop-complete__option"
          >
            {{ option.label }}
          </li>
        </template>
      </ul>
    </FadeTransition>
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
import { FadeTransition } from "@/components/Transitions";

export default {
  name: "DropCompleteInput",
  components: { BaseInput, FadeTransition },
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
  computed: {
    selectedLabel() {
      const selectedOption = this.options.find(
        (option) => option.value === this.value
      );
      return selectedOption ? selectedOption.label : "";
    },
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.searchTerm = this.selectedLabel;
      },
    },
    options: {
      immediate: true,
      handler() {
        this.searchTerm = this.selectedLabel;
      },
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
    onMouseDownClick(event) {
      const input = this.$refs.input.$el;
      const dropDown = this.$refs.dropDown;
      if (
        dropDown &&
        !dropDown.contains(event.target) &&
        !input.contains(event.target)
      ) {
        this.closeDropdown();
      }
    },
  },
  mounted() {
    document.addEventListener("mousedown", this.onMouseDownClick);
  },
  beforeDestroy() {
    document.removeEventListener("mousedown", this.onMouseDownClick);
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
      top: 35%
      right: 5%
      transform: scale(1.2)
      color: $color-placeholder
</style>
