<template>
  <div class="atracoes">

    <ul class="atracoes-container">
      <li class="card" v-for="atracao in atracoes" :key="atracao.atracaoID">
        <nuxt-link :to="'/atracoes/' + atracao.atracaoID">

          <div class="image-box">
            <swiper :options="swiperOption">
              <swiper-slide class="slide"><img class="__img" :src="image1H(atracao)"></swiper-slide>
              <swiper-slide class="slide" v-if="ifImage2(atracao)"><img class="__img" :src="image2H(atracao)"></swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>

          <div class="card-details">
            <span class="__card-tipo-atracao">{{ atracao.tipoAtracao }}</span>
            <span class="__card-title">{{ atracao.title }}</span>
          </div>
          
        </nuxt-link> 
      </li>
    </ul>

    <div class="filtrar">
      <div class="filtrar-body">
        <span class="__filtrar-text">Filtrar</span>
        <img class="__filtrar-img" src="../../assets/img/filter.svg">
      </div>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import supportsWebP from 'supports-webp'

export default {
  head () {
    return {
      title: 'Atrações em Capitólio ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination'
      }
    }
  },
  fetch ({ store }) {
    return firebase.firestore().collection('atracoes').onSnapshot(snapshot => {
      store.commit('m_atracoes', snapshot.docs.map(doc => doc.data()))
    })
  },
  methods: {
    image1H (atracao) {
      return supportsWebP ? atracao.imageH1W : atracao.imageH1J
    },
    image2H (atracao) {
      return supportsWebP ? atracao.imageH2W : atracao.imageH2J
    },
    ifImage2 (atracao) {
      return atracao.imageH2W === null ? '' : supportsWebP ? atracao.imageH2W : atracao.imageH2J
    }
  },
  computed: {
    atracoes () {
      return this.$store.state.atracoes
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.state.offFoobar1 = true
      vm.$store.state.offFoobar2 = true
      vm.$store.state.offFoobar3 = false
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
@import url('~/assets/css/pagination.css');

.atracoes {
  margin: 3.4rem 0 5.4rem 0;
  display: flex;
  flex-flow: column;
  transition: all .2s ease-in-out;
  & .atracoes-container {
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
        & .__card-tipo-atracao {
          text-transform: uppercase;
          font-size: 11px;
          font-weight: 700;
          color: #81C784;
        }
        & .__card-title {
          padding: .3rem 0;
          font-size: 18px;
          font-weight: 700;
        }
        & .__card-valor {
          font-size: 16px;
          font-weight: 300;
          & .__card-valor-dia {
            font-size: 14px;
          }
        }
      }
    }
  }
  & .filtrar {
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
</style>
