<template>
  <div>
    <v-form @submit="submit">
      <v-row class="card-action main-card-title">
        <v-col cols="12" md="8" sm="8" class="page-title">
          Edição de Estudante
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
            v-mask="'###.###.###-##'"
            label="CPF"
            readonly
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.academic_registry"
            label="Registro Acadêmico"
            readonly
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
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  name: "StudentAdd",
  mixins: [validationMixin],
  validations: {
    form: {
      name: { required, maxLength: maxLength(80) },
      email: { required, email },
    },
  },
  data: () => {
    return {
      loading: false,
      form: {
        id: 0,
        name: "",
        email: "",
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
        id: this.form.id,
        name: this.form.name,
        email: this.form.email,
      };
      this.loading = true;

      api.patch("students", data).then(() => {
        this.loading = false;

        this.$fire({
          title: "Sucesso!",
          text: "Cadastro atualizado com sucesso!",
          type: "success",
        });
      });
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.form.name.$dirty) {
        return errors;
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
      if (!this.$v.form.email.required) {
        errors.push("O campo E-mail é obrigatório.");
      }
      if (!this.$v.form.email.email) {
        errors.push("O e-mail informado não é válido.");
      }
      return errors;
    },
  },
  mounted() {
    api
      .get(`students/${this.$route.params.id}`)
      .then((res) => {
        console.log(res);
        this.form.id = res.data.id;
        this.form.name = res.data.name;
        this.form.email = res.data.email;
        this.form.cpf = res.data.cpf;
        this.form.academic_registry = res.data.academic_registry;
      })
      .catch((err) => {
        if (err.response.status === 302) {
          this.$router.push("/students");
          return;
        }
      });
  },
};
</script>