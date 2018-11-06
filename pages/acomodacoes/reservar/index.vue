<template>
  <div class="reservar">
    



    <!-- ________________________________________ HEADER PROGRESS ________________________________________ -->
    <div class="header-progress" v-if="!$store.state.concludedReservaAcomod">

      <nuxt-link to="/" class="brand">
        <img class="__brand-img" src="../../../static/brand.svg" draggable="false">
      </nuxt-link>

      <div class="progress">
        <h3 class="__item-progress" :style="etapaProgressed1" @click="backEtapa1">1. Identificação</h3>
        
        <h3 class="__arrow-right">→</h3>

        <h3 class="__item-progress" :style="etapaProgressed2" @click="backEtapa2">2. Revisar detalhes e confirmar</h3>
      </div>

    </div><!-- ________________________________________ HEADER PROGRESS ________________________________________ -->





    <div class="reserva-body" v-if="!$store.state.concludedReservaAcomod">




      <!-- ________________________________________ FLEX LEFT ________________________________________ -->
      <div class="flex-left">




        <!-- ******************** IDENTIFICAÇÃO ******************** -->
        <div v-if="$store.state.reservaAcomodDesktop1 === true">


          <h1 class="__title">Ótima escolha! Podemos te conhecer melhor?</h1>


          <!-- NAME -->
          <div class="item-form">
            <label :class="[ nameError ? 'has-error-label' : '' ]">Nome completo</label>
            <input
              :class="[ nameError ? 'has-error' : '' ]"
              type="text" 
              pattern="[A-Za-z]"
              @keypress="keyEnterName"
              v-model="$store.state.reservaAcomod.guest.fullName">
          </div><!-- NAME -->


          <!-- E-MAIL -->
          <div class="item-form">
            <label :class="[ emailError ? 'has-error-label' : '' ]">E-mail</label>
            <input
              ref="email"
              :class="[ emailError ? 'has-error' : '' ]"
              @blur="validateEmail"
              type="email"
              @keypress="keyEnterEmail"
              v-model="$store.state.reservaAcomod.guest.email">
          </div><!-- E-MAIL -->


          <!-- CELULAR -->
          <div class="item-form">
            <label :class="[ celularError ? 'has-error-label' : '' ]">Celular / WhatsApp</label>
            <masked-input
              ref="celular"
              :class="[ celularError ? 'has-error' : '' ]"
              type="tel"
              v-model="$store.state.reservaAcomod.guest.celular"
              :mask="['+', 5, 5, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]"
              :guide="false"
              placeholder="+55">
            </masked-input>
          </div><!-- CELULAR -->
          


          <button class="__next-btn" type="button" :style="form1ok" @click="nextBtn1">Continuar</button>


        </div><!-- ******************** IDENTIFICAÇÃO ******************** -->





        <!-- ******************** DETALHES E CONFIRMAÇÃO ******************** -->
        <div v-if="$store.state.reservaAcomodDesktop2 === true">


          <h1 class="__title">Revisar detalhes e confirmar</h1>


          <!-- CHECK IN OUT -->
          <div class="check-in-out">

            <div style="display: flex; flex: 1">

              <div class="calendar-box">
                <p class="__month">{{ checkInMonth }}</p>
                <p class="__day">{{ checkInDay }}</p>
              </div>

              <div class="calendar-info">
                <p class="__weekday">{{ checkInWeekday }}</p>
                <p class="__hour">{{ checkInHour }}</p>
              </div>

            </div>

            <div style="display: flex; flex: 1">

              <div class="calendar-box">
                <p class="__month">{{ checkOutMonth }}</p>
                <p class="__day">{{ checkOutDay }}</p>
              </div>
              
              <div class="calendar-info">
                <p class="__weekday">{{ checkOutWeekday }}</p>
                <p class="__hour">{{ checkOutHour }}</p>
              </div>

            </div>

          </div><!-- CHECK IN OUT -->



          <!-- REGRAS -->
          <h3 class="__subtitle">Regras {{ tipoAcomodD }}</h3>

          <div class="regra">
            <img class="__bullet" src="../../../assets/img/check.svg" v-if="acomod.allowFestas">
            <img class="__bullet" src="../../../assets/img/close-mobile.svg" v-else>
            <h3>{{ acomod.allowFestas ? 'São permitidas festas ou eventos.' : 'Não são permitidas festas ou eventos.' }}</h3>
          </div>
          <div class="regra">
            <img class="__bullet" src="../../../assets/img/check.svg" v-if="acomod.allowPets">
            <img class="__bullet" src="../../../assets/img/close-mobile.svg" v-else>
            <h3>{{ acomod.allowPets ? 'São permitidos animais de estimação.' : 'Não são permitidos animais de estimação.' }}</h3>
          </div>
          <div class="regra">
            <img class="__bullet" src="../../../assets/img/check.svg" v-if="acomod.allowBabys">
            <img class="__bullet" src="../../../assets/img/close-mobile.svg" v-else>
            <h3>{{ acomod.allowBabys ? 'É adequada para bebês e recém-nascidos.' : 'Não é adequada para bebês e recém-nascidos.' }}</h3>
          </div>
          <div class="regra">
            <img class="__bullet" src="../../../assets/img/check.svg" v-if="acomod.allowFumar">
            <img class="__bullet" src="../../../assets/img/close-mobile.svg" v-else>
            <h3>{{ acomod.allowFumar ? 'É permitido fumar.' : 'Não é permitido fumar.' }}</h3>
          </div>

          <h3 class="__text" style="padding-top: 1rem" v-for="regra in acomod.regrasAdicionais">{{ regra }}</h3>
          <!-- REGRAS -->
          



          <!-- PAGAMENTO -->
          <h3 class="__subtitle">Pagamento</h3>
          
          <h3 class="__text">{{ reservaAcomod.guest.fullName.split(' ')[0] }}, o pagamento do valor total desta reserva, <span style="font-weight:600">R${{ reservaAcomod.valorReservaTotal.toLocaleString() }}</span>, deverá ser efetuado diretamente com o anunciante, {{ host.firstName }}, no dia do check-out.</h3>
          
          <h3 class="__text">Forma de pagamento...</h3>
          <!-- PAGAMENTO -->



          <!-- TERMOS -->
          <h4 class="__termos">Ao confirmar você concorda com as regras {{ tipoAcomodD }} e nossos <a href="/termos" target="_blank" style="color:#FFA04F">Termos de Serviço</a>.</h4>
          <!-- TERMOS -->



          <button class="__next-btn" type="button" :style="form2ok" @click="confirmarReserva">Confirmar Reserva</button>


        </div><!-- ******************** DETALHES E CONFIRMAÇÃO ******************** -->



        

      </div><!-- ________________________________________ FLEX LEFT ________________________________________ -->







      <!-- ________________________________________ FLEX RIGHT ________________________________________ -->
      <div class="flex-right">
        
        <progressive-background class="__img" :src="imageH" :placeholder="acomod.images[0].L" :aspect-ratio="2/3"/>

        <div class="card-body">


          <h1 class="__card-title">{{ acomod.title }}</h1>


          <div class="rating">
            <star-rating
              :rating="4.7"
              :increment="0.1"
              :read-only="true"
              :show-rating="false"
              active-color="#161616"
              inactive-color="#dedede"
              :star-size="12"
              :padding="3">
            </star-rating>
            <p class="rating-number">4,7</p>
          </div>


          <div class="detalhes-reserva-data">

            <div class="detalhes-reserva-data_item">
              <img src="../../../assets/img/calendar.svg" class="__img" style="transform: scale(.91)">
              <h3 style="font-size: 15px;  text-transform: capitalize">{{ periodoReserva }}</h3>
            </div>

            <div class="detalhes-reserva-data_item">
              <img src="../../../assets/img/guests.svg" class="__img">
              <h3 style="font-size:15px">{{ reservaAcomod.totalHospedes === 1 ? reservaAcomod.totalHospedes + ' hóspede' : reservaAcomod.totalHospedes + ' hóspedes' }}</h3>
            </div>

          </div>



          <div class="detalhes-reserva-valor" v-if="reservaAcomod.valorReservaTotal !== null">

            <div class="detalhes-reserva-valor_item-total" style="padding-top: .8rem">
              <h3>Total</h3>
              <h3 class="__valor-total">R${{ reservaAcomod.valorReservaTotal.toLocaleString() }}</h3>
            </div>

            <p class="__ver-detalhes" @click="$modal.show('detalhes-valor-modal')">Ver detalhes</p>

            <detalhes-valor/>

          </div>
          


        </div>

      </div><!-- ________________________________________ FLEX RIGHT ________________________________________ -->


    </div>






    <!-- ________________________________________ FOOTER ________________________________________ -->
    <div class="footer" v-if="!$store.state.concludedReservaAcomod">
      <div style="display: flex; align-items: center">
        <img class="__img" src="../../../assets/img/brand.svg">
        <h3 class="__text">&copy Escarpas Trip. Capitólio/MG - Brasil. CNPJ: 99.999.999/9999-99.</h3>
      </div>
      <a class="__ajuda" href="/ajuda" target="_blank" >Ajuda</a>
    </div><!-- ________________________________________ FOOTER ________________________________________ -->







    <!-- ________________________________________ CONCLUDED RESERVA ________________________________________ -->
    <div class="concluded-reserva" v-if="$store.state.concludedReservaAcomod">

      <img class="__img" src="../../../assets/img/congratulations.svg">

      <h1 class="__title">Boa {{ reservaAcomod.guest.fullName.split(' ')[0] }}! Agora é hora de relaxar.</h1>

      <h3 class="__text">
        Dentro dos próximos dias {{ host.firstName }} irá entrar em contato com você para decidirem os detalhes de sua estadia. O código de sua reserva é <span style="font-weight:600">{{ reservaAcomod.reservaID }}</span>. Anote-o para eventuais consultas.
      </h3>
      

      <!-- TODO: ADICIONAR RECOMENDAÇÕES -->
      <!-- <h3 class="__subtitle">Aproveite e reserve também um passeio!</h3> -->


      <h3 class="__subtitle">Dúvidas?</h3>
      <h3 class="__text">Entre em contato conosco pelo nosso WhatsApp: (34) 99141-0085 ou e-mail: contato@escarpastrip.com.</h3>
      


      <nuxt-link to="/" style="margin-top:4rem">
        <button class="__next-btn" type="button" style="background: #FFA04F; margin:0">Voltar para Página Inicial</button>
      </nuxt-link>
      
    </div><!-- ________________________________________ CONCLUDED RESERVA ________________________________________ -->





  </div>
