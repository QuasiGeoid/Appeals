<template>
  <FadeTransition>
    <div v-if="visible" class="notification-popup" :class="typeClass">
      <div class="notification-popup__content">
        <span class="notification-popup__message">{{ message }}</span>
        <button class="notification-popup__close" @click="close">×</button>
      </div>
    </div>
  </FadeTransition>
</template>

<script>
import { FadeTransition } from "@/components/Transitions";

export default {
  name: "NotificationPopup",
  components: { FadeTransition },
  props: {
    type: {
      type: String,
      default: "success",
      validator(value) {
        return ["success", "fail"].includes(value);
      },
    },
    message: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 5000,
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  computed: {
    typeClass() {
      return this.type === "success"
        ? "notification-popup_success"
        : "notification-popup_fail";
    },
  },
  methods: {
    close() {
      this.visible = false;
      this.$emit("close");
    },
  },
  mounted() {
    if (this.duration > 0) {
      setTimeout(this.close, this.duration);
    }
  },
};
</script>

<style lang="sass" scoped>
.notification-popup
  +absolute-center-fixed
  +flex-center
  padding: 1rem 1.5rem
  border-radius: 8px
  color: $color-text-secondary
  box-shadow: $box-shadow
  z-index: $z-index-notification

  &_success
    background-color: $color-primary

  &_fail
    background-color: $color-error

  &__content
    flex-grow: 1

  &__message
    margin-right: 1rem

  &__close
    background: transparent
    border: none
    cursor: pointer
    font-size: 1.2rem
    color: $color-text-secondary
</style>
