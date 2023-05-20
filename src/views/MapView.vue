<template>
  <div class="home">
    <l-map
      :center="[31.7683, 35.2137]"
      :zoom="zoom"
      style="height: 100vh; width: 100vw;"
    >
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
      <l-marker
        v-for="(marker, index) in markers"
        :key="index"
        :lat-lng="marker.latLng"
      >
        <l-icon :icon-url="marker.icon" :icon-size="[40, 60]" :icon-anchor="[20, 60]"></l-icon>
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
import { ref, onMounted } from 'vue';
import locations from '@/data/locations.geojson';
import landmarkIcon from '@/assets/icons/landmark-pin.svg';
import cityIcon from '@/assets/icons/city-pin.svg';
import telIcon from '@/assets/icons/tel-pin.svg';

export default {
  name: 'MapView',
  components: {
    LMap,
    LIcon,
    LMarker,
    LTileLayer,
  },
  setup() {
    const zoom = ref(8);
    const markers = ref([]);

    const getIconUrl = (category) => {
      if (category === 'Landmark') {
        return landmarkIcon;
      }
      if (category === 'City') {
        return cityIcon;
      }
      if (category === 'Tel') {
        return telIcon;
      }
      return null;
    };

    onMounted(() => {
      markers.value = locations.features.map((location) => ({
        latLng: location.geometry.coordinates,
        icon: getIconUrl(location.properties.category),
        key: location.properties.name,
      }));
    });

    return {
      zoom,
      markers,
    };
  },
};
</script>

<style lang="scss">
@import url('@/styles/main.scss');

.home {
  width: 100%;
  height: 100%;
}
</style>
