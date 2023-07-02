<template>
    <div
        class="lgd-wrapper"
        :class="{ 'lgd-expand': isExpanded }"
        @click="toggleExpand"
        @keydown.enter="toggleExpand"
        tabindex="0"
        role="button"
    >
        <div class="lgd-header">
            <span
                class="lgd-open"
            >&#9650;</span>
            <span
                class="lgd-close"
            >&#9660;</span>
            <h6 class="small lgd-label">Marker Legend</h6>
        </div>
        <div class="lgd-mark_wrapper">
            <div class="lgd-icon-wrap tel-icon">
                <img src="@/assets/icons/tel.svg" alt="tel" />
            </div>
            <p>Tel</p>
        </div>
        <div class="lgd-hr"></div>
        <div class="lgd-mark_wrapper">
            <div class="lgd-icon-wrap">
                <img src="@/assets/icons/city.svg" alt="tel" />
            </div>
            <p>City</p>
        </div>
        <div class="lgd-hr"></div>
        <div class="lgd-mark_wrapper">
            <div class="lgd-icon-wrap landmark-icon">
                <img src="@/assets/icons/landmark.svg" alt="tel" />
            </div>
            <p>Landmark</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'MarkerLegend',
  data() {
    return {
      isExpanded: false,
    };
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/main.scss';
@import '@/styles/legend.scss';
</style>
