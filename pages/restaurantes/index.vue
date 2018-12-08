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

.restaurantes {
  margin-top: var(--navbarHeightMobile);
  display: flex;
  flex-flow: column;
  padding: 4rem 7%;
  transition: var(--pages-transition);
  & .__title {
    font-size: 27px;
    text-align: center;
  }
}

@media (min-width: 1024px) {
  .restaurantes {
    margin-top: var(--navbarHeightDesktop);
    & .__title {
      padding: 0 24%;
      font-size: 36px;
    }
  }
}
</style>
