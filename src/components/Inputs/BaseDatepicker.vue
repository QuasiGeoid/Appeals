<template>
  <div class="base-datepicker">
    <div class="base-datepicker__year-month">
      <NavButton type="prev" @click="onPreviousClick" />
      <span class="base-datepicker__year-month-label">{{
        yearMonthLabel
      }}</span>
      <NavButton type="next" @click="onNextClick" />
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="day in daysOfWeek" :key="day">
            {{ day }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, index) in calendarDays" :key="index">
          <td
            v-for="d in week"
            :key="d.date"
            :class="[
              'base-datepicker__day',
              {
                'base-datepicker__day_empty': !d.date,
                'base-datepicker__day_selected':
                  selectedDate.getDate() === d.date,
              },
            ]"
            @click="d.date && onClickDay(d.date)"
          >
            <span v-if="d.isInMonth">{{ d.date }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <BaseInput type="time" v-model="time" class="base-datepicker__time" />
  </div>
</template>
<script>
import { NavButton } from "@/components/Buttons";
import { BaseInput } from ".";

export default {
  name: "BaseDatepicker",
  components: { NavButton, BaseInput },
  props: {
    value: {
      type: Date,
    },
  },
  data() {
    return {
      monthLabels: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      daysOfWeek: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      selectedDate: this.value ? new Date(this.value) : new Date(),
    };
  },
  computed: {
    yearMonthLabel() {
      const year = this.selectedDate.getFullYear();
      const month = this.monthLabels[this.selectedDate.getMonth()];
      return `${year} ${month}`;
    },
    calendarDays() {
      const DAYS_IN_WEEK = 7;
      const FIRST_DAY_OF_MONTH = 1;
      const MAX_WEEKS_IN_MONTH = 6;
      const year = this.selectedDate.getFullYear();
      const month = this.selectedDate.getMonth();

      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      const daysInMonth = lastDayOfMonth.getDate();
      const startDayOfWeek =
        (firstDayOfMonth.getDay() + DAYS_IN_WEEK - 1) % DAYS_IN_WEEK;

      const weeks = [];
      let day = FIRST_DAY_OF_MONTH - startDayOfWeek;
      for (let week = 0; week < MAX_WEEKS_IN_MONTH; week++) {
        const weekDays = [];
        for (let i = 0; i < DAYS_IN_WEEK; i++) {
          const isInMonth = day > 0 && day <= daysInMonth;
          weekDays.push({
            date: isInMonth ? day : null,
            isInMonth,
          });
          day++;
        }
        weeks.push(weekDays);
        if (day > daysInMonth) break;
      }
      return weeks;
    },
    time: {
      get() {
        const hour = this.selectedDate.getHours().toString().padStart(2, "0");
        const minute = this.selectedDate
          .getMinutes()
          .toString()
          .padStart(2, "0");

        return `${hour}:${minute}`;
      },
      set(val) {
        const [hour, minute] = val.split(":").map(Number);
        if (!isNaN(hour) && !isNaN(minute)) {
          this.selectedDate.setHours(hour);
          this.selectedDate.setMinutes(minute);
          this.emitDateUpdate();
        }
      },
    },
  },
  methods: {
    updateYearMonth() {
      this.year = this.selectedDate.getFullYear();
      this.month = this.selectedDate.getMonth();
    },
    onPreviousClick() {
      this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
      this.updateYearMonth();
      this.emitDateUpdate();
    },
    onNextClick() {
      this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
      this.updateYearMonth();
      this.emitDateUpdate();
    },
    onClickDay(day) {
      this.selectedDate.setDate(day);
      this.day = day;
      this.emitDateUpdate();
    },
    emitDateUpdate() {
      this.selectedDate = new Date(this.selectedDate);
      this.$emit("input", this.selectedDate);
    },
  },
};
</script>
<style lang="sass" scoped>
.base-datepicker
  transition: opacity 0.3s ease
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  background-color: $color-background-primary
  padding: 1rem
  border-radius: 0.5rem
  z-index: $z-index-popup
  gap: 1rem

  &__year-month-label
    display: inline-block
    width: 10rem
    text-align: center

  &__day
    border: $border-bottom-input
    border-radius: 0.5rem
    text-align: center
    padding: 0.5rem
    cursor: pointer
    position: relative

    &:hover
      background-color: lighten($color-primary, 30%)

    &_empty
      background-color: $color-disabled

      &:hover
        cursor: default
        background-color: $color-disabled

    &_selected
      color: $color-text-secondary
      background-color: $color-primary

      &:hover
        background-color: $color-primary

  &__time
    width: 40%
</style>
