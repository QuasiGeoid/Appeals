<template>
  <table class="appeals-table">
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.field"
          :style="
            column.widthMultiplier
              ? { width: getColumnWidth(column.widthMultiplier) }
              : null
          "
          @click="column.sortable && sortBy(column.field)"
        >
          {{ column.label }}
          <SvgIcon
            v-if="column.sortable"
            type="mdi"
            :path="sortIcon"
            :class="[
              'appeals-table__sort-icon',
              {
                'appeals-table__sort-icon_disabled': column.field != sort.field,
              },
            ]"
          ></SvgIcon>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="appeal in sortedAppeals" :key="appeal.id">
        <td>
          <BaseButton
            @click="$emit('cell-click', appeal.id)"
            class="appeals-table__appeal-btn"
          >
            {{ appeal.number }}
          </BaseButton>
        </td>
        <td>{{ convertDate(appeal.created_at) }}</td>
        <td>{{ getAddress(appeal) }}</td>
        <td>{{ getSurnameWithInitials(appeal.applicant) }}</td>
        <td>{{ appeal.description }}</td>
        <td>{{ convertDate(appeal.due_date, true) }}</td>
        <td>{{ appeal.status.name }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mdiArrowUp, mdiArrowDown } from "@mdi/js";
import { sortByField, convertDate as convertDateUtil } from "@/utils/utils";
import { BaseButton } from "@/components/Buttons";

export default {
  name: "AppealsTable",
  components: { BaseButton },
  props: {
    appeals: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      sort: {
        field: "number",
        order: "asc",
      },
      columns: [
        {
          label: "№",
          field: "number",
          sortable: true,
          widthMultiplier: 1,
        },
        {
          label: "Создана",
          field: "created_at",
          sortable: true,
          widthMultiplier: 1.5,
        },
        {
          label: "Адрес",
          field: "address",
          sortable: false,
          widthMultiplier: 2,
        },
        {
          label: "Заявитель",
          field: "applicant",
          sortable: false,
          widthMultiplier: 2,
        },
        { label: "Описание", field: "description", sortable: false },
        {
          label: "Срок",
          field: "due_date",
          sortable: false,
          widthMultiplier: 1.5,
        },
        {
          label: "Статус",
          field: "status.name",
          sortable: true,
          widthMultiplier: 1.5,
        },
      ],
    };
  },
  computed: {
    sortedAppeals() {
      return sortByField(this.appeals, this.sort.field, this.sort.order);
    },
    sortIcon() {
      return this.sort.order === "asc" ? mdiArrowDown : mdiArrowUp;
    },
  },
  methods: {
    sortBy(field) {
      this.sort.order =
        this.sort.field === field && this.sort.order === "asc" ? "desc" : "asc";
      this.sort.field = field;
    },
    convertDate(...args) {
      return convertDateUtil(...args);
    },
    getSurnameWithInitials(applicant) {
      const initials = [applicant.first_name, applicant.patronymic_name]
        .map((name) => (name ? `${name[0]}.` : ""))
        .join(" ");
      return `${applicant.last_name} ${initials}`.trim();
    },
    getAddress(appeal) {
      const { premise, apartment } = appeal;

      if (!premise?.address) return "";

      const fullAddress = apartment?.label
        ? `${premise.address}, ${apartment.label}`
        : premise.address;

      return fullAddress;
    },
    getColumnWidth(multiplier) {
      return `${multiplier * 6.25}rem`;
    },
  },
};
</script>

<style lang="sass" scoped>
.appeals-table
  width: 100%
  border-collapse: collapse

  th, td
    border-bottom: $border-bottom-input
    font-size: 0.875rem

  th
    font-family: $font-family-secondary
    height: 44px
    position: relative
    text-align: start
    font-weight: 400
    color: $color-primary

  td
    font-family: $font-family-primary
    height: 58px
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis

  &__sort-icon
    color: $color-text-primary
    position: absolute
    top: 30%
    transform: translateY(-30%) scale(0.6)

    &_disabled
      top: 50%
      transform: translateY(-50%) scale(0.6)
      color: $color-disabled

  &__appeal-btn
    max-width: 70%
    font-family: $font-family-primary
</style>
