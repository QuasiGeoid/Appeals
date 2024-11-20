<template>
  <div class="overlay" @click="onClickOverlay"></div>
</template>

<script>
export default {
  name: "BaseOverlay",
  props: {
    closeOnClick: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onClickOverlay() {
      if (this.closeOnClick) {
        this.$emit("close");
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.overlay
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background-color: rgba($color-overlay, 0.2)
  z-index: $z-index-overlay
</style>
