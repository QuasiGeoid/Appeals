<template>
  <div class="login-page">
    <div class="login-page__form">
      <div class="login-page__header">Авторизация</div>
      <form @submit.prevent="handleLogin" class="login-page__form-body">
        <div class="login-page__inputs">
          <LoginInput
            v-model="username"
            @input="resetState"
            class="login-page__input"
          />
          <PasswordInput
            v-model="password"
            @input="resetState"
            class="login-page__input"
          />
        </div>
        <div class="login-page__footer">
          <BaseButton
            type="submit"
            :disabled="isButtonDisabled"
            class="login-page__button"
            >Войти</BaseButton
          >
        </div>
        <div v-if="loginError" class="login-page__error">{{ loginError }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { LoginInput, PasswordInput } from "@/components/Inputs";
import { BaseButton } from "@/components/Buttons";
import { preparePhoneNumber } from "@/utils/utils.js";

export default {
  name: "LoginView",
  components: {
    BaseButton,
    LoginInput,
    PasswordInput,
  },
  data() {
    return {
      username: "+7",
      password: "",
    };
  },
  computed: {
    ...mapGetters(["loginError"]),
    isButtonDisabled() {
      return !this.username || !this.password;
    },
  },
  methods: {
    ...mapMutations(["resetState"]),
    async handleLogin() {
      const preparedUsername = preparePhoneNumber(this.username);
      const credentials = {
        username: preparedUsername,
        password: this.password,
      };
      await this.$store.dispatch("login", credentials);
      if (this.$store.getters.isAuthenticated) {
        this.$router.push({ name: "appeals" });
      }
    },
    clearLoginError() {
      this.$store.commit("setLoginError", null);
    },
  },
};
</script>

<style lang="sass" scoped>
.login-page
  +flex-center
  height: 100vh
  background: url("@/assets/images/login_background.jpeg") no-repeat center center
  background-size: cover

  &__form
    display: flex
    flex-direction: column
    justify-content: space-evenly
    align-items: center
    background-color: white
    padding: 5.375rem 1.25rem 1.25rem
    border-radius: 5px
    max-width: 300px
    width: 100%
    position: relative

  &__header
    position: absolute
    top: 0
    left: 50%
    transform: translate(-50%,-30%)
    width: 90%
    margin: 0 auto
    color: $color-background-primary
    background-color: $color-header-label
    padding: 1.125rem 0
    border-radius: 5px
    font: $font-primary
    font-weight: 500
    text-align: center

  &__form-body
    min-width: 100%
    width: 100%

  &__input
    margin-bottom: 0.5rem

  &__footer
    display: flex
    justify-content: center

  &__button
    margin-top: 1.75rem

  &__error
    text-align: center
    margin-top: 1rem
    color: $color-error
</style>
