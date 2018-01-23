<template>
  <div class="acomods-id">


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
    <h1 class="box-title">Sobre {{ tipoAcomodText }}</h1>

    <div class="sobre-box">
      <h3>{{ acomod.subtitle }}</h3>
    </div><!-- ####### SOBRE ####### -->





    <!-- ####### CARACTERÍSTICAS ####### -->
    <h1 class="box-title">Características</h1>

    <div class="caracteristicas-box">
      
      <div class="__item-caracteristica">
        <img class="__img-caracteristica" src="../../assets/img/quarto.svg">
        <h3>{{ acomod.totalQuartos }} quartos ({{ acomod.totalSuites }} suítes)</h3>
      </div>

      <div class="__item-caracteristica">
        <img class="__img-caracteristica" src="../../assets/img/banheiro.svg" style="transform: scale(1.06)">
        <h3>{{ acomod.totalBanheiros }} banheiros</h3>
      </div>

      <div class="__item-caracteristica">
        <img class="__img-caracteristica" src="../../assets/img/garagem.svg" style="transform: scale(1.01)">
        <h3>{{ acomod.totalGaragem }} vagas na garagem</h3>
      </div>

    </div><!-- ####### CARACTERÍSTICAS ####### -->






    <!-- ####### CAPACIDADE ####### -->
    <h1 class="box-title">Capacidade</h1>

    <div class="capacidade-box">
      <h3>{{ acomod.totalHospedes }} pessoas</h3>
    </div><!-- ####### CAPACIDADE ####### -->





    <!-- ####### COMODIDADES ####### -->
    <h1 class="box-title">Comodidades</h1>

    <div class="comodidades-box" @click="showComods = true">
      <img class="__img-comodidade" v-if="acomod.hasRoupasCama" src="../../assets/img/hasRoupasCama.svg" style="transform: scale(1.01)">
      <img class="__img-comodidade" v-if="acomod.hasPiscina" src="../../assets/img/hasPiscina.svg">
      <img class="__img-comodidade" v-if="acomod.hasChurrasqueira" src="../../assets/img/hasChurrasqueira.svg">
      <img class="__img-comodidade" v-if="acomod.hasCozinha" src="../../assets/img/hasCozinha.svg" style="transform: scale(1.07)">
      <img class="__img-comodidade" v-if="acomod.hasWifi" src="../../assets/img/hasWifi.svg" style="transform: scale(.98)">
      <img class="__img-comodidade" v-if="acomod.hasArCond" src="../../assets/img/hasArCond.svg">
      <img class="__img-comodidade" v-if="acomod.hasCaixaSom" src="../../assets/img/hasCaixaSom.svg" style="transform: scale(.92)">
      <img class="__img-comodidade" v-if="acomod.hasBarracas" src="../../assets/img/hasBarracas.svg" style="transform: scale(1.1)">
      <img class="__img-comodidade" v-if="acomod.hasPier" src="../../assets/img/hasPier.svg">
    </div>

    <transition name="comods-animation">
      <div class="comods-details" v-show="showComods">

        <div class="back-box">
          <div class="back-body">
            <img class="__back-btn" src="../../assets/img/back.svg" alt="voltar" @click="showComods = false">
          </div>
        </div>

        <div class="comods-body">
  
          <h1 class="__title">Comodidades</h1>

          <div class="comods-item" v-if="acomod.hasRoupasCama">
            <img src="../../assets/img/hasRoupasCama.svg" class="__img" style="transform: scale(1.01)">
            <h3>Roupas de Cama e Toalhas</h3>
          </div>
          <div class="comods-item" v-if="acomod.hasPiscina">
            <img src="../../assets/img/hasPiscina.svg" class="__img">
            <h3>Piscina</h3>
          </div>
          <div class="comods-item" v-if="acomod.hasChurrasqueira">
            <img src="../../assets/img/hasChurrasqueira.svg" class="__img">
            <h3>Churrasqueira</h3>
          </div>
          <div class="comods-item" v-if="acomod.hasCozinha">
            <img src="../../assets/img/hasCozinha.svg" class="__img" style="transform: scale(1.07)">
            <h3>Cozinha Preparada</h3>
          </div>
          <div class="comods-item" v-if="acomod.hasWifi">
            <img src="../../assets/img/hasWifi.svg" class="__img" style="transform: scale(.98)">
            <h3>WiFi</h3>
          </div>
          <div class="comods-item" v-if="acomod.hasArCond">
            <img src="../../assets/img/hasArCond.svg" class="__img">
            <h3>Ar Condicionado</h3>
          </div>
          <div class="comods-item" v-if="acomod.hasCaixaSom">
            <img src="../../assets/img/hasCaixaSom.svg" class="__img" style="transform: scale(.92)">
            <h3>Caixa de Som</h3>
          </div>
          <div class="comods-item" v-if="acomod.hasBarracas">
            <img src="../../assets/img/hasBarracas.svg" class="__img" style="transform: scale(1.1)">
            <h3>Barracas</h3>
          </div>
          <div class="comods-item" v-if="acomod.hasPier">
            <img src="../../assets/img/hasPier.svg" class="__img">
            <h3>Pier</h3>
          </div>


        </div> 
      </div>
    </transition><!-- ####### COMODIDADES ####### -->





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

      <h3 class="__adress">{{ acomod.address }}</h3>

      <gmap-map
      :center="{lat: acomod.positionLAT, lng: acomod.positionLNG}"
      :zoom="15"
      :options="{styles: styles, draggable:false, fullscreenControl:false, zoomControl:false, mapTypeControl:false, streetViewControl:false}"
      style="width: 100%; height: 250px"
      @click="$store.commit('m_acomodMap', acomod), enterFullscreen()">
        <Gmap-Marker
        :position="{lat: acomod.positionLAT, lng: acomod.positionLNG}"
        :icon="markerIcon"
        ></Gmap-Marker>
      </gmap-map>
    </div><!-- ####### LOCALIZAÇÃO ####### -->



  
    <!-- ####### AVALIAÇÕES ####### -->
    <h1 class="box-title">Avaliações</h1>

    <div class="avaliacoes-box">
      <h3>Comentários aqui...</h3>
    </div><!-- ####### AVALIAÇÕES ####### -->




    <!-- ####### RESERVA ####### --> 
    <div class="reserva">
      <div class="reserva-body">
        <h3 class="__reserva-valor">R${{ acomod.valorDiariaNormal }}<span class="__reserva-valor-pessoa">/dia</span></h3>
        <button class="__reserva-btn">Reservar Estadia</button>
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
      showComods: false,
      showTopbar: true,
      scrollTopbar: false,
      swiperOption: {
        pagination: '.swiper-pagination',
        dynamicBullets: true,
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
    tipoAcomodText () {
      const path = this.acomod.tipoAcomod
      return path === 'Casa' ? 'a casa' 
           : path === 'Apartamento' ? 'o apartamento'
           : path === 'Rancho' ? 'o rancho'
           : path === 'Chácara' ? 'a chácara'
           : path === 'Pousada' ? 'a pousada'
           : path === 'Camping' ? 'o camping'
           : path === 'Sítio' ? 'o sítio'
           : path === 'Fazenda' ? 'a fazenda'
           : path === 'Hostel' ? 'o hostel'
           : ''
    },
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

.acomods-id {
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
          width: 1.05rem;
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
    font-size: 30px;
    font-weight: 600;
  }



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
      & .swiper-pagination {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: .5rem;
        left: 50%;
        transform: translateX(-50%);
        width: 7rem;
        height: 1rem;
        & .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          margin: 0 .1rem;
          display: inline-block;
          border-radius: 100%;
          background: #fff;
          opacity: 0.2;
        }
        & .swiper-pagination-bullet-active {
          transition: all .18s ease-in;
          transform: scale(1.16);
          background: #fff;
          opacity: 0.8;
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
      width: 3.1rem;
      height: 3.1rem;
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





  /* ####### CARACTERÍSTICAS BOX ####### */
  & .caracteristicas-box {
    padding: 0 7%;
    transform: translateY(-.3rem);
    & .__item-caracteristica {
      display: flex;
      flex-flow: row;
      align-items: center;
      margin-top: .8rem;
      & .__img-caracteristica {
        width: 1.6rem;
        height: auto;
        margin-right: .7rem;
      }
    }
  }/* ####### CARACTERÍSTICAS BOX ####### */





  /* ####### CAPACIDADE BOX ####### */
  & .capacidade-box {
    padding: 0 7%;
  }/* ####### CAPACIDADE BOX ####### */





  /* ####### COMODIDADES ####### */
  & .comodidades-box {
    padding: 0 4.5%;
    transform: translateY(-.2rem);
    & .__img-comodidade {
      width: 1.8rem;
      height: auto;
      margin: .7rem .8rem 0 .8rem;
    }
  }
  
  & .comods-details {
  position: fixed;
  z-index: 9999;
  width:  100%;
  height: 100%;
  top: 0;
  background: white;
  overflow-y: auto;
  transition: var(--menus-transition);
  & .back-box {
    position: fixed;
    background: white;
    width:  100%;
    & .back-body {
      display: flex;
      height: 3rem;
      & .__back-btn {
        align-items: center;
        transform: translateY(2px);/* A imagem ta errada */
        cursor: pointer;
        width: 1.05rem;
        height: auto;
        filter: invert(75%);
        margin-left: 7%;
      }
    }
  }
  & .comods-body {
    padding: 0 7% 3rem 7%;
    & .__title {
      margin: 5rem 0 2rem 0;
      font-size: 32px;
      font-weight: 600;
    }
    & .comods-item { 
      display: flex;
      flex-flow: row;
      align-items: center;
      padding: 1.1rem 0;
      border-bottom: 1px solid rgb(222, 222, 222);
      & .__img {
        margin-right: 1rem;
        width: 1.8rem;
        height: auto;
      }
    }
  }
}/* ####### COMODIDADES ####### */





  /* ####### DISPONIBILIDADE ####### */




  /* ####### LOCAL ####### */
  & .local-box {
    & .__adress {
      padding: 0 7% .6rem 7%;
    }
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
    overflow: hidden;
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
      & .__reserva-valor {
        color: var(--color01);
        font-size: 19px;
        font-weight: 400;
      }
      & .__reserva-valor-pessoa {
        font-size: 15px;
      }
      & .__reserva-btn {
        font-size: 17px;
        font-weight: 500;
        background: #08C8C1;
        color: white;
        padding: .7rem 1.1rem;
        border-radius: 4px;
      }
    }
  }/* ####### RESERVA ####### */

}

.topbarBg {
  background: white !important;
  box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.1);
}
.topbarBtn {
  filter: invert(75%);
}

/* TRANSITIONS */

.topbar-animation-enter,
.topbar-animation-leave-active {
  transform: translateY(-100%);
}

.comods-animation-enter {
  transform: translateY(100%);
}
.comods-animation-leave-active {
  transform: translateX(100%);
}


@media (min-width: 1281px) {
}

</style>
