<template>
  <div class="atracoes">
    <h1>Atrações</h1>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Atrações em Escarpas do Lago ‒ Escarpas Trip'
    }
  },
  transition: 'slide-left'
}
</script>

<style scope>
@import url('../../assets/css/main.css');

.atracoes {
  margin-top: 3.3rem;
  display: flex;
  flex-flow: column;
  padding: 3rem 7%;
  transition: all .222s ease;
}
</style>
