<template>
  <div>
    <v-row class="card-action main-card-title">
      <v-col cols="12" md="8" sm="8" class="page-title">
        Listagem de Estudantes
      </v-col>
      <v-col cols="12" md="4" sm="4" class="page-action">
        <v-btn color="primary" @click="addStudent()">
          <v-icon class="hidden-md-and-up">mdi-account-plus</v-icon>
          <span class="hidden-md-and-down">Novo Estudante</span>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-form @submit="submit">
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
                      v-model="name"
                      label="Nome"
                      append-icon="mdi-close"
                      @click:append="() => (this.name = '')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="email"
                      label="E-mail"
                      append-icon="mdi-close"
                      @click:append="() => (this.email = '')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      v-model="cpf"
                      label="CPF"
                      v-mask="'###.###.###-##'"
                      append-icon="mdi-close"
                      @click:append="() => (this.cpf = '')"
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
                      type="submit"
                    >
                      <v-icon class="hidden-md-and-up">mdi-magnify</v-icon>
                      <span class="hidden-md-and-down">Pesquisar</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-form>
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
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small @click="() => editStudent(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteStudent(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import api from "../../services/api";

export default {
  name: "StudentList",
  data: () => ({
    loading: false,
    name: "",
    email: "",
    cpf: "",
    filterPanel: [0],
    page: 1,
    totalNumOfPages: 1,
    totalStudents: 0,
    tableOptions: {
      sortBy: ["id"],
    },
    studentListHeader: [
      { text: "#", value: "id" },
      {
        text: "Nome",
        align: "start",
        value: "name",
      },
      { text: "E-mail", value: "email" },
      { text: "CPF", value: "cpf", sortable: false },
      { text: "Registro Acadêmico", value: "academic_registry" },
      { text: "Ações", value: "actions", sortable: false },
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
    editStudent(student) {
      this.$router.push(`students/edit/${student.id}`);
    },
    deleteStudent(student) {
      this.$fire({
        title: "Confirma exclusão do registro?",
        text: "Esta ação é irreversível.",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
      }).then((result) => {
        if (result.value) {
          api
            .delete(`students/${student.id}`)
            .then(() => {
              this.doSearch();
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
    submit(e) {
      e.preventDefault();

      this.doSearch();
    },
    doSearch() {
      this.loading = true;

      const { page, itemsPerPage, sortBy, sortDesc } = this.tableOptions;
      const currentPage = page;
      const qParams = {
        name: this.name,
        email: this.email,
        cpf: this.cpf,
        currentPage,
        itemsPerPage,
        sortBy: sortBy[0],
        sortDesc: sortDesc[0],
      };

      let esc = encodeURIComponent;
      let query = Object.keys(qParams)
        .filter((k) => qParams[k] !== undefined)
        .map((k) => esc(k) + "=" + esc(qParams[k]))
        .join("&");

      api
        .get(`students?${query}`)
        .then((res) => {
          this.students = res.data.students;
          this.totalStudents = res.data.totalStudents;
          this.totalNumOfPages = res.data.totalNumOfPages;

          const availablePages = Math.ceil(
            this.totalStudents / itemsPerPage
          );
          if (currentPage > availablePages) {
            this.tableOptions.page = availablePages;
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
