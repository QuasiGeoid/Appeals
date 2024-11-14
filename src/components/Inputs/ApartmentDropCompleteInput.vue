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
    value(newVal) {
      this.apartmentId = newVal;
    },
    premiseId(newVal) {
      this.localPremiseId = newVal;
      this.fetchApartments();
    },
  },
  methods: {
    fetchApartments: debounce(async function () {
      if (!this.localPremiseId) return;

      const params = {
        premise_id: this.localPremiseId,
        search: this.searchApartment,
      };
      this.loadingApartments = true;
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
