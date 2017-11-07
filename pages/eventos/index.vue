<template>
  <div class="eventos">
    <ul class="eventos-container">
      <li class="card" v-for="evento in $store.state.eventos" :key="evento.eventoID">
        <nuxt-link :to="'/eventos/' + evento.eventoID">
          <img class="__card-img" :src="imageH(evento)" />
          <span class="__card-date">{{ evento.date }}</span>
          <h1 class="__card-title">{{ evento.title | truncateTitle }}</h1>
          <h2 class="__card-subtitle">{{ evento.subtitle | truncateSubtitle }}</h2>
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
  transition: 'slide-left',
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
  padding: 3rem 7%;
  transition: all .222s ease;
  & .eventos-container {
    padding: 0;
    display: flex;
    flex-flow: column;
    & .card {
      width: 100%;
      padding-bottom: 2rem;
      & .__card-img {
        margin-bottom: .2rem;
        width: 100%;
        height: auto;
        border-radius: 3px;
      }
      & .__card-date {
        font-size: 14px;
        font-weight: 600;
        color: #ff5858;
      }
      & .__card-title {
        margin: .2rem 0;
        font-size: 26px;
        font-weight: 600;
      }
      & .__card-subtitle {
        font-size: 19px;
        font-weight: 300;
      }
    }
  }
}
</style>
