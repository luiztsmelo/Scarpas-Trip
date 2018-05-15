<template>
  <modal
    name="local-map-modal"
    class="local-map-modal"
    width="60%"
    height="auto">

    <img src="../assets/img/close-modal.svg" class="close-btn" @click="$modal.hide('local-map-modal')">

    <div class="local-map-body">
      <h1 class="__title">O marcador está correto?</h1>
      <gmap-map
      v-if="$store.state.cadastroAcomod5"
      :center="{lat: $store.state.acomodData.positionLAT, lng: $store.state.acomodData.positionLNG}"
      :zoom="mapZoom"
      :options="{styles: styles, mapTypeControl:false, streetViewControl:false}"
      style="width: 100%; height: 340px">
        <Gmap-Marker
        v-if="$store.state.acomodPlace"
        :clickable="true"
        :draggable="true"
        :animation="4"
        :position="{lat: $store.state.acomodData.positionLAT, lng: $store.state.acomodData.positionLNG}"
        :icon="{url: markerUrl, scaledSize: markerSize}"
        ></Gmap-Marker>
      </gmap-map>
    </div>
    

  </modal>
</template>

<script>
export default {
  computed: {
    mapZoom () {
      return this.$store.state.acomodPlace !== null ? 16 : 12
    }
  }
}
</script>

<style>
@import url('../assets/css/main.css');

.local-map-modal {
  z-index: 10000;
  & .close-btn {
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 1rem;
    height: auto;
  }
  & .local-map-body {
    display: flex;
    flex-flow: column;
    align-items: center;
    & .__title {
      padding: 2rem 0;
    }
  }
}
</style>