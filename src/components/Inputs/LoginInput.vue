<template>
  <div class="login-input">
    <SvgIcon type="mdi" :path="path" class="login-input__icon"></SvgIcon>
    <BaseInput
      placeholder="Логин или Телефон"
      id="login"
      size="s"
      v-model="localValue"
      @input="onInput"
    />
  </div>
</template>

<script>
import { BaseInput } from "./";
import { mdiPhone } from "@mdi/js";

export default {
  name: "LoginInput",
  components: { BaseInput },
  props: {
    value: String,
  },
  data() {
    return {
      localValue: this.value,
      path: mdiPhone,
    };
  },
  watch: {
    value(newVal) {
      this.localValue = newVal;
    },
  },
  methods: {
    onInput(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="sass" scoped>
.login-input
  +flex-end
  width: 100%

  &__icon
    +input-icon
</style>
