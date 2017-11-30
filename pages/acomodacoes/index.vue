<template>
  <div class="acomodacoes">
    <h1>Acomodações</h1>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Acomodações em Escarpas do Lago ‒ Escarpas Trip'
    }
  },
  transition: 'opacity'
}
</script>

<style>
@import url('../../assets/css/main.css');

.acomodacoes {
  margin-top: 3.2rem;
  display: flex;
  flex-flow: column;
  padding: 3rem 7%;
  transition: var(--main-transition);
}
</style>
