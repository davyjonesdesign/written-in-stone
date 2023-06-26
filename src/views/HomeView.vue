<template>
  <div class="home">
    <router-link to="/map">Map View</router-link>
    <router-link to="/sidepanel">SidePanel View</router-link>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css';

export default {
  name: 'HomeView',
};
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
}
</style>
