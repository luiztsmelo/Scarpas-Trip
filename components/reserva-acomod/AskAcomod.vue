<template>
  <modal
    name="ask-acomod"
    class="ask-acomod"
    width="50%"
    height="70%"
    >
    Pergunta
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

.ask-acomod {
  z-index: 10000;
  
}


</style>