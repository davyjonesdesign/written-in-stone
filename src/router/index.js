import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import GoogleMap from '../views/GoogleMap.vue';
import MapView from '../views/MapView.vue';
import SidePanelView from '../views/SidePanelView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/google',
    name: 'google',
    component: GoogleMap,
  },
  {
    path: '/map',
    name: 'map',
    component: MapView,
  },
  {
    path: '/sidepanel',
    name: 'sidepanel',
    component: SidePanelView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash };
    }
    return { x: 0, y: 0 };
  },
});

export default router;
