<template>
  <modal
    name="local-map-modal"
    class="local-map-modal"
    :adaptive="true"
    :width="$store.state.isMobile === true ? '100%' : '64%'"
    :height="$store.state.isMobile === true ? '100%' : 'auto'">

    <div class="local-map-body">

      <img src="../assets/img/close-modal.svg" class="close-btn" @click="$modal.hide('local-map-modal')">

      <h1 class="__title">O marcador está no local certo?</h1>
      <h3 class="__subtitle">Mova-o caso ache necessário</h3>

      <gmap-map
      :center="{lat: $store.state.acomodData.positionLAT, lng: $store.state.acomodData.positionLNG}"
      :zoom="mapZoom"
      :options="{styles: styles, mapTypeControl:false, streetViewControl:false}"
      style="width: 100%; height: 440px">
        <Gmap-Marker
        v-if="$store.state.acomodPlace"
        :clickable="true"
        :draggable="true"
        :animation="4"
        :position="{lat: $store.state.acomodData.positionLAT, lng: $store.state.acomodData.positionLNG}"
        :icon="{url: markerUrl, scaledSize: markerSize}"
        ></Gmap-Marker>
      </gmap-map>

      <button class="__btn">Confirmar</button>

    </div>


  </modal>
</template>

<script>
import { mapstyle } from '../mixins/mapstyle'

export default {
  mixins: [mapstyle],
  computed: {
    mapZoom () {
      return this.$store.state.acomodPlace !== null ? 16 : 14
    },
    markerUrl () {
      return 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fmarker.svg?alt=media&token=fcbfd76e-ee93-41e8-a816-98906e19859b'
    },
    markerSize () {
      return !this.$store.state.googleMapsInitialized ? null : new window.google.maps.Size(44, 44)
    }
  }
}
</script>

<style>
@import url('../assets/css/main.css');

.local-map-modal {
  z-index: 10000;
  & .local-map-body {
    position: relative;
    display: flex;
    flex-flow: column;
    align-items: center;
    & .close-btn {
      cursor: pointer;
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 1rem;
      height: auto;
    }
    & .__title {
      padding: 2rem 7% .5rem;
      font-size: 32px;
    }
    & .__subtitle {
      padding: 0 0 1rem 0;
      font-size: 17px;
    }
    & .__btn {
      position: absolute;
      bottom: 1.2rem;
      color: white;
      width: 11rem;
      height: 2.85rem;
      background: rgb(42, 42, 42);
      border-radius: 100px;
      font-size: 17px;
      font-weight: 600;
      box-shadow: 3px 3px 20px 1px rgba(0,0,0,0.18);
    }
  }
}
</style>