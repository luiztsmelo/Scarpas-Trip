<template>
  <modal
    name="reserva-desktop"
    class="reserva-desktop"
    width="50%"
    height="70%"
    >
    Reserva
  </modal>
</template>

<script>
export default {
  computed: {
    acomod () {
      return this.$store.state.acomod
    }
  },
}
</script>

<style scoped>
@import url('../../assets/css/main.css');

.v--modal {
  border-radius: 5px;
}

.reserva-desktop {
  z-index: 10000;
  
}


</style>