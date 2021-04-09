<template>
  <div>
    <v-row class="card-action main-card-title">
      <v-col cols="12" md="8" sm="8" class="page-title">
        Listagem de Estudantes
      </v-col>
      <v-col cols="12" md="4" sm="4" class="page-action">
        <v-btn
          color="primary"
          :loading="loading"
          :disabled="loading"
          @click="addStudent()"
        >
          <v-icon class="hidden-md-and-up">mdi-account-plus</v-icon>
          <span class="hidden-md-and-down">Novo Estudante</span>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-expansion-panels v-model="filterPanel">
          <v-expansion-panel aria-expanded="true">
            <v-expansion-panel-header>
              <!-- <v-icon>mdi-filter</v-icon> -->
              Pesquisa
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Nome"
                    append-icon="mdi-close"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="E-mail"
                    append-icon="mdi-close"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field
                    label="CPF"
                    append-icon="mdi-close"
                  ></v-text-field>
                </v-col>
                <v-col
                  class="justify-space-between mt-3"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-btn
                    color="primary"
                    class="float-right"
                    :loading="loading"
                    :disabled="loading"
                    @click="doSearch()"
                  >
                    <v-icon class="hidden-md-and-up">mdi-magnify</v-icon>
                    <span class="hidden-md-and-down">Pesquisar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-data-table
          :loading="loading"
          :headers="studentListHeader"
          :items="students"
          :items-per-page="10"
          :options.sync="tableOptions"
          :server-items-length="totalStudents"
          :footer-props="{
            showFirstLastPage: true,
            'items-per-page-text': 'Registros por página',
            'items-per-page-options': [10, 20, 30],
          }"
          :page="page"
          :pageCount="totalNumOfPages"
          class="elevation-1"
          no-data-text="Não existem dados."
          no-results-text="Não foram encontrados resultados."
          loading-text="Carregando resultados..."
        ></v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "StudentList",
  data: () => ({
    loading: false,
    filterPanel: [0],
    page: 1,
    totalNumOfPages: 0,
    totalStudents: 0,
    tableOptions: {},
    studentListHeader: [
      {
        text: "Nome",
        align: "start",
        value: "name",
      },
      { text: "E-mail", value: "email" },
      { text: "CPF", value: "cpf" },
      { text: "Registro Acadêmico", value: "academy_registry" },
    ],
    students: [],
  }),
  watch: {
    tableOptions: {
      handler() {
        this.doSearch();
      },
    },
    deep: true,
  },
  methods: {
    addStudent() {
      this.$router.push("students/add");
    },
    doSearch() {
      console.log("search");
      console.log(this.tableOptions);
      const { page, itemsPerPage, sortBy, sortDesc } = this.tableOptions;
      console.log(itemsPerPage);
      console.log(page);
      console.log(sortBy[0]);
      console.log(sortDesc[0]);
      //this.loading = true;
      // setTimeout(function () {
      //   this.loading = false;
      // }, 3000);
    },
  },
  mounted() {
    this.doSearch();
  },
};
</script>
