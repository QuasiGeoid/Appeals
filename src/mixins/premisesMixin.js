export default {
  data() {
    return {
      loadingPremises: false,
      searchPremise: "",
    };
  },
  methods: {
    async fetchPremises() {
      const params = {
        search: this.searchPremise,
      };
      this.loadingPremises = true;
      await this.$store.dispatch("fetchPremises", params);
      this.loadingPremises = false;
    },
  },
};
