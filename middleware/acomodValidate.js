import * as firebase from 'firebase'
require('firebase/firestore')

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
      .then(doc => {
        store.state.visitID = doc.id
      }).catch(err => console.log(err))
    } else {
      store.state.acomodRef = route.params.id
      store.state.error = true
      store.state.acomodPageError = true
      redirect('/')
    }
  } catch (err) {
    console.log(err)
  }
}
