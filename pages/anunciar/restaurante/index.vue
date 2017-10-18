<template>
  <div class="anunciar-restaurante">
    <h1 class="__title">“A melhor maneira de encontrar o seu cliente é ser encontrado por ele.”– Conrado Adolpho</h1>

  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Anunciar Restaurante em Escarpas do Lago ‒ Escarpas Trip'
    }
  },
  transition: 'slide-left'
}
</script>

<style scope>
@import url('../../../assets/css/main.css');

.anunciar-restaurante {
  margin-top: 3.5rem;
  display: flex;
  flex-flow: column;
  transition: all .222s ease;
  & .__title {
    padding: 3rem 7% 0 7%;
  }
}
</style>
