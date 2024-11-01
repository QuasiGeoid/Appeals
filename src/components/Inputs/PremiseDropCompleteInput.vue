<template>
  <DropCompleteInput
    v-model="selectedPremiseId"
    :options="premiseSelectList"
    placeholder="Дом"
    :loading="loadingPremises"
    @search="handleSearchPremiseUpdate"
    @input="selectPremise"
  />
</template>

<script>
import { mapGetters } from "vuex";
import debounce from "lodash.debounce";
import { DEBOUNCE_DELAY } from "@/utils/constants";
import { DropCompleteInput } from "@/components/Inputs";

export default {
  name: "PremiseDropCompleteInput",
  components: { DropCompleteInput },
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      selectedPremiseId: this.value,
      loadingPremises: false,
    };
  },
  computed: {
    ...mapGetters(["premiseSelectList"]),
  },
  watch: {
    value(newVal) {
      this.selectedPremiseId = newVal;
    },
  },
  methods: {
    fetchPremises: debounce(async function () {
      const params = {
        search: this.searchPremise,
      };
      this.loadingPremises = true;
      await this.$store.dispatch("fetchPremises", params);
      this.loadingPremises = false;
    }, DEBOUNCE_DELAY),
    handleSearchPremiseUpdate(searchTerm) {
      this.searchPremise = searchTerm;
      this.fetchPremises();
    },
    selectPremise(premiseId) {
      this.$emit("input", premiseId);
    },
  },
  mounted() {
    this.fetchPremises();
  },
};
</script>
