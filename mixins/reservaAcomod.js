import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

export const reservaAcomod = {
  methods: {
    scrollTop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  },
  computed: {
    acomod () { return this.$store.state.acomod },
    user () { return this.$store.state.user },
    reservaAcomod () { return this.$store.state.reservaAcomod },
    tipoAcomod () {
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
    dayAfterCheckin () {
      const checkIn = new Date(this.reservaAcomod.periodoReserva.start)
      return dayjs(checkIn).add(1, 'day').format('DD/MM')
    }
  }
}
