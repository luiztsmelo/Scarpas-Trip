<template>
  <div class="acomods_id" :class="{ onShare: showShare }">


    <!-- ####### TOPBAR ####### -->
    <transition name="topbar-animation">
      <div class="topbar" :class="{ topbarBg: scrollTopbar }" v-show="showTopbar">
        <div class="topbar-body">
          <nuxt-link to="/">
            <img class="__back-btn" :class="{ topbarBtn: scrollTopbar }" src="../../assets/img/back.svg" alt="voltar">
          </nuxt-link>
          <img class="__share-btn" :class="{ topbarBtn: scrollTopbar }" src="../../assets/img/share.svg" alt="compartilhar" @click="$store.commit('m_showShare', true)">
        </div>
      </div>
    </transition><!-- ####### TOPBAR ####### -->




    <!-- ####### IMAGE ####### -->
    <div class="image-box">
      <swiper :options="swiperOption">
        <swiper-slide class="slide"><img class="__img" :src="image1H(acomod)"></swiper-slide>
        <swiper-slide class="slide" v-if="ifImage2"><img class="__img" :src="image2H(acomod)"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div> 
    <!-- ####### IMAGE ####### -->



    <h1 class="__acomod-title">{{ acomod.title }}</h1>




    <!-- ####### ANUNCIANTE ####### -->
    <div class="anunciante-box">
      <img class="__anunciante-img" :src="acomod.photoURL" alt="">
      <h3 class="__anunciante-name">{{ acomod.proprietario }}</h3>
    </div><!-- ####### ANUNCIANTE ####### -->


    

    <!-- ####### SOBRE ####### -->
    <h1 class="box-title">Sobre</h1>

    <div class="sobre-box">
      <h3>{{ acomod.subtitle }}</h3>
    </div><!-- ####### SOBRE ####### -->





    <!-- ####### CAPACIDADE ####### -->
    <h1 class="box-title">Capacidade</h1>

    <div class="capacidade-box">
      <h3>{{ acomod.totalHospedes }} hóspedes</h3>
    </div><!-- ####### CAPACIDADE ####### -->





    <!-- ####### DISPONIBILIDADE ####### -->
    <h1 class="box-title">Disponibilidade</h1>

    <v-calendar
      mode='single'
      :month-labels='monthLabels'
      :weekday-labels='weekdayLabels'
      :theme-styles='themeStyles'
      is-inline
      >
    </v-calendar>
    <!-- ####### DISPONIBILIDADE ####### -->




    <!-- ####### LOCALIZAÇÃO ####### -->
    <h1 class="box-title">Local</h1>

    <div class="local-box">
      <h3>Mapa aqui...</h3>
    </div><!-- ####### LOCALIZAÇÃO ####### -->



  
    <!-- ####### AVALIAÇÕES ####### -->
    <h1 class="box-title">Avaliações</h1>

    <div class="avaliacoes-box">
      <h3>Comentários aqui...</h3>
    </div><!-- ####### AVALIAÇÕES ####### -->




    <!-- ####### RESERVA ####### --> 
    <div class="reserva">
      <div class="reserva-body">
        <h3 class="__reserva-valor">R${{ acomod.valorDiaria }}<span class="__reserva-valor-pessoa">/pessoa</span></h3>
        <button class="__reserva-btn">Reservar</button>
      </div>
    </div>
    <!-- ####### RESERVA ####### -->
    

    

  </div>
</template>

