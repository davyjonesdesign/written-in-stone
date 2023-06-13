<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
    <div class="side-panel">
      <div lass="side-panel-details" v-if="selectedMarker">
        <!-- Show selected marker details -->
        <h2>{{ selectedMarker.properties.name }}</h2>
        <p>{{ selectedMarker.properties.history }}</p>
        <button class="close-details" @click="deselectMarker">&#10539;</button>

      </div>
      <div class="side-panel-search" v-if="!selectedMarker">
        <!-- Show marker list view -->
        <label for="searchInput">Search marker:</label>
        <input id="searchInput" type="text" v-model="searchQuery" placeholder="Search marker..." />
        <label for="categorySelect">Filter by category:</label>
        <select id="categorySelect" v-model="filterCategory">
          <option value="">All Categories</option>
          <option
            v-for="category in categories"
            :value="category"
            :key="category"
            >
            {{ category }}
            </option>
        </select>
        <ul class="search-results">
          <li
            class="search-results-item"
            v-for="marker in filteredMarkers"
            :key="marker.key"
            @click="selectMarker(marker)"
            @keydown.enter="selectMarker(marker)" tabindex="0">
            {{ marker.properties.name }}
          </li>
        </ul>
      </div>
    </div>
  </template>

<script>
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
    };
  },
  computed: {
    filteredMarkers() {
      // Apply search query and category filter to the markers
      const query = this.searchQuery.toLowerCase();
      const category = this.filterCategory.toLowerCase();

      return this.markers.filter((marker) => {
        const name = marker.properties.name.toLowerCase();
        const markerCategory = marker.properties.category.toLowerCase();

        // Filter by search query and category
        return (
          (name.includes(query) || markerCategory.includes(query))
            && (category === '' || markerCategory === category)
        );
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
    },
  },
};
</script>

<style lang="scss">
.side-panel-search {
    & .search-results {
        margin: 10px 0;
        list-style-type: none;
        padding: 0;
    } & .search-results-item {
        padding: 5px 10px;
        margin: 10px 0;
        background: white;
        cursor: pointer;
        list-style-type: none;
    } & .search-results-item:hover {
        background: rgb(207, 207, 207);
    }
}

</style>
