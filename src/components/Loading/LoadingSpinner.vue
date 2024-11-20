<template>
  <div class="loading-spinner-container">
    <div class="loading-spinner-container__spinner"></div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
};
</script>

<style lang="sass" scoped>
.loading-spinner-container
  +flex-center
  height: 100vh

  &__spinner
    display: inline-block
    width: 40px
    height: 40px
    border: 3px solid transparent
    border-top-color: $color-primary
    border-radius: 50%
    animation: spin 0.8s linear infinite

    @keyframes spin
      0%
        transform: rotate(0deg)
      100%
        transform: rotate(360deg)
</style>