</template>

<script>
import firebase from '@firebase/app'
import 'firebase/firestore'
import supportsWebP from 'supports-webp'
import MaskedInput from 'vue-text-mask'
import detalhesValor from '@/components/reserva-acomod/detalhesValor'
import { tipoAcomod } from '@/mixins/tipoAcomod'
import scrollIntoView from 'scroll-into-view'
import * as Email from 'email-validator'
import format from 'date-fns/format'
import pt from 'date-fns/locale/pt'
import eachDay from 'date-fns/each_day'

export default {
  components: { MaskedInput, detalhesValor },
  mixins: [ tipoAcomod ],
  head () {
    return {
      title: 'Reservar: ' + this.acomod.title
    }
  },
  middleware: 'reservaValidate',
  transition: 'opacity',
  data () {
    return {
      nameError: false,
      emailError: false,
      celularError: false
    }
  },
  methods: {
    scrollTop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    validateEmail () {
      !Email.validate(this.reservaAcomod.guest.email) ? this.emailError = true : this.emailError = false
    },
    keyEnterName () {
      if (event.key === 'Enter') {
        scrollIntoView(this.$refs.email)
        this.$refs.email.focus()
      }
    },
    keyEnterEmail () {
      if (event.key === 'Enter') {
        scrollIntoView(this.$refs.email)
        this.$refs.email.focus()
      }
    },
    nextBtn1 () {
      if (this.reservaAcomod.guest.fullName !== '' && Email.validate(this.reservaAcomod.guest.email) && this.reservaAcomod.guest.celular.length === 17) {
        this.$store.state.etapaReserva2ok = true, this.$store.commit('m_reservaAcomodDesktop1', false), this.$store.commit('m_reservaAcomodDesktop2', true), this.scrollTop()
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Informações incompletas.'
        })
        this.reservaAcomod.guest.fullName === '' ? this.nameError = true : this.nameError = false
        !Email.validate(this.reservaAcomod.guest.email) ? this.emailError = true : this.emailError = false
        this.reservaAcomod.guest.celular.length < 17 ? this.celularError = true : this.celularError = false
      }
    },
    async confirmarReserva () {
      try {
        this.$store.commit('m_loader', true)

        /* Gerar reservaID e popular reservaAcomod */
        let reservaID = await Math.floor(Math.random() * (99999 - 10000 + 1) + 10000).toString()
        const reserva = await firebase.firestore().doc(`reservasAcomods/${reservaID}`).get()
        if (reserva.exists) {
          do {
            reservaID = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000).toString()
            this.reservaAcomod.reservaID = reservaID
          } while (!reserva.exists)
        } else {
          this.reservaAcomod.reservaID = reservaID
        }

        this.reservaAcomod.createdAt = Date.now()
        this.reservaAcomod.acomodID = this.acomod.acomodID
        this.reservaAcomod.tipoAcomod = this.acomod.tipoAcomod
        this.reservaAcomod.hostID = this.acomod.hostID
        this.reservaAcomod.guest.firstName = this.reservaAcomod.guest.fullName.split(' ')[0]

        /* Criar reserva na Firestore */
        await firebase.firestore().doc(`reservasAcomods/${this.reservaAcomod.reservaID}`).set(this.reservaAcomod)

        /* Atualizar disabledDates */
        const eachDayReserva = eachDay(this.reservaAcomod.startDate, this.reservaAcomod.endDate)

        let parsedEachDayReserva = []

        eachDayReserva.forEach(date => {
          parsedEachDayReserva.push(format(date, 'YYYY-MM-DD'))
        })

        for (const date of parsedEachDayReserva) {
          await firebase.firestore().doc(`acomods/${this.acomod.acomodID}`).update({
            disabledDates_escarpasTrip: firebase.firestore.FieldValue.arrayUnion(date)
          })
        }

        /* Atualizar visit */
        await firebase.firestore().doc(`acomods/${this.acomod.acomodID}/visits/${this.$store.state.visitID}`).update({ concludedReserva: true })

        /* Finalizar */
        this.$store.state.concludedReservaAcomod = true
        this.scrollTop()
        this.$store.commit('m_loader', false)

      } catch (err) {
        console.log(err)
        this.$store.commit('m_loader', false)
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          persist: true,
          message: 'Falha no servidor. Tente novamente ou entre em contato conosco por favor.'
        })
      }
    },
    backEtapa1 () {
      if (this.$store.state.etapaReserva1ok === true) {
        this.$store.commit('m_reservaAcomodDesktop1', true), this.$store.commit('m_reservaAcomodDesktop2', false)
      }
    },
    backEtapa2 () {
      if (this.$store.state.etapaReserva2ok === true) {
        this.$store.commit('m_reservaAcomodDesktop1', false), this.$store.commit('m_reservaAcomodDesktop2', true)
      }
    }
  },
  computed: {
    /* ******************** PATHS ******************** */
    reservaAcomod () { return this.$store.state.reservaAcomod },
    acomod () { return this.$store.state.acomod },
    host () { return this.$store.state.host },
    name () { return this.reservaAcomod.guest.fullName },
    email () { return this.reservaAcomod.guest.email },
    celular () { return this.reservaAcomod.guest.celular },
    concludedReservaAcomod () { return this.$store.state.concludedReservaAcomod },
    /* ******************** FORM STYLES ******************** */
    form1ok () {
      if (this.reservaAcomod.guest.fullName !== '' && Email.validate(this.reservaAcomod.guest.email) && this.reservaAcomod.guest.celular.length === 17) {
        return 'background: #FFA04F'
      }
    },
    form2ok () {
      return 'background: #FFA04F'
    },
    /* ******************** PROGRESS ******************** */
    etapaProgressed1 () {
      return this.$store.state.etapaReserva1ok === true ? 'font-weight: 600' : 'cursor: default'
    },
    etapaProgressed2 () {
      return this.$store.state.etapaReserva2ok === true ? 'font-weight: 600' : 'cursor: default'
    },
    /* ******************** IMAGES ******************** */
    imageH () {
      return supportsWebP ? this.acomod.images[0].HW : this.acomod.images[0].HJ
    },

    /* ******************** DATES ******************** */
    periodoReserva () {
      const startDate = this.reservaAcomod.startDate
      const endDate = this.reservaAcomod.endDate
      if (startDate !== '' && endDate !== '') {
        return `${format(startDate, 'ddd, DD MMM YYYY', { locale: pt })}  →  ${format(endDate, 'ddd, DD MMM YYYY', { locale: pt })}`
      }
    },
    checkInMonth () {
      return format(this.reservaAcomod.startDate, 'MMM', { locale: pt }).toUpperCase()
    },
    checkInDay () {
      return format(this.reservaAcomod.startDate, 'DD')
    },
    checkInWeekday () {
      const weekday = format(this.reservaAcomod.startDate, 'dddd', { locale: pt })
      return `Check-in ${weekday.includes('feira') ? 'na' : 'no'} ${weekday.charAt(0).toUpperCase() + weekday.slice(1)}`
    },
    checkInHour () {
      return this.acomod.checkInTime === 'A qualquer hora' ? 'A qualquer hora' : `Após as ${this.acomod.checkInTime}`
    },
    checkOutMonth () {
      return format(this.reservaAcomod.endDate, 'MMM', { locale: pt }).toUpperCase()
    },
    checkOutDay () {
      return format(this.reservaAcomod.endDate, 'DD')
    },
    checkOutWeekday () {
      const weekday = format(this.reservaAcomod.endDate, 'dddd', { locale: pt })
      return `Check-out ${weekday.includes('feira') ? 'na' : 'no'} ${weekday.charAt(0).toUpperCase() + weekday.slice(1)}`
    },
    checkOutHour () {
      return this.acomod.checkOutTime === 'A qualquer hora' ? 'A qualquer hora' : `Até as ${this.acomod.checkOutTime}`
    }
  },
  watch: {
    name (value) { value !== '' ? this.nameError = false : '' },
    email (value) { value !== '' ? this.emailError = false : '' },
    celular (value) { value !== '' ? this.celularError = false : '' }
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
    this.$store.state.concludedReservaAcomod = false
    next()
  }
}
</script>

<style scoped>
@import url('~/assets/css/reservaDesktop.css');
</style>