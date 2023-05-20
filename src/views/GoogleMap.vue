<template>
  <div class="home">
    <l-map :center="[31.7683, 35.2137]" v-model="zoom" v-model:zoom="zoom"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-marker
      v-for="(place, index) in labeledCoords"
      :key="index"
      :lat-lng="[place.location.latitude, place.location.longitude]"
      >
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
import { ref, onMounted } from 'vue';

export default {
  name: 'GoogleMap',
  components: {
    LMap,
    LMarker,
    LIcon,
    LTileLayer,
  },
  setup() {
    const zoom = ref(8);
    const labeledCoords = ref([]);

    // cors issue - add https://cors-anywhere.herokuapp.com/ to beginning of url
    const placesURL = 'https://www.google.com/maps/d/kml?forcekml=1&mid=12uwcUQcLAP8lXBzwGUjkJp8nutDC1EI';
    async function fetchPlaces() {
      try {
        const response = await fetch(placesURL);
        const xml = await response.text();
        const dom = new DOMParser().parseFromString(xml, 'text/xml');
        console.log(xml);
        const nodeList = dom.querySelectorAll('Point');
        const grandArray = Array.from(nodeList);
        const rawCoords = grandArray.map(({ textContent }) => textContent);
        const coordsRefine = rawCoords.map((coord) => coord.replace(/[^\d.,]/g, ''));
        console.log(coordsRefine);
        const filteredCoords = coordsRefine.map((coord) => coord.replace(/,0$/, ''));
        const labeledCoordsArray = filteredCoords.map((coord) => {
          const [longitude, latitude] = coord.split(',');
          return {
            location: {
              longitude,
              latitude,
            },
          };
        });
        console.log(labeledCoordsArray);
        labeledCoords.value = labeledCoordsArray;
      } catch (error) {
        console.error(error);
      }
    }
    onMounted(fetchPlaces);
    return {
      zoom,
      labeledCoords,
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
