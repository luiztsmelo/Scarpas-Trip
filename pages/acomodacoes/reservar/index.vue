<template>
  <div class="reservar">
    <h1>Reservar</h1>
    <div class="flex1"></div>
    <div class="flex2"></div>
  </div>
</template>

<script>
export default {
  /* NÃO FUNCIONA! MUDAR O SISTEMA DE RESERVA */
  beforeRouteLeave (to, from, next) {
    this.$store.commit('m_isReservar', false)
    this.$store.dispatch('a_resetReservaAcomod')
    next()
  }
}
</script>

<style scoped>
@import url('../../../assets/css/main.css');

.reservar {
  padding: 6rem 7% 0;
}

</style>