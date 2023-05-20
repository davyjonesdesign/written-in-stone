<template>
  <div class="home">
    <l-map :center="[31.7683, 35.2137]" v-model="zoom" v-model:zoom="zoom"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-marker :lat-lng="[31.7683, 35.2137]">
        <l-icon icon-url="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Google_Maps_pin.svg/1200px-Google_Maps_pin.svg.png" :icon-size="[24, 42]" />
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import {
  LMap,
  LIcon,
  LMarker,
  LTileLayer,
} from '@vue-leaflet/vue-leaflet';
import { ref } from 'vue';

export default {
  name: 'HomeView',
  components: {
    LMap,
    LMarker,
    LIcon,
    LTileLayer,
  },
  setup() {
    const zoom = ref(8);
    return {
      zoom,
    };
  },
};
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
}
</style>
