<template>
  <div class="close-button" @click="$emit('click')">
    <SvgIcon type="mdi" :path="iconPath" class="close-button__icon"></SvgIcon>
  </div>
</template>
<script>
import { mdiClose } from "@mdi/js";

export default {
  name: "CloseButton",
  data() {
    return {
      iconPath: mdiClose,
    };
  },
};
</script>
<style lang="sass" scoped>
.close-button
  position: absolute
  top: 1rem
  right: 1rem
  cursor: pointer

  &__icon
    color: $color-placeholder

    &:hover
      color: $color-button-hover

    &:active
      color: $color-button-active
</style>
