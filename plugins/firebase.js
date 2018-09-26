import firebase from '@firebase/app'
import 'firebase/firestore'

try {
  firebase.initializeApp({
    apiKey: 'AIzaSyBymjmATc5536uHVWZ4heTdiwQ71quNtdM',
    authDomain: 'escarpas-trip.firebaseapp.com',
    databaseURL: 'https://escarpas-trip.firebaseio.com/',
    projectId: 'escarpas-trip',
    storageBucket: 'gs://escarpas-trip.appspot.com',
    messagingSenderId: '538198720870'
  })
  firebase.firestore().settings({
    timestampsInSnapshots: true /* Breaking change. Prevenção de bug */
  })
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}

export default firebase
