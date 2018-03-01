<template>
  <div class="acomods">

      <ul class="acomods-container">
        <li class="card" v-for="acomod in acomods" :key="acomod.acomodID">
          <nuxt-link :to="'/acomodacoes/' + acomod.acomodID">

            <div class="image-box">
              <swiper :options="swiperOption">

                <swiper-slide class="slide">
                  <progressive-img class="__img" :src="image1H(acomod)" :placeholder="acomod.imageL1" :aspect-ratio="0.66"/>
                </swiper-slide>

                <swiper-slide class="slide" v-if="ifImage2(acomod)">
                  <progressive-img class="__img" :src="image2H(acomod)" :placeholder="acomod.imageL2" :aspect-ratio="0.66"/>
                </swiper-slide>

                <swiper-slide class="slide" v-if="ifImage3(acomod)">
                  <progressive-img class="__img" :src="image3H(acomod)" :placeholder="acomod.imageL3" :aspect-ratio="0.66"/>
                </swiper-slide>

                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>

            <div class="card-details">
              <span class="__card-tipo-acomod">{{ acomod.tipoAcomod }}</span>
              <span class="__card-title">{{ acomod.title }}</span>
              <span class="__card-valor">R${{ acomod.valorDiariaNormal }}<span class="__card-valor-dia"> por dia</span></span>
            </div>
            
          </nuxt-link> 
        </li>
      </ul>

      <div class="filtrar-desktop">
        <form class="filtrar-desktop-form">
          
          <div class="item-form">
            <v-date-picker
              is-double-paned
              mode='range'
              v-model='filter.date'
              :show-popover='false'
              :min-date='new Date().getTime()'
              :pane-width='280'
              :disabled-dates='disabledDates'
              :disabled-attribute='disabledAttribute'
              :theme-styles='themeStylesDesktop'
              :input-props='{ placeholder: "Chegada - Partida" }'
              tint-color='#00D8C7'
              show-caps
              style='width:100%'
              :formats='formats'
              popover-align='right'
              popover-visibility='focus'
              >
            </v-date-picker>
          </div>

          <div class="item-form">
            <multiselect
              v-model="filter.tipoAcomod"
              :multiple="true"
              :options="tiposAcomods"
              :hide-selected="true"
              :preserve-search="false"
              :searchable="false" 
              :show-labels="false" 
              placeholder="Tipo de Acomodação">
            </multiselect>
          </div>

          <div class="item-form">
            <multiselect
              v-model="filter.local"
              :multiple="true"
              :options="localidades"
              :hide-selected="true"
              :preserve-search="false"
              :searchable="false" 
              :show-labels="false" 
              placeholder="Local">
            </multiselect>
          </div>

          <div class="item-form" >
            <vue-slider
              v-model='filter.valorDiaria'
              style="margin-top:2.2rem"
              width='90%'
              tooltip='always'
              formatter='R${value}'
              :interval='50'
              :min='0'
              :max='2000'
              :disabled='false'
              :lazy='true'
              :tooltipStyle='{ "backgroundColor": "#00D8C7", "borderColor": "#00D8C7", "fontWeight": "500", "padding": "5px" }'
              :bgStyle='{ "backgroundColor": "rgb(237,237,237)" }'
              :processStyle='{ "backgroundColor": "transparent" }'>
            </vue-slider>
          </div>

        </form>
      </div>


    <div class="filtrar-mobile">
      <div class="filtrar-body">
        <span class="__filtrar-text">Filtrar</span>
        <img class="__filtrar-img" src="../../assets/img/filter.svg">
      </div>
    </div>


  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'
import Multiselect from 'vue-multiselect'
import supportsWebP from 'supports-webp'
import * as firebase from 'firebase'

