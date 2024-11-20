<template>
  <div class="filter-input">
    <BaseInput
      v-model="filterValue"
      :label="label"
      :id="id"
      type="search"
      size="m"
      :placeholder="placeholder"
      @input="$emit('input', $event)"
    />
    <SvgIcon type="mdi" :path="path" class="filter-input__icon"></SvgIcon>
  </div>
</template>

<script>
import { BaseInput } from "./";
import { mdiMagnify } from "@mdi/js";

export default {
  name: "FilterInput",
  components: { BaseInput },
  props: {
    label: String,
    id: String,
    value: String,
    placeholder: String,
    error: String,
  },
  data() {
    return {
      filterValue: this.value,
      path: mdiMagnify,
    };
  },
};
</script>

<style lang="sass" scoped>
.filter-input
  +flex-end
  width: 100%

  &__icon
    +input-icon
    padding: $padding-input-size-m
</style>
