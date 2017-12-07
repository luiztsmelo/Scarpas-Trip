<template>
  <div class="eventos">

    <ul class="eventos-container">
      <li class="card" v-for="evento in eventos" :key="evento.eventoID">
        <nuxt-link :to="'/eventos/' + evento.eventoID">

          <div class="image-box">
            <swiper :options="swiperOption">
              <swiper-slide class="slide"><img class="__img" :src="image1H(evento)"></swiper-slide>
              <swiper-slide class="slide" v-if="ifImage2(evento)"><img class="__img" :src="image2H(evento)"></swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div> 

          <span class="__card-date">{{ evento.date }}</span>
          <h1 class="__card-title">{{ evento.title | truncateTitle }}</h1>
          <h3 class="__card-subtitle">{{ evento.subtitle | truncateSubtitle }}</h3>
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
      title: 'Eventos em Escarpas do Lago ‒ Escarpas Trip'
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
    if (store.state.eventos === null) {
      return firebase.database().ref('eventos').once('value')
      .then(snapshot => {
        store.commit('m_eventos', snapshot.val())
      })
    } else {
      return console.log('Eventos já carregados')
    }
  },
  methods: {
    image1H (evento) {
      if (supportsWebP) {
        return evento.imageH1W
      } else {
        return evento.imageH1J
      }
    },
    image2H (evento) {
      if (supportsWebP) {
        return evento.imageH2W
      } else {
        return evento.imageH2J
      }
    },
    ifImage2 (evento) {
      if (evento.imageH2W === null) {
        return
      } else {
        if (supportsWebP) {
          return evento.imageH2W
        } else {
          return evento.imageH2J
        }
      }
    }
  },
  computed: {
    eventos () {
      return this.$store.state.eventos
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

.eventos {
  margin: 3.2rem 0 5.2rem 0;
  display: flex;
  flex-flow: column;
  transition: all .222s ease-in-out;
  & .eventos-container {
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
      & .__card-date {
        padding: 2rem 7%;
        font-size: 14px;
        font-weight: 600;
        color: #ff5858;
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
