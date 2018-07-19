<template>
  <modal
    name="detalhes-valor-modal"
    class="detalhes-valor"
    width="25%"
    height="auto">


    <img src="../../assets/img/close-modal.svg" style="cursor:pointer;position:absolute;top:1rem;right:1rem;width:1rem;height:auto" @click="$modal.hide('detalhes-valor-modal')">



    <v-dialog style="z-index:10000"/>



    <div class="detalhes-valor-body">

      <h1 class="__title">Detalhes do valor</h1>


      <div class="item">
        <h3>R${{ acomod.valorNoite.toLocaleString() }} x {{ reservaAcomod.noites }} {{ reservaAcomod.noites == 1 ? 'noite' : 'noites'}}</h3>
        <h3 id="valor">R${{ reservaAcomod.valorNoitesTotal.toLocaleString() }}</h3>
      </div>

      <div class="item" v-if="acomod.limpezaFee !== 0">
        <div style="display:flex;flex:row;align-items:center">
          <h3>Taxa de limpeza</h3>
          <img src="../../assets/img/info.svg" style="width:.95rem;height:auto;margin-left:.3rem;cursor:pointer" @click="limpezaFeeDialog">
        </div>
        <h3>R${{ acomod.limpezaFee.toLocaleString() }}</h3>
      </div>

      <div class="item" style="padding-bottom: .8rem">
        <div style="display:flex;flex:row;align-items:center">
          <h3>Taxa de serviço</h3>
          <img src="../../assets/img/info.svg" style="width:.95rem;height:auto;margin-left:.3rem;cursor:pointer" @click="serviceFeeDialog">
        </div>
        <h3>R${{ reservaAcomod.serviceFeeTotal.toLocaleString() }}</h3>
      </div>

      <div class="item" style="padding-top: .8rem; border-top: 1px solid rgb(222,222,222)">
        <h3>Total</h3>
        <h3 style="font-weight:600">R${{ reservaAcomod.valorReservaTotal.toLocaleString() }}</h3>
      </div>

    </div>
    
    
  </modal>
</template>

<script>
export default {
  methods: {
    limpezaFeeDialog () {
      this.$modal.show('dialog', {
        title: 'Taxa de Limpeza',
        text: `Taxa cobrada pelo proprietário para arcar com os custos de limpeza ${this.tipoAcomod}.`,
        buttons: [{ title: 'OK' }]
      })
    },
    serviceFeeDialog () {
      this.$modal.show('dialog', {
        title: 'Taxa de Serviço',
        text: `Taxa de ${Math.round(this.$store.state.serviceFeeAcomod * 100)}% cobrada com o intuito de garantir suporte e total segurança em sua estadia caso algum problema aconteça.`,
        buttons: [{ title: 'OK' }]
      })
    }
  },
  computed: {
    acomod () { return this.$store.state.acomod },
    reservaAcomod () { return this.$store.state.reservaAcomod },
    tipoAcomod () {
      const path = this.acomod.tipoAcomod
      return path === 'Casa' ? 'da casa' 
           : path === 'Apartamento' ? 'do apartamento'
           : path === 'Rancho' ? 'do rancho'
           : path === 'Chácara' ? 'da chácara'
           : path === 'Pousada' ? 'da pousada'
           : path === 'Camping' ? 'do camping'
           : path === 'Sítio' ? 'do sítio'
           : path === 'Fazenda' ? 'da fazenda'
           : path === 'Hostel' ? 'do hostel'
           : ''
    }
  }
}
</script>

<style scoped>
@import url('~/assets/css/main.css');

.detalhes-valor {
  & .detalhes-valor-body {
    margin: 2rem 1.7rem 1.2rem;
    & .__title {
      padding: .5rem 0 1.5rem 0;
      font-size: 18px;
      font-weight: 600;
    }
    & .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: .5rem
    }
  }
}

</style>