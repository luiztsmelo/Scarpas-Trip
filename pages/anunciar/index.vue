<template>
  <div class="anunciar">
    <h1 class="__title">Anunciar</h1>

  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Anuncie em Escarpas do Lago ‒ Escarpas Trip'
    }
  },
  transition: 'slide-left'
}
</script>

<style scope>
@import url('../../assets/css/main.css');

.anunciar {
  margin-top: 3.5rem;
  display: flex;
  flex-flow: column;
  transition: all .222s ease;
  & .__title {
    padding: 3rem 7%;
  }
}
</style>
