import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import NotFound from "./components/exceptions/NotFound";
import HelloWorld from "./components/HelloWorld";
import StudentList from "./components/students/StudentList";
import StudentAdd from "./components/students/StudentAdd";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: NotFound,
    meta: { title: "Página não encontrada - EdTech" },
  },
  {
    path: "/",
    component: HelloWorld,
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
