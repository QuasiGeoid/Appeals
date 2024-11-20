<template>
  <button class="nav-button" @click="onClick" :disabled="disabled">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "NavButton",
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) =>
        ["step-first", "prev", "next", "step-last"].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    label() {
      switch (this.type) {
        case "step-first":
          return "<<";
        case "prev":
          return "<";
        case "next":
          return ">";
        case "step-last":
          return ">>";
        default:
          return "";
      }
    },
  },
  methods: {
    onClick() {
      if (!this.disabled) {
        this.$emit("click", this.type);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.nav-button
  font: $font-secondary
  padding: 8px 12px
  border: none
  cursor: pointer
  background-color: transparent
  color: $color-nav-btn-txt

  &:disabled
    +disabled
</style>
