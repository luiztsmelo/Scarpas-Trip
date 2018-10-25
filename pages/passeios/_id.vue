<template>
  <div class="passeios-id">
    

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






    <!-- ______________________________ IMAGE ______________________________ -->
    <div class="image-box" ref="imageBox">
      <swiper :options="swiperOptions">
        
        <swiper-slide class="slide" v-for="image in passeio.images" :key="image.id">
          <progressive-background class="__img" :src="imageH(image)" :placeholder="image.L" :aspect-ratio="2/3"/>
        </swiper-slide>

      </swiper>
    </div> 
    <!-- ______________________________ IMAGE ______________________________ -->






    <div class="desktop-view"><!-- Desktop View -->


    

      <div class="desktop-view-info"><!-- Desktop View Info -->





        <!-- ______________________________ RATING ______________________________ -->
        <div class="rating-box">

          <h3 class="__tipo" style="color: #198CFE">{{ passeio.tipoPasseio }}</h3>

          <div class="rating">
            <star-rating
              :rating="4.7"
              :increment="0.1"
              :read-only="true"
              :show-rating="false"
              active-color="#161616"
              inactive-color="#dedede"
              :star-size="12"
              :padding="3">
            </star-rating>
            <p class="rating-number">4,7</p>
          </div>

        </div><!-- ______________________________ RATING ______________________________ -->





        <h1 class="id-title">{{ passeio.title }}</h1>





        <!-- ______________________________ ANUNCIANTE ______________________________ -->
        <div class="anunciante-box">
          <img class="__anunciante-img" :src="host.photoURL" @click="$store.commit('m_showHost', true), hashHost()">
          <div class="box-flex-column">
            <h3 style="user-select:none">Guiado por</h3>
            <p class="__anunciante-name" @click="$store.commit('m_showHost', true), hashHost()">{{ host.fullName }}</p>
          </div>
        </div><!-- ______________________________ ANUNCIANTE ______________________________ -->


        



        <!-- ______________________________ INFO ______________________________ -->
        <div class="info-box">
          
          <div class="item">
            <img class="__img" src="../../assets/img/guests.svg">
            <h3>Até {{ passeio.capacidade }} {{ passeio.capacidade === 1 ? 'pessoa' : 'pessoas' }}</h3>
          </div>

          <div class="item">
            <img class="__img" src="../../assets/img/clock.svg">
            <h3>{{ passeio.duracao }}</h3>
          </div>


        </div><!-- ______________________________ INFO ______________________________ -->






        <!-- ______________________________ SOBRE ______________________________ -->
        <h1 class="item-title">Sobre o Passeio</h1>

        <div class="sobre-box">
          <h3>{{ passeio.subtitle }}</h3>
        </div><!-- ______________________________ SOBRE ______________________________ -->







        <!-- ______________________________ PONTOS VISITADOS ______________________________ -->
        <h1 class="item-title">Pontos Visitados</h1>

        <div class="pontos-box">
          <h3>Imagens dos pontos turísticos visitados</h3>
        </div><!-- ______________________________ PONTOS VISITADOS ______________________________ -->




        <!-- ______________________________ DISPONIBILIDADE ______________________________ -->
        <h1 class="item-title">Disponibilidade</h1>

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
            :date-one="diaPasseio"
            @date-one-selected="val => { diaPasseio = val }"
          />
        </div>
        <!-- ______________________________ DISPONIBILIDADE ______________________________ -->





        <!-- ______________________________ LOCAL SAÍDA ______________________________ -->
        <h1 class="item-title">Local de Saída</h1>

        <div class="local-saida-box">
          <h3>{{ passeio.localSaida }}</h3>
          <h3>Mapa aqui...</h3>
        </div><!-- ______________________________ LOCAL SAÍDA ______________________________ -->




      
        <!-- ______________________________ AVALIAÇÕES ______________________________ -->
        <h1 class="item-title">Avaliações</h1>

        <div class="avaliacoes-box">
          <h3>Comentários aqui...</h3>
        </div><!-- ______________________________ AVALIAÇÕES ______________________________ -->




      </div><!-- Desktop View Info -->




      <!-- ______________________________ RESERVA DESKTOP ______________________________ -->
      <div class="reserva-desktop">
        <form class="reserva-desktop-form">


          <h1 class="__valor">R${{ passeio.valorPasseio.toLocaleString() }}<span class="__valor-pessoa"> por pessoa</span></h1>


          <div class="item-form">
            <select v-model="$store.state.reservaAcomod.totalHospedes">
              <option :value="n" v-for="n in capacidadeArray">{{ n }} {{ n === 1 ? 'pessoa' : 'pessoas' }}</option>
            </select>
          </div>


          <div class="item-form">

            <div class="datepicker-trigger">
              <button
                type="button"
                id="datepicker-trigger">
                {{ formatDate(diaPasseio) }}
              </button>

              <AirbnbStyleDatepicker
                :trigger-element-id="'datepicker-trigger'"
                :showShortcutsMenuTrigger="false"
                :monthsToShow="1"
                :mode="'single'"
                :offsetX="102"
                :offsetY="52"
                :min-date="minDate"
                :date-one="diaPasseio"
                @date-one-selected="val => { diaPasseio = val }"
              />
            </div>

          </div>

          <button class="__reserva-desktop-btn" type="button">Reservar</button>

          <h4 class="__info">A reserva é gratuita!</h4>


          <button class="__reserva-desktop-ask-btn" type="button">Falar com {{ host.firstName }}</button>


          <div class="highlight" v-if="$store.state.visitsLastMonth >= 0">
            <h3 class="__text">Este passeio recebeu {{ $store.state.visitsLastMonth }} visualizações no último mês.</h3>
            <img class="__img" src="../../assets/img/visits-passeio.svg">
          </div>

        </form>
      </div><!-- ______________________________ RESERVA DESKTOP ______________________________ -->




    </div><!-- Desktop View -->




    <!-- ______________________________ RESERVA MOBILE ______________________________ --> 
    <div class="reserva-mobile">
      <div class="reserva-body">
        <h3 class="__reserva-valor">R${{ passeio.valorPasseio }}<span class="__reserva-valor-pessoa"> por pessoa</span></h3>
        <button class="__reserva-btn" @click="$store.commit('m_showHost', true), hashHost()">
          Reservar
        </button>
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
import subDays from 'date-fns/sub_days'
import pt from 'date-fns/locale/pt'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

