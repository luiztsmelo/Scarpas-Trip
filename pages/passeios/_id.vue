<template>
  <div class="passeios_id" :class="{ onShare: showShare }">


    <!-- ####### TOPBAR ####### -->
    <div class="topbar" :class="{ topbarBg: scrollTopbar }">
      <div class="topbar-body">
        <nuxt-link to="/">
          <img class="__back-btn" :class="{ topbarBtn: scrollTopbar }" src="../../assets/img/back.svg" alt="voltar">
        </nuxt-link>
        <img class="__share-btn" :class="{ topbarBtn: scrollTopbar }" src="../../assets/img/share.svg" alt="compartilhar" @click="$store.commit('m_showShare', true)">
      </div>
    </div><!-- ####### TOPBAR ####### -->




    <!-- ####### IMAGE ####### -->
    <div class="image-box">
      <swiper :options="swiperOption">
        <swiper-slide class="slide"><img class="__img" :src="image1H(passeio)"></swiper-slide>
        <swiper-slide class="slide" v-if="ifImage2"><img class="__img" :src="image2H(passeio)"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div> 
    <!-- ####### IMAGE ####### -->



    <h1 class="__passeio-title">{{ passeio.title }}</h1>




    <!-- ####### ANUNCIANTE ####### -->
    <div class="anunciante-box">
      <img class="__anunciante-img" :src="passeio.photoURL" alt="">
      <h3 class="__anunciante-name">{{ passeio.proprietario }}</h3>
    </div><!-- ####### ANUNCIANTE ####### -->


    

    <!-- ####### SOBRE ####### -->
    <h1 class="box-title">Sobre</h1>

    <div class="sobre-box">
      <h3>{{ passeio.subtitle }}</h3>
    </div><!-- ####### SOBRE ####### -->





    <!-- ####### LOTACAO ####### -->
    <h1 class="box-title">Lotação</h1>

    <div class="lotacao-box">
      <h3>{{ passeio.lotacao }}</h3>
    </div><!-- ####### LOTACAO ####### -->





    <!-- ####### DURAÇÃO ####### -->
    <h1 class="box-title">Duração</h1>

    <div class="duracao-box">
      <h3>{{ passeio.duracao }}</h3>
    </div><!-- ####### DURAÇÃO ####### -->




    <!-- ####### PONTOS VISITADOS ####### -->
    <h1 class="box-title">Pontos Visitados</h1>

    <div class="pontos-box">
      <h3>Pontos aqui...</h3>
    </div><!-- ####### PONTOS VISITADOS ####### -->




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




    <!-- ####### LOCAL SAÍDA ####### -->
    <h1 class="box-title">Local de Saída</h1>

    <div class="local-saida-box">
      <h3>{{ passeio.localSaida }}</h3>
      <h3>Mapa aqui...</h3>
    </div><!-- ####### LOCAL SAÍDA ####### -->



  
    <!-- ####### AVALIAÇÕES ####### -->
    <h1 class="box-title">Avaliações</h1>

    <div class="avaliacoes-box">
      <h3>Comentários aqui...</h3>
    </div><!-- ####### AVALIAÇÕES ####### -->




    <!-- ####### RESERVA ####### -->
    <transition name="reserva-animation">  
      <div class="reserva" v-show="showReserva">
        <div class="reserva-body">
          <h3 class="__reserva-valor">R${{ passeio.valorPasseio }}<span class="__reserva-valor-pessoa">/pessoa</span></h3>
          <button class="__reserva-btn">Reservar</button>
        </div>
      </div>
    </transition><!-- ####### RESERVA ####### -->
    

    

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
      scrollTopbar: false,
      showReserva: false,
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
          fontSize: '19px',
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
    /* if (store.state.eventos !== null) {
      const eventodata = _.pick(store.state.eventos, [store.state.eventos.eventoID = store.state.getEventoID])
      store.commit('m_evento', evento)
    } else { */
      return firebase.database().ref('passeios/' + params.id).once('value')
      .then(snapshot => {
        store.commit('m_passeio', snapshot.val())
        store.commit('m_showNavbar', false)
        store.commit('m_showFoobar', false)
      })
    /* } */
  },
  methods: {
    image1H (passeio) {
      if (supportsWebP) {
        return passeio.imageH1W
      } else {
        return passeio.imageH1J
      }
    },
    image2H (passeio) {
      if (supportsWebP) {
        return passeio.imageH2W
      } else {
        return passeio.imageH2J
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
    scrollTop () {
      return this.$store.state.scrollTop
    },
    passeio () {
      return this.$store.state.passeio
    },
    ifImage2 () {
      if (this.passeio.imageH2W === null) {
        return
      } else {
        if (supportsWebP) {
          return this.passeio.imageH2W
        } else {
          return this.passeio.imageH2J
        }
      }
    },
    showShare () {
      return this.$store.state.showShare
    }
  },
  watch: {
    scrollTop(value) {
      if (value >= 250) {
        return this.showReserva = true, this.scrollTopbar = true
      } else {
        return this.showReserva = false, this.scrollTopbar = false
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

.passeios_id {
  display: flex;
  flex-flow: column;
  background-color: white;
  margin-bottom: 5.1rem;
  transition: all .3s cubic-bezier(.15,.97,.43,.93);
  


  /* ####### TOPBAR ####### */
  & .topbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    height: 3.1rem;
    width:  100%;
    background: transparent;
    padding: 0 7%;
    transition: all .6s ease;
    & .topbar-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      & .__back-btn {
        transform: translateY(1px);/* A imagem ta errada */
        cursor: pointer;
        width: 1.2rem;
        height: auto;
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
    font-size: 15px;
    padding: 3rem 7% .5rem 7%;
  }

  & .__passeio-title {
    padding: 0 7%;
    margin: 1rem 0 0 0;
    font-size: 32px;
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




  /* ####### LOTACAO BOX ####### */
  & .lotacao-box {
    padding: 0 7%;
  }/* ####### LOTACAO BOX ####### */





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
    height: 3.3rem;
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
        color: var(--color01);
        font-size: 20px;
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
}
.topbarBtn {
  filter: invert(65%);
}

@media (min-width: 1281px) {
  .eventos_id {
    /* padding: 0 13%; */
  }
}

/* TRANSITIONS */
.reserva-animation-enter,
.reserva-animation-leave-active {
  transform: translateY(100%)
}
</style>
