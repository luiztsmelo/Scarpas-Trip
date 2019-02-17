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
    <div class="flyer-box" ref="imageBox" :style="`background-color: ${evento.flyerVibrantColor}`">
    
      <progressive-background class="__flyer" :style="flyerWidth" :src="flyerH()" :placeholder="evento.flyerL" :aspect-ratio="evento.flyerAspectRatio"/>
         
    </div><!-- ______________________________ FLYER ______________________________ -->
    





    <div class="desktop-view"><!-- Desktop View -->


    

      <div class="desktop-view-info"><!-- Desktop View Info -->





        <!-- ______________________________ DATE ______________________________ -->
        <div class="date-box">

          <p class="__date" :style="`color: ${evento.flyerVibrantColor}`">{{ eventoDate }}</p>

        </div><!-- ______________________________ DATE ______________________________ -->





        <h1 class="id-title">{{ evento.title }}</h1>





        <!-- ______________________________ ANUNCIANTE ______________________________ -->
        <div class="anunciante-box">
          <img class="__anunciante-img" src="../../assets/img/organizer.svg" :alt="evento.organizador.name">
          <div class="box-flex-column">
            <h3 style="user-select:none">Organizado por</h3>
            <p class="__anunciante-name" :style="`color: ${evento.flyerVibrantColor}`">{{ evento.organizador.name }}</p>
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
            
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 293.598 293.598" style="enable-background:new 0 0 293.598 293.598;" xml:space="preserve" width="512px" height="512px" class="__img"><g><g><g>
              <path :style="`fill:${evento.flyerVibrantColor}`" d="M156.173,100.866v19.444c7.978,2.827,14.292,9.136,17.114,17.114h19.444    C189.005,119.058,174.539,104.592,156.173,100.866z" data-original="#F9BA48" class="" data-old_color="#198CFE"/>
              <path :style="`fill:${evento.flyerVibrantColor}`" d="M173.278,156.173c-3.858,10.917-14.236,18.75-26.48,18.75c-15.534,0-28.125-12.591-28.125-28.125    c0-12.239,7.833-22.617,18.75-26.48V100.88c-21.394,4.345-37.5,23.241-37.5,45.919c0,25.889,20.986,46.875,46.875,46.875    c22.673,0,41.573-16.106,45.919-37.5h-19.439V156.173z" data-original="#F9BA48" class="" data-old_color="#198CFE"/>
              <path style="fill:#484848" d="M290.981,143.753c-2.353-2.747-58.636-67.266-144.183-67.266S4.969,141.005,2.616,143.753    L0,146.798l2.616,3.047c2.353,2.747,58.636,67.266,144.183,67.266s141.83-64.519,144.183-67.266l2.616-3.047L290.981,143.753z     M207.736,146.798c0,33.6-27.337,60.938-60.938,60.938s-60.937-27.338-60.937-60.938s27.338-60.938,60.937-60.938    S207.736,113.198,207.736,146.798z M12.562,146.794c9.544-9.914,42.595-41.287,90.192-54.722    c-15.998,12.9-26.269,32.625-26.269,54.727c0,22.087,10.256,41.803,26.231,54.703C55.195,188.048,22.111,156.698,12.562,146.794z     M190.842,201.525c15.998-12.9,26.269-32.625,26.269-54.727c0-22.088-10.256-41.803-26.231-54.703    c47.527,13.453,80.606,44.803,90.155,54.708C271.491,156.717,238.439,188.091,190.842,201.525z" data-original="#333333" class="active-path" data-old_color="#198CFE"/>
              <path style="fill:#484848" d="M146.798,57.736c39.548,0,78.103,12.291,114.595,36.534l5.184-7.809    c-37.519-24.923-78.942-38.1-119.78-38.1c-32.592,0-64.852,8.095-95.897,24.056l4.289,8.339    C84.891,65.48,115.716,57.736,146.798,57.736z" data-original="#333333" class="active-path" data-old_color="#198CFE"/>
              <path style="fill:#484848" d="M46.003,85.777l-4.655-8.137c-5.025,2.873-9.848,5.845-14.33,8.822l5.184,7.809    C36.516,91.411,41.156,88.552,46.003,85.777z" data-original="#333333" class="active-path" data-old_color="#198CFE"/>
              <path style="fill:#484848" d="M146.798,235.861c-39.548,0-78.103-12.291-114.595-36.534l-5.184,7.809    c37.519,24.923,78.942,38.1,119.78,38.1c32.597,0,64.856-8.1,95.897-24.061l-4.289-8.339    C208.711,228.117,177.886,235.861,146.798,235.861z" data-original="#333333" class="active-path" data-old_color="#198CFE"/>
              <path style="fill:#484848" d="M247.594,207.82l4.655,8.137c5.025-2.873,9.848-5.845,14.33-8.822l-5.184-7.809    C257.081,202.186,252.441,205.046,247.594,207.82z" data-original="#333333" class="active-path" data-old_color="#198CFE"/></g></g></g> 
            </svg>

          </div>

        </form>
      </div><!-- ______________________________ RESERVA DESKTOP ______________________________ -->




    </div><!-- Desktop View -->




    <!-- ______________________________ RESERVA MOBILE ______________________________ --> 
    <div class="reserva-mobile">
      <div class="reserva-body">
        <h3 class="__reserva-valor">R${{ evento.valorIngresso }}<span class="__reserva-valor-pessoa"> por pessoa</span></h3>
        <a :href="evento.ingressoDigitalURL" target="_blank" class="__reserva-btn" :style="reservaBtnStyle" >Comprar ingresso</a>
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
import Color from 'color'

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
    reservaBtnStyle () {
      const color = Color(this.evento.flyerVibrantColor)
      if (color.isLight()) {
        return `background-color: ${color}; color: #161616`
      } else {
        return `background-color: ${color}; color: #FFF`
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
        padding: 0 1rem;
        width: 50%;
        max-width: 12rem;
        height: 3.25rem;
        border-radius: 200px;
        font-size: 16px;
        font-weight: 700;
        color: white;
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
              width: 3.4rem;
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
