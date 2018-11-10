<template>
  <div class="reservar">
    



    <!-- ________________________________________ HEADER PROGRESS ________________________________________ -->
    <div class="header-progress" v-if="!$store.state.concludedReservaPasseio">

      <nuxt-link to="/" class="brand">
        <img class="__brand-img" src="../../../static/brand.svg" draggable="false">
      </nuxt-link>

      <div class="progress">
        <h3 class="__item-progress" :style="etapaProgressed1" @click="backEtapa1">1. Identificação</h3>
        
        <h3 class="__arrow-right">→</h3>

        <h3 class="__item-progress" :style="etapaProgressed2" @click="backEtapa2">2. Revisar detalhes e confirmar</h3>
      </div>

    </div><!-- ________________________________________ HEADER PROGRESS ________________________________________ -->





    <div class="reserva-body" v-if="!$store.state.concludedReservaPasseio">




      <!-- ________________________________________ FLEX LEFT ________________________________________ -->
      <div class="flex-left">




        <!-- ******************** IDENTIFICAÇÃO ******************** -->
        <div v-if="$store.state.reservaPasseioDesktop1 === true">


          <h1 class="__title">Ótima escolha! Podemos te conhecer melhor?</h1>


          <!-- NAME -->
          <div class="item-form">
            <label :class="[ nameError ? 'has-error-label' : '' ]">Nome completo</label>
            <input
              :class="[ nameError ? 'has-error' : '' ]"
              type="text" 
              pattern="[A-Za-z]"
              @keypress="keyEnterName"
              v-model="$store.state.reservaPasseio.guest.fullName">
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
              v-model="$store.state.reservaPasseio.guest.email">
          </div><!-- E-MAIL -->


          <!-- CELULAR -->
          <div class="item-form">
            <label :class="[ celularError ? 'has-error-label' : '' ]">Celular / WhatsApp</label>
            <masked-input
              ref="celular"
              :class="[ celularError ? 'has-error' : '' ]"
              type="tel"
              v-model="$store.state.reservaPasseio.guest.celular"
              :mask="['+', 5, 5, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]"
              :guide="false"
              placeholder="+55">
            </masked-input>
          </div><!-- CELULAR -->
          


          <button class="__next-btn" type="button" :style="form1ok" @click="nextBtn1">Continuar</button>


        </div><!-- ******************** IDENTIFICAÇÃO ******************** -->





        <!-- ******************** DETALHES E CONFIRMAÇÃO ******************** -->
        <div v-if="$store.state.reservaPasseioDesktop2 === true">


          <h1 class="__title">Revisar detalhes e confirmar</h1>


       

          <!-- PAGAMENTO -->
          <h3 class="__subtitle">Lembretes</h3>
          
          <h3 class="__text">Lembretes aqui.</h3>
          <!-- PAGAMENTO -->



          <!-- PAGAMENTO -->
          <h3 class="__subtitle">Pagamento</h3>
          
          <h3 class="__text">{{ reservaPasseio.guest.fullName.split(' ')[0] }}, detalhes sobre o pagamento aqui.</h3>
          <!-- PAGAMENTO -->




          <!-- TERMOS -->
          <h4 class="__termos">Ao confirmar você concorda com nossos <a href="/termos" target="_blank" style="color:#198CFE">Termos de Serviço</a> e <a href="/termos#politica_privacidade" target="_blank" style="color:#198CFE">Política de Privacidade</a>.</h4>
          <!-- TERMOS -->



          <button class="__next-btn" type="button" :style="form2ok" @click="confirmarReserva">Confirmar Reserva</button>


        </div><!-- ******************** DETALHES E CONFIRMAÇÃO ******************** -->



        

      </div><!-- ________________________________________ FLEX LEFT ________________________________________ -->







      <!-- ________________________________________ FLEX RIGHT ________________________________________ -->
      <div class="flex-right">
        
        <progressive-background class="__img" :src="imageH" :placeholder="passeio.images[0].L" :aspect-ratio="2/3"/>

        <div class="card-body">


          <h1 class="__card-title">{{ passeio.title }}</h1>


          <div class="rating">
            <star-rating
              :rating="4.7"
              :increment="0.5"
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
              <h3 style="font-size: 15px">{{ periodoReserva }}</h3>
            </div>

            <div class="detalhes-reserva-data_item">
              <img src="../../../assets/img/guests.svg" class="__img">
              <h3 style="font-size:15px">{{ reservaPasseio.totalPessoas === 1 ? reservaPasseio.totalPessoas + ' pessoa' : reservaPasseio.totalPessoas + ' pessoas' }}</h3>
            </div>

          </div>



          <div class="detalhes-reserva-valor" v-if="reservaPasseio.valorReservaTotal !== null">

            <div class="detalhes-reserva-valor_item-total" style="padding-top: .8rem">
              <h3>Valor por pessoa</h3>
              <h3 class="__valor-total">R${{ passeio.rotas[reservaPasseio.rota - 1].valor.toLocaleString() }}</h3>
            </div>

          </div>
          


        </div>

      </div><!-- ________________________________________ FLEX RIGHT ________________________________________ -->


    </div>






    <!-- ________________________________________ FOOTER ________________________________________ -->
    <div class="footer" v-if="!$store.state.concludedReservaPasseio">
      <div style="display: flex; align-items: center">
        <img class="__img" src="../../../assets/img/brand.svg">
        <h3 class="__text">&copy Escarpas Trip. Capitólio/MG - Brasil. CNPJ: 99.999.999/9999-99.</h3>
      </div>
      <a class="__ajuda" href="/ajuda" target="_blank" >Ajuda</a>
    </div><!-- ________________________________________ FOOTER ________________________________________ -->







    <!-- ________________________________________ CONCLUDED RESERVA ________________________________________ -->
    <div class="concluded-reserva" v-if="$store.state.concludedReservaPasseio">

      <img class="__img" src="../../../assets/img/congratulations.svg">

      <h1 class="__title">Boa {{ reservaPasseio.guest.fullName.split(' ')[0] }}! Agora é hora de relaxar.</h1>

      <h3 class="__text">
        Dentro dos próximos dias {{ host.firstName }} irá entrar em contato com você para decidirem os detalhes de sua estadia. O código de sua reserva é <span style="font-weight:600">{{ reservaPasseio.reservaID }}</span>. Anote-o para eventuais consultas.
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
import scrollIntoView from 'scroll-into-view'
import * as Email from 'email-validator'
import format from 'date-fns/format'
import pt from 'date-fns/locale/pt'
import eachDay from 'date-fns/each_day'

