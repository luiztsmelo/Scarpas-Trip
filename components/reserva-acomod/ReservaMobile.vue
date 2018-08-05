<template>
  <transition name="reserva-animation">
    <div class="reserva-acomod" v-if="$store.state.showReservaAcomod">



      <div class="reserva-acomod-body">
        

        <img class="back-btn" src="../../assets/img/back.svg" @click="backBtn">



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





        <!-- ########## REGRAS PG.2 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod2">

          <h3 class="etapas">2 de 5 etapas</h3>

          <h1 class="__title">Revise as regras da casa</h1>

          <h3 class="__text">Highlights da casa aqui</h3>


          <div class="check-in-out">

            <div style="flex:49%">
              <h3 class="__title">Check-in</h3>
              <h3 class="__item-text">{{ acomod.checkInTime === 'A qualquer hora' ? 'A qualquer hora' : `Após as ${acomod.checkInTime}` }}</h3>
              <h3 class="__item-text">{{ checkIn }}</h3>
            </div>

            <div class="__slash"></div>

            <div style="flex:49%">
              <h3 class="__title" style="text-align: right">Check-out</h3>
              <h3 class="__item-text" style="text-align: right">{{ acomod.checkOutTime === 'A qualquer hora' ? 'A qualquer hora' : `Até as ${acomod.checkOutTime}` }}</h3>
              <h3 class="__item-text" style="text-align: right">{{ checkOut }}</h3>
            </div>

          </div>


          <h3 class="__text">Regras aqui</h3>


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
              <button type="button" class="__next-btn" :style="form2ok" @click="nextBtn2">Concordar</button>
            </div>
          </div>

        </div><!-- ########## REGRAS PG.2 ########## -->
        




        <!-- ########## CADASTRO PG.3 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod3">

          <h3 class="etapas">3 de 5 etapas</h3>

          <h1 class="__title">
            {{ !authUser ? 'Antes de continuar, precisamos de seu cadastro ou login' : `Ótimo ${user.firstName}, só mais uma informação` }}
          </h1>


          <div class="sign-in-btns" v-if="!authUser">
            <button type="button" class="google-btn" @click="$store.dispatch('a_googleSignIn')">Continuar com Google</button>
            <button type="button" class="facebook-btn" @click="$store.dispatch('a_facebookSignIn')">Continuar com Facebook</button>
          </div>

          <h3 class="__text" style="padding-top:1rem; font-size:15px; line-height:24px" v-if="!authUser">Ao se cadastrar com uma das opções acima, somente seu e-mail, nome e foto de perfil serão requisitados. Para mais informações, leia nossa <nuxt-link to="/termos#politica_privacidade" style="font-weight:500; cursor:pointer">Política de Privacidade</nuxt-link>.</h3>


          <div class="after-sign-in" v-if="authUser">
            <div class="item-form">
              <label :class="[ celularError ? 'has-error-label' : '' ]">Celular / WhatsApp</label>
              <masked-input
                :class="[ celularError ? 'has-error' : '' ]"
                type="tel"
                v-model="reservaAcomod.guestCelular"
                :mask="['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                :guide="false"
                placeholder="(  )          ">
              </masked-input>
            </div>
          </div>
          


          <div class="buttons">
            <div class="buttons-body">
              <h3 class="__valor" v-if="reservaAcomod.valorReservaTotal !== null">R${{ reservaAcomod.valorReservaTotal.toLocaleString() }}
                <span class="__valor-noites"> por {{ reservaAcomod.noites }} {{ reservaAcomod.noites == 1 ? 'noite' : 'noites'}}</span>
              </h3>
              <button type="button" class="__next-btn" :style="form3ok" @click="nextBtn3">Continuar</button>
            </div>
          </div>

        </div><!-- ########## CADASTRO PG.3 ########## -->






        <!-- ########## MENSAGEM PG.4 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod4">

          <h3 class="etapas">4 de 5 etapas</h3>

          <h1 class="__title">Mensagem para {{ acomod.proprietario.split(' ')[0] }}</h1>

          <h3 class="__text">Texto aqui</h3>



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


          <h3 class="__text">{{ user.firstName }}, você somente será cobrado caso {{ acomod.proprietario.split(' ')[0] }} confirme seu pedido de reserva.</h3>

          <h3 class="__text">Para sua segurança, só liberaremos o pagamento para ele no dia seguinte de seu check-in, {{ dayAfterCheckin }}. Não se preocupe, seus dados estarão seguros.</h3>


          <div class="add-payment" style="margin-top: .4rem; margin-bottom: 1.4rem" @click="openPaymentMethod">
            <h3 class="__item-text" style="font-weight: 600; color: #FFA04F">Forma de pagamento</h3>
            <img src="../../assets/img/arrow-right.svg" alt="" style="width: 1.1rem; height: auto">
          </div>


          <h3 class="__subtitle">Política de cancelamento: Flexível</h3>
          <h3 class="__text">Cancele em 48h da reserva e até 7 dias antes do check-in para receber um reembolso integral.</h3>
          

          <div class="divider"></div>


          <h3 class="__text">Eu concordo com os termos de serviço.</h3>

          
          <div class="buttons">
            <div class="buttons-body">
              <h3 class="__valor" v-if="reservaAcomod.valorReservaTotal !== null">R${{ reservaAcomod.valorReservaTotal.toLocaleString() }}
                <span class="__valor-noites"> por {{ reservaAcomod.noites }} {{ reservaAcomod.noites == 1 ? 'noite' : 'noites'}}</span>
              </h3>
              <button type="button" class="__next-btn" :style="form5ok" @click="concluirReserva">Concluir Pedido</button>
            </div>
          </div>

        </div><!-- ########## PAGAMENTO PG.5 ########## -->




        <!-- ______________________ PAYMENT METHOD  ______________________ -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomodPaymentMethod">

          <h1 class="__title">Pagar com</h1>


          <div class="add-payment" style="border: none" @click="openCreditCard">
            <div style="display:flex;align-items:center">
              <img src="../../assets/img/credit-card.svg" class="__img">
              <h3 class="__item-text">Cartão de Crédito</h3>
            </div>
            <img src="../../assets/img/arrow-right.svg" style="width: 1.1rem; height: auto">
          </div>

          <div class="add-payment" style="border-bottom: none" @click="openBoleto">
            <div style="display:flex;align-items:center">
              <img src="../../assets/img/boleto.svg" class="__img">
              <h3 class="__item-text">Boleto</h3>
            </div>
            <img src="../../assets/img/arrow-right.svg" style="width: 1.1rem; height: auto">
          </div>


        </div><!-- ______________________ PAYMENT METHOD  ______________________ -->





        <!-- ______________________ CREDIT CARD  ______________________ -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomodCreditCard">

          <h1 class="__title">Insira as informações do seu cartão</h1>


          <!-- CARD NUMBER -->
          <div class="item-form">
            <label :class="[ cardNumberError ? 'has-error-label' : '' ]">Número do Cartão</label>
            <masked-input
              :style="{ backgroundImage: 'url(' + cardBrand + ')', backgroundPosition: 0, backgroundRepeat: 'no-repeat', backgroundSize: '35px', paddingLeft: cardType !== null ? '48px' : '' }"
              :class="[ cardNumberError ? 'has-error' : '' ]"
              type="tel"
              v-model="$store.state.creditCard.cardNumber"
              :mask="[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]"
              :guide="false"
              @focus="scrollBottom"
              placeholder="0000 0000 0000 0000">
            </masked-input>
          </div><!-- CARD NUMBER -->


          <div style="display:flex">
            
            <!-- CARD EXPIRATION -->
            <div class="item-form">
              <label :class="[ cardExpirationDateError ? 'has-error-label' : '' ]">Valido até</label>
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
            <div class="item-form">
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


          <div class="buttons">
            <div class="buttons-body">
              <h3 class="__alert">
                {{ cardNumberError || cardExpirationDateError || cardCvvError ? 'Cartão inválido' : '' }}
              </h3>
              <button type="button" class="__next-btn" :style="formCreditCardOk" @click="nextBtnCreditCard">Continuar</button>
            </div>
          </div>

        </div><!-- ______________________ CREDIT CARD  ______________________ -->






        <!-- ______________________ BOLETO  ______________________ -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomodBoleto">

          <h1 class="__title">Insira suas informações pessoais para a emissão do boleto</h1>



          <div class="round-btn" @click="nextBtnBoleto">OK</div>

        </div><!-- ______________________ BOLETO  ______________________ -->






        <!-- ______________________ BILLING  ______________________ -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomodBilling">

          <h1 class="__title">Insira as informações pessoais do titular do cartão</h1>


          <!-- NOME -->
          <div class="item-form">
            <label :class="[ cardHolderNameError ? 'has-error-label' : '' ]">Nome Impresso no Cartão</label>
            <input 
              :class="[ cardHolderNameError ? 'has-error' : '' ]" 
              type="text" pattern="[A-Za-z]"
              @keyup.enter="$refs.cpf.$el.focus()"
              v-model="$store.state.creditCard.cardHolderName">
          </div><!-- NOME -->


          <!-- CPF -->
          <div class="item-form">
            <label :class="[ cpfError ? 'has-error-label' : '' ]">CPF</label>
            <masked-input
              ref="cpf"
              :class="[ cpfError ? 'has-error' : '' ]"
              type="tel"
              v-model="reservaAcomod.guestCPF"
              :mask="[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]"
              :guide="false"
              placeholder="000.000.000-00">
            </masked-input>
          </div><!-- CPF -->


          <!-- <h3 class="__text" style="padding-bottom:1.5rem">{{ user.firstName }}, para garantirmos a segurança da transação, por favor preencha a seguir seu endereço de cobrança.</h3> -->


          <!-- CEP -->
          <div class="item-form">
            <label :class="[ zipcodeError ? 'has-error-label' : '' ]">CEP</label>
            <masked-input
              ref="zipcode"
              :class="[ zipcodeError ? 'has-error' : '' ]"
              type="tel"
              v-model="reservaAcomod.billing.zipcode"
              :mask="[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]"
              :guide="false"
              placeholder="00000-000">
            </masked-input>
          </div><!-- CEP -->


          <div v-show="$store.state.validZipcode">

            <!-- ENDEREÇO -->
            <div class="item-form">
              <label :class="[ streetError ? 'has-error-label' : '' ]">Rua</label>
              <input
                ref="street"
                :class="[ streetError ? 'has-error' : '' ]"
                type="text"
                @keyup.enter="$refs.streetNumber.$el.focus()"
                v-model="reservaAcomod.billing.street"
                placeholder="Endereço">
            </div><!-- ENDEREÇO -->


            <div style="display:flex">
              <!-- NÚMERO -->
              <div class="item-form" style="flex:50%">
                <label :class="[ streetNumberError ? 'has-error-label' : '' ]">Número</label>
                <masked-input
                  ref="streetNumber"
                  :class="[ streetNumberError ? 'has-error' : '' ]"
                  type="tel"
                  @keyup.enter="$refs.bairro.focus()"
                  v-model="reservaAcomod.billing.street_number"
                  :mask="[/\d/, /\d/, /\d/, /\d/]"
                  :guide="false"
                  placeholder="123">
                </masked-input>
              </div><!-- NÚMERO -->

              <!-- BAIRRO -->
              <div class="item-form" style="flex:50%">
                <label :class="[ neighborhoodError ? 'has-error-label' : '' ]">Bairro</label>
                <input
                  ref="bairro"
                  :class="[ neighborhoodError ? 'has-error' : '' ]"
                  type="text"
                  @keyup.enter="keyEnterBairro"
                  v-model="reservaAcomod.billing.neighborhood">
              </div><!-- BAIRRO -->
            </div>
          

            <div style="display:flex">
              <!-- CIDADE -->
              <div class="item-form" style="flex:50%">
                <label :class="[ cityError ? 'has-error-label' : '' ]">Cidade</label>
                <input
                  ref="city"
                  :class="[ cityError ? 'has-error' : '' ]"
                  type="text"
                  @keyup.enter="$refs.state.focus()"
                  v-model="reservaAcomod.billing.city">
              </div><!-- CIDADE -->

              <!-- ESTADO -->
              <div class="item-form" style="flex:50%">
                <label :class="[ stateError ? 'has-error-label' : '' ]">Estado</label>
                <select ref="state" :class="[ stateError ? 'has-error' : '' ]" v-model="reservaAcomod.billing.state">
                  <option v-for="state in states" :value="state.value">{{ state.name }}</option>
                </select>
              </div><!-- ESTADO -->
            </div>

          </div>

          <div class="buttons">
            <div class="buttons-body">
              <h3 class="__alert">
                {{ cardHolderNameError || cpfError || zipcodeError || streetError || streetNumberError || neighborhoodError || cityError || stateError ? 'Informações inválidas' : '' }}
              </h3>
              <button type="button" class="__next-btn" :style="formBillingOk" @click="nextBtnBilling">Continuar</button>
            </div>
          </div>

        </div><!-- ______________________ BILLING  ______________________ -->




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
import { states } from '@/mixins/statesBrazil'
import { tipoAcomod } from '@/mixins/tipoAcomod'
import valid from 'card-validator'
import CPF from 'gerador-validador-cpf'
import scrollIntoView from 'scroll-into-view'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

