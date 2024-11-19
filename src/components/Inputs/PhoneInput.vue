<template>
  <BaseInput
    :label="label"
    :placeholder="placeholder"
    id="phone"
    type="tel"
    :size="size"
    v-model="formattedPhoneNumber"
  />
</template>

<script>
import { BaseInput } from "./";

export default {
  name: "PhoneInput",
  components: { BaseInput },
  props: {
    value: String,
    label: {
      type: String,
      default: "Телефон",
    },
    placeholder: {
      type: String,
      default: "Телефон",
    },
    size: String,
  },
  data() {
    return {
      localValue: this.prettyPhoneNumber(this.value),
    };
  },
  computed: {
    formattedPhoneNumber: {
      get() {
        return this.localValue;
      },
      set(val) {
        this.localValue = this.prettyPhoneNumber(val);
        this.$emit("input", val);
      },
    },
  },
  methods: {
    prettyPhoneNumber(value) {
      return value
        .replace(/^(\+7)(\d{3})(\d{3})(\d{2})(\d{2})$/, "$1 $2 $3 $4 $5") // Format +7 XXX XXX XX XX
        .trim();
    },
  },
};
</script>

<style></style>
