import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import VueSimpleAlert from "vue-simple-alert";
import { VueMaskDirective } from "v-mask";

//Pages
import NotFound from "./pages/exceptions/NotFound";
import Landing from "./pages/Landing";
import StudentList from "./pages/students/StudentList";
import StudentAdd from "./pages/students/StudentAdd";
import StudentEdit from "./pages/students/StudentEdit";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueSimpleAlert);
Vue.directive("mask", VueMaskDirective);

const routes = [
  {
    path: "*",
    component: NotFound,
    meta: { title: "Página não encontrada - EdTech" },
  },
  {
    path: "/",
    component: Landing,
    meta: { title: "Página inicial - EdTech" },
  },
  {
    path: "/students",
    component: StudentList,
    meta: { title: "Estudantes - EdTech" },
  },
  {
    path: "/students/add",
    component: StudentAdd,
    meta: { title: "Novo estudante - EdTech" },
  },
  {
    path: "/students/edit/:id",
    props: true,
    component: StudentEdit,
    meta: { title: "Editar estudante - EdTech" },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
