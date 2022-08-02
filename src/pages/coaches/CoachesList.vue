<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilter"></coach-filter>
    </section>
    <base-card>
      <section>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
          <base-button link to="/auth" v-if="!isLoggedIn">Log in</base-button>
          <base-button v-if="isLoggedIn && !isCoach && !isLoading" link to="/register"
            >Register as Coach</base-button
          >
        </div>

        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>

        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>

        <h3 v-else>No Coaches Found!</h3>
      </section>
    </base-card>
  </div>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";
import BaseSpinner from "../../components/ui/BaseSpinner.vue";
import BaseDialog from "../../components/ui/BaseDialog.vue";

export default {
  components: {
    CoachItem,
    CoachFilter,
    BaseSpinner,
    BaseDialog,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }

        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }

        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }

        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    setFilter(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches", { forceRefresh: refresh });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
