<template>
  <div class="eventos" @click="closeFilterBtns(), $store.state.isMobile ? '' : filtrar()">

    <div class="eventos-container" :class="[ dropdownBtnIsOpen === true ? 'blur' : '' ]">



      <div class="loader" v-show="$store.state.allEventos === null">
        <div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>
      </div>

    

      <!-- Card -->
      <nuxt-link class="card" v-for="(evento, index) in $store.state.filteredEventos !== null ? $store.state.filteredEventos : $store.state.allEventos" :key="evento.eventoID" @mouseover.native="mouseOverCard(index)" @mouseout.native="mouseOutCard(index)" :to="`/eventos/${evento.eventoID}`" v-show="$store.state.allEventos !== null">

        <div class="image-box">
          <progressive-background class="__img" :src="flyerH(evento)" :placeholder="evento.flyerL" :aspect-ratio="2/3"/>
        </div>

        <div class="card-details">
          
          <p class="__card-info">{{ eventoDate(evento) }}</p>

          <h3 class="__card-title">{{ evento.title }}</h3>

          <p class="__card-valor">R${{ evento.valorIngresso }} por pessoa</p>
          
        </div>
        
      </nuxt-link><!-- Card -->



      <div class="empty-state" v-show="$store.state.filteredEventos !== null && $store.state.filteredEventos.length === 0">
        <img src="../../assets/img/empty-state.svg" class="__img">
        <h2 class="__title">Nenhum evento encontrado :(</h2>
        <p>Tente ajustar os filtros para obter um melhor resultado.</p>
        <button class="__limpar-filtros-btn" @click="$store.commit('m_resetFiltersEventos')">Limpar filtros</button>
      </div>
      

    </div>



    <!-- ___________________________ FILTRAR DESKTOP ___________________________ -->
    <div class="filtrar-desktop">
      <form class="filtrar-desktop-form">
        

        <!-- Data -->
        <div class="item-form">
          <div class="datepicker-trigger">
            <button
              type="button"
              id="datepicker-trigger">
              {{ formatDates(date) }}
            </button>

            <AirbnbStyleDatepicker
              :trigger-element-id="'datepicker-trigger'"
              :fullscreen-mobile="true"
              :showShortcutsMenuTrigger="false"
              :monthsToShow="1"
              :offsetY="10"
              :min-date="minDate"
              :date-one="date"
              @date-one-selected="val => { date = val }"
            />
          </div>
        </div><!-- Data -->

  

        <button type="button" class="__limpar-filtros-btn" v-show="selectedSomeFilter" @click="$store.commit('m_resetFiltersEventos')">
          Limpar Filtros
        </button>



      </form>
    </div><!-- ___________________________ FILTRAR DESKTOP ___________________________ -->





    <gmap-map
      class="map-desktop"
      :class="[ dropdownBtnIsOpen === true ? 'blur' : '' ]"
      :center="{ lat: -20.6138638, lng: -46.0677806 }"
      :zoom="12"
      :options="{ styles: styles, draggable:  true, fullscreenControl: false , zoomControl: false , mapTypeControl: false, streetViewControl: false, gestureHandling: 'greedy' }">
      
      <GmapInfoWindow
        ref="infoWindow"
        v-show="$store.state.allEventos !== null"
        v-for="evento in $store.state.filteredEventos !== null ? $store.state.filteredEventos : $store.state.allEventos"
        :key="evento.eventoID"
        :position="{ lat: evento.positionLAT, lng: evento.positionLNG }">

        <nuxt-link :to="`/eventos/${evento.eventoID}`" class="__valor">R${{ evento.valorIngresso }}</nuxt-link>

      </GmapInfoWindow>

    </gmap-map>





    <!-- ___________________________ FILTRAR MOBILE ___________________________ -->
    <button class="filtrar-mobile-btn" :class="[ $store.state.filteredEventos !== null ? 'filtrar-mobile-btn-active' : '']" @click="openFiltrarEventos" v-show="$store.state.allEventos !== null">
      <img class="__img" :class="[ $store.state.filteredEventos !== null ? '__img-active' : '']" src="../../assets/img/filter.svg">
    </button>
    
    <filtrar-eventos/>
    <!-- ___________________________ FILTRAR MOBILE ___________________________ -->



    

  </div>
</template>

<script>
import firebase from '@firebase/app'
import 'firebase/firestore'
import supportsWebP from 'supports-webp'
import format from 'date-fns/format'
import pt from 'date-fns/locale/pt'
import subDays from 'date-fns/sub_days'
import { mapstyle } from '@/mixins/mapstyle'
import FiltrarEventos from '@/components/FiltrarEventos'

export default {
  components: { FiltrarEventos },
  mixins: [ mapstyle ],
  head () {
    return {
      title: 'Eventos em Capitólio ‒ Escarpas Trip',
      meta: [
        { hid: 'eventos', name: 'description', content: 'Os melhores eventos em Capitólio e região.' }
      ]
    }
  },
  transition: 'opacity',
  data () {
    return {
      dropdownBtnIsOpen: false,
      swiperOption: {
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          dynamicBullets: true,
          dynamicMainBullets: 5
        }
      }
    }
  },
  methods: {
    formatDates (date) {
      return date === '' ? 'Data' : format(date, 'D [de] MMM', { locale: pt })
    },
    flyerH (evento) {
      return supportsWebP ? evento.flyerHW : evento.flyerHJ
    },
    eventoDate (evento) {
      const dateFormatted = format(evento.dates[0].date, 'DD/MM/YYYY')
      return `${dateFormatted} ⋅ ${evento.dates[0].startTime}`
    },
    mouseOverCard (index) {
      this.$refs.infoWindow[index].$children[0].$el.style.color = '#FF7E65'
    },
    mouseOutCard (index) {
      this.$refs.infoWindow[index].$children[0].$el.style.color = '#343434'
    },
    /* __________ FILTERS __________ */
    openFiltrarEventos () {
      this.$store.commit('m_showFiltrarEventos', true)
      window.location.hash = 'filtrar'
    },
    closeFilterBtns () {
      this.dropdownBtnIsOpen = false
    },
    filtrar () {
      this.closeFilterBtns()
      
      const filteredEventos = this.$store.state.allEventos.filter(evento => {
        return this.filterByTipoEvento(evento) 
      })

      this.$store.commit('m_filteredEventos', filteredEventos)
    }
  },
  computed: {
    filtersEventos () { return this.$store.state.filtersEventos },
    minDate () {
      return subDays(Date(), 1)
    },
    selectedSomeFilter () {
      if (this.filtersEventos.date !== null) {
        return true
      } else {
        return false
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      vm.$store.state.foobar1 = false
      vm.$store.state.foobar2 = false
      vm.$store.state.foobar3 = true
      vm.$store.state.foobar4 = false
      !vm.$store.state.isOnline ? vm.$modal.show('offline-modal') : ''
      !vm.$store.state.showFoobar ? vm.$store.commit('m_showFoobar', true) : ''
      !vm.$store.state.showNavbar ? vm.$store.commit('m_showNavbar', true) : ''

      const eventos = await firebase.firestore().collection('eventos').get()
      vm.$store.commit('m_allEventos', eventos.docs.map(evento => evento.data()))
    })
  }
}
</script>

