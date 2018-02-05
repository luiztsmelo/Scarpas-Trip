<template>
  <div class="atracoes-id">


    <!-- ####### TOPBAR ####### -->
    <transition name="topbar-animation">
      <div class="topbar" :class="{ topbarBg: scrollTopbar }" v-show="showTopbar">
        <div class="topbar-body">
          
          <div class="back-box" @click="backBtn">
            <img class="__back-btn" :class="{ topbarBtn: scrollTopbar }" src="../../assets/img/back.svg" alt="voltar">
          </div>

          <div class="share-box" @click="$store.commit('m_showShare', true), hashShare()">
            <img class="__share-btn" :class="{ topbarBtn: scrollTopbar }" src="../../assets/img/share.svg" alt="compartilhar">
          </div>
          
        </div>
      </div>
    </transition><!-- ####### TOPBAR ####### -->




    <!-- ####### IMAGE ####### -->
    <div class="image-box">
      <swiper :options="swiperOption">
        <swiper-slide class="slide"><img class="__img" :src="image1H(atracao)"></swiper-slide>
        <swiper-slide class="slide" v-if="ifImage2"><img class="__img" :src="image2H(atracao)"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div> 
    <!-- ####### IMAGE ####### -->



    <h1 class="id-title">{{ atracao.title }}</h1>



    <!-- ####### SOBRE ####### -->
    <h1 class="item-title">Sobre</h1>

    <div class="sobre-box">
      <h3>{{ atracao.subtitle }}</h3>
    </div><!-- ####### SOBRE ####### -->




    <!-- ####### LOCALIZAÇÃO ####### -->
    <h1 class="item-title">Local</h1>

    <div class="local-box">
      <gmap-map
      :center="{lat: atracao.rota.slice(-1)[0].lat, lng: atracao.rota.slice(-1)[0].lng}"
      :zoom="12"
      :options="{styles: styles, mapTypeControl:false, streetViewControl:false}"
      style="width: 100%; height: 280px">
        <!-- Rota -->
        <gmap-polyline 
        :path="atracao.rota"
        :options="polylineOptions">
        </gmap-polyline>
        <!-- Marcador partida -->
        <gmap-marker
        v-if="atracao.rota !== {}"
        :position="atracao.rota[0]"
        :icon="markerIconPartida"
        ></gmap-marker>
        <!-- Marcador chegada -->
        <gmap-marker
        v-if="atracao.rota !== {}"
        :position="atracao.rota.slice(-1)[0]"
        :icon="markerIconChegada"
        ></gmap-marker>
      </gmap-map>
    </div><!-- ####### LOCALIZAÇÃO ####### -->



  
    <!-- ####### AVALIAÇÕES ####### -->
    <h1 class="item-title">Avaliações</h1>

    <div class="avaliacoes-box">
      <h3>Comentários aqui...</h3>
    </div><!-- ####### AVALIAÇÕES ####### -->




    <!-- ####### RESERVA ####### --> 
    <div class="reserva">
      <div class="reserva-body">
        <h3 class="__reserva-km">15km</h3>
        <button class="__reserva-btn">Como chegar</button>
      </div>
    </div>
    <!-- ####### RESERVA ####### -->
    

    

  </div>
</template>

<script>
import supportsWebP from 'supports-webp'
import { mapstyle } from '../../mixins/mapstyle'
import * as firebase from 'firebase'

