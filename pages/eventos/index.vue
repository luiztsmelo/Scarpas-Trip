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

<style scope>
@import url('../../assets/css/main.css');

.eventos {
  margin-top: 3.3rem;
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
        font-size: 23px;
        font-weight: 600;
      }
      & .__card-subtitle {
        padding: 0 7%;
      }
    }
  }
}
</style>
