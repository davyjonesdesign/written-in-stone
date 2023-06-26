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

.lgd-wrapper {
    transition: $trans;
    overflow: hidden;
    position: fixed;
    bottom: 5px;
    left: 5px;
    height: 20px;
    max-width: 150px;
    padding: 5px 10px 10px;
    border: 2px solid $neutral-600;
    border-radius: 10px;
    background: $neutral-100;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    cursor: pointer;
    & .lgd-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    & .lgd-label {
        margin: 1px 0 6px;
        text-align: center;
        width: 100%;
        color: $neutral-800;
    } & .lgd-mark_wrapper {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin: 5px 0;
        // width: 100%;
    } & .lgd-icon-wrap {
        display: flex;
        align-content: center;
        justify-content: center;
        padding: 2px 3px 4px 3px;
        margin-right: 5px;
        border-radius: 100%;
        background: $primary-50;
        border: 1px solid $primary-800;
    } & .tel-icon {
        background: $dirt-50;
        border-color: $dirt-800;
    } & .landmark-icon {
        background: $earth-50;
        border-color: $earth-800;
    } & img {
        width: 16px;
        // height: 22px;
    } & p {
        margin: 0;
        height: 16px;
    } & .lgd-hr {
        width: 100%;
        height: 1px;
        background: $neutral-200;
        margin: 4px 0;
    } & .lgd-close, .lgd-open {
        color: $neutral-800;
        font-size: 14px;
    }
}
.lgd-wrapper:hover {
    background: $accent-50;
    transform: scale(1.05);
    border-color: $accent-700;
}
.lgd-wrapper:hover .lgd-label, .lgd-wrapper:hover .lgd-close, .lgd-wrapper:hover .lgd-open {
    color: $accent-700;
}
.lgd-close {
    display: none;
    margin: 2px 8px 8px 0;
}
.lgd-open {
    display: inherit;
    margin: 2px 8px 8px 0;
}
.lgd-expand {
    height: auto;
    & .lgd-close {
        display: inherit;
    } & .lgd-open {
        display: none;
    }
}

</style>
