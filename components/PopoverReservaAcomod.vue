<template>
  <div>
    <h1 class="valor-diaria">R${{ valorDiaria }}</h1>
  </div>
</template>

<script>
export default {
  props: ['attribute'],
  computed: {
    acomod () {
      return this.$store.state.openAcomod
    },
    valorDiaria () {
      return this.acomod.valorDiariaNormal * (this.attribute.targetDate.daySpan + 1)
    }
  }
}
</script>

<style>

.valor-diaria {
  font-size: 14px;
  font-weight: 500;
}
</style>