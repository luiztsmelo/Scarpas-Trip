import * as firebase from 'firebase'

export default async function ({ store, route, redirect }) {
  try {
    store.commit('m_loader', true)

    const docAcomod = await firebase.firestore().doc(`acomods/${route.params.id}`).get()

    if (docAcomod.exists) {
      const visit = await firebase.firestore().collection(`acomods/${route.params.id}/visits`).add({
        date: new Date().getTime(),
        fromMobile: store.state.isMobile,
        clickedReservaBtn: false,
        wentToReservaPage: false,
        concludedReserva: false
      })
      store.state.visitID = visit.id
    } else {
      store.commit('m_loader', false)
      store.commit('show_alert', {
        type: 'warning',
        title: 'Ops',
        message: `A acomodação ${route.params.id} não está listada. Veja se alguma dessas lhe agrada.`,
        persist: true
      })
      redirect('/acomodacoes/')
    }
  } catch (err) {
    redirect('/')
    store.commit('m_loader', false)
    console.log(err)
  }
}
