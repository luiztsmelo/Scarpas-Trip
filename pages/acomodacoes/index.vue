<template>
  <div class="acomods" @click="closeFilterBtns(), $store.state.isMobile ? '' : filtrar()">

    <div class="acomods-container" :class="[ dropdownBtnIsOpen === true ? 'blur' : '' ]">



      <div class="loader" v-show="$store.state.allAcomods === null">
        <div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>
      </div>

    

      <!-- Card -->
      <nuxt-link class="card" v-for="(acomod, index) in $store.state.filteredAcomods !== null ? $store.state.filteredAcomods : $store.state.allAcomods" :key="acomod.acomodID" @mouseover.native="mouseOverCard(index)" @mouseout.native="mouseOutCard(index)" :to="`/acomodacoes/${acomod.acomodID}`" v-show="$store.state.allAcomods !== null">

        <div class="image-box">
          <swiper :options="swiperOption">

            <swiper-slide class="slide" v-for="image in acomod.images" :key="image.id">
              <progressive-background class="__img" :src="imageH(image)" :placeholder="image.L" :aspect-ratio="2/3"/>
            </swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>
      
          </swiper>
        </div>

        <div class="card-details">

          <p class="__card-tipo-acomod">{{ acomod.tipoAcomod }}</p>

          <h3 class="__card-title">{{ acomod.title }}</h3>

          <p class="__card-valor">R${{ valorNoite(acomod) }} por noite</p>

          <div class="rating" v-if="acomod.avaliacoes.length > 0">
            <star-rating
              :rating="acomod.averageRating"
              :increment="0.5"
              :read-only="true"
              :show-rating="false"
              active-color="#343434"
              inactive-color="#dedede"
              :star-size="10"
              :padding="2">
            </star-rating>
            <span class="rating-number">{{ acomod.avaliacoes.length }}</span>
          </div>

          <div class="new" v-else><span>NOVA</span></div>
          
        </div>
        
      </nuxt-link><!-- Card -->



      <div class="empty-state" v-show="$store.state.filteredAcomods !== null && $store.state.filteredAcomods.length === 0">
        <img src="../../assets/img/empty-state.svg" class="__img">
        <h2 class="__title">Nenhuma acomodação encontrada :(</h2>
        <p>Tente ajustar os filtros para obter um melhor resultado.</p>
        <button class="__limpar-filtros-btn" @click="$store.commit('m_resetFilters')">Limpar filtros</button>
      </div>
      

    </div>



    <!-- ___________________________ FILTRAR DESKTOP ___________________________ -->
    <div class="filtrar-desktop">
      <form class="filtrar-desktop-form">
        

        <!-- Datas -->
        <div class="item-form">
          <div class="datepicker-trigger">
            <button
              type="button"
              id="datepicker-trigger">
              {{ formatDates(startDate, endDate) }}
            </button>

            <AirbnbStyleDatepicker
              :trigger-element-id="'datepicker-trigger'"
              :fullscreen-mobile="true"
              :showShortcutsMenuTrigger="false"
              :monthsToShow="1"
              :offsetY="10"
              :min-date="minDate"
              :date-one="startDate"
              :date-two="endDate"
              @date-one-selected="val => { startDate = val }"
              @date-two-selected="val => { endDate = val }"
            />
          </div>
        </div><!-- Datas -->


        
        <!-- Local -->
        <div class="item-form">
          
          <div class="dropdown" @click.stop>

            <button type="button" class="dropdown-btn" :style="onLocalBtn" @click="onClickLocalBtn">Local</button>

            <transition name="dropdown-animation">
              <div class="dropdown-body" v-show="showLocal">

                <div class="local-box">


                </div>
                

                <div class="buttons">

                  <button type="button" class="__limpar-btn" :class="[ $store.state.filters.local === null ? '__limpar-btn-disabled' : '']" @click="$store.state.filters.local = null">Limpar</button>

                  <button type="button" class="__filtrar-btn" @click="filtrar()">Filtrar</button>

                </div>
                
                
              </div>
            </transition>

          </div>

        </div><!-- Local -->



        <!-- Hóspedes -->
        <div class="item-form">
          
          <div class="dropdown" @click.stop>

            <button type="button" class="dropdown-btn" :style="onHospedesBtn" @click="onClickHospedesBtn">
              {{ $store.state.filters.hospedes > 0 ? `Acomoda até ${$store.state.filters.hospedes} hóspedes` : 'Hóspedes' }}
            </button>

            <transition name="dropdown-animation">
              <div class="dropdown-body" v-show="showHospedes">

                <div class="number-box">

                  <h3>Número de hóspedes</h3>

                  <div class="input-number">
                    <div class="__btn" :class="$store.state.filters.hospedes === 0 ? '__btn-disabled' : ''" @click="$store.commit('m_decrementHospedes')"><div class="minus"></div></div>

                    <p>{{ $store.state.filters.hospedes }}</p>

                    <div class="__btn" :class="$store.state.filters.hospedes === 25 ? '__btn-disabled' : ''" @click="$store.commit('m_incrementHospedes')"><div class="plus-horiz"></div><div class="plus-vert"></div></div>
                  </div>

                </div>


                <div class="buttons">

                  <button type="button" class="__limpar-btn" :class="[ $store.state.filters.hospedes === 0 ? '__limpar-btn-disabled' : '']" @click="$store.state.filters.hospedes = 0">Limpar</button>

                  <button type="button" class="__filtrar-btn" @click="filtrar()">Filtrar</button>

                </div>


              </div>
            </transition>

          </div>

        </div><!-- Hóspedes -->



        <!-- Tipo acomod -->
        <div class="item-form">
          
          <div class="dropdown" @click.stop>

            <button type="button" class="dropdown-btn" :style="onTipoAcomodBtn" @click="onClickTipoAcomodBtn">
              {{ $store.state.filters.tipoAcomod === null ? 'Tipo de acomodação' : $store.state.filters.tipoAcomod }}
            </button>

            <transition name="dropdown-animation">
              <div class="dropdown-body" v-show="showTipoAcomod">

                <div class="tipo-acomod-box">

                  <div class="option" v-for="(tipoAcomod, index) in tiposAcomods" :key="tipoAcomod.name" @click="$store.state.filters.tipoAcomod = tipoAcomod.name">

                    <div class="radio"><div :class="[ $store.state.filters.tipoAcomod === tipoAcomod.name ? 'radio-checkmark' : '' ]"></div></div>

                    <p class="__text" >{{ tipoAcomod.name }}</p>

                  </div>

                </div>


                <div class="buttons">

                  <button type="button" class="__limpar-btn" :class="[ $store.state.filters.tipoAcomod === null ? '__limpar-btn-disabled' : '']" @click="$store.state.filters.tipoAcomod = null">Limpar</button>

                  <button type="button" class="__filtrar-btn" @click="filtrar()">Filtrar</button>

                </div>


              </div>
            </transition>

          </div>

        </div><!-- Tipo acomod -->



        <!-- Preço -->
        <div class="item-form">
          
          <div class="dropdown" @click.stop>

            <button type="button" class="dropdown-btn" :style="onPrecoBtn" @click="onClickPrecoBtn">
              {{ $store.state.filters.preco === 'low' ? 'Até R$199' : $store.state.filters.preco === 'mid' ? 'R$200 - R$399' : $store.state.filters.preco === 'high' ? 'R$400+' : 'Preço por noite'}}
            </button>

            <transition name="dropdown-animation">
              <div class="dropdown-body" v-show="showPreco">

                <div class="preco-box">

                  <div class="quantia" @click="$store.state.filters.preco = 'low'">
                    <div class="radio"><div :class="[ $store.state.filters.preco === 'low' ? 'radio-checkmark' : '' ]"></div></div>
                    <span class="__text">Econômico</span>
                    <span class="__valor">Até R$199</span>
                  </div>

                  <div class="quantia" @click="$store.state.filters.preco = 'mid'">
                    <div class="radio"><div :class="[ $store.state.filters.preco === 'mid' ? 'radio-checkmark' : '' ]"></div></div>
                    <span class="__text">Custo-benefício</span>
                    <span class="__valor">R$200 - R$399</span>
                  </div>

                  <div class="quantia" @click="$store.state.filters.preco = 'high'">
                    <div class="radio"><div :class="[ $store.state.filters.preco === 'high' ? 'radio-checkmark' : '' ]"></div></div>
                    <span class="__text">Luxo</span>
                    <span class="__valor">R$400+</span>
                  </div>

                </div>
                

                <div class="buttons">

                  <button type="button" class="__limpar-btn" :class="[ $store.state.filters.preco === null ? '__limpar-btn-disabled' : '']" @click="$store.state.filters.preco = null">Limpar</button>

                  <button type="button" class="__filtrar-btn" @click="filtrar()">Filtrar</button>

                </div>
                
                
              </div>
            </transition>

          </div>

        </div><!-- Preço -->



        <!-- Avaliação -->
        <div class="item-form">
          
          <div class="dropdown" @click.stop>

            <button type="button" class="dropdown-btn" :style="onAvaliacaoBtn" @click="onClickAvaliacaoBtn">Avaliação</button>

            <transition name="dropdown-animation">
              <div class="dropdown-body" v-show="showAvaliacao">

                <div class="avaliacao-box">


                </div>
                

                <div class="buttons">

                  <button type="button" class="__limpar-btn" :class="[ $store.state.filters.avaliacao === null ? '__limpar-btn-disabled' : '']" @click="$store.state.filters.avaliacao = null">Limpar</button>

                  <button type="button" class="__filtrar-btn" @click="filtrar()">Filtrar</button>

                </div>
                
                
              </div>
            </transition>

          </div>

        </div><!-- Avaliação -->
        


        <button type="button" class="__limpar-filtros-btn" v-show="selectedSomeFilter" @click="$store.commit('m_resetFilters')">
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
        v-show="$store.state.allAcomods !== null"
        v-for="acomod in $store.state.filteredAcomods !== null ? $store.state.filteredAcomods : $store.state.allAcomods"
        :key="acomod.acomodID"
        :position="{lat: acomod.positionLAT, lng: acomod.positionLNG}">

        <nuxt-link :to="`/acomodacoes/${acomod.acomodID}`" class="__valor">R${{ valorNoite(acomod) }}</nuxt-link>

      </GmapInfoWindow>

    </gmap-map>





    <!-- ___________________________ FILTRAR MOBILE ___________________________ -->
    <button class="filtrar-mobile-btn" :class="[ $store.state.filteredAcomods !== null ? 'filtrar-mobile-btn-active' : '']" @click="openFiltrarAcomods" v-show="$store.state.allAcomods !== null">
      <img class="__img" :class="[ $store.state.filteredAcomods !== null ? '__img-active' : '']" src="../../assets/img/filter.svg">
    </button>
    
    <filtrar-acomods/>
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
import FiltrarAcomods from '@/components/FiltrarAcomods'

export default {
  components: { FiltrarAcomods },
  mixins: [ mapstyle ],
  head () {
    return {
      title: 'Acomodações em Capitólio ‒ Escarpas Trip',
      meta: [
        { hid: 'acomods', name: 'description', content: 'Reserve Casas, Suítes, Ranchos, Campings, Hostels, Chácaras, Sítios.' }
      ]
    }
  },
  transition: 'opacity',
  data () {
    return {
      startDate: '',
      endDate: '',
      dropdownBtnIsOpen: false,
      showLocal: false,
      showHospedes: false,
      showTipoAcomod: false,
      showPreco: false,
      showAvaliacao: false,
      tiposAcomods: [
        { 'name': 'Casa' },
        { 'name': 'Apartamento' },
        { 'name': 'Rancho' },
        { 'name': 'Chácara' },
        { 'name': 'Camping' },
        { 'name': 'Sítio' },
        { 'name': 'Fazenda' },
        { 'name': 'Hostel' }
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
    formatDates (startDate, endDate) {
      let formattedDates = ''
      if (startDate === '') {
        return 'Datas'
      } else {
        startDate ? formattedDates = format(startDate, 'D [de] MMM', { locale: pt }) : ''
        endDate ? formattedDates += ' - ' + format(endDate, 'D [de] MMM', { locale: pt }) : ''
        return formattedDates
      }
    },
    imageH (image) {
      return supportsWebP ? image.HW : image.HJ
    },
    valorNoite (acomod) {
      /* if date match weekdays */
      return acomod.valorNoiteWeekdays
      /* if date match weekend */
      /* return acomod.valorNoiteWeekend */
      /* if date match feriado */
      /* return acomod.valorNoiteFeriados */
    },
    mouseOverCard (index) {
      this.$refs.infoWindow[index].$children[0].$el.style.color = '#FFA04F'
    },
    mouseOutCard (index) {
      this.$refs.infoWindow[index].$children[0].$el.style.color = '#343434'
    },
    /* __________ FILTERS __________ */
    openFiltrarAcomods () {
      this.$store.commit('m_showFiltrarAcomods', true)
      window.location.hash = 'filtrar'
    },
    closeFilterBtns () {
      this.dropdownBtnIsOpen = false
      this.showLocal = false
      this.showHospedes = false
      this.showTipoAcomod = false
      this.showPreco = false
      this.showAvaliacao = false
    },
    onClickLocalBtn () {
      this.dropdownBtnIsOpen = true
      this.showLocal = !this.showLocal
      this.showHospedes = false
      this.showTipoAcomod = false
      this.showPreco = false
      this.showAvaliacao = false
    },
    onClickHospedesBtn () {
      this.dropdownBtnIsOpen = true
      this.showLocal = false
      this.showHospedes = !this.showHospedes
      this.showTipoAcomod = false
      this.showPreco = false
      this.showAvaliacao = false
    },
    onClickTipoAcomodBtn () {
      this.dropdownBtnIsOpen = true
      this.showLocal = false
      this.showHospedes = false
      this.showTipoAcomod = !this.showTipoAcomod
      this.showPreco = false
      this.showAvaliacao = false
    },
    onClickPrecoBtn () {
      this.dropdownBtnIsOpen = true
      this.showLocal = false
      this.showHospedes = false
      this.showTipoAcomod = false
      this.showPreco = !this.showPreco
      this.showAvaliacao = false
    },
    onClickAvaliacaoBtn () {
      this.dropdownBtnIsOpen = true
      this.showLocal = false
      this.showHospedes = false
      this.showTipoAcomod = false
      this.showPreco = false
      this.showAvaliacao = !this.showAvaliacao
    },
    filterByHospedes (acomod) {
      return this.filters.hospedes > 0 ? acomod.totalHospedes >= this.filters.hospedes : []
    },
    filterByTipoAcomod (acomod) {
      return this.filters.tipoAcomod !== null ? acomod.tipoAcomod === this.filters.tipoAcomod : []
    },
    filterByPreco (acomod) {
      if (this.filters.preco !== null) {
        if (this.filters.preco === 'low') {
          return acomod.valorNoite <= 199
        } 
        else if (this.filters.preco === 'mid') {
          return acomod.valorNoite >= 200 && acomod.valorNoite <= 399
        } 
        else if (this.filters.preco === 'high') {
          return acomod.valorNoite >= 400
        }
      } else {
        return []
      }
    },
    filtrar () {
      this.closeFilterBtns()
      
      const filteredAcomods = this.$store.state.allAcomods.filter(acomod => {
        return this.filterByHospedes(acomod) && 
                this.filterByTipoAcomod(acomod) && 
                this.filterByPreco(acomod)
      })

      this.$store.commit('m_filteredAcomods', filteredAcomods)
    }
  },
  computed: {
    filters () { return this.$store.state.filters },
    minDate () {
      return subDays(Date(), 1)
    },
    selectedSomeFilter () {
      if (this.filters.date !== null || this.filters.hospedes > 0 || this.filters.tipoAcomod !== null || this.filters.preco !== null || this.filters.avaliacao !== null) {
        return true
      } else {
        return false
      }
    },
    onLocalBtn () {
      if (this.showLocal || this.filters.local !== null) {
         return 'background: #FFA04F; color: white; border: 1px solid #FFA04F'
      }
    },
    onHospedesBtn () {
      if (this.showHospedes || this.filters.hospedes > 0) {
         return 'background: #FFA04F; color: white; border: 1px solid #FFA04F'
      }
    },
    onTipoAcomodBtn () {
      if (this.showTipoAcomod || this.filters.tipoAcomod !== null) {
         return 'background: #FFA04F; color: white; border: 1px solid #FFA04F'
      }
    },
    onPrecoBtn () {
      if (this.showPreco || this.filters.preco !== null) {
         return 'background: #FFA04F; color: white; border: 1px solid #FFA04F'
      }
    },
    onAvaliacaoBtn () {
      if (this.showAvaliacao || this.filters.avaliacao !== null) {
         return 'background: #FFA04F; color: white; border: 1px solid #FFA04F'
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      vm.$store.state.foobar1 = true
      vm.$store.state.foobar2 = false
      vm.$store.state.foobar3 = false
      vm.$store.state.foobar4 = false
      !vm.$store.state.isOnline ? vm.$modal.show('offline-modal') : ''
      !vm.$store.state.showFoobar ? vm.$store.commit('m_showFoobar', true) : ''
      !vm.$store.state.showNavbar ? vm.$store.commit('m_showNavbar', true) : ''

      const acomods = await firebase.firestore().collection('acomods').get()
      vm.$store.commit('m_allAcomods', acomods.docs.map(acomod => acomod.data()))
    })
  }
}
</script>

<style>
@import url('~/assets/css/pagination.css');
@import url('~/assets/css/radio-desktop.css');

.acomods {
  margin: var(--navbarHeightMobile) 0 5.4rem 0;
  display: flex;
  flex-flow: column;
  transition: var(--pages-transition);
  & .acomods-container {
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
        color: var(--colorAcomod);
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
        & .__card-tipo-acomod {
          font-family: var(--details-font);
          font-size: 15px;
          font-weight: 700;
          color: var(--colorAcomod);
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
        & .rating {
          display: flex;
          align-items: center;
          & .rating-number {
            font-size: 12px;
            font-weight: 500;
            padding-left: 2px;
          }
        }
        & .new {
          margin-top: .2rem;
          display: inline-flex;
          border: 1px solid #dedede;
          border-radius: 50px;
          & span {
            padding: 3px 8px;
            font-size: 11px;
            font-weight: 500;
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
    background: var(--colorAcomod);
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
  .acomods {
    margin: 0;
    display: flex;
    flex-flow: row;
    & .acomods-container {
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
          & .__card-tipo-acomod {
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
              & .tipo-acomod-box {
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
                  border: 1px solid #343434;
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
                  color: var(--colorAcomod);
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
