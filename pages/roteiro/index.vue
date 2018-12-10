<template>
  <div class="roteiro">

    <h1 class="__title">Crie seu roteiro personalizado</h1>


  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Roteiro de viagem ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.state.isMobile) {
        vm.$store.commit('m_showNavbar', false)
        vm.$store.commit('m_showFoobar', false)
      } else {
        vm.$store.commit('m_showNavbar', true)
      }
    })
  }
}
</script>

<style scoped>

.roteiro {
  margin-top: var(--navbarHeightDesktop);
  display: flex;
  flex-flow: column;
  transition: var(--pages-transition);
  padding: 4rem 7%;
  & .__title {
    text-align: center;
  }
}

</style>
