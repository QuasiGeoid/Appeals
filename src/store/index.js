import Vue from "vue";
import Vuex from "vuex";
import { mapToSelectList } from "@/utils/utils";
import {
  fetchAppeals as apiFetchAppeals,
  login as apiLogin,
  fetchPremises as apiFetchPremises,
  fetchApartments as apiFetchApartments,
  createAppeal as apiCreateAppeal,
  updateAppeal as apiUpdateAppeal,
} from "@/api";

Vue.use(Vuex);

const defaultState = {
  employeeId: null,
  token: null,
  appeals: null,
  premises: null,
  apartments: null,
  loginError: null,
  appealError: null,
};

export default new Vuex.Store({
  state: { ...defaultState },
  getters: {
    isAuthenticated: (state) => !!state.token,
    loginError: (state) => state.loginError,
    appeals: (state) => state.appeals,
    premises: (state) => state.premises,
    premiseSelectList: (state) => {
      return mapToSelectList(state.premises?.results, "id", "full_address");
    },
    apartmentSelectList: (state) => {
      return mapToSelectList(state.apartments?.results, "id", "label");
    },
    appealError: (state) => {
      return state.appealError?.response?.data?.detail;
    },
  },
  mutations: {
    setState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
    resetState(state) {
      Object.keys(defaultState).forEach((key) => {
        state[key] = defaultState[key];
      });
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      commit("resetState");
      try {
        const response = await apiLogin(username, password);
        commit("setState", {
          employeeId: response.employee_id,
          token: response.key,
        });
      } catch {
        commit("setState", { loginError: "Неправильные данные" });
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
      commit("setState", { appeals: response });
    },

    async fetchPremises({ commit }, { search = "" }) {
      const response = await apiFetchPremises({ search });
      commit("setState", { premises: response });
    },

    async fetchApartments({ commit }, { search = "", premise_id = "" }) {
      const response = await apiFetchApartments({ search, premise_id });
      commit("setState", { apartments: response });
    },

    async createAppeal({ commit }, appealData) {
      commit("setState", { appealError: null });
      try {
        await apiCreateAppeal({ ...appealData, status_id: 1 });
      } catch (e) {
        commit("setState", { appealError: e });
      }
    },
    async updateAppeal({ commit }, { appealId, appealData }) {
      commit("setState", { appealError: null });
      try {
        await apiUpdateAppeal(appealId, appealData);
      } catch (e) {
        commit("setState", { appealError: e });
      }
    },
  },
});
