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
          <DropCompleteInput
            class="appeals-list-page__filter"
            v-model="selectedPremiseId"
            :options="premiseSelectList"
            placeholder="Дом"
            :loading="loadingPremises"
            @search="handleSearchPremiseUpdate"
            @input="handleAppealFilterUpdate"
          />
          <!-- <BaseSelect
            class="appeals-list-page__filter"
            v-model="selectedPremiseId"
            :options="premiseSelectList"
            placeholder="Дом"
            size="m"
            @change="handleAppealFilterUpdate"
          /> -->
        </div>
        <LoadingSpinner v-if="loading" />
        <div v-else>
          <AppealsTable
            :appeals="appeals?.results"
            class="appeals-list-page__table"
          />
          <div class="appeals-list-page__pagination-container">
            <span class="appeals-list-page__pagination-info"
              ><strong
                >{{ (page - 1) * pageSize + 1 }} -
                {{
                  appeals?.count > page * pageSize
                    ? page * pageSize
                    : appeals?.count
                }}</strong
              >
              из <strong>{{ appeals?.count }}</strong> записей</span
            >
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
    <!-- Modal for creating/editing appeals -->
    <!-- <AppealModal
      v-if="showModal"
      :appealId="selectedAppealId"
      @close="closeModal"
    /> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { BaseButton } from "@/components/Buttons";
import { BaseSelect } from "@/components/Selects";
import { DropCompleteInput, FilterInput } from "@/components/Inputs";
// import AppealModal from "./AppealModal.vue";
import { AppealsTable } from "@/components/Tables";
import { BasePagination } from "@/components/common/";
import { LoadingSpinner } from "@/components/Loading";

export default {
  name: "AppealsView",
  components: {
    AppealsTable,
    BaseButton,
    BasePagination,
    BaseSelect,
    DropCompleteInput,
    FilterInput,
    LoadingSpinner,
    // AppealModal,
  },
  data() {
    return {
      loading: true,
      loadingPremises: false,
      sort: {
        field: "number",
        order: "asc",
      },
      searchAppeal: "",
      searchPremise: "",
      selectedPremiseId: "",
      page: 1,
      pageSize: 10,
      pageSizeOptions: [
        { value: 10, label: 10 },
        { value: 25, label: 25 },
        { value: 50, label: 50 },
      ],
      showModal: false,
      selectedAppealId: null,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "appeals", "premises"]),
    premiseSelectList() {
      return this.premises?.results.map((premise) => {
        return {
          value: premise.id,
          label: premise.full_address,
        };
      });
    },
  },
  methods: {
    resetPage() {
      this.page = 1;
    },

    async fetchAppeals() {
      this.loading = true;
      const params = {
        search: this.searchAppeal,
        premise_id: this.selectedPremiseId,
        page_size: this.pageSize,
        page: this.page,
      };
      await this.$store.dispatch("fetchAppeals", params);
      this.loading = false;
    },

    async fetchPremises() {
      const params = {
        search: this.searchPremise,
      };
      this.loadingPremises = true;
      await this.$store.dispatch("fetchPremises", params);
      this.loadingPremises = false;
    },

    handlePageChange(page) {
      this.page = page;
      this.fetchAppeals();
    },

    handleAppealFilterUpdate() {
      this.resetPage();
      this.fetchAppeals();
    },

    handleSearchPremiseUpdate(searchPremise) {
      this.searchPremise = searchPremise;
      this.fetchPremises();
    },

    openCreateModal() {
      //   this.selectedAppealId = null;
      //   this.showModal = true;
    },
    // openEditModal(id) {
    //   this.selectedAppealId = id;
    //   this.showModal = true;
    // },
    // closeModal() {
    //   this.showModal = false;
    //   this.fetchAppeals();
    // },
  },
  mounted() {
    this.fetchAppeals();
    this.fetchPremises();
  },
};
</script>

<style lang="sass" scoped>
.appeals-list-page
  background-color: #eee
  padding: 10px 15px
  height: 100vh

  &__content
    background-color: $color-background-primary
    padding: 10px 20px

  &__header
    font: $font-page-header
    color: $color-page-header

  &__button-wrapper
    display: flex
    margin-bottom: 32px

  &__button
    margin-left: auto
    font-variant: small-caps

  &__filters-container
    display: flex
    gap: 10px
    justify-content: space-between
    align-items: end
    margin-bottom: 20px

  &__filter
    flex: 1

  &__pagination
    &-container
      display: flex
      margin-top: 32px
      align-items: center

    &-info
      font-family: $font-family-secondary
      margin-right: 16px

    &-select
      width: 89px

    &-pagination
      margin-left: auto
</style>