export default {
  components: { Multiselect, vueSlider },
  head () {
    return {
      title: 'Acomodações em Capitólio ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
  data () {
    return {
      filter: {
        date: null,
        tipoAcomod: null,
        local: null,
        valorDiaria: [0, 2000]
      },
      tiposAcomods: [
        'Casa',
        'Rancho'
      ],
      localidades: [
        'Escarpas do Lago',
        'Capitólio'
      ],
      swiperOption: {
        slidesPerView: 1,
        pagination: '.swiper-pagination'
      },
      formats: {
        input: ['D MMM', 'D MMM']
      },
      disabledAttribute: {
        contentStyle: {
          opacity: .3
        },
        contentHoverStyle: {
          cursor: 'default',
          backgroundColor: 'transparent',
        }
      },
      themeStylesDesktop: {
        wrapper: {
          color: 'rgb(62, 62, 62)',
          border: '0',
          background: 'white',
          boxShadow: '1px 1px 25px 2px rgba(0,0,0,0.1)'
        },
        header: {
          padding: '12px 9px 0px 9px',
        },
        headerArrows: {
          fontSize: '1.4rem',
        },
        headerTitle: {
          fontSize: '16px',
          fontWeight: '400'
        },
        weekdays: {
          color: 'rgb(62, 62, 62)',
          fontWeight: '600',
          padding: '14px 5px 6px 5px',
        },
        dayCell: {
          height: '32px'
        },
        dayContent: {
          fontWeight: '400',
          fontSize: '14px'
        },
        dayCellNotInMonth: {
          opacity: 0
        },
        dayPopoverContent: {
          background: '#00D8C7',
          color: 'white',
          border: 'none'
        },
        verticalDivider: {
          borderLeft: 'none'
        }
      }
    }
  },
  fetch ({ store }) {
    return firebase.database().ref('acomodacoes').on('value', function(snapshot) {
      store.commit('m_acomods', snapshot.val())
    })
  },
  methods: {
    image1H (acomod) {
      if (supportsWebP) {
        return acomod.imageH1W
      } else {
        return acomod.imageH1J
      }
    },
    image2H (acomod) {
      if (supportsWebP) {
        return acomod.imageH2W
      } else {
        return acomod.imageH2J
      }
    },
    image3H (acomod) {
      if (supportsWebP) {
        return acomod.imageH3W
      } else {
        return acomod.imageH3J
      }
    },
    ifImage2 (acomod) {
      if (acomod.imageH2W === null) {
        return
      } else {
        if (supportsWebP) {
          return acomod.imageH2W
        } else {
          return acomod.imageH2J
        }
      }
    },
    ifImage3 (acomod) {
      if (acomod.imageH3W === null) {
        return
      } else {
        if (supportsWebP) {
          return acomod.imageH3W
        } else {
          return acomod.imageH3J
        }
      }
    }
  },
  computed: {
    acomods () {
      return this.$store.state.acomods
    },
    disabledDates () {
      return 
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.state.offFoobar1 = false
      vm.$store.state.offFoobar2 = true
      vm.$store.state.offFoobar3 = true
      vm.$store.state.offFoobar4 = true
      vm.$store.state.offFoobar5 = true
      if (vm.$store.state.showFoobar === false) {
        vm.$store.commit('m_showFoobar', true)
      }
      if (vm.$store.state.showNavbar === false) {
        vm.$store.commit('m_showNavbar', true)
      }
    })
  }
}
</script>

<style>
@import url('../../assets/css/main.css');
@import url('../../assets/css/pagination.css');
@import url('../../node_modules/vue-multiselect/dist/vue-multiselect.min.css');

.acomods {
  margin: 3.2rem 0 5.2rem 0;
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
          color: #007B77;
        }
        & .__card-title {
          padding: .3rem 0;
          font-size: 20px;
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
}
@media (min-width: 1024px) {
  .acomods {
    margin: 0;
    display: flex;
    flex-flow: row;
    & .acomods-container {
      margin-top: 6.5rem;
      width: 66.8%;
      padding-left: 8%;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      & .card {
        width: 48.6%;
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
            text-transform: uppercase;
            font-size: 11px;
            font-weight: 700;
            color: #007B77;
          }
          & .__card-title {
            padding: .4rem 0;
            font-size: 16px;
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
    & .filtrar-desktop {
      position: fixed;
      width: 23.5%;
      top: 3.8rem;
      bottom: 0;
      right: 8%;
      border-left: 1px solid rgb(232,232,232);
      border-right: 1px solid rgb(232,232,232);
      & .filtrar-desktop-form {
        padding: 2.9rem 1.4rem;
        & .item-form {
          display: flex;
          flex-flow: column;
          align-items: center;
          margin: 0 0 1.5rem 0;
          & input {
            cursor: pointer;
            width: 100%;
            font-size: 14px;
            font-weight: 500;
            padding: .6rem;
            border: 1px solid rgb(232,232,232);
            outline: none;
            background: white;
            color: #757575;
          }
          & .multiselect {
            cursor: pointer;
            & .multiselect__tags {
              
              & .multiselect__tags-wrap {
                & .multiselect__tag {
                  background: #00D8C7;
                  font-size: 14px;
                  font-weight: 600;
                }
                
              }
              & .multiselect__single {
                font-size: 14px;
                font-weight: 500;
                color: var(--color01);
              }
              
            }
            
            & .multiselect__content-wrapper {
              & .multiselect__content {
                
                & .multiselect__element {
                  font-size: 14px;
                  font-weight: 500;
                  & .multiselect__option--highlight {
                    background: #00D8C7;
                  }
                }
              }
            }
          }
          & .multiselect--active {
            z-index: 100;
          }
        }
      }
    }
    & .filtrar-mobile {
      display: none;
    }
  }
}
</style>
