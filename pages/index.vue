<template>
  <div class="home">

    <div class="home-body">



      <Roteiro/>



      <!-- ####### EVENTOS ####### -->
      <div class="category-container">

        <div class="title-row">
          <h1 class="__title" id="eventos">Próximos Eventos</h1>

          <nuxt-link to="/eventos">
            <div class="see-all">
              <span class="__see-all-text">Ver mais</span>
              <img class="__see-all-arrow" src="../assets/img/see-all-arrow.svg">
            </div>
          </nuxt-link>
        </div>
        
        <div class="cards-container">
          <div class="card" v-for="evento in $store.state.eventos" :key="evento.eventoID">
            <nuxt-link :to="'/eventos/' + evento.eventoID">
              <progressive-background class="__card-img" :src="imageEvH(evento)" :placeholder="evento.imageL1" :aspect-ratio="2/3"/>
              <span class="__card-info" style="color: #FF7D6C">{{ evento.date }}&#160;&#8231;&#160;{{ evento.hour }}</span>
              <h1 class="__card-title">{{ evento.title }}</h1>
              <span class="__card-subtitle">{{ evento.subtitle }}</span>
            </nuxt-link> 
          </div>
        </div>

      </div><!-- ####### EVENTOS ####### -->





      <!-- ####### ACOMODAÇÕES ####### -->
      <div class="category-container">

        <div class="title-row">
          <h1 class="__title" id="acomods">Acomodações</h1>

          <nuxt-link to="/acomodacoes">
            <div class="see-all">
              <span class="__see-all-text">Ver mais</span>
              <img class="__see-all-arrow" src="../assets/img/see-all-arrow.svg">
            </div>
          </nuxt-link> 
        </div>
        
        <div class="cards-container">
          <div class="card" v-for="acomod in $store.state.acomods" :key="acomod.acomodID">
            <nuxt-link :to="'/acomodacoes/' + acomod.acomodID">

              <progressive-background class="__card-img" :src="imageAcH(acomod)" :placeholder="acomod.images[0].L" :aspect-ratio="2/3"/>

              <span class="__card-info" style="color: #FFA04F">{{ acomod.tipoAcomod }}</span>

              <h1 class="__card-title">{{ acomod.title }}</h1>

              <span class="__card-subtitle">R${{ acomod.valorNoite.toLocaleString() }}<span class="__card-valor-noite"> por noite</span></span>
              
            </nuxt-link> 
          </div>
        </div>

      </div><!-- ####### ACOMODAÇÕES ####### -->





      <!-- ####### PASSEIOS ####### -->
      <div class="category-container">

        <div class="title-row">
          <h1 class="__title" id="passeios">Passeios</h1>

          <nuxt-link to="/passeios">
            <div class="see-all">
              <span class="__see-all-text">Ver mais</span>
              <img class="__see-all-arrow" src="../assets/img/see-all-arrow.svg">
            </div>
          </nuxt-link> 
        </div>
        
        <div class="cards-container">
          <div class="card" v-for="passeio in $store.state.passeios" :key="passeio.passeioID">
            <nuxt-link :to="'/passeios/' + passeio.passeioID">
              <progressive-background class="__card-img" :src="imagePasH(passeio)" :placeholder="passeio.imageL1" :aspect-ratio="2/3"/>
              <span class="__card-info" style="color: #0784FD">{{ passeio.tipoPasseio }}</span>
              <h1 class="__card-title">{{ passeio.title }}</h1>
              <span class="__card-subtitle">R${{ passeio.valorPasseio.toLocaleString() }}<span class="__card-valor-noite"> por pessoa</span></span>
            </nuxt-link> 
          </div>
        </div>

      </div><!-- ####### PASSEIOS ####### -->





      <!-- ####### ATRAÇÕES ####### -->
      <div class="category-container">

        <div class="title-row">
          <h1 class="__title" id="atracoes">Atrações</h1>

          <nuxt-link to="/atracoes">
            <div class="see-all">
              <span class="__see-all-text">Ver mais</span>
              <img class="__see-all-arrow" src="../assets/img/see-all-arrow.svg">
            </div>
          </nuxt-link> 
        </div>
        
        <div class="cards-container">
          <div class="card" v-for="atracao in $store.state.atracoes" :key="atracao.atracaoID">
            <nuxt-link :to="'/atracoes/' + atracao.atracaoID">
              <progressive-background class="__card-img" :src="imageAtH(atracao)" :placeholder="atracao.imageL1" :aspect-ratio="2/3"/>
              <span class="__card-info" style="color: #81C784">{{ atracao.tipoAtracao }}</span>
              <h1 class="__card-title">{{ atracao.title }}</h1>
            </nuxt-link> 
          </div>
        </div>

      </div><!-- ####### ATRAÇÕES ####### -->


      <Footer/>

    </div>
  </div>
