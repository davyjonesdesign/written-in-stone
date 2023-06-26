<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div class="side-panel">
    <!-- details -->
    <div class="side-panel-details" v-if="selectedMarker" ref="sideDets">
      <!-- Show selected marker details -->
      <div class="entry-header">
        <h4>{{ selectedMarker.properties.name }}</h4>
        <div class="category-wrapper">
          <div class="cat-icon-wrapper">
            <img
              :src="getIconUrl(selectedMarker.properties.category)"
              alt="category icon"
              class="cat-icon" />
          </div>
          <p class="label">{{ selectedMarker.properties.category }}</p>
        </div>
        <div class="tabs">
          <button
            class="tab"
            v-for="(section, index) in sections"
            :key="section.id"
            @click="scrollToSection(section.id, index)"
            :class="{ 'active-tab': activeTabIndex === index }"
          >
            {{ section.title }}
          </button>
        </div>
        <div class="hr"></div>
      </div>
      <div class="entry-content">
        <img
              :src="selectedMarker.properties.image"
              alt="result item image"/>
        <h6 class="img-caption">Image from Wikimedia Commons</h6>
        <div v-for="section in sections" :id="section.id" :key="section.id" class="entry-section">
          <h6>{{ section.title }}</h6>
          <p>{{ selectedMarker.properties[section.property] }}</p>
          <p>{{ selectedMarker.properties[section.property] }}</p>
          <p>{{ selectedMarker.properties[section.property] }}</p>
        </div>
        <h6>Citations</h6>
        {{ selectedMarker.properties.citations }}
      </div>
      <!-- <button class="close-details" @click="deselectMarker">&#10539;</button> -->
    </div>

    <!-- search -->
    <div class="side-panel-search" v-if="!selectedMarker">
      <div class="search-header">
        <!-- Search -->
        <div class="input-wrapper">
          <input
            id="searchInput"
            type="text"
            v-model="searchQuery"
            placeholder="Search marker..."
          />
          <img src="@/assets/icons/magnifying.svg" alt="Search Icon" class="search-icon" />
        </div>

        <!-- select dropdown -->
        <div class="dropdown-box">
          <select id="categorySelect" v-model="filterCategory" class="dropdown-select">
            <option value="">All Categories</option>
            <option v-for="category in categories" :value="category" :key="category">
              {{ category }}
            </option>
          </select>
          <div class="arrow-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
        </div>
      </div>
      <ul class="search-results">
        <li
          class="search-results-item"
          v-for="marker in filteredMarkers"
          :key="marker.key"
          @click="selectMarker(marker)"
          @keydown.enter="selectMarker(marker)"
          tabindex="0"
        >
          <div class="results-item">
            <div class="results-item-img">
              <img
              :src="marker.properties.image"
              alt="result item image"/>
            </div>
            <div class="results-item-content">
              <h6>{{ marker.properties.name }}</h6>
              <div class="category-wrapper list-cat">
                <div class="cat-icon-wrapper">
                  <img
                    :src="getIconUrl(marker.properties.category)"
                    alt="category icon"
                    class="cat-icon" />
                </div>
                <p class="label">{{ marker.properties.category }}</p>
              </div>
              <div class="category-wrapper list-cat">
                <div class="cat-icon-wrapper">
                  <img
                    src='@/assets/icons/history.svg'
                    alt="category icon"
                    class="cat-icon" />
                </div>
                <p class="label">{{ marker.properties.period }}</p>
              </div>
            </div>
          </div>
          <div class="hr"></div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <p>Written in Stone</p>
    </div>
  </div>
</template>

<script>
import landmarkIcon from '@/assets/icons/landmark.svg';
import cityIcon from '@/assets/icons/city.svg';
import telIcon from '@/assets/icons/tel.svg';

export default {
  name: 'SidePanel',
  props: {
    selectedMarker: {
      type: Object,
      required: true,
    },
    markers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchQuery: '',
      filterCategory: '',
      activeTabIndex: 0,
    };
  },
  setup() {
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

    return {
      // other code...
      getIconUrl,
    };
  },
  computed: {
    sections() {
      return [
        { id: 'geography', title: 'Geography', property: 'geography' },
        { id: 'history', title: 'History', property: 'history' },
        { id: 'archaeology', title: 'Archaeology', property: 'archaeology' },
        { id: 'scripture', title: 'Scripture', property: 'scripture' },
      ];
    },
    filteredMarkers() {
      // Apply search query and category filter to the markers
      const query = this.searchQuery.toLowerCase();
      const category = this.filterCategory.toLowerCase();

      return this.markers.filter((marker) => {
        const markerProperties = marker.properties;
        const markerKeys = Object.keys(markerProperties);

        // Check if any of the properties match the search query
        const match = markerKeys.some((key) => {
          const value = markerProperties[key];
          return typeof value === 'string' && value.toLowerCase().includes(query);
        });

        // Filter by category
        const categoryMatch = category === '' || markerProperties.category.toLowerCase() === category;

        // Return true if any property matches the search query and category matches
        return match && categoryMatch;
      });
    },
    categories() {
      // Get unique categories from the markers
      return [...new Set(this.markers.map((marker) => marker.properties.category))];
    },
  },
  methods: {
    selectMarker(marker) {
      this.$emit('select-marker', marker);
    },
    deselectMarker() {
      this.$emit('select-marker', null);
      this.$emit('reset-center');
      this.activeTabIndex = 0; // Reset activeTabIndex to 0
    },
    scrollToSection(sectionId, index) {
      const { sideDets } = this.$refs;
      const section = document.getElementById(sectionId);
      if (section && sideDets) {
        section.scrollIntoView({ behavior: 'smooth' });
        this.activeTabIndex = index;
      }
    },
  },
};
</script>