<style>
@import url('~/assets/css/pagination.css');
@import url('~/assets/css/radio-desktop.css');

.eventos {
  margin: var(--navbarHeightMobile) 0 5.4rem 0;
  display: flex;
  flex-flow: column;
  transition: var(--pages-transition);
  & .eventos-container {
    position: relative;
    padding: 3% 0;
    margin-bottom: 1rem;
    display: flex;
    flex-flow: column;
    transition: var(--main-transition);
    & .loader {
      position: absolute;
      top: 3rem;
      left: 50%;
      transform: translateX(-50%);
      & .spinner > div {
        width: 7px;
        height: 7px;
        background-color: #343434;
        border-radius: 100%;
        display: inline-flex;
        margin: 0 .18rem;
        animation: sk-bouncedelay 1.2s infinite ease-in-out both;
      }
      & .spinner .bounce1 {
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
      }
      & .spinner .bounce2 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
      }
    }
    & .empty-state {
      display: flex;
      flex-flow: column;
      align-items: flex-start;
      width: 100%;
      height: calc(100vh - var(--navbarHeightDesktop) - 3.7rem - 2rem);
      padding: 1rem 7%;
      & .__img {
        width: 7rem;
        height: auto;
      }
      & .__title {
        font-size: 25px;
        padding: .4rem 0;
      }
      & .__limpar-filtros-btn {
        background: white;
        color: var(--colorEvento);
        font-weight: 700;
        padding: 0;
        margin: 1.2rem 0;
      }
      & .__limpar-filtros-btn:hover {
        text-decoration: underline;
      }
    }
    & .card {
      width: 93%;
      padding: 4% 0 0 7%;
      & .image-box {
        overflow: hidden;
        line-height: 0;
        margin-bottom: .4rem;
        border-radius: 5px;
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
      }
      & .card-details {
        & .__card-info {
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 500;
          color: var(--colorEvento);
        }
        & .__card-title {
          font-size: 19px;
          font-weight: 700;
          line-height: 1.3;
        }
        & .__card-valor {
          font-size: 15px;
          font-weight: 400;
        }
      }
    }
  }
  & .filtrar-mobile-btn {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 8888;
    bottom: 4.6rem;
    right: 7%;
    height: 3.6rem;
    width: 3.6rem;
    background: white;
    transition: all .3s ease;
    box-shadow: 1px 1px 7px 1px rgba(0,0,0,0.2);
    border-radius: 50%;
    & .__img {
      width: 1.5rem;
      height: auto;
    }
  }
  & .filtrar-mobile-btn-active {
    background: var(--colorEvento);
    & .__img-active {
      filter: invert(100%) brightness(200%);
    }
  }
}