<script>
/* import _ from 'lodash' */
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
        autoplay: 2222
      },
      markerIcon: {
        url: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fmarker.svg?alt=media&token=fcbfd76e-ee93-41e8-a816-98906e19859b',
        scaledSize: new google.maps.Size(42, 42)
      },
      monthLabels: ['Janeiro','Favereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
      weekdayLabels: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      themeStyles: {
        wrapper: {
          color: 'rgb(72,72,72)',
          border: '0',
          padding: '6px 9px 0 9px',
          background: 'white',
          width: '100%'
        },
        header: {
          padding: '0 9px',
        },
        headerArrows: {
          fontSize: '1.4rem',
        },
        headerTitle: {
          fontSize: '18px',
          fontWeight: '300'
        },
        weekdays: {
          color: 'rgb(72,72,72)',
          fontWeight: '600',
          padding: '20px 5px 10px 5px',
        },
        dayContent: {
          fontWeight: '300',
          fontSize: '16px',
        }
      }  
    }
  },
  head () {
    return {
      title: this.$store.state.acomod.title + ' ‒ ' + 'Escarpas Trip',
      meta: [
        { hid: 'description', name: 'description', content: this.$store.state.acomod.subtitle },
        { property: 'og:url', content: 'https://escarpastrip.com/acomods/' + this.$route.params.id },
        { property: 'og:title', content: this.$store.state.acomod.title },
        { property: 'og:description', content: this.$store.state.acomod.subtitle },
        { property: 'og:image', content: this.$store.state.acomod.imageH1J },
        { property: 'og:site_name', content: 'Escarpas Trip' }
      ]
    }
  },
  transition: 'evento',
  fetch ({ store, params }) {
    return firebase.database().ref('acomodacoes/' + params.id).once('value')
    .then(snapshot => {
      store.commit('m_acomod', snapshot.val())
      store.commit('m_showNavbar', false)
      store.commit('m_showFoobar', false)
    })
  },
  methods: {
    image1H (acomod) {
      if (supportsWebP) {
        return acomod.imageH1W
      } else {
        return acomod.imageH1J
      }
    },
    image2H (acomod) {
      if (supportsWebP) {
        return acomod.imageH2W
      } else {
        return acomod.imageH2J
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
    acomod () {
      return this.$store.state.acomod
    },
    ifImage2 () {
      if (this.acomod.imageH2W === null) {
        return
      } else {
        if (supportsWebP) {
          return this.acomod.imageH2W
        } else {
          return this.acomod.imageH2J
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

.acomods_id {
  display: flex;
  flex-flow: column;
  background-color: white;
  margin-bottom: 5.3rem;
  transition: all .27s cubic-bezier(.15,.97,.43,.93);
  


  /* ####### TOPBAR ####### */
  & .topbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    height: 3rem;
    width:  100%;
    background: transparent;
    padding: 0 7%;
    transition: all .5s ease;
    & .topbar-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      & a {
        /* Aumentar área de contato */
        padding: 1rem;
        transform: translateX(-1rem);
        & .__back-btn {
          transform: translateY(2px);/* A imagem ta errada */
          cursor: pointer;
          width: 1.1rem;
          height: auto;
        }
      }
      & .__share-btn {
        cursor: pointer;
        width: 1.5rem;
        height: auto;
      }
    }
  }/* ####### TOPBAR ####### */



  & .box-title {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 14px;
    padding: 3rem 7% .5rem 7%;
  }

  & .__acomod-title {
    padding: 0 7%;
    margin: 1rem 0 0 0;
    font-size: 31px;
    font-weight: 600;
  }



  /* ####### IMAGE BOX ####### */
  & .image-box {
    overflow: hidden;
    & .swiper-container {
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
      & .swiper-pagination {

        & .swiper-pagination-bullet {

        }
      }
    }
  }/* ####### IMAGE BOX ####### */


  
  /* ####### ANUNCIANTE BOX ####### */
  & .anunciante-box {
    display: flex;
    padding: 1.5rem 7% 0 7%;
    align-items: center;
    & .__anunciante-img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
    & .__anunciante-name {
      padding-left: .5rem;
    }
  }/* ####### ANUNCIANTE BOX ####### */




  /* ####### SOBRE BOX ####### */
  & .sobre-box {
    padding: 0 7%;
  }/* ####### SOBRE BOX ####### */




  /* ####### CAPACIDADE BOX ####### */
  & .capacidade-box {
    padding: 0 7%;
  }/* ####### CAPACIDADE BOX ####### */





  /* ####### DISPONIBILIDADE ####### */




  /* ####### LOCAL ####### */
  & .local-box {
    padding: 0 7%;
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
    height: 3.5rem;
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
      & .__reserva-valor {
        color: var(--color01);
        font-size: 19px;
        font-weight: 400;
      }
      & .__reserva-valor-pessoa {
        font-size: 15px;
      }
      & .__reserva-btn {
        font-size: 16px;
        background: #49A5FC;
        color: white;
        padding: .6rem 1.2rem;
        border-radius: 4px;
      }
    }
  }/* ####### RESERVA ####### */

}

.onShare {
  filter: brightness(30%);
}
.topbarBg {
  background: white !important;
  box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.1);
}
.topbarBtn {
  filter: invert(65%);
}

/* TRANSITIONS */

.topbar-animation-enter,
.topbar-animation-leave-active {
  transform: translateY(-100%);
}

@media (min-width: 1281px) {
}

</style>
