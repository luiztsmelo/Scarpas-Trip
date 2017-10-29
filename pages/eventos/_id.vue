<template>
  <div class="eventos_id">

    <div class="image-box">
      <img class="__image1" :src="evento.imgUrlH1" alt="">
      <nuxt-link to="/">
        <img class="__back-btn" src="../../assets/img/back.svg" alt="voltar">
      </nuxt-link>
      <img class="__share-btn" src="../../assets/img/share.svg" alt="compartilhar">
    </div>

    <div class="heading">
      <h1 class="__title">{{ evento.title }}</h1>
    </div>
    
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
  beforeRouteLeave (to, from, next) {
    if (this.$store.state.showNavbar === false && this.$store.state.showFoobar === false) {
      this.$store.commit('m_showNavbar', true)
      this.$store.commit('m_showFoobar', true)
      next()
    } else {
      next(false)
    }
  }
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
    & .__image1 {
      width: 100%;
      height: auto;
    }
    & .__back-btn {
      cursor: pointer;
      position: absolute;
      top: 1.2rem;
      left: 7%;
      width: 1.2rem;
      height: auto;
    }
    & .__share-btn {
      cursor: pointer;
      position: absolute;
      top: 1.2rem;
      right: 7%;
      width: 1.4rem;
      height: auto;
    }
  }
  & .heading {
    padding: 1rem 7%;
    & .__title {
      font-weight: 600;
    }
  }
}
</style>
