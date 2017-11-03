<template>
  <div class="mapfull" v-if="eventoMap">
    <img class="__exit" src="../assets/img/exit.svg" @click="$store.commit('m_eventoMap', null), exitFullscreen()">
    <gmap-map
      v-if="eventoMap"
      :center="{lat: eventoMap.positionLAT, lng: eventoMap.positionLNG}"
      :zoom="15"
      :options="{styles: styles, fullscreenControl:false, zoomControl:false, mapTypeControl:false, backgroundColor:'white'}"
      style="width: 100%; height: 100%">
      <Gmap-Marker
      :position="{lat: eventoMap.positionLAT, lng: eventoMap.positionLNG}"
      ></Gmap-Marker>
    </gmap-map>
  </div>  
</template>

<script>
import { mapstyle } from '../mixins/mapstyle'
export default {
  mixins: [mapstyle],
  methods: {
    exitFullscreen () {
      if (document.cancelFullScreen) {
          document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
      }
    }
  },
  computed: {
    eventoMap () {
      return this.$store.state.eventoMap
    }
  }
}
</script>

<style scoped>
@import url('../assets/css/main.css');

.mapfull {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width:  100%;
  height: 100%;
  & .__exit {
    width:  1.3rem;
    height: auto;
    position: fixed;
    top: 1.2rem;
    right: 7%;
    z-index: 101;
  }
}

</style>