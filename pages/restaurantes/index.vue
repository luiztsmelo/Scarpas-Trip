<template>
  <div class="restaurantes">
    <h1 class="__title">Em breve os melhores restaurantes de Capitólio</h1>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Restaurantes em Capitólio ‒ Escarpas Trip'
    }
  },
  transition: 'opacity'
}
</script>

<style>
@import url('~/assets/css/main.css');

.restaurantes {
  margin-top: 3.4rem;
  display: flex;
  flex-flow: column;
  padding: 3rem 7%;
  transition: var(--main-transition);
  & .__title {
    font-size: 27px;
  }
}
</style>
