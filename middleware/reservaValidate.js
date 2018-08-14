export default function ({ store, redirect }) {
  if (!store.state.isReservar) {
    store.commit('show_alert', {
      type: 'warning',
      title: 'Ops',
      message: 'Reserva não encontrada.',
      persist: true
    })
    return redirect('/')
  }
}
