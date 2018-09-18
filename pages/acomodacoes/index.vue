<template>
  <div class="acomods" @click="closeFilterBtns(), filtrar()">

    <div class="acomods-container" :class="[ dropdownBtnIsOpen === true ? 'blur' : '' ]">

      <div class="loader" v-show="$store.state.allAcomods === null">
        <div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>
      </div>

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
          <span class="__card-tipo-acomod">{{ acomod.tipoAcomod }}</span>
          <span class="__card-title">{{ acomod.title }}</span>
          <span class="__card-valor">R${{ acomod.valorNoite }}<span class="__card-valor-dia"> por noite</span></span>
          <div class="rating">
            <star-rating
              :rating="3.7"
              :increment="0.1"
              :read-only="true"
              :show-rating="false"
              active-color="#161616"
              inactive-color="#dedede"
              :star-size="10"
              :padding="2">
            </star-rating>
            <span class="rating-number">3.7</span>
          </div>
          
        </div>
        
      </nuxt-link>


      <div class="empty-state" v-show="$store.state.filteredAcomods !== null && $store.state.filteredAcomods.length === 0">
        <img src="../../assets/img/empty-state.svg" class="__img">
        <h1 class="__title">Nenhuma acomodação encontrada :(</h1>
        <h3>Tente ajustar os filtros para obter um melhor resultado.</h3>
        <button class="__limpar-filtros-btn" @click="$store.commit('m_resetFilters')">Limpar filtros</button>
      </div>
      

    </div>



    <!-- ___________________________ FILTRAR DESKTOP ___________________________ -->
    <div class="filtrar-desktop">
      <form class="filtrar-desktop-form">
        

        <!-- Datas -->
        <div class="item-form">
          <v-date-picker
            v-if="$store.state.filters.date === null"
            mode='range'
            @drag='drag = $event'
            v-model='$store.state.filters.date'
            :show-popover='false'
            :min-date='new Date()'
            :pane-width="290"
            :drag-attribute="attribute"
            :select-attribute="attribute"
            :disabled-attribute="disabledAttribute"
            :theme-styles="datePickerDesktopStyle"
            tint-color='#FFA04F'
            show-caps
            popover-visibility='focus'>
            <div
              slot-scope="{ updateValue }">
              <div>
                <input
                  type="text"
                  value="Datas"
                  @change="updateValue($event.target.value)"
                  class="inputDatePicker"
                  disabled
                />
              </div>
            </div>
          </v-date-picker>

        </div><!-- Datas -->



        <!-- Hóspedes -->
        <div class="item-form">
          
          <div class="dropdown" @click.stop>

            <button type="button" class="dropdown-btn" :style="onHospedesBtn" @click="onClickHospedesBtn">
              {{ $store.state.filters.hospedes > 0 ? `${$store.state.filters.hospedes} hóspedes` : 'Hóspedes' }}
            </button>

            <transition name="dropdown-animation">
              <div class="dropdown-body" v-if="showHospedes">

                <div class="number-box">

                  <h3>Número de hóspedes</h3>

                  <div class="input-number">
                    <div class="__btn" :class="$store.state.filters.hospedes === 0 ? '__btn-disabled' : ''" @click="$store.commit('m_decrementHospedes')"><div class="minus"></div></div>

                    <h3>{{ $store.state.filters.hospedes }}</h3>

                    <div class="__btn" :class="$store.state.filters.hospedes === 25 ? '__btn-disabled' : ''" @click="$store.commit('m_incrementHospedes')"><div class="plus-horiz"></div><div class="plus-vert"></div></div>
                  </div>

                </div>


                <div class="buttons">

                  <button type="button" class="__limpar-btn" :class="[ $store.state.filters.hospedes === 0 ? '__limpar-btn-disabled' : '']" @click="$store.state.filters.hospedes = 0">Limpar</button>

                  <button type="button" class="__filtrar-btn" @click="filtrar">Filtrar</button>

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
              <div class="dropdown-body" v-if="showTipoAcomod">

                <div class="tipo-acomod-box">

                  <div class="option" v-for="(tipoAcomod, index) in tiposAcomods" :key="tipoAcomod.name" @click="$store.state.filters.tipoAcomod = tipoAcomod.name">

                    <div class="radio"><div :class="[ $store.state.filters.tipoAcomod === tipoAcomod.name ? 'radio-checkmark' : '' ]"></div></div>

                    <h3 class="__text" >{{ tipoAcomod.name }}</h3>

                  </div>

                </div>


                <div class="buttons">

                  <button type="button" class="__limpar-btn" :class="[ $store.state.filters.tipoAcomod === null ? '__limpar-btn-disabled' : '']" @click="$store.state.filters.tipoAcomod = null">Limpar</button>

                  <button type="button" class="__filtrar-btn" @click="filtrar">Filtrar</button>

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
              <div class="dropdown-body" v-if="showPreco">

                <div class="preco-box">

                  <div class="quantia" @click="$store.state.filters.preco = 'low'">
                    <div class="radio"><div :class="[ $store.state.filters.preco === 'low' ? 'radio-checkmark' : '' ]"></div></div>
                    <h1 class="__text">Econômico</h1>
                    <h3 class="__valor">Até R$199</h3>
                  </div>

                  <div class="quantia" @click="$store.state.filters.preco = 'mid'">
                    <div class="radio"><div :class="[ $store.state.filters.preco === 'mid' ? 'radio-checkmark' : '' ]"></div></div>
                    <h1 class="__text">Custo-benefício</h1>
                    <h3 class="__valor">R$200 - R$399</h3>
                  </div>

                  <div class="quantia" @click="$store.state.filters.preco = 'high'">
                    <div class="radio"><div :class="[ $store.state.filters.preco === 'high' ? 'radio-checkmark' : '' ]"></div></div>
                    <h1 class="__text">Luxo</h1>
                    <h3 class="__valor">R$400+</h3>
                  </div>

                </div>
                

                <div class="buttons">

                  <button type="button" class="__limpar-btn" :class="[ $store.state.filters.preco === null ? '__limpar-btn-disabled' : '']" @click="$store.state.filters.preco = null">Limpar</button>

                  <button type="button" class="__filtrar-btn" @click="filtrar">Filtrar</button>

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
              <div class="dropdown-body" v-if="showAvaliacao">

                <div class="avaliacao-box">


                </div>
                

                <div class="buttons">

                  <button type="button" class="__limpar-btn" :class="[ $store.state.filters.avaliacao === null ? '__limpar-btn-disabled' : '']" @click="$store.state.filters.avaliacao = null">Limpar</button>

                  <button type="button" class="__filtrar-btn" @click="filtrar">Filtrar</button>

                </div>
                
                
              </div>
            </transition>

          </div>

        </div><!-- Avaliação -->
        

        <button 
          type="button" 
          class="__limpar-filtros-btn" 
          v-if="$store.state.filters.date !== null || $store.state.filters.hospedes > 0 || $store.state.filters.tipoAcomod !== null || $store.state.filters.preco !== null || $store.state.filters.avaliacao !== null"
          @click="$store.commit('m_resetFilters')">
          Limpar Filtros
        </button>


      </form>
    </div><!-- ___________________________ FILTRAR DESKTOP ___________________________ -->




    <gmap-map
      class="map-desktop"
      :class="[ dropdownBtnIsOpen === true ? 'blur' : '' ]"
      :center="{ lat: -20.6259183, lng: -46.0336799 }"
      :zoom="12"
      :options="{ styles: styles, draggable:  true, fullscreenControl: false , zoomControl: false , mapTypeControl: false, streetViewControl: false, gestureHandling: 'greedy' }">

      <GmapInfoWindow
        ref="infoWindow"
        v-if="$store.state.allAcomods !== null"
        v-for="acomod in $store.state.filteredAcomods !== null ? $store.state.filteredAcomods : $store.state.allAcomods"
        :key="acomod.acomodID"
        :position="{lat: acomod.positionLAT, lng: acomod.positionLNG}">

        <nuxt-link :to="`/acomodacoes/${acomod.acomodID}`" class="__valor">R${{ acomod.valorNoite }}</nuxt-link>

      </GmapInfoWindow>

    </gmap-map>




    <!-- ___________________________ FILTRAR MOBILE ___________________________ -->
    <div class="filtrar-mobile-btn" @click="openFiltrarAcomods" v-show="$store.state.allAcomods !== null">
      <img class="__img" src="../../assets/img/filter.svg">
    </div>
    
    <filtrar-acomods/>
    <!-- ___________________________ FILTRAR MOBILE ___________________________ -->



    

  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import supportsWebP from 'supports-webp'
import { mapstyle } from '@/mixins/mapstyle'
import { stylesCalendar } from '@/mixins/stylesCalendar'
import FiltrarAcomods from '@/components/FiltrarAcomods'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

export default {
  components: { FiltrarAcomods },
  mixins: [ mapstyle, stylesCalendar ],
  head () {
    return {
      title: 'Acomodações em Capitólio ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
  data () {
    return {
      dropdownBtnIsOpen: false,
      showHospedes: false,
      showTipoAcomod: false,
      showPreco: false,
      showAvaliacao: false,
      tiposAcomods: [
        { 'name': 'Casa' },
        { 'name': 'Apartamento' },
        { 'name': 'Rancho' },
        { 'name': 'Chácara' },
        { 'name': 'Pousada' },
        { 'name': 'Camping' },
        { 'name': 'Sítio' },
        { 'name': 'Fazenda' },
        { 'name': 'Hostel' }
      ],
      drag: null,
      attribute: {
        popover: {
          hideIndicator: true,
          visibility: 'none'
        }
      },
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
    imageH (image) {
      return supportsWebP ? image.HW : image.HJ
    },
    mouseOverCard (index) {
      this.$refs.infoWindow[index].$children[0].$el.style.color = '#FFA04F'
    },
    mouseOutCard (index) {
      this.$refs.infoWindow[index].$children[0].$el.style.color = '#161616'
    },
    /* __________ FILTERS __________ */
    openFiltrarAcomods () {
      this.$store.commit('m_showFiltrarAcomods', true)
      window.location.hash = 'filtrar'
    },
    closeFilterBtns () {
      this.dropdownBtnIsOpen = false
      this.showHospedes = false
      this.showTipoAcomod = false
      this.showPreco = false
      this.showAvaliacao = false
    },
    onClickHospedesBtn () {
      this.dropdownBtnIsOpen = true
      this.showHospedes = !this.showHospedes
      this.showTipoAcomod = false
      this.showPreco = false
      this.showAvaliacao = false
    },
    onClickTipoAcomodBtn () {
      this.dropdownBtnIsOpen = true
      this.showHospedes = false
      this.showTipoAcomod = !this.showTipoAcomod
      this.showPreco = false
      this.showAvaliacao = false
    },
    onClickPrecoBtn () {
      this.dropdownBtnIsOpen = true
      this.showHospedes = false
      this.showTipoAcomod = false
      this.showPreco = !this.showPreco
      this.showAvaliacao = false
    },
    onClickAvaliacaoBtn () {
      this.dropdownBtnIsOpen = true
      this.showHospedes = false
      this.showTipoAcomod = false
      this.showPreco = false
      this.showAvaliacao = !this.showAvaliacao
    },
    filterByHospedes (acomod) {
      if (this.filters.hospedes > 0) {
        return acomod.totalHospedes >= this.filters.hospedes
      } else {
        return []
      }
    },
    filterByTipoAcomod (acomod) {
      if (this.filters.tipoAcomod !== null) {
        return acomod.tipoAcomod === this.filters.tipoAcomod
      } else {
        return []
      }
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
      
      const allAcomods = this.$store.state.allAcomods

      const filteredAcomods = allAcomods.filter(acomod => {
        return this.filterByHospedes(acomod) && 
                this.filterByTipoAcomod(acomod) && 
                this.filterByPreco(acomod)
      })

      this.$store.commit('m_filteredAcomods', filteredAcomods)
    }
  },
  computed: {
    filters () { return this.$store.state.filters },
    outputDatePicker () {
      if (this.filters.date !== null) {
        const dayStart = dayjs(this.filters.date.start).format('D')
        const monthStart = dayjs(this.filters.date.start).format('MMM')
        const dayEnd = dayjs(this.filters.date.end).format('D')
        const monthEnd = dayjs(this.filters.date.end).format('MMM')
        return  `${dayStart} de ${monthStart} - ${dayEnd} de ${monthEnd}`
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
      if (vm.$store.state.allAcomods === null) {
        const acomods = await firebase.firestore().collection('acomods').get()
        vm.$store.commit('m_allAcomods', acomods.docs.map(acomod => acomod.data()))
      }
      vm.$store.state.offFoobar1 = false
      vm.$store.state.offFoobar2 = true
      vm.$store.state.offFoobar3 = true
      vm.$store.state.offFoobar4 = true
      vm.$store.state.offFoobar5 = true
      !vm.$store.state.isOnline ? vm.$modal.show('offline-modal') : ''
      !vm.$store.state.showFoobar ? vm.$store.commit('m_showFoobar', true) : ''
      !vm.$store.state.showNavbar ? vm.$store.commit('m_showNavbar', true) : ''
    })
  }
}
</script>

<style>
@import url('~/assets/css/main.css');
@import url('~/assets/css/pagination.css');
@import url('~/assets/css/radio-desktop.css');

.acomods {
  margin: 3.4rem 0 5.4rem 0;
  display: flex;
  flex-flow: column;
  transition: var(--main-transition);
  & .acomods-container {
    position: relative;
    padding: 0;
    margin-bottom: 1rem;
    display: flex;
    flex-flow: column;
    transition: var(--main-transition);
    & .loader {
      position: absolute;
      top: 2rem;
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
      padding: 1rem 0;
      & .__img {
        width: 7rem;
        height: auto;
      }
      & .__title {
        font-size: 27px;
        padding: .4rem 0;
      }
      & .__limpar-filtros-btn {
        background: white;
        color: var(--colorAcomod);
        font-weight: 600;
        padding: 0;
        margin: 1.2rem 0;
      }
    }
    & .card {
      width: 93%;
      padding: 7% 0 0 7%;
      & .image-box {
        overflow: hidden;
        margin-bottom: .3rem;
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
        display: flex;
        flex-flow: column;
        & .__card-tipo-acomod {
          text-transform: uppercase;
          font-size: 11px;
          font-weight: 600;
          color: var(--colorAcomod);
        }
        & .__card-title {
          padding: .3rem 0 .2rem;
          font-size: 17px;
          font-weight: 700;
        }
        & .__card-valor {
          padding-bottom: .2rem;
          font-size: 15px;
          font-weight: 400;
          & .__card-valor-dia {
            font-size: 14px;
          }
        }
        & .rating {
          display: flex;
          align-items: center;
          & .rating-number {
            font-size: 11px;
            font-weight: 600;
            padding-left: 2px;
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
    bottom: 4.5rem;
    right: 7%;
    height: 3.3rem;
    width: 3.3rem;
    background: white;
    transition: all .3s ease;
    box-shadow: 1px 1px 7px 1px rgba(0,0,0,0.2);
    border-radius: 50%;
    & .__img {
      width: 1.4rem;
      height: auto;
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
      padding-left: 7%;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      & .card {
        width: 49.1%;
        min-height: 21rem;
        padding: 0;
        margin-bottom: 1rem;
        & .image-box {
          overflow: hidden;
          margin-bottom: .3rem;
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
          display: flex;
          flex-flow: column;
          & .__card-tipo-acomod {
            font-size: 11px;
            font-weight: 600;
          }
          & .__card-title {
            padding: .3rem 0;
            font-size: 15px;
            font-weight: 700;
          }
          & .__card-valor {
            padding-bottom: .1rem;
            font-size: 14px;
            font-weight: 400;
            & .__card-valor-dia {
              font-size: 13px;
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
          & input {
            cursor: pointer;
            height: 2.1rem;
            font-size: 14px;
            font-weight: 400;
            padding: 0 .9rem;
            border: 1px solid #dedede;
            outline: none;
            border-radius: 100px;
            background: white;
            color: var(--color01);
          }
          & input:hover {
            border: 1px solid var(--color01);
          }
          & select {
            appearance: none;
            cursor: pointer;
            height: 2.1rem;
            font-size: 14px;
            font-weight: 400;
            padding: 0 .8rem;
            border: 1px solid #dedede;
            outline: none;
            border-radius: 5px;
            background: white;
            color: var(--color01);
          }
          & select:hover {
            border: 1px solid var(--color01);
          }
          & .inputDatePicker {
            max-width: 4.6rem;
          }
          & .fake-input:hover {
            border: 1px solid var(--color01);
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
                  font-weight: 500;
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
          color: var(--colorAcomod);
          font-size: 15px;
          font-weight: 500;
        }
      }
    }
    & .filtrar-mobile-btn {
      display: none;
    }
    & .map-desktop {
      position: fixed;
      bottom: 1rem;
      right: 7%;
      width: 26.5%;
      height: calc(100% - var(--navbarHeightDesktop) - 3.7rem - 2rem);
    }
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
        font-size: 14px;
        font-weight: 500;
        transition: var(--main-transition);
      }
    }
    & .gm-style-iw + div { /* Remove close button */
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
