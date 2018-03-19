<template>
  <div>
    <h1 class="valor-diaria">R${{ valorDiaria.toLocaleString() }}</h1>
    <h1 class="valor-diaria-dividido">R${{ valorDiariaDividido.toLocaleString() }}/hóspede</h1>
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
      this.$store.state.reservaAcomod.noites = this.attribute.targetDate.daySpan
      return this.acomod.valorDiariaNormal * (this.attribute.targetDate.daySpan)
    },
    valorDiariaDividido () {
      return Math.trunc(this.valorDiaria / this.$store.state.reservaAcomod.totalHospedes)
    }
  }
}
</script>

<style scoped>

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

@media (min-width: 1024px) {
  .valor-diaria {
    font-size: 16px;
    font-weight: 500;
  }
  .valor-diaria-dividido {
    font-size: 14px;
    font-weight: 400;
  }
}

</style>