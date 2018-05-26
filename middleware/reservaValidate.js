export default function ({ store, redirect }) {
  if (!store.state.isReservar) {
    store.state.error = true
    store.state.reservaPageError = true
    return redirect('/')
  }
}
