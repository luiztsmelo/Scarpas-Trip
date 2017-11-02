<template>
  <div class="mapfull" v-if="eventoMap">
    <img class="__exit" src="../assets/img/exit.svg" @click="$store.commit('m_eventoMap', null), fullscreen()">
    <gmap-map
      v-if="eventoMap"
      :center="eventoMap.position"
      :zoom="15"
      :options="{styles: styles, draggable:true, fullscreenControl:false, zoomControl:false, mapTypeControl:false}"
      style="width: 100%; height: 100%">
      <Gmap-Marker
      :position="eventoMap.position"
      ></Gmap-Marker>
    </gmap-map>
  </div>  
</template>

<script>
import { mapstyle } from '../mixins/mapstyle'
export default {
  mixins: [mapstyle],
  methods: {
    fullscreen () {
      if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
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
    width:  1.2rem;
    height: auto;
    position: fixed;
    top: 1.2rem;
    right: 7%;
    z-index: 101;
  }
}

</style>