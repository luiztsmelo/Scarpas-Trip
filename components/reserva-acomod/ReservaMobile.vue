<template>
  <transition name="reserva-animation">
    <div class="reserva-acomod" v-if="$store.state.showReservaAcomod">



      <img class="__back-btn" src="../../assets/img/back.svg" @click="backBtn">



      <div class="reserva-acomod-body">
        

        <!-- ########## COTAÇÃO PG.1 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod1">

          <h3 class="etapas">1 de 5 etapas</h3>

          <h1 class="__title">Orçamento</h1>



          <div class="periodo-reserva" @click="openDatePicker">

            <h3 class="__btn" style="text-align: left; flex:49%">{{ checkIn }}</h3>

            <div class="__slash"></div>

            <h3 class="__btn" style="text-align: right; flex:49%">{{ checkOut }}</h3>

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

          <h1 class="__title">
            {{ user.email === null ? 'Antes de continuar, precisamos de seu cadastro' : `Ótimo ${user.firstName}, só mais uma informação` }}
          </h1>


          <div class="sign-in-btns" v-if="user.email === null">
            <button type="button" class="facebook-btn" @click="$store.dispatch('a_facebookSignIn')">Cadastrar com Facebook</button>
            <button type="button" class="google-btn" @click="$store.dispatch('a_googleSignIn')">Cadastrar com Google</button>
            <button type="button" class="email-btn">Cadastrar com E-mail</button>
          </div>

          <div class="after-sign-in" v-else>
            <!-- CELULAR -->
            <div class="item-form">
              <label>Celular / WhatsApp</label>
              <masked-input
                type="tel"
                v-model="reservaAcomod.guestCelular"
                :mask="['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                :guide="false"
                placeholder="(  )          ">
              </masked-input>
            </div><!-- CELULAR -->
          </div>
          


          <div class="buttons">
            <div class="buttons-body">
              <h3 class="__valor" v-if="reservaAcomod.valorReservaTotal !== null">R${{ reservaAcomod.valorReservaTotal.toLocaleString() }}
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

          <h3 class="__subtitle">Highlights da casa aqui</h3>



          <div class="check-in-out">

            <div style="flex:49%">
              <h3 class="__title">Check-in</h3>
              <h3 class="__text">{{ acomod.checkInTime === 'A qualquer hora' ? 'A qualquer hora' : `Após as ${acomod.checkInTime}` }}</h3>
              <h3 class="__text">{{ checkIn }}</h3>
            </div>

            <div class="__slash"></div>

            <div style="flex:49%">
              <h3 class="__title" style="text-align: right">Check-out</h3>
              <h3 class="__text" style="text-align: right">{{ acomod.checkOutTime === 'A qualquer hora' ? 'A qualquer hora' : `Até as ${acomod.checkOutTime}` }}</h3>
              <h3 class="__text" style="text-align: right">{{ checkOut }}</h3>
            </div>

          </div>


          <h3 class="__subtitle">Regras aqui</h3>


          <!-- <div class="__item">
            <select v-model="$store.state.reservaAcomod.totalHospedes">
              <option v-for="n in totalHospedesArray">{{ n }}</option>
            </select>
          </div> -->

          <div class="buttons">
            <div class="buttons-body">
              <h3 class="__valor" v-if="reservaAcomod.valorReservaTotal !== null">R${{ reservaAcomod.valorReservaTotal.toLocaleString() }}
                <span class="__valor-noites"> por {{ reservaAcomod.noites }} {{ reservaAcomod.noites == 1 ? 'noite' : 'noites'}}</span>
              </h3>
              <button type="button" class="__next-btn" :style="form3ok" @click="nextBtn3">Continuar</button>
            </div>
          </div>

        </div><!-- ########## DETALHES PG.3 ########## -->
        





        <!-- ########## MENSAGEM PG.4 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod4">

          <h3 class="etapas">4 de 5 etapas</h3>

          <h1 class="__title">Mensagem para {{ acomod.proprietario.split(' ')[0] }}</h1>

          <h3 class="__subtitle">Texto aqui</h3>



          <div class="buttons">
            <div class="buttons-body">
              <h3 class="__valor" v-if="reservaAcomod.valorReservaTotal !== null">R${{ reservaAcomod.valorReservaTotal.toLocaleString() }}
                <span class="__valor-noites"> por {{ reservaAcomod.noites }} {{ reservaAcomod.noites == 1 ? 'noite' : 'noites'}}</span>
              </h3>
              <button type="button" class="__next-btn" :style="form4ok" @click="nextBtn4">Continuar</button>
            </div>
          </div>

        </div><!-- ########## MENSAGEM PG.4 ########## -->






        <!-- ########## PAGAMENTO PG.5 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod5">

          <h3 class="etapas">5 de 5 etapas</h3>

          <h1 class="__title">Pagar e confirmar</h1>


          <h3 class="__subtitle">Você somente será cobrado caso {{ acomod.proprietario.split(' ')[0] }} confirme seu pedido de reserva. Para sua segurança, só liberaremos o pagamento para ele no dia seguinte de seu check-in, {{ dayAfterCheckin }}. Não se preocupe, seus dados estarão em total sigilo.</h3>

          <div class="add-payment" @click="openPaymentMethod">
            <h3 class="__text">Adicionar pagamento</h3>
            <img src="../../assets/img/arrow-right.svg" alt="" style="width: 1.1rem; height: auto">
          </div>



          <div class="buttons">
            <div class="buttons-body">
              <h3 class="__valor" v-if="reservaAcomod.valorReservaTotal !== null">R${{ reservaAcomod.valorReservaTotal.toLocaleString() }}
                <span class="__valor-noites"> por {{ reservaAcomod.noites }} {{ reservaAcomod.noites == 1 ? 'noite' : 'noites'}}</span>
              </h3>
              <button type="button" class="__next-btn" :style="form5ok" @click="concluirReserva">Concluir Pedido</button>
            </div>
          </div>

        </div><!-- ########## PAGAMENTO PG.5 ########## -->




        <!-- ___________ PAYMENT METHOD  ___________ -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomodPaymentMethod">

          <h1 class="__title">Pagar com</h1>


          <div class="add-payment" style="border: none" @click="openCreditCard">
            <div style="display:flex;align-items:center">
              <img src="../../assets/img/credit-card.svg" class="__img">
              <h3 class="__text">Cartão de Crédito</h3>
            </div>
            <img src="../../assets/img/arrow-right.svg" style="width: 1.1rem; height: auto">
          </div>
          <div class="add-payment" style="border-bottom: none" @click="openBoleto">
            <div style="display:flex;align-items:center">
              <img src="../../assets/img/boleto.svg" class="__img">
              <h3 class="__text">Boleto</h3>
            </div>
            <img src="../../assets/img/arrow-right.svg" style="width: 1.1rem; height: auto">
          </div>


        </div><!-- ___________ PAYMENT METHOD  ___________ -->




        <!-- ___________ CREDIT CARD  ___________ -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomodCreditCard">

          <h1 class="__title">Insira as informações do seu cartão</h1>


          <!-- CARD NUMBER -->
          <div class="item-form">
            <label :class="[ cardNumberError ? 'has-error-label' : '' ]">Número do Cartão</label>
            <masked-input
              :class="[ cardNumberError ? 'has-error' : '' ]"
              type="tel"
              v-model="$store.state.creditCard.cardNumber"
              :mask="[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]"
              :guide="false"
              placeholder="0000 0000 0000 0000">
            </masked-input>
          </div><!-- CARD NUMBER -->


          <div style="display:flex">
            
            <!-- CARD EXPIRATION -->
            <div class="item-form">
              <label :class="[ cardExpirationDateError ? 'has-error-label' : '' ]">Valido até</label>
              <masked-input
                :class="[ cardExpirationDateError ? 'has-error' : '' ]"
                type="tel"
                v-model="$store.state.creditCard.cardExpirationDate"
                :mask="[/\d/, /\d/, ' ', '/', ' ', /\d/, /\d/]"
                :guide="false"
                placeholder="MM / AA">
              </masked-input>
            </div><!-- CARD EXPIRATION -->

            <!-- CVV -->
            <div class="item-form">
              <label :class="[ cardCvvError ? 'has-error-label' : '' ]">CVV</label>
              <masked-input
                :class="[ cardCvvError ? 'has-error' : '' ]"
                type="tel"
                v-model="$store.state.creditCard.cardCVV"
                :mask="[/\d/, /\d/, /\d/, /\d/]"
                :guide="false"
                placeholder="123">
              </masked-input>
            </div><!-- CVV -->

          </div>


          <div class="buttons" style="box-shadow: none">
            <div class="buttons-body">
              <h3></h3>
              <button type="button" class="__next-btn" :style="formCreditCardOk" @click="nextBtnCreditCard">Próximo</button>
            </div>
          </div>

        </div><!-- ___________ CREDIT CARD  ___________ -->




        <!-- ___________ BOLETO  ___________ -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomodBoleto">

          <h1 class="__title">Insira suas informações pessoais para a emissão do boleto</h1>



          <div class="round-btn" @click="nextBtnBoleto">OK</div>

        </div><!-- ___________ BOLETO  ___________ -->





        <!-- ___________ BILLING  ___________ -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomodBilling">

          <h1 class="__title">Insira as informações pessoais do titular do cartão</h1>


          <!-- NOME -->
          <div class="item-form">
            <label>Nome Impresso no Cartão</label>
            <input
              type="text" pattern="[A-Za-z]"
              v-model="$store.state.creditCard.cardHolderName">
          </div><!-- NOME -->


          <!-- CPF -->
          <div class="item-form">
            <label>CPF</label>
            <masked-input
              type="tel"
              v-model="reservaAcomod.guestCPF"
              :mask="[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]"
              :guide="false"
              placeholder="000.000.000-00">
            </masked-input>
          </div><!-- CPF -->



          <div class="round-btn" @click="nextBtnBilling">OK</div>

        </div><!-- ___________ BILLING  ___________ -->





      </div>

    </div>
  </transition>
