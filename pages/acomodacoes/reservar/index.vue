<template>
  <div class="reservar" v-if="$store.state.reservaAcomod.startDate !== null">
    
    <v-dialog style="z-index:10000"/>


    <!-- ******* HEADER PROGRESS ******* -->
    <div class="header-progress" v-if="!$store.state.concludedReservaAcomod">

      <nuxt-link to="/" class="brand">
        <img class="__brand-img" src="../../../static/brand.svg" draggable="false">
      </nuxt-link>

      <div class="progress">
        <h3 class="__item-progress" :style="etapaProgressed1" @click="backEtapa1">1. Revisar Regras {{ tipoAcomodTitle }}</h3>
        
        <img src="../../../assets/img/arrow-right.svg" class="__arrow-right">

        <h3 class="__item-progress" :style="etapaProgressed2" @click="backEtapa2">2. Mensagem</h3>

        <img src="../../../assets/img/arrow-right.svg" class="__arrow-right">

        <h3 class="__item-progress" :style="etapaProgressed3" @click="backEtapa3">3. Pagamento e Confirmação</h3>
      </div>

    </div><!-- ******* HEADER PROGRESS ******* -->




    <div class="reserva-body" v-if="!$store.state.concludedReservaAcomod">

      <!-- ******* Flex Left ******* -->
      <div class="flex-left">



        <!-- ******* ETAPA 1 ******* -->
        <div class="etapa-1" v-if="$store.state.reservaAcomodDesktop1 === true">

          <h1 class="__title">Revisar Regras {{ tipoAcomodTitle }}</h1>


          <div class="etapa-1-item">
            <h3 class="__subtitle">Horário para Check-in:</h3>
            <h3>{{ 'Entre ' + acomod.checkinFrom + ' e ' + acomod.checkinTo }}</h3>
          </div>
        

          <div class="etapa-1-item" v-show="!acomod.allowFestas || !acomod.allowPets || !acomod.allowBabys || !acomod.allowFumar">
            <h3 class="__subtitle">Nesta casa não é adequado:</h3>
            <h3>{{ !acomod.allowFestas ? 'Festas' : '' }}</h3>
            <h3>{{ !acomod.allowPets ? 'Animais de estimação' : '' }}</h3>
            <h3>{{ !acomod.allowBabys ? 'Bebês de até 2 anos' : '' }}</h3>
            <h3>{{ !acomod.allowFumar ? 'Fumar dentro de casa' : '' }}</h3>
          </div>

          <div class="etapa-1-item" v-show="acomod.regrasAdicionais.length !== 0">
            <h3 class="__subtitle">Lembretes adicionais:</h3>
            <h3 v-for="regra in acomod.regrasAdicionais">{{ regra }}</h3>
          </div>
          
          <!-- <h3>Regras de Cancelamento</h3> -->


          <button class="__next-btn" type="button" @click="nextBtn1">Concordar e Continuar</button>

        </div><!-- ******* ETAPA 1 ******* -->




        <!-- ******* ETAPA 2 ******* -->
        <div class="etapa-2" v-if="$store.state.reservaAcomodDesktop2 === true">

          <h1 class="__title">Mensagem</h1>


          <button class="__next-btn" type="button" @click="nextBtn2">Continuar</button>

        </div><!-- ******* ETAPA 2 ******* -->




        <!-- ******* ETAPA 3 ******* -->
        <div class="etapa-3" v-if="$store.state.reservaAcomodDesktop3 === true">

          <h1 class="__title">Pagamento e Confirmação</h1>

          <h3 class="__subtitle">Você não será cobrado até que a reserva seja confirmada.</h3>
          

          <div class="payment">

            <div class="item-form">
              <label>Pagar com</label>
              <select v-model="$store.state.creditCard.paymentMethod">
                <option selected :value="'credit_card'">Cartão de Crédito</option>
                <option :value="'boleto'">Boleto</option>
              </select>
            </div>

            <div class="item-form">
              <label>Nome impresso no Cartão</label>
              <input
                :class="[ cardHolderNameError ? 'has-error' : '' ]"
                type="text" pattern="[A-Za-z]"
                v-model="$store.state.creditCard.cardHolderName"
              >
            </div>

            <div class="card-info">
              <div class="item-form">
                <label>Dados do Cartão</label>

                <masked-input
                  :class="[ cardNumberError ? 'has-error' : '' ]"
                  style="border-bottom:none"
                  ref="cardNumberInput"
                  type="tel"
                  v-model="$store.state.creditCard.cardNumber"
                  :mask="[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]"
                  :guide="false"
                  @focus="$refs.cardNumberInput.$el.placeholder = '0000 0000 0000 0000'"
                  @blur="$refs.cardNumberInput.$el.placeholder = 'Número do Cartão'"
                  placeholder="Número do Cartão">
                </masked-input>

                <div class="flex" style="display:flex">
                  <masked-input
                    :class="[ cardExpirationDateError ? 'has-error' : '' ]"
                    style="border-right:none"
                    ref="validadeInput"
                    type="tel"
                    v-model="$store.state.creditCard.cardExpirationDate"
                    :mask="[/\d/, /\d/, '/', /\d/, /\d/]"
                    :guide="false"
                    @focus="$refs.validadeInput.$el.placeholder = 'MM / AA'"
                    @blur="$refs.validadeInput.$el.placeholder = 'Validade'"
                    placeholder="Validade">
                  </masked-input>

                  <masked-input
                    :class="[ cardCvvError ? 'has-error' : '' ]"
                    ref="cvvInput"
                    type="tel"
                    v-model="$store.state.creditCard.cardCVV"
                    :mask="[/\d/, /\d/, /\d/, /\d/]"
                    :guide="false"
                    @focus="$refs.cvvInput.$el.placeholder = ''"
                    @blur="$refs.cvvInput.$el.placeholder = 'CVV'"
                    placeholder="CVV">
                  </masked-input>
                </div>

              </div>
            </div>

            <div class="flex" style="display:flex; justify-content:space-between">

              <div class="item-form" style="margin:0">
                <label>CPF</label>
                <masked-input
                  :class="[ cpfError ? 'has-error' : '' ]"
                  type="tel"
                  v-model="$store.state.reservaAcomod.guestCPF"
                  :mask="[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]"
                  :guide="false"
                  placeholder="___.___.___-__">
                </masked-input>
              </div>

              <div class="item-form" style="margin:0">
                <label>Celular</label>
                <masked-input
                  :class="[ celularError ? 'has-error' : '' ]"
                  type="tel"
                  v-model="$store.state.reservaAcomod.guestCelular"
                  :mask="['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                  :guide="false"
                  placeholder="(  )          ">
                </masked-input>
              </div>

            </div>

          </div>
          

          <button class="__next-btn" type="button" @click="concluirReserva">Confirmar Reserva</button>

        </div><!-- ******* ETAPA 3 ******* -->
        


      </div><!-- ******* Flex Left ******* -->





      <!-- ******* Flex Right ******* -->
      <div class="flex-right">

        <progressive-background  class="__acomod-image" :src="imageH" :placeholder="acomod.images[0].L" :aspect-ratio="2/3"/>

        <h1 class="__acomod-title">{{ acomod.title }}</h1>

        <div class="detalhes-reserva-data">
          <div class="detalhes-reserva-data_item">
            <img src="../../../assets/img/calendar.svg" class="__img" style="transform: scale(.9)">
            <h3>{{ startDateFormatted }}</h3>
            <img src="../../../assets/img/arrow-right.svg" class="__arrow-right-date">
            <h3>{{ endDateFormatted }}</h3>
          </div>
          <div class="detalhes-reserva-data_item">
            <img src="../../../assets/img/guests.svg" class="__img">
            <h3>{{ $store.state.reservaAcomod.totalHospedes == '1' ? $store.state.reservaAcomod.totalHospedes + ' hóspede' : $store.state.reservaAcomod.totalHospedes + ' hóspedes' }}</h3>
          </div>
        </div>

        <div class="detalhes-reserva-valor" v-if="$store.state.reservaAcomod.valorReservaTotal !== null">

          <div class="detalhes-reserva-valor_item" style="padding-bottom: .5rem">
            <h3>R${{ acomod.valorNoite.toLocaleString() }} x {{ $store.state.reservaAcomod.noites }} noites</h3>
            <h3 id="valor">R${{ $store.state.reservaAcomod.valorNoitesTotal.toLocaleString() }}</h3>
          </div>

          <div class="detalhes-reserva-valor_item" style="padding-bottom: .5rem" v-if="acomod.limpezaFee !== 0">
            <div style="display:flex;flex:row;align-items:center">
              <h3>Taxa de limpeza</h3>
              <img src="../../../assets/img/info.svg" style="width:.95rem;height:auto;margin-left:.3rem;cursor:pointer" @click="limpezaFeeDialog">
            </div>
            <h3>R${{ this.acomod.limpezaFee.toLocaleString() }}</h3>
          </div>

          <div class="detalhes-reserva-valor_item" style="padding-bottom: .8rem">
            <div style="display:flex;flex:row;align-items:center">
              <h3>Taxa de serviço</h3>
              <img src="../../../assets/img/info.svg" style="width:.95rem;height:auto;margin-left:.3rem;cursor:pointer" @click="serviceFeeDialog">
            </div>
            <h3>R${{ $store.state.reservaAcomod.serviceFeeTotal.toLocaleString() }}</h3>
          </div>

          <div class="detalhes-reserva-valor_item-total" style="padding-top: .8rem">
            <h3>Total</h3>
            <h3 class="__valor-total">R${{ $store.state.reservaAcomod.valorReservaTotal.toLocaleString() }}</h3>
          </div>
        </div>

      </div><!-- ******* Flex Right ******* -->


    </div>



    <div class="concluded-reserva" v-if="$store.state.concludedReservaAcomod">

      <img class="__img" src="../../../assets/img/brand.svg">

      <h1 class="__title">Pedido de reserva enviado</h1>

      <h3 class="__text">
        {{ this.acomod.proprietario.split(' ')[0] }} irá analisar seu pedido e dentro de 48 horas você receberá um e-mail e SMS com a confirmação de sua reserva, juntamente com as informações de contato do anunciante.
      </h3>

      <h3 class="__subtitle">Código da Reserva</h3>
      <h3 class="__text">{{ $store.state.reservaAcomod.reservaID }}</h3>

      <h3 class="__subtitle">Cancelamento</h3>
      <h3 class="__text">
        É possível cancelar sua reserva, com reembolso total, até dia tal, acessando sua <nuxt-link to="/@name" style="text-decoration:underline">página pessoal</nuxt-link>. Para mais detalhes, leia nossa <nuxt-link to="/" style="text-decoration:underline">Política de Cancelamento</nuxt-link>.
      </h3>

      <h3 class="__subtitle">Dúvidas?</h3>
      <h3 class="__text">Entre em contato conosco pelo nosso WhatsApp: (34) 99141-0085 ou e-mail: contato@escarpastrip.com.</h3>
      
      
      <nuxt-link to="/" style="margin-top:4rem">
        <button class="__next-btn" type="button" style="margin:0">Acessar Página Pessoal</button>
      </nuxt-link>
      

    </div>


  </div>
