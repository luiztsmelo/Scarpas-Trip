<template>
  <modal
    name="ask-acomod-modal"
    class="ask-acomod-modal"
    :width="modalWidth"
    :height="modalHeight">

    <img src="../../assets/img/close-modal.svg" class="close-btn" @click="$modal.hide('ask-acomod-modal')">

    <div class="sign-up" v-if="$store.state.user.username === null">
      <img class="__img" src="../../static/brand.svg">
      <h1 class="__title">Ainda não possui uma conta? Crie uma agora:</h1>
    </div>


    <div class="ask-acomod-body" v-else>

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
          <textarea rows="6" maxlength="2000"></textarea>
        </div>

        <div class="btns">
          <button type="button" class="__book-btn">Reservar</button>
          <button type="button" class="__send-btn">Enviar Mensagem</button>
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
    },
    modalWidth () {
      return this.$store.state.user.username === null ? '38%' : '76%'
    },
    modalHeight () {
      return this.$store.state.user.username === null ? '88%' : '88%'
    }
  },
}
</script>

<style scoped>
@import url('../../assets/css/main.css');

.ask-acomod-modal {
  z-index: 10000;

  & .close-btn {
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 1rem;
    height: auto;
  }

  & .sign-up {
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 3rem;
    & .__img {
      width: 5.4rem;
      height: auto;
    }
    & .__title {
      font-size: 34px;
      text-align: center;
      padding: 1.6rem 0;
    }
  }

  & .ask-acomod-body {
    display: flex;
    height: 100%;
    
    /* LEFT CONTAINER */
    & .left-container {
      flex-basis: 44%;
      min-width: 44%;
      padding: 2.5rem 3rem 2.5rem 3rem;
      & .__title {
        font-size: 40px;
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
          padding-bottom: .6rem;
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
          resize: none;
        }
      }
      & .btns {
        display: flex;
        justify-content: flex-end;
        height: 2.8rem;
        & .__book-btn {
          padding: 0 .9rem;
          margin-right: 1rem;
          font-size: 16px;
          font-weight: 600;
          background: transparent;
          color: #00D8C7;
          border: 1px solid #00D8C7;
          border-radius: 5px;
          line-height: 2.7rem;
        }
        & .__send-btn {
          padding: 0 .9rem;
          font-size: 16px;
          font-weight: 600;
          background: #00D8C7;
          color: white;
          border-radius: 5px;
          line-height: 2.7rem;
        }
      }
    }/* RIGHT CONTAINER */

  }
}

</style>