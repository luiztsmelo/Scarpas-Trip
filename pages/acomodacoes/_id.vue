<template>
  <div class="acomods-id">

    <proprietario/>

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
    <div class="image-box" ref="imageBox">
      <swiper :options="swiperOption">
        
        <swiper-slide class="slide">
          <progressive-img class="__img" :src="image1H(acomod)" :placeholder="acomod.imageL1" :aspect-ratio="0.67"/>
        </swiper-slide>

        <swiper-slide class="slide" v-if="ifImage2">
          <progressive-img class="__img" :src="image2H(acomod)" :placeholder="acomod.imageL1" :aspect-ratio="0.67"/>
        </swiper-slide>

        <swiper-slide class="slide" v-if="ifImage3">
          <progressive-img class="__img" :src="image3H(acomod)" :placeholder="acomod.imageL3" :aspect-ratio="0.67"/>
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div> 
    <!-- ####### IMAGE ####### -->


    <div class="desktop-view"><!-- Desktop View -->

      

      <div class="desktop-view-info"><!-- Desktop View Info -->

        <h1 class="id-title">{{ acomod.title }}</h1>


        <!-- ####### ANUNCIANTE ####### -->
        <div class="anunciante-box" @click="$store.commit('m_showProprietario', true), hashProprietario()">
          <img class="__anunciante-img" :src="acomod.photoURL" alt="">
          <div class="box-flex-column">
            <h3 style="user-select:none">Hospedado por</h3>
            <a class="__anunciante-name">{{ acomod.proprietario }}</a>
          </div>
        </div><!-- ####### ANUNCIANTE ####### -->


        
        <!-- ####### SOBRE ####### -->
        <h1 class="item-title">Sobre {{ tipoAcomodText }}</h1>

        <div class="sobre-box">
          <h3>{{ acomod.subtitle }}</h3>
        </div><!-- ####### SOBRE ####### -->



        <!-- ####### CARACTERÍSTICAS ####### -->
        <h1 class="item-title">Características</h1>

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
        <h1 class="item-title">Capacidade</h1>

        <div class="capacidade-box">
          <h3>{{ acomod.totalHospedes }} pessoas</h3>
        </div><!-- ####### CAPACIDADE ####### -->



        <!-- ####### COMODIDADES ####### -->
        <h1 class="item-title">Comodidades</h1>

        <div class="comodidades-box" @click="showComods = true, hashComods()">
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

            <div class="back-bar">
              <div class="back-box" @click="backBtn">
                <img class="__back-btn" src="../../assets/img/back.svg" alt="voltar">
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
        <h1 class="item-title">Disponibilidade</h1>

        <v-calendar
          is-inline
          is-double-paned
          is-expanded
          mode='single'
          :month-labels='monthLabels'
          :weekday-labels='weekdayLabels'
          :theme-styles='themeStyles'
          >
        </v-calendar>
        <!-- ####### DISPONIBILIDADE ####### -->



        <!-- ####### LOCALIZAÇÃO ####### -->
        <h1 class="item-title">Local</h1>

        <div class="local-box">

          <h3 class="__adress">{{ acomod.address }}</h3>

          <gmap-map
          :center="{lat: acomod.positionLAT, lng: acomod.positionLNG}"
          :zoom="15"
          :options="{styles: styles, draggable:false, fullscreenControl:false, zoomControl:false, mapTypeControl:false, streetViewControl:false}"
          @click="$store.commit('m_acomodMap', acomod), enterFullscreen()">
            <Gmap-Marker
            :position="{lat: acomod.positionLAT, lng: acomod.positionLNG}"
            :icon="{url: markerUrl, scaledSize: markerSize}"
            ></Gmap-Marker>
          </gmap-map>
        </div><!-- ####### LOCALIZAÇÃO ####### -->


      
        <!-- ####### AVALIAÇÕES ####### -->
        <h1 class="item-title">Avaliações</h1>

        <div class="avaliacoes-box">
          <h3>Comentários aqui...</h3>
        </div><!-- ####### AVALIAÇÕES ####### -->

      </div><!-- Desktop View Info -->

      <div class="reserva-desktop">
        <form class="reserva-desktop-form">

          <div class="valor-box">
            <h1 class="__valor">R${{ acomod.valorDiariaNormal }}<span class="__valor-dia"> por dia</span></h1>
          </div>

          <div class="item-form">
            <select v-model="$store.state.reservaAcomod.totalHospedes">
              <option :value="n" v-for="n in totalHospedesArray">{{ n }} {{ n===1 ? 'hóspede' : 'hóspedes' }}</option>
            </select>
          </div>

          <div class="item-form">
            <v-date-picker
              is-required
              mode='range'
              v-model='$store.state.reservaAcomod.periodoReserva'
              :min-date='today'
              :pane-width='285'
              :disabled-dates='disabledDates'
              :drag-attribute='myAttribute'
              :select-attribute='myAttribute'
              :disabled-attribute='disabledAttribute'
              :month-labels='monthLabels'
              :weekday-labels='weekdayLabels'
              :theme-styles='themeStylesDesktop'
              :input-props='{ placeholder: "Chegada - Partida" }'
              tint-color='#00D8C7'
              show-caps
              >
            </v-date-picker>
          </div>

          <button class="__reserva-desktop-btn" type="button">Reservar Estadia</button>

          <h4 class="__info">A Escarpas Trip não faz a intermediação financeira. O pagamento deverá ser feito diretamente com 
            <span style="color:#00BAAC;cursor:pointer" @click="$store.commit('m_showProprietario', true), hashProprietario()">{{ acomod.proprietario }}</span>.
          </h4>

        </form>  
      </div>

    </div><!-- Desktop View -->


    <!-- ####### RESERVA ####### --> 
    <div class="reserva">
      <div class="reserva-body">
        <h3 class="__reserva-valor">R${{ acomod.valorDiariaNormal }}<span class="__reserva-valor-pessoa">/dia</span></h3>
        <button class="__reserva-btn" @click="$store.commit('m_showReservaAcomod', true), hashReserva()">Reservar Estadia</button>
      </div>
    </div>

    <reserva-acomod/><!-- ####### RESERVA ####### -->
    
  </div>
