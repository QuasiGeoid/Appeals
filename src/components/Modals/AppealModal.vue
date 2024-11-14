<template>
  <BaseModal :show="show" @close="handleClose" class="appeal-modal">
    <h2>{{ header }}</h2>
    <form @submit.prevent="submitAppeal" class="appeal-modal__form">
      <div class="appeal-modal__row">
        <PremiseDropCompleteInput
          class="appeal-modal__input"
          v-model="premiseId"
        />
        <ApartmentDropCompleteInput
          class="appeal-modal__input"
          v-model="apartmentId"
          :premiseId="premiseId"
        />
        <DateTimeInput v-model="dueDate" />
      </div>
      <div class="appeal-modal__row">
        <BaseInput
          v-for="(field, index) in applicantNameFields"
          v-model="field.model"
          :key="index"
          :placeholder="field.label"
        />
        <BaseInput placeholder="Телефон" type="tel" v-model="phone" />
      </div>
      <BaseInput
        placeholder="Описание заявки"
        type="textarea"
        v-model="description"
      />
      <BaseButton
        type="submit"
        :disabled="isButtonDisabled"
        class="appeal-modal__button"
        >{{ buttonLabel }}</BaseButton
      >
    </form>
  </BaseModal>
</template>

<script>
import { mapGetters } from "vuex";
import { BaseModal } from "@/components/Modals";
import {
  ApartmentDropCompleteInput,
  BaseInput,
  DateTimeInput,
  PremiseDropCompleteInput,
} from "@/components/Inputs";
import { BaseButton } from "@/components/Buttons";

export default {
  name: "AppealModal",
  components: {
    ApartmentDropCompleteInput,
    BaseModal,
    BaseInput,
    BaseButton,
    DateTimeInput,
    PremiseDropCompleteInput,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    appeal: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      localAppeal: this.appeal,
      TYPES: ["new", "edit"],
      premiseId: this.appeal?.premise?.id,
      apartmentId: this.appeal?.apartment?.id,
      dueDate: this.appeal?.due_date,
      lastName: this.appeal?.applicant?.last_name,
      firstName: this.appeal?.applicant?.first_name,
      patronymicName: this.appeal?.applicant?.patronymic_name,
      phone: this.appeal?.applicant?.username,
      description: this.appeal?.description,
    };
  },
  computed: {
    ...mapGetters(["premiseSelectList", "apartmentSelectList"]),
    type() {
      return this.appeal ? this.TYPES[1] : this.TYPES[0];
    },
    header() {
      return this.type == this.TYPES[0]
        ? "Создание заявки"
        : `Заявка № ${this.appeal.number}`;
    },
    applicantNameFields() {
      return [
        {
          label: "Фамилия",
          get model() {
            return this.lastName;
          },
          set model(value) {
            this.lastName = value;
          },
        },
        {
          label: "Имя",
          get model() {
            return this.firstName;
          },
          set model(value) {
            this.firstName = value;
          },
        },
        {
          label: "Отчество",
          get model() {
            return this.patronymicName;
          },
          set model(value) {
            this.patronymicName = value;
          },
        },
      ];
    },
    buttonLabel() {
      return this.type === this.TYPES[0] ? "Создать" : "Сохранить";
    },
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    submitAppeal() {},
  },
};
</script>

<style lang="sass" scoped>
.appeal-modal
  z-index: $z-index-modal

  &__form
    display: flex
    gap: 1rem
    flex-direction: column

  &__row
    display: flex
    gap: 1rem
    justify-content: space-between
    align-items: end

  &__button
    margin-left: auto
</style>
