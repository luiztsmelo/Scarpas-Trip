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

          <h3 class="__text">{{ $store.state.visits }} pessoas visualizaram {{ tipoAcomodE }} na última semana.</h3>
        

          <div class="etapa-1-item" v-if="!acomod.allowFestas || !acomod.allowPets || !acomod.allowBabys || !acomod.allowFumar">
            <h3 class="__text">Nesta casa não é permitido:</h3>
            <h3>{{ !acomod.allowFestas ? 'Festas' : '' }}</h3>
            <h3>{{ !acomod.allowPets ? 'Animais de estimação' : '' }}</h3>
            <h3>{{ !acomod.allowBabys ? 'Bebês de até 2 anos' : '' }}</h3>
            <h3>{{ !acomod.allowFumar ? 'Fumar dentro de casa' : '' }}</h3>
          </div>


          <div class="etapa-1-item" v-if="acomod.regrasAdicionais.length !== 0">
            <h3 class="__text">Lembretes adicionais:</h3>
            <h3 v-for="regra in acomod.regrasAdicionais">{{ regra }}</h3>
          </div>
          
          <!-- <h3>Regras de Cancelamento</h3> -->


          <button class="__next-btn" type="button" :style="form1ok" @click="nextBtn1">Concordar</button>

        </div><!-- ******* ETAPA 1 ******* -->




        <!-- ******* ETAPA 2 ******* -->
        <div class="etapa-2" v-if="$store.state.reservaAcomodDesktop2 === true">

          <h1 class="__title">Conte a {{ host.firstName }} sobre sua viagem</h1>


          <div class="message">
            
            <h3 class="__text">Ajude {{ host.firstName }} a preparar {{ tipoAcomodA }} para sua estadia respondendo às suas perguntas:</h3>

            <div class="host-message">
              <img class="__img" :src="host.photoURL">
              <div class="message-box">
                <h3 class="__message">Oi {{ user.firstName }}! </h3>
                <h3 class="__message">Estou te aguardando ansiosamente por aqui. Por favor, me avise a hora em que irá chegar.</h3>
                <h3 class="__message">{{ host.firstName }}.</h3>
              </div>
            </div>

            <textarea
              ref="message"
              :class="[ messageError ? 'has-error-textarea' : '' ]"
              v-model="reservaAcomod.message"
              @focus="onFocusMessage"
              v-autosize="messageAutosize"
              maxlength="1000"
              rows="6"
              placeholder="Escreva sua resposta aqui">
            {{messageAutosize}}</textarea>

          </div>


          <button class="__next-btn" type="button" :style="form2ok" @click="nextBtn2">Continuar</button>

        </div><!-- ******* ETAPA 2 ******* -->




        <!-- ******* ETAPA 3 ******* -->
        <div class="etapa-3" v-if="$store.state.reservaAcomodDesktop3 === true">

          <h1 class="__title">Detalhes sobre o pagamento</h1>


          <div class="payment">

            <h3 class="__text">{{ user.firstName }}, você somente será cobrado se {{ host.firstName }} aceitar seu pedido de reserva. Caso aceite, para sua segurança nós só liberaremos o pagamento para ele no dia seguinte de seu check-in, {{ dayAfterCheckin }}.</h3>


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
            <div class="credit-card" v-if="reservaAcomod.paymentMethod === 'credit_card'">

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
                    :mask="[/\d/, /\d/, ' ', '/', ' ', /\d/, /\d/]"
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
                    @keypress="keyEnterCVV"
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
                    :mask="['+', 5, 5, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]"
                    :guide="false"
                    placeholder="+55">
                  </masked-input>
                </div><!-- CELULAR -->

              </div>

            </div><!-- ************** CUSTOMER ************** -->


            
            <!-- ************** BILLING ************** -->
            <div class="billing" v-if="reservaAcomod.paymentMethod === 'credit_card'">

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


            <!-- PARCELAS -->
            <div class="item-form" style="padding-top: 1.2rem" v-if="reservaAcomod.paymentMethod === 'credit_card'">
              <label>Deseja pagar em quantas parcelas sem juros?</label>
              <select v-model="$store.state.reservaAcomod.parcelas">
                <option v-for="parcela in $store.state.creditCard.parcelas" :value="parcela.id.toString()">
                  {{ `${parcela.id}x R$${parcela.valorParcela.toLocaleString('pt-BR', {minimumFractionDigits: 2})}` }}
                </option>
              </select>
            </div><!-- PARCELAS -->


            <div class="politica-cancelamento" style="padding-top: 1.2rem">
              <h3 class="__subtitle">Política de cancelamento: Flexível</h3>
              <h3 class="__text">Cancele em 48h da reserva e até 7 dias antes do check-in para receber um reembolso integral.</h3>
            </div>

            <h4 class="__termos">Eu concordo com as regras {{ tipoAcomodD }}, <a href="/termos#politica_cancelamento" target="_blank">Política de Cancelamento</a> e <a href="/termos" target="_blank">Termos de Serviço</a>. Eu também concordo em pagar o valor total apresentado, que inclui a Taxa de Serviço.</h4>


          </div><!-- Payment -->
          

          <button class="__next-btn" type="button" style="font-weight: 700" :style="form3ok" @click="concluirReserva">Concluir Pedido</button>


        </div><!-- ******* ETAPA 3 ******* -->
        

      </div><!-- ******* Flex Left ******* -->






      <!-- ******* Flex Right ******* -->
      <div class="flex-right">

        <img class="__acomod-img" v-lazy="imgObj"/>

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

    <div class="footer" v-if="!$store.state.concludedReservaAcomod">
      <div style="display: flex; align-items: center">
        <img class="__img" src="../../../assets/img/brand.svg">
        <h3 class="__text">&copy Escarpas Trip. Capitólio/MG - Brasil. CNPJ: 99.999.999/9999-99.</h3>
      </div>
      <a class="__ajuda" href="/ajuda" target="_blank" >Ajuda</a>
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
      
      
      <nuxt-link to="/perfil" style="margin-top:4rem">
        <button class="__next-btn" type="button" style="background: #50CB9D; margin:0">Acessar Página Pessoal</button>
      </nuxt-link>
      

    </div>


  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'
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
    onFocusMessage () {
      scrollIntoView(this.$refs.message)
    },
    keyEnterCVV () {
      if (event.key === 'Enter') {
        const cardCVV = valid.cvv(this.cardCVV)
        if (cardCVV.isPotentiallyValid) {
          scrollIntoView(this.$refs.cpf.$el)
          this.$refs.cpf.$el.focus() 
        }
      }  
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
      this.$store.state.etapaReserva2ok = true, this.$store.commit('m_reservaAcomodDesktop1', false), this.$store.commit('m_reservaAcomodDesktop2', true), this.scrollTop()
    },
    nextBtn2 () {
      if (this.reservaAcomod.message.length > 0) {
        this.$store.state.etapaReserva3ok = true, this.$store.commit('m_reservaAcomodDesktop2', false), this.$store.commit('m_reservaAcomodDesktop3', true), this.scrollTop()
      } else {
        this.messageError = true
      }
    },
    async concluirReserva () {
      try {
        this.$store.commit('m_loader', true)

        this.reservaAcomod.hostID = this.acomod.hostID
        this.reservaAcomod.guestID = this.user.userID

        let transaction = null

        /* ________________________________________ CREDIT CARD ________________________________________ */
        if (this.reservaAcomod.paymentMethod === 'credit_card') {

          if (valid.number(this.cardNumber).isValid && valid.expirationDate(this.cardExpirationDate).isValid && valid.cvv(this.cardCVV).isValid && this.cardHolderName !== '' && CPF.validate(this.cpf) && this.cpf.length === 14 && this.celular.length === 17 && this.zipcode.length === 9 && this.$store.state.validZipcode && this.street !== '' && this.streetNumber !== '' && this.neighborhood !== '' && this.city !== '' && this.state !== '') {

            transaction = await firebase.functions().httpsCallable('newReservaAcomod')({
              reservaAcomod: this.reservaAcomod,
              creditCard: this.creditCard,
              customer: this.customer,
              acomod: this.acomod,
              host: this.host,
              visitID: this.$store.state.visitID
            })

          } else { /* Informações incompletas */
            this.$store.commit('m_loader', false)
            this.$store.commit('show_alert', {
              type: 'warning',
              title: 'Erro',
              message: 'Informações incompletas.'
            })
            this.cardHolderName.length < 3 ? this.cardHolderNameError = true : this.cardHolderNameError = false
            !valid.number(this.cardNumber).isValid ? this.cardNumberError = true : this.cardNumberError = false
            !valid.expirationDate(this.cardExpirationDate).isValid ?  this.cardExpirationDateError = true :  this.cardExpirationDateError = false
            !valid.cvv(this.cardCVV).isValid ? this.cardCvvError = true : this.cardCvvError = false
            this.cpf.length < 14 || !CPF.validate(this.cpf) ? this.cpfError = true : this.cpfError = false
            this.celular.length < 17 ? this.celularError = true : this.celularError = false
            this.zipcode.length < 9 || !this.$store.state.validZipcode ? this.zipcodeError = true : this.zipcodeError = false
            this.street === null || this.street === '' ? this.streetError = true : this.streetError = false
            this.streetNumber === null || this.streetNumber === '' ? this.streetNumberError = true : this.streetNumberError = false
            this.neighborhood === null || this.neighborhood === '' ? this.neighborhoodError = true : this.neighborhoodError = false
            this.city === null || this.city === '' ? this.cityError = true : this.cityError = false
            this.state === null || this.state === '' ? this.stateError = true : this.stateError = false
          }
        /* ________________________________________ BOLETO ________________________________________ */
        } else {

          if (this.name !== '' && CPF.validate(this.cpf) && this.cpf.length === 14 && this.celular.length === 17) {

            transaction = await firebase.functions().httpsCallable('newReservaAcomod')({
              reservaAcomod: this.reservaAcomod,
              customer: this.customer,
              acomod: this.acomod,
              host: this.host,
              visitID: this.$store.state.visitID
            })
            
          } else { /* Informações incompletas */
            this.$store.commit('m_loader', false)
            this.$store.commit('show_alert', {
              type: 'warning',
              title: 'Erro',
              message: 'Informações incompletas.'
            })
            this.name === '' ? this.nameError = true : this.nameError = false
            this.cpf.length < 14 || !CPF.validate(this.cpf) ? this.cpfError = true : this.cpfError = false
            this.celular.length < 17 ? this.celularError = true : this.celularError = false
          }
        }/* ______________________________________________________________________________________ */

        if (transaction !== null) {
          this.reservaAcomod.reservaID = transaction.data.reservaID
          this.$store.commit('m_resetCreditCard')
          this.$store.state.concludedReservaAcomod = true
          this.scrollTop()
          this.$store.commit('m_loader', false)
        }

      } catch (err) {
        console.log(err)
        this.$store.commit('m_loader', false)
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Erro',
          message: 'Falha no servidor. Tente novamente.'
        })
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
    form1ok () {
      return 'background: #50CB9D'
    },
    form2ok () {
      return this.reservaAcomod.message !== '' ? 'background: #50CB9D' : ''
    },
    form3ok () {
      if (this.reservaAcomod.paymentMethod === 'credit_card') {
        if (this.cardHolderName !== '' && CPF.validate(this.cpf) && this.cpf.length === 14 && this.zipcode.length === 9 && this.$store.state.validZipcode && this.street !== '' && this.street !== null && this.streetNumber !== '' && this.streetNumber !== null && this.neighborhood !== '' && this.neighborhood !== null && this.city !== '' && this.city !== null && this.state !== '' && this.state !== null) {
          return 'background: #FFA04F'
        }
      } else {
        if (this.name !== '' && CPF.validate(this.cpf) && this.cpf.length === 14 && this.celular.length === 17) {
          return 'background: #FFA04F'
        }
      }
    },
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
    imgObj () {
      return {
        src: supportsWebP ? this.acomod.images[0].HW : this.acomod.images[0].HJ,
        loading: this.acomod.images[0].L
      } 
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
      const cardNumber = valid.number(value)
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
            this.$store.commit('show_alert', {
              type: 'warning',
              title: 'Erro',
              message: 'Número inválido.',
            })
          }
        }
        this.$store.state.cardType = cardNumber.card.type
        this.$store.state.cardTypeNice = cardNumber.card.niceType
      }
    },
    cardExpirationDate (value) {
      const firstDigit = value.charAt(0)
      firstDigit > 1 ? this.$store.state.creditCard.cardExpirationDate = `0${firstDigit} / ` : ''
      const cardExpirationDate = valid.expirationDate(value)
      if (cardExpirationDate.isPotentiallyValid) {
        this.cardExpirationDateError = false
      } else {
        this.cardExpirationDateError = true
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Erro',
          message: 'Data inválida.'
        })
      }
      cardExpirationDate.isValid ? this.$refs.cvv.$el.focus() : ''
    },
    cardCVV (value) {
      const cardCVV = valid.cvv(value)
      if (cardCVV.isPotentiallyValid) {
        this.cardCvvError = false
      } else {
        this.cardCvvError = true
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Erro',
          message: 'Código de segurança inválido.'
        })
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
          this.$store.commit('show_alert', {
            type: 'warning',
            title: 'Erro',
            message: 'CPF inválido.',
          })
        }
      }
    },
    celular (value) { 
      value !== '' ? this.celularError = false : '' 
      if (value.length === 17 && this.reservaAcomod.paymentMethod === 'credit_card') {
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
          if (err.response.status === 404) {
            this.$store.commit('show_alert', {
              type: 'warning',
              title: 'Erro',
              message: 'CEP inválido.',
            })
          } else {
            this.$store.commit('show_alert', {
              type: 'warning',
              title: 'Erro',
              message: 'Falha na conexão. Tente novamente.',
            })
          }
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
      firebase.firestore().doc(`acomods/${vm.$store.state.acomod.acomodID}/visits/${vm.$store.state.visitID}`).update({ 
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
    padding-bottom: 4rem;
    margin: 1.2rem 12% 0;
    display: flex;
    border-bottom: 1px solid #dedede;
    /* ******* FLEX LEFT ******* */
    & .flex-left {
      flex: 64%;
      & .__title {
        padding-bottom: 1.5rem;
        font-size: 32px;
        user-select: none;
        margin-right: 24%;
      }
      & .__subtitle {
        padding-top: .5rem;
        font-size: 16px;
        font-weight: 600;
      }
      & .__text {
        padding-top: .5rem;
        font-size: 16px;
      }
      & .__termos {
        padding-top: 3rem;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        & a {
          color: var(--colorAcomod);
        }
      }
      & .etapa-1-item {
        padding-top: 2rem;
        & .__text {
          font-size: 17px;
          font-weight: 600;
        }
      }
      & .message {
        margin-right: 24%;
        & .host-message {
          display: flex;
          margin: 1.7rem 0 1rem 0;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #dedede;
          & .__img { 
            border-radius: 50%;
            width: 2.6rem;
            height: auto;
            align-self: flex-end;
          }
          & .message-box {
            position: relative;
            width: 100%;
            border-radius: 6px 6px 6px 0;
            background: var(--colorAcomod);
            padding: 1rem 1.2rem;
            margin-left: 8px;
            & .__message {
              padding: .2rem 0;
              font-size: 15px;
              font-weight: 500;
              line-height: 22px;
              color: white;
            }
          }
          & .message-box::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0;
            height: 0;
            border: 12px solid transparent;
            border-right-color: var(--colorAcomod);
            border-left: 0;
            border-bottom: 0;
            margin-left: -12px;
          }
        }
      }
      & .payment {
        display: flex;
        flex-flow: column;
        margin-right: 24%;
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
          border-bottom: 1px solid #dedede;
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
          border-bottom: 1px solid #dedede;
          outline: none;
          transition: .2s all ease;
        }
        & select:focus {
          border-bottom: 1px solid var(--color01) !important;
        }
        & select:hover {
          border-bottom: 1px solid var(--color01) !important;
        }
      }
      & textarea {
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        font-size: 17px;
        font-weight: 400;
        line-height: 26px;
        background: white;
        padding: 0;
        border: none;
        outline: none;
        resize: none;
      }
    }
    /* ******* FLEX RIGHT ******* */
    & .flex-right {
      flex: 36%;
      max-width: 36%;
      align-self: flex-start;
      & .__acomod-img {
        width: 100%;
        height: auto;
      }
      & .card-body {
        border-left: 1px solid #dedede;
        border-right: 1px solid #dedede;
        border-bottom: 1px solid #dedede;
        & .__acomod-title {
          margin: 0 1.3rem;
          padding: 1.2rem 0;
          font-size: 18px;
          font-weight: 600;
          border-bottom: 1px solid #dedede;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        & .detalhes-reserva-data {
          padding: .8rem 0;
          margin: 0 1.3rem;
          border-bottom: 1px solid #dedede;
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
  & .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .9rem 12% .7rem;
    height: 100%;
    & .__img {
      margin-right: .7rem;
      width: 1.2rem;
      height: auto;
      align-self: center;
    }
    & .__text {
      font-size: 13px;
    }
    & .__ajuda {
      font-size: 14px;
      font-weight: 600;
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
  margin-top: 2.5rem;
  padding: 0 1.5rem;
  height: 3.2rem;
  font-size: 17px;
  font-weight: 600;
  background:rgb(237, 237, 237);
  color: white;
  border-radius: 5px;
  transition: var(--main-transition);
}

.has-error-label {
  color: #F31431 !important;
}
.has-error {
  color: #F31431 !important;
  border-bottom: 1px solid #F31431 !important;
}
.has-error-textarea {
  color: #F31431 !important;
  border: 1px solid #F31431 !important;
}

</style>