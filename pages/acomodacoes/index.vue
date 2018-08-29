<template>
  <div class="acomods" @click="showPreco = false, showTipoAcomod = false">


    <div class="acomods-container">

      <nuxt-link class="card" v-for="acomod in $store.state.filteredAcomods" :key="acomod.acomodID" :to="`/acomodacoes/${acomod.acomodID}`">

        <div class="image-box">
          <swiper :options="swiperOption">

            <swiper-slide class="slide" v-for="image in acomod.images" :key="image.id">
              <img class="__img" v-lazy="imgObj(image)"/>
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



        <!-- Tipo acomod -->
        <div class="item-form">
          
          <div class="dropdown" @click.stop>

            <button type="button" class="dropdown-btn" :style="onDropBtn" @click="showTipoAcomod = !showTipoAcomod">Tipo de acomodação</button>

            <transition name="dropdown-animation">
              <div class="dropdown-body" v-show="showTipoAcomod">

                <div class="select-box">
                  <div class="option" v-for="(tipoAcomod, index) in tiposAcomods" :key="tipoAcomod.name">
                    <input type="checkbox" ref="tipoAcomodCheckbox" :value="tipoAcomod.name" v-model="$store.state.filters.tipoAcomod">
                    <h3 class="__text" @click="$refs.tipoAcomodCheckbox[index].click()">{{ tipoAcomod.name }}</h3>
                  </div>
                </div>

                <button type="button" class="__filtrar-btn" @click="filtrar">Filtrar</button>
                
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

            <button type="button" class="dropdown-btn" :style="onDropBtn" @click="showPreco = !showPreco">Preço</button>

            <transition name="dropdown-animation">
              <div class="dropdown-body" v-show="showPreco">
                

                <div class="preco-box">
                  <h3 class="__text">R$50 - R$2000</h3>

                  <div class="slider">
                    <div class="__btn" id="min" ref="minBtn" @click="sliderBtnMin"></div>
                    <div class="__bar"></div>
                    <div class="__btn" id="max" ref="maxBtn"></div>
                  </div>
                </div>


                <button type="button" class="__filtrar-btn" @click="filtrar">Filtrar</button>
                
              </div>
            </transition>

          </div>

        </div><!-- Preço -->



      </form>
    </div><!-- ___________________________ FILTRAR DESKTOP ___________________________ -->




    <gmap-map
      class="map-desktop"
      :center="{ lat: -20.6259183, lng: -46.0336799 }"
      :zoom="12"
      :options="{ styles: styles, draggable:  true, fullscreenControl: false , zoomControl: false , mapTypeControl: false, streetViewControl: false, gestureHandling: 'greedy' }">

      <GmapInfoWindow
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
      showTipoAcomod: false,
      showPreco: false,
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
  async fetch ({ store }) {
    if (store.state.filteredAcomods === null) {
      const acomods = await firebase.firestore().collection('acomods').get()
      store.commit('m_filteredAcomods', acomods.docs.map(acomod => acomod.data()))
    }
  },
  methods: {
    async filtrar () {
      try {
        this.showTipoAcomod = false
        this.showPreco = false
        
        this.$store.commit('m_loader', true)

        const filters = this.$store.state.filters

        let acomods = firebase.firestore().collection('acomods')

        if (filters.date !== null) {

        }

        if (filters.tipoAcomod.length > 0) {
          filters.tipoAcomod.forEach(tipoAcomod => {
            acomods = acomods.where('tipoAcomod', '==', tipoAcomod)
          })
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
    imgObj (image) {
      return {
        src: supportsWebP ? image.HW : image.HJ,
        loading: image.L
      }
    },
    sliderBtnMin () {
      this.$refs.minBtn.addEventListener('touchmove', e => {
        const minBtnPosition = this.$refs
        console.log(minBtnPosition)
        console.log(e)
        console.log(e.targetTouches[0].screenX)
      }, false)
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
    onDropBtn () {
      return this.showPreco ? 'font-weight: 500; background: #FFA04F; color: white; border: none' : ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
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
      margin-top: calc(var(--navbarHeightDesktop) + 3.6rem + 1rem);
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
        height: 3.6rem;
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
            padding: 0 .8rem;
            border: 1px solid #dedede;
            outline: none;
            border-radius: 4px;
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
            border-radius: 4px;
            background: white;
            color: var(--color01);
          }
          & select:hover {
            border: 1px solid var(--color01);
          }
          & .inputDatePicker {
            max-width: 4.4rem;
          }
          & .fake-input:hover {
            border: 1px solid var(--color01);
          }
          & .filter-choosed {
            display: flex;
            align-items: center;
            height: 2.1rem; 
            background: var(--colorAcomod);
            border-radius: 4px;
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
              padding: 0 .8rem;
              border: 1px solid #dedede;
              outline: none;
              border-radius: 4px;
              background: white;
              color: var(--color01);
            }
            & .dropdown-btn:hover {
              border: 1px solid var(--color01);
            }
            & .dropdown-body {
              display: flex;
              flex-flow: column;
              position: absolute;
              top: 2.7rem;
              background-color: white;
              padding: 1.4rem;
              border-radius: 4px;
              box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
              z-index: 100;
              transition: var(--main-transition);
              & .select-box {
                display: flex;
                flex-flow: row wrap;
                width: 300px;
                & .option {
                  cursor: pointer;
                  display: flex;
                  align-items: center;
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
                width: 270px;
                & .__text {
                  font-size: 15px;
                }
                & .slider {
                  position: relative;
                  width: 100%;
                  margin: 1.5rem 0 2rem;
                  & .__btn {
                    position: absolute;
                    cursor: pointer;
                    width: 26px;
                    height: 26px;
                    border-radius: 50%;
                    background: white;
                    border: 1px solid black;
                    z-index: 10;
                  }
                  & #min { left: 0; }
                  & #max { right: 0; }
                  & .__bar {
                    position: absolute;
                    width: calc(100% - 26px);
                    top: 13px;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    height: 3px;
                    background: rgb(132,132,132);
                    border-radius: 30px;
                  }
                }
              }
              & .__filtrar-btn {
                align-self: flex-end;
                padding: 0;
                margin-top: 1rem;
                background: white;
                font-size: 15px;
                font-weight: 500;
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
      height: calc(100% - var(--navbarHeightDesktop) - 3.6rem - 2rem);
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


/* TRANSITIONS */
.dropdown-animation-enter, .dropdown-animation-leave-active {
  opacity: 0;
  transform: translateY(-1rem);
}

</style>
