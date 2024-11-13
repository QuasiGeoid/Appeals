<template>
  <div class="date-time-input">
    <BaseInput
      :id="id"
      :label="label"
      type="type"
      v-model="formattedDate"
      placeholder="Срок"
      :error="error"
      :size="size"
      @focus="onInputFocus"
      :disabled="disabled"
    />
    <BaseDatepicker
      class="date-time-input__calendar"
      v-show="isCalendarOpen"
      v-model="selectedDate"
      @close="onDatepickerClose"
    />
  </div>
</template>

<script>
import { BaseInput, BaseDatepicker } from ".";

export default {
  name: "DateTimeInput",
  components: { BaseInput, BaseDatepicker },
  props: {
    value: Date,
    label: String,
    id: String,
    error: String,
    size: {
      type: String,
      default: "m",
      validator(value) {
        return ["s", "m", "h"].includes(value);
      },
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
  },
};
</script>

<style scoped lang="sass">
.date-time-input
  position: relative
  width: 100%

  &__calendar
    position: absolute
</style>
