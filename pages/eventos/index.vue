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

          <div class="card-details">
            <span class="__card-date">{{ evento.date }}&#160;&#8231;&#160;{{ evento.hour }}</span>
            <span class="__card-title">{{ evento.title }}</span>
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
    return firebase.database().ref('eventos').on('value', function(snapshot) {
      store.commit('m_eventos', snapshot.val())
    })
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
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.state.offFoobar1 = true
      vm.$store.state.offFoobar2 = false
      vm.$store.state.offFoobar3 = true
      vm.$store.state.offFoobar4 = true
      vm.$store.state.offFoobar5 = true
    })
  }
}
</script>

<style>
@import url('../../assets/css/main.css');
@import url('../../assets/css/pagination.css');

.eventos {
  margin: 3.2rem 0 5.2rem 0;
  display: flex;
  flex-flow: column;
  transition: all .2s ease-in-out;
  & .eventos-container {
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
        & .__card-date {
          padding-top: .2rem;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 700;
          color: #FF7D6C;
        }
        & .__card-title {
          padding: .2rem 0;
          font-size: 19px;
          font-weight: 700;
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
      padding: 0 .5rem;
      justify-content: space-around;
      align-items: center;
      & .__filtrar-text {
        text-transform: uppercase;
        font-size: 13px;
        font-weight: 600;
      }
      & .__filtrar-img {
        width: 1.15rem;
        height: auto;
      }
    }
  }
}
</style>
