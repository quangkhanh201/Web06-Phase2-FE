import { createRouter, createWebHistory } from 'vue-router'
import OverView from '../components/page/OverView/OverView.vue';
import MenuFood from '../components/page/MenuFood/MenuFood.vue';

const routes = [
  {
    path: "/overview",
    name:  "",
    component: OverView
  },
  {
    path: "/menu-food",
    name: "",
    component: MenuFood
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router