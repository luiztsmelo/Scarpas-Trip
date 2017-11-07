<template>
  <div class="anunciar-estadia">
    <h1 class="__title">Anunciar Estadia</h1>

  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Anunciar Estadia em Escarpas do Lago ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
  beforeRouteLeave (to, from, next) {
    if (this.$store.state.showFoobar === false) {
      this.$store.commit('m_showFoobar', true)
      next()
    } else {
      next(false)
    }
  }
}
</script>

<style scope>
@import url('../../../assets/css/main.css');

.anunciar-estadia {
  margin-top: 3.3rem;
  display: flex;
  flex-flow: column;
  background: linear-gradient(40deg, #93EDC7, #1CD8D2);
  color: white;
  transition: var(--main-transition);
  height: calc(100vh - 3.3rem);
  & .__title {
    font-size: 29px;
    font-weight: 600;
    padding: 3rem 7% 0 7%;
  }
}
</style>
