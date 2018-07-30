<template>
  <div class="reservar" v-if="reservaAcomod.periodoReserva !== null">
    


    <!-- ******* HEADER PROGRESS ******* -->
    <div class="header-progress" v-if="!$store.state.concludedReservaAcomod">

      <nuxt-link to="/" class="brand">
        <img class="__brand-img" src="../../../static/brand.svg" draggable="false">
      </nuxt-link>

      <div class="progress">
        <h3 class="__item-progress" :style="etapaProgressed1" @click="backEtapa1">1. Revisar Regras {{ tipoAcomodTitle }}</h3>
        
        <h3 class="__arrow-right">→</h3>

        <h3 class="__item-progress" :style="etapaProgressed2" @click="backEtapa2">2. Mensagem</h3>

        <h3 class="__arrow-right">→</h3>

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


          <button class="__next-btn" type="button" @click="nextBtn1">Concordar e Continuar</button>

        </div><!-- ******* ETAPA 1 ******* -->




        <!-- ******* ETAPA 2 ******* -->
        <div class="etapa-2" v-if="$store.state.reservaAcomodDesktop2 === true">

          <h1 class="__title">Mensagem para {{ acomod.proprietario.split(' ')[0] }}</h1>


          <div class="message">

            <h3 class="__subtitle">
              Para sua segurança, somente divulgaremos as informações de contato do anunciante após ele confirmar seu pedido de reserva. Se precisar de uma resposta dele antes de decidir se irá concluir o pedido ou não,
              <span class="clique-aqui" @click="$modal.show('ask-acomod-modal')"> clique aqui</span>.
            </h3>
            
            <h3 class="__subtitle">Diga</h3>


            <div class="item-form">
              <label>Sua mensagem:</label>
              <textarea
                :class="[ messageError ? 'has-error' : '' ]"
                v-model="reservaAcomod.message"
                maxlength="2000"
                rows="5"
                :placeholder="'Olá, ' + acomod.proprietario.split(' ')[0] + '! Não vejo a hora de conhecer Capitólio.'">
              </textarea>
            </div>

          </div>


          <button class="__next-btn" type="button" @click="nextBtn2">Continuar</button>

        </div><!-- ******* ETAPA 2 ******* -->




        <!-- ******* ETAPA 3 ******* -->
        <div class="etapa-3" v-if="$store.state.reservaAcomodDesktop3 === true">

          <h1 class="__title">Pagamento e Confirmação</h1>


          <div class="payment">

            <h3 class="__subtitle">Você somente será cobrado caso {{ acomod.proprietario.split(' ')[0] }} confirme seu pedido de reserva. Para sua segurança, só liberaremos o pagamento para ele no dia seguinte de seu check-in, {{ dayAfterCheckin }}. Não se preocupe, seus dados estarão em total sigilo.</h3>


            <!-- PAYMENT METHOD -->
            <div class="item-form">
              <label>Pagar com</label>
              <select v-model="reservaAcomod.paymentMethod">
                <option selected :value="'credit_card'">Cartão de Crédito</option>
                <option :value="'boleto'">Boleto</option>
              </select>
            </div><!-- PAYMENT METHOD -->


            <!-- NAME -->
            <div class="item-form">
              <label>{{ reservaAcomod.paymentMethod === 'credit_card' ? 'Nome impresso no Cartão' : 'Nome Completo'}}</label>
              <input
                :class="[ cardHolderNameError || guestNameError ? 'has-error' : '' ]"
                type="text" pattern="[A-Za-z]"
                v-model="reservaAcomod.paymentMethod === 'credit_card' ? $store.state.creditCard.cardHolderName : reservaAcomod.guestName">
            </div><!-- NAME -->


            <!-- ************** CREDIT CARD ************** -->
            <div class="credit-card" v-show="reservaAcomod.paymentMethod === 'credit_card'">

              <div class="item-form">
                <label>Dados do Cartão</label>

                <!-- CARD NUMBER -->
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
                </masked-input><!-- CARD NUMBER -->


                
                <div class="flex" style="display:flex">

                  <!-- CARD EXPIRATION -->
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
                  </masked-input><!-- CARD EXPIRATION -->


                  <!-- CVV -->
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
                  </masked-input><!-- CVV -->

                </div>

              </div>
            </div><!-- ************** CREDIT CARD ************** -->



            <!-- ************** CUSTOMER ************** -->
            <div class="customer">

              <div class="flex" style="display:flex; justify-content:space-between">

                <!-- CPF -->
                <div class="item-form" style="margin:0">
                  <label>CPF</label>
                  <masked-input
                    :class="[ cpfError ? 'has-error' : '' ]"
                    type="tel"
                    v-model="reservaAcomod.guestCPF"
                    :mask="[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]"
                    :guide="false"
                    placeholder="___.___.___-__">
                  </masked-input>
                </div><!-- CPF -->


                <!-- CELULAR -->
                <div class="item-form" style="margin:0">
                  <label>Celular</label>
                  <masked-input
                    :class="[ celularError ? 'has-error' : '' ]"
                    type="tel"
                    v-model="reservaAcomod.guestCelular"
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
                <div class="item-form">
                  <label>CEP</label>
                  <masked-input
                    :class="[ zipcodeError ? 'has-error' : '' ]"
                    type="tel"
                    v-model="reservaAcomod.billing.zipcode"
                    :mask="[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]"
                    :guide="false"
                    placeholder="_____-___">
                  </masked-input>
                </div><!-- CEP -->


                <!-- ENDEREÇO -->
                <div class="item-form">
                  <label>Endereço</label>
                  <input
                    :class="[ streetError ? 'has-error' : '' ]"
                    type="text" 
                    v-model="reservaAcomod.billing.street">
                </div><!-- ENDEREÇO -->

              </div>

              
              <div class="flex" style="display:flex; justify-content:space-between">

                <!-- NÚMERO -->
                <div class="item-form" style="margin:0">
                  <label>Número</label>
                  <masked-input
                    :class="[ streetNumberError ? 'has-error' : '' ]"
                    type="tel"
                    v-model="reservaAcomod.billing.street_number"
                    :mask="[/\d/, /\d/, /\d/, /\d/]"
                    :guide="false">
                  </masked-input>
                </div><!-- NÚMERO -->


                <!-- BAIRRO -->
                <div class="item-form" style="margin:0">
                  <label>Bairro</label>
                  <input
                    :class="[ neighborhoodError ? 'has-error' : '' ]"
                    type="text" 
                    v-model="reservaAcomod.billing.neighborhood">
                </div><!-- BAIRRO -->

              </div>

              <div class="flex" style="display:flex; justify-content:space-between">

                <!-- CIDADE -->
                <div class="item-form">
                  <label>Cidade</label>
                  <input
                    :class="[ cityError ? 'has-error' : '' ]"
                    type="text" 
                    v-model="reservaAcomod.billing.city">
                </div><!-- CIDADE -->


                <!-- ESTADO -->
                <div class="item-form">
                  <label>Estado</label>
                  <select :class="[ stateError ? 'has-error' : '' ]" v-model="reservaAcomod.billing.state">
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
              <h3 style="font-size:15px">{{ periodoReserva }}</h3>
            </div>

            <div class="detalhes-reserva-data_item">
              <img src="../../../assets/img/guests.svg" class="__img">
              <h3 style="font-size:15px">{{ reservaAcomod.totalHospedes == '1' ? reservaAcomod.totalHospedes + ' hóspede' : reservaAcomod.totalHospedes + ' hóspedes' }}</h3>
            </div>

          </div>


          <div class="detalhes-reserva-valor" v-if="reservaAcomod.valorReservaTotal !== null">

            <div class="detalhes-reserva-valor_item-total" style="padding-top: .8rem">
              <h3>Total</h3>
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
        {{ acomod.proprietario.split(' ')[0] }} irá analisar seu pedido e dentro de 24h você receberá um e-mail e SMS com a confirmação de sua reserva, juntamente com as informações de contato do anunciante.
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
import valid from 'card-validator'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

