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
              <li class="card" v-for="evento in eventos || $store.state.eventos">
                
                <progressive-img class="__card-img" :src="evento.imgUrlH1" :placeholder="evento.imgUrlL1" alt="" no-ratio />
                <h1 class="__card-title">{{ evento.title | snippetTitle }}</h1>
                <h2 class="__card-subtitle">{{ evento.subtitle | snippetSubtitle }}</h2>

              </li>
            </ul>
          </v-touch>  
        </div>

      </div><!-- EVENTOS -->

    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase'

export default {
  head () {
    return {
      title: 'Escarpas Trip'
    }
  },
  transition: 'slide-right',
  data () {
    return {
      positionCarousel: ''
    }
  },
  methods: {
    leftCarousel (e) {
      this.positionCarousel = e.deltaX 
      console.log(e.deltaX + ' - ' + this.positionCarousel)
    },
    rightCarousel (e) {
      this.positionCarousel = e.deltaX 
      console.log(e.deltaX + ' - ' + this.positionCarousel)
    }
  },
  computed: {
    eventos () {
      firebase.database().ref('eventos').once('value').then(snapshot => {
        this.$store.commit('m_eventos', snapshot.val())
      })
    }
  },
  filters: {
    snippetTitle (value) {
      if (value.length > 27) {
        return value.slice(0, 27) + '...'
      } else {
        return value.slice(0)
      }
    },
    snippetSubtitle (value) {
      if (value.length > 27) {
        return value.slice(0, 27) + '...'
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
          transition: all ease .1s;
          transform: translateX(7%);
          & .card {
            max-width: 145px;
            min-width: 145px;
            cursor: pointer;
            list-style-type: none;
            margin-right: .8rem;
            -webkit-tap-highlight-color: rgba(255, 255, 45, 0);
            & .__card-img {
              width: 100%;
              min-height: 97px;
              border-radius: 4px;
            }
            & .__card-title {
              margin: .6rem 0 .3rem 0;
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
