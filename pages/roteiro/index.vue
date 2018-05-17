<template>
  <div class="roteiro">

    <div class="roteiro-header">
      
      <img class="__img-header" src="../../assets/img/roteiro.svg">
      <h1 class="__title-header">Roteiro</h1>

    </div>

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
      if (vm.$store.state.showFoobar === true) {
        vm.$store.commit('m_showFoobar', false)
      }
    })
  }
}
</script>

<style>
@import url('../../assets/css/main.css');

.roteiro {
  margin-top: 3.4rem;
  display: flex;
  flex-flow: column;
  background: linear-gradient(40deg, #93EDC7, #00CFC7);
  color: white;
  height: calc(100vh - 3.4rem);
  transition: var(--main-transition);
  & .roteiro-header {
    display: flex;
    flex-flow: column;
    align-items: center;
    & .__img-header {
      margin: 2rem 0;
      width: 6rem;
      height: auto;
    }
    & .__title-header {
      font-size: 26px;
      font-weight: 500;
      padding: 0 7%;
    }
  }
}
</style>
