import * as firebase from 'firebase'

export default async function ({ store, route, redirect }) {
  try {
    store.commit('m_loader', true)

    const docAcomod = await firebase.firestore().collection('acomods').doc(route.params.id).get()

    if (docAcomod.exists) {
      firebase.firestore().collection('acomods').doc(route.params.id).collection('visits').add({
        date: new Date().getTime(),
        fromMobile: store.state.isMobile,
        clickedReservaBtn: false,
        wentToReservaPage: false,
        concludedReserva: false
      })
      .then(doc => { store.state.visitID = doc.id }).catch(err => console.log(err))
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
    store.commit('m_loader', false)
    console.log(err)
  }
}