export default {
  components: { Host },
  mixins: [ mapstyle, swiperOptions, stylesCalendar ],
  data () {
    return {
      diaPasseio: ''
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
  middleware: 'passeioValidate',
  transition: 'id',
  async fetch ({ store, params }) {
    try {
      /* Get passeio */
      const passeio = await firebase.firestore().doc(`passeios/${params.id}`).get()

      /* Get host */
      const host = await firebase.firestore().doc(`users/${passeio.data().hostID}`).get()
      
      store.commit('m_passeio', passeio.data())
      store.commit('m_host', host.data())
      store.commit('m_loader', false)

    } catch (err) {
      store.commit('m_loader', false)
      console.log(err)
    }
  },
  methods: {
    formatDate (diaPasseio) {
      const weekday = format(diaPasseio, 'ddd', { locale: pt })
      const weekdayCapitalized = weekday.charAt(0).toUpperCase() + weekday.slice(1)
      const day = format(diaPasseio, 'D', { locale: pt })
      const month = format(diaPasseio, 'MMMM', { locale: pt })
      const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1)
      return diaPasseio === '' ? 'Selecionar data' : `${weekdayCapitalized}, ${day} de ${monthCapitalized}`
    },
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
    hashHost () {
       window.location.hash = "contato"
    },
    hashShare () {
       window.location.hash = "compartilhar"
    },
    imageH (image) {
      return supportsWebP ? image.HW : image.HJ
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
    passeio () { return this.$store.state.passeio },
    host () {return this.$store.state.host },
    showShare () { return this.$store.state.showShare },
    minDate() {
      return subDays(Date(), 1)
    },
    capacidadeArray () {
      return Array.from({length: this.passeio.capacidade}, (v, k) => k+1)
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

.passeios-id {
  display: flex;
  flex-flow: column;
  background-color: white;
  margin-bottom: 5.5rem;
  transition: all .35s cubic-bezier(.15,.97,.43,.93);
  


  /* __________ IMAGE BOX __________ */
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
  }/* __________ IMAGE BOX __________ */




  /* __________ RATING BOX __________ */
  & .rating-box {
    padding: 0 7%;
    margin-top: .5rem;
    display: flex;
    align-items: center;
    & .__tipo {
      padding-right: 1rem;
      font-size: 15px;
      font-weight: 600;
    }
    & .rating {
      display: flex;
      align-items: center;
      & .rating-number {
        font-size: 14px;
        font-weight: 600;
        padding-left: 3px;
      }
    }
  }/* __________ RATING BOX __________ */

  


  /* __________ ANUNCIANTE BOX __________ */
  & .anunciante-box {
    display: flex;
    padding: 2rem 7%;
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
      color: var(--colorPasseio);
      font-weight: 500;
      user-select: none;
    }
    & .__anunciante-name:hover {
      text-decoration: underline;
    }
  }/* __________ ANUNCIANTE BOX __________ */





  /* __________ INFO BOX __________ */
  & .info-box {
    padding: 0 7%;
    & .item {
      display: flex;
      flex-flow: row;
      align-items: center;
      margin-top: 1.2rem;
      & .__img {
        width: 1.6rem;
        height: auto;
        margin: 0 .7rem 0 0;
      }
    }
  }/* __________ INFO BOX __________ */





  /* __________ SOBRE BOX __________ */
  & .sobre-box {
    padding: 0 7%;
  }/* __________ SOBRE BOX __________ */






  /* __________ PONTOS VISITADOS BOX __________ */
  & .pontos-box {
    padding: 0 7%;
  }/* __________ PONTOS VISITADOS BOX __________ */





  /* __________ DISPONIBILIDADE __________ */





  /* __________ LOCAL SAÍDA BOX __________ */
  & .local-saida-box {
    padding: 0 7%;
  }/* __________ LOCAL SAÍDA BOX __________ */





  /* __________ AVALIAÇÕES BOX __________ */
  & .avaliacoes-box {
    padding: 0 7%;
  }/* __________ AVALIAÇÕES BOX __________ */




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
        font-size: 18px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & .__reserva-valor-pessoa {
        font-size: 14px;
        font-weight: 400;
      }
      & .__reserva-btn {
        width: 10rem;
        height: 3.2rem;
        background:var(--colorPasseio);
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
  .passeios-id {
    margin-top: var(--navbarHeightDesktop);

    /* __________ IMAGE BOX __________ */
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
              border-radius: 6px;
            }
          }
        }
      }
    }
    & .image-box:active {
      cursor: grabbing;
    }/* __________ IMAGE BOX __________ */


    & .desktop-view {
      display: flex;
      margin: 1.7rem 8% 0;
      & .reserva-desktop {
        flex-basis: 31%;
        border: 1px solid #dedede;
        border-radius: 6px;
        align-self: flex-start;
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
              border-radius: 5px;
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
                border-radius: 5px;
              }
              & #datepicker-trigger:hover {
                border: 1px solid var(--color01);
              }
            }
          }
          & .reserva-info {
            margin-top: .9rem;
            & .reserva-info_item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              & h3 {
                font-size: 15px;
              }
            }
            & .reserva-info_item-total {
              display: flex;
              justify-content: space-between;
              border-top: 1px solid #dedede;
              & h3 {
                font-size: 17px;
                font-weight: 500;
              }
            }
          }
          & .__reserva-desktop-btn {
            margin-top: 1.3rem;
            font-size: 17px;
            font-weight: 700;
            background: var(--colorPasseio);
            color: white;
            height: 3.2rem;
            width: 100%;
            border-radius: 200px;
          }
          & .__info {
            margin: .5rem 0 .8rem;
            text-align: center;
            font-size: 12px;
            font-weight: 500;
            line-height: 17px;
          }
          & .__reserva-desktop-ask-btn {
            font-size: 16px;
            font-weight: 600;
            background: white;
            color: var(--colorPasseio);
            height: 2rem;
          }
          & .__reserva-desktop-ask-btn:hover {
            text-decoration: underline;
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
        margin-right: 5%;
        flex-basis: 69%;



        /* __________ RATING BOX __________ */
        & .rating-box {
          padding: 0;
          margin-top: 0;
          & .__tipo {
            padding-right: 1rem;
            font-size: 16px;
            font-weight: 600;
          }
          & .rating {
            display: flex;
            align-items: center;
            & .rating-number {
              font-size: 16px;
              font-weight: 600;
              padding-left: 3px;
            }
          }
        }/* __________ RATING BOX __________ */




        /* __________ ANUNCIANTE BOX __________ */
        & .anunciante-box {
          padding: 1.5rem 0 2.5rem;
          & .__anunciante-img {
            width: 4rem;
            height: 4rem;
            margin-right: .7rem;
          }
          & .__anunciante-name {
          }
        }/* __________ ANUNCIANTE BOX __________ */




        /* __________ INFO BOX __________ */
        & .info-box {
          padding: 0; 
          display: flex;
          justify-content: space-between;
          & .item {
            display: flex;
            flex-flow: column;
            align-items: center;
            margin-top: .8rem;
            & .__img {
              width: 2.1rem;
              height: auto;
              margin: 0 0 .7rem 0;
            }
          }
        }/* __________ INFO BOX __________ */





        /* __________ SOBRE BOX __________ */
        & .sobre-box {
          padding: 0;
        }/* __________ SOBRE BOX __________ */





        /* __________ PONTOS VISITADOS BOX __________ */
        & .pontos-box {
          padding: 0;
        }/* __________ PONTOS VISITADOS BOX __________ */





        /* __________ LOCAL SAÍDA BOX __________ */
        & .local-saida-box {
          padding: 0;
        }/* __________ LOCAL SAÍDA BOX __________ */




        /* __________ AVALIAÇÕES BOX __________ */
        & .avaliacoes-box {
          padding: 0;
        }/* __________ AVALIAÇÕES BOX __________ */
      }
    }
    
  

    /* __________ RESERVA __________ */
    & .reserva-mobile {
      display: none;
    }/* __________ RESERVA __________ */
  }
}

</style>
