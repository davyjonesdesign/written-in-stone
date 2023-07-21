<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div class="side-panel">
    <!-- details -->
    <div class="side-panel-details" v-if="selectedMarker" ref="sideDets">
      <!-- Show selected marker details -->
      <div class="entry-header">
        <h4>{{ selectedMarker.properties.name }}</h4>
        <div class="cats-wrap">
          <div class="category-wrapper">
          <div class="cat-icon-wrapper">
            <img
              :src="getIconUrl(selectedMarker.properties.category)"
              alt="category icon"
              class="cat-icon" />
          </div>
          <p class="label">{{ selectedMarker.properties.category }}</p>
        </div>
        <div class="category-wrapper">
          <div class="cat-icon-wrapper">
            <img
              :src="getIconUrl(selectedMarker.properties.period)"
              alt="category icon"
              class="cat-icon" />
          </div>
          <p class="label">{{ selectedMarker.properties.period }}</p>
        </div>
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
          <!-- <p>{{ selectedMarker.properties[section.property] }}</p> -->
          <ul class="entry-list">
            <li
            class="entry-list-item"
            :key="item.id"
            :id="item.id"
            v-for="item in selectedMarker.properties[section.property]"
          >{{ item }}</li>
          </ul>
        </div>
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

        <!-- period dropdown -->
        <div class="dropdown-box">
          <select id="categorySelect" v-model="filterPeriod" class="dropdown-select">
            <option value="">All Periods</option>
            <option v-for="period in periods" :value="period" :key="period">
              {{ period }}
            </option>
          </select>
          <div  v-if="filterPeriod" @click="clearPeriod">
            <img src="@/assets/icons/x.svg" alt="clear Icon" class="clear-icon"/>
          </div>
          <div class="arrow-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
        </div>
        <!-- category dropdown -->
        <div class="dropdown-box">
          <select id="categorySelect" v-model="filterCategory" class="dropdown-select">
            <option value="">All Categories</option>
            <option v-for="category in categories" :value="category" :key="category">
              {{ category }}
            </option>
          </select>
          <div  v-if="filterCategory" @click="clearCategory">
            <img src="@/assets/icons/x.svg" alt="clear Icon" class="clear-icon"/>
          </div>
          <div class="arrow-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="search-results-wraps">
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
            <div class="search-query" v-if="searchQuery">
                <!-- <p class="search-query-text">"{{ getMatchedProperty(marker) }}"</p> -->
                <p
                v-if="searchQuery && getMatchedProperty(marker)"
                class="search-query-text" v-html="getMatchedProperty(marker)"></p>

              </div>
            <div class="hr"></div>
          </li>
        </ul>
      </div>
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
import histIcon from '@/assets/icons/history.svg';

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
      filterPeriod: '',
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
      return histIcon;
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
        { id: 'citations', title: 'Citations', property: 'citations' },
      ];
    },
    filteredMarkers() {
      const query = this.searchQuery.toLowerCase();
      const category = this.filterCategory.toLowerCase();
      const period = this.filterPeriod.toLowerCase();

      return this.markers.filter((marker) => {
        const markerProperties = marker.properties;
        const markerKeys = Object.keys(markerProperties);

        // Check if any of the properties or arrays contain a match with the search query
        const match = markerKeys.some((key) => {
          const value = markerProperties[key];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(query);
          } if (Array.isArray(value)) {
            return value.some((item) => item.toLowerCase().includes(query));
          }
          return false;
        });

        // Filter by category and period
        const categoryMatch = category === '' || markerProperties.category.toLowerCase() === category;
        const periodMatch = period === '' || markerProperties.period.toLowerCase() === period;

        return match && categoryMatch && periodMatch;
      }).reduce((uniqueMarkers, marker) => {
        // Deduplicate the markers based on their keys
        const existingMarker = uniqueMarkers.find((m) => m.key === marker.key);
        if (!existingMarker) {
          uniqueMarkers.push(marker);
        }
        return uniqueMarkers;
      }, []);
    },

    categories() {
      // Get unique categories from the markers
      return [...new Set(this.markers.map((marker) => marker.properties.category))];
    },
    periods() {
      // Get unique periods from the markers
      return [...new Set(this.markers.map((marker) => marker.properties.period))];
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
    shouldShowSearchQuery(marker) {
      const query = this.searchQuery.toLowerCase();
      const markerProperties = marker.properties;
      const markerKeys = Object.keys(markerProperties);

      // Check if any of the properties or arrays contain a match with the search query
      return markerKeys.some((key) => {
        const value = markerProperties[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(query);
        } if (Array.isArray(value)) {
          return value.some((item) => item.toLowerCase().includes(query));
        }
        return false;
      });
    },
    getMatchedProperty(marker) {
      const propertyValues = Object.values(marker.properties);
      const query = this.searchQuery.toLowerCase();

      const matchedValue = propertyValues.find((value) => {
        if (typeof value === 'string' && value.toLowerCase().includes(query)) {
          return true;
        }
        if (Array.isArray(value)) {
          return value.some((item) => typeof item === 'string' && item.toLowerCase().includes(query));
        }
        return false;
      });

      if (matchedValue) {
        const processValue = (value) => {
          const valueString = typeof value === 'string' ? value.toLowerCase() : '';
          const startIndex = valueString.indexOf(query);
          const endIndex = startIndex + query.length;
          const beforeMatch = value.slice(0, startIndex);
          const matchedText = value.slice(startIndex, endIndex);
          const afterMatch = value.slice(endIndex);

          const truncatedBefore = beforeMatch.length > 10 ? `...${beforeMatch.slice(-10)}` : beforeMatch;
          const truncatedAfter = afterMatch.length > 10 ? `${afterMatch.slice(0, 10)}...` : afterMatch;

          return `${truncatedBefore}<b>${matchedText}</b>${truncatedAfter}`;
        };

        if (typeof matchedValue === 'string') {
          return processValue(matchedValue);
        } if (Array.isArray(matchedValue)) {
          const processedArray = matchedValue.map((item) => {
            if (typeof item === 'string') {
              return processValue(item);
            }
            return item;
          });
          return processedArray;
        }
      }

      return null;
    },
    clearPeriod() {
      this.filterCategory = ''; // Clear the selected value
      this.filterPeriod = ''; // Clear the selected value
    },
    clearCategory() {
      this.filterPeriod = ''; // Clear the selected value
      this.filterCategory = ''; // Clear the selected value
    },

  },
};
</script>
