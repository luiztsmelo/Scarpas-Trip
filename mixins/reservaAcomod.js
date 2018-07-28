import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

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
  methods: {
    scrollTop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    scrollBottom () {
      window.scrollTo(0, document.body.scrollHeight)
    }
  },
  computed: {
    /* ******************** PATHS ******************** */
    acomod () { return this.$store.state.acomod },
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

    dayAfterCheckin () {
      if (this.reservaAcomod !== null) {
        const checkIn = new Date(this.reservaAcomod.periodoReserva.start)
        return dayjs(checkIn).add(1, 'day').format('DD/MM')
      }
    }
  }
}