</template>

<script>
import * as firebase from 'firebase'
import 'firebase/functions'
require('firebase/firestore')
import supportsWebP from 'supports-webp'
import MaskedInput from 'vue-text-mask'

export default {
  components: { MaskedInput },
  head () {
    return {
      title: 'Reservar: ' + this.acomod.title
    }
  },
  middleware: 'reservaValidate',
  transition: 'opacity',
  data() {
    return {
      cardNumberError: false,
      cardHolderNameError: false,
      cardExpirationDateError: false,
      cardCvvError: false,
      cpfError: false,
      celularError: false
    }
  },
  methods: {
    nextBtn1 () {
      this.$store.state.etapaReserva2ok = true, this.$store.commit('m_reservaAcomodDesktop1', false), this.$store.commit('m_reservaAcomodDesktop2', true)
    },
    nextBtn2 () {
      this.$store.state.etapaReserva3ok = true, this.$store.commit('m_reservaAcomodDesktop2', false), this.$store.commit('m_reservaAcomodDesktop3', true)
    },
    concluirReserva () {
      this.$store.commit('m_loader', true)

      const reservaAcomod = this.$store.state.reservaAcomod
      const creditCard = this.$store.state.creditCard
      const user = this.$store.state.user

      reservaAcomod.requested = new Date().getTime()
      reservaAcomod.acomodID = this.acomod.acomodID
      reservaAcomod.hostID = this.acomod.userID
      reservaAcomod.hostEmail = this.acomod.email
      reservaAcomod.hostName = this.acomod.proprietario
      reservaAcomod.hostCelular = this.acomod.celular
      reservaAcomod.guestID = user.userID
      reservaAcomod.guestEmail = user.email
      reservaAcomod.guestName = user.fullName
      reservaAcomod.limpezaFee = this.acomod.limpezaFee

      /* Se todos os dados foram preenchidos corretamente: */
      if (creditCard.cardNumber.length === 19 && creditCard.cardHolderName !== '' && creditCard.cardExpirationDate.length === 5 && creditCard.cardCVV.length >= 3 && reservaAcomod.guestCPF.length === 14 && reservaAcomod.guestCelular.length === 15) {
        
        /* Transaction pagarme */
        firebase.functions().httpsCallable('pagarme_newReservaAcomod')({
          reservaAcomod: reservaAcomod,
          creditCard: creditCard,
          acomod: this.acomod
        })
        .then(result => {
          console.log(result.data)
          const reservaID = result.data.reservaID
          reservaAcomod.reservaID = reservaID

          /* Set reservaAcomod */
          firebase.firestore().collection('reservasAcomods').doc(reservaID).set(reservaAcomod)
          .then(() => {
            this.$store.commit('m_loader', false)
            this.scrollTop()
            this.$store.state.concludedReservaAcomod = true
            this.$store.commit('m_resetCreditCard')
          })
          .catch(err => {
            console.log(err)
            this.$store.commit('m_loader', false)
          })
        })
        .catch(err => { /* Transaction error */
          this.$store.commit('m_loader', false)
          console.log(err.code)
          console.log(err.message)
          console.log(err.details)
          err.details === 'card_number' ? this.cardNumberError = true : this.cardNumberError = false
          err.details === 'card_holder_name' ? this.cardHolderNameError = true : this.cardHolderNameError = false
          err.details === 'card_expiration_date' ? this.cardExpirationDateError = true : this.cardExpirationDateError = false
          err.details === 'card_cvv' ? this.cardCvvError = true : this.cardCvvError = false
          err.details === 'customer' ? this.cpfError = true : this.cpfError = false
        })
      } else {
        this.$store.commit('m_loader', false)
        creditCard.cardNumber.length < 19 ? this.cardNumberError = true : this.cardNumberError = false
        creditCard.cardHolderName.length < 3 ? this.cardHolderNameError = true : this.cardHolderNameError = false
        creditCard.cardExpirationDate.length < 5 ?  this.cardExpirationDateError = true :  this.cardExpirationDateError = false
        creditCard.cardCVV.length < 3 ? this.cardCvvError = true : this.cardCvvError = false
        reservaAcomod.guestCPF.length < 14 ? this.cpfError = true : this.cpfError = false
        reservaAcomod.guestCelular.length < 15 ? this.celularError = true : this.celularError = false
      }
    },
    scrollTop () {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    backEtapa1 () {
      if (this.$store.state.etapaReserva1ok === true) {
        this.$store.commit('m_reservaAcomodDesktop1', true), this.$store.commit('m_reservaAcomodDesktop2', false), this.$store.commit('m_reservaAcomodDesktop3', false)
      }
    },
    backEtapa2 () {
      if (this.$store.state.etapaReserva2ok === true) {
        this.$store.commit('m_reservaAcomodDesktop1', false), this.$store.commit('m_reservaAcomodDesktop2', true), this.$store.commit('m_reservaAcomodDesktop3', false)
      }
    },
    backEtapa3 () {
      if (this.$store.state.etapaReserva3ok === true) {
        this.$store.commit('m_reservaAcomodDesktop1', false), this.$store.commit('m_reservaAcomodDesktop2', false), this.$store.commit('m_reservaAcomodDesktop3', true)
      }
    },
    limpezaFeeDialog () {
      this.$modal.show('dialog', {
        title: 'Taxa de Limpeza',
        text: `Taxa cobrada pelo proprietário para arcar com os custos de limpeza ${this.tipoAcomodLimpeza}.`,
        buttons: [{ title: 'OK' }]
      })
    },
    serviceFeeDialog () {
      this.$modal.show('dialog', {
        title: 'Taxa de Serviço',
        text: `Taxa de ${Math.round(this.$store.state.serviceFeeAcomod * 100)}% cobrada com o intuito de garantir suporte e total segurança em sua estadia caso algum problema aconteça.`,
        buttons: [{ title: 'OK' }]
      })
    }
  },
  computed: {
    cardNumber () { return this.$store.state.creditCard.cardNumber },
    cardHolderName () { return this.$store.state.creditCard.cardHolderName },
    cardExpirationDate () { return this.$store.state.creditCard.cardExpirationDate },
    cardCVV () { return this.$store.state.creditCard.cardCVV },
    guestCPF () { return this.$store.state.reservaAcomod.guestCPF },
    guestCelular () { return this.$store.state.reservaAcomod.guestCelular },
    acomod () {
      return this.$store.state.acomod
    },
    etapaProgressed1 () {
      return this.$store.state.etapaReserva1ok === true ? 'font-weight: 600' : 'cursor: default'
    },
    etapaProgressed2 () {
      return this.$store.state.etapaReserva2ok === true ? 'font-weight: 600' : 'cursor: default'
    },
    etapaProgressed3 () {
      return this.$store.state.etapaReserva3ok === true ? 'font-weight: 600' : 'cursor: default'
    },
    imageH () {
      return supportsWebP ? this.acomod.images[0].HW : this.acomod.images[0].HJ
    },
    startDateFormatted () {
      let startDate = this.$store.state.reservaAcomod.startDate
      let dd = startDate.slice(0, 2)
      let mm = startDate.slice(3, 5)
      let yyyy = startDate.slice(6, 10)
      let mmLong = mm == '01' ? 'Jan' : mm == '02' ? 'Fev' : mm == '03' ? 'Mar' : mm == '04' ? 'Abr' : mm == '05' ? 'Mai' : mm == '06' ? 'Jun' : mm == '07' ? 'Jul' : mm == '08' ? 'Ago' : mm == '09' ? 'Set' : mm == '10' ? 'Out' : mm == '11' ? 'Nov' : mm == '12' ? 'Dez' : ''
      return dd + ' de ' + mmLong + ', ' + yyyy
    },
    endDateFormatted () {
      let endDate = this.$store.state.reservaAcomod.endDate
      let dd = endDate.slice(0, 2)
      let mm = endDate.slice(3, 5)
      let yyyy = endDate.slice(6, 10)
      let mmLong = mm == '01' ? 'Jan' : mm == '02' ? 'Fev' : mm == '03' ? 'Mar' : mm == '04' ? 'Abr' : mm == '05' ? 'Mai' : mm == '06' ? 'Jun' : mm == '07' ? 'Jul' : mm == '08' ? 'Ago' : mm == '09' ? 'Set' : mm == '10' ? 'Out' : mm == '11' ? 'Nov' : mm == '12' ? 'Dez' : ''
      return dd + ' de ' + mmLong + ', ' + yyyy
    },
    tipoAcomodTitle () {
      const path = this.acomod.tipoAcomod
      return path === 'Casa' ? 'da Casa' 
           : path === 'Apartamento' ? 'do Apartamento'
           : path === 'Rancho' ? 'do Rancho'
           : path === 'Chácara' ? 'da Chácara'
           : path === 'Pousada' ? 'da Pousada'
           : path === 'Camping' ? 'do Camping'
           : path === 'Sítio' ? 'do Sítio'
           : path === 'Fazenda' ? 'da Fazenda'
           : path === 'Hostel' ? 'do Hostel'
           : ''
    },
    tipoAcomodLimpeza () {
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
    },
  },
  watch: {
    cardNumber (value) { value !== '' ? this.cardNumberError = false : '' },
    cardHolderName (value) { value !== '' ? this.cardHolderNameError = false : '' },
    cardExpirationDate (value) { value !== '' ? this.cardExpirationDateError = false : '' },
    cardCVV (value) { value !== '' ? this.cardCvvError = false : '' },
    guestCPF (value) { value !== '' ? this.cpfError = false : '' },
    guestCelular (value) { value !== '' ? this.celularError = false : '' }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      firebase.firestore().collection('acomods').doc(vm.$store.state.acomod.acomodID).collection('visits').doc(vm.$store.state.visitID).update({ 
        wentToReservaPage: true
      })
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('m_isReservar', false)
    this.$store.dispatch('a_resetReservaAcomod')
    this.$store.commit('m_resetCreditCard')
    this.$store.state.concludedReservaAcomod = false
    next()
  }
}
</script>

<style scoped>
@import url('~/assets/css/main.css');

.reservar {
  display: flex;
  flex-flow: column;
  transition: all .27s cubic-bezier(.15,.97,.43,.93);
  
  /* ******* HEADER PROGRESS ******* */
  & .header-progress {
    position: relative;
    display: flex;
    align-content: center;
    align-items: center;
    height: 5rem;
    width: 100%;
    & .brand {
      position: absolute;
      left: 2%;
      & .__brand-img {
        cursor: pointer;
        width: 2.7rem;
        height: auto;
      }
    }
    & .progress {
      padding-left: 12%;
      display: flex;
      align-items: center;
      width: 100%;
      & .__item-progress {
        cursor: pointer;
        user-select: none;
        font-size: 14px;
      }
      & .__arrow-right {
        width: .7rem; 
        height: auto;
        margin: 0 1.1rem;
      }
    }
  }

  /* ******* BODY ******* */
  & .reserva-body {
    padding: 1.2rem 12% 4rem;
    display: flex;
    /* ******* FLEX LEFT ******* */
    & .flex-left {
      flex: 65%;
      & .__title {
        padding-bottom: 1rem;
        font-size: 32px;
        user-select: none;
      }
      & .__subtitle {
        padding-top: 2rem;
        font-size: 17px;
      }
      & .etapa-1-item {
        padding-top: 2rem;
        & .__subtitle {
          font-size: 18px;
          font-weight: 600;
        }
      }
      & .payment {
         margin-right: 30%;
        & .item-form {
          display: flex;
          flex-flow: column;
          margin: 2.6rem 0;
          & label {
            padding-bottom: .7rem;
            user-select: none;
            font-weight: 600;
            font-size: 16px;
          }
          & input {
            cursor: text;
            position: relative;
            width: 100%;
            font-size: 17px;
            font-weight: 400;
            background: white;
            color: var(--color01);
            padding: .9rem 0 .9rem .7rem;
            border: 1px solid rgb(222,222,222);
            outline: none;
            transition: .15s border ease;
          }
          & input:focus {
            border: 1px solid rgb(72,72,72) !important;
          }
          & select {
            width: 100%;
            font-size: 17px;
            font-weight: 400;
            background: white;
            color: var(--color01);
            padding: .9rem 0 .9rem .7rem;
            border: 1px solid rgb(222,222,222);
            outline: none;
            transition: .15s border ease;
          }
          & select:focus {
            border: 1px solid rgb(72,72,72) !important;
          }
        }
      }
    }
    /* ******* FLEX RIGHT ******* */
    & .flex-right {
      flex: 35%;
      max-width: 35%;
      align-self: flex-start;
      border: 1px solid rgb(222,222,222);
      & .__acomod-image {
        width: 100%;
        height: auto;
      }
      & .__acomod-title {
        margin: 0 1.3rem;
        padding: 1.2rem 0;
        font-size: 19px;
        font-weight: 600;
        border-bottom: 1px solid rgb(222,222,222);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & .detalhes-reserva-data {
        padding: .8rem 0;
        margin: 0 1.3rem;
        border-bottom: 1px solid rgb(222,222,222);
        & .detalhes-reserva-data_item {
          display: flex;
          align-items: center;
          padding: .3rem 0;
          & .__img {
            margin-right: .7rem;
            width: 1.65rem;
            height: auto;
          }
          & .__arrow-right-date {
            margin: 0 .7rem;
            width: .8rem;
            height: auto;
          }
        }
      }
      & .detalhes-reserva-valor {
        padding: .8rem 0;
        margin: 0 1.3rem;
        & .detalhes-reserva-valor_item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        & .detalhes-reserva-valor_item-total {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid rgb(222,222,222);
          & .__valor-total {
            font-size: 18px;
            font-weight: 600;
          }
        }
      }
    }
  }
  & .concluded-reserva {
    padding: 4rem 24%;
    display: flex;
    flex-flow: column;
    align-items: center;
    & .__img {
      width: 4.8rem;
      height: auto;
    }
    & .__title {
      text-align: center;
      font-size: 37px;
      padding: 1.2rem 0 .7rem 0;
    }
    & .__subtitle {
      padding-top: 2rem;
      text-align: center;
      font-size: 18px;
      font-weight: 600;
    }
    & .__text {
      text-align: center;
      font-size: 17px;
    }
  }
}

.__next-btn {
  position: relative;
  margin-top: 3rem;
  padding: 0 1.4rem;
  min-height: 3rem;
  font-size: 17px;
  font-weight: 600;
  background: var(--colorAcomod);
  color: white;
  border-radius: 5px;
  line-height: 2.9rem;
  transition: .3s all ease;
}

.has-error {
  border: 1px solid #F31431 !important;
}

</style>