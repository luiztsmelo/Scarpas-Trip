<template>
  <transition name="reserva-animation">
    <div class="reserva-acomod" v-show="$store.state.showReservaAcomod">



      <!-- BACK BUTTON -->
      <div class="back-bar">
        <div class="back-box" @click="backBtn">
          <img class="__back-btn" src="../../assets/img/back.svg">
        </div>
      </div><!-- BACK BUTTON -->



      <div class="reserva-acomod-body">
        


        <!-- ########## DETALHES PG.1 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod1">

          <h3 class="etapas">1 de 5 etapas</h3>

          <h1 class="__title">Orçamento</h1>


          <div class="periodo-reserva" @click="$modal.show('datepicker')">
            <h3 class="__btn">Chegada</h3>
            <div class="__slash"></div>
            <h3 class="__btn">Partida</h3>
          </div>

          <date-picker></date-picker>


          <!-- <div class="item-detalhes" style="border-top: 1px solid rgb(222,222,222)">
            <h3 class="__item-text">Total</h3>
            <h3 class="__item-valor">R$1.250</h3>
          </div> -->



          <button type="button" class="__next-btn" @click="nextBtn1">Continuar</button>
      
        </div><!-- ########## DETALHES PG.1 ########## -->




        <!-- ########## REGRAS PG.2 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod2">

          <h3 class="etapas">2 de 5 etapas</h3>

          <h1 class="__title">Antes de continuar, precisamos que se cadastre</h1>



          <button type="button" class="__next-btn" @click="nextBtn2">Continuar</button>

        </div><!-- ########## REGRAS PG.2 ########## -->




        <!-- ########## REGRAS PG.3 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod3">

          <h3 class="etapas">3 de 5 etapas</h3>

          <h1 class="__title">Revise os detalhes da reserva</h1>


          <!-- <div class="__item">
            <select v-model="$store.state.reservaAcomod.totalHospedes">
              <option v-for="n in totalHospedesArray">{{ n }}</option>
            </select>
          </div> -->


          <button type="button" class="__next-btn" @click="nextBtn3">Continuar</button>

        </div><!-- ########## REGRAS PG.3 ########## -->
        



        <!-- ########## MENSAGEM PG.3 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod4">

          <h3 class="etapas">4 de 5 etapas</h3>

          <h1 class="__title">Mensagem</h1>



          <button type="button" class="__next-btn" @click="nextBtn4">Continuar</button>

        </div><!-- ########## MENSAGEM PG.3 ########## -->




        <!-- ########## PAGAMENTO PG.3 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod5">

          <h3 class="etapas">5 de 5 etapas</h3>

          <h1 class="__title">Pagar e confirmar</h1>

        


          <button type="button" class="__next-btn" style="background:#FFA04F" @click="concluirReserva">Concluir Pedido</button>

        </div><!-- ########## PAGAMENTO PG.3 ########## -->




      </div>

    </div>
  </transition>
</template>

<script>
import MaskedInput from 'vue-text-mask'
import DatePicker from '@/components/DatePicker'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