export default {
  components: { MaskedInput, detalhesValor },
  mixins: [ reservaAcomod, states ],
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

        const reservaAcomod = this.$store.state.reservaAcomod
        const creditCard = this.$store.state.creditCard
        const user = this.$store.state.user

        reservaAcomod.requested = new Date().getTime()
        reservaAcomod.acomodID = this.acomod.acomodID

        reservaAcomod.hostID = this.acomod.userID
        reservaAcomod.hostEmail = this.acomod.email
        reservaAcomod.hostName = this.acomod.proprietario
        reservaAcomod.hostPhoto = this.acomod.photoURL
        reservaAcomod.hostCelular = this.acomod.celular
        reservaAcomod.whatsAppHostHREF = this.whatsAppHostHREF

        reservaAcomod.guestID = user.userID
        reservaAcomod.guestEmail = user.email
        reservaAcomod.guestPhoto = user.photoURL

        reservaAcomod.limpezaFee = this.acomod.limpezaFee

        /* ******************** CREDIT CARD ******************** */
        if (reservaAcomod.paymentMethod === 'credit_card') {

          /* Checar se todos os dados foram preenchidos */
          if (valid.number(this.cardNumber).isValid && valid.expirationDate(this.cardExpirationDate).isValid && valid.cvv(this.cardCVV).isValid && this.cardHolderName !== '' && this.guestCPF.length === 14 && this.guestCelular.length === 15 && this.zipcode.length === 9 && this.street !== '' && this.streetNumber !== '' && this.neighborhood !== '' && this.city !== '' && this.state !== '') {

            /* Criar transação no Pagarme */
            const result = await firebase.functions().httpsCallable('pagarme_newReservaAcomod')({
              reservaAcomod: reservaAcomod,
              creditCard: creditCard,
              acomod: this.acomod
            })

            const reservaID = result.data.reservaID
            reservaAcomod.reservaID = reservaID

            /* Criar reserva na Firestore */
            await firebase.firestore().collection('reservasAcomods').doc(reservaID).set(reservaAcomod)

            /* Atualizar visit */
            await firebase.firestore().collection('acomods').doc(this.acomod.acomodID).collection('visits').doc(this.$store.state.visitID).update({ concludedReserva: true })

            /* Resetar dados do cartão de crédito */
            this.$store.commit('m_resetCreditCard')

            this.$store.state.concludedReservaAcomod = true
            this.scrollTop()
            this.$store.commit('m_loader', false)
            
          } else { /* Há dados incompletos */
            this.$store.commit('m_loader', false)
            this.cardHolderName.length < 3 ? this.cardHolderNameError = true : this.cardHolderNameError = false
            !valid.number(this.cardNumber).isValid ? this.cardNumberError = true : this.cardNumberError = false
            !valid.expirationDate(this.cardExpirationDate).isValid ?  this.cardExpirationDateError = true :  this.cardExpirationDateError = false
            !valid.cvv(this.cardCVV).isValid ? this.cardCvvError = true : this.cardCvvError = false
            this.guestCPF.length < 14 ? this.cpfError = true : this.cpfError = false
            this.guestCelular.length < 15 ? this.celularError = true : this.celularError = false
            this.zipcode.length < 9 ? this.zipcodeError = true : this.zipcodeError = false
            this.street === '' ? this.streetError = true : this.streetError = false
            this.streetNumber === '' ? this.streetNumberError = true : this.streetNumberError = false
            this.neighborhood === '' ? this.neighborhoodError = true : this.neighborhoodError = false
            this.city === '' ? this.cityError = true : this.cityError = false
            this.state === '' ? this.stateError = true : this.stateError = false
          }
        } else { /* ******************** BOLETO ******************** */

          /* Checar se todos os dados foram preenchidos */
          if (reservaAcomod.guestName !== '' && reservaAcomod.guestCPF.length === 14 && reservaAcomod.guestCelular.length === 15) {

            /* Criar transação no Pagarme */
            const result = await firebase.functions().httpsCallable('pagarme_newReservaAcomod')({
              reservaAcomod: reservaAcomod,
              acomod: this.acomod
            })

            const reservaID = result.data.reservaID
            reservaAcomod.reservaID = reservaID

            /* Criar reserva na Firestore */
            await firebase.firestore().collection('reservasAcomods').doc(reservaID).set(reservaAcomod)

            /* Atualizar visit */
            await firebase.firestore().collection('acomods').doc(this.acomod.acomodID).collection('visits').doc(this.$store.state.visitID).update({ concludedReserva: true })
            
            this.$store.state.concludedReservaAcomod = true
            this.scrollTop()
            this.$store.commit('m_loader', false)

          } else { /* Há dados incompletos */
            this.$store.commit('m_loader', false)
            reservaAcomod.guestName === '' ? this.guestNameError = true : this.guestNameError = false
            reservaAcomod.guestCPF.length < 14 ? this.cpfError = true : this.cpfError = false
            reservaAcomod.guestCelular.length < 15 ? this.celularError = true : this.celularError = false
          }
        }
      } catch (err) {
        console.log(err)
        this.$store.commit('m_loader', false)
        err.details === 'card_number' ? this.cardNumberError = true : this.cardNumberError = false
        err.details === 'card_holder_name' ? this.cardHolderNameError = true : this.cardHolderNameError = false
        err.details === 'card_expiration_date' ? this.cardExpirationDateError = true : this.cardExpirationDateError = false
        err.details === 'card_cvv' ? this.cardCvvError = true : this.cardCvvError = false
        err.details === 'customer' ? this.cpfError = true : this.cpfError = false
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
      const checkIn = new Date(this.reservaAcomod.periodoReserva.start)
      const checkOut = new Date(this.reservaAcomod.periodoReserva.end)
      return dayjs(checkIn).format('ddd, DD MMM YYYY') + ' → ' + dayjs(checkOut).format('ddd, DD MMM YYYY')
    },

    /* ******************** FORMATTINGS ******************** */
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
    whatsAppHostHREF () {
      let celular = this.acomod.celular
      let DDD = celular.slice(1, 3)
      let firstNumber = celular.slice(5,10)
      let lastNumber = celular.slice(11,15)
      let whatsAppFormat = '+55' + DDD + firstNumber + lastNumber
      return 'https://api.whatsapp.com/send?phone=' + whatsAppFormat
    }
  },
  watch: {
    message (value) { value !== '' ? this.messageError = false : '' },
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
      let cardExpirationDate = valid.expirationDate(value)
      cardExpirationDate.isPotentiallyValid ? this.cardExpirationDateError = false : this.cardExpirationDateError = true
    },
    cardCVV (value) {
      let cardCVV = valid.cvv(value)
      cardCVV.isPotentiallyValid ? this.cardCvvError = false : this.cardCvvError = true
    },
    cardHolderName (value) { value !== '' ? this.cardHolderNameError = false : '' },
    guestName (value) { value !== '' ? this.guestNameError = false : '' },
    guestCPF (value) { value !== '' ? this.cpfError = false : '' },
    guestCelular (value) { value !== '' ? this.celularError = false : '' },
    street (value) { value !== '' ? this.streetError = false : '' },
    streetNumber (value) { value !== '' ? this.streetNumberError = false : '' },
    neighborhood (value) { value !== '' ? this.neighborhoodError = false : '' },
    city (value) { value !== '' ? this.cityError = false : '' },
    state (value) { value !== '' ? this.stateError = false : '' },
    zipcode (value) { /* Get zipcode info */
      if (value.length === 9) {
        this.$store.commit('m_loader', true)
        const billing = this.reservaAcomod.billing
        const zipcode = billing.zipcode.replace(/[^0-9\.]+/g, '')
        this.$axios.$get('https://api.pagar.me/1/zipcodes/' + zipcode)
        .then(data => {
          billing.state = data.state
          billing.city = data.city
          billing.neighborhood = data.neighborhood
          billing.street = data.street
          this.$store.commit('m_loader', false)
        })
        .catch(err => {
          this.zipcodeError = true
          this.$store.commit('m_loader', false)
        })
      } else {
        this.zipcodeError = false
      }
    }
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
      flex: 65%;
      & .__title {
        padding-bottom: 1.6rem;
        font-size: 32px;
        user-select: none;
      }
      & .__subtitle {
        padding-top: .5rem;
      }
      & .etapa-1-item {
        padding-top: 2rem;
        & .__subtitle {
          font-size: 17px;
          font-weight: 600;
        }
      }
      & .message {
        margin-right: 28%;
        & .clique-aqui {
          cursor: pointer;
        }
        & .clique-aqui:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
      & .payment {
        margin-right: 28%;
      }
      & .item-form {
        display: flex;
        flex-flow: column;
        margin: 2.6rem 0;
        & label {
          padding-bottom: .6rem;
          user-select: none;
          font-weight: 600;
          font-size: 15px;
        }
        & input {
          cursor: text;
          position: relative;
          width: 100%;
          font-weight: 400;
          background: white;
          color: var(--color01);
          padding: .85rem .4rem .85rem .7rem;
          border: 1px solid rgb(222,222,222);
          outline: none;
          transition: .15s border ease;
        }
        & input:hover {
          border: 1px solid rgb(72,72,72) !important;
        }
        & select {
          width: 100%;
          font-weight: 400;
          background: white;
          color: var(--color01);
          padding: .85rem 1.85rem .85rem .7rem;
          border: 1px solid rgb(222,222,222);
          outline: none;
          transition: .15s border ease;
        }
        & select:hover {
          border: 1px solid rgb(72,72,72) !important;
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
          border: 1px solid rgb(222,222,222);
          outline: none;
        }
        & textarea:focus {
          border: 1px solid rgb(72,72,72) !important;
        }
      }
    }
    /* ******* FLEX RIGHT ******* */
    & .flex-right {
      flex: 35%;
      max-width: 35%;
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
              font-size: 17px;
              font-weight: 600;
            }
          }
          & .__ver-detalhes {
            user-select: none;
            cursor: pointer;
            font-size: 14px;
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
  padding: 0 1.3rem;
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
  border: 1px solid #F31431 !important;
}

</style>