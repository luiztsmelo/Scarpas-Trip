<template>
  <modal
    name="modal-reserva-desktop"
    class="modal-reserva-desktop"
    width="50%"
    height="70%"
    >
    
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

<style>
@import url('../assets/css/main.css');

.modal-reserva-desktop {
  z-index: 10000;
}

</style>