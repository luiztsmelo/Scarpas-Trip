<template>
  <div class="passeios_id">


    <!-- ####### TOPBAR ####### -->
    <transition name="topbar-animation">
      <div class="topbar" :class="{ topbarBg: scrollTopbar }" v-show="showTopbar">
        <div class="topbar-body">

          <div class="back-box" @click="backBtn">
            <img class="__back-btn" :class="{ topbarBtn: scrollTopbar }" src="../../assets/img/back.svg" alt="voltar">
          </div>
          
          <div class="share-box" @click="$store.commit('m_showShare', true), hashShare()">
            <img class="__share-btn" :class="{ topbarBtn: scrollTopbar }" src="../../assets/img/share.svg" alt="compartilhar" >
          </div>

        </div>
      </div>
    </transition><!-- ####### TOPBAR ####### -->




    <!-- ####### IMAGE ####### -->
    <div class="image-box">
      <swiper :options="swiperOption">

        <swiper-slide class="slide">
          <progressive-img class="__img" :src="image1H(passeio)" :placeholder="passeio.imageL1" :aspect-ratio="0.66"/>
        </swiper-slide>

        <swiper-slide class="slide" v-if="ifImage2">
          <progressive-img class="__img" :src="image2H(passeio)" :placeholder="passeio.imageL1" :aspect-ratio="0.66"/>
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div> 
    <!-- ####### IMAGE ####### -->



    <h1 class="id-title">{{ passeio.title }}</h1>




    <!-- ####### ANUNCIANTE ####### -->
    <div class="anunciante-box" @click="$store.commit('m_showProprietario', true), hashProprietario()">
      <img class="__anunciante-img" :src="passeio.photoURL" alt="">
      <div class="box-flex-column">
        <h3 style="user-select:none">Guiado por</h3>
        <a class="__anunciante-name">{{ passeio.proprietario }}</a>
      </div>
    </div><!-- ####### ANUNCIANTE ####### -->


    

    <!-- ####### SOBRE ####### -->
    <h1 class="item-title">Sobre o Passeio</h1>

    <div class="sobre-box">
      <h3>{{ passeio.subtitle }}</h3>
    </div><!-- ####### SOBRE ####### -->





    <!-- ####### CAPACIDADE ####### -->
    <h1 class="item-title">Capacidade</h1>

    <div class="capacidade-box">
      <h3>{{ passeio.capacidade }}</h3>
    </div><!-- ####### CAPACIDADE ####### -->





    <!-- ####### DURAÇÃO ####### -->
    <h1 class="item-title">Duração</h1>

    <div class="duracao-box">
      <h3>{{ passeio.duracao }}</h3>
    </div><!-- ####### DURAÇÃO ####### -->




    <!-- ####### PONTOS VISITADOS ####### -->
    <h1 class="item-title">Pontos Visitados</h1>

    <div class="pontos-box">
      <h3>Pontos aqui...</h3>
    </div><!-- ####### PONTOS VISITADOS ####### -->




    <!-- ####### DISPONIBILIDADE ####### -->
    <h1 class="item-title">Disponibilidade</h1>

    <v-calendar
      mode='single'
      :month-labels='monthLabels'
      :weekday-labels='weekdayLabels'
      :theme-styles='themeStyles'
      is-inline
      >
    </v-calendar>
    <!-- ####### DISPONIBILIDADE ####### -->




    <!-- ####### LOCAL SAÍDA ####### -->
    <h1 class="item-title">Local de Saída</h1>

    <div class="local-saida-box">
      <h3>{{ passeio.localSaida }}</h3>
      <h3>Mapa aqui...</h3>
    </div><!-- ####### LOCAL SAÍDA ####### -->



  
    <!-- ####### AVALIAÇÕES ####### -->
    <h1 class="item-title">Avaliações</h1>

    <div class="avaliacoes-box">
      <h3>Comentários aqui...</h3>
    </div><!-- ####### AVALIAÇÕES ####### -->




    <!-- ####### RESERVA ####### --> 
    <div class="reserva">
      <div class="reserva-body">
        <h3 class="__reserva-valor">R${{ passeio.valorPasseio }}<span class="__reserva-valor-pessoa">/pessoa</span></h3>
        <button class="__reserva-btn">Reservar Passeio</button>
      </div>
    </div>
    <!-- ####### RESERVA ####### -->
    
    <proprietario/>
    
  </div>