export default {
  components: { MaskedInput, DatePicker, tipoAcomod },
  mixins: [ reservaAcomod, states ],
  data() {
    return {
    }
  },
  methods: {
    keyEnterBairro () {
      this.$refs.city.focus()
      scrollIntoView(this.$refs.city)
    },
    limpezaFeeDialog () {
      this.$store.commit('show_alert', {
        type: 'info',
        title: 'Taxa de Limpeza',
        message: `Taxa cobrada pelo proprietário para arcar com os custos de limpeza ${this.tipoAcomodD}.`,
        persist: true
      })
    },
    serviceFeeDialog () {
      this.$store.commit('show_alert', {
        type: 'info',
        title: 'Taxa de Serviço',
        message: `Taxa de ${Math.round(this.$store.state.serviceFeeAcomod * 100)}% cobrada com o intuito de garantir suporte e total segurança em sua estadia caso algum problema aconteça.`,
        persist: true
      })
    },
    backBtn () {
      if (this.$store.state.reservaAcomod1) {
        window.history.back(1)
        this.$store.commit('m_showReservaAcomod', false)
        document.body.removeAttribute('style')
      }
      if (this.$store.state.reservaAcomod2) {
        window.history.back(1)
        this.$store.commit('m_reservaAcomod2', false)
        this.$store.commit('m_reservaAcomod1', true)
      }
      if (this.$store.state.reservaAcomod3) {
        window.history.back(1)
        this.$store.commit('m_reservaAcomod3', false)
        this.$store.commit('m_reservaAcomod2', true)
      }
      if (this.$store.state.reservaAcomod4) {
        window.history.back(1)
        this.$store.commit('m_reservaAcomod4', false)
        this.$store.commit('m_reservaAcomod3', true)
      }
      if (this.$store.state.reservaAcomod5) {
        window.history.back(1)
        this.$store.commit('m_reservaAcomod5', false)
        this.$store.commit('m_reservaAcomod4', true)
      }
      if (this.$store.state.reservaAcomodPaymentMethod || this.$store.state.reservaAcomodCreditCard || this.$store.state.reservaAcomodBoleto || this.$store.state.reservaAcomodBilling) {
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
        this.$store.commit('m_reservaAcomod1', false), this.$store.commit('m_reservaAcomod2', true), window.location.hash = this.$store.state.randomHashs[2]
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione as datas de sua viagem.',
        })
      }
    },
    nextBtn2 () {
      this.$store.commit('m_reservaAcomod2', false), this.$store.commit('m_reservaAcomod3', true), window.location.hash = this.$store.state.randomHashs[3]
    },
    nextBtn3 () {
      if (this.reservaAcomod.guestCelular.length === 15) {
        this.creditCard.cardHolderName = this.user.fullName
        this.reservaAcomod.guestName = this.user.fullName
        this.$store.commit('m_reservaAcomod3', false)
        this.$store.commit('m_reservaAcomod4', true)
        window.location.hash = this.$store.state.randomHashs[4]
        this.scrollTop()
      } else {
        if (this.authUser) {
          this.$store.commit('show_alert', {
            type: 'warning',
            title: 'Ops',
            message: 'Adicione um número de celular válido.'
          })
          this.guestCelular.length < 15 ? this.celularError = true : this.celularError = false
        } else {
          this.$store.commit('show_alert', {
            type: 'warning',
            title: 'Ops',
            message: 'Seu cadastro é necessário.'
          })
        }
      }
    },
    nextBtn4 () {
      if (1<2) {
        this.$store.commit('m_reservaAcomod4', false), this.$store.commit('m_reservaAcomod5', true), window.location.hash = this.$store.state.randomHashs[5]
      }
    },
    nextBtnCreditCard () {
      if (valid.number(this.cardNumber).isValid && valid.expirationDate(this.cardExpirationDate).isValid && valid.cvv(this.cardCVV).isValid) {
        this.$store.commit('m_reservaAcomodCreditCard', false), this.$store.commit('m_reservaAcomodBilling', true), this.scrollTop()
      } else {
        this.$store.commit('show_alert', {
          type: 'error',
          title: 'Erro',
          message: 'Cartão inválido.',
        })
        !valid.number(this.cardNumber).isValid ? this.cardNumberError = true : this.cardNumberError = false
        !valid.expirationDate(this.cardExpirationDate).isValid ?  this.cardExpirationDateError = true :  this.cardExpirationDateError = false
        !valid.cvv(this.cardCVV).isValid ? this.cardCvvError = true : this.cardCvvError = false
      }
    },
    nextBtnBoleto () {
      if (1<2) {
        this.$store.commit('m_reservaAcomodBoleto', false), window.history.back(1)
      }
    },
    nextBtnBilling () {
      if (this.cardHolderName !== '' && CPF.validate(this.guestCPF) && this.guestCPF.length === 14 && this.zipcode.length === 9 && this.$store.state.validZipcode && this.street !== '' && this.streetNumber !== '' && this.neighborhood !== '' && this.city !== '' && this.state !== '') {
        this.$store.commit('m_reservaAcomodBilling', false), window.history.back(1)
      } else {
        this.$store.commit('show_alert', {
          type: 'error',
          title: 'Erro',
          message: 'Informações inválidas.',
        })
        this.cardHolderName.length < 3 ? this.cardHolderNameError = true : this.cardHolderNameError = false
        this.guestCPF.length < 14 || !CPF.validate(this.guestCPF) ? this.cpfError = true : this.cpfError = false
        this.zipcode.length < 9 || !this.$store.state.validZipcode ? this.zipcodeError = true : this.zipcodeError = false
        this.street === null || this.street === '' ? this.streetError = true : this.streetError = false
        this.streetNumber === null || this.streetNumber === '' ? this.streetNumberError = true : this.streetNumberError = false
        this.neighborhood === null || this.neighborhood === '' ? this.neighborhoodError = true : this.neighborhoodError = false
        this.city === null || this.city === '' ? this.cityError = true : this.cityError = false
        this.state === null || this.state === '' ? this.stateError = true : this.stateError = false
      }
    },
    openDatePicker () {
      this.$store.commit('m_loader', true), this.$modal.show('datepicker'), window.location.hash = `${this.$store.state.randomHashs[1]}-datas`
    },
    openPaymentMethod () {
      this.$store.commit('m_reservaAcomod5', false), this.$store.commit('m_reservaAcomodPaymentMethod', true), window.location.hash = this.$store.state.randomHashs[6]
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
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione uma forma de pagamento.',
        })
      }
    }
  },
  computed: {
    hash () { return this.$route.hash },
    cardBrand () {
      const cardType = this.$store.state.cardType
      return cardType === 'visa' ? require('@/assets/img/visa.svg')
           : cardType === 'mastercard' ? require('@/assets/img/mastercard.svg')
           : cardType === 'american-express' ? require('@/assets/img/amex.svg')
           : cardType === 'elo' ? require('@/assets/img/elo.svg')
           : cardType === 'discover' ? require('@/assets/img/discover.svg')
           : cardType === 'diners-club' ? require('@/assets/img/diners.svg')
           : cardType === 'jcb' ? require('@/assets/img/jcb.svg')
           : ''
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
      return 'background: #50CB9D'
    },
    form3ok () {
      return this.reservaAcomod.guestCelular.length === 15 ? 'background: #50CB9D' : ''
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
      if (cardNumber.card) {
        if (cardNumber.card.type === 'american-express' ? value.length === 18 : value.length === 19) {
          if (cardNumber.isValid) {
            this.cardNumberError = false
            this.$refs.cardExpirationDate.$el.focus()
            scrollIntoView(this.$refs.cardExpirationDate.$el)
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
    },
    guestCPF (value) {
      value !== '' ? this.cpfError = false : ''
      if (value.length === 14) {
        if (CPF.validate(value)) {
          this.cpfError = false
          this.$refs.zipcode.$el.focus()
          scrollIntoView(this.$refs.zipcode.$el)
        } else {
          this.cpfError = true
        }
      }
    },
    cardHolderName (value) { value !== '' ? this.cardHolderNameError = false : '' },
    guestName (value) { value !== '' ? this.guestNameError = false : '' },
    guestCelular (value) { value !== '' ? this.celularError = false : '' },
    street (value) { value !== null ? this.streetError = false : null },
    streetNumber (value) { value !== null ? this.streetNumberError = false : null },
    neighborhood (value) { value !== null ? this.neighborhoodError = false : null },
    city (value) { value !== null ? this.cityError = false : null },
    state (value) { value !== null ? this.stateError = false : null },
    async zipcode (value) {
      if (value.length === 9) {
        try {
          this.$store.commit('m_loader', true)
          const billing = this.reservaAcomod.billing
          const zipcode = billing.zipcode.replace(/[^0-9\.]+/g, '')
          const zipcodeData = await this.$axios.$get('https://api.pagar.me/1/zipcodes/' + zipcode)
          billing.state = zipcodeData.state
          billing.city = zipcodeData.city
          billing.neighborhood = zipcodeData.neighborhood
          billing.street = zipcodeData.street
          this.$store.state.validZipcode = true
          this.$store.commit('m_loader', false)
          this.$nextTick(() => {
            this.$refs.street.focus()
            scrollIntoView(this.$refs.street)
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
    hash (value) {
      if (value === '') {
        this.$store.commit('m_showReservaAcomod', false)
        this.$store.commit('m_reservaAcomod1', false)
        this.$store.commit('hide_alert')
        document.body.removeAttribute('style')
      }
      if (value === `#${this.$store.state.randomHashs[1]}`) {
        this.$modal.hide('datepicker') 
        this.$store.commit('m_reservaAcomod1', true)
        this.$store.commit('m_reservaAcomod2', false)
        this.$store.commit('hide_alert')
      }
      if (value === `#${this.$store.state.randomHashs[2]}`) {
        this.$store.commit('m_reservaAcomod2', true)
        this.$store.commit('m_reservaAcomod3', false)
        this.$store.commit('hide_alert')
        this.scrollTop()
      }
      if (value === `#${this.$store.state.randomHashs[3]}`) {
        this.$store.commit('m_reservaAcomod3', true)
        this.$store.commit('m_reservaAcomod4', false)
        this.$store.commit('hide_alert')
        this.scrollTop()
      }
      if (value === `#${this.$store.state.randomHashs[4]}`) {
        this.$store.commit('m_reservaAcomod4', true)
        this.$store.commit('m_reservaAcomod5', false)
        this.$store.commit('hide_alert')
        this.scrollTop()
      }
      if (value === `#${this.$store.state.randomHashs[5]}`) {
        this.$store.commit('m_reservaAcomod5', true)
        this.$store.commit('m_reservaAcomodPaymentMethod', false)
        this.$store.commit('m_reservaAcomodCreditCard', false)
        this.$store.commit('m_reservaAcomodBoleto', false)
        this.$store.commit('m_reservaAcomodBilling', false)
        this.$store.commit('hide_alert')
        this.scrollTop()
      }
      if (value === `#${this.$store.state.randomHashs[6]}`) {
        this.$store.commit('m_reservaAcomodPaymentMethod', true)
        this.$store.commit('m_reservaAcomodCreditCard', false)
        this.$store.commit('m_reservaAcomodBoleto', false)
        this.$store.commit('m_reservaAcomodBilling', false)
        this.$store.commit('hide_alert')
        this.scrollTop()
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
  & .reserva-acomod-body {
    display: flex;
    flex-flow: column;
    height: 100%;
    & .back-btn {
      margin: 1.2rem 7% 1rem;
      cursor: pointer;
      width: 1.07rem;
      height: auto;
      filter: invert(75%);
    }
    & .etapa-reserva-box {
      padding-bottom: 5rem;
      & .etapas {
        padding: 0 7% 0.2rem;
        font-size: 14px;
        font-weight: 500;
        color: rgb(72, 72, 72);
      }
      & .__title {
        padding: 0 7% 1.9rem;
        line-height: 35px;
        font-size: 29px;
        font-weight: 700;
      }
      & .__subtitle {
        padding: 0 7% .3rem;
        padding-bottom: .3rem;
        font-size: 16px;
        font-weight: 600;
      }
      & .__text {
        padding: 0 7% 1rem;
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
          color: var(--colorAcomod);
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
          height: 3.5rem;
          text-align: start;
          padding-left: 50px;
          font-size: 15px;
        }
        & .google-btn {
          width: 17rem;
          margin: .6rem 0;
          height: 3.5rem;
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
        & .__item-text {
          font-size: 16px;
          line-height: 22px;
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
        & .__item-text {
          font-size: 17px;
          font-weight: 500;
        }
      }
      & .divider {
        margin: .2rem 7% 1rem;
        height: 1px;
        width: calc(100% - 14%);
        background-color: rgb(222,222,222);
      }
      & .item-form {
        padding: 0 7%;
        display: flex;
        flex-flow: column;
        margin-bottom: 1.8rem;
        & label {
          font-weight: 500;
          font-size: 14px;
          transition: all .2s ease;
        }
        & input {
          width: 100%;
          font-size: 18px;
          font-weight: 400;
          background: white;
          color: var(--color01);
          padding: 1rem 0;
          border: none;
          border-bottom: 1px solid rgb(222,222,222);
          outline: none;
          transition: all .2s ease;
        }
        & select {
          width: 100%;
          font-size: 18px;
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
          & .__alert {
            font-weight: 500; 
            font-size: 15px; 
            color:#F31431;
            transition: var(--main-transition);
          }
          & .__next-btn {
            cursor: pointer;
            padding: 0 1.3rem;
            font-size: 16px;
            font-weight: 600;
            background:rgb(237, 237, 237);
            color: white;
            height: 3.1rem;
            border-radius: 5px;
            transition: var(--main-transition);
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