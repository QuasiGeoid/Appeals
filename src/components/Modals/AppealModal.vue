<template>
  <BaseModal :show="show" @close="handleClose" class="appeal-modal">
    <h2>{{ header }}</h2>
    <LoadingSpinner v-if="creatingAppeal" class="appeal-modal__spinner" />
    <form v-else @submit.prevent="submitAppeal" class="appeal-modal__form">
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
        <BaseInput v-model="lastName" placeholder="Фамилия" />
        <BaseInput v-model="firstName" placeholder="Имя" />
        <BaseInput v-model="patronymicName" placeholder="Отчество" />
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
import { BaseModal } from "@/components/Modals";
import {
  ApartmentDropCompleteInput,
  BaseInput,
  DateTimeInput,
  PremiseDropCompleteInput,
} from "@/components/Inputs";
import { BaseButton } from "@/components/Buttons";
import { formatDateToISO } from "@/utils/utils";
import { LoadingSpinner } from "@/components/Loading";

export default {
  name: "AppealModal",
  components: {
    ApartmentDropCompleteInput,
    BaseModal,
    BaseInput,
    BaseButton,
    DateTimeInput,
    PremiseDropCompleteInput,
    LoadingSpinner,
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
      creatingAppeal: false,
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
    type() {
      return this.appeal ? this.TYPES[1] : this.TYPES[0];
    },
    header() {
      return this.type == this.TYPES[0]
        ? "Создание заявки"
        : `Заявка № ${this.appeal.number}`;
    },
    buttonLabel() {
      return this.type === this.TYPES[0] ? "Создать" : "Сохранить";
    },
    isButtonDisabled() {
      return false;
    },
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    submitAppeal() {
      this.creatingAppeal = true;
      const reqBody = {
        premise_id: this.premiseId,
        apartment_id: this.apartmentId,
        applicant: {
          last_name: this.lastName,
          first_name: this.firstName,
          patronymic_name: this.patronymicName,
          username: this.phone,
        },
        description: this.description,
        due_date: formatDateToISO(this.dueDate),
      };
      console.log(reqBody);
      // await this.$store.dispatch("createAppeal", reqBody);
      setTimeout(() => {
        this.creatingAppeal = false;
      }, 10000);
    },
  },
};
</script>

<style lang="sass" scoped>
.appeal-modal
  z-index: $z-index-modal

  &__form
    display: flex
    gap: 2rem
    flex-direction: column

  &__row
    display: flex
    gap: 1rem
    justify-content: space-between
    align-items: end

  &__button
    margin-left: auto

  &__spinner
    height: 100%
</style>
