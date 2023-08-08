<!-- eslint-disable max-len -->
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
          >
          <svg id="b" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.19588 18.85619"><g id="c"><path d="m9.42808,18.85619l1.7678-1.7678-7.66035-7.6603L11.19588,1.76777l-1.7678-1.76777L0,9.42809l9.42808,9.4281Z" fill="#6e6562"/></g></svg>

          </button>
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
import regIcon from '@/assets/icons/reg-pin.svg';
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
        // const [latitude, longitude] = marker.latLng;
        // const zoomFactor = 2 * (zoom.value / (zoom.value - 0.05));
        // const shiftedLongitude = longitude + zoomFactor;
        // mapCenter.value = [latitude, shiftedLongitude];
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
      if (category === 'Region') {
        return regIcon;
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
@import '@/styles/mediaQueries.scss';
</style>
