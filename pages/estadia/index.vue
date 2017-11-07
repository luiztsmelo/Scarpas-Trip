<template>
  <div class="estadia">
    <h1>Estadia</h1>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Estadia em Escarpas do Lago ‒ Escarpas Trip'
    }
  },
  transition: 'opacity'
}
</script>

<style scope>
@import url('../../assets/css/main.css');

.estadia {
  margin-top: 3.3rem;
  display: flex;
  flex-flow: column;
  padding: 3rem 7%;
  transition: all .222s ease-in-out;
}
</style>
