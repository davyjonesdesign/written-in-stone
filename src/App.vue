<template>
  <router-view/>
</template>

<style lang="scss">
@import '@/styles/main.scss';
@import '@/styles/type.scss';

/* width */
::-webkit-scrollbar {
  background: $primary-400;
  border-left: 2px solid $neutral-800;
  // border-radius: 5px;
  width: 12px;
}

/* Track */
::-webkit-scrollbar-track {
  // box-shadow: inset 0 0 5px grey;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  border: 1px solid $neutral-900;
  background: $primary-700;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  cursor: pointer;
  background: $primary-900;
}

body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}

#app {
  background-color: rgb(229, 229, 229);
  width: 100%;
  height: 100%;
}

ul {
  padding:0;
}

button, input[type="submit"], input[type="reset"] {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: inherit;
}
input {
  all: unset;
}
select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: none;
  border: none;
  outline: none;
  padding: 0;
  /* Add any other styles as needed */
}

@import '@/styles/dropdown.scss';

.leaflet-control-attribution {
  display: none;
}
.leaflet-left {
  right: 0;
  left: unset;
  top: unset;
  bottom: 0;
  & .leaflet-control {
    margin-left: 0;
    margin-top: 0;
    margin: 0 10px 0 0;
    border: none;
    box-shadow: none;
    transition: ease-in-out .2s;
  }
  & .leaflet-bar a:first-child, .leaflet-bar a:last-child {
    margin: 0 0 10px;
    border: 2px solid $neutral-600;
    background: $neutral-100;
    border-radius: 20px;
    transition: $trans;
    color: $neutral-800;
  }
  & .leaflet-bar a:hover {
    background: $accent-50;
    border: 2px solid $accent-700;
    color: $accent-700;
    transform: scale(1.05);
  }
}
</style>
