import { createStore } from "vuex";
import coachesModules from "./modules/coaches/index";

const store = createStore({
  modules: {
    coaches: coachesModules,
  },
  state() {
    return {
      userId: "c3",
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
});

export default store;
