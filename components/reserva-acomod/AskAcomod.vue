<template>
  <modal
    name="ask-acomod-modal"
    class="ask-acomod-modal"
    width="76%"
    height="87%">

    <div class="ask-acomod-body">

      <img src="../../assets/img/close-modal.svg" class="close-btn" @click="$modal.hide('ask-acomod-modal')">

      <!-- LEFT CONTAINER -->
      <div class="left-container">

        <h1 class="__title">Mandar uma mensagem para {{ firstName }}</h1>

        <h3 class="__subtitle">Para sua segurança, não recomendamos que faça reservas diretamente com o proprietário, fora deste site.</h3>
        <h3 class="__subtitle">Isto poderá lhe causar desagradáveis dores de cabeça caso algum imprevisto aconteça.</h3>
        <h3 class="__subtitle">Portanto, nunca divulgue suas informações de contato. Somente após a reserva tais informações serão fornecidas, para ambos.</h3>

      </div><!-- LEFT CONTAINER -->


      <!-- RIGHT CONTAINER -->
      <form class="right-container">

        <div class="item-form">
          <label>Quando será sua viagem?</label>
        </div>

        <div class="item-form">
          <label>Quantos hóspedes?</label>
          <select v-model="$store.state.reservaAcomod.totalHospedes"><!-- REVER ISSO AQUI DEPOIS -->
            <option :value="n" v-for="n in totalHospedesArray">{{ n }} {{ n===1 ? 'hóspede' : 'hóspedes' }}</option>
          </select>
        </div>

        <div class="item-form">
          <label>Mensagem:</label>
          <textarea name="" id="" rows="6"></textarea>
        </div>

      </form><!-- RIGHT CONTAINER -->
      

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
    },
    totalHospedesArray () {
      return Array.from({length: this.acomod.totalHospedes}, (v, k) => k+1)
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
    & .close-btn {
      cursor: pointer;
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 1rem;
      height: auto;
    }


    /* LEFT CONTAINER */
    & .left-container {
      flex-basis: 44%;
      padding: 2.5rem 3rem 2.5rem 3rem;
      background: #00D8C7;
      & .__title {
        font-size: 40px;
        padding-bottom: 1.5rem;
        color: white;
      } 
      & .__subtitle {
        font-size: 17px;
        font-weight: 500;
        padding: .5rem 0;
        color: white;
        line-height: 26px;
      } 
    }/* LEFT CONTAINER */


    /* RIGHT CONTAINER */
    & .right-container {
      flex-basis: 56%;
      padding: 3rem;
      & .item-form {
        display: flex;
        flex-flow: column;
        margin: 1rem 0 2.2rem 0;
        & label {
          padding-bottom: .7rem;
          font-weight: 700;
          font-size: 16px;
        }
        & input {
          position: relative;
          width: 100%;
          font-size: 17px;
          font-weight: 400;
          background: white;
          color: var(--color01);
          padding: 1rem;
          border: 1px solid rgb(232,232,232);
          outline: none;
        }
        & textarea {
          width: 100%;
          font-size: 17px;
          font-weight: 400;
          line-height: 26px;
          background: white;
          color: var(--color01);
          border: 1px solid rgb(232,232,232);
          outline: none;
        }
      }
    }/* RIGHT CONTAINER */

  }
}

</style>