<template>
  <div class="login-input">
    <SvgIcon type="mdi" :path="path" class="login-input__icon"></SvgIcon>
    <BaseInput
      label="Логин или Телефон"
      id="login"
      type="text"
      v-model="localValue"
      @input="$emit('input', $event)"
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
};
</script>

<style lang="sass" scoped>
.login-input
  display: flex
  align-items: end
  width: 100%

  &__icon
    +input-icon
</style>
