<template>
  <div class="home">

    <div class="home-body">

      <!-- EVENTOS -->
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

        <div class="carousel-container">
          <v-touch @panleft="leftCarousel" @panright="rightCarousel" v-bind:pan-options="{ direction: 'horizontal' }">
            <ul class="carousel-row" :style="'transform: translateX(' + positionCarousel + 'px)'">
              
                <li class="card" v-for="evento in $store.state.eventos" :key="evento.eventoID" @click="getEventoID(evento)">
                  <nuxt-link :to="'/eventos/' + evento.eventoID">
                    <progressive-img class="__card-img" :src="imageH(evento)" :placeholder="imageL(evento)" alt="" no-ratio />
                    <span class="__card-date">{{ evento.date }}</span>
                    <h1 class="__card-title">{{ evento.title | truncateTitle }}</h1>
                    <h2 class="__card-subtitle">{{ evento.subtitle | truncateSubtitle }}</h2>
                  </nuxt-link> 
                </li>
              
            </ul>
          </v-touch>  
        </div>

      </div><!-- EVENTOS -->

    </div>
  </div>
</template>

<script>
import supportsWebP from 'supports-webp'
import * as firebase from 'firebase'

export default {
  head () {
    return {
      title: 'Escarpas Trip'
    }
  },
  transition: 'opacity',
  data () {
    return {
      positionCarousel: ''
    }
  },
  methods: {
    getEventoID (evento) {
      this.$store.commit('m_getEventoID', evento.eventoID)
    },
    imageH (evento) {
      if (supportsWebP) {
        return evento.imageH1W
      } else {
        return evento.imageH1J
      }
    },
    imageL (evento) {
      if (supportsWebP) {
        return evento.imageL1W
      } else {
        return evento.imageL1J
      }
    },
    leftCarousel (e) {
      this.positionCarousel = e.deltaX 
      console.log(e.deltaX + ' - ' + this.positionCarousel)
    },
    rightCarousel (e) {
      this.positionCarousel = e.deltaX 
      console.log(e.deltaX + ' - ' + this.positionCarousel)
    }
  },
  fetch ({ store }) {
    if (store.state.eventos === null) {
      return firebase.database().ref('eventos').once('value')
      .then(snapshot => {
        store.commit('m_eventos', snapshot.val())
      })
    } else {
      return console.log('Já carregado')
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
      if (value.length > 30) {
        return value.slice(0, 30) + '...'
      } else {
        return value.slice(0)
      }
    }
  }
}
</script>

<style scope>
@import url('../assets/css/main.css');

.home {
  margin-top: 3.3rem;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  transition: all .222s ease;
  & .home-body {
    display: flex;
    flex-flow: column;
    padding: 3rem 0;
    margin-bottom: 100rem;
    & .category-container {
      display: flex;
      flex-flow: column;
      overflow-x: hidden;
      & .title-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 7% 1.5rem 7%;
        & .__title {
          font-size: 25px;
          font-weight: 700;
        }
        & .see-all {
          width: 4.5rem;
          cursor: pointer;
          & .__see-all-text {
            font-size: 13px;
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
      & .carousel-container {
        overflow-x: hidden;
        & .carousel-row {
          display: flex;
          flex-flow: row nowrap;
          height: 14rem;
          padding: 0;
          transform: translateX(7%);
          & .card {
            max-width: 145px;
            min-width: 145px;
            cursor: pointer;
            list-style-type: none;
            margin-right: .8rem;
            -webkit-tap-highlight-color: rgba(255, 255, 45, 0);
            & .__card-img {
              margin-bottom: .2rem;
              width: 100%;
              min-height: 97px;
              border-radius: 4px;
            }
            & .__card-date {
              font-size: 12px;
              font-weight: 600;
              color: #ff5858;
            }
            & .__card-title {
              margin: .2rem 0;
              font-size: 17px;
              font-weight: 600;
            }
            & .__card-subtitle {
              font-size: 16px;
              font-weight: 300;
            }
          }
        }
      }
    }
  }
}
</style>
