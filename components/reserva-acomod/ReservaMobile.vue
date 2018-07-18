<template>
  <transition name="reserva-animation">
    <div class="reserva-acomod" v-show="showReservaAcomod">



      <!-- BACK BUTTON -->
      <div class="back-bar">
        <div class="back-box" @click="backBtn">
          <img class="__back-btn" src="../../assets/img/back.svg">
        </div>
      </div><!-- BACK BUTTON -->



      <div class="reserva-acomod-body">
        


        <!-- ########## DETALHES PG.1 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod1">

          <h3 class="etapas">1 de 4 etapas</h3>

          <h1 class="__title">Detalhes da reserva</h1>


          <div class="item-detalhes">
            <h3 class="__item-text">Datas</h3>
            <h3 class="__item-btn">Selecionar datas</h3>
          </div>


          <div class="item-detalhes">
            <h3 class="__item-text">Hóspedes</h3>
            <h3 class="__item-btn">{{ $store.state.reservaAcomod.totalHospedes == '1' ? $store.state.reservaAcomod.totalHospedes + ' hóspede' : $store.state.reservaAcomod.totalHospedes + ' hóspedes' }}</h3>
          </div>



          <!-- <v-date-picker
            is-inline
            is-required
            mode="range"
            v-model="$store.state.reservaAcomod.periodoReserva"
            :min-date="minDate"
            :disabled-dates="$store.state.disabledDatesAcomod"
            :drag-attribute="attribute"
            :select-attribute="attribute"
            :disabled-attribute="disabledAttribute"
            :theme-styles="datePickerMobileStyle"
            tint-color="#00D8C7"
            show-caps>
          </v-date-picker> -->


          <button type="button" class="__next-btn" :style="form1ok" @click="nextBtn1">Continuar</button>
      
        </div><!-- ########## DETALHES PG.1 ########## -->




        <!-- ########## REGRAS PG.2 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod2">

          <h3 class="etapas">2 de 4 etapas</h3>

          <h1 class="__title">Regras da casa</h1>


          <!-- <div class="__item">
            <select v-model="$store.state.reservaAcomod.totalHospedes">
              <option v-for="n in totalHospedesArray">{{ n }}</option>
            </select>
          </div> -->


          <button type="button" class="__next-btn" :style="form2ok" @click="nextBtn2">Continuar</button>

        </div><!-- ########## REGRAS PG.2 ########## -->
        



        <!-- ########## MENSAGEM PG.3 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod3">

          <h3 class="etapas">3 de 4 etapas</h3>

          <h1 class="__title">Mensagem</h1>



          <button type="button" class="__next-btn" :style="form3ok" @click="nextBtn3">Continuar</button>

        </div><!-- ########## MENSAGEM PG.3 ########## -->




        <!-- ########## PAGAMENTO PG.3 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod4">

          <h3 class="etapas">4 de 4 etapas</h3>

          <h1 class="__title">Pagar e confirmar</h1>

        


          <button type="button" class="__next-btn" :style="form4ok" @click="concluirReserva">Concluir Pedido</button>

        </div><!-- ########## PAGAMENTO PG.3 ########## -->




      </div>

    </div>
  </transition>
</template>

<script>
import MaskedInput from 'vue-text-mask'
import { stylesCalendar } from '~/mixins/stylesCalendar'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

export default {
  components: { MaskedInput },
  mixins: [ stylesCalendar ],
  data() {
    return {
      loadingBtns: {
        loader1: false,
        loader2: false,
        loader3: false,
        loader4: false,
      },
      attribute: {
        popover: {
          hideIndicator: true,
          visibility: 'none'
        }
      }
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
    },
    nextBtn1 () {
      if (this.$store.state.reservaAcomod.periodoReserva === null) {
        this.$store.commit('m_reservaAcomod1', false), this.$store.commit('m_reservaAcomod2', true), window.location.hash = "regras"
      }
    },
    nextBtn2 () {
      if (1<2) {
        this.$store.commit('m_reservaAcomod2', false), this.$store.commit('m_reservaAcomod3', true), window.location.hash = "mensagem"
      }
    },
    nextBtn3 () {
      if (1<2) {
        this.$store.commit('m_reservaAcomod3', false), this.$store.commit('m_reservaAcomod4', true), window.location.hash = "pagamento"
      }
    },
    concluirReserva () {
    }
  },
  computed: {
    acomod () {
      return this.$store.state.acomod
    },
    showReservaAcomod () {
      return this.$store.state.showReservaAcomod
    },
    hash () {
      return this.$route.hash
    },
    minDate () {
      return dayjs(new Date()).add(2, 'day').toDate()
    },
    totalHospedesArray () {
      return Array.from({length: this.acomod.totalHospedes}, (v, k) => k+1)
    },
    form1ok () {
      return this.$store.state.reservaAcomod.periodoReserva === null ? 'background:#FFA04F; cursor:pointer' : ''
    },
    form2ok () {
      return 1<2 ? 'background:#FFA04F; cursor:pointer' : ''
    },
    form3ok () {
      return 1<2 ? 'background:#FFA04F; cursor:pointer' : ''
    },
    form4ok () {
      return 1<2 ? 'background:#FFA04F; cursor:pointer' : ''
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
      } 
      if (value === '#detalhes') {
        this.$store.commit('m_reservaAcomod1', true)
        this.$store.commit('m_reservaAcomod2', false)
        this.$store.commit('m_reservaAcomod3', false)
        this.$store.commit('m_reservaAcomod4', false)
      } 
      if (value === '#regras') {
        this.$store.commit('m_reservaAcomod1', false)
        this.$store.commit('m_reservaAcomod2', true)
        this.$store.commit('m_reservaAcomod3', false)
        this.$store.commit('m_reservaAcomod4', false)
      } 
      if (value === '#mensagem') {
        this.$store.commit('m_reservaAcomod1', false)
        this.$store.commit('m_reservaAcomod2', false)
        this.$store.commit('m_reservaAcomod3', true)
        this.$store.commit('m_reservaAcomod4', false)
      } 
      if (value === '#pagamento') {
        this.$store.commit('m_reservaAcomod1', false)
        this.$store.commit('m_reservaAcomod2', false)
        this.$store.commit('m_reservaAcomod3', false)
        this.$store.commit('m_reservaAcomod4', true)
      } 
    }
  }
}
</script>

<style>
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
      & .item-detalhes {
        margin: 0 7%;
        padding: 1.3rem 0;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgb(222,222,222);
        & .__item-text {
          font-size: 18px;
        }
        & .__item-btn {
          font-size: 17px;
          font-weight: 500;
          color: #16528E;
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
        position: fixed;
        padding: 0 1.1rem;
        bottom: 1rem;
        right: 7%;
        font-size: 17px;
        font-weight: 600;
        background: rgb(222,222,222);
        color: white;
        line-height: 2.8rem;
        height: 2.9rem;
        border-radius: 5px;
        transition: all .3s ease;
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