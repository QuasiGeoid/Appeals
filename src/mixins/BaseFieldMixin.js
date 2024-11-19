import BaseField from "@/components/Inputs/BaseField.vue";

export default {
  components: { BaseField },
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
    placeholder: String,
    error: String,
    size: {
      type: String,
      default: "s",
      validator(value) {
        return ["s", "m"].includes(value);
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
    showLabel() {
      if (this.labelVisibility === "hidden") return false;
      if (this.labelVisibility === "visible") return true;
      return (
        (this.labelVisibility === "onFocus" &&
          this.placeholder &&
          this.focused) ||
        (this.localValue !== undefined &&
          this.localValue !== null &&
          this.localValue !== "")
      );
    },
    computedLabel() {
      return this.labelVisibility === "onFocus" ? this.placeholder : this.label;
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
