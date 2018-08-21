<template>
  <div class="acomods">


      <div class="acomods-container">

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
          
          <div class="item-form">
            <v-date-picker
              is-double-paned
              is-linked
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
              :formats='formats'
              popover-visibility='focus'>
              <div
                slot-scope='{ inputValue, updateValue }'>
                <div>
                  <input
                    type='text'
                    placeholder='Chegada - Partida'
                    :class='["input", { "is-drag": !!drag }]'
                    :value="inputValue"
                    @change='updateValue($event.target.value)' />
                  <span class='day-span'>
                    {{ noites }}
                  </span>
                </div>
              </div>
            </v-date-picker>
          </div>


          <div class="item-form">
            <select v-model="$store.state.filters.tipoAcomod">
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
          </div>

          <button class="__limpar-btn">Limpar filtros</button>


        </form>
      </div><!-- ___________________________ FILTRAR DESKTOP ___________________________ -->





    <!-- ___________________________ FILTRAR MOBILE ___________________________ -->
    <div class="filtrar-mobile">
      <div class="filtrar-body">
        <span class="__filtrar-text">Filtrar</span>
        <img class="__filtrar-img" src="../../assets/img/filter.svg">
      </div>
    </div><!-- ___________________________ FILTRAR MOBILE ___________________________ -->



    <gmap-map
      class="map-desktop"
      :center="{ lat: -20.6259183, lng: -46.0336799 }"
      :zoom="12"
      :options="{ styles: styles, draggable:  true, fullscreenControl: false , zoomControl: $store.state.isMobile ? false : true, mapTypeControl: false, streetViewControl: false }">
    </gmap-map>

  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'
import supportsWebP from 'supports-webp'
import * as firebase from 'firebase'
import { mapstyle } from '@/mixins/mapstyle'
import { swiperOptions } from '@/mixins/swiper_id'
import { stylesCalendar } from '@/mixins/stylesCalendar'

export default {
  components: { vueSlider },
  mixins: [ mapstyle, swiperOptions, stylesCalendar ],
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
        slidesPerView: 1,
        pagination: '.swiper-pagination'
      },
      formats: {
        input: ['D MMM', 'D MMM']
      }
    }
  },
  fetch ({ store }) {
    return firebase.firestore().collection('acomods').onSnapshot(snapshot => {
      store.commit('m_filteredAcomods', snapshot.docs.map(acomod => acomod.data()))
    })
  },
  methods: {
    getNoites (range) {
      return !range ? 0 : (range.end - range.start)/(1000*60*60*24)
    },
    imageH (image) {
      return supportsWebP ? image.HW : image.HJ
    }
  },
  computed: {
    filters () { return this.$store.state.filters },
    noites () {
      const span = this.getNoites(this.drag || this.$store.state.filters.date)
      return (span && `${span} noites`) || ''
    }
  },
  watch: {
    filters: {
      handler: async function (filter) { 
        try {
          console.log(filter)
          const filteredAcomods = await firebase.firestore().collection('acomods').where('tipoAcomod', '==', filter.tipoAcomod).get()
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
      margin-top: calc(var(--navbarHeightDesktop) + 3.8rem + 1.5rem);
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
            padding: .4rem 0 .5rem 0;
            font-size: 16px;
            font-weight: 700;
          }
          & .__card-valor {
            font-size: 15px;
            font-weight: 400;
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
      width: 100%;
      & .filtrar-desktop-form {
        position: relative;
        padding: 0 7%;
        height: 3.8rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgb(222,222,222);
        background: white;
        & .item-form {
          margin-right: 1rem;
          & input {
            cursor: pointer;
            height: 2.3rem;
            font-size: 14px;
            font-weight: 400;
            padding: 0 .7rem;
            border: 1px solid rgb(222,222,222);
            outline: none;
            border-radius: 5px;
            color: var(--color01);
          }
          & select {
            cursor: pointer;
            height: 2.3rem;
            font-size: 14px;
            font-weight: 400;
            padding: 0 .3rem;
            border: 1px solid rgb(222,222,222);
            outline: none;
            border-radius: 5px;
            color: var(--color01);
          }
        }
        & .__limpar-btn {
          position: absolute;
          right: 7%;
          background: white;
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
    & .filtrar-mobile {
      display: none;
    }
    & .map-desktop {
      position: fixed;
      bottom: 1.5rem;
      right: 7%;
      width: 26.5%;
      height: calc(100% - var(--navbarHeightDesktop) - 3.8rem - 3rem);
    }
    & .map-desktop > div > div {
      background-color: #fff !important;
    }
  }
}

.is-drag {
  color: var(--color01);
  font-weight: 500;
}
.day-span {
  font-size: 15px;
  font-weight: 500;
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color01);
}

::placeholder {
  color: var(--color01);
  opacity: 1;
}

</style>
