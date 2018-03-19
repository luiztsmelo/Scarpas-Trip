<template>
  <modal
    name="ask-acomod-modal"
    class="ask-acomod-modal"
    width="75%"
    height="auto"
    :scrollable="true"
    @closed="closedModal">

    <img src="../../assets/img/close-modal.svg" style="cursor:pointer;position:absolute;top:1rem;right:1rem;width:1rem;height:auto" @click="$modal.hide('ask-acomod-modal')">

    <div class="ask-acomod-body">

      <!-- LEFT CONTAINER -->
      <div class="left-container">

        <h1 class="__title">Mandar uma mensagem para {{ firstName }}</h1>

        <h3 class="__subtitle">Para sua segurança, recomendamos que não faça reservas diretamente com o proprietário, fora deste site.</h3>
        <h3 class="__subtitle">Isto poderá lhe causar desagradáveis dores de cabeça caso algum imprevisto aconteça.</h3>
        <h3 class="__subtitle">Portanto, nunca divulgue suas informações de contato. Somente após a reserva tais informações serão fornecidas, para ambos.</h3>

      </div><!-- LEFT CONTAINER -->


      <!-- RIGHT CONTAINER -->
      <form class="right-container">

        <div class="item-form">
          <label>Quando será sua viagem, {{ firstName }}?</label>
        </div>

        <div class="item-form">
          <label>Quantos hóspedes?</label>
          <select v-model="$store.state.message.totalHospedes">
            <option :value="n" v-for="n in totalHospedesArray">{{ n }} {{ n===1 ? 'hóspede' : 'hóspedes' }}</option>
          </select>
        </div>

        <div class="item-form">
          <label>Sua mensagem:</label>
          <textarea rows="6" maxlength="2000" v-model="$store.state.message.text"></textarea>
        </div>

        <div class="btns">
          <button type="button" class="__book-btn">Reservar</button>
          <button type="button" class="__send-btn" @click="sendMessage()">Enviar Mensagem</button>
        </div>

      </form><!-- RIGHT CONTAINER -->
      

    </div>
    
  </modal>
</template>

<script>
export default {
  methods: {
    closedModal () {
      this.$store.state.clickedAskAcomod = false
    },
    sendMessage () {
      let routeName = this.$route.name
      this.$store.dispatch('a_sendMessage', routeName)
    }
  },
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
  }
}
</script>

<style scoped>
@import url('../../assets/css/main.css');

.ask-acomod-modal {
  z-index: 10000;

  & .ask-acomod-body {
    display: flex;
    height: 100%;
    
    /* LEFT CONTAINER */
    & .left-container {
      min-width: 44%;
      flex-basis: 44%;
      padding: 2.5rem 3rem 2.5rem 3rem;
      & .__title {
        font-size: 41px;
        padding-bottom: 1.5rem;
      } 
      & .__subtitle {
        padding: .5rem 0;
        line-height: 26px;
      } 
    }/* LEFT CONTAINER */


    /* RIGHT CONTAINER */
    & .right-container {
      flex-basis: 56%;
      max-width: 56%;
      padding: 3rem;
      & .item-form {
        display: flex;
        flex-flow: column;
        margin: 1rem 0 1.8rem 0;
        & label {
          padding-bottom: .7rem;
          font-weight: 700;
          font-size: 15px;
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
          min-width: 100%;
          max-width: 100%;
          font-size: 17px;
          font-weight: 400;
          line-height: 26px;
          background: white;
          color: rgb(82, 82, 82);
          padding: 1rem;
          border: 1px solid rgb(232,232,232);
          outline: none;
        }
      }
      & .btns {
        display: flex;
        justify-content: flex-end;
        height: 2.9rem;
        & .__book-btn {
          padding: 0 1.2rem;
          margin-right: 1rem;
          font-size: 16px;
          font-weight: 600;
          background: transparent;
          color: #00D8C7;
          border: 1px solid #00D8C7;
          border-radius: 5px;
          line-height: 2.8rem;
        }
        & .__send-btn {
          padding: 0 1.2rem;
          font-size: 16px;
          font-weight: 600;
          background: #00D8C7;
          color: white;
          border-radius: 5px;
          line-height: 2.8rem;
        }
      }
    }/* RIGHT CONTAINER */

  }
}

</style>