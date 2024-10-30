<template>
  <div class="login-input">
    <SvgIcon type="mdi" :path="path" class="login-input__icon"></SvgIcon>
    <BaseInput
      label="Логин или Телефон"
      id="login"
      type="text"
      :value="value"
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
