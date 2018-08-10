import valid from 'card-validator'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

valid.creditCardType.addCard({ /* Add Elo */
  niceType: 'Elo',
  type: 'elo',
  prefixPattern: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/,
  exactPattern: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/,
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: 'CVV',
    size: 3
  }
})
valid.creditCardType.addCard({ /* Remove Maestro */
  niceType: 'Maestro',
  type: valid.creditCardType.types.MAESTRO,
  prefixPattern: /^(000000)$/,
  exactPattern: /^([0-1])\d*$/,
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: 'CVV',
    size: 3
  }
})

export const reservaAcomod = {
  data () {
    return {
      messageError: false,
      cardNumberError: false,
      cardHolderNameError: false,
      cardExpirationDateError: false,
      cardCvvError: false,
      guestNameError: false,
      cpfError: false,
      celularError: false,
      zipcodeError: false,
      streetError: false,
      streetNumberError: false,
      neighborhoodError: false,
      cityError: false,
      stateError: false
    }
  },
  computed: {
    /* ******************** PATHS ******************** */
    acomod () { return this.$store.state.acomod },
    authUser () { return this.$store.state.authUser },
    user () { return this.$store.state.user },
    reservaAcomod () { return this.$store.state.reservaAcomod },
    concludedReservaAcomod () { return this.$store.state.concludedReservaAcomod },
    message () { return this.reservaAcomod.message },
    /* Credit Card */
    creditCard () { return this.$store.state.creditCard },
    cardNumber () { return this.$store.state.creditCard.cardNumber },
    cardHolderName () { return this.$store.state.creditCard.cardHolderName },
    cardExpirationDate () { return this.$store.state.creditCard.cardExpirationDate },
    cardCVV () { return this.$store.state.creditCard.cardCVV },
    cardType () { return this.$store.state.cardType },
    /* Billing */
    guestName () { return this.reservaAcomod.guestName },
    guestCPF () { return this.reservaAcomod.guestCPF },
    guestCelular () { return this.reservaAcomod.guestCelular },
    zipcode () { return this.reservaAcomod.billing.zipcode },
    street () { return this.reservaAcomod.billing.street },
    streetNumber () { return this.reservaAcomod.billing.street_number },
    neighborhood () { return this.reservaAcomod.billing.neighborhood },
    city () { return this.reservaAcomod.billing.city },
    state () { return this.reservaAcomod.billing.state },

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

    dayAfterCheckin () {
      if (this.reservaAcomod !== null) {
        const checkIn = new Date(this.reservaAcomod.periodoReserva.start)
        return dayjs(checkIn).add(1, 'day').format('DD/MM')
      }
    }
  }
}
