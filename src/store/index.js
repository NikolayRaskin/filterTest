import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fields: [],
  },
  mutations: {
    setFields(state, fields) {
      state.fields = fields;
    },
  },
  actions: {
    fetchFields(context) {
      return axios
        .get('/data/fields.json')
        .then((data) => {
          context.commit('setFields', data.data);
        })
        .catch((error) => {
          context.commit('setFields', error);
        });
    },
  },
  getters: {
    fields: (state) => {
      return state.fields;
    },
  },
});
