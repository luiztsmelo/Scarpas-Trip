<template>
  <div class="reservar">
    


    <!-- ******* HEADER PROGRESS ******* -->
    <div class="header-progress" v-if="!$store.state.concludedReservaAcomod">

      <nuxt-link to="/" class="brand">
        <img class="__brand-img" src="../../../static/brand.svg" draggable="false">
      </nuxt-link>

      <div class="progress">
        <h3 class="__item-progress" :style="etapaProgressed1" @click="backEtapa1">1. Revisar regras {{ tipoAcomodD }}</h3>
        
        <h3 class="__arrow-right">→</h3>

        <h3 class="__item-progress" :style="etapaProgressed2" @click="backEtapa2">2. Mensagem</h3>

        <h3 class="__arrow-right">→</h3>

        <h3 class="__item-progress" :style="etapaProgressed3" @click="backEtapa3">3. Detalhes sobre o pagamento</h3>
      </div>

    </div><!-- ******* HEADER PROGRESS ******* -->




    <div class="reserva-body" v-if="!$store.state.concludedReservaAcomod">

      <!-- ******* Flex Left ******* -->
      <div class="flex-left">



        <!-- ******* ETAPA 1 ******* -->
        <div class="etapa-1" v-if="$store.state.reservaAcomodDesktop1 === true">

          <h1 class="__title">Revisar regras {{ tipoAcomodD }}</h1>


          <div class="etapa-1-item">
            <h3 class="__subtitle">Horário para Check-in:</h3>
            <!-- <h3>{{ 'Entre ' + acomod.checkinFrom + ' e ' + acomod.checkinTo }}</h3> MUDAR ISSO AQUI-->
          </div>
        

          <div class="etapa-1-item" v-show="!acomod.allowFestas || !acomod.allowPets || !acomod.allowBabys || !acomod.allowFumar">
            <h3 class="__subtitle">Nesta casa não é permitido:</h3>
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


          <button class="__next-btn" type="button" @click="nextBtn1">Concordar</button>

        </div><!-- ******* ETAPA 1 ******* -->




        <!-- ******* ETAPA 2 ******* -->
        <div class="etapa-2" v-if="$store.state.reservaAcomodDesktop2 === true">

          <h1 class="__title">Conte a {{ host.firstName }} sobre sua viagem</h1>


          <div class="message">
            
            <h3 class="__subtitle">Ajude {{ host.firstName }} a preparar {{ tipoAcomodA }} para sua estadia respondendo às suas perguntas</h3>


            <div class="item-form">
              <textarea
                :class="[ messageError ? 'has-error' : '' ]"
                v-model="reservaAcomod.message"
                maxlength="2000"
                rows="4"
                placeholder="Escreva sua resposta aqui">
              </textarea>
            </div>

          </div>


          <button class="__next-btn" type="button" @click="nextBtn2">Continuar</button>

        </div><!-- ******* ETAPA 2 ******* -->




        <!-- ******* ETAPA 3 ******* -->
        <div class="etapa-3" v-if="$store.state.reservaAcomodDesktop3 === true">

          <h1 class="__title">Detalhes sobre o pagamento</h1>


          <div class="payment">

            <h3 class="__subtitle">{{ user.firstName }}, você somente será cobrado se {{ host.firstName }} aceitar seu pedido de reserva. Caso aceite, para sua segurança nós só liberaremos o pagamento para ele no dia seguinte de seu check-in, {{ dayAfterCheckin }}.</h3>


            <!-- PAYMENT METHOD -->
            <div class="item-form" style="padding-top: 1.2rem">
              <label>Pagar com</label>
              <select v-model="reservaAcomod.paymentMethod">
                <option selected :value="'credit_card'">Cartão de Crédito</option>
                <option :value="'boleto'">Boleto</option>
              </select>
            </div><!-- PAYMENT METHOD -->


            <!-- NAME -->
            <div class="item-form">
              <label :class="[ cardHolderNameError || nameError ? 'has-error-label' : '' ]">{{ reservaAcomod.paymentMethod === 'credit_card' ? 'Nome impresso no Cartão' : 'Nome Completo'}}</label>
              <input
                :class="[ cardHolderNameError || nameError ? 'has-error' : '' ]"
                type="text" pattern="[A-Za-z]"
                @keypress="keyEnterName"
                v-model="reservaAcomod.paymentMethod === 'credit_card' ? creditCard.cardHolderName : $store.state.customer.name">
            </div><!-- NAME -->


            <!-- ************** CREDIT CARD ************** -->
            <div class="credit-card" v-show="reservaAcomod.paymentMethod === 'credit_card'">

              <!-- CARD NUMBER -->
              <div class="item-form">
                <label :class="[ cardNumberError ? 'has-error-label' : '' ]">Número do Cartão</label>
                <masked-input
                  ref="cardNumber"
                  :style="{ backgroundImage: 'url(' + cardBrand + ')', backgroundPosition: 'left center', backgroundRepeat: 'no-repeat', backgroundSize: '34px', paddingLeft: cardType !== null ? '48px' : '' }"
                  :class="[ cardNumberError ? 'has-error' : '' ]"
                  type="tel"
                  v-model="$store.state.creditCard.cardNumber"
                  :mask="[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]"
                  :guide="false"
                  placeholder="0000 0000 0000 0000">
                </masked-input><!-- CARD NUMBER -->
              </div>

           
              <div style="display:flex; justify-content:space-between">
                
                <!-- CARD EXPIRATION -->
                <div class="item-form" style="flex: 50%; padding-right:.7rem">
                  <label :class="[ cardExpirationDateError ? 'has-error-label' : '' ]">Validade</label>
                  <masked-input
                    ref="cardExpirationDate"
                    :class="[ cardExpirationDateError ? 'has-error' : '' ]"
                    type="tel"
                    v-model="$store.state.creditCard.cardExpirationDate"
                    :mask="[/\d/, /\d/, '/', /\d/, /\d/]"
                    :guide="false"
                    placeholder="MM / AA">
                  </masked-input>
                </div><!-- CARD EXPIRATION -->

                <!-- CVV -->
                <div class="item-form" style="flex:50%; padding-left:.7rem">
                  <label :class="[ cardCvvError ? 'has-error-label' : '' ]">CVV</label>
                  <masked-input
                    ref="cvv"
                    :class="[ cardCvvError ? 'has-error' : '' ]"
                    type="tel"
                    v-model="$store.state.creditCard.cardCVV"
                    :mask="[/\d/, /\d/, /\d/, /\d/]"
                    :guide="false"
                    placeholder="123">
                  </masked-input>
                </div><!-- CVV -->

              </div>

            </div>
            <!-- ************** CREDIT CARD ************** -->



            <!-- ************** CUSTOMER ************** -->
            <div class="customer">

              <div style="display:flex; justify-content:space-between">

                <!-- CPF -->
                <div class="item-form" style="flex:50%; padding-right:.7rem">
                  <label :class="[ cpfError ? 'has-error-label' : '' ]">CPF</label>
                  <masked-input
                    ref="cpf"
                    :class="[ cpfError ? 'has-error' : '' ]"
                    type="tel"
                    v-model="$store.state.customer.cpf"
                    :mask="[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]"
                    :guide="false"
                    placeholder="000.000.000-00">
                  </masked-input>
                </div><!-- CPF -->


                <!-- CELULAR -->
                <div class="item-form" style="flex:50%; padding-left:.7rem">
                  <label :class="[ celularError ? 'has-error-label' : '' ]">Celular</label>
                  <masked-input
                    ref="celular"
                    :class="[ celularError ? 'has-error' : '' ]"
                    type="tel"
                    v-model="$store.state.customer.celular"
                    :mask="['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                    :guide="false"
                    placeholder="(  )          ">
                  </masked-input>
                </div><!-- CELULAR -->

              </div>

            </div><!-- ************** CUSTOMER ************** -->


            
            <!-- ************** BILLING ************** -->
            <div class="billing" v-show="reservaAcomod.paymentMethod === 'credit_card'">

              <div class="flex" style="display:flex; justify-content:space-between">
                
                <!-- CEP -->
                <div class="item-form" style="flex:50%; padding-right:.7rem">
                  <label :class="[ zipcodeError ? 'has-error-label' : '' ]">CEP</label>
                  <masked-input
                    ref="zipcode"
                    :class="[ zipcodeError ? 'has-error' : '' ]"
                    type="tel"
                    v-model="$store.state.customer.zipcode"
                    :mask="[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]"
                    :guide="false"
                    placeholder="00000-000">
                  </masked-input>
                </div><!-- CEP -->


                <!-- ENDEREÇO -->
                <div class="item-form" style="flex:50%; padding-left:.7rem">
                  <label :class="[ streetError ? 'has-error-label' : '' ]">Rua</label>
                  <input
                    ref="street"
                    :class="[ streetError ? 'has-error' : '' ]"
                    type="text"
                    @keypress="keyEnterStreet"
                    v-model="$store.state.customer.street"
                    placeholder="Endereço">
                </div><!-- ENDEREÇO -->

              </div>

              
              <div class="flex" style="display:flex; justify-content:space-between">

                <!-- NÚMERO -->
                <div class="item-form" style="flex:50%; padding-right:.7rem">
                  <label :class="[ streetNumberError ? 'has-error-label' : '' ]">Número</label>
                  <masked-input
                    ref="streetNumber"
                    :class="[ streetNumberError ? 'has-error' : '' ]"
                    type="tel"
                    @keypress="keyEnterStreetNumber"
                    v-model="$store.state.customer.street_number"
                    :mask="[/\d/, /\d/, /\d/, /\d/]"
                    :guide="false">
                  </masked-input>
                </div><!-- NÚMERO -->


                <!-- BAIRRO -->
                <div class="item-form" style="flex:50%; padding-left:.7rem">
                  <label :class="[ neighborhoodError ? 'has-error-label' : '' ]">Bairro</label>
                  <input
                    ref="bairro"
                    :class="[ neighborhoodError ? 'has-error' : '' ]"
                    type="text"
                    @keypress="keyEnterBairro"
                    v-model="$store.state.customer.neighborhood">
                </div><!-- BAIRRO -->

              </div>

              <div class="flex" style="display:flex; justify-content:space-between; align-items:center">

                <!-- CIDADE -->
                <div class="item-form" style="flex:50%; padding-right:.7rem">
                  <label :class="[ cityError ? 'has-error-label' : '' ]">Cidade</label>
                  <input
                    ref="city"
                    :class="[ cityError ? 'has-error' : '' ]"
                    type="text"
                    @keypress="keyEnterCity"
                    v-model="$store.state.customer.city">
                </div><!-- CIDADE -->


                <!-- ESTADO -->
                <div class="item-form" style="flex:50%; padding-left:.7rem">
                  <label :class="[ stateError ? 'has-error-label' : '' ]">Estado</label>
                  <select ref="state" :class="[ stateError ? 'has-error' : '' ]" v-model="$store.state.customer.state">
                    <option v-for="state in states" :value="state.value">{{ state.name }}</option>
                  </select>
                </div><!-- ESTADO -->

              </div>

            </div><!-- ************** BILLING ************** -->


          </div><!-- Payment -->
          

          <button class="__next-btn" type="button" style="background: #FFA04F" @click="concluirReserva">Concluir Pedido</button>


        </div><!-- ******* ETAPA 3 ******* -->
        

      </div><!-- ******* Flex Left ******* -->






      <!-- ******* Flex Right ******* -->
      <div class="flex-right">

        <progressive-background  class="__acomod-image" :src="imageH" :placeholder="acomod.images[0].L" :aspect-ratio="2/3"/>

        <div class="card-body">

          <h1 class="__acomod-title">{{ acomod.title }}</h1>
          
          <div class="detalhes-reserva-data">

            <div class="detalhes-reserva-data_item">
              <img src="../../../assets/img/calendar.svg" class="__img" style="transform: scale(.91)">
              <h3 style="font-size:16px">{{ periodoReserva }}</h3>
            </div>

            <div class="detalhes-reserva-data_item">
              <img src="../../../assets/img/guests.svg" class="__img">
              <h3 style="font-size:16px">{{ reservaAcomod.totalHospedes == '1' ? reservaAcomod.totalHospedes + ' hóspede' : reservaAcomod.totalHospedes + ' hóspedes' }}</h3>
            </div>

          </div>


          <div class="detalhes-reserva-valor" v-if="reservaAcomod.valorReservaTotal !== null">

            <div class="detalhes-reserva-valor_item-total" style="padding-top: .8rem">
              <h3 style="font-size:17px">Total</h3>
              <h3 class="__valor-total">R${{ reservaAcomod.valorReservaTotal.toLocaleString() }}</h3>
            </div>

            <span class="__ver-detalhes" @click="$modal.show('detalhes-valor-modal')">Detalhes do valor</span>

            <detalhes-valor/>

          </div>

        </div>

      </div><!-- ******* Flex Right ******* -->


    </div>



    <div class="concluded-reserva" v-if="$store.state.concludedReservaAcomod">

      <img class="__img" src="../../../assets/img/brand.svg">

      <h1 class="__title">Pedido de reserva enviado</h1>

      <h3 class="__text">
        {{ host.firstName }} irá analisar seu pedido e dentro de 24h você receberá um e-mail e SMS com a confirmação de sua reserva, juntamente com as informações de contato do anunciante.
      </h3>

      <h3 class="__subtitle">Código da Reserva</h3>
      <h3 class="__text">{{ reservaAcomod.reservaID }}</h3>

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
import detalhesValor from '@/components/reserva-acomod/detalhesValor'
import { reservaAcomod } from '@/mixins/reservaAcomod'
import { states } from '@/mixins/statesBrazil'
import { tipoAcomod } from '@/mixins/tipoAcomod'
import valid from 'card-validator'
import CPF from 'gerador-validador-cpf'
import scrollIntoView from 'scroll-into-view'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

