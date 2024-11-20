<template>
  <div class="date-time-input" ref="dateTimeInput">
    <BaseInput
      :id="id"
      :label="label"
      v-model="formattedDate"
      placeholder="Срок"
      :error="error"
      :size="size"
      @focus="onInputFocus"
      :disabled="disabled"
    />
    <FadeTransition>
      <BaseDatepicker
        class="date-time-input__datepicker"
        v-if="isCalendarOpen"
        v-model="selectedDate"
        @input="updateDate"
        @close="onDatepickerClose"
      />
    </FadeTransition>
  </div>
</template>

<script>
import { BaseInput, BaseDatepicker } from ".";
import { FadeTransition } from "@/components/Transitions";

export default {
  name: "DateTimeInput",
  components: { BaseInput, BaseDatepicker, FadeTransition },
  props: {
    value: Date,
    label: String,
    id: String,
    error: String,
    size: {
      type: String,
      default: "m",
    },
  },
  data() {
    return {
      selectedDate: this.value,
      hasFocused: false,
      isCalendarOpen: false,
      disabled: false,
    };
  },
  computed: {
    formattedDate() {
      if (!this.selectedDate) return "";

      const day = this.selectedDate.getDate().toString().padStart(2, "0");
      const month = (this.selectedDate.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const year = this.selectedDate.getFullYear();
      const hour = this.selectedDate.getHours().toString().padStart(2, "0");
      const minute = this.selectedDate.getMinutes().toString().padStart(2, "0");

      return `${day}.${month}.${year} ${hour}:${minute}`;
    },
  },
  methods: {
    onInputFocus() {
      this.isCalendarOpen = !this.isCalendarOpen;
      this.disabled = true;
    },
    onDatepickerClose() {
      this.isCalendarOpen = false;
      this.disabled = false;
    },
    closeDatePicker(event) {
      const dateTimeInput = this.$refs.dateTimeInput;
      if (!dateTimeInput.contains(event.target)) {
        this.isCalendarOpen = false;
        this.disabled = false;
      }
    },
    updateDate() {
      this.$emit("input", this.selectedDate);
    },
  },
  mounted() {
    document.addEventListener("mousedown", this.closeDatePicker);
  },
  beforeDestroy() {
    document.removeEventListener("mousedown", this.closeDatePicker);
  },
};
</script>

<style scoped lang="sass">
.date-time-input
  position: relative
  width: 100%

  &__datepicker
    position: absolute
</style>
