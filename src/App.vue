<template>
  <router-view/>
</template>

<style lang="scss">
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  // box-shadow: inset 0 0 5px grey;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: gray;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #00000000;
}

body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}

ul {
  padding:0;
}

#app {
  background-color: rgb(229, 229, 229);
  width: 100%;
  height: 100%;
}
.leaflet-control-attribution {
  display: none;
}
</style>
