<template>
  <div class="eventos_id">
    <div class="image-box">
      <img class="image1" :src="evento.imgUrlH1" alt="">
      <nuxt-link to="/">
        <img class="__back-btn" src="../../assets/img/back.svg" alt="" @click="$store.commit('m_showNavbar', true), $store.commit('m_showFoobar', true)">
      </nuxt-link>
    </div>
    <h1>{{ evento.title }}</h1>
  </div>
</template>

<script>
import * as firebase from 'firebase'

export default {
  head () {
    return {
      title: this.evento.title + ' ‒ ' + 'Escarpas Trip'
    }
  },
  transition: 'evento',
  fetch ({ store, params }) {
    return firebase.database().ref('eventos/' + params.id).once('value')
    .then(snapshot => {
      store.commit('m_evento', snapshot.val())
      store.commit('m_showNavbar', false)
      store.commit('m_showFoobar', false)
    })
  },
  computed: {
    evento () {
      return this.$store.state.evento
    }
  },
}
</script>

<style scope>
@import url('../../assets/css/main.css');

.eventos_id {
  display: flex;
  flex-flow: column;
  transition: all .3s ease;
  & .image-box {
    position: relative;
    & .image1 {
      width: 100%;
      height: auto;
    }
    & .__back-btn {
      cursor: pointer;
      position: absolute;
      top: 1.2rem;
      left: 1.2rem;
      width: 1.2rem;
      height: auto;
    }
  }
}
</style>
