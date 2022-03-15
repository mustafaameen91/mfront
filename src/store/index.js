import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      apiUrl: "http://localhost:4100/api",
      selectedYear: 0,
      user: {
         userName: "ali",
         sectionId: 2,
      },
      subjects: [],
      counts: null,
   },
   mutations: {},
   actions: {},
   modules: {},
});
