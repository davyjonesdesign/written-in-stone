<template>
  <div class="home">
    <div class="map-wrapper" :class="{ 'shifted': !showSidePanel }">
      <l-map
      :center="mapCenter"
      :zoom="zoom"
      :class="{ 'shifted': !showSidePanel }"
      >
        <l-tile-layer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"></l-tile-layer>
        <l-marker
          v-for="(marker, index) in markers"
          :key="index"
          :lat-lng="marker.latLng"
          @click="selectMarker(marker)"
        >
          <l-icon :icon-url="marker.icon" :icon-size="[26, 39]" :icon-anchor="[13, 19.5]"></l-icon>
        </l-marker>
      </l-map>
    </div>
    <transition name="slide">
      <div class="side-panel-wrapper" :class="{ 'slide-in': showSidePanel }">
        <button class="side-panel-toggler" @click="toggleSidePanel">&#9650; &#9660;</button>
        <side-panel
          :selected-marker="selectedMarker"
          :markers="markers"
          @select-marker="selectMarker" />

      </div>
    </transition>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import {
  LMap, LIcon, LMarker, LTileLayer,
} from '@vue-leaflet/vue-leaflet';
import { ref, onMounted } from 'vue';
import locations from '@/data/locations.geojson';
import landmarkIcon from '@/assets/icons/landmark-pin.svg';
import cityIcon from '@/assets/icons/city-pin.svg';
import telIcon from '@/assets/icons/tel-pin.svg';
import SidePanel from '@/components/SidePanel.vue';

export default {
  name: 'MapView',
  components: {
    LMap,
    LIcon,
    LMarker,
    LTileLayer,
    SidePanel,
  },

  setup() {
    const zoom = ref(8);
    const markers = ref([]);
    const showSidePanel = ref(true);
    const mapCenter = ref([31.7683, 35.2137]);
    const originalMapCenter = ref([31.7683, 35.2137]);
    const selectedMarker = ref(null);

    const deselectMarker = () => {
      selectedMarker.value = null;
      mapCenter.value = originalMapCenter;
    };

    const selectMarker = (marker) => {
      selectedMarker.value = marker === selectedMarker.value ? null : marker;
      showSidePanel.value = false;
      const [latitude, longitude] = marker.latLng;
      const zoomFactor = 2 ** (zoom.value - 1.5); // Adjust the zoom factor as needed
      const shiftedLongitude = longitude + (0.4 / zoomFactor);
      mapCenter.value = [latitude, shiftedLongitude];
    };

    const toggleSidePanel = () => {
      showSidePanel.value = !showSidePanel.value;
    };

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
        properties: location.properties,
      }));
    });

    return {
      zoom,
      markers,
      selectedMarker,
      selectMarker,
      showSidePanel,
      toggleSidePanel,
      deselectMarker,
      mapCenter,
      originalMapCenter,
    };
  },
};
</script>

<style lang="scss">
@import url('@/styles/main.scss');

.sidePanel-toggler {
  position: relative;
  z-index: 1000;
}

.home {
  width: 100%;
  height: 100%;
}

.map-wrapper {
  height: 100vh;
  width: 100vw;
  position: fixed;
  transition: transform 0.3s ease-in-out;
}

.leaflet-container {
  height: 100vh;
  width: 100vw;
  position: fixed;
}
.shifted {
  width: 60vw;
  & .leaflet-container {
    width: 60vw;
  }
}

.leaflet-marker-icon {
  transition: 0.2s ease-in-out;
}
.leaflet-marker-icon:hover {
  filter: drop-shadow(0 -2px 3px rgb(0, 0, 0, 0.8));

}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}

.side-panel-wrapper {
  position: fixed;
  top: 0;
  right: 0px;
  height: 100%;
  background-color: rgb(229, 229, 229);
  width: 40vw;
  z-index: 100;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
  & .side-panel {
    display: flex;
    overflow-y: scroll;
    height: 100%;
    position: relative;
    top: 0;
    right: 0;
    padding: 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
& .side-panel-toggler {
    position: absolute;
    top: calc(50vh - 10px);
    left: -33px;
    transform: rotate(-90deg);
  }
}
.close-details {
  position: fixed;
  top: 10px;
  right: 15px;
  z-index: 1000;
}
.slide-in {
  transform: translateX(100%);
}

.side-panel-open .side-panel-wrapper {
  transform: translateX(100%);
}
</style>
