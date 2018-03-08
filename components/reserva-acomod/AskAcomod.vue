<template>
  <modal
    name="ask-acomod-modal"
    class="ask-acomod-modal"
    width="70%"
    height="85%">

    <div class="ask-acomod-body">


      <div class="left-container">
        <h1 class="__title">Envie para {{ firstName }} uma mensagem</h1>
        <h3 class="__subtitle">Para sua segurança, não recomendamos que faça reservas diretamente com o proprietário, fora deste site.</h3>
        <h3 class="__subtitle">Isto poderá lhe causar graves dores de cabeça caso algum imprevisto aconteça.</h3>
        <h3 class="__subtitle">Portanto, nunca divulgue suas informações de contato. Somente após a reserva tais informações serão fornecidas.</h3>
      </div>


      <div class="right-container">

      </div>
      

    </div>
    
  </modal>
</template>

<script>
export default {
  computed: {
    acomod () {
      return this.$store.state.acomod
    },
    firstName () {
      let fullName = this.acomod.proprietario.split(' ')
      let firstName = fullName[0]
      return firstName
    }
  },
}
</script>

<style scoped>
@import url('../../assets/css/main.css');

.ask-acomod-modal {
  z-index: 10000;
  
  & .ask-acomod-body {
    display: flex;
    height: 100%;
    & .left-container {
      flex-basis: 50%;
      border-right: 1px solid rgb(232,232,232);
      padding: 3rem;
      & .__title {
        font-size: 38px;
        padding-bottom: 2rem;
      } 
      & .__subtitle {
        padding-bottom: 1rem;
      } 
    }
    & .right-container {
      flex-basis: 50%;
      padding: 3rem;
    }
  }
}

</style>