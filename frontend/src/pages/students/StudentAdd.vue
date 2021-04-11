<template>
  <div>
    <v-form @submit="submit">
      <v-row class="card-action main-card-title">
        <v-col cols="12" md="8" sm="8" class="page-title">
          Cadastro de Estudante
        </v-col>
        <v-col cols="12" md="4" sm="4" class="page-action">
          <router-link to="/students" class="v-btn v-size--default">
            <v-icon class="hidden-md-and-up">mdi-arrow-left</v-icon>
            <span class="hidden-md-and-down">Voltar</span>
          </router-link>
          <v-btn color="primary" type="submit" :loading="loading">
            <v-icon class="hidden-md-and-up">mdi-content-save</v-icon>
            <span class="hidden-md-and-down">Salvar</span>
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.name"
            :error-messages="nameErrors"
            @input="$v.form.name.$touch()"
            @blur="$v.form.name.$touch()"
            label="Nome"
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.email"
            :error-messages="emailErrors"
            @input="$v.form.email.$touch()"
            @blur="$v.form.email.$touch()"
            label="E-mail"
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.cpf"
            :error-messages="cpfErrors"
            @input="$v.form.cpf.$touch()"
            @blur="$v.form.cpf.$touch()"
            v-mask="'###.###.###-##'"
            label="CPF"
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.academic_registry"
            :error-messages="academicRegistryErrors"
            @input="$v.form.academic_registry.$touch()"
            @blur="$v.form.academic_registry.$touch()"
            label="Registro Acadêmico"
            required
          />
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import api from "../../services/api";
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";
import { isValidCpf } from "../../validators/validators";

export default {
  name: "StudentAdd",
  mixins: [validationMixin],
  validations: {
    form: {
      name: { required, minLength: minLength(4), maxLength: maxLength(80) },
      email: { required, email, maxLength: maxLength(120) },
      academic_registry: { required, maxLength: maxLength(80) },
      cpf: { required, isValidCpf },
    },
  },
  data: () => {
    return {
      loading: false,
      form: {
        name: "",
        email: "",
        cpf: "",
        academic_registry: "",
      },
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();

      this.$v.form.$touch();
      if (this.$v.form.$pending || this.$v.form.$error) {
        return;
      }

      const data = {
        name: this.form.name,
        email: this.form.email,
        cpf: this.form.cpf,
        academic_registry: this.form.academic_registry,
      };
      this.loading = true;

      api
        .post("students", data)
        .then((res) => {
          this.loading = false;
          this.$fire({
            title: "Sucesso!",
            text: "Estudante cadastrado com sucesso!",
            type: "success",
          }).then(() => {
            this.$router.push(`/students/edit/${res.data.id}`);
          });
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.form.name.$dirty) {
        return errors;
      }
      if (!this.$v.form.name.minLength) {
        errors.push("Informe ao menos 4 caracteres.");
      }
      if (!this.$v.form.name.maxLength) {
        errors.push("O tamanho máximo é de 80 caracteres.");
      }
      if (!this.$v.form.name.required) {
        errors.push("O campo Nome é obrigatório.");
      }
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) {
        return errors;
      }
      if (!this.$v.form.email.maxLength) {
        errors.push("O tamanho máximo é de 120 caracteres.");
      }
      if (!this.$v.form.email.required) {
        errors.push("O campo E-mail é obrigatório.");
      }
      if (!this.$v.form.email.email) {
        errors.push("O e-mail informado não é válido.");
      }
      return errors;
    },
    cpfErrors() {
      const errors = [];
      if (!this.$v.form.cpf.$dirty) {
        return errors;
      }
      if (!this.$v.form.cpf.required) {
        errors.push("O campo CPF é obrigatório.");
      }
      if (!this.$v.form.cpf.isValidCpf) {
        errors.push("O CPF informado não é válido.");
      }
      return errors;
    },
    academicRegistryErrors() {
      const errors = [];
      if (!this.$v.form.academic_registry.$dirty) {
        return errors;
      }
      if (!this.$v.form.academic_registry.maxLength) {
        errors.push("O tamanho máximo é de 80 caracteres.");
      }
      if (!this.$v.form.academic_registry.required) {
        errors.push("O campo Registro Acadêmico é obrigatório.");
      }
      return errors;
    },
  },
};
</script>