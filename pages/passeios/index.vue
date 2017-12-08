<template>
  <div class="passeios">

    <ul class="passeios-container">
      <li class="card" v-for="passeio in passeios" :key="passeio.passeioID">
        <nuxt-link :to="'/passeios/' + passeio.passeioID">

          <div class="image-box">
            <swiper :options="swiperOption">
              <swiper-slide class="slide"><img class="__img" :src="image1H(passeio)"></swiper-slide>
              <swiper-slide class="slide" v-if="ifImage2(passeio)"><img class="__img" :src="image2H(passeio)"></swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div> 

          <span class="__card-tipo-passeio">{{ passeio.tipoPasseio }}</span>
          <h1 class="__card-title">{{ passeio.title | truncateTitle }}</h1>
          <h3 class="__card-subtitle">{{ passeio.subtitle | truncateSubtitle }}</h3>
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
      title: 'Passeios em Escarpas do Lago ‒ Escarpas Trip'
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
    return firebase.database().ref('passeios').on('value', function(snapshot) {
      store.commit('m_passeios', snapshot.val())
    })
  },
  methods: {
    image1H (passeio) {
      if (supportsWebP) {
        return passeio.imageH1W
      } else {
        return passeio.imageH1J
      }
    },
    image2H (passeio) {
      if (supportsWebP) {
        return passeio.imageH2W
      } else {
        return passeio.imageH2J
      }
    },
    ifImage2 (passeio) {
      if (passeio.imageH2W === null) {
        return
      } else {
        if (supportsWebP) {
          return passeio.imageH2W
        } else {
          return passeio.imageH2J
        }
      }
    }
  },
  computed: {
    passeios () {
      return this.$store.state.passeios
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

.passeios {
  margin: 3.2rem 0 5.2rem 0;
  display: flex;
  flex-flow: column;
  transition: all .222s ease-in-out;
  & .passeios-container {
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
      & .__card-tipo-passeio {
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
