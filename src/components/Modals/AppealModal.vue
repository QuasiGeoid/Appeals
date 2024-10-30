<template>
  <div>
    <div>
      <h1>{{ header }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppealModal",
  props: {
    type: {
      type: String,
      default: "New",
      validator(value) {
        return ["New", "Edit"].includes(value);
      },
    },
    appeal: {
      type: Object,
      default: null,
    },
  },
  computed: {
    header() {
      return this.type == "New"
        ? "Создание заявки"
        : `Заявка № ${this.appeal.number}`;
    },
  },
  methods: {},
};
</script>

<style></style>
