<template>
  <div>
    <v-row class="card-action main-card-title">
      <v-col cols="12" md="8" sm="8" class="page-title">
        Cadastro de Estudante
      </v-col>
      <v-col cols="12" md="4" sm="4" class="page-action">
        <router-link to="/students" class="v-btn v-size--default">
          <v-icon class="hidden-md-and-up">mdi-arrow-left</v-icon>
          <span class="hidden-md-and-down">Voltar</span>
        </router-link>
        <v-btn color="primary">
          <v-icon class="hidden-md-and-up">mdi-content-save</v-icon>
          <span class="hidden-md-and-down">Salvar</span>
        </v-btn>
      </v-col>
    </v-row>

    <v-form>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
            placeholder="Nome"
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            placeholder="E-mail"
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="cpf"
            @input="$v.cpf.$touch()"
            @blur="$v.cpf.$touch()"
            placeholder="CPF"
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="academy_registry"
            @input="$v.academy_registry.$touch()"
            @blur="$v.academy_registry.$touch()"
            placeholder="Registro Acadêmico"
            required
          />
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  name: "StudentAdd",
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(80) },
    email: { required, email },
  },
  data: () => {
    return {
      loading: false,
      name: "",
      email: "",
      cpf: "",
      academy_registry: "",
    };
  },
  mounted: () => {
    console.log(process.env.VUE_APP_BACKEND_URL);
  },
  methods: {
    submit() {
      console.log(process.env.VUE_APP_BACKEND_URL);
      const data = {};
      this.loading = true;
      axios
        .post(`${process.env.VUE_APP_BACKEND_URL}/student`, data)
        .then((res) => {
          this.loading = false;
          console.log(res);
        })
        .catch((err) => {
            this.loading = false;
            console.error(err);
        });
      this.$v.touch();
      console.log(this.name);
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) {
        return errors;
      }
      if (!this.$v.name.maxLength) {
        errors.push("O tamanho máximo é de 80 caracteres.");
      }
      if (!this.$v.name.required) {
        errors.push("O campo Nome é obrigatório.");
      }
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) {
        return errors;
      }
      if (!this.$v.email.maxLength) {
        errors.push("O e-mail informado não é válido.");
      }
      if (!this.$v.email.required) {
        errors.push("O campo E-mail é obrigatório.");
      }
      return errors;
    },
  },
};
</script>

<style>
</style>