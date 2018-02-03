<template>
  <div>
    <h1 class="valor-diaria">R${{ valorDiaria }}</h1>
    <h1 class="valor-diaria-dividido">R${{ valorDiariaDividido }}/pessoa</h1>
  </div>
</template>

<script>
export default {
  props: ['attribute'],
  computed: {
    acomod () {
      return this.$store.state.acomod
    },
    valorDiaria () {
      return this.acomod.valorDiariaNormal * (this.attribute.targetDate.daySpan + 1)
    },
    valorDiariaDividido () {
      return Math.trunc(this.valorDiaria / this.$store.state.reservaAcomod.totalHospedes)
    }
  }
}
</script>

<style>

.valor-diaria {
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}
.valor-diaria-dividido {
  font-size: 15px;
  font-weight: 300;
  text-align: center;
}


</style>