@media (max-width: 1023px) {
  .filtrar-desktop { display: none; }
  .map-desktop { display: none; }
}

@media (min-width: 1024px) {
  .eventos {
    margin: 0;
    display: flex;
    flex-flow: row;
    & .eventos-container {
      margin-top: calc(var(--navbarHeightDesktop) + 3.7rem + 1rem);
      width: 64.8%;
      padding: 0 0 0 7%;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      & .empty-state {
        padding: 1rem 0;
        & .__img {
        }
        & .__title {
          font-size: 27px;
        }
        & .__limpar-filtros-btn {
        }
      }
      & .card {
        width: 49.1%;
        min-height: 21rem;
        padding: 0;
        margin-bottom: 1rem;
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
        }
        & .card-details {
          & .__card-info {
          }
          & .__card-title {
            font-size: 18px;
          }
          & .__card-valor {
          }
        }
      }
    }
    & .filtrar-desktop {
      position: fixed;
      top: var(--navbarHeightDesktop);
      left: 0;
      z-index: 20;
      width: 100%;
      background: white;
      & .filtrar-desktop-form {
        position: relative;
        padding: 0 7%;
        height: 3.7rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #dedede;
        & .item-form {
          margin-right: .8rem;
          & .datepicker-trigger {
            height: 2.1rem;
            background: white;
            & #datepicker-trigger {
              padding: 0 .9rem;
              height: 100%;
              width: 100%;
              font-size: 14px;
              font-weight: 400;
              background: white;
              border: 1px solid #dedede;
              outline: none;
              border-radius: 100px;
            }
            & #datepicker-trigger:hover {
              border: 1px solid rgb(245,245,245);
              filter: invert(4%);
            }
          }
          & .dropdown {
            position: relative;
            display: inline-flex;
            & .dropdown-btn {
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 2.1rem;
              font-size: 14px;
              font-weight: 400;
              padding: 0 .9rem;
              border: 1px solid #dedede;
              outline: none;
              border-radius: 100px;
              background: white;
            }
            & .dropdown-btn:hover {
              border: 1px solid rgb(245,245,245);
              filter: invert(4%);
            }
            & .dropdown-body {
              display: flex;
              flex-flow: column;
              position: absolute;
              top: 2.8rem;
              width: 23rem;
              background-color: white;
              padding: 1.6rem;
              border-radius: 5px;
              box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
              z-index: 100;
              transition: var(--main-transition);
              & .number-box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                & .input-number {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  width: 6.8rem;
                  & .__btn {
                    position: relative;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 2rem;
                    height: 2rem;
                    border: 1px solid var(--color01);
                    border-radius: 50%;
                    & .minus {
                      width: 8px;
                      height: 1px;
                      background: var(--color01);
                    }
                    & .plus-horiz {
                      width: 10px;
                      height: 1px;
                      background: var(--color01);
                    }
                    & .plus-vert {
                      position: absolute;
                      transform: rotate(90deg);
                      width: 10px;
                      height: 1px;
                      background: var(--color01);
                    }
                  }
                  & .__btn-disabled {
                    opacity: .2;
                  }
                }
              }
              & .preco-box {
                display: flex;
                flex-flow: column;
                & .quantia {
                  position: relative;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  height: 3rem;
                  user-select: none;
                  & .__text {
                    position: absolute;
                    left: 2rem;
                    font-size: 15px;
                    font-weight: 700;
                    padding-bottom: .2rem;
                  }
                  & .__valor {
                    font-size: 15px;
                  }
                }
                & .quantia:hover > .radio {
                  border: 1px solid #343434;
                }
              }
              & .buttons {
                display: flex;
                align-items: center;
                position: relative;
                margin-top: 3.5rem;
                & .__limpar-btn {
                  position: absolute;
                  left: 0;
                  bottom: 0;
                  padding: 0;
                  height: 2.1rem;
                  background: transparent;
                  font-size: 15px;
                  font-weight: 700;
                  transition: var(--main-transition);
                }
                & .__limpar-btn:hover {
                  text-decoration: underline;
                }
                & .__limpar-btn-disabled {
                  display: none;
                }
                & .__filtrar-btn {
                  position: absolute;
                  right: 0;
                  bottom: 0;
                  padding: 0;
                  height: 2.1rem;
                  background: transparent;
                  color: var(--colorEvento);
                  font-size: 15px;
                  font-weight: 700;
                  transition: var(--main-transition);
                }
                & .__filtrar-btn:hover {
                  text-decoration: underline;
                }
              }
            }
          }
        }
        & .__limpar-filtros-btn {
          position: absolute;
          right: 7%;
          background: transparent;
          font-size: 15px;
          font-weight: 500;
        }
        & .__limpar-filtros-btn:hover {
          text-decoration: underline;
        }
      }
    }
    & .filtrar-mobile-btn {
      display: none;
    }
    & .map-desktop {
      position: fixed;
      right: 7%;
      width: 26.5%;
      height: 100%;
    }
    & .map-desktop > div > div {
      background-color: #fff !important;
    }
    & .gm-style-iw {
      background: #fff;
      padding: 0px;
      & .__valor {
        padding: 6px;
        cursor: pointer;
        font-family: var(--main-font) !important;
        font-size: 14px;
        font-weight: 500;
        transition: var(--main-transition);
      }
    }
    & .gm-style-iw-d {
      overflow: initial !important;
    }
    & .gm-style > div > div > div > div > div > div > div > div > button { /* Remove close button */
      display: none !important;
    }
    & .gm-style div div div div div div div div { /* Remove shadow of down arrow */
      box-shadow: none !important;
    }
  }
}

.blur {
  opacity: .2;
  pointer-events: none;
  user-select: none;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}
@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}

/* TRANSITIONS */
.dropdown-animation-enter, .dropdown-animation-leave-active {
  opacity: 0;
  transform: translateY(-1rem);
}

</style>
