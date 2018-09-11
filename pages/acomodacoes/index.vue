<template>
  <div class="acomods" @click="dropdownBtnIsOpen = false, showHospedes = false, showTipoAcomod = false, showPreco = false">


    <div class="acomods-container" :class="[ dropdownBtnIsOpen === true ? 'blur' : '' ]" v-if="$store.state.filteredAcomods !== null">


      <nuxt-link class="card" v-for="acomod in $store.state.filteredAcomods" :key="acomod.acomodID" :to="`/acomodacoes/${acomod.acomodID}`">

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
        </div>
        
      </nuxt-link> 


      <h1 v-if="$store.state.filteredAcomods.length === 0">
        Nenhuma acomodação encontrada.
      </h1>

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

          <div class="filter-choosed" v-else>
            <h3 class="__text">{{ outputDatePicker }}</h3>
            <img class="__limpar-img" src="../../assets/img/close-mobile.svg" @click="$store.state.filters.date = null">
          </div>

        </div><!-- Datas -->



        <!-- Hóspedes -->
        <div class="item-form">
          
          <div class="dropdown" @click.stop>

            <button type="button" class="dropdown-btn" :style="onHospedesBtn" @click="showHospedes = !showHospedes">Hóspedes</button>

            <transition name="dropdown-animation">
              <div class="dropdown-body" v-show="showHospedes">

                <div class="number-box">
                  <h3>Número de hóspedes</h3>
                  <div class="input-number">
                    <div class="__btn" :class="$store.state.filters.hospedes === 1 ? '__btn-disabled' : ''" @click="$store.commit('m_decrementHospedes')"><div class="minus"></div></div>
                    <h3>{{ $store.state.filters.hospedes }}</h3>
                    <div class="__btn" :class="$store.state.filters.hospedes === 25 ? '__btn-disabled' : ''" @click="$store.commit('m_incrementHospedes')"><div class="plus-horiz"></div><div class="plus-vert"></div></div>
                  </div>
                </div>


                <div class="buttons">
                  <button type="button" class="__filtrar-btn" @click="filtrar()">Filtrar</button>
                </div>

              </div>
            </transition>

          </div>


          <!-- <div class="filter-choosed" v-else>
            <h3 class="__text">{{ $store.state.filters.tipoAcomod }}</h3>
            <img class="__limpar-img" src="../../assets/img/close-mobile.svg" @click="$store.state.filters.tipoAcomod = null">
          </div> -->

        </div><!-- Hóspedes -->



        <!-- Tipo acomod -->
        <div class="item-form">
          
          <div class="dropdown" @click.stop>

            <button type="button" class="dropdown-btn" :style="onTipoAcomodBtn" @click="onClickTipoAcomodBtn">Tipo de acomodação</button>

            <transition name="dropdown-animation">
              <div class="dropdown-body" v-show="showTipoAcomod">

                <div class="select-box">
                  <div class="option" v-for="(tipoAcomod, index) in tiposAcomods" :key="tipoAcomod.name">
                    <input type="checkbox" ref="tipoAcomodCheckbox" :value="tipoAcomod.name" v-model="$store.state.filters.tipoAcomod">
                    <h3 class="__text" @click="$refs.tipoAcomodCheckbox[index].click()">{{ tipoAcomod.name }}</h3>
                  </div>
                </div>


                <div class="buttons">

                  <button type="button" class="__limpar-btn" :class="[ $store.state.filters.tipoAcomod.length === 0 ? '__limpar-btn-disabled' : '']" @click="$store.state.filters.tipoAcomod = []">Limpar</button>

                  <button type="button" class="__filtrar-btn" :class="[ $store.state.filters.tipoAcomod.length === 0 ? '__filtrar-btn-disabled' : '']" @click="$store.state.filters.tipoAcomod.length > 0 ? filtrar() : []">Filtrar</button>

                </div>

              </div>
            </transition>

          </div>


          <!-- <div class="filter-choosed" v-else>
            <h3 class="__text">{{ $store.state.filters.tipoAcomod }}</h3>
            <img class="__limpar-img" src="../../assets/img/close-mobile.svg" @click="$store.state.filters.tipoAcomod = null">
          </div> -->

        </div><!-- Tipo acomod -->



        <!-- Preço -->
        <div class="item-form">
          
          <div class="dropdown" @click.stop>

            <button type="button" class="dropdown-btn" :style="onPrecoBtn" @click="onClickPrecoBtn">Preço por noite</button>

            <transition name="dropdown-animation">
              <div class="dropdown-body" v-show="showPreco">

                <div class="preco-box">

                  <div class="quantia" @click="$store.state.filters.preco = 'low'">
                    <div class="radio">
                      <div :class="[ $store.state.filters.preco === 'low' ? 'radio-checkmark' : '' ]"></div>
                    </div>
                    <h1 class="__text">Econômico</h1>
                    <h3 class="__valor">Até R$199</h3>
                  </div>

                  <div class="quantia" @click="$store.state.filters.preco = 'mid'">
                    <div class="radio">
                      <div :class="[ $store.state.filters.preco === 'mid' ? 'radio-checkmark' : '' ]"></div>
                    </div>
                    <h1 class="__text">Custo-benefício</h1>
                    <h3 class="__valor">R$200 - R$399</h3>
                  </div>

                  <div class="quantia" @click="$store.state.filters.preco = 'high'">
                    <div class="radio">
                      <div :class="[ $store.state.filters.preco === 'high' ? 'radio-checkmark' : '' ]"></div>
                    </div>
                    <h1 class="__text">Luxo</h1>
                    <h3 class="__valor">R$400+</h3>
                  </div>

                </div>
                

                <div class="buttons">

                  <button type="button" class="__limpar-btn" :class="[ $store.state.filters.preco === null ? '__limpar-btn-disabled' : '']" @click="$store.state.filters.preco = null">Limpar</button>

                  <button type="button" class="__filtrar-btn" :class="[ $store.state.filters.preco === null ? '__filtrar-btn-disabled' : '']" @click="$store.state.filters.preco !== null ? filtrar() : null">Filtrar</button>

                </div>
                
                
              </div>
            </transition>

          </div>

        </div><!-- Preço -->



      </form>
    </div><!-- ___________________________ FILTRAR DESKTOP ___________________________ -->




    <gmap-map
      class="map-desktop"
      :class="[ dropdownBtnIsOpen === true ? 'blur' : '' ]"
      :center="{ lat: -20.6259183, lng: -46.0336799 }"
      :zoom="12"
      :options="{ styles: styles, draggable:  true, fullscreenControl: false , zoomControl: false , mapTypeControl: false, streetViewControl: false, gestureHandling: 'greedy' }">

      <GmapInfoWindow
        v-if="$store.state.filteredAcomods !== null"
        v-for="acomod in $store.state.filteredAcomods"
        :key="acomod.acomodID"
        :position="{lat: acomod.positionLAT, lng: acomod.positionLNG}">

        <nuxt-link :to="`/acomodacoes/${acomod.acomodID}`" class="__valor">R${{ acomod.valorNoite }}</nuxt-link>

      </GmapInfoWindow>

    </gmap-map>




    <!-- ___________________________ FILTRAR MOBILE ___________________________ -->
    <div class="filtrar-mobile">
      <div class="filtrar-body">
        <span class="__filtrar-text">Filtrar</span>
        <img class="__filtrar-img" src="../../assets/img/filter.svg">
      </div>
    </div><!-- ___________________________ FILTRAR MOBILE ___________________________ -->



    

  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import supportsWebP from 'supports-webp'
