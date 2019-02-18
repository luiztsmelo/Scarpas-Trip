<template>
  <div class="eventos-id">
    

    <host/>






    <!-- ______________________________ TOPBAR ______________________________ -->
    <div class="topbar" v-scroll="scrollTopbarBg">
      <div class="topbar-body">

        <div class="back-box" @click="backBtn">
          <img class="__back-btn" v-scroll="scrollTopbarBtns" src="../../assets/img/back-w.svg" alt="voltar">
        </div>
        
        <div class="share-box" @click="$store.commit('m_showShare', true), hashShare()">
          <img class="__share-btn" v-scroll="scrollTopbarBtns" src="../../assets/img/share.svg" alt="compartilhar" >
        </div>

      </div>
    </div><!-- ______________________________ TOPBAR ______________________________ -->






    <!-- ______________________________ FLYER ______________________________ -->
    <div class="flyer-box" ref="imageBox" :style="`background-color: #FF7E65`">
    
      <progressive-background class="__flyer" :style="flyerWidth" :src="flyerH()" :placeholder="evento.flyerL" :aspect-ratio="evento.flyerAspectRatio"/>
         
    </div><!-- ______________________________ FLYER ______________________________ -->
    





    <div class="desktop-view"><!-- Desktop View -->


    

      <div class="desktop-view-info"><!-- Desktop View Info -->





        <!-- ______________________________ DATE ______________________________ -->
        <div class="date-box">

          <p class="__date" :style="`color: #FF7E65`">{{ eventoDate }}</p>

        </div><!-- ______________________________ DATE ______________________________ -->





        <h1 class="id-title">{{ evento.title }}</h1>





        <!-- ______________________________ ANUNCIANTE ______________________________ -->
        <div class="anunciante-box">
          <img class="__anunciante-img" src="../../assets/img/organizer.svg" :alt="evento.organizador.name">
          <div class="box-flex-column">
            <h3 style="user-select:none">Organizado por</h3>
            <p class="__anunciante-name" :style="`color: #FF7E65`">{{ evento.organizador.name }}</p>
          </div>
        </div><!-- ______________________________ ANUNCIANTE ______________________________ -->








        <!-- ______________________________ SOBRE ______________________________ -->
        <h2 class="item-title">Sobre o evento</h2>

        <div class="sobre-box">
          <p>{{ evento.subtitle }}</p>
        </div><!-- ______________________________ SOBRE ______________________________ -->








        <!-- ______________________________ DISPONIBILIDADE ______________________________ -->
        <h2 class="item-title">Datas do evento</h2>

        <!-- <div class="disponibilidade-box">
          <no-ssr>

            <div class="datepicker-trigger">
              <button
                type="button"
                id="datepicker-trigger"
                style="display: none">
              </button>

              <AirbnbStyleDatepicker
                style="border:none"
                :trigger-element-id="'datepicker-trigger'"
                :inline="true"
                :mode="'single'"
                :showShortcutsMenuTrigger="false"
                :showActionButtons="false"
                :min-date="minDate"
                :date-one="$store.state.reservaPasseio.date"
                @date-one-selected="val => { $store.state.reservaPasseio.date = val }"
              />
            </div>
            
          </no-ssr>
        </div> --><!-- ______________________________ DISPONIBILIDADE ______________________________ -->






        <!-- ______________________________ LOCAL ______________________________ -->
        <h2 class="item-title">Local do evento</h2>

        <div class="local-box">

          <p class="__adress">{{ evento.address }}</p>

          <gmap-map
            :center="{ lat: evento.positionLAT, lng: evento.positionLNG }"
            :zoom="15"
            :options="{ styles: styles, draggable: $store.state.isMobile ? false : true, fullscreenControl: $store.state.isMobile ? false : true, zoomControl: $store.state.isMobile ? false : true, mapTypeControl: false, streetViewControl: false }"
            @click="fullscreenMobile">
              <Gmap-Marker
                :position="{ lat: evento.positionLAT, lng: evento.positionLNG }"
                :icon="{ url: $store.state.markerUrl, scaledSize: $store.state.markerSize }">
              </Gmap-Marker>
          </gmap-map>

        </div><!-- ______________________________ LOCAL ______________________________ -->






      </div><!-- Desktop View Info -->




      <!-- ______________________________ RESERVA DESKTOP ______________________________ -->
      <div class="reserva-desktop">
        <form class="reserva-desktop-form">


          <h2 class="__valor">R${{ evento.valorIngresso }}<span class="__valor-pessoa"> por pessoa</span></h2>

          <p style="font-size: 15px">Informações para comprar o ingresso.</p>


          <a :href="evento.ingressoDigitalURL" target="_blank" class="__reserva-desktop-btn" :style="reservaBtnStyle" >Comprar ingresso</a>

          <h4 class="__info">Você será enviado à página de vendas</h4>



          <div class="highlight" v-if="$store.state.visitsLastMonth >= 0">
            <span class="__text">Este evento recebeu {{ $store.state.visitsLastMonth }} visualizações no último mês.</span>
            
            <img class="__img" src="../../assets/img/visits-evento.svg">

          </div>

        </form>
      </div><!-- ______________________________ RESERVA DESKTOP ______________________________ -->




    </div><!-- Desktop View -->




    <!-- ______________________________ RESERVA MOBILE ______________________________ --> 
    <div class="reserva-mobile">
      <div class="reserva-body">
        <h3 class="__reserva-valor">R${{ evento.valorIngresso }}<span class="__reserva-valor-pessoa"> por pessoa</span></h3>
        <a :href="evento.ingressoDigitalURL" target="_blank" class="__reserva-btn" >Comprar ingresso</a>
      </div>
    </div>
    <!-- ______________________________ RESERVA MOBILE ______________________________ -->
    
    
    
  </div>