</template>

<script>
import { loaded } from '~/node_modules/vue2-google-maps/src/manager'
import Proprietario from '../../components/Proprietario'
import supportsWebP from 'supports-webp'
import { mapstyle } from '../../mixins/mapstyle'
import * as firebase from 'firebase'
require('firebase/firestore')

export default {
  components: { Proprietario },
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
      monthLabels: ['Janeiro','Favereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
      weekdayLabels: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      themeStyles: {
        wrapper: {
          color: 'rgb(62, 62, 62)',
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
          fontSize: '16px',
          fontWeight: '400'
        },
        weekdays: {
          color: 'rgb(62, 62, 62)',
          fontWeight: '700',
          padding: '15px 5px 8px 5px',
        },
        dayCell: {
          height: '30px'
        },
        dayContent: {
          fontWeight: '400',
          fontSize: '15px',
        }
      }  
    }
  },
  head () {
    return {
      title: this.$store.state.passeio.title + ' ‒ ' + 'Escarpas Trip',
      meta: [
        { hid: 'description', name: 'description', content: this.$store.state.passeio.subtitle },
        { property: 'og:url', content: 'https://escarpastrip.com/passeios/' + this.$route.params.id },
        { property: 'og:title', content: this.$store.state.passeio.title },
        { property: 'og:description', content: this.$store.state.passeio.subtitle },
        { property: 'og:image', content: this.$store.state.passeio.imageH1J },
        { property: 'og:site_name', content: 'Escarpas Trip' }
      ]
    }
  },
  transition: 'evento',
  fetch ({ store, params }) {
    return firebase.firestore().collection('passeios').doc(params.id).get().then(doc => {
      store.commit('m_passeio', doc.data())
      store.commit('m_showNavbar', false)
      store.commit('m_showFoobar', false)
    })
  },
  methods: {
    backBtn () {
      window.history.back(1)
    },
    hashProprietario () {
       window.location.hash = "contato"
    },
    hashShare () {
       window.location.hash = "compartilhar"
    },
    image1H (passeio) {
      return supportsWebP ? passeio.imageH1W : passeio.imageH1J
    },
    image2H (passeio) {
      return supportsWebP ? passeio.imageH2W : passeio.imageH2J
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
    scrollY () {
      return this.$store.state.scrollY
    },
    passeio () {
      return this.$store.state.passeio
    },
    ifImage2 () {
      return this.passeio.imageH2W === null ? '' : supportsWebP ? this.passeio.imageH2W : this.passeio.imageH2J
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

.passeios_id {
  display: flex;
  flex-flow: column;
  background-color: white;
  margin-bottom: 5.5rem;
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


  
  /* ####### ANUNCIANTE BOX ####### */
  & .anunciante-box {
    display: flex;
    padding: 1.5rem 7% 0 7%;
    align-items: center;
    & .__anunciante-img {
      width: 3.3rem;
      height: 3.3rem;
      border-radius: 50%;
      user-select: none;
      margin-right: .6rem;
    }
    & .__anunciante-name {
      color: #00BAAC;
      user-select: none;
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





  /* ####### DURAÇÃO ####### */
  & .duracao-box {
    padding: 0 7%;
  }/* ####### DURAÇÃO ####### */




  /* ####### PONTOS VISITADOS ####### */
  & .pontos-box {
    padding: 0 7%;
  }/* ####### PONTOS VISITADOS ####### */




  /* ####### DISPONIBILIDADE ####### */




  /* ####### LOCAL SAÍDA ####### */
  & .local-saida-box {
    padding: 0 7%;
  }/* ####### LOCAL SAÍDA ####### */





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
    user-select: none;
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
      & .__reserva-valor-pessoa {
        font-size: 14px;
      }
      & .__reserva-btn {
        font-size: 16px;
        font-weight: 600;
        background: #198CFE;
        color: white;
        line-height: 2.6rem;
        height: 2.7rem;
        width:  11rem;
        border-radius: 4px;
      }
    }
  }/* ####### RESERVA ####### */

}


/* TRANSITIONS */



@media (min-width: 1281px) {
  .passeios {
    /* padding: 0 13%; */
  }
}

</style>
