<template>
  <modal
    name="local-map-modal"
    class="local-map-modal"
    :adaptive="true"
    :width="$store.state.isMobile === true ? '100%' : '64%'"
    :height="$store.state.isMobile === true ? '100%' : 'auto'"
    @closed="$store.state.fromWithoutAddress = false">

    <div class="local-map-body">

      <img src="../assets/img/close-modal.svg" class="close-btn" @click="$modal.hide('local-map-modal')">
      
      <div class="titles">
        <h1 class="__title" ref="title">
          {{ $store.state.fromWithoutAddress == false ? 'O marcador está no local correto?' : 'Posicione o marcador no local' }}
        </h1>

        <h3 class="__subtitle" ref="subtitle">
          {{ $store.state.fromWithoutAddress == false ? 'Mova-o caso ache necessário' : '' }}
        </h3>

        <input
          v-if="$store.state.fromWithoutAddress == true"
          ref="inputAddress"
          v-model="address"
          class="__input-address" 
          type="text" 
          placeholder="E digite uma referência aqui..."
          maxlength="70"
          @focus="mapHeight = 60, isFocus = true"
          @blur="mapHeight = 73, isFocus = false"
        >
      </div>
      
      <gmap-map
        ref="map"
        :center="{lat: $store.state.acomodData.positionLAT, lng: $store.state.acomodData.positionLNG}"
        :zoom="mapZoom"
        :options="mapOptions"
        :style="mapStyle"
        @click="blurInput"
        @dragstart="blurInput">
          <Gmap-Marker
            :draggable="true"
            :animation="4"
            @dragend="newPosition"
            :position="{lat: $store.state.acomodData.positionLAT, lng: $store.state.acomodData.positionLNG}"
            :icon="{url: $store.state.markerUrl, scaledSize: $store.state.markerSize}">
          </Gmap-Marker>
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
      address: '',
      lat: null,
      lng: null,
      mapHeight: 73,
      isFocus: false
    }
  },
  methods: {
    blurInput () {
      this.isFocus == true ? this.$refs.inputAddress.blur() : ''
    },
    newPosition (e) {
      this.lat = e.latLng.lat()
      this.lng = e.latLng.lng()
    },
    confirmar () {
      if (this.$store.state.fromWithoutAddress == true) {
        this.$store.state.acomodData.positionLAT = this.lat
        this.$store.state.acomodData.positionLNG = this.lng
        this.$store.state.acomodData.address = this.address
      }
      this.$modal.hide('local-map-modal')
    }
  },
  computed: {
    mapStyle () {
      if (this.$store.state.isMobile == true) {
        return `height: ${this.mapHeight}%`
      }
    },
    mapOptions () {
      return {
        styles: this.styles,
        mapTypeControl: false, 
        streetViewControl: false,
        zoomControl: this.$store.state.isMobile == true ? false : true
      }
    },
    mapZoom () {
      return this.$store.state.acomodPlace !== null ? 16 : 14
    }
  }
}
</script>

<style>

.local-map-modal {
  z-index: 10000;
  & .local-map-body {
    position: relative;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
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
      height: 27%;
      padding: 0 7%;
      & .__title {
        padding-top: 1rem;
        font-size: 27px;
        font-weight: 700;
      }
      & .__subtitle {
        padding-top: .5rem;
        font-size: 17px;
      }
      & .__input-address {
        padding-top: .3rem;
        cursor: text;
        border: none;
        outline: none;
        width: 100%;
      }
    }
    & .vue-map-container {
      transition: .3s all ease;
      width: 100%;
    }
    & .__confirm-btn {
      position: absolute;
      bottom: .9rem;
      color: white;
      width: 11rem;
      height: 2.9rem;
      background: var(--color01);
      border-radius: 100px;
      font-size: 16px;
      font-weight: 600;
    }
  }
}

@media (max-width: 425px) {
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
        & .__input-address {
          margin: 0 7%;
          border: none;
          outline: none;
          width: 100%;
          text-align: center;
        }
      }
      & .vue-map-container {
        height: 71vh;
      }
      & .__confirm-btn {
      }
    }
  }
}
</style>