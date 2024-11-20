<template>
  <BaseModal @close="handleClose" class="appeal-modal">
    <h2>{{ header }}</h2>
    <LoadingSpinner v-if="sendingAppeal" class="appeal-modal__spinner" />
    <form v-else @submit.prevent="submitAppeal" class="appeal-modal__form">
      <div class="appeal-modal__row">
        <PremiseDropCompleteInput
          class="appeal-modal__input"
          v-model="formData.premiseId"
        />
        <ApartmentDropCompleteInput
          class="appeal-modal__input"
          v-model="formData.apartmentId"
          :premiseId="formData.premiseId"
        />
        <DateTimeInput v-model="formData.dueDate" />
      </div>
      <div class="appeal-modal__row">
        <BaseInput v-model="formData.lastName" placeholder="Фамилия" />
        <BaseInput v-model="formData.firstName" placeholder="Имя" />
        <BaseInput v-model="formData.patronymicName" placeholder="Отчество" />
        <PhoneInput v-model="formData.phone" />
      </div>
      <BaseTextArea
        placeholder="Описание заявки"
        v-model="formData.description"
      />
      <BaseButton
        type="submit"
        :disabled="isButtonDisabled"
        class="appeal-modal__button"
        >{{ buttonLabel }}</BaseButton
      >
    </form>
    <NotificationPopup
      v-if="notification.show"
      :type="notification.type"
      :message="notification.message"
      @close="notification.show = false"
    />
  </BaseModal>
</template>

<script>
import {
  ApartmentDropCompleteInput,
  BaseInput,
  BaseTextArea,
  DateTimeInput,
  PhoneInput,
  PremiseDropCompleteInput,
} from "@/components/Inputs";
import { BaseButton } from "@/components/Buttons";
import { BaseModal } from "@/components/Modals";
import { LoadingSpinner } from "@/components/Loading";
import { NotificationPopup } from "@/components/common";
import { formatDateToISO } from "@/utils/utils";
import { mapGetters } from "vuex";

export default {
  name: "AppealModal",
  components: {
    ApartmentDropCompleteInput,
    BaseModal,
    BaseInput,
    BaseButton,
    BaseTextArea,
    DateTimeInput,
    PremiseDropCompleteInput,
    LoadingSpinner,
    PhoneInput,
    NotificationPopup,
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
      formData: this.getInitialFormData(),
      notification: {
        show: false,
        type: "success",
        message: "",
      },
    };
  },
  computed: {
    ...mapGetters(["appealError"]),
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
    getInitialFormData() {
      return {
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
    resetFormData() {
      this.formData = this.getInitialFormData();
    },
    updateLocalData(appeal) {
      if (!appeal) {
        this.resetFormData();
        return;
      }
      this.formData = {
        premiseId: appeal?.premise?.id || null,
        apartmentId: appeal?.apartment?.id || null,
        dueDate: new Date(appeal?.due_date) || null,
        lastName: appeal?.applicant?.last_name || "",
        firstName: appeal?.applicant?.first_name || "",
        patronymicName: appeal?.applicant?.patronymic_name || "",
        phone: appeal?.applicant?.username || "",
        description: appeal?.description || "",
      };
    },
    handleClose() {
      this.$emit("close");
    },
    async submitAppeal() {
      this.sendingAppeal = true;
      const reqBody = {
        premise_id: this.formData.premiseId,
        apartment_id: this.formData.apartmentId,
        applicant: {
          last_name: this.formData.lastName,
          first_name: this.formData.firstName,
          patronymic_name: this.formData.patronymicName,
          username: this.formData.phone,
        },
        description: this.formData.description,
        due_date: formatDateToISO(this.formData.dueDate),
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

      if (this.appealError) {
        this.notification.show = true;
        this.notification.type = "fail";
        this.notification.message = this.appealError;
      } else {
        this.handleClose();
      }
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
