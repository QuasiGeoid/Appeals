<template>
  <BaseField
    :label="computedLabel"
    :id="id"
    :error="error"
    :showLabel="showLabel"
  >
    <textarea
      ref="textarea"
      :id="id"
      v-model="localValue"
      :placeholder="!focused && placeholder"
      :disabled="disabled"
      :rows="rows"
      :maxlength="maxlength"
      :class="['base-textarea__field', `base-textarea__field_size-${size}`]"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @click="$emit('click')"
    ></textarea>
  </BaseField>
</template>

<script>
import BaseFieldMixin from "@/mixins/BaseFieldMixin";

export default {
  name: "BaseTextarea",
  mixins: [BaseFieldMixin],
  props: {
    rows: {
      type: Number,
      default: 5,
    },
    maxlength: {
      type: Number,
      default: 500,
    },
  },
};
</script>

<style lang="sass" scoped>
.base-textarea
  width: 100%
  position: relative

  &__field
    +base-field
    +input-field
    padding-left: 1rem !important
    resize: none
</style>
