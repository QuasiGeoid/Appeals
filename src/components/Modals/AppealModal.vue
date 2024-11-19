<template>
  <BaseModal @close="handleClose" class="appeal-modal">
    <h2>{{ header }}</h2>
    <LoadingSpinner v-if="sendingAppeal" class="appeal-modal__spinner" />
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
      sendingAppeal: false,
      localAppeal: this.appeal,
      TYPES: ["new", "edit"],
      premiseId: null,
      apartmentId: null,
      dueDate: null,
      lastName: "",
      firstName: "",
      patronymicName: "",
      phone: "",
      description: "",
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
    resetFormData() {
      this.premiseId = null;
      this.apartmentId = null;
      this.dueDate = null;
      this.lastName = "";
      this.firstName = "";
      this.patronymicName = "";
      this.phone = "";
      this.description = "";
      this.premisesLoading = true;
      this.apartmentsLoading = true;
      this.sendingAppeal = false;
    },
    updateLocalData(appeal) {
      if (!appeal) {
        this.resetFormData();
        return;
      }
      this.premiseId = appeal?.premise?.id || null;
      this.apartmentId = appeal?.apartment?.id || null;
      this.dueDate = new Date(appeal?.due_date) || null;
      this.lastName = appeal?.applicant?.last_name || "";
      this.firstName = appeal?.applicant?.first_name || "";
      this.patronymicName = appeal?.applicant?.patronymic_name || "";
      this.phone = appeal?.applicant?.username || "";
      this.description = appeal?.description || "";
    },
    handleClose() {
      this.$emit("close");
    },
    async submitAppeal() {
      this.sendingAppeal = true;
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
      if (this.type === this.TYPES[0]) {
        await this.$store.dispatch("createAppeal", reqBody);
      } else {
        await this.$store.dispatch("updateAppeal", {
          appealId: this.appeal.id,
          appealData: reqBody,
        });
      }
      this.sendingAppeal = false;
    },
  },
  watch: {
    appeal: {
      immediate: true,
      handler(newAppeal) {
        this.updateLocalData(newAppeal);
      },
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
