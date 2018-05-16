<template>
  <modal
    name="local-map-modal"
    class="local-map-modal"
    :adaptive="true"
    :width="$store.state.isMobile === true ? '100%' : '64%'"
    :height="$store.state.isMobile === true ? '100%' : 'auto'"
    @closed="$store.state.fromWithoutAddress = false, exitFullscreen()">

    <div class="local-map-body">

      <img src="../assets/img/close-modal.svg" class="close-btn" @click="$modal.hide('local-map-modal')">
      
      <div class="titles">
        <h1 class="__title" ref="title">
          {{ $store.state.fromWithoutAddress == false ? 'O marcador está no local certo?' : 'Posicione o marcador' }}
        </h1>

        <h3 class="__subtitle" ref="subtitle">Mova-o caso ache necessário</h3>
      </div>
      
      <gmap-map
        :center="{lat: $store.state.acomodData.positionLAT, lng: $store.state.acomodData.positionLNG}"
        :zoom="mapZoom"
        :options="gmapOptions">
          <Gmap-Marker
          :draggable="true"
          :animation="4"
          @dragend="newPosition"
          :position="{lat: $store.state.acomodData.positionLAT, lng: $store.state.acomodData.positionLNG}"
          :icon="{url: markerUrl, scaledSize: markerSize}"
          ></Gmap-Marker>
      </gmap-map>

      <button class="__confirm-btn" type="button" @click="confirmar">Confirmar</button>

    </div>


  </modal>
</template>

<script>
import { mapstyle } from '../mixins/mapstyle'

export default {
  mixins: [mapstyle],
  data () {
    return {
      lat: null,
      lng: null,
      titleHeight: null,
      subtitleHeight: null,
      titlesHeight: 400
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
    },
    newPosition (e) {
      this.lat = e.latLng.lat()
      this.lng = e.latLng.lng()
    },
    confirmar () {
      this.$modal.hide('local-map-modal')
      this.$store.state.acomodData.positionLAT = this.lat
      this.$store.state.acomodData.positionLNG = this.lng
    }
  },
  computed: {
    gmapOptions () {
      return {
        styles: this.styles,
        mapTypeControl: false, 
        streetViewControl: false,
        zoomControl: this.$store.state.isMobile == true ? false : true
      }
    },
    mapZoom () {
      return this.$store.state.acomodPlace !== null ? 16 : 14
    },
    markerUrl () {
      return 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fmarker.svg?alt=media&token=fcbfd76e-ee93-41e8-a816-98906e19859b'
    },
    markerSize () {
      return !this.$store.state.googleMapsInitialized ? null : new window.google.maps.Size(48, 48)
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
    & .titles {
      display: flex;
      flex-flow: column;
      justify-content: center;
      width: 100%;
      height: 25vh;
      padding: 0 7%;
      & .__title {
        padding-top: 1rem;
        font-size: 28px;
      }
      & .__subtitle {
        padding-top: .5rem;
        font-size: 17px;
      }
    }
    & .vue-map-container {
      width: 100%;
      height: 75vh;
    }
    & .__confirm-btn {
      position: absolute;
      bottom: 1.2rem;
      color: white;
      width: 11rem;
      height: 2.85rem;
      background: rgb(42, 42, 42);
      border-radius: 100px;
      font-size: 16px;
      font-weight: 600;
      box-shadow: 3px 3px 20px 1px rgba(0,0,0,0.18);
    }
  }
}

@media (max-width: 375px) {
  .v--modal-box, .v--modal, .vue-dialog {
    width: 100% !important;
    margin: 0 !important;
  }
  .v--modal {
    border-radius: 0 !important;
  }
}

@media (min-width: 1024px) {
  .local-map-modal {
    & .local-map-body {
      & .close-btn {
        cursor: pointer;
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 1rem;
        height: auto;
      }
      & .titles {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 18vh;
        padding: 0 7%;
        & .__title {
          font-size: 32px;
        }
        & .__subtitle {
          font-size: 17px;
        }
      }
      & .vue-map-container {
        width: 100%;
        height: 70vh;
      }
      & .__confirm-btn {
        position: absolute;
        bottom: 1.2rem;
        color: white;
        width: 11rem;
        height: 2.85rem;
        background: rgb(42, 42, 42);
        border-radius: 100px;
        font-size: 16px;
        font-weight: 600;
        box-shadow: 3px 3px 20px 1px rgba(0,0,0,0.18);
      }
    }
  }
}
</style>