</template>

<script>
import supportsWebP from 'supports-webp'
import * as firebase from 'firebase'
require('firebase/firestore')
import Roteiro from '../components/Roteiro'
import Footer from '../components/Footer'

export default {
  components: { Roteiro, Footer },
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
        spaceBetween: 13,
        speed: 300
      }
    }
  },
  methods: {
    imageEvH (evento) {
      return supportsWebP ? evento.imageH1W : evento.imageH1J
    },
    imageAcH (acomod) {
      return supportsWebP ? acomod.images[0].HW : acomod.images[0].HJ
    },
    imagePasH (passeio) {
      return supportsWebP ? passeio.imageH1W : passeio.imageH1J
    },
    imageAtH (atracao) {
      return supportsWebP ? atracao.imageH1W : atracao.imageH1J
    }
  },
  fetch ({ store }) {
    return firebase.firestore().collection('eventos').onSnapshot(snap => {
      store.commit('m_eventos', snap.docs.map(doc => doc.data()))
    })
    && firebase.firestore().collection('acomods').onSnapshot(snap => {
      store.commit('m_acomods', snap.docs.map(doc => doc.data()))
    })
    && firebase.firestore().collection('passeios').onSnapshot(snap => {
      store.commit('m_passeios', snap.docs.map(doc => doc.data()))
    })
    && firebase.firestore().collection('atracoes').onSnapshot(snap => {
      store.commit('m_atracoes', snap.docs.map(doc => doc.data()))
    })
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
  },
  beforeRouteLeave (to, from, next) {
    if (this.$store.state.error === true) {
      this.$store.dispatch('a_resetError')
      next()
    } else {
      next()
    }
  }
}
</script>

<style scoped>
@import url('~/assets/css/main.css');

.home {
  margin-top: 3.4rem;
  display: flex;
  flex-flow: column;
  transition: var(--main-transition);
  & .home-body {
    display: flex;
    flex-flow: column;
    margin-bottom: 5.3rem;
    & .category-container {
      padding: 2rem 0;
      display: flex;
      flex-flow: column;
      overflow-x: hidden;
      & .title-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 7% 1.2rem 7%;
        & .__title {
          font-size: 22px;
          font-weight: 700;
        }
        & .see-all {
          width: 6rem;
          cursor: pointer;
          text-align: end;
          & .__see-all-text {
            font-size: 14px;
            font-weight: 600;
            padding-right: 3px;
            color: #1E9297;
          }
          & .__see-all-arrow {
            opacity: .6;
            width: .7rem;
            height: auto;
          }
        }
      }
      & .cards-container {
        padding: 0 5%;
        display: flex;
        flex-flow: row wrap;
        & .card {
          margin: .7rem 1.8%;
          flex: 0 1 46%;
          & .__card-img {
            width: 100%; 
            height: auto;
            border-radius: 2px;
            margin-bottom: .2rem;
          }
          & .__card-info {
            text-transform: uppercase;
            font-size: 10px;
            font-weight: 700;
            color: #007B77;
          }
          & .__card-title {
            margin: .1rem 0 .2rem 0;
            font-size: 14px;
            font-weight: 700;
          }
          & .__card-subtitle {
            font-size: 14px;
            font-weight: 400;
            & .__card-valor-noite {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 1023px) {
  .home {
    & .home-body {
      & .category-container {
        & .see-all {
          display: none;
        }
      }
    }
  }
}
@media (min-width: 1024px) {
  .home {
    margin-top: var(--navbarHeightDesktop);
    & .home-body {
      margin-bottom: 0;
      & .category-container {
        padding-bottom: 6rem;
        & .title-row {
          padding: 0 7% 1.5rem 7%;
          & .__title {
            font-size: 29px;
            font-weight: 700;
          }
        }
        & .cards-container {
          padding: 0 6.5%;
          & .card {
            margin: 1.3rem .8%;
            flex: 0 1 23.4%;
            & .__card-img {
              margin-bottom: .3rem;
              border-radius: 2px;
            }
            & .__card-info {
              text-transform: uppercase;
              font-size: 12px;
              font-weight: 600;
            }
            & .__card-title {
              margin: .3rem 0 .4rem 0;
              font-size: 16px;
              font-weight: 700;
            }
            & .__card-subtitle {
              font-size: 16px;
              font-weight: 400;
              & .__card-valor-noite {
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
