<template>
  <div class="reservar">
    
    <v-dialog style="z-index:10000"/>



    <!-- ******* HEADER PROGRESS ******* -->
    <div class="header-progress">

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




    <div class="reserva-body">

      <!-- ******* Flex Left ******* -->
      <div class="flex-left">



        <!-- ******* ETAPA 1 ******* -->
        <div class="etapa-1" v-if="$store.state.reservaAcomodDesktop1 === true">

          <div class="title">
            <h1 class="__title-number">1</h1>
            <h1 class="__title-text">Revisar Regras {{ tipoAcomodTitle }}</h1>
          </div>

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

          <div class="title">
            <h1 class="__title-number">2</h1>
            <h1 class="__title-text">Mensagem</h1>
          </div>


          <button class="__next-btn" type="button" @click="nextBtn2">Continuar</button>

        </div><!-- ******* ETAPA 2 ******* -->




        <!-- ******* ETAPA 3 ******* -->
        <div class="etapa-3" v-if="$store.state.reservaAcomodDesktop3 === true">

          <div class="title">
            <h1 class="__title-number">3</h1>
            <h1 class="__title-text">Pagamento e Confirmação</h1>
          </div>


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
              <input type="text" pattern="[A-Za-z]" v-model="$store.state.creditCard.cardHolderName">
            </div>

            <div class="card-info">
              <div class="item-form">
                <label>Dados do Cartão</label>

                <masked-input
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
            

            <div style="display:flex">
              <div class="item-form">
                <div style="display:flex">
                  
                </div>
              </div>

              <div class="item-form">
                
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
  </div>
</template>

<script>
import * as firebase from 'firebase'
require('firebase/firestore')
import pagarme from 'pagarme'
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
      monthsPermitted: ['01','02','03','04','05','06','07','08','09','10','11','12']
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
      let reservaAcomod = this.$store.state.reservaAcomod
      let user = this.$store.state.user
      let paymentMethod = this.$store.state.creditCard.paymentMethod
      let cardNumber = this.$store.state.creditCard.cardNumber.replace(/[^0-9\.]+/g, '')
      let cardHolderName = this.$store.state.creditCard.cardHolderName
      let cardExpirationDate = this.$store.state.creditCard.cardExpirationDate.replace(/[^0-9\.]+/g, '')
      let cardCVV = this.$store.state.creditCard.cardCVV
      let amountAnunciante = reservaAcomod.valorNoitesTotal * 100
      let amountEscarpasTrip = reservaAcomod.serviceFeeTotal * 100

      /* Se todos os dados foram preenchidos corretamente: */
      if (cardNumber.length === 16 && cardHolderName !== '' && cardExpirationDate.length === 4 && cardCVV.length >= 3) {
        /* 
        CRIAR TRANSAÇÃO
        */
        pagarme.client.connect({ api_key: 'ak_test_E3I46o4e7guZDqwRnSY9sW8o8HrL9D' })
        .then(client => client.transactions.create({
          'amount': amountAnunciante + amountEscarpasTrip,
          'payment_method': paymentMethod,
          'card_number': cardNumber,
          'card_cvv': cardCVV,
          'card_expiration_date': cardExpirationDate,
          'card_holder_name': cardHolderName,
          'customer': {
            'external_id': user.userID,
            'name': user.fullName,
            'type': 'individual',
            'country': 'br',
            'email': user.email,
            'documents': [
              {
                'type': 'cpf',
                'number': '00000000000'
              }
            ],
            'phone_numbers': ['+5511999998888']
          },
          'billing': {
            'name': user.fullName,
            'address': {
              'country': 'br',
              'state': 'sp',
              'city': 'Cotia',
              'neighborhood': 'Rio Cotia',
              'street': 'Rua Matrix',
              'street_number': '9999',
              'zipcode': '06714360'
            }
          },
          'items': [
            {
              'id': this.acomod.acomodID,
              'title': this.acomod.title,
              'category': 'Acomod',
              'unit_price': this.acomod.valorNoite * 100,
              'quantity': reservaAcomod.noites,
              'tangible': false
            }
          ],
          'split_rules': [
            {
              'recipient_id': 're_cjfcpgjli007ggb6dku6oc33s',
              'amount': reservaAcomod.serviceFeeTotal * 100,
              'liable': true,
              'charge_processing_fee': true
            },
            {
              'recipient_id': this.acomod.recipientID,
              'amount': reservaAcomod.valorNoitesTotal * 100,
              'liable': true,
              'charge_processing_fee': true
            }
          ]
          }))
        .catch(err => console.log(err)) /* Erro ao criar transação */
        .then(transaction => {
          console.log(transaction)
          let reservaID = transaction.id.toString()
          reservaAcomod.reservaID = reservaID
          reservaAcomod.requested = new Date().getTime()
          reservaAcomod.acomodID = this.acomod.acomodID
          reservaAcomod.hostID = this.acomod.userID
          reservaAcomod.hostName = this.acomod.proprietario
          reservaAcomod.hostEmail = this.acomod.email
          reservaAcomod.guestID = user.userID
          reservaAcomod.guestName = user.fullName
          reservaAcomod.guestEmail = user.email
          /* Criar reserva no Firebase */
          firebase.firestore().collection('reservasAcomods').doc(reservaID).set(reservaAcomod)
          this.$store.commit('m_resetCreditCard')
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
    yearsPermitted () {
      let year = new Date().getFullYear().toString()
      let shortYear = Number(year.slice(-2))
      let n1 = shortYear + 1
      let n2 = shortYear + 2
      let n3 = shortYear + 3
      let n4 = shortYear + 4
      let n5 = shortYear + 5
      let n6 = shortYear + 6
      let n7 = shortYear + 7
      let n8 = shortYear + 8
      let n9 = shortYear + 9
      let n10 = shortYear + 10
      let yearsPermitted = [shortYear, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10]
      return yearsPermitted
    },
    /* regras () {
      this.acomod.allowFestas ? 'Festas são permitidas' : 'Festas não são permitidas'
      if (!this.acomod.allowFestas || !this.acomod.allowPets || !this.acomod.allowBabys || !this.acomod.allowFumar) {
        return 'Não são permitidos ' + !this.acomod.allowFestas ? 'Festas' : !this.acomod.allowFestas ?
      }
    }, */
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
        width: 2.55rem;
        height: auto;
      }
    }
    & .progress {
      padding-left: 12%;
      display: flex;
      align-items: center;
      & .__item-progress {
        cursor: pointer;
        user-select: none;
        font-size: 15px;
        font-weight: 300;
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
    padding: 1rem 12% 4rem;
    display: flex;
    /* ******* FLEX LEFT ******* */
    & .flex-left {
      flex: 65%;
      & .title {
        display: flex;
        align-items: center;
        padding-bottom: 1rem;
        & .__title-number {
          width: 2rem;
          padding-right: .45rem;
          text-align: center;
          font-size: 38px;
          color: rgb(202,202,202);
        }
        & .__title-text {
          font-size: 31px;
        }
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
        margin: 0 1.4rem;
        padding: 1.2rem 0;
        font-size: 19px;
        font-weight: 700;
        border-bottom: 1px solid rgb(222,222,222);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & .detalhes-reserva-data {
        padding: .8rem 0;
        margin: 0 1.4rem;
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
        margin: 0 1.4rem;
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
}

.__next-btn {
  margin-top: 3rem;
  padding: 0 2rem;
  font-size: 17px;
  font-weight: 600;
  background: var(--colorAcomod);
  color: white;
  border-radius: 5px;
  height: 2.9rem;
  line-height: 2.8rem;
}

</style>