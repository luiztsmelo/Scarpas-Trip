<template>
  <div class="atracoes-id">


    <!-- ####### TOPBAR ####### -->
      <div class="topbar" v-scroll="scrollTopbarBg">
        <div class="topbar-body">
          
          <div class="back-box" @click="backBtn">
            <img class="__back-btn" v-scroll="scrollTopbarBtns" src="../../assets/img/back.svg" alt="voltar">
          </div>

          <div class="share-box" @click="$store.commit('m_showShare', true), hashShare()">
            <img class="__share-btn" v-scroll="scrollTopbarBtns" src="../../assets/img/share.svg" alt="compartilhar">
          </div>
          
        </div>
      </div><!-- ####### TOPBAR ####### -->




    <!-- ####### IMAGE ####### -->
    <div class="image-box" ref="imageBox">
      <swiper :options="swiperOptions">

        <swiper-slide class="slide">
          <progressive-background class="__img" :src="image1H(atracao)" :placeholder="atracao.imageL1" :aspect-ratio="2/3"/>
        </swiper-slide>

        <swiper-slide class="slide" v-if="ifImage2">
          <progressive-background class="__img" :src="image2H(atracao)" :placeholder="atracao.imageL2" :aspect-ratio="2/3"/>
        </swiper-slide>

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
          :icon="{ url: $store.state.markerUrlPartida, scaledSize: $store.state.markerSize }">
        </gmap-marker>
        <!-- Marcador chegada -->
        <gmap-marker
          v-if="atracao.rota !== {}"
          :position="atracao.rota.slice(-1)[0]"
          :icon="{ url: $store.state.markerUrlChegada, scaledSize: $store.state.markerSize }">
        </gmap-marker>
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
import firebase from 'firebase/app'
import 'firebase/firestore'
import supportsWebP from 'supports-webp'
import { mapstyle } from '../../mixins/mapstyle'
import { swiperOptions } from '../../mixins/swiper_id'


export default {
  mixins: [ mapstyle, swiperOptions ],
  data () {
    return {
      polylineOptions: {
        strokeColor: '#2a2a2a',
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
  transition: 'id',
  fetch ({ store, params }) {
    store.commit('m_loader', true)
    return firebase.firestore().collection('atracoes').doc(params.id).get()
    .then(doc => {
      store.commit('m_atracao', doc.data())
      store.commit('m_loader', false)
      if (store.state.isMobile === true) {
        store.commit('m_showNavbar', false)
        store.commit('m_showFoobar', false)
      }
      if (doc.exists) {
        firebase.firestore().collection('atracoes').doc(params.id).collection('visits').add({ 
          date: new Date().getTime(),
          fromMobile: store.state.isMobile,
          clickedReservaBtn: false,
          wentToReservaPage: false,
          concludedReserva: false
        })
        .then(doc => store.state.visitID = doc.id)
        .catch(err => console.log(err))
      }
    })
    .catch(err => {
      store.commit('m_loader', false)
      console.log(err)
    })
  },
  methods: {
    scrollTopbarBg (evt, el) {
      return window.scrollY >= this.$store.state.heightImageBox
        ? el.setAttribute("style", "background: white; box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.1)")
        : el.removeAttribute("style")
    },
    scrollTopbarBtns (evt, el) {
      return window.scrollY >= this.$store.state.heightImageBox
        ? el.setAttribute("style", "filter: invert(90%)")
        : el.removeAttribute("style")
    },
    backBtn () {
      window.history.back(1)
    },
    hashShare () {
       window.location.hash = "compartilhar"
    },
    image1H (atracao) {
      return supportsWebP ? atracao.imageH1W : atracao.imageH1J
    },
    image2H (atracao) {
      return supportsWebP ? atracao.imageH2W : atracao.imageH2J
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
  async mounted () {
    this.$store.state.heightImageBox === null ? this.$store.state.heightImageBox = this.$refs.imageBox.clientHeight : null
  },
  computed: {
    atracao () {
      return this.$store.state.atracao
    },
    ifImage2 () {
      return this.atracao.imageH2W === null ? '' : supportsWebP ? this.atracao.imageH2W : this.atracao.imageH2J
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
      next()
    }
  }
}
</script>

<style>
@import url('~/assets/css/main.css');
@import url('~/assets/css/_id.css');

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
        line-height: 2.6rem;
        height: 2.7rem;
        width:  11rem;
        border-radius: 5px;
      }
    }
  }/* ####### RESERVA ####### */

}


/* TRANSITIONS */


@media (min-width: 1281px) {
}

</style>
