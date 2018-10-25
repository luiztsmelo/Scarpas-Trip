import firebase from '@firebase/app'
import 'firebase/firestore'
import subDays from 'date-fns/sub_days'

export default async function ({ store, route, redirect }) {
  try {
    store.commit('m_loader', true)

    const passeio = await firebase.firestore().doc(`passeios/${route.params.id}`).get()

    if (passeio.exists) {
      /* Add visit a esse passeio */
      firebase.firestore().collection(`passeios/${route.params.id}/visits`).add({
        date: new Date().getTime(),
        fromMobile: store.state.isMobile,
        clickedReservaBtn: false,
        wentToReservaPage: false,
        concludedReserva: false
      })
      .then(visit => { store.state.visitID = visit.id }).catch(err => console.log(err))
      /* Get visits do mês atual desse passeio */
      const startDateLast30Days = subDays(new Date(), 30)
      firebase.firestore().collection(`passeios/${route.params.id}/visits`).where('date', '>', Date.parse(startDateLast30Days)).get()
      .then(visits => { store.commit('m_visitsLastMonth', visits.size) }).catch(err => console.log(err))
    } else {
      store.commit('m_loader', false)
      store.commit('show_alert', {
        type: 'warning',
        title: 'Ops',
        message: `O passeio ${route.params.id} não está listada. Veja se algum desses lhe agrada.`,
        persist: true
      })
      redirect('/passeios')
    }
  } catch (err) {
    redirect('/')
    store.commit('m_loader', false)
    console.log(err)
  }
}
