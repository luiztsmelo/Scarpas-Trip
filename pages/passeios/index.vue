<template>
  <div class="passeios" @click="closeFilterBtns(), $store.state.isMobile ? '' : filtrar()">

    <div class="passeios-container" :class="[ dropdownBtnIsOpen === true ? 'blur' : '' ]">



      <div class="loader" v-show="$store.state.allPasseios === null">
        <div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>
      </div>

    

      <!-- Card -->
      <nuxt-link class="card" v-for="(passeio, index) in $store.state.filteredPasseios !== null ? $store.state.filteredPasseios : $store.state.allPasseios" :key="passeio.passeioID" @mouseover.native="mouseOverCard(index)" @mouseout.native="mouseOutCard(index)" :to="`/passeios/${passeio.passeioID}`" v-show="$store.state.allPasseios !== null">

        <div class="image-box">
          <swiper :options="swiperOption">

            <swiper-slide class="slide" v-for="image in passeio.images" :key="image.id">
              <progressive-background class="__img" :src="imageH(image)" :placeholder="image.L" :aspect-ratio="2/3"/>
            </swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>
      
          </swiper>
        </div>

        <div class="card-details">

          <p class="__card-tipo-passeio">{{ passeio.tipoPasseio }}</p>

          <p class="__card-title">{{ passeio.title }}</p>

          <p class="__card-valor">R${{ passeio.rotas[0].valor.toLocaleString() }}<span class="__card-valor-dia"> por pessoa</span></p>

          <div class="rating" v-if="passeio.avaliacoes.length > 0">
            <star-rating
              :rating="passeio.averageRating"
              :increment="0.5"
              :read-only="true"
              :show-rating="false"
              active-color="#161616"
              inactive-color="#dedede"
              :star-size="10"
              :padding="2">
            </star-rating>
            <p class="rating-number">{{ passeio.avaliacoes.length }}</p>
          </div>

          <div class="new" v-else><p>NOVO</p></div>
          
        </div>
        
      </nuxt-link><!-- Card -->



      <div class="empty-state" v-show="$store.state.filteredPasseios !== null && $store.state.filteredPasseios.length === 0">
        <img src="../../assets/img/empty-state.svg" class="__img">
        <h1 class="__title">Nenhum passeio encontrado :(</h1>
        <h3>Tente ajustar os filtros para obter um melhor resultado.</h3>
        <button class="__limpar-filtros-btn" @click="$store.commit('m_resetFiltersPasseios')">Limpar filtros</button>
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




        <!-- Tipo passeio -->
        <div class="item-form">
          
          <div class="dropdown" @click.stop>

            <button type="button" class="dropdown-btn" :style="onTipoPasseioBtn" @click="onClickTipoPasseioBtn">
              {{ $store.state.filtersPasseios.tipoPasseio === null ? 'Tipo de passeio' : $store.state.filtersPasseios.tipoPasseio }}
            </button>

            <transition name="dropdown-animation">
              <div class="dropdown-body" v-show="showTipoPasseio">

                <div class="tipo-passeio-box">

                  <div class="option" v-for="(tipoPasseio, index) in tiposPasseios" :key="tipoPasseio.name" @click="$store.state.filtersPasseios.tipoPasseio = tipoPasseio.name">

                    <div class="radio"><div :class="[ $store.state.filtersPasseios.tipoPasseio === tipoPasseio.name ? 'radio-checkmark' : '' ]"></div></div>

                    <h3 class="__text" >{{ tipoPasseio.name }}</h3>

                  </div>

                </div>


                <div class="buttons">

                  <button type="button" class="__limpar-btn" :class="[ $store.state.filtersPasseios.tipoPasseio === null ? '__limpar-btn-disabled' : '']" @click="$store.state.filtersPasseios.tipoPasseio = null">Limpar</button>

                  <button type="button" class="__filtrar-btn" @click="filtrar()">Filtrar</button>

                </div>


              </div>
            </transition>

          </div>

        </div><!-- Tipo passeio -->





        <!-- Avaliação -->
        <div class="item-form">
          
          <div class="dropdown" @click.stop>

            <button type="button" class="dropdown-btn" :style="onAvaliacaoBtn" @click="onClickAvaliacaoBtn">Avaliação</button>

            <transition name="dropdown-animation">
              <div class="dropdown-body" v-show="showAvaliacao">

                <div class="avaliacao-box">


                </div>
                

                <div class="buttons">

                  <button type="button" class="__limpar-btn" :class="[ $store.state.filtersPasseios.avaliacao === null ? '__limpar-btn-disabled' : '']" @click="$store.state.filtersPasseios.avaliacao = null">Limpar</button>

                  <button type="button" class="__filtrar-btn" @click="filtrar()">Filtrar</button>

                </div>
                
                
              </div>
            </transition>

          </div>

        </div><!-- Avaliação -->
        


        <button type="button" class="__limpar-filtros-btn" v-show="selectedSomeFilter" @click="$store.commit('m_resetFiltersPasseios')">
          Limpar Filtros
        </button>



      </form>
    </div><!-- ___________________________ FILTRAR DESKTOP ___________________________ -->





    <gmap-map
      class="map-desktop"
      :class="[ dropdownBtnIsOpen === true ? 'blur' : '' ]"
      :center="{ lat: -20.6138638, lng: -46.0677806 }"
      :zoom="13"
      :options="{ styles: styles, draggable:  true, fullscreenControl: false , zoomControl: false , mapTypeControl: false, streetViewControl: false, gestureHandling: 'greedy' }">

      <GmapInfoWindow
        ref="infoWindow"
        v-show="$store.state.allPasseios !== null"
        v-for="passeio in $store.state.filteredPasseios !== null ? $store.state.filteredPasseios : $store.state.allPasseios"
        :key="passeio.passeioID"
        :position="{ lat: passeio.positionLAT, lng: passeio.positionLNG }">

        <nuxt-link :to="`/passeios/${passeio.passeioID}`" class="__valor">R${{ passeio.rotas[0].valor.toLocaleString() }}</nuxt-link>

      </GmapInfoWindow>

    </gmap-map>





    <!-- ___________________________ FILTRAR MOBILE ___________________________ -->
    <button class="filtrar-mobile-btn" :class="[ $store.state.filteredPasseios !== null ? 'filtrar-mobile-btn-active' : '']" @click="openFiltrarPasseios" v-show="$store.state.allPasseios !== null">
      <img class="__img" :class="[ $store.state.filteredPasseios !== null ? '__img-active' : '']" src="../../assets/img/filter.svg">
    </button>
    
    <filtrar-passeios/>
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
import FiltrarPasseios from '@/components/FiltrarPasseios'

export default {
  components: { FiltrarPasseios },
  mixins: [ mapstyle ],
  head () {
    return {
      title: 'Passeios em Capitólio ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
  data () {
    return {
      startDate: '',
      dropdownBtnIsOpen: false,
      showTipoPasseio: false,
      showAvaliacao: false,
      tiposPasseios: [
        { 'name': 'Lancha' },
        { 'name': '4x4' },
        { 'name': 'Buggy' },
        { 'name': 'Helicóptero' }
      ],
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
    imageH (image) {
      return supportsWebP ? image.HW : image.HJ
    },
    mouseOverCard (index) {
      this.$refs.infoWindow[index].$children[0].$el.style.color = '#198CFE'
    },
    mouseOutCard (index) {
      this.$refs.infoWindow[index].$children[0].$el.style.color = '#161616'
    },
    /* __________ FILTERS __________ */
    openFiltrarPasseios () {
      this.$store.commit('m_showFiltrarPasseios', true)
      window.location.hash = 'filtrar'
    },
    closeFilterBtns () {
      this.dropdownBtnIsOpen = false
      this.showTipoPasseio = false
      this.showAvaliacao = false
    },
    onClickTipoPasseioBtn () {
      this.dropdownBtnIsOpen = true
      this.showTipoPasseio = !this.showTipoPasseio
      this.showAvaliacao = false
    },
    onClickPrecoBtn () {
      this.dropdownBtnIsOpen = true
      this.showTipoPasseio = false
      this.showAvaliacao = false
    },
    onClickAvaliacaoBtn () {
      this.dropdownBtnIsOpen = true
      this.showTipoPasseio = false
      this.showAvaliacao = !this.showAvaliacao
    },
    filterByTipoPasseio (passeio) {
      return this.filtersPasseios.tipoPasseio !== null ? passeio.tipoPasseio === this.filtersPasseios.tipoPasseio : []
    },
    filtrar () {
      this.closeFilterBtns()
      
      const filteredPasseios = this.$store.state.allPasseios.filter(passeio => {
        return this.filterByTipoPasseio(passeio) 
      })

      this.$store.commit('m_filteredPasseios', filteredPasseios)
    }
  },
  computed: {
    filtersPasseios () { return this.$store.state.filtersPasseios },
    minDate () {
      return subDays(Date(), 1)
    },
    selectedSomeFilter () {
      if (this.filtersPasseios.date !== null || this.filtersPasseios.tipoPasseio !== null || this.filtersPasseios.avaliacao !== null) {
        return true
      } else {
        return false
      }
    },
    onTipoPasseioBtn () {
      if (this.showTipoPasseio || this.filtersPasseios.tipoPasseio !== null) {
         return 'background: #198CFE; color: white; border: 1px solid #198CFE'
      }
    },
    onAvaliacaoBtn () {
      if (this.showAvaliacao || this.filtersPasseios.avaliacao !== null) {
         return 'background: #198CFE; color: white; border: 1px solid #198CFE'
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      vm.$store.state.offFoobar1 = true
      vm.$store.state.offFoobar2 = true
      vm.$store.state.offFoobar3 = true
      vm.$store.state.offFoobar4 = false
      vm.$store.state.offFoobar5 = true
      !vm.$store.state.isOnline ? vm.$modal.show('offline-modal') : ''
      !vm.$store.state.showFoobar ? vm.$store.commit('m_showFoobar', true) : ''
      !vm.$store.state.showNavbar ? vm.$store.commit('m_showNavbar', true) : ''

      const passeios = await firebase.firestore().collection('passeios').get()
      vm.$store.commit('m_allPasseios', passeios.docs.map(passeio => passeio.data()))
    })
  }
}
</script>

<style>
@import url('~/assets/css/pagination.css');
@import url('~/assets/css/radio-desktop.css');

.passeios {
  margin: var(--navbarHeightMobile) 0 5.4rem 0;
  display: flex;
  flex-flow: column;
  transition: var(--pages-transition);
  & .passeios-container {
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
        background-color: #161616;
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
        color: var(--colorPasseio);
        font-weight: 600;
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
        margin-bottom: .5rem;
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
        & .__card-tipo-passeio {
          padding-top: .1rem;
          text-transform: uppercase;
          font-size: 11px;
          font-weight: 600;
          color: var(--colorPasseio);
        }
        & .__card-title {
          padding: .4rem 0;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.3;
        }
        & .__card-valor {
          font-size: 15px;
          font-weight: 500;
          & .__card-valor-dia {
            font-size: 15px;
            font-weight: 500;
          }
        }
        & .rating {
          padding-top: .2rem;
          display: flex;
          align-items: center;
          & .rating-number {
            font-size: 12px;
            font-weight: 500;
            padding-left: 2px;
          }
        }
        & .new {
          margin-top: .4rem;
          display: inline-flex;
          border: 1px solid #dedede;
          border-radius: 50px;
          & p {
            padding: 3px 8px;
            font-size: 11px;
            font-weight: 600;
          }
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
    background: var(--colorPasseio);
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
  .passeios {
    margin: 0;
    display: flex;
    flex-flow: row;
    & .passeios-container {
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
          & .__card-tipo-passeio {
          }
          & .__card-title {
            font-size: 16px;
          }
          & .__card-valor {
            font-size: 14px;
            & .__card-valor-dia {
              font-size: 14px;
            }
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
              & .tipo-passeio-box {
                display: flex;
                flex-flow: row wrap;
                & .option {
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  padding: .6rem 0;
                  width: 50%;
                  & .__text {
                    user-select: none;
                    padding-left: 7px;
                    font-size: 15px;
                  }
                }
                & .option:hover > .radio {
                  border: 1px solid #161616;
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
                    font-weight: 600;
                    padding-bottom: .2rem;
                  }
                  & .__valor {
                    font-size: 15px;
                  }
                }
                & .quantia:hover > .radio {
                  border: 1px solid #161616;
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
                  font-weight: 600;
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
                  color: var(--colorPasseio);
                  font-size: 15px;
                  font-weight: 600;
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
      /* bottom: 1rem; */
      right: 7%;
      width: 26.5%;
      height: 100%;
      /* height: calc(100% - var(--navbarHeightDesktop) - 3.7rem - 2rem); */
    }
    /* & .map-desktop > div {
      border-radius: 3px !important;
    } */
    & .map-desktop > div > div {
      background-color: #fff !important;
    }
    & .gm-style-iw {
      padding: .3rem 0 .2rem 0;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100px;
      transform: translateY(24px);
      & .__valor {
        cursor: pointer;
        font-family: var(--main-font) !important;
        font-size: 14px;
        font-weight: 500;
        transition: var(--main-transition);
      }
    }
    & .gm-style > div > div > div > div > div > button { /* Remove close button */
      display: none !important;
    }
    & .gm-style > div > div > div > div > div > div > div { /* Remove white borders */
      background-color: transparent !important;
      box-shadow: none !important;
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
