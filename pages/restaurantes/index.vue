<template>
  <div class="restaurantes">
    <h1 class="__title">Em breve.</h1>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Restaurantes em Capitólio ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      vm.$store.state.foobar1 = false
      vm.$store.state.foobar2 = false
      vm.$store.state.foobar3 = false
      vm.$store.state.foobar4 = true
      !vm.$store.state.showFoobar ? vm.$store.commit('m_showFoobar', true) : ''
      !vm.$store.state.showNavbar ? vm.$store.commit('m_showNavbar', true) : ''
    })
  }
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
      font-size: 35px;
    }
  }
}

</style>
