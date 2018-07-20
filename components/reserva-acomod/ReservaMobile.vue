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
        


        <!-- ########## COTAÇÃO PG.1 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod1">

          <h3 class="etapas">1 de 5 etapas</h3>

          <h1 class="__title">Orçamento</h1>



          <div class="periodo-reserva" @click="showDatePicker">

            <h3 class="__btn" style="text-align: left; flex:49%">{{ chegada }}</h3>

            <div class="__slash"></div>

            <h3 class="__btn" style="text-align: right; flex:49%">{{ partida }}</h3>

          </div>


          <date-picker></date-picker>


          <div class="valores-reserva" v-if="reservaAcomod.periodoReserva !== null">

            <div class="item">
              <h3>R${{ acomod.valorNoite.toLocaleString() }} x {{ reservaAcomod.noites }} {{ reservaAcomod.noites == 1 ? 'noite' : 'noites'}}</h3>
              <h3>R${{ reservaAcomod.valorNoitesTotal.toLocaleString() }}</h3>
            </div>

            <div class="item" v-if="acomod.limpezaFee !== 0">
              <div style="display:flex;flex:row;align-items:center">
                <h3>Taxa de limpeza</h3>
                <img src="../../assets/img/info.svg" style="width:1rem;height:auto;margin-left:.3rem;cursor:pointer" @click="limpezaFeeDialog">
              </div>
              <h3>R${{ acomod.limpezaFee.toLocaleString() }}</h3>
            </div>

            <div class="item">
              <div style="display:flex;flex:row;align-items:center">
                <h3>Taxa de serviço</h3>
                <img src="../../assets/img/info.svg" style="width:1rem;height:auto;margin-left:.3rem;cursor:pointer" @click="serviceFeeDialog">
              </div>
              <h3>R${{ reservaAcomod.serviceFeeTotal.toLocaleString() }}</h3>
            </div>

            <div class="item">
              <h3>Total</h3>
              <h3 style="font-size: 18px; font-weight: 600">R${{ reservaAcomod.valorReservaTotal.toLocaleString() }}</h3>
            </div>

          </div>
          



          <div class="buttons">
            <div class="buttons-body">
              <h3 class="__valor" v-if="reservaAcomod.periodoReserva !== null">R${{ reservaAcomod.valorReservaTotal.toLocaleString() }}
                <span class="__valor-noites"> por {{ reservaAcomod.noites }} {{ reservaAcomod.noites == 1 ? 'noite' : 'noites'}}</span>
              </h3>
              <h3 v-else></h3>
              <button type="button" class="__next-btn" :style="form1ok" @click="nextBtn1">Continuar</button>
            </div>
          </div>
      
        </div><!-- ########## COTAÇÃO PG.1 ########## -->





        <!-- ########## CADASTRO PG.2 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod2">

          <h3 class="etapas">2 de 5 etapas</h3>

          <h1 class="__title">Antes de continuar, precisamos que se cadastre</h1>



          <div class="buttons">
            <div class="buttons-body">
              <h3 class="__valor">R${{ reservaAcomod.valorReservaTotal.toLocaleString() }}
                <span class="__valor-noites"> por {{ reservaAcomod.noites }} {{ reservaAcomod.noites == 1 ? 'noite' : 'noites'}}</span>
              </h3>
              <button type="button" class="__next-btn" :style="form2ok" @click="nextBtn2">Continuar</button>
            </div>
          </div>

        </div><!-- ########## CADASTRO PG.2 ########## -->






        <!-- ########## DETALHES PG.3 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod3">

          <h3 class="etapas">3 de 5 etapas</h3>

          <h1 class="__title">Revise os detalhes da reserva</h1>



          <div class="check-in-out">

            <div style="flex:49%">
              <h3 class="__title">Check-in</h3>
              <h3 class="__text">{{ acomod.checkInTime === 'Horário Flexível' ? 'Horário Flexível' : `Após as ${acomod.checkInTime}` }}</h3>
              <h3 class="__text">{{ chegada }}</h3>
            </div>

            <div class="__slash"></div>

            <div style="flex:49%">
              <h3 class="__title" style="text-align: right">Check-out</h3>
              <h3 class="__text" style="text-align: right">{{ acomod.checkOutTime === 'Horário Flexível' ? 'Horário Flexível' : `Antes de ${acomod.checkOutTime}` }}</h3>
              <h3 class="__text" style="text-align: right">{{ partida }}</h3>
            </div>

          </div>



          <!-- <div class="__item">
            <select v-model="$store.state.reservaAcomod.totalHospedes">
              <option v-for="n in totalHospedesArray">{{ n }}</option>
            </select>
          </div> -->

          <div class="buttons">
            <div class="buttons-body">
              <h3 class="__valor">R${{ reservaAcomod.valorReservaTotal.toLocaleString() }}
                <span class="__valor-noites"> por {{ reservaAcomod.noites }} {{ reservaAcomod.noites == 1 ? 'noite' : 'noites'}}</span>
              </h3>
              <button type="button" class="__next-btn" :style="form3ok" @click="nextBtn3">Continuar</button>
            </div>
          </div>

        </div><!-- ########## DETALHES PG.3 ########## -->
        





        <!-- ########## MENSAGEM PG.3 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod4">

          <h3 class="etapas">4 de 5 etapas</h3>

          <h1 class="__title">Mensagem para {{ acomod.proprietario.split(' ')[0] }}</h1>



          <div class="buttons">
            <div class="buttons-body">
              <h3 class="__valor">R${{ reservaAcomod.valorReservaTotal.toLocaleString() }}
                <span class="__valor-noites"> por {{ reservaAcomod.noites }} {{ reservaAcomod.noites == 1 ? 'noite' : 'noites'}}</span>
              </h3>
              <button type="button" class="__next-btn" :style="form4ok" @click="nextBtn4">Continuar</button>
            </div>
          </div>

        </div><!-- ########## MENSAGEM PG.3 ########## -->






        <!-- ########## PAGAMENTO PG.3 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod5">

          <h3 class="etapas">5 de 5 etapas</h3>

          <h1 class="__title">Pagar e confirmar</h1>


          <h3 class="__subtitle">Você somente será cobrado caso {{ acomod.proprietario.split(' ')[0] }} confirme seu pedido de reserva. Para sua segurança, só liberaremos o pagamento para ele no dia seguinte de seu check-in, {{ dayAfterCheckin }}. Não se preocupe, seus dados estarão em total sigilo.</h3>

          <div class="add-payment">
            <h3 class="__text">Adicionar pagamento</h3>
            <img src="../../assets/img/arrow-right.svg" alt="" style="width: 1.1rem; height: auto">
          </div>



          <div class="buttons">
            <div class="buttons-body">
              <h3 class="__valor">R${{ reservaAcomod.valorReservaTotal.toLocaleString() }}
                <span class="__valor-noites"> por {{ reservaAcomod.noites }} {{ reservaAcomod.noites == 1 ? 'noite' : 'noites'}}</span>
              </h3>
              <button type="button" class="__next-btn" :style="form5ok" @click="concluirReserva">Concluir Pedido</button>
            </div>
          </div>

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
      if (this.reservaAcomod.periodoReserva === null) {
        return 'Check-in'
      } else {
        const checkIn = new Date(this.reservaAcomod.periodoReserva.start)
        return dayjs(checkIn).format('ddd, DD MMM')
      }
    },
    partida () {
      if (this.reservaAcomod.periodoReserva === null) {
        return 'Check-out'
      } else {
        const checkOut = new Date(this.reservaAcomod.periodoReserva.end)
        return dayjs(checkOut).format('ddd, DD MMM')
      }
    },
    dayAfterCheckin () {
      const checkIn = new Date(this.reservaAcomod.periodoReserva.start)
      return dayjs(checkIn).add(1, 'day').format('DD/MM')
    },
    form1ok () {
      if (this.$store.state.reservaAcomod.periodoReserva !== null) {
        return 'background: #50CB9D'
      }
    },
    form2ok () {
      if (1>2) {
        return 'background: #50CB9D'
      }
    },
    form3ok () {
      if (1>2) {
        return 'background: #50CB9D'
      }
    },
    form4ok () {
      if (1>2) {
        return 'background: #50CB9D'
      }
    },
    form5ok () {
      if (1>2) {
        return 'background: #FFA04F'
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
      & .__subtitle {
        padding: 0 7%;
        font-size: 16px;
      }
      & .periodo-reserva {
        margin: 0 7%;
        padding: 1.4rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgb(222,222,222);
        & .__slash {
          background: rgb(222,222,222);
          width: 55px;
          height: 1px;
          transform: rotate(130deg);
        }
        & .__btn {
          font-size: 19px;
          font-weight: 600;
          color: #FFA04F;
          user-select: none;
        }
      }
      & .valores-reserva {
        padding: 1rem 7% 0;
        & .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: .4rem 0;
        }
      }
      & .check-in-out {
        margin: 0 7%;
        padding: 1.5rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgb(222,222,222);
        border-top: 1px solid rgb(222,222,222);
        & .__title {
          font-size: 17px;
          font-weight: 600;
          padding: 0;
          line-height: 28px
        }
        & .__text {
          font-size: 16px;
          line-height: 22px
        }
        & .__slash {
          background: rgb(222,222,222);
          width: 60px;
          height: 1px;
          transform: rotate(130deg);
        }
      }
      & .add-payment {
        margin: 1.2rem 7%;
        padding: 1.4rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgb(222,222,222);
        border-top: 1px solid rgb(222,222,222);
        & .__text {
          font-size: 17px;
          font-weight: 600;
          color: var(--colorAcomod)
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
      & .buttons {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 999999;
        height: 4.6rem;
        width:  100%;
        background: white;
        padding: 0 7%;
        overflow: hidden;
        box-shadow: 0px -1px 1px 0px rgba(0,0,0,0.1);
        & .buttons-body {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          & .__valor {
            flex: 40%;
            padding-right: 10px;
            font-size: 18px;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            & .__valor-noites {
              font-size: 14px;
              font-weight: 400;
            }
          }
          & .__next-btn {
            cursor: pointer;
            padding: 0 1.3rem;
            font-size: 16px;
            font-weight: 700;
            background:rgb(212, 212, 212);
            color: white;
            height: 3.1rem;
            border-radius: 5px;
          }
        }
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