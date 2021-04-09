
<template>
  <v-app>
    <v-app-bar flat fixed app>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon
          class="hidden-lg-and-up"
          @click.stop="drawer = !drawer"
        />
      </div>
    </v-app-bar>

    <v-navigation-drawer
      app
      v-model="drawer"
      :disable-resize-watcher="false"
      :hide-overlay="true"
    >
      <v-app-bar flat color="#AEDDFF">
        <v-img
          alt="Dev Logo"
          class="shrink mr-2"
          contain
          src="@/assets/dev.png"
          transition="scale-transition"
          width="50"
        />

        <v-toolbar-title>Grupo A</v-toolbar-title>
      </v-app-bar>

      <v-list-item link to="/">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link to="/students">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Estudantes</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="pa-4 pa-sm-6 pa-md-8">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => {
    return {
      drawer: null,
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || "EdTech";
      },
    },
  },
};
</script>

<style>
@import "./assets/styles/themes.css";
</style>