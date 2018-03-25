<template>
  <div class="eventos-id">

    <!-- ####### TOPBAR ####### -->
    <div class="topbar" :class="{ topbarBg: scrollTopbar }">
      <div class="topbar-body">

        <div class="back-box" @click="backBtn">
          <img class="__back-btn" :class="{ topbarBtn: scrollTopbar }" src="../../assets/img/back.svg" alt="voltar">
        </div>
        
        <div class="share-box" @click="$store.commit('m_showShare', true), hashShare()">
          <img class="__share-btn" :class="{ topbarBtn: scrollTopbar }" src="../../assets/img/share.svg" alt="compartilhar" >
        </div>

      </div>
    </div><!-- ####### TOPBAR ####### -->




    <!-- ####### IMAGE ####### -->
    <div class="image-box">
      <swiper :options="swiperOption">

        <swiper-slide class="slide">
          <progressive-img class="__img" :src="image1H(evento)" :placeholder="evento.imageL1" :aspect-ratio="0.66"/>
        </swiper-slide>

        <swiper-slide class="slide" v-if="ifImage2">
          <progressive-img class="__img" :src="image2H(evento)" :placeholder="evento.imageL1" :aspect-ratio="0.66"/>
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div> 
    <!-- ####### IMAGE ####### -->




    <h1 class="id-title">{{ evento.title }}</h1>




    <!-- ####### DATA E HORÁRIO ####### -->
    <div class="date-hour-box">
      <h3 class="__date">{{ date }}&#160;&#8231;&#160;</h3>
      <h3 class="__hour">{{ evento.hour }}</h3>
    </div><!-- ####### DATA E HORÁRIO ####### -->




    <!-- ####### SOBRE ####### -->
    <h1 class="item-title">Sobre o Evento</h1>

    <div class="sobre-box">
      <h3>{{ evento.subtitle }}</h3>
    </div><!-- ####### SOBRE ####### -->

    


    <!-- ####### VALOR DO INGRESSO ####### -->
    <h1 class="item-title">Valor do Ingresso</h1>

    <div class="ingresso-box">

      <div class="gender-box">
        <img class="__img" src="../../assets/img/woman.svg">
        <h3 style="transform:translateX(2px)">R${{ evento.valorIngresso }}</h3>
      </div>

      <div class="gender-box">
        <img class="__img" src="../../assets/img/man.svg">
        <h3>R${{ evento.valorIngresso }}</h3>
      </div>
      
    </div><!-- ####### VALOR DO INGRESSO ####### -->




    <!-- ####### LOCAL ####### -->
    <h1 class="item-title">Local</h1>
    
    <div class="local-box" >

      <h3 class="__adress">{{ evento.address }}</h3>

      <gmap-map
      :center="{lat: evento.positionLAT, lng: evento.positionLNG}"
      :zoom="15"
      :options="{styles: styles, draggable:false, fullscreenControl:false, zoomControl:false, mapTypeControl:false, streetViewControl:false}"
      style="width: 100%; height: 250px"
      @click="$store.commit('m_eventoMap', evento), enterFullscreen()">
        <Gmap-Marker
        :position="{lat: evento.positionLAT, lng: evento.positionLNG}"
        :icon="{url: markerUrl, scaledSize: markerSize}"
        ></Gmap-Marker>
      </gmap-map>
    </div><!-- ####### LOCAL ####### -->
    


    <!-- ####### RESERVA ####### -->
    <div class="reserva">
      <div class="reserva-body">
        <h3 class="__reserva-valor">R${{ evento.valorIngresso }}</h3>
        <button class="__reserva-btn">Comprar Ingresso</button>
      </div>
    </div><!-- ####### RESERVA ####### -->


    

  </div>
</template>

<script>
import { loaded } from '~/node_modules/vue2-google-maps/src/manager'
import supportsWebP from 'supports-webp'
import { mapstyle } from '../../mixins/mapstyle'
import * as firebase from 'firebase'
require('firebase/firestore')

