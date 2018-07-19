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



          <div class="periodo-reserva" @click="showDatePicker">

            <h3 class="__btn" style="text-align: left">{{ chegada }}</h3>

            <div class="__slash"></div>

            <h3 class="__btn" style="text-align: right">{{ partida }}</h3>

          </div>


          <date-picker></date-picker>


          <div class="valores-reserva" v-if="$store.state.reservaAcomod.periodoReserva !== null">

            <div class="item">
              <h3>R${{ acomod.valorNoite.toLocaleString() }} x {{ reservaAcomod.noites }} noites</h3>
              <h3>R${{ reservaAcomod.valorNoitesTotal.toLocaleString() }}</h3>
            </div>

            <div class="item" v-if="acomod.limpezaFee !== 0">
              <div style="display:flex;flex:row;align-items:center">
                <h3>Taxa de limpeza</h3>
                <img src="../../assets/img/info.svg" style="width:.95rem;height:auto;margin-left:.3rem;cursor:pointer" @click="limpezaFeeDialog">
              </div>
              <h3>R${{ acomod.limpezaFee.toLocaleString() }}</h3>
            </div>

            <div class="item" style="padding-bottom: 1rem">
              <div style="display:flex;flex:row;align-items:center">
                <h3>Taxa de serviço</h3>
                <img src="../../assets/img/info.svg" style="width:.95rem;height:auto;margin-left:.3rem;cursor:pointer" @click="serviceFeeDialog">
              </div>
              <h3>R${{ reservaAcomod.serviceFeeTotal.toLocaleString() }}</h3>
            </div>

            <div class="item" style="padding-top: 1rem; border-top: 1px solid rgb(232,232,232)">
              <h3>Total</h3>
              <h3 style="font-size: 18px; font-weight: 600">R${{ reservaAcomod.valorReservaTotal.toLocaleString() }}</h3>
            </div>

          </div>
          



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
    },
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
      if (this.$store.state.reservaAcomod.periodoReserva !== null) {
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
    showDatePicker () {
      this.$store.commit('m_loader', true) 
      this.$modal.show('datepicker') 
      window.location.hash = `${this.$store.state.reservaAcomodHash1}-datas`
    },
    concluirReserva () {
    }
  },
  computed: {
    acomod () {
      return this.$store.state.acomod
    },
    reservaAcomod () {
      return this.$store.state.reservaAcomod
    },
    hash () {
      return this.$route.hash
    },
    totalHospedesArray () {
      return Array.from({length: this.acomod.totalHospedes}, (v, k) => k+1)
    },
    chegada () {
      if (this.$store.state.reservaAcomod.periodoReserva === null) {
        return 'Chegada'
      } else {
        const checkIn = new Date(this.$store.state.reservaAcomod.periodoReserva.start)
        return dayjs(checkIn).format('ddd, DD MMM')
      }
    },
    partida () {
      if (this.$store.state.reservaAcomod.periodoReserva === null) {
        return 'Partida'
      } else {
        const checkOut = new Date(this.$store.state.reservaAcomod.periodoReserva.end)
        return dayjs(checkOut).format('ddd, DD MMM')
      }
    },
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
        this.$modal.hide('datepicker') 
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
          font-size: 19px;
          font-weight: 500;
          color: #374785;
          user-select: none;
        }
      }
      & .valores-reserva {
        padding: 1rem 7% 0;
        & .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: .5rem 0;
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
        background:#374785;
        color: white;
        line-height: 2.8rem;
        height: 2.9rem;
        border-radius: 5px;
      }
    }
  }
}

h3 {
  font-size: 17px;
}

/* TRANSITIONS */
.reserva-animation-enter {
  transform: translateX(100%);
}
.reserva-animation-leave-active {
  transform: translateX(100%);
}
</style>