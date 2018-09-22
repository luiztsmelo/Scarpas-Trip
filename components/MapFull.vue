<template>
  <div class="mapfull" v-if="acomodMap">

    <div class="exit" @click="$store.commit('m_acomodMap', null), exitFullscreen()">
      <img class="__exit-img" src="../assets/img/exit.svg">
    </div>

    <gmap-map
      v-if="acomodMap"
      :center="{lat: acomodMap.positionLAT, lng: acomodMap.positionLNG}"
      :zoom="15"
      :options="{styles: styles, fullscreenControl:false, zoomControl:false, mapTypeControl:false, backgroundColor:'white'}"
      style="width: 100vh; height: 100vh">
      <Gmap-Marker
        :position="{lat: acomodMap.positionLAT, lng: acomodMap.positionLNG}"
        :icon="{url: $store.state.markerUrl, scaledSize: $store.state.markerSize}">
      </Gmap-Marker>
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
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    }
  },
  computed: { 
    acomodMap () { return this.$store.state.acomodMap } 
  },
  watch: {
    acomodMap (value) {
      value !== null ? document.body.classList.add('mapfull-open') : document.body.classList.remove('mapfull-open')
    }
  }
}
</script>

<style>

body.mapfull-open {
  overflow: hidden;
}

.mapfull {
  position: relative;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9998;
  width: 100%;
  height: 100%;
  & .exit {
    position: absolute;
    top: .8rem;
    right: .8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 2.6rem;
    height: 2.6rem;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    z-index: 9999;
    & .__exit-img {
      width: 1rem;
      height: auto;
      filter: brightness(500%);
    }
  }
}

</style>