<template>
  <div class="eventos">
    <h1>Eventos</h1>
  </div>
</template>

<script>
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
}
</style>
