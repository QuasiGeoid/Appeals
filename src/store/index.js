import Vue from "vue";
import Vuex from "vuex";
import {
  fetchAppeals as apiFetchAppeals,
  login as apiLogin,
  fetchPremises as apiFetchPremises,
} from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    employeeId: null,
    token: null,
    appeals: null,
    premises: null,
    loginError: null,
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    loginError: (state) => state.loginError,
    appeals: (state) => state.appeals,
    premises: (state) => state.premises,
  },
  mutations: {
    setEmployeeId(state, id) {
      state.employeeId = id;
    },
    setToken(state, token) {
      state.token = token;
    },
    setAppeals(state, appeals) {
      state.appeals = appeals;
    },
    setPremises(state, premises) {
      state.premises = premises;
    },
    setLoginError(state, loginError) {
      state.loginError = loginError;
    },
    resetState(state) {
      Object.keys(state).forEach((key) => {
        state[key] = null;
      });
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        commit("resetState");
        const response = await apiLogin(username, password);
        commit("setEmployeeId", response.employee_id);
        commit("setToken", response.key);
      } catch {
        commit("setLoginError", "Неправильные данные");
      }
    },
    async fetchAppeals(
      { commit },
      { search = "", premise_id = null, page_size = 10, page = 1 }
    ) {
      const params = {
        search,
        premise_id,
        page_size,
        page,
      };
      const response = await apiFetchAppeals(params);
      commit("setAppeals", response);
    },

    async fetchPremises({ commit }, { search = "" }) {
      const params = { search };
      const response = await apiFetchPremises(params);
      commit("setPremises", response);
    },
  },
});
