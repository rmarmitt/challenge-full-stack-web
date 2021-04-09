<template>
  <v-row class="text-center">
    <v-col cols="12">
      <lottie :options="lottieOptions" :height="400" :width="400" />
    </v-col>

    <v-btn @click="handleGoBackClick"> Voltar </v-btn>
  </v-row>
</template>

<script>
import lottie from "vue-lottie";
import * as notFound from "../../assets/lotties/not-found.json";

export default {
  name: "NotFound",
  components: {
    lottie,
  },
  data: () => ({
    lottieOptions: { animationData: notFound.default, loop: false },
  }),
  methods: {
    handleGoBackClick() {
      this.$router.push("/");
    },
  },
};
</script>