export default {
  mixins: [mapstyle],
  data () {
    return {
      showTopbar: true,
      scrollTopbar: false,
      swiperOption: {
        pagination: '.swiper-pagination',
        dynamicBullets: true,
        autoplay: 2222
      },
      markerIconPartida: {
        url: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fmarker-partida.svg?alt=media&token=bd41c89e-33ea-4899-bb5a-4f2fc2d936cb',
        /* scaledSize: new google.maps.Size(34, 34) */
      },
      markerIconChegada: {
        url: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fmarker-chegada.svg?alt=media&token=b5b52bc5-a65f-4136-9c31-57830b969067',
        /* scaledSize: new google.maps.Size(34, 34) */
      },
      polylineOptions: {
        strokeColor: '#3e3e3e',
        strokeOpacity: 1,
        strokeWeight: 2
      }
    }
  },
  head () {
    return {
      title: this.$store.state.atracao.title + ' ‒ ' + 'Escarpas Trip',
      meta: [
        { hid: 'description', name: 'description', content: this.$store.state.atracao.subtitle },
        { property: 'og:url', content: 'https://www.escarpastrip.com/atracoes/' + this.$route.params.id },
        { property: 'og:title', content: this.$store.state.atracao.title },
        { property: 'og:description', content: this.$store.state.atracao.subtitle },
        { property: 'og:image', content: this.$store.state.atracao.imageH1J },
        { property: 'og:site_name', content: 'Escarpas Trip' }
      ]
    }
  },
  transition: 'evento',
  fetch ({ store, params }) {
    return firebase.database().ref('atracoes/' + params.id).once('value')
    .then(snapshot => {
      store.commit('m_atracao', snapshot.val())
      store.commit('m_showNavbar', false)
      store.commit('m_showFoobar', false)
    })
  },
  methods: {
    backBtn () {
      window.history.back(1)
    },
    hashShare () {
       window.location.hash = "compartilhar"
    },
    image1H (atracao) {
      if (supportsWebP) {
        return atracao.imageH1W
      } else {
        return atracao.imageH1J
      }
    },
    image2H (atracao) {
      if (supportsWebP) {
        return atracao.imageH2W
      } else {
        return atracao.imageH2J
      }
    },
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
    scrollY () {
      return this.$store.state.scrollY
    },
    atracao () {
      return this.$store.state.atracao
    },
    ifImage2 () {
      if (this.atracao.imageH2W === null) {
        return
      } else {
        if (supportsWebP) {
          return this.atracao.imageH2W
        } else {
          return this.atracao.imageH2J
        }
      }
    },
    showShare () {
      return this.$store.state.showShare
    }
  },
  watch: {
    scrollY (value) {
      if (value > 250) {
        this.scrollTopbar = true
      } else {
        this.scrollTopbar = false
      }
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

<style>
@import url('../../assets/css/main.css');
@import url('../../assets/css/pagination.css');
@import url('../../assets/css/_id.css');

.atracoes-id {
  display: flex;
  flex-flow: column;
  background-color: white;
  margin-bottom: 5.3rem;
  transition: all .27s cubic-bezier(.15,.97,.43,.93);
  


  /* ####### IMAGE BOX ####### */
  & .image-box {
    overflow: hidden;
    & .swiper-container {
      position: relative;
      & .swiper-wrapper {
        display: inline-flex;
        overflow: hidden;
        & .slide {
          & .__img {
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }/* ####### IMAGE BOX ####### */




  /* ####### SOBRE BOX ####### */
  & .sobre-box {
    padding: 0 7%;
  }/* ####### SOBRE BOX ####### */





  /* ####### LOCAL ####### */
  & .local-box {
    margin-top: .5rem;
  }/* ####### LOCAL ####### */





  /* ####### AVALIAÇÕES ####### */
  & .avaliacoes-box {
    padding: 0 7%;
  }/* ####### AVALIAÇÕES ####### */


  /* ####### RESERVA ####### */
  & .reserva {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 8888;
    height: 3.8rem;
    width:  100%;
    background: white;
    padding: 0 7%;
    box-shadow: 0px -1px 1px 0px rgba(0,0,0,0.1);
    & .reserva-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      & .__reserva-km {
        font-size: 17px;
        font-weight: 500;
      }
      & .__reserva-btn {
        font-size: 16px;
        font-weight: 600;
        background: #81C784;
        color: white;
        padding: .7rem 0;
        width:  11rem;
        border-radius: 4px;
      }
    }
  }/* ####### RESERVA ####### */

}


/* TRANSITIONS */


@media (min-width: 1281px) {
}

</style>
