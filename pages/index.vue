<template>
  <div class="home">

    <div class="home-body">




      <roteiro/><!-- ####### ROTEIRO ####### -->




      <!-- ####### EVENTOS ####### -->
      <div class="category-container">

        <div class="title-row">
          <h1 class="__title">Próximos Eventos</h1>

          <nuxt-link to="/eventos">
            <div class="see-all">
              <span class="__see-all-text">Ver mais</span>
              <img class="__see-all-arrow" src="../assets/img/see-all-arrow.svg">
            </div>
          </nuxt-link>
        </div>
          
        <swiper :options="swiperOption">
          <swiper-slide class="card" v-for="evento in $store.state.eventos" :key="evento.eventoID">
            <nuxt-link :to="'/eventos/' + evento.eventoID">
              <progressive-img class="__card-img" :src="imageEvH(evento)" :placeholder="evento.imageL1" no-ratio />
              <span class="__card-date">{{ evento.date }}&#160;&#8231;&#160;{{ evento.hour }}</span>
              <h1 class="__card-title">{{ evento.title | truncateTitle }}</h1>
              <span class="__card-subtitle">{{ evento.subtitle | truncateSubtitle }}</span>
            </nuxt-link> 
          </swiper-slide>
        </swiper>

      </div><!-- ####### EVENTOS ####### -->





      <!-- ####### ACOMODAÇÕES ####### -->
      <div class="category-container">

        <div class="title-row">
          <h1 class="__title">Acomodações</h1>

          <nuxt-link to="/acomodacoes">
            <div class="see-all">
              <span class="__see-all-text">Ver mais</span>
              <img class="__see-all-arrow" src="../assets/img/see-all-arrow.svg">
            </div>
          </nuxt-link> 
        </div>
          
        <swiper :options="swiperOption">
          <swiper-slide class="card" v-for="acomod in $store.state.acomods" :key="acomod.acomodID">
            <nuxt-link :to="'/acomodacoes/' + acomod.acomodID">
              <progressive-img class="__card-img" :src="imageAcH(acomod)" :placeholder="acomod.imageL1" no-ratio />
              <span class="__card-tipoAcomod">{{ acomod.tipoAcomod }}</span>
              <h1 class="__card-title">{{ acomod.title | truncateTitle }}</h1>
              <span class="__card-valor">R${{ acomod.valorDiariaNormal }}<span class="__card-valor-dia"> por dia</span></span>
            </nuxt-link> 
          </swiper-slide>
        </swiper>

      </div><!-- ####### ACOMODAÇÕES ####### -->





      <!-- ####### PASSEIOS ####### -->
      <div class="category-container">

        <div class="title-row">
          <h1 class="__title">Passeios</h1>

          <nuxt-link to="/passeios">
            <div class="see-all">
              <span class="__see-all-text">Ver mais</span>
              <img class="__see-all-arrow" src="../assets/img/see-all-arrow.svg">
            </div>
          </nuxt-link> 
        </div>
          
        <swiper :options="swiperOption">
          <swiper-slide class="card" v-for="passeio in $store.state.passeios" :key="passeio.passeioID">
            <nuxt-link :to="'/passeios/' + passeio.passeioID">
              <progressive-img class="__card-img" :src="imagePasH(passeio)" :placeholder="passeio.imageL1" no-ratio />
              <span class="__card-tipoPasseio">{{ passeio.tipoPasseio }}</span>
              <h1 class="__card-title">{{ passeio.title | truncateTitle }}</h1>
              <span class="__card-valor">R${{ passeio.valorPasseio }}<span class="__card-valor-pessoa"> por pessoa</span></span>
            </nuxt-link> 
          </swiper-slide>
        </swiper>

      </div><!-- ####### PASSEIOS ####### -->





      <!-- ####### ATRAÇÕES ####### -->
      <div class="category-container">

        <div class="title-row">
          <h1 class="__title">Atrações</h1>

          <nuxt-link to="/atracoes">
            <div class="see-all">
              <span class="__see-all-text">Ver mais</span>
              <img class="__see-all-arrow" src="../assets/img/see-all-arrow.svg">
            </div>
          </nuxt-link> 
        </div>
          
        <swiper :options="swiperOption">
          <swiper-slide class="card" v-for="atracao in $store.state.atracoes" :key="atracao.atracaoID">
            <nuxt-link :to="'/atracoes/' + atracao.atracaoID">
              <progressive-img class="__card-img" :src="imageAtH(atracao)" :placeholder="atracao.imageL1" no-ratio />
              <span class="__card-tipoAtracao">{{ atracao.tipoAtracao }}</span>
              <h1 class="__card-title">{{ atracao.title | truncateTitle }}</h1>
            </nuxt-link> 
          </swiper-slide>
        </swiper>

      </div><!-- ####### ATRAÇÕES ####### -->


    </div>
  </div>
