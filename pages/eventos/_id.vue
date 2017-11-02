<template>
  <div class="eventos_id" :class="{ onShare: showShare }">

    <div class="backbar">
      <div class="backbar-body">
        <nuxt-link to="/">
        <img class="__back-btn" src="../../assets/img/back.svg" alt="voltar">
        </nuxt-link>
        <img class="__share-btn" src="../../assets/img/share.svg" alt="compartilhar" @click="$store.commit('m_showShare', true)">
      </div>
    </div>

    <div class="image-box">
      <img class="__image1" :src="evento.imageH1" alt="">
    </div>


    <div class="heading-box" >
      <h1 class="__title">{{ evento.title }}</h1>
      <h1 class="__subtitle">{{ evento.subtitle }}</h1>
    </div>


    <h1 class="box-title">Local</h1>

    <div class="local-box" >
      <gmap-map
      :center="evento.position"
      :zoom="15"
      :options="{styles: styles, draggable:false, fullscreenControl:false, zoomControl:false, mapTypeControl:false, streetViewControl:false}"
      style="width: 100%; height: 220px"
      @click="$store.commit('m_eventoMap', evento), enterFullscreen()">
        <Gmap-Marker
        :position="evento.position"
        ></Gmap-Marker>
      </gmap-map>
    </div>
    
  </div>
</template>

<script>
import { mapstyle } from '../../mixins/mapstyle'
import * as firebase from 'firebase'

export default {
  mixins: [mapstyle],
  head () {
    return {
      title: this.evento.title + ' ‒ ' + 'Escarpas Trip',
      meta: [
        { hid: 'description', name: 'description', content: this.evento.subtitle },
        { property: 'og:url', content: 'http://escarpas-trip.herokuapp.com/eventos/' + this.$route.params.id },
        { property: 'og:title', content: this.evento.title },
        { property: 'og:description', content: this.evento.subtitle },
        { property: 'og:image', content: this.evento.imageH1 },
        { property: 'og:site_name', content: 'Escarpas Trip' }
      ]
    }
  },
  transition: 'evento',
  fetch ({ store, params }) {
    return firebase.database().ref('eventos/' + params.id).once('value')
    .then(snapshot => {
      store.commit('m_evento', snapshot.val())
      store.commit('m_showNavbar', false)
      store.commit('m_showFoobar', false)
    })
  },
  methods: {
    enterFullscreen () {
      if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      }
    }
  },
  computed: {
    evento () {
      return this.$store.state.evento
    },
    showShare () {
      return this.$store.state.showShare
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.$store.state.showNavbar === false && this.$store.state.showFoobar === false) {
      this.$store.commit('m_showNavbar', true)
      this.$store.commit('m_showFoobar', true)
      next()
    } else {
      next(false)
    }
  }
}
</script>

<style scope>
@import url('../../assets/css/main.css');

.eventos_id {
  display: flex;
  flex-flow: column;
  background-color: white;
  transition: all .3s cubic-bezier(.15,.97,.43,.93);
  height: 100vh;
  & .backbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    height: 3.1rem;
    width:  100%;
    background: transparent;
    transition: all .3s ease;
    padding: 0 6%;
    & .backbar-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      & .__back-btn {
        transform: translateY(1px);/* A imagem ta errada */
        cursor: pointer;
        width: 1.3rem;
        height: auto;
      }
      & .__share-btn {
        cursor: pointer;
        width: 1.5rem;
        height: auto;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
      }
    }
  }
  & .box-title {
    font-weight: 500;
    font-size: 25px;
    padding: 2rem 6% 1rem 6%;
  }
  & .image-box {
    position: relative;
    & .__image1 {
      width: 100%;
      height: auto;
    }
  }
  & .heading-box {
    padding: 0 6%;
    & .__title {
      margin: 1rem 0 2rem 0;
      font-size: 34px;
      font-weight: 600;
    }
    & .__subtitle {
      font-size: 19px;
      font-weight: 300;
    }
  }
}

.onShare {
  filter: brightness(30%);
}
</style>