export default {
  components: { MaskedInput },
  head () {
    return {
      title: 'Reservar: ' + this.passeio.title
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
      !Email.validate(this.reservaPasseio.guest.email) ? this.emailError = true : this.emailError = false
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
      if (this.reservaPasseio.guest.fullName !== '' && Email.validate(this.reservaPasseio.guest.email) && this.reservaPasseio.guest.celular.length === 17) {
        this.$store.state.etapaReserva2ok = true, this.$store.commit('m_reservaPasseioDesktop1', false), this.$store.commit('m_reservaPasseioDesktop2', true), this.scrollTop()
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Informações incompletas.'
        })
        this.reservaPasseio.guest.fullName === '' ? this.nameError = true : this.nameError = false
        !Email.validate(this.reservaPasseio.guest.email) ? this.emailError = true : this.emailError = false
        this.reservaPasseio.guest.celular.length < 17 ? this.celularError = true : this.celularError = false
      }
    },
    async confirmarReserva () {
      try {
        this.$store.commit('m_loader', true)

        /* Gerar reservaID e popular reservaPasseio */
        let reservaID = await Math.floor(Math.random() * (99999 - 10000 + 1) + 10000).toString()
        const reserva = await firebase.firestore().doc(`reservasPasseios/${reservaID}`).get()
        if (reserva.exists) {
          do {
            reservaID = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000).toString()
            this.reservaPasseio.reservaID = reservaID
          } while (!reserva.exists)
        } else {
          this.reservaPasseio.reservaID = reservaID
        }

        this.reservaPasseio.createdAt = Date.now()
        this.reservaPasseio.passeioID = this.passeio.passeioID
        this.reservaPasseio.tipoPasseio = this.passeio.tipoPasseio
        this.reservaPasseio.hostID = this.passeio.hostID
        this.reservaPasseio.guest.firstName = this.reservaPasseio.guest.fullName.split(' ')[0]

        /* Criar reserva na Firestore */
        await firebase.firestore().doc(`reservasPasseios/${this.reservaPasseio.reservaID}`).set(this.reservaPasseio)

        /* Atualizar disabledDates */
        await firebase.firestore().doc(`passeios/${this.passeio.passeioID}`).update({
          disabledDates: format(this.reservaPasseio.date, 'YYYY-MM-DD') /* CONFERIR SE ESTÁ MERGINDO */
        })

        /* Atualizar visit */
        await firebase.firestore().doc(`passeios/${this.passeio.passeioID}/visits/${this.$store.state.visitID}`).update({ concludedReserva: true })

        /* Finalizar */
        this.$store.state.concludedReservaPasseio = true
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
        this.$store.commit('m_reservaPasseioDesktop1', true), this.$store.commit('m_reservaPasseioDesktop2', false)
      }
    },
    backEtapa2 () {
      if (this.$store.state.etapaReserva2ok === true) {
        this.$store.commit('m_reservaPasseioDesktop1', false), this.$store.commit('m_reservaPasseioDesktop2', true)
      }
    }
  },
  computed: {
    /* ******************** PATHS ******************** */
    reservaPasseio () { return this.$store.state.reservaPasseio },
    passeio () { return this.$store.state.passeio },
    host () { return this.$store.state.host },
    name () { return this.reservaPasseio.guest.fullName },
    email () { return this.reservaPasseio.guest.email },
    celular () { return this.reservaPasseio.guest.celular },
    concludedReservaPasseio () { return this.$store.state.concludedReservaPasseio },
    /* ******************** FORM STYLES ******************** */
    form1ok () {
      if (this.reservaPasseio.guest.fullName !== '' && Email.validate(this.reservaPasseio.guest.email) && this.reservaPasseio.guest.celular.length === 17) {
        return 'background: #198CFE'
      }
    },
    form2ok () {
      return 'background: #198CFE'
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
      return supportsWebP ? this.passeio.images[0].HW : this.passeio.images[0].HJ
    },

    /* ******************** DATES ******************** */
    periodoReserva () {
      const date = this.reservaPasseio.date
      const weekday = format(date, 'dddd', { locale: pt })
      const weekdayCapitalized = weekday.charAt(0).toUpperCase() + weekday.slice(1)
      const day = format(date, 'D', { locale: pt })
      const month = format(date, 'MMMM', { locale: pt })
      return date !== '' ? `${weekdayCapitalized}, ${day} de ${month}` : ''
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
      firebase.firestore().doc(`passeios/${vm.$store.state.passeio.passeioID}/visits/${vm.$store.state.visitID}`).update({ 
        wentToReservaPage: true
      })
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('m_isReservar', false)
    this.$store.dispatch('a_resetReservaPasseio')
    this.$store.state.concludedReservaPasseio = false
    next()
  }
}
</script>

<style scoped>
@import url('~/assets/css/reservaDesktop.css');
</style>