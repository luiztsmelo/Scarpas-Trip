import * as firebase from 'firebase'
require('firebase/firestore')

export default function ({ store, route, redirect }) {
  firebase.firestore().collection('acomods').doc(route.params.id).get()
  .then(doc => {
    if (!doc.exists) {
      store.state.acomodRef = route.params.id
      store.state.error = true
      store.state.acomodPageError = true
      return redirect('/')
    }
  })
}
