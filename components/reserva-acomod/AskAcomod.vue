<template>
  <modal
    v-if="acomod !== null"
    name="ask-acomod-modal"
    class="ask-acomod-modal"
    width="72%"
    height="auto"
    :scrollable="true"
    @closed="closedModal">


    <img src="../../assets/img/close-modal.svg" style="cursor:pointer;position:absolute;top:1rem;right:1rem;width:1rem;height:auto" @click="$modal.hide('ask-acomod-modal')">


    <div class="ask-acomod-body" v-if="!messageSent">


      <!-- LEFT CONTAINER -->
      <div class="left-container">

        <h1 class="__title">Enviar uma mensagem para {{ host.firstName }}</h1>

        <h3 class="__subtitle">Para sua segurança, recomendamos que não faça reservas diretamente com o anunciante, fora desse site. Você poderá se prejudicar caso algum problema aconteça. Portanto, nunca divulgue suas informações de contato. Somente após seu pedido de reserva tais informações serão fornecidas.</h3>

      </div><!-- LEFT CONTAINER -->



      <!-- RIGHT CONTAINER -->
      <form class="right-container">

        <div class="item-form">
          <label>Quando pretende viajar, {{ user.firstName }}?</label>
        </div>

        <div class="item-form">
          <label>Quantos hóspedes?</label>
          <select v-model="$store.state.reservaAcomod.totalHospedes">
            <option :value="n" v-for="n in totalHospedesArray">{{ n }} {{ n === 1 ? 'hóspede' : 'hóspedes' }}</option>
          </select>
        </div>

        <div class="item-form">
          <label>Sua mensagem:</label>
          <textarea rows="5" maxlength="2000" v-model="$store.state.message.text"></textarea>
        </div>

        <div class="btns">
          <button type="button" class="__book-btn" v-if="$route.name === 'acomodacoes-id'">Reservar</button>
          <button type="button" class="__send-btn" @click="sendMessage()">Enviar Mensagem</button>
        </div>

      </form><!-- RIGHT CONTAINER -->


    </div>


    <div class="after-sent" v-else>
      <img class="__img" src="../../assets/img/brand.svg">
      <h1 class="__title">Mensagem enviada</h1>
      <h3 class="__subtitle">Pediremos a {{ host.firstName }} que te responda em no máximo 24h. A resposta será enviada para seu e-mail.</h3>
      <button type="button" class="__close-btn" @click="$modal.hide('ask-acomod-modal')">Fechar</button>
    </div>

    
  </modal>
</template>

<script>
import firebase from '@firebase/app'
import 'firebase/firestore'

export default {
  data() {
    return {
      messageSent: false
    }
  },
  methods: {
    closedModal () {
      this.$store.state.clickedAskAcomod = false
      this.messageSent = false
    },
    sendMessage () {
      if (this.reservaAcomod.periodoReserva !== null && this.$store.state.message.text !== '') {
        this.$store.commit('m_loader', true)

        const message = this.$store.state.message
        const routeName = this.$route.name

        message.timestamp = new Date().getTime()
        message.from = this.user.userID
        message.to = routeName === 'acomodacoes-id' || 'acomodacoes-reservar' ? this.acomod.userID : ''
        message.about = routeName === 'acomodacoes-id' || 'acomodacoes-reservar' ? 'acomod' : ''
        message.id = routeName === 'acomodacoes-id' || 'acomodacoes-reservar' ? this.acomod.acomodID : ''
        message.checkIn = this.reservaAcomod.periodoReserva.start
        message.checkOut = this.reservaAcomod.periodoReserva.end
        message.totalHospedes = this.reservaAcomod.totalHospedes

        /* Add Message Firestore */
        firebase.firestore().collection('messages').add(message)
        .then(() => {
          this.messageSent = true
          this.$store.commit('m_resetMessage')
          this.$store.commit('m_loader', false)
        })
        .catch(err => {
          console.log(err)
          this.$store.commit('m_loader', false)
        })

      } else {
        alert('Erro')
      }
    }
  },
  computed: {
    acomod () { return this.$store.state.acomod },
    host () { return this.$store.state.host },
    user () { return this.$store.state.user },
    reservaAcomod () { return this.$store.state.reservaAcomod },
    totalHospedesArray () {
      return Array.from({length: this.acomod.totalHospedes}, (v, k) => k+1)
    }
  }
}
</script>

<style scoped>

.ask-acomod-modal {
  z-index: 10000;

  & .ask-acomod-body {
    display: flex;
    height: 100%;
    
    /* LEFT CONTAINER */
    & .left-container {
      min-width: 45%;
      flex-basis: 45%;
      padding: 3rem;
      & .__title {
        font-size: 36px;
        padding-bottom: 1.5rem;
      } 
      & .__subtitle {
        padding: .5rem 0;
        line-height: 26px;
      } 
    }/* LEFT CONTAINER */


    /* RIGHT CONTAINER */
    & .right-container {
      flex-basis: 55%;
      max-width: 55%;
      padding: 3rem;
      & .item-form {
        display: flex;
        flex-flow: column;
        margin: 1rem 0 1.8rem 0;
        & label {
          padding-bottom: .6rem;
          user-select: none;
          font-weight: 600;
          font-size: 15px;
        }
        & select {
          position: relative;
          width: 100%;
          font-size: 16px;
          font-weight: 400;
          background: white;
          color: var(--color01);
          padding: .75rem .6rem;
          border: 1px solid #dedede;
          outline: none;
        }
        & select:focus {
          border: 1px solid var(--color01) !important;
        }
        & textarea {
          width: 100%;
          min-width: 100%;
          max-width: 100%;
          font-size: 16px;
          font-weight: 400;
          line-height: 26px;
          background: white;
          padding: .8rem;
          border: 1px solid #dedede;
          outline: none;
        }
        & textarea:focus {
          border: 1px solid var(--color01) !important;
        }
      }
      & .btns {
        display: flex;
        justify-content: flex-end;
        height: 2.9rem;
        & .__book-btn {
          padding: 0 1.4rem;
          margin-right: 1rem;
          font-size: 16px;
          font-weight: 600;
          background: transparent;
          color: var(--colorAcomod);
          border-radius: 5px;
          line-height: 2.8rem;
        }
        & .__send-btn {
          padding: 0 1.4rem;
          font-size: 16px;
          font-weight: 600;
          background: var(--colorAcomod);
          color: white;
          border-radius: 5px;
          line-height: 2.8rem;
        }
      }
    }/* RIGHT CONTAINER */

  }

  & .after-sent {
    display: flex;
    height: 100%;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 3rem 23%;
    & .__img {
      width: 54px;
      height: auto;
    }
    & .__title {
      text-align: center;
      padding: .7rem 0 .5rem 0;
    }
    & .__subtitle {
      text-align: center;
      line-height: 23px;
    }
    & .__close-btn {
      margin-top: 3rem;
      width: 10rem;
      font-size: 16px;
      font-weight: 600;
      background: var(--colorAcomod);
      color: white;
      border-radius: 5px;
      line-height: 2.8rem;
    }
  }
}

</style>