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
      :icon="markerIcon"
      ></Gmap-Marker>
    </gmap-map>
  </div>  
</template>

<script>
import { mapstyle } from '../mixins/mapstyle'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/src/main'

export default {
  mixins: [mapstyle],
  data () {
    return {
      markerIcon: {
        url: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fmarker.svg?alt=media&token=fcbfd76e-ee93-41e8-a816-98906e19859b',
        scaledSize: new google.maps.Size(42, 42)
      }
    }
  },
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

<style>
@import url('../assets/css/main.css');

.mapfull {
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9998;
  width: 100%;
  height: 100%;
  & .__exit {
    width:  1.3rem;
    height: auto;
    position: fixed;
    margin: 1.2rem 7%;
    top: 0;
    right: 0;
    z-index: 9999;
  }
}

</style>