export default {
  components: { MaskedInput, DatePicker },
  data() {
    return {
    }
  },
  methods: {
    backBtn () {
      if (this.$store.state.reservaAcomod1 === true) {
        window.history.back(1)
        this.$store.commit('m_showReservaAcomod', false)
      }
      if (this.$store.state.reservaAcomod2 === true) {
        window.history.back(1)
        this.$store.commit('m_reservaAcomod2', false)
        this.$store.commit('m_reservaAcomod1', true)
      }
      if (this.$store.state.reservaAcomod3 === true) {
        window.history.back(1)
        this.$store.commit('m_reservaAcomod3', false)
        this.$store.commit('m_reservaAcomod2', true)
      }
      if (this.$store.state.reservaAcomod4 === true) {
        window.history.back(1)
        this.$store.commit('m_reservaAcomod4', false)
        this.$store.commit('m_reservaAcomod3', true)
      }
      if (this.$store.state.reservaAcomod5 === true) {
        window.history.back(1)
        this.$store.commit('m_reservaAcomod5', false)
        this.$store.commit('m_reservaAcomod4', true)
      }
    },
    nextBtn1 () {
      if (this.$store.state.reservaAcomod.periodoReserva === null) {
        this.$store.commit('m_reservaAcomod1', false), this.$store.commit('m_reservaAcomod2', true), window.location.hash = this.$store.state.reservaAcomodHash2
      }
    },
    nextBtn2 () {
      if (1<2) {
        this.$store.commit('m_reservaAcomod2', false), this.$store.commit('m_reservaAcomod3', true), window.location.hash = this.$store.state.reservaAcomodHash3
      }
    },
    nextBtn3 () {
      if (1<2) {
        this.$store.commit('m_reservaAcomod3', false), this.$store.commit('m_reservaAcomod4', true), window.location.hash = this.$store.state.reservaAcomodHash4
      }
    },
    nextBtn4 () {
      if (1<2) {
        this.$store.commit('m_reservaAcomod4', false), this.$store.commit('m_reservaAcomod5', true), window.location.hash = this.$store.state.reservaAcomodHash5
      }
    },
    concluirReserva () {
    }
  },
  computed: {
    acomod () {
      return this.$store.state.acomod
    },
    hash () {
      return this.$route.hash
    },
    totalHospedesArray () {
      return Array.from({length: this.acomod.totalHospedes}, (v, k) => k+1)
    }
  },
  watch: {
    hash (value) {
      if (value === '') {
        this.$store.commit('m_showReservaAcomod', false)
        this.$store.commit('m_reservaAcomod1', false)
        this.$store.commit('m_reservaAcomod2', false)
        this.$store.commit('m_reservaAcomod3', false)
        this.$store.commit('m_reservaAcomod4', false)
        this.$store.commit('m_reservaAcomod5', false)
      }
      if (value === `#${this.$store.state.reservaAcomodHash1}`) {
        this.$store.commit('m_reservaAcomod1', true)
        this.$store.commit('m_reservaAcomod2', false)
        this.$store.commit('m_reservaAcomod3', false)
        this.$store.commit('m_reservaAcomod4', false)
        this.$store.commit('m_reservaAcomod5', false)
      }
      if (value === `#${this.$store.state.reservaAcomodHash2}`) {
        this.$store.commit('m_reservaAcomod1', false)
        this.$store.commit('m_reservaAcomod2', true)
        this.$store.commit('m_reservaAcomod3', false)
        this.$store.commit('m_reservaAcomod4', false)
        this.$store.commit('m_reservaAcomod5', false)
      }
      if (value === `#${this.$store.state.reservaAcomodHash3}`) {
        this.$store.commit('m_reservaAcomod1', false)
        this.$store.commit('m_reservaAcomod2', false)
        this.$store.commit('m_reservaAcomod3', true)
        this.$store.commit('m_reservaAcomod4', false)
        this.$store.commit('m_reservaAcomod5', false)
      }
      if (value === `#${this.$store.state.reservaAcomodHash4}`) {
        this.$store.commit('m_reservaAcomod1', false)
        this.$store.commit('m_reservaAcomod2', false)
        this.$store.commit('m_reservaAcomod3', false)
        this.$store.commit('m_reservaAcomod4', true)
        this.$store.commit('m_reservaAcomod5', false)
      }
      if (value === `#${this.$store.state.reservaAcomodHash5}`) {
        this.$store.commit('m_reservaAcomod1', false)
        this.$store.commit('m_reservaAcomod2', false)
        this.$store.commit('m_reservaAcomod3', false)
        this.$store.commit('m_reservaAcomod4', false)
        this.$store.commit('m_reservaAcomod5', true)
      }
    }
  }
}
</script>

<style scoped>
@import url('~/assets/css/main.css');

.reserva-acomod {
  position: fixed;
  z-index: 9998;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
  transition: var(--main-transition);
  & .back-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3rem;
    background: white;
    & .back-box {
      display: inline-flex;
      align-items: center;
      height: 100%;
      padding: 0 7%;
      & .__back-btn {
        cursor: pointer;
        width: 1.07rem;
        height: auto;
        filter: invert(75%);
      }
    }
  }
  & .reserva-acomod-body {
    display: flex;
    flex-flow: column;
    margin-top: .5rem;
    height: 100%;
    & .etapa-reserva-box {
      & .etapas {
        padding: 2.8rem 7% 0.2rem 7%;
        font-size: 14px;
        font-weight: 500;
        color: rgb(72, 72, 72);
      }
      & .__title {
        padding: 0 7% 1.9rem 7%;
        line-height: 35px;
        font-size: 29px;
        font-weight: 700;
      }
      & .periodo-reserva {
        margin: 0 7%;
        padding: 1.5rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgb(222,222,222);
        & .__slash {
          background: rgb(222,222,222);
          width: 50px;
          height: 1px;
          transform: rotate(135deg);
        }
        & .__btn {
          font-size: 18px;
          font-weight: 500;
          color: #3A6378;
          user-select: none;
        }
      }
      & .item-form {
        padding: 0 7%;
        display: flex;
        flex-flow: column;
        margin: 1.7rem 0;
        & label {
          font-weight: 700;
          font-size: 15px;
        }
        & input {
          width: 100%;
          font-size: var(--fontSizeAnuncioText);
          font-weight: 400;
          background: white;
          color: var(--color01);
          padding: .6rem 0 .4rem 0;
          border: none;
          border-bottom: 1px solid rgb(222,222,222);
          outline: none;
        }
      }
      & .__next-btn {
        z-index: 99999;
        cursor: pointer;
        position: fixed;
        padding: 0 1.2rem;
        bottom: .8rem;
        right: 7%;
        font-size: 16px;
        font-weight: 600;
        background:#3A6378;
        color: white;
        line-height: 2.8rem;
        height: 2.9rem;
        border-radius: 5px;
      }
    }
  }
}


/* TRANSITIONS */
.reserva-animation-enter {
  transform: translateX(100%);
}
.reserva-animation-leave-active {
  transform: translateX(100%);
}
</style>