<template>
  <div class="password-input">
    <SvgIcon type="mdi" :path="lockPath" class="password-input__icon"></SvgIcon>
    <BaseInput
      id="password"
      :type="showPassword ? 'text' : 'password'"
      :value="value"
      :placeholder="'Пароль'"
      size="s"
      @input="$emit('input', $event)"
    />
    <div @click="toggleShowPassword" class="password-input__icon-container">
      <SvgIcon
        type="mdi"
        :path="showPassword ? eyePath : eyeOffPath"
        class="password-input__icon clickable"
      ></SvgIcon>
    </div>
  </div>
</template>

<script>
import BaseInput from "./BaseInput.vue";
import { mdiLock, mdiEyeOff, mdiEye } from "@mdi/js";

export default {
  name: "PasswordInput",
  components: { BaseInput },
  props: {
    value: String,
  },
  data() {
    return {
      lockPath: mdiLock,
      eyePath: mdiEye,
      eyeOffPath: mdiEyeOff,
      showPassword: false,
    };
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style lang="sass" scoped>
.password-input
  +flex-end
  width: 100%

  &__icon-container
    +flex-end

  &__icon
    +input-icon

.clickable
  cursor: pointer
</style>
