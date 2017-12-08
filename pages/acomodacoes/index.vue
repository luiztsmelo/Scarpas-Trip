<template>
  <div class="acomods">

    <ul class="acomods-container">
      <li class="card" v-for="acomod in acomods" :key="acomod.acomodID">
        <nuxt-link :to="'/acomodacoes/' + acomod.acomodID">

          <div class="image-box">
            <swiper :options="swiperOption">
              <swiper-slide class="slide"><img class="__img" :src="image1H(acomod)"></swiper-slide>
              <swiper-slide class="slide" v-if="ifImage2(acomod)"><img class="__img" :src="image2H(acomod)"></swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div> 

          <span class="__card-tipo-acomod">{{ acomod.tipoAcomod }}</span>
          <h1 class="__card-title">{{ acomod.title | truncateTitle }}</h1>
          <h3 class="__card-subtitle">{{ acomod.subtitle | truncateSubtitle }}</h3>
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
import supportsWebP from 'supports-webp'
import * as firebase from 'firebase'

export default {
  head () {
    return {
      title: 'Acomodações em Escarpas do Lago ‒ Escarpas Trip'
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
    }
  },
  computed: {
    acomods () {
      return this.$store.state.acomods
    }
  },
  filters: {
    truncateTitle (value) {
      if (value.length > 31) {
        return value.slice(0, 31) + '...'
      } else {
        return value.slice(0)
      }
    },
    truncateSubtitle (value) {
      if (value.length > 26) {
        return value.slice(0, 26) + '...'
      } else {
        return value.slice(0)
      }
    }
  }
}
</script>

<style>
@import url('../../assets/css/main.css');

.acomods {
  margin: 3.2rem 0 5.2rem 0;
  display: flex;
  flex-flow: column;
  transition: all .222s ease-in-out;
  & .acomods-container {
    padding: 0;
    display: flex;
    flex-flow: column;
    & .card {
      width: 100%;
      padding-bottom: 3rem;
      & .image-box {
        overflow: hidden;
        margin-bottom: .2rem;
        & .swiper-container {
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
          & .swiper-pagination {

            & .swiper-pagination-bullet {

            }
          }
        }
      }
      & .__card-tipo-acomod {
        text-transform: uppercase;
        padding: 0 7%;
        font-size: 14px;
        font-weight: 600;
        color: #49A5FC;
      }
      & .__card-title {
        padding: .2rem 7%;
        font-size: 20px;
        font-weight: 600;
      }
      & .__card-subtitle {
        font-size: 17px;
        padding: 0 7%;
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
    height: 2rem;
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
      padding: 0 .5rem;
      justify-content: space-around;
      align-items: center;
      & .__filtrar-text {
        font-size: 16px;
        font-weight: 500;
      }
      & .__filtrar-img {
        width: 1.15rem;
        height: auto;
      }
    }
  }
}
</style>
