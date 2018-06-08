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
        :icon="{url: markerUrl, scaledSize: markerSize}">
      </Gmap-Marker>
    </gmap-map>

  </div>  
</template>

<script>
import { loaded } from '~/node_modules/vue2-google-maps/src/manager'
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
    markerUrl () {
      return 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fmarker.svg?alt=media&token=fcbfd76e-ee93-41e8-a816-98906e19859b'
    },
    markerSize () {
      return !this.$store.state.googleMapsInitialized ? null : new window.google.maps.Size(38, 38)
    },
    acomodMap () {
      return this.$store.state.acomodMap
    }
  },
  async mounted () {
    loaded.then(() => {
      this.$store.state.googleMapsInitialized = true
    })
  },
  watch: {
    acomodMap (value) {
      value !== null ? document.body.classList.add('mapfull-open') : document.body.classList.remove('mapfull-open')
    }
  }
}
</script>

<style>
@import url('../assets/css/main.css');

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