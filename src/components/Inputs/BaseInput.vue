<template>
  <BaseField
    :label="computedLabel"
    :id="id"
    :error="error"
    :showLabel="showLabel"
  >
    <input
      ref="input"
      :id="id"
      :type="type"
      v-model="localValue"
      :placeholder="!focused && placeholder"
      :disabled="disabled"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @click="$emit('click')"
      :class="['base-input__field', `base-input__field_size-${size}`]"
    />
  </BaseField>
</template>

<script>
import BaseFieldMixin from "@/mixins/BaseFieldMixin";

export default {
  name: "BaseInput",
  mixins: [BaseFieldMixin],
  props: {
    type: {
      type: String,
      default: "text",
    },
  },
};
</script>

<style lang="sass" scoped>
.base-input
  width: 100%
  position: relative

  &__field
    +base-field
    +input-field
    &::-webkit-clear-button,
    &::-webkit-search-cancel-button
      display: none
</style>