</template>

<script>
import * as firebase from 'firebase'
import 'firebase/functions'
import MaskedInput from 'vue-text-mask'
import DatePicker from '@/components/DatePicker'
import { reservaAcomod } from '@/mixins/reservaAcomod'
import valid from 'card-validator'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

export default {
  components: { MaskedInput, DatePicker },
  mixins: [ reservaAcomod ],
  data() {
    return {
    }
  },
  methods: {
    limpezaFeeDialog () {
      this.$store.commit('m_alertMobile', {
        type: 'info',
        title: 'Taxa de Limpeza',
        message: `Taxa cobrada pelo proprietário para arcar com os custos de limpeza ${this.tipoAcomod}.`,
      })
    },
    serviceFeeDialog () {
      this.$store.commit('m_alertMobile', {
        type: 'info',
        title: 'Taxa de Serviço',
        message: `Taxa de ${Math.round(this.$store.state.serviceFeeAcomod * 100)}% cobrada com o intuito de garantir suporte e total segurança em sua estadia caso algum problema aconteça.`,
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
      if (this.$store.state.reservaAcomodPaymentMethod === true || this.$store.state.reservaAcomodCreditCard === true || this.$store.state.reservaAcomodBoleto === true || this.$store.state.reservaAcomodBilling === true) {
        window.history.back(1)
        this.$store.commit('m_reservaAcomodPaymentMethod', false)
        this.$store.commit('m_reservaAcomodCreditCard', false)
        this.$store.commit('m_reservaAcomodBoleto', false)
        this.$store.commit('m_reservaAcomodBilling', false)
        this.$store.commit('m_reservaAcomod5', true)
      }
    },
    nextBtn1 () {
      if (this.reservaAcomod.periodoReserva !== null) {
        this.$store.commit('m_reservaAcomod1', false), this.$store.commit('m_reservaAcomod2', true), window.location.hash = this.$store.state.randomHashs[2], this.scrollTop()
      } else {
        this.$store.commit('m_alertMobile', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione as datas de sua viagem.',
        })
      }
    },
    nextBtn2 () {
      if (this.reservaAcomod.guestCelular.length === 15) {
        this.creditCard.cardHolderName = this.user.fullName
        this.reservaAcomod.guestName = this.user.fullName
        this.$store.commit('m_reservaAcomod2', false)
        this.$store.commit('m_reservaAcomod3', true)
        window.location.hash = this.$store.state.randomHashs[3]
        this.scrollTop()
      } else {
        this.$store.commit('m_alertMobile', {
          type: 'warning',
          title: 'Ops',
          message: this.user.email === null ? 'É preciso se cadastrar.' : 'Adicione seu número de celular.',
        })
      }
    },
    nextBtn3 () {
      if (1<2) {
        this.$store.commit('m_reservaAcomod3', false), this.$store.commit('m_reservaAcomod4', true), window.location.hash = this.$store.state.randomHashs[4], this.scrollTop()
      }
    },
    nextBtn4 () {
      if (1<2) {
        this.$store.commit('m_reservaAcomod4', false), this.$store.commit('m_reservaAcomod5', true), window.location.hash = this.$store.state.randomHashs[5], this.scrollTop()
      }
    },
    nextBtnCreditCard () {
      if (valid.number(this.cardNumber).isValid && valid.expirationDate(this.cardExpirationDate).isValid && valid.cvv(this.cardCVV).isValid) {
        this.$store.commit('m_reservaAcomodCreditCard', false), this.$store.commit('m_reservaAcomodBilling', true), this.scrollTop()
      } else {
        this.$store.commit('m_alertMobile', {
          type: 'error',
          title: 'Erro',
          message: 'Cartão inválido.',
        })
      }
    },
    nextBtnBoleto () {
      if (1<2) {
        this.$store.commit('m_reservaAcomodBoleto', false), window.history.back(1), this.scrollTop()
      }
    },
    nextBtnBilling () {
      if (1<2) {
        this.$store.commit('m_reservaAcomodBilling', false), window.history.back(1), this.scrollTop()
      }
    },
    openDatePicker () {
      this.$store.commit('m_loader', true), this.$modal.show('datepicker'), window.location.hash = `${this.$store.state.randomHashs[1]}-datas`
    },
    openPaymentMethod () {
      this.$store.commit('m_reservaAcomod5', false), this.$store.commit('m_reservaAcomodPaymentMethod', true), window.location.hash = this.$store.state.randomHashs[6], this.scrollTop()
    },
    openCreditCard () {
      this.$store.commit('m_reservaAcomodPaymentMethod', false), this.$store.commit('m_reservaAcomodCreditCard', true), this.scrollTop()
    },
    openBoleto () {
      this.$store.commit('m_reservaAcomodPaymentMethod', false), this.$store.commit('m_reservaAcomodBoleto', true), this.scrollTop()
    },
    concluirReserva () {
      if (1>2) {
      } else {
        this.$store.commit('m_alertMobile', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione uma forma de pagamento.',
        })
      }
    }
  },
  computed: {
    hash () {
      return this.$route.hash
    },
    totalHospedesArray () {
      return Array.from({length: this.acomod.totalHospedes}, (v, k) => k+1)
    },
    checkIn () {
      if (this.reservaAcomod.periodoReserva === null) {
        return 'Check-in'
      } else {
        const checkIn = new Date(this.reservaAcomod.periodoReserva.start)
        return dayjs(checkIn).format('ddd, DD MMM')
      }
    },
    checkOut () {
      if (this.reservaAcomod.periodoReserva === null) {
        return 'Check-out'
      } else {
        const checkOut = new Date(this.reservaAcomod.periodoReserva.end)
        return dayjs(checkOut).format('ddd, DD MMM')
      }
    },
    form1ok () {
      return this.reservaAcomod.periodoReserva !== null ? 'background: #50CB9D' : ''
    },
    form2ok () {
      return this.reservaAcomod.guestCelular.length === 15 ? 'background: #50CB9D' : ''
    },
    form3ok () {
       return 1<2 ? 'background: #50CB9D' : ''
    },
    form4ok () {
      return 1<2 ? 'background: #50CB9D' : ''
    },
    form5ok () {
      return 1>2 ? 'background: #50CB9D' : ''
    },
    formCreditCardOk () {
      if (valid.number(this.cardNumber).isValid && valid.expirationDate(this.cardExpirationDate).isValid && valid.cvv(this.cardCVV).isValid) {
        return 'background: #50CB9D'
      }
    },
    formBoletoOk () {
      if (1>2) {
        return 'background: #50CB9D'
      }
    },
    formBillingOk () {
      if (1>2) {
        return 'background: #50CB9D'
      }
    }
  },
  watch: {
    cardNumber (value) {
      let cardNumber = valid.number(value)
      cardNumber.isPotentiallyValid ? this.cardNumberError = false : this.cardNumberError = true
      if (value.length === 19) {
        cardNumber.isValid ? this.cardNumberError = false : this.cardNumberError = true
      }
      if (cardNumber.card) {
        this.$store.state.cardType = cardNumber.card.type
        this.$store.state.cardTypeNice = cardNumber.card.niceType
      }
    },
    cardExpirationDate (value) {
      let firstDigit = value.charAt(0)
      firstDigit > 1 ? this.$store.state.creditCard.cardExpirationDate = `0${firstDigit} / ` : ''
      let cardExpirationDate = valid.expirationDate(value)
      cardExpirationDate.isPotentiallyValid ? this.cardExpirationDateError = false : this.cardExpirationDateError = true
    },
    cardCVV (value) {
      let cardCVV = valid.cvv(value)
      cardCVV.isPotentiallyValid ? this.cardCvvError = false : this.cardCvvError = true
    },
    hash (value) {
      if (value === '') {
        this.$store.commit('m_showReservaAcomod', false)
        this.$store.commit('m_reservaAcomod1', false)
        this.$store.commit('m_hideAlertMobile')
      }
      if (value === `#${this.$store.state.randomHashs[1]}`) {
        this.$modal.hide('datepicker') 
        this.$store.commit('m_reservaAcomod1', true)
        this.$store.commit('m_reservaAcomod2', false)
        this.$store.commit('m_hideAlertMobile')
      }
      if (value === `#${this.$store.state.randomHashs[2]}`) {
        this.$store.commit('m_reservaAcomod2', true)
        this.$store.commit('m_reservaAcomod3', false)
        this.$store.commit('m_hideAlertMobile')
      }
      if (value === `#${this.$store.state.randomHashs[3]}`) {
        this.$store.commit('m_reservaAcomod3', true)
        this.$store.commit('m_reservaAcomod4', false)
        this.$store.commit('m_hideAlertMobile')
      }
      if (value === `#${this.$store.state.randomHashs[4]}`) {
        this.$store.commit('m_reservaAcomod4', true)
        this.$store.commit('m_reservaAcomod5', false)
        this.$store.commit('m_hideAlertMobile')
      }
      if (value === `#${this.$store.state.randomHashs[5]}`) {
        this.$store.commit('m_reservaAcomod5', true)
        this.$store.commit('m_reservaAcomodPaymentMethod', false)
        this.$store.commit('m_reservaAcomodCreditCard', false)
        this.$store.commit('m_reservaAcomodBoleto', false)
        this.$store.commit('m_reservaAcomodBilling', false)
        this.$store.commit('m_hideAlertMobile')
      }
      if (value === `#${this.$store.state.randomHashs[6]}`) {
        this.$store.commit('m_reservaAcomodPaymentMethod', true)
        this.$store.commit('m_reservaAcomodCreditCard', false)
        this.$store.commit('m_reservaAcomodBoleto', false)
        this.$store.commit('m_reservaAcomodBilling', false)
        this.$store.commit('m_hideAlertMobile')
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
  overflow-y: auto;
  transition: var(--main-transition);
  & .__back-btn {
    margin: 1.2rem 7% .5rem;
    cursor: pointer;
    width: 1.07rem;
    height: auto;
    filter: invert(75%);
  }
  & .reserva-acomod-body {
    display: flex;
    flex-flow: column;
    margin-top: .5rem;
    height: 100%;
    overflow-y: auto;
    & .etapa-reserva-box {
      padding-bottom: 5rem;
      & .etapas {
        padding: 0 7% 0.2rem;
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
        padding: 0 7% 1.1rem;
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
          font-weight: 500;
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
      & .sign-in-btns {
        display: flex;
        flex-flow: column;
        padding: 0 7%;
        & .facebook-btn {
          width: 17rem;
          margin: .6rem 0;
          height: 3.4rem;
          text-align: start;
          padding-left: 50px;
          font-size: 15px;
        }
        & .google-btn {
          width: 17rem;
          margin: .6rem 0;
          height: 3.4rem;
          text-align: start;
          padding-left: 50px;
          font-size: 15px;
        }
        & .email-btn {
          width: 17rem;
          margin: .6rem 0;
          height: 3.4rem;
          text-align: start;
          padding-left: 50px;
          font-size: 15px;
        }
      }
      & .check-in-out {
        margin: .2rem 7% 1.2rem;
        padding: 1.2rem 0 1.35rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgb(222,222,222);
        border-top: 1px solid rgb(222,222,222);
        & .__title {
          font-size: 17px;
          font-weight: 600;
          padding: 0;
          line-height: 32px
        }
        & .__text {
          font-size: 16px;
          line-height: 22px
        }
        & .__slash {
          background: rgb(222,222,222);
          width: 65px;
          height: 1px;
          transform: rotate(130deg);
        }
      }
      & .add-payment {
        margin: 0 7%;
        padding: 1.4rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgb(222,222,222);
        border-top: 1px solid rgb(222,222,222);
        & .__img {
          width: 1.9rem;
          height: auto;
          margin-right: .8rem;
        }
        & .__text {
          font-size: 17px;
          font-weight: 500;
        }
      }
      & .item-form {
        padding: 0 7%;
        display: flex;
        flex-flow: column;
        margin-bottom: 1.7rem;
        & label {
          font-weight: 600;
          font-size: 15px;
          transition: all .2s ease;
        }
        & input {
          width: 100%;
          font-size: 17px;
          font-weight: 400;
          background: white;
          color: var(--color01);
          padding: 1rem 0;
          border: none;
          border-bottom: 1px solid rgb(222,222,222);
          outline: none;
          transition: all .2s ease;
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
            font-weight: 600;
            background:rgb(232, 232, 232);
            color: white;
            height: 3.1rem;
            border-radius: 5px;
            transition: all .2s ease;
          }
        }
      }
      & .round-btn {
        margin: 1rem 7%;
        display: flex;
        align-items: center;
        justify-content: center;
        float: right;
        font-size: 14px;
        font-weight: 600;
        color: white;
        width: 3.3rem;
        height: 3.3rem;
        border-radius: 50%;
        background:#50CB9D;
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

.has-error-label {
  color: #F31431 !important;
}
.has-error {
  color: #F31431 !important;
  border-bottom: 1px solid #F31431 !important;
}
</style>