</template>

<script>
import PopoverReservaAcomod from '../../components/PopoverReservaAcomod'
import { loaded } from '~/node_modules/vue2-google-maps/src/manager'
import ReservaAcomod from '../../components/ReservaAcomod'
import Proprietario from '../../components/Proprietario'
import supportsWebP from 'supports-webp'
import { mapstyle } from '../../mixins/mapstyle'
import * as firebase from 'firebase'

export default {
  components: { ReservaAcomod, Proprietario },
  mixins: [mapstyle],
  data () {
    return {
      showComods: false,
      showTopbar: true,
      scrollTopbar: false,
      heightImageBox: null,
      
      googleMapsInitialized: false,
   
      monthLabels: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
      weekdayLabels: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      myAttribute: {
        popover: {
          hideIndicator: true,
          component: PopoverReservaAcomod
        }
      },
      disabledAttribute: {
        contentStyle: {
          textDecoration: 'line-through',
          color: '#DADADA'
        },
        contentHoverStyle: {
          cursor: 'default',
          backgroundColor: 'transparent',
        }
      },
      themeStyles: {
        wrapper: {
          color: 'rgb(52, 52, 52)',
          margin: '10px 0px 0 0px',
          padding: '10px 0px 0 0px',
          background: 'white',
          width: '100%'
        },
        verticalDivider: {
          borderLeft: '1px solid rgb(232,232,232)',
        },
        header: {
          padding: '0 9px',
        },
        headerArrows: {
          fontSize: '1.5rem',
        },
        headerTitle: {
          fontSize: '17px',
          fontWeight: '400'
        },
        weekdays: {
          color: 'rgb(52, 52, 52)',
          fontSize: '17px',
          fontWeight: '700',
          padding: '15px 0px 8px 0px',
        },
        dayCell: {
          height: '30px'
        },
        dayContent: {
          fontWeight: '400',
          fontSize: '16px',
        },
        dayCellNotInMonth: {
          color: '#DADADA'
        }
      },
      themeStylesDesktop: {
        wrapper: {
          color: 'rgb(52, 52, 52)',
          border: '0',
          padding: '6px 9px 0 9px',
          background: 'white'
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
          color: 'rgb(52, 52, 52)',
          fontWeight: '700',
          padding: '15px 5px 8px 5px',
        },
        dayCell: {
          height: '30px'
        },
        dayContent: {
          fontWeight: '400',
          fontSize: '15px'
        },
        dayCellNotInMonth: {
          color: '#DADADA'
        },
        dayPopoverContent: {
          background: '#00D8C7',
          color: 'white',
          border: 'none'
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
      if (store.state.isMobile === true) {
        store.commit('m_showNavbar', false)
        store.commit('m_showFoobar', false)
      }
    })
  },
  methods: {
    backBtn () {
      window.history.back(1)
    },
    closeComods () {
      this.showComods = false
      window.history.back(1)
    },
    hashReserva () {
       window.location.hash = "reserva1"
    },
    hashProprietario () {
       window.location.hash = "contato"
    },
    hashComods () {
       window.location.hash = "comodidades"
    },
    hashShare () {
       window.location.hash = "compartilhar"
    },
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
    image3H (acomod) {
      if (supportsWebP) {
        return acomod.imageH3W
      } else {
        return acomod.imageH3J
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
  async mounted () {
    loaded.then(() => {
      this.googleMapsInitialized = true
    })
    let heightImageBox = this.$refs.imageBox.scrollHeight
    this.heightImageBox = heightImageBox
  },
  computed: {
    today () {
      return new Date().getTime()
    },
    totalHospedesArray () {
      return Array.from({length: this.acomod.totalHospedes}, (v, k) => k+1)
    },
    disabledDates () {
      return 
    },
    swiperOption () {
      if (this.$store.state.isMobile === true) {
        return {
          pagination: '.swiper-pagination',
          dynamicBullets: true,
          autoplay: 2300
        }
      } else {
        return {
          slidesPerView: 2.34,
          spaceBetween: 7,
          pagination: '',
          dynamicBullets: true,
          freeMode: true,
          autoplay: 2300,
          speed: 8000
        }
      }
    },
    markerUrl () {
      return 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fmarker.svg?alt=media&token=fcbfd76e-ee93-41e8-a816-98906e19859b'
    },
    markerSize () {
      if (!this.googleMapsInitialized) return null
      return new window.google.maps.Size(38, 38)
    },
    tipoAcomodText () {
      const path = this.acomod.tipoAcomod
      return path === 'Casa' ? 'a Casa' 
           : path === 'Apartamento' ? 'o Apartamento'
           : path === 'Rancho' ? 'o Rancho'
           : path === 'Chácara' ? 'a Chácara'
           : path === 'Pousada' ? 'a Pousada'
           : path === 'Camping' ? 'o Camping'
           : path === 'Sítio' ? 'o Sítio'
           : path === 'Fazenda' ? 'a Fazenda'
           : path === 'Hostel' ? 'o Hostel'
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
    ifImage3 () {
      if (this.acomod.imageH3W === null) {
        return
      } else {
        if (supportsWebP) {
          return this.acomod.imageH3W
        } else {
          return this.acomod.imageH3J
        }
      }
    },
    showShare () {
      return this.$store.state.showShare
    },
    hash () {
      return this.$route.hash
    }
  },
  watch: {
    scrollY (value) {
      if (value > this.heightImageBox) {
        this.scrollTopbar = true
      } else {
        this.scrollTopbar = false
      }
    },
    hash (value) {
      if (value === '') {
        this.showComods = false
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.state.isMobile === false) {
        vm.$store.commit('m_showNavbar', true)
      } else {
        vm.$store.commit('m_showNavbar', false)
        vm.$store.commit('m_showFoobar', false)
      }
    })
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
@import url('../../assets/css/main.css');
@import url('../../assets/css/pagination.css');
@import url('../../assets/css/_id.css');

.acomods-id {
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



  
  /* ####### ANUNCIANTE BOX ####### */
  & .anunciante-box {
    display: flex;
    padding: 1.5rem 7% 0 7%;
    align-items: center;
    & .__anunciante-img {
      cursor: pointer;
      width: 3.3rem;
      height: 3.3rem;
      border-radius: 50%;
      user-select: none;
      margin-right: .6rem;
    }
    & .__anunciante-name {
      cursor: pointer;
      color: #00BAAC;
      user-select: none;
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
  transition: var(--main-transition);
  & .back-bar {
    position: fixed;
    top: 0;
    left: 0;
    width:  100%;
    height: 3rem;
    background: white;
    & .back-box {
      display: inline-flex;
      align-items: center;
      height: 100%;
      padding: 0 7%;
      & .__back-btn {
        cursor: pointer;
        width: 1.07rem;
        height: auto;
        filter: invert(75%);
      }
    }
  }
  & .comods-body {
    padding: 0 7% 3rem 7%;
    & .__title {
      margin: 5rem 0 2rem 0;
      font-size: 27px;
      font-weight: 700;
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
    & .vue-map-container {
      width: 100%; 
      height: 250px;
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
        font-size: 15px;
      }
      & .__reserva-btn {
        font-size: 16px;
        font-weight: 600;
        background: #00D8C7;
        line-height: 2.6rem;
        color: white;
        height: 2.7rem;
        width:  11rem;
        border-radius: 4px;
      }
    }
  }/* ####### RESERVA ####### */
}


/* TRANSITIONS */

.comods-animation-enter {
  transform: translateY(100%);
}
.comods-animation-leave-active {
  transform: translateY(100%);
}

@media (max-width: 1023px) {
  .reserva-desktop {
    display: none;
  }
}
@media (min-width: 1024px) {
  .acomods-id {
    margin-top: 3.6rem;

    /* ####### IMAGE BOX ####### */
    & .image-box {
      cursor: grab;
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
    & .desktop-view {
      display: flex;
      margin: 1.7rem 9% 0 9%;
      & .reserva-desktop {
        flex-basis: 30%;
        border: 1px solid rgb(232,232,232);
        max-height: 23rem;
        & .reserva-desktop-form {
          padding: 1rem;
          & .valor-box {
            display: flex;
            align-items: flex-end;
            padding-bottom: 1.2rem;
            & .__valor {
              font-size: 36px;
              font-weight: 400;
       
              & .__valor-dia {
                font-size: 17px;
                font-weight: 400;
              }
            }
          }
          & .item-form {
            display: flex;
            flex-flow: column;
            margin: 1.5rem 0;
            & input {
              cursor: pointer;
              width: 100%;
              font-size: 17px;
              font-weight: 400;
              padding: .6rem;
              color: #8B8B8C;
              border: 1px solid rgb(232,232,232);
              outline: none;
              background: white;
            }
            & select {
              cursor: pointer;
              width: 100%;
              font-size: 17px;
              font-weight: 400;
              padding: .6rem;
              color: #8B8B8C;
              border: 1px solid rgb(232,232,232);
              outline: none;
              background: white;
              & option {
                background: white;
                color: #8B8B8C;
              }
            }
          }
          & .__reserva-desktop-btn {
            font-size: 19px;
            font-weight: 600;
            line-height: 3rem;
            background: #00D8C7;
            color: white;
            height: 3.1rem;
            width:  100%;
            border-radius: 5px;
          }
          & .__info {
            margin: .7rem 0;
            text-align: center;
            font-size: 13px;
            font-weight: 400;
            line-height: 17px;
          }
        }
      }
      & .desktop-view-info {
        margin-right: 4%;
        flex-basis: 70%;
        /* ####### ANUNCIANTE BOX ####### */
        & .anunciante-box {
          padding: 1.5rem 0 0 0;
          & .__anunciante-img {
            width: 4rem;
            height: 4rem;
            margin-right: .7rem;
          }
          & .__anunciante-name {
            color: #00BAAC;
            user-select: none;
          }
        }/* ####### ANUNCIANTE BOX ####### */


        /* ####### SOBRE BOX ####### */
        & .sobre-box {
          padding: 0;
        }/* ####### SOBRE BOX ####### */


        /* ####### CARACTERÍSTICAS BOX ####### */
        & .caracteristicas-box {
          padding: 0; 
          display: flex;
          justify-content: space-between;
          & .__item-caracteristica {
            display: flex;
            flex-flow: column;
            align-items: center;
            margin-top: .8rem;
            & .__img-caracteristica {
              width: 2.3rem;
              height: auto;
              margin-bottom: .7rem;
            }
          }
        }/* ####### CARACTERÍSTICAS BOX ####### */


        /* ####### CAPACIDADE BOX ####### */
        & .capacidade-box {
          padding: 0;
        }/* ####### CAPACIDADE BOX ####### */


        /* ####### COMODIDADES ####### */
        & .comodidades-box {
          padding: 0;
          display: flex;
          height: 4rem;
          justify-content: space-between;
          & .__img-comodidade {
            width: 2.4rem;
            height: auto;
            margin: 0;
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
          transition: var(--main-transition);
          & .back-bar {
            position: fixed;
            top: 0;
            left: 0;
            width:  100%;
            height: 3rem;
            background: white;
            & .back-box {
              display: inline-flex;
              align-items: center;
              height: 100%;
              padding: 0 7%;
              & .__back-btn {
                cursor: pointer;
                width: 1.07rem;
                height: auto;
                filter: invert(75%);
              }
            }
          }
          & .comods-body {
            padding: 0 7% 3rem 7%;
            & .__title {
              margin: 5rem 0 2rem 0;
              font-size: 27px;
              font-weight: 700;
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


        /* ####### LOCAL ####### */
        & .local-box {
          & .__adress {
            padding: 0 0 .6rem 0;
          }
          & .vue-map-container {
            height: 400px;
          }
        }/* ####### LOCAL ####### */


        /* ####### AVALIAÇÕES ####### */
        & .avaliacoes-box {
          padding: 0;
        }/* ####### AVALIAÇÕES ####### */
      }
    }
    
  

    /* ####### RESERVA ####### */
    & .reserva {
      display: none;
    }/* ####### RESERVA ####### */
  }
}

</style>
