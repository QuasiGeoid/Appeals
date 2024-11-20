<template>
  <div class="appeals-list-page">
    <div v-if="!isAuthenticated">
      <router-link to="/login">Переход на страницу логина...</router-link>
    </div>
    <div v-else>
      <h1 class="appeals-list-page__header">Список заявок</h1>
      <div class="appeals-list-page__content">
        <div class="appeals-list-page__button-wrapper">
          <BaseButton
            class="appeals-list-page__button"
            size="s"
            @click="openCreateModal"
            >СОЗДАТЬ</BaseButton
          >
        </div>
        <div class="appeals-list-page__filters-container">
          <FilterInput
            class="appeals-list-page__filter"
            v-model="searchAppeal"
            @input="handleAppealFilterUpdate"
            type="text"
            placeholder="Поиск (№ заявки, название)"
          />
          <PremiseDropCompleteInput
            class="appeals-list-page__filter"
            v-model="premiseId"
            @input="handleAppealFilterUpdate"
          />
        </div>
        <LoadingSpinner v-if="loadingAppeals" />
        <div v-else>
          <AppealsTable
            :appeals="appeals?.results"
            class="appeals-list-page__table"
            @cell-click="openEditModal"
          />
          <div class="appeals-list-page__pagination-container">
            <span
              class="appeals-list-page__pagination-info"
              v-html="getRangeText()"
            ></span>
            <BaseSelect
              class="appeals-list-page__pagination-select"
              v-model="pageSize"
              :options="pageSizeOptions"
              size="s"
              @change="handleAppealFilterUpdate"
            />
            <BasePagination
              class="appeals-list-page__pagination-pagination"
              :currentPage="page"
              :totalPages="appeals.pages"
              @page-change="handlePageChange"
            />
          </div>
        </div>
      </div>
    </div>
    <AppealModal
      class="appeals-list-page__appeal-modal"
      v-if="showAppealModal"
      :appeal="selectedAppeal"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { BaseButton } from "@/components/Buttons";
import { BaseSelect } from "@/components/Selects";
import { PremiseDropCompleteInput, FilterInput } from "@/components/Inputs";
import { AppealModal } from "@/components/Modals";
import { AppealsTable } from "@/components/Tables";
import { BasePagination } from "@/components/common";
import { LoadingSpinner } from "@/components/Loading";

export default {
  name: "AppealsView",
  components: {
    AppealModal,
    AppealsTable,
    BaseButton,
    BasePagination,
    BaseSelect,
    PremiseDropCompleteInput,
    FilterInput,
    LoadingSpinner,
  },
  data() {
    return {
      loadingAppeals: true,
      searchAppeal: "",
      premiseId: "",
      page: 1,
      pageSize: 10,
      pageSizeOptions: [
        { value: 10, label: 10 },
        { value: 25, label: 25 },
        { value: 50, label: 50 },
      ],
      showAppealModal: false,
      selectedAppeal: null,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "appeals"]),
  },
  methods: {
    resetPage() {
      this.page = 1;
    },

    async fetchAppeals() {
      this.loadingAppeals = true;
      const params = {
        search: this.searchAppeal,
        premise_id: this.premiseId,
        page_size: this.pageSize,
        page: this.page,
      };
      await this.$store.dispatch("fetchAppeals", params);
      this.loadingAppeals = false;
    },

    getRangeText() {
      const start = (this.page - 1) * this.pageSize + 1;
      const end =
        this.appeals?.count > this.page * this.pageSize
          ? this.page * this.pageSize
          : this.appeals?.count;
      return `<strong>${start} - ${end}</strong> <span>из</span> <strong>${this.appeals?.count}</strong> записей`;
    },

    handlePageChange(page) {
      this.page = page;
      this.fetchAppeals();
    },

    handleAppealFilterUpdate() {
      this.resetPage();
      this.fetchAppeals();
    },

    openCreateModal() {
      this.selectedAppeal = null;
      this.showAppealModal = true;
    },

    openEditModal(id) {
      this.selectedAppeal = this.appeals.results.find((appeal) => {
        return appeal.id === id;
      });
      this.showAppealModal = true;
    },

    closeModal() {
      this.showAppealModal = false;
      this.fetchAppeals();
    },
  },
  created() {
    this.fetchAppeals();
  },
};
</script>

<style lang="sass" scoped>
.appeals-list-page
  background-color: #eee
  padding: 0.625rem 1rem
  height: 100%

  &__content
    background-color: $color-background-primary
    padding: 0.625rem 1.25rem
    border-radius: 8px

  &__header
    font: $font-page-header
    color: $color-page-header

  &__button-wrapper
    display: flex
    margin-bottom: 2rem

  &__button
    margin-left: auto
    font-variant: small-caps

  &__filters-container
    +flex-end
    gap: 0.625rem
    justify-content: space-between
    margin-bottom: 1.25rem

  &__filter
    flex: 1

  &__pagination
    &-container
      +flex-center
      margin-top: 2rem

    &-info
      font-family: $font-family-secondary
      margin-right: 1rem

    &-select
      width: 89px

    &-pagination
      margin-left: auto
</style>