</template>

<script>
import firebase from '@firebase/app'
import 'firebase/firestore'
import Host from '../../components/Host'
import supportsWebP from 'supports-webp'
import { mapstyle } from '../../mixins/mapstyle'
import { swiperOptions } from '../../mixins/swiper_id'
import { stylesCalendar } from '@/mixins/stylesCalendar'
import format from 'date-fns/format'
import pt from 'date-fns/locale/pt'
import subDays from 'date-fns/sub_days'

export default {
  components: { Host },
  mixins: [ mapstyle, swiperOptions, stylesCalendar ],
  data () {
    return {
    }
  },
  head () {
    return {
      title: `${this.$store.state.evento.title} ‒ Escarpas Trip`,
      meta: [
        { hid: 'description', name: 'description', content: this.$store.state.evento.subtitle },
        { property: 'og:url', content: `https://escarpastrip.com/eventos/${this.$route.params.id}` },
        { property: 'og:title', content: this.$store.state.evento.title },
        { property: 'og:description', content: this.$store.state.evento.subtitle },
        { property: 'og:image', content: this.$store.state.evento.flyerHJ },
        { property: 'og:site_name', content: 'Escarpas Trip' }
      ]
    }
  },
  middleware: 'eventoValidate',
  transition: 'id',
  async fetch ({ store, params }) {
    try {
      /* Get evento */
      let evento = await firebase.firestore().doc(`eventos/${params.id}`).get()

      store.commit('m_evento', evento.data())
      store.commit('m_loader', false)

    } catch (err) {
      store.commit('m_loader', false)
      console.log(err)
    }
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
    fullscreenMobile () {
      if (this.$store.state.isMobile === true) {
        this.$store.commit('m_acomodMap', this.acomod)
        /* Enter fullscreen */
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
          if (document.documentElement.requestFullScreen) {
             document.documentElement.requestFullScreen()
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen()
          } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
          }
        }
      }
    },
    backBtn () {
      history.length <= 2 ? this.$router.push('/') : window.history.back(1)
    },
    hashHost () {
       window.location.hash = "contato"
    },
    hashShare () {
       window.location.hash = "compartilhar"
    },
    flyerH () {
      return supportsWebP ? this.evento.flyerHW : this.evento.flyerHJ
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
    },
    formatAvaliacaoDate (avaliacao) {
      const formattedDate = format(avaliacao.createdAt, 'MMMM [de] YYYY', { locale: pt })
      return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    }
  },
  mounted () {
    this.$store.state.heightImageBox === null ? this.$store.state.heightImageBox = this.$refs.imageBox.clientHeight : null
  },
  computed: {
    evento () { return this.$store.state.evento },
    showShare () { return this.$store.state.showShare },
    minDate() {
      return subDays(Date(), 1)
    },
    flyerWidth () {
      if (this.$store.state.isMobile) {
        return 'width: 100%'
      } else {
        if (this.evento.flyerAspectRatio === 1/2) {
          return 'width: 60%'
        }
        if (this.evento.flyerAspectRatio === 9/16) {
          return 'width: 54%'
        }
        if (this.evento.flyerAspectRatio === 2/3) {
          return 'width: 45%'
        }
        if (this.evento.flyerAspectRatio === 1) {
          return 'width: 30%'
        }
      }
    },
    eventoDate () {
      const dateFormatted = format(this.evento.dates[0].date, 'DD [de] MMMM [de] YYYY', { locale: pt })
      return `${dateFormatted} | ${this.evento.dates[0].startTime} - ${this.evento.dates[0].endTime}`
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      !vm.$store.state.isOnline ? vm.$modal.show('offline-modal') : ''

      if (vm.$store.state.isMobile) {
        vm.$store.commit('m_showNavbar', false)
        vm.$store.commit('m_showFoobar', false)
      } else {
        vm.$store.commit('m_showNavbar', true)
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
@import url('~/assets/css/_id.css');

.eventos-id {
  display: flex;
  flex-flow: column;
  background-color: white;
  margin-bottom: 5.5rem;
  transition: all .35s cubic-bezier(.15,.97,.43,.93);
  


  /* __________ FLYER BOX __________ */
  & .flyer-box {
    display: flex;
    flex-flow: column;
    align-items: center;
    min-height: 25vh;
    & .__flyer {
    }
  }/* __________ FLYER BOX __________ */




  /* __________ DATE BOX __________ */
  & .date-box {
    padding: 0 7%;
    margin-top: .6rem;
    display: flex;
    align-items: center;
    & .__date {
      font-size: 15px;
      font-weight: 600;
    }
  }/* __________ DATE BOX __________ */

  


  /* __________ ANUNCIANTE BOX __________ */
  & .anunciante-box {
    display: flex;
    padding: 2rem 7% .5rem;
    align-items: center;
    & .__anunciante-img {
      cursor: pointer;
      width: 3.4rem;
      height: 3.4rem;
      border-radius: 50%;
      user-select: none;
      margin-right: .6rem;
    }
    & .__anunciante-name {
      cursor: pointer;
      font-weight: 500;
      user-select: none;
    }
  }/* __________ ANUNCIANTE BOX __________ */







  /* __________ SOBRE BOX __________ */
  & .sobre-box {
    padding: 0 7%;
  }/* __________ SOBRE BOX __________ */






  /* __________ DISPONIBILIDADE __________ */
  & .disponibilidade-box {
    padding: 0 3.5%;
  }  /* __________ DISPONIBILIDADE __________ */




  /* __________ LOCAL __________ */
  & .local-box {
    & .__adress {
      padding: 0 7% .6rem 7%;
    }
    & .vue-map-container {
      width: 100%; 
      height: 250px;
    }
  }/* __________ LOCAL __________ */





  /* __________ RESERVA __________ */
  & .reserva-mobile {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 8888;
    height: 4.7rem;
    width: 100%;
    background: white;
    overflow: hidden;
    box-shadow: 0px -1px 1px 0px rgba(0,0,0,0.1);
    user-select: none;
    & .reserva-body {
      padding: 0 7%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      & .__reserva-valor {
        padding-right: 15px;
        font-size: 19px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & .__reserva-valor-pessoa {
        font-size: 15px;
        font-weight: 400;
      }
      & .__reserva-btn {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        background-color: var(--colorEvento);
        color: white;
        padding: 0 1rem;
        width: 50%;
        max-width: 12rem;
        height: 3.25rem;
        border-radius: 200px;
        font-size: 16px;
        font-weight: 700;
        transition: var(--main-transition);
      }
    }
  }/* __________ RESERVA __________ */

}


/* TRANSITIONS */

@media (max-width: 1023px) {
  .reserva-desktop {
    display: none;
  }
}

@media (min-width: 1024px) {
  .eventos-id {
    margin-top: var(--navbarHeightDesktop);

    /* __________ FLYER BOX __________ */
    & .flyer-box {
   
    }/* __________ FLYER BOX __________ */


    & .desktop-view {
      display: grid;
      grid-template-columns: 70% 30%;
      margin: 1.7rem 8% 0;
      & .reserva-desktop {
        align-self: start;
        border: 1px solid #dedede;
        border-radius: 12px;
        & .reserva-desktop-form {
          display: flex;
          flex-flow: column;
          padding: 1.4rem;
          & .__valor {
            font-size: 34px;
            font-weight: 400;
            padding-bottom: 1.2rem;
            & .__valor-pessoa {
              font-size: 16px;
              font-weight: 400;
            }
          }
          & .item-form {
            display: flex;
            flex-flow: column;
            margin-top: 1.2rem;
            & select {
              cursor: pointer;
              width: 100%;
              padding: .8rem .65rem;
              border: 1px solid #dedede;
              outline: none;
              background: white;
              border-radius: 6px;
              transition: .15s border ease;
              & option {
                background: white;
              }
            }
            & select:hover {
              border: 1px solid var(--color01) !important;
            }
            & .datepicker-trigger {
              height: 100%;
              background: white;
              & #datepicker-trigger {
                padding: .8rem;
                height: 100%;
                width: 100%;
                background: white;
                border: 1px solid #dedede;
                outline: none;
                text-align: left;
                border-radius: 6px;
              }
              & #datepicker-trigger:hover {
                border: 1px solid var(--color01);
              }
            }
          }
          & .__reserva-desktop-btn {
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            background-color: var(--colorEvento);
            color: white;
            margin-top: 1.3rem;
            font-size: 16px;
            font-weight: 700;
            height: 3.2rem;
            border-radius: 200px;
          }
          & .__info {
            margin: .5rem 0 .8rem;
            text-align: center;
            font-size: 12px;
            font-weight: 500;
            line-height: 17px;
          }
          & .highlight {
            display: flex;
            align-items: center;
            border-top: 1px solid #dedede;
            padding-top: 1rem;
            margin-top: 1rem;
            & .__text {
              font-size: 13px;
              font-weight: 500;
              line-height: 1.35;
            }
            & .__img {
              margin-left: .6rem;
              width: 2.4rem;
              height: auto;
            }
          }
        }
      }


      
      & .desktop-view-info {
        padding-right: 6%;



        /* __________ DATE BOX __________ */
        & .date-box {
          padding: 0;
          margin-top: 0;
          & .__date {
            font-size: 16px;
          }
        }/* __________ DATE BOX __________ */




        /* __________ ANUNCIANTE BOX __________ */
        & .anunciante-box {
          padding: 1.5rem 0 0 0;
          & .__anunciante-img {
            width: 4rem;
            height: 4rem;
            margin-right: .7rem;
          }
          & .__anunciante-name {
          }
          & .__anunciante-name:hover {
            text-decoration: underline;
          }
        }/* __________ ANUNCIANTE BOX __________ */





        /* __________ SOBRE BOX __________ */
        & .sobre-box {
          padding: 0;
        }/* __________ SOBRE BOX __________ */






        /* __________ DISPONIBILIDADE __________ */
        & .disponibilidade-box {
          padding: 0;
        }  /* __________ DISPONIBILIDADE __________ */




        /* __________ LOCAL __________ */
        & .local-box {
          & .__adress {
            padding: 0 0 1rem 0;
          }
          & .vue-map-container {
            height: 430px;
          }
        }/* __________ LOCAL __________ */

      }
    }
    
  

    /* __________ RESERVA __________ */
    & .reserva-mobile {
      display: none;
    }/* __________ RESERVA __________ */
  }
}

</style>