import { mapstyle } from '@/mixins/mapstyle'
import { stylesCalendar } from '@/mixins/stylesCalendar'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

export default {
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
    onClickTipoAcomodBtn () {
      this.dropdownBtnIsOpen = true
      this.showHospedes = false
      this.showTipoAcomod = !this.showTipoAcomod
      this.showPreco = false
    },
    onClickPrecoBtn () {
      this.dropdownBtnIsOpen = true
      this.showHospedes = false
      this.showTipoAcomod = false
      this.showPreco = !this.showPreco
    },
    async filtrar () {
      try {
        this.dropdownBtnIsOpen = false
        this.showHospedes = false
        this.showTipoAcomod = false
        this.showPreco = false
        
        this.$store.commit('m_loader', true)

        let acomods = firebase.firestore().collection('acomods')

        /* Datas */
        if (this.filters.date !== null) {

        }

        /* Hóspedes */
        if (this.filters.hospedes > 0) {
          acomods = acomods.where('totalHospedes', '<=', this.filters.hospedes)
        }

        /* Tipo de acomodação */
        if (this.filters.tipoAcomod.length > 0) {
          this.filters.tipoAcomod.forEach(tipoAcomod => {
            acomods = acomods.where('tipoAcomod', '==', tipoAcomod)
          })
        }

        /* Preço */
        if (this.filters.preco !== null) {
          
        }

        console.log(acomods)

        const filteredAcomods = await acomods.get()
        
        console.log(filteredAcomods)
        
        this.$store.commit('m_filteredAcomods', filteredAcomods.docs.map(acomod => acomod.data()))
        
        this.$store.commit('m_loader', false)
      } catch (err) {
        console.log(err)
        this.$store.commit('m_loader', false)
      }
    },
    imageH (image) {
      return supportsWebP ? image.HW : image.HJ
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
      return this.showHospedes ? 'background: #161616; color: white; border: 1px solid #161616' : ''
    },
    onTipoAcomodBtn () {
      return this.showTipoAcomod ? 'background: #161616; color: white; border: 1px solid #161616' : ''
    },
    onPrecoBtn () {
      return this.showPreco ? 'background: #161616; color: white; border: 1px solid #161616' : ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      if (vm.$store.state.filteredAcomods === null) {
        const acomods = await firebase.firestore().collection('acomods').get()
        vm.$store.commit('m_filteredAcomods', acomods.docs.map(acomod => acomod.data()))
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

.acomods {
  margin: 3.4rem 0 5.4rem 0;
  display: flex;
  flex-flow: column;
  transition: var(--main-transition);
  & .acomods-container {
    padding: 0;
    margin-bottom: 1rem;
    display: flex;
    flex-flow: column;
    transition: var(--main-transition);
    & .card {
      width: 93%;
      padding: 7% 0 1.5rem 7%;
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
          font-weight: 700;
          color: var(--colorAcomod);
        }
        & .__card-title {
          padding: .3rem 0;
          font-size: 18px;
          font-weight: 700;
        }
        & .__card-valor {
          font-size: 16px;
          font-weight: 400;
          & .__card-valor-dia {
            font-size: 14px;
          }
        }
      }
    }
  }
  & .filtrar-mobile {
    position: fixed;
    z-index: 8888;
    bottom: 4rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 2.1rem;
    width: 7rem;
    background: white;
    transition: all .3s ease;
    box-shadow: 2px 2px 6px 1px rgba(0,0,0,0.27);
    border-radius: 17px;
    & .filtrar-body {
      height: 100%;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      padding: 0 .7rem;
      justify-content: space-around;
      align-items: center;
      & .__filtrar-text {
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 700;
      }
      & .__filtrar-img {
        width: 1.05rem;
        height: auto;
      }
    }
  }
}

@media (max-width: 1023px) {
  .filtrar-desktop {
    display: none;
  }
  .map-desktop {
    display: none;
  }
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
          & .filter-choosed {
            display: flex;
            align-items: center;
            height: 2.1rem; 
            background: var(--colorAcomod);
            border-radius: 5px;
            transition: var(--main-transition);
            & .__text {
              user-select: none;
              padding: 0 .7rem;
              font-size: 14px;
              font-weight: 500;
              color: white;
            }
            & .__limpar-img {
              cursor: pointer;
              margin: 0 .8rem 0 .2rem;
              width: .7rem;
              height: auto;
              filter: invert(100%) brightness(300%);
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
              border: 1px solid var(--color01);
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
              & .select-box {
                display: flex;
                flex-flow: row wrap;
                & .option {
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  padding: .2rem 0;
                  width: 50%;
                  & input[type='checkbox'] {
                    appearance: none;
                    transform: scale(.6);
                    transition: var(--main-transition);
                  }
                  & input[type='checkbox']:checked {
                    background: var(--colorAcomod);
                  }
                  & .__text {
                    user-select: none;
                    padding-left: 7px;
                    font-size: 15px;
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
                  & .radio {
                    position: relative;
                    width: 1.3rem;
                    height: 1.3rem;
                    border-radius: 50%;
                    border: 1px solid #dedede;
                    transition: var(--main-transition);
                  }
                  & .radio-checkmark {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: var(--colorAcomod) !important;
                    transition: var(--main-transition);
                  }
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
                & .__limpar-btn-disabled {
                  display: none;
                }
                & .__filtrar-btn {
                  position: absolute;
                  right: 0;
                  bottom: 0;
                  height: 2.1rem;
                  width: 4.6rem;
                  background: var(--colorAcomod);
                  border-radius: 100px;
                  color: white;
                  font-size: 15px;
                  font-weight: 500;
                  transition: var(--main-transition);
                }
                & .__filtrar-btn-disabled {
                  background: rgb(232,232,232);
                }
              }
            }
          }
        }
      }
    }
    & .filtrar-mobile {
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
      display: flex;
      align-items: center;
      justify-content: center;
      & .__valor {
        cursor: pointer;
        font-size: 13px;
        font-weight: 600;
      }
    }
    & .gm-style-iw + div { /* Remove close button */
      display: none;
    }
  }
}

.blur {
  opacity: .2;
  pointer-events: none;
  user-select: none;
}

/* TRANSITIONS */
.dropdown-animation-enter, .dropdown-animation-leave-active {
  opacity: 0;
  transform: translateY(-1rem);
}

</style>