export default {
  mixins: [mapstyle],
  data () {
    return {
      scrollTopbar: false,
      swiperOption: {
        pagination: '.swiper-pagination',
        dynamicBullets: true,
        autoplay: 2222
      }
    }
  },
  head () {
    return {
      title: this.$store.state.evento.title + ' ‒ ' + 'Escarpas Trip',
      meta: [
        { hid: 'description', name: 'description', content: this.$store.state.evento.subtitle },
        { property: 'og:url', content: 'https://escarpastrip.com/eventos/' + this.$route.params.id },
        { property: 'og:title', content: this.$store.state.evento.title },
        { property: 'og:description', content: this.$store.state.evento.subtitle },
        { property: 'og:image', content: this.$store.state.evento.imageH1J },
        { property: 'og:site_name', content: 'Escarpas Trip' }
      ]
    }
  },
  transition: 'evento',
  fetch ({ store, params }) {
    return firebase.firestore().collection('eventos').doc(params.id).get().then(doc => {
      store.commit('m_evento', doc.data())
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
    image1H (evento) {
      return supportsWebP ? evento.imageH1W : evento.imageH1J
    },
    image2H (evento) {
      return supportsWebP ? evento.imageH2W : evento.imageH2J
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
    loaded.then(() => {
      this.$store.state.googleMapsInitialized = true
    })
  },
  computed: {
    markerUrl () {
      return 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fmarker.svg?alt=media&token=fcbfd76e-ee93-41e8-a816-98906e19859b'
    },
    markerSize () {
      return !this.$store.state.googleMapsInitialized ? null : new window.google.maps.Size(38, 38)
    },
    date () {
      const eventoDate = this.$store.state.evento.date
      let d = eventoDate.slice(0, 2)
      let m = eventoDate.slice(3, 5)
      let y = eventoDate.slice(6, 10)
      let dateStr = m + '/' + d + '/' + y
      let date = new Date(dateStr)
      /* longWeekday = segunda-feira */
      let longWeekday = date.toLocaleDateString('pt-BR', { weekday: 'long' })
      /* shortWeekday = segunda */
      let shortWeekday = longWeekday.substring(0, longWeekday.lastIndexOf('-'))
      /* shortWeekdayUppercase = Segunda */
      let shortWeekdayUppercase = shortWeekday.charAt(0).toUpperCase() + shortWeekday.slice(1)
      let month = date.toLocaleString('pt-BR', { month: "short" });
      if (longWeekday !== 'sábado' && longWeekday !== 'domingo') {
        return shortWeekdayUppercase + ', ' + d + ' ' + month
      } else {
        let fdsUppercase = longWeekday.charAt(0).toUpperCase() + longWeekday.slice(1)
        return fdsUppercase + ', ' + d + ' ' + month
      }
      
    },
    evento () {
      return this.$store.state.evento
    },
    ifImage2 () {
      return this.evento.imageH2W === null ? '' : supportsWebP ? this.evento.imageH2W : this.evento.imageH2J
    },
    showShare () {
      return this.$store.state.showShare
    },
    scrollY () {
      return this.$store.state.scrollY
    }
  },
  watch: {
    scrollY (value) {
      value > 250 ? this.scrollTopbar = true : this.scrollTopbar = false
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

.eventos-id {
  display: flex;
  flex-flow: column;
  background-color: white;
  margin-bottom: 3.8rem;
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




  /* ####### DATA E HORÁRIO ####### */
  & .date-hour-box {
    display: flex;
    padding: 0 7%;
    margin-top: 1rem;
    & .__date {
      font-size: 19px;
      font-weight: 400;
    }
    & .__hour {
      font-size: 19px;
      font-weight: 400;
    }
  }/* ####### DATA E HORÁRIO ####### */




  /* ####### SOBRE BOX ####### */
  & .sobre-box {
    padding: 0 7%;
    & .__subtitle {
    }
  }/* ####### SOBRE BOX ####### */




  /* ####### VALOR INGRESSO ####### */
  & .ingresso-box {
    display: flex;
    flex-flow: row;
    padding: 0 7%;
    & .gender-box {
      padding: 0 1.4rem 0 0;
      display: flex;
      align-items: center;
      & .__img {
        margin-right: .3rem;
        width: 1.6rem;
        height: auto;
      }
    }
    
  }/* ####### VALOR INGRESSO ####### */




  /* ####### LOCAL ####### */
  & .local-box {
    & .__adress {
      padding: 0 7% .6rem 7%;
    }
  }/* ####### LOCAL ####### */




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
    transition: all .5s ease;
    & .reserva-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      & .__reserva-valor {
        font-size: 17px;
        font-weight: 500;
      }
      & .__reserva-btn {
        font-size: 16px;
        font-weight: 600;
        background: #FF7D6C;
        color: white;
        line-height: 2.6rem;
        height: 2.7rem;
        width:  11rem;
        border-radius: 4px;
      }
    }
  }/* ####### RESERVA ####### */
}


@media (min-width: 1281px) {
  .eventos_id {
    /* padding: 0 13%; */
  }
}
</style>
