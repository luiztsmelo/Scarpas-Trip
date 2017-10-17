<template>
  <div class="eventos">
    <h1>Eventos</h1>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Eventos ‒ Escarpas Trip'
    }
  },
  transition: 'slide-left',
  data () {
    return {
      eventosData: [
        {title: 'Réveillon Kanto da Ilha 2018', subtitle: 'Venha curtir com a gente!'},
        {title: 'Molejão ao Vivo', subtitle: 'Gravação do novo DVD'},
        {title: 'Mc Catra no Kanto da Ilha', subtitle: 'Curtindo com a galera'}
      ]
    }
  }
}
</script>

<style scope>
@import url('../../assets/css/main.css');

.eventos {
  margin-top: 3.5rem;
  display: flex;
  flex-flow: column;
  padding: 7%;
  transition: all .222s ease;
}
</style>
