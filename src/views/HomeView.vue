<template>
  <div class="home">
    <div class="map-wrapper" :class="{ 'shifted': !showSidePanel }">
      <l-map
      :center="mapCenter"
      :zoom="zoom"
      :class="{ 'shifted': !showSidePanel }"
      >
        <l-tile-layer url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.png"></l-tile-layer>
        <l-marker
          v-for="(marker, index) in markers"
          :key="index"
          :lat-lng="marker.latLng"
          @click="selectMarker(marker)"
        >
          <l-icon :icon-url="marker.icon" :icon-size="[36, 54]" :icon-anchor="[18, 54]"></l-icon>
        </l-marker>
      </l-map>
    </div>
    <img
      src="@/assets/wis_logo.svg"
      alt="Written in Stone Logo"
      class="wis-logo" />
    <transition name="slide">
      <div class="side-panel-wrapper" :class="{ 'slide-in': showSidePanel }">
        <button class="side-panel-toggler" @click="toggleSidePanel">&#9650; &#9660;</button>
        <side-panel
          :selected-marker="selectedMarker"
          :markers="markers"
          @select-marker="selectMarker" />
          <button
            class="deselect-marker-button"
            v-if="selectedMarker"
            @click="deselectMarker"
          >&#10539;</button>
      </div>
    </transition>
    <MarkLegend/>

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
import MarkLegend from '@/components/MarkLegend.vue';

export default {
  name: 'HomeView',
  components: {
    LMap,
    LIcon,
    LMarker,
    LTileLayer,
    SidePanel,
    MarkLegend,
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
      // showSidePanel.value = true;
      zoom.value = 8;
      // mapCenter.value = originalMapCenter.value;
    };
    const selectMarker = (marker) => {
      if (marker && marker !== selectedMarker.value) {
        selectedMarker.value = marker;
        showSidePanel.value = false;
        const [latitude, longitude] = marker.latLng;
        const zoomFactor = 2 * (zoom.value / (zoom.value - 0.05));
        const shiftedLongitude = longitude + zoomFactor;
        mapCenter.value = [latitude, shiftedLongitude];
      } else {
        mapCenter.value = [31.7683, 35.2137];
        showSidePanel.value = true;
      }
    };

    const toggleSidePanel = () => {
      if (showSidePanel.value === null || showSidePanel.value === undefined) {
        showSidePanel.value = true;
        mapCenter.value = selectedMarker.value
          // eslint-disable-next-line max-len
          ? [selectedMarker.value.latLng[0], selectedMarker.value.latLng[1] + 2 * (zoom.value / (zoom.value - 0.05))]
          : originalMapCenter.value;
      } else {
        showSidePanel.value = !showSidePanel.value;
        if (showSidePanel.value) {
          mapCenter.value = originalMapCenter.value;
        } else {
          mapCenter.value = selectedMarker.value
            // eslint-disable-next-line max-len
            ? [selectedMarker.value.latLng[0], selectedMarker.value.latLng[1] + 2 * (zoom.value / (zoom.value - 0.05))]
            : originalMapCenter.value;
        }
      }
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
@import '@/styles/main.scss';
@import '@/styles/sidepanel.scss';
@import '@/styles/footer.scss';
</style>
