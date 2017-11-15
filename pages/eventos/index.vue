<template>
  <div class="eventos">

    <ul class="eventos-container">
      <li class="card" v-for="evento in $store.state.eventos" :key="evento.eventoID">
        <nuxt-link :to="'/eventos/' + evento.eventoID">
          <img class="__card-img" :src="imageH(evento)" />
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
    imageH (evento) {
      if (supportsWebP) {
        return evento.imageH1W
      } else {
        return evento.imageH1J
      }
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
  margin-top: 3.2rem;
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
      & .__card-img {
        margin-bottom: .2rem;
        width: 100%;
        height: auto;
        border-radius: 3px;
      }
      & .__card-date {
        padding: 2rem 7%;
        font-size: 14px;
        font-weight: 600;
        color: #ff5858;
      }
      & .__card-title {
        padding: .2rem 7%;
        font-size: 22px;
        font-weight: 600;
      }
      & .__card-subtitle {
        font-size: 19px;
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
    width: 30%;
    background: white;
    transition: all .3s ease;
    box-shadow: 2px 2px 7px 1px rgba(0,0,0,0.3);
    border-radius: 15px;
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
