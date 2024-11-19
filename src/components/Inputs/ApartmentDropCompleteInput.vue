<template>
  <DropCompleteInput
    v-model="apartmentId"
    :options="apartmentSelectList"
    placeholder="Квартира"
    :loading="loadingApartments"
    @search="handleSearchApartmentUpdate"
    @input="selectApartment"
  />
</template>

<script>
import { mapGetters } from "vuex";
import debounce from "lodash.debounce";
import { DEBOUNCE_DELAY } from "@/utils/constants";
import { DropCompleteInput } from "@/components/Inputs";

export default {
  name: "ApartmentDropCompleteInput",
  components: { DropCompleteInput },
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    premiseId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      searchApartment: "",
      apartmentId: this.value,
      localPremiseId: this.premiseId,
      loadingApartments: false,
    };
  },
  computed: {
    ...mapGetters(["apartmentSelectList"]),
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        this.apartmentId = newVal;
      },
    },
    premiseId: {
      immediate: true,
      handler(newVal) {
        this.localPremiseId = newVal;
        this.fetchApartments();
      },
    },
  },
  methods: {
    fetchApartments: debounce(async function () {
      if (!this.localPremiseId) {
        return;
      }
      this.loadingApartments = true;

      const params = {
        premise_id: this.localPremiseId,
        search: this.searchApartment,
      };
      await this.$store.dispatch("fetchApartments", params);
      this.loadingApartments = false;
    }, DEBOUNCE_DELAY),

    handleSearchApartmentUpdate(searchTerm) {
      this.searchApartment = searchTerm;
      this.fetchApartments();
    },

    selectApartment(apartmentId) {
      this.$emit("input", apartmentId);
    },
  },
  mounted() {
    this.fetchApartments(this.localPremiseId);
  },
};
</script>
