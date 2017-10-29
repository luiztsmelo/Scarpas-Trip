<template>
  <div class="eventos_id">
    <h1>{{ onEvento.title }}</h1>
  </div>
</template>

<script>
import * as firebase from 'firebase'

export default {
  head () {
    return {
      title: this.onEvento.title + ' ‒ ' + 'Escarpas Trip'
    }
  },
  fetch ({ store, params }) {
    return firebase.database().ref('eventos/' + params.id).once('value')
    .then(snapshot => {
      store.commit('m_onEvento', snapshot.val())
    })
  },
  computed: {
    onEvento () {
      return this.$store.state.onEvento
    }
  },
}
</script>

<style scope>
@import url('../../assets/css/main.css');

.eventos_id {
  margin-top: 3.3rem;
  display: flex;
  flex-flow: column;
  padding: 3rem 7%;
  transition: all .222s ease;
}
</style>