export default {
  components: { MaskedInput, detalhesValor },
  mixins: [ reservaAcomod, states, tipoAcomod ],
  head () {
    return {
      title: 'Reservar: ' + this.acomod.title
    }
  },
  middleware: 'reservaValidate',
  transition: 'opacity',
  data () {
    return {
    }
  },
  methods: {
    scrollTop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    keyEnterName () {
      if (event.key === 'Enter') {
        if (this.reservaAcomod.paymentMethod === 'credit_card') {
          scrollIntoView(this.$refs.cardNumber.$el)
          this.$refs.cardNumber.$el.focus()
        } else {
          scrollIntoView(this.$refs.cpf.$el)
          this.$refs.cpf.$el.focus()
        }
      }
    },
    keyEnterStreet () {
      if (event.key === 'Enter') {
        scrollIntoView(this.$refs.streetNumber.$el)
        this.$refs.streetNumber.$el.focus() 
      }  
    },
    keyEnterStreetNumber () {
      if (event.key === 'Enter') {
        this.$refs.bairro.focus()
      } 
    },
    keyEnterBairro () {
      if (event.key === 'Enter') {
        scrollIntoView(this.$refs.city)
        this.$refs.city.focus() 
      }
    },
    keyEnterCity () {
      if (event.key === 'Enter') {
        scrollIntoView(this.$refs.state)
        this.$refs.state.focus()
      }
    },
    nextBtn1 () {
      this.$store.state.etapaReserva2ok = true, this.$store.commit('m_reservaAcomodDesktop1', false), this.$store.commit('m_reservaAcomodDesktop2', true)
    },
    nextBtn2 () {
      if (this.reservaAcomod.message.length > 0) {
        this.$store.state.etapaReserva3ok = true, this.$store.commit('m_reservaAcomodDesktop2', false), this.$store.commit('m_reservaAcomodDesktop3', true)
      } else {
        this.messageError = true
      }
    },
    async concluirReserva () {
      try {
        this.$store.commit('m_loader', true)

        this.reservaAcomod.hostID = this.acomod.hostID
        this.reservaAcomod.guestID = this.user.userID

        await firebase.firestore().collection('users').doc(this.user.userID).update({
          celular: '+55' + this.celular.replace(/[^0-9\.]+/g, '')
        })

        let result = null

        if (this.reservaAcomod.paymentMethod === 'credit_card') {

          /* Checar se todos os dados foram preenchidos */
          if (valid.number(this.cardNumber).isValid && valid.expirationDate(this.cardExpirationDate).isValid && valid.cvv(this.cardCVV).isValid && this.cardHolderName !== '' && CPF.validate(this.cpf) && this.cpf.length === 14 && this.celular.length === 15 && this.zipcode.length === 9 && this.$store.state.validZipcode && this.street !== '' && this.streetNumber !== '' && this.neighborhood !== '' && this.city !== '' && this.state !== '') {

            /* Criar transação no Pagarme e reserva na Firestore */
            result = await firebase.functions().httpsCallable('newReservaAcomod')({
              reservaAcomod: this.reservaAcomod,
              creditCard: this.creditCard,
              customer: this.customer,
              acomod: this.acomod,
              host: this.host,
              visitID: this.$store.state.visitID
            })
            
          } else { /* Há dados incompletos */
            this.$store.commit('m_loader', false)
            this.cardHolderName.length < 3 ? this.cardHolderNameError = true : this.cardHolderNameError = false
            !valid.number(this.cardNumber).isValid ? this.cardNumberError = true : this.cardNumberError = false
            !valid.expirationDate(this.cardExpirationDate).isValid ?  this.cardExpirationDateError = true :  this.cardExpirationDateError = false
            !valid.cvv(this.cardCVV).isValid ? this.cardCvvError = true : this.cardCvvError = false
            this.cpf.length < 14 || !CPF.validate(this.cpf) ? this.cpfError = true : this.cpfError = false
            this.celular.length < 15 ? this.celularError = true : this.celularError = false
            this.zipcode.length < 9 || !this.$store.state.validZipcode ? this.zipcodeError = true : this.zipcodeError = false
            this.street === null || this.street === '' ? this.streetError = true : this.streetError = false
            this.streetNumber === null || this.streetNumber === '' ? this.streetNumberError = true : this.streetNumberError = false
            this.neighborhood === null || this.neighborhood === '' ? this.neighborhoodError = true : this.neighborhoodError = false
            this.city === null || this.city === '' ? this.cityError = true : this.cityError = false
            this.state === null || this.state === '' ? this.stateError = true : this.stateError = false
          }
        } else {
          /* Checar se todos os dados foram preenchidos */
          if (this.name !== '' && CPF.validate(this.cpf) && this.cpf.length === 14 && this.celular.length === 15) {

            /* Criar transação no Pagarme e reserva na Firestore */
            result = await firebase.functions().httpsCallable('newReservaAcomod')({
              reservaAcomod: this.reservaAcomod,
              customer: this.customer,
              acomod: this.acomod,
              host: this.host,
              visitID: this.$store.state.visitID
            })
            
          } else { /* Há dados incompletos */
            this.$store.commit('m_loader', false)
            this.name === '' ? this.nameError = true : this.nameError = false
            this.cpf.length < 14 || !CPF.validate(this.cpf) ? this.cpfError = true : this.cpfError = false
            this.celular.length < 15 ? this.celularError = true : this.celularError = false
          }
        }

      this.reservaAcomod.reservaID = await result.data.reservaID

      /* Resetar dados do cartão de crédito */
      this.$store.commit('m_resetCreditCard')

      this.$store.state.concludedReservaAcomod = true
      this.scrollTop()
      this.$store.commit('m_loader', false)

      } catch (err) {
        console.log(err)
        this.$store.commit('m_loader', false)
      }
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
    }
  },
  computed: {
    /* ******************** PROGRESS ******************** */
    etapaProgressed1 () {
      return this.$store.state.etapaReserva1ok === true ? 'font-weight: 600' : 'cursor: default'
    },
    etapaProgressed2 () {
      return this.$store.state.etapaReserva2ok === true ? 'font-weight: 600' : 'cursor: default'
    },
    etapaProgressed3 () {
      return this.$store.state.etapaReserva3ok === true ? 'font-weight: 600' : 'cursor: default'
    },

    /* ******************** IMAGES ******************** */
    imageH () {
      return supportsWebP ? this.acomod.images[0].HW : this.acomod.images[0].HJ
    },

    /* ******************** DATES ******************** */
    periodoReserva () {
      if (this.reservaAcomod.periodoReserva !== null) {
        return dayjs(this.reservaAcomod.periodoReserva.start).format('ddd, DD MMM YYYY') + ' / ' + dayjs(this.reservaAcomod.periodoReserva.end).format('ddd, DD MMM YYYY')
      }
    }
  },
  watch: {
    message (value) { value !== '' ? this.messageError = false : '' },
    cardHolderName (value) { value !== '' ? this.cardHolderNameError = false : '' },
    name (value) { value !== '' ? this.nameError = false : '' },
    cardNumber (value) {
      let cardNumber = valid.number(value)
      cardNumber.isPotentiallyValid ? this.cardNumberError = false : this.cardNumberError = true
      if (cardNumber.card) {
        if (cardNumber.card.type === 'american-express' ? value.length === 18 : value.length === 19) {
          if (cardNumber.isValid) {
            this.cardNumberError = false
            this.$nextTick(() => {
              scrollIntoView(this.$refs.cardExpirationDate.$el)
              this.$refs.cardExpirationDate.$el.focus()
            })
          } else {
            this.cardNumberError = true
          }
        }
        this.$store.state.cardType = cardNumber.card.type
        this.$store.state.cardTypeNice = cardNumber.card.niceType
      }
    },
    cardExpirationDate (value) {
      let firstDigit = value.charAt(0)
      firstDigit > 1 ? this.$store.state.creditCard.cardExpirationDate = `0${firstDigit} / ` : ''
      let cardExpirationDate = valid.expirationDate(value)
      cardExpirationDate.isPotentiallyValid ? this.cardExpirationDateError = false : this.cardExpirationDateError = true
      cardExpirationDate.isValid ? this.$refs.cvv.$el.focus() : ''
    },
    cardCVV (value) {
      let cardCVV = valid.cvv(value)
      cardCVV.isPotentiallyValid ? this.cardCvvError = false : this.cardCvvError = true
      if (this.$store.state.cardType !== 'american-express') {
        if (value.length === 3 && cardCVV.isValid) {
          scrollIntoView(this.$refs.cpf.$el)
          this.$refs.cpf.$el.focus()
        }
      } else {
        if (value.length === 4 && cardCVV.isValid) {
          scrollIntoView(this.$refs.cpf.$el)
          this.$refs.cpf.$el.focus()
        }
      }
    },
    cpf (value) {
      value !== '' ? this.cpfError = false : '' 
      if (value.length === 14) {
        if (CPF.validate(value)) {
          this.cpfError = false
          this.$refs.celular.$el.focus()
        } else {
          this.cpfError = true
        }
      }
    },
    celular (value) { 
      value !== '' ? this.celularError = false : '' 
      if (value.length === 15 && this.reservaAcomod.paymentMethod === 'credit_card') {
        scrollIntoView(this.$refs.zipcode.$el)
        this.$refs.zipcode.$el.focus()
      }
    },
    async zipcode (value) {
      if (value.length === 9) {
        try {
          this.$store.commit('m_loader', true)
          const zipcode = this.zipcode.replace(/[^0-9\.]+/g, '')
          const zipcodeData = await this.$axios.$get('https://api.pagar.me/1/zipcodes/' + zipcode)
          this.$store.state.customer.state = zipcodeData.state
          this.$store.state.customer.city = zipcodeData.city
          this.$store.state.customer.neighborhood = zipcodeData.neighborhood
          this.$store.state.customer.street = zipcodeData.street
          this.$store.state.validZipcode = true
          this.$store.commit('m_loader', false)
          this.$nextTick(() => {
            if (this.street === null || this.street === '') {
              scrollIntoView(this.$refs.street)
              this.$refs.street.focus()
            } else {
              scrollIntoView(this.$refs.streetNumber.$el)
              this.$refs.streetNumber.$el.focus() 
            }
          })
        } catch (err) {
          console.log(err)
          this.zipcodeError = true
          this.$store.state.validZipcode = false
          this.$store.commit('m_loader', false)
        }
      } else {
        this.zipcodeError = false
      }
    },
    street (value) { value !== null ? this.streetError = false : null },
    streetNumber (value) { value !== null ? this.streetNumberError = false : null },
    neighborhood (value) { value !== null ? this.neighborhoodError = false : null },
    city (value) { value !== null ? this.cityError = false : null },
    state (value) { value !== null ? this.stateError = false : null }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      !vm.$store.state.isOnline ? vm.$modal.show('offline-modal') : ''
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
        width: 2.6rem;
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
        margin: 0 1rem;
      }
    }
  }

  /* ******* BODY ******* */
  & .reserva-body {
    padding: 1.2rem 12% 5rem;
    display: flex;
    /* ******* FLEX LEFT ******* */
    & .flex-left {
      flex: 64%;
      & .__title {
        padding-bottom: 1.5rem;
        font-size: 32px;
        user-select: none;
        margin-right: 25%;
      }
      & .__subtitle {
        padding-top: .5rem;
        font-size: 16px;
      }
      & .etapa-1-item {
        padding-top: 2rem;
        & .__subtitle {
          font-size: 17px;
          font-weight: 600;
        }
      }
      & .message {
        margin-right: 25%;
        & .clique-aqui {
          cursor: pointer;
        }
        & .clique-aqui:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
      & .payment {
        display: flex;
        flex-flow: column;
        margin-right: 25%;
      }
      & .item-form {
        display: flex;
        flex-flow: column;
        margin: 1.5rem 0;
        & label {
          user-select: none;
          font-weight: 500;
          font-size: 14px;
        }
        & input {
          cursor: text;
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
        & input:focus {
          border-bottom: 1px solid rgb(42,42,42) !important;
        }
        & input:hover {
          border-bottom: 1px solid rgb(42,42,42) !important;
        }
        & select {
          width: 100%;
          font-size: 17px;
          font-weight: 400;
          background: white;
          color: var(--color01);
          padding: 1rem 0;
          border: none;
          border-bottom: 1px solid rgb(222,222,222);
          outline: none;
          transition: .2s all ease;
        }
        & select:focus {
          border-bottom: 1px solid var(--color01) !important;
        }
        & select:hover {
          border-bottom: 1px solid var(--color01) !important;
        }
        & textarea {
          width: 100%;
          min-width: 100%;
          max-width: 100%;
          font-size: 17px;
          font-weight: 400;
          line-height: 26px;
          background: white;
          padding: .8rem;
          border: 1px solid rgb(222,222,222);
          outline: none;
        }
        & textarea:focus {
          border: 1px solid var(--color01) !important;
        }
      }
    }
    /* ******* FLEX RIGHT ******* */
    & .flex-right {
      flex: 36%;
      max-width: 36%;
      align-self: flex-start;
      & .__acomod-image {
        width: 100%;
        height: auto;
      }
      & .card-body {
        border-left: 1px solid rgb(222,222,222);
        border-right: 1px solid rgb(222,222,222);
        border-bottom: 1px solid rgb(222,222,222);
        & .__acomod-title {
          margin: 0 1.3rem;
          padding: 1.2rem 0;
          font-size: 18px;
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
              margin-right: .6rem;
              width: 1.5rem;
              height: auto;
            }
          }
        }
        & .detalhes-reserva-valor {
          padding-bottom: .8rem;
          margin: 0 1.3rem;
          & .detalhes-reserva-valor_item-total {
            display: flex;
            justify-content: space-between;
            & .__valor-total {
              font-size: 18px;
              font-weight: 600;
            }
          }
          & .__ver-detalhes {
            user-select: none;
            cursor: pointer;
            font-size: 15px;
            font-weight: 500;
            color: var(--colorAcomod);
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
      width: 54px;
      height: auto;
    }
    & .__title {
      text-align: center;
      font-size: 36px;
      padding: .8rem 0 .7rem 0;
    }
    & .__subtitle {
      padding-top: 2rem;
      text-align: center;
      font-size: 18px;
      font-weight: 600;
    }
    & .__text {
      text-align: center;
    }
  }
}

.__next-btn {
  position: relative;
  margin-top: 1rem;
  padding: 0 1.5rem;
  height: 3.2rem;
  font-size: 17px;
  font-weight: 600;
  background: #50CB9D;
  color: white;
  border-radius: 5px;
}

.has-error-label {
  color: #F31431 !important;
}
.has-error {
  color: #F31431 !important;
  border-bottom: 1px solid #F31431 !important;
}

</style>