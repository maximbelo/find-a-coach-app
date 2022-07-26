<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>{{ description }}</h3>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>

    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button v-if="buttonIsVisible" link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>

    <section>
      <base-card>
        <base-badge v-for="area in areas" :key="area" :type="area" :title="area">
          <p>{{ description }}</p>
        </base-badge>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + " " + this.selectedCoach.lastName;
    },
    contactLink() {
      if (this.$route.params) {
        return this.$route.path + "/contact";
      }
      return this.$route.path + "/" + this.id + "/contact";
    },
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
    buttonIsVisible() {
      if (this.$route.path.includes("contact")) {
        return false;
      }
      return true;
    },
  },
  created() {
    console.log(this.$route);
    this.selectedCoach = this.$store.getters["coaches/coaches"].find((coach) => {
      return coach.id === this.id;
    });
  },
};
</script>
