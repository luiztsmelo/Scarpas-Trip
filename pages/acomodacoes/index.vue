<template>
  <div class="acomods">


    <div class="acomods-container">

      <nuxt-link class="card" v-for="acomod in $store.state.filteredAcomods" :key="acomod.acomodID" :to="`/acomodacoes/${acomod.acomodID}`">

        <div class="image-box">
          <swiper :options="swiperOption">

            <swiper-slide class="slide" v-for="image in acomod.images" :key="image.id">
              <progressive-background class="__img" :src="imageH(image)" :placeholder="image.L" :aspect-ratio="2/3"/>
            </swiper-slide>
      
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
        </div>


        <div class="item-form">

          <select v-model="$store.state.filters.tipoAcomod" v-if="$store.state.filters.tipoAcomod === null">
            <option :value="null" disabled hidden>Tipo de acomodação</option>
            <option>Casa</option>
            <option>Apartamento</option>
            <option>Rancho</option>
            <option>Chácara</option>
            <option>Pousada</option>
            <option>Camping</option>
            <option>Sítio</option>
            <option>Fazenda</option>
            <option>Hostel</option>
          </select>

          <div class="filter-choosed" v-else>
            <h3 class="__text">{{ $store.state.filters.tipoAcomod }}</h3>
            <img class="__limpar-img" src="../../assets/img/close-mobile.svg" @click="$store.state.filters.tipoAcomod = null">
          </div>

        </div>



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

        <h3 class="__valor">R${{ acomod.valorNoite }}</h3>

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
      drag: null,
      attribute: {
        popover: {
          hideIndicator: true,
          visibility: 'none'
        }
      },
      swiperOption: {
        slidesPerView: 1
      }
    }
  },
  async fetch ({ store }) {
    const acomods = await firebase.firestore().collection('acomods').get()
    store.commit('m_filteredAcomods', acomods.docs.map(acomod => acomod.data()))
  },
  methods: {
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
    }
  },
  watch: {
    filters: {
      handler: async function (filter) { 
        try {
          console.log(filter)

          const filteredAcomods = await firebase.firestore().collection('acomods')
            .where('tipoAcomod', '==', filter.tipoAcomod)
            .get()

          console.log(filteredAcomods)
          
          return this.$store.commit('m_filteredAcomods', filteredAcomods.docs.map(acomod => acomod.data()))
        } catch (err) {
          console.log(err)
        }
      },
      deep: true
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
      margin-top: calc(var(--navbarHeightDesktop) + 3.9rem + 1rem);
      width: 64.6%;
      padding-left: 7%;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      & .card {
        width: 49.1%;
        min-height: 21rem;
        padding: 0;
        margin-bottom: 2rem;
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
                  border-radius: 4px;
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
            padding: .3em 0;
            font-size: 16px;
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
        height: 3.9rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgb(222,222,222);
        & .item-form {
          margin-right: .8rem;
          & input {
            cursor: pointer;
            height: 2.3rem;
            font-size: 14px;
            font-weight: 400;
            padding: 0 .8rem;
            border: 1px solid rgb(222,222,222);
            outline: none;
            border-radius: 5px;
            background: white;
            color: var(--color01);
          }
          & input:hover {
            background: rgb(250,250,250);
          }
          & select {
            appearance: none;
            cursor: pointer;
            height: 2.3rem;
            font-size: 14px;
            font-weight: 400;
            padding: 0 .8rem;
            border: 1px solid rgb(222,222,222);
            outline: none;
            border-radius: 5px;
            background: white;
            color: var(--color01);
          }
          & select:hover {
            background: rgb(250,250,250);
          }
          & .inputDatePicker {
            max-width: 4.4rem;
          }
          & .filter-choosed {
            display: flex;
            align-items: center;
            height: 2.3rem; 
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
      height: calc(100% - var(--navbarHeightDesktop) - 3.9rem - 2rem);
    }
    & .map-desktop > div > div {
      background-color: #fff !important;
    }
    & .gm-style-iw {
      display: flex;
      align-items: center;
      justify-content: center;
      & .__valor {
        font-size: 14px;
        font-weight: 600;
      }
    }
    & .gm-style-iw + div { /* Remove close button */
      display: none;
    }
  }
}



</style>
