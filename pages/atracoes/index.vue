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
  transition: 'opacity'
}
</script>

<style scope>
@import url('../../assets/css/main.css');

.atracoes {
  margin-top: 3.2rem;
  display: flex;
  flex-flow: column;
  padding: 3rem 7%;
  transition: var(--main-transition);
}
</style>