</template>

<script>
import supportsWebP from 'supports-webp'
import * as firebase from 'firebase'
import Roteiro from '../components/Roteiro'

export default {
  components: {
    Roteiro
  },
  head () {
    return {
      meta: [
        { hid: 'description', name: 'description', content: 'Planeje sua viagem para Capitólio de forma simples, agradável e segura.' }
      ]
    }
  },
  transition: 'opacity',
  data () {
    return {
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 14,
        speed: 300
      }
    }
  },
  methods: {
    imageEvH (evento) {
      if (supportsWebP) {
        return evento.imageH1W
      } else {
        return evento.imageH1J
      }
    },
    imageAcH (acomod) {
      if (supportsWebP) {
        return acomod.imageH1W
      } else {
        return acomod.imageH1J
      }
    },
    imagePasH (passeio) {
      if (supportsWebP) {
        return passeio.imageH1W
      } else {
        return passeio.imageH1J
      }
    },
    imageAtH (atracao) {
      if (supportsWebP) {
        return atracao.imageH1W
      } else {
        return atracao.imageH1J
      }
    }
  },
  fetch ({ store }) {
    return firebase.database().ref('eventos').on('value', function(snapshot) {
      store.commit('m_eventos', snapshot.val())
    }) 
    && firebase.database().ref('acomodacoes').on('value', function(snapshot) {
      store.commit('m_acomods', snapshot.val())
    })
    && firebase.database().ref('passeios').on('value', function(snapshot) {
      store.commit('m_passeios', snapshot.val())
    })
    && firebase.database().ref('atracoes').on('value', function(snapshot) {
      store.commit('m_atracoes', snapshot.val())
    })
  },
  filters: {
    truncateTitle (value) {
      if (value.length > 29) {
        return value.slice(0, 29) + '...'
      } else {
        return value.slice(0)
      }
    },
    truncateSubtitle (value) {
      if (value.length > 25) {
        return value.slice(0, 25) + '...'
      } else {
        return value.slice(0)
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.state.offFoobar1 = true
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
@import url('../assets/css/main.css');

.home {
  margin-top: 3.2rem;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  transition: var(--main-transition);
  & .home-body {
    display: flex;
    flex-flow: column;
    margin-bottom: 5.2rem;
    & .category-container {
      padding: 2.5rem 0;
      display: flex;
      flex-flow: column;
      overflow-x: hidden;
      & .title-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 7% 1.5rem 7%;
        & .__title {
          font-size: 22px;
          font-weight: 700;
        }
        & .see-all {
          width: 4.5rem;
          cursor: pointer;
          text-align: end;
          & .__see-all-text {
            font-size: 12px;
            font-weight: 500;
            color: rgb(122, 122, 122);
            padding-right: 2px;
          }
          & .__see-all-arrow {
            opacity: .5;
            width: .5rem;
            height: auto;
          }
        }
      }
      & .swiper-container {
        & .swiper-wrapper {
          display: flex;
          padding-left: 7%;
          & .card {
            min-width: 150px;
            max-width: 150px;
            cursor: pointer;
            & .__card-img {
              margin-bottom: .2rem;
              width: 100%;
              min-height: 100px;
              border-radius: 2px;
            }
            & .__card-date {
              font-size: 10px;
              font-weight: 700;
              color: #FF7D6C;
            }
            & .__card-tipoAcomod {
              text-transform: uppercase;
              font-size: 10px;
              font-weight: 700;
              color: #007B77;
            }
            & .__card-tipoPasseio {
              text-transform: uppercase;
              font-size: 10px;
              font-weight: 700;
              color: #64B5F6;
            }
            & .__card-tipoAtracao {
              text-transform: uppercase;
              font-size: 10px;
              font-weight: 700;
              color: #81C784;
            }
            & .__card-title {
              margin: .2rem 0;
              font-size: 14px;
              font-weight: 700;
            }
            & .__card-subtitle {
              font-size: 14px;
              font-weight: 400;
            }
            & .__card-valor {
              font-size: 14px;
              font-weight: 400;
              & .__card-valor-dia {
                font-size: 13px;
              }
              & .__card-valor-pessoa {
                font-size: 13px;
              }
            }
          }
        }
      }
    }
  }
}

@media (min-width: 1281px) {
  .home {
    & .home-body {
      & .category-container {
        & .title-row {
          padding: 0 13% 1.5rem 13%;
          & .__title {
            font-size: 29px;
          }
        }
        & .swiper-container {
          & .swiper-wrapper {
            padding-left: 13%;
          }
        }
      }
    }
  }
}
</style>
