<template>
  <div class="anunciar-passeio">
    <h1 class="__title">Anunciar Passeio</h1>

  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Anunciar Passeio em Escarpas do Lago ‒ Escarpas Trip'
    }
  },
  transition: 'slide-left'
}
</script>

<style scope>
@import url('../../../assets/css/main.css');

.anunciar-passeio {
  margin-top: 3.5rem;
  display: flex;
  flex-flow: column;
  transition: all .222s ease;
  & .__title {
    padding: 3rem 7% 0 7%;
  }
}
</style>
