import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as pagarme from 'pagarme'
import * as dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import * as numeral from 'numeral'
import 'numeral/locales/pt-br'
/* import axios from 'axios' */



/* Firebase admin */
admin.initializeApp(functions.config().firebase)


/* Axios */
/* const AirtableAcomodsURL = 'https://api.airtable.com/v0/appfQX2S7rMRlBWoh/Acomods'
const AirtableConfig = {
  headers: {
    'Authorization': `Bearer ${functions.config().airtable.key}`,
    'Content-type': 'application/json'
  }
} */

/* Mailjet */
const Mailjet = require ('node-mailjet').connect(`${functions.config().mailjetpublic.key}`, `${functions.config().mailjetprivate.key}`)
const ESemail = 'contato@escarpastrip.com'
const ESname = 'Escarpas Trip'


/* Day.js */
dayjs.locale('pt-br')


/* Numeral */
numeral.locale('pt-br')




/* _______________________________________________ WATCHERS _______________________________________________ */

/* TRIGGER URL GERAL: https://us-central1-escarpas-trip.cloudfunctions.net/<function-name> */

exports.watch_reservaExpiration = functions.https.onRequest(async (req, res) => {
  try {
    const snap = await admin.firestore().collection('reservasAcomods').where('status', '==', 'pending').get()
    const pendingReservas = snap.docs.map(doc => doc.data())

    /* Para evitar bugs, checar se há alguma reserva pending primeiro */
    if (pendingReservas.length > 0) {

      /* Para cada reserva pending */
      pendingReservas.forEach(async reserva => {
        const requestedDate = dayjs(reserva.requested)
        const dateNow = dayjs()

        /* Se feita a 2 dias atrás */
        if (requestedDate.diff(dateNow, 'day') <= -2) {

          /* Update status para 'expired' na Firestore */
          await admin.firestore().collection('reservasAcomods').doc(reserva.reservaID).update({ status: 'expired', isRunning: false })

          console.log(`Reserva ${reserva.reservaID} [${requestedDate.diff(dateNow, 'day')}] foi expirada.`)
        } else {
          console.log(`Reserva ${reserva.reservaID} [${requestedDate.diff(dateNow, 'day')}] não precisa ser expirada.`)
        }
      })

      res.status(200).end()

    } else {
      console.log('Nenhuma reserva pending encontrada. Operação abortada sem falhas.')
      res.status(200).end()
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).end()
  }
})


/* ________________________________________________ USER ________________________________________________ */

exports.newUser = functions.https.onCall(async data => {
  const user = data.user

  try {
    /* Criar user na Firestore */
    await admin.firestore().collection('users').doc(user.userID).set(user)

    /* Enviar welcome e-mail */
    await Mailjet.post('send', {'version': 'v3.1'}).request({
      'Messages': [{
        'From': { 'Email': ESemail, 'Name': ESname },
        'To': [{
          'Email': user.email,
          'Name': user.fullName
        }],
        'TemplateID': 492003,
        'TemplateLanguage': true,
        'Subject': 'Bem-vindo à Escarpas Trip!',
        'Variables': {
          'firstName': user.firstName
        }
      }]
    })
  } catch (err) {
    console.log(err)
    throw new functions.https.HttpsError('aborted', err.message, err)
  }
})






/* ________________________________________________ ACOMODS ________________________________________________ */


exports.newAcomod = functions.https.onCall(async data => {
  const acomodData = data.acomodData
  const bankAccount = data.bankAccount

  try {
    const Pagarme = await pagarme.client.connect({ api_key: 'ak_test_E3I46o4e7guZDqwRnSY9sW8o8HrL9D' })
    
    const recipient = await Pagarme.recipients.create({
      transfer_enabled: false,
      transfer_interval: 'daily',
      automatic_anticipation_enabled: true,
      anticipatable_volume_percentage: 100,
      bank_account: {
        bank_code: bankAccount.bankCode.substring(0, 3),
        type: bankAccount.type,
        agencia: bankAccount.agencia,
        agencia_dv: bankAccount.agenciaDV,
        conta: bankAccount.conta,
        conta_dv: bankAccount.contaDV,
        legal_name: bankAccount.legalName,
        document_number: bankAccount.docNumber.replace(/\./g, '').replace(/\-/g, '')
      }
    })
    
    acomodData.recipientID = recipient.id

    /* Criar acomod na Firestore */
    await admin.firestore().collection('acomods').doc(acomodData.acomodID).set(acomodData)

    /* Atualizar user na Firestore */
    await admin.firestore().collection('users').doc(acomodData.userID).update({ 
      isAcomodHost: true, 
      celular: acomodData.celular
    })

  } catch (err) {
    console.log(err)
    throw new functions.https.HttpsError('aborted', err.message, err)
  }
})





exports.newReservaAcomod = functions.https.onCall(async (data, context) => {
  const reservaAcomod = data.reservaAcomod
  const creditCard = data.creditCard
  const acomod = data.acomod
  const visitID = data.visitID
 
  const guestCPF = reservaAcomod.guestCPF.replace(/[^0-9\.]+/g, '').replace(/\./g, '')
  const guestCelular = '+55' + reservaAcomod.guestCelular.replace(/[^0-9\.]+/g, '')
  const zipcode = reservaAcomod.billing.zipcode.replace(/[^0-9\.]+/g, '')

  /* ------------------- CREDIT CARD ------------------- */
  if (reservaAcomod.paymentMethod === 'credit_card') {
    try {
      const Pagarme = await pagarme.client.connect({ api_key: 'ak_test_E3I46o4e7guZDqwRnSY9sW8o8HrL9D' })

      const transaction = await Pagarme.transactions.create({
        'amount': reservaAcomod.valorReservaTotal * 100,
        'capture': false,
        'installments': reservaAcomod.parcelas,
        'payment_method': 'credit_card',
        'card_number': creditCard.cardNumber.replace(/[^0-9\.]+/g, ''),
        'card_cvv': creditCard.cardCVV,
        'card_expiration_date': creditCard.cardExpirationDate.replace(/[^0-9\.]+/g, ''),
        'card_holder_name': creditCard.cardHolderName,
        'customer': {
          'external_id': context.auth.token.uid,
          'name': context.auth.token.name,
          'type': 'individual',
          'country': 'br',
          'email': context.auth.token.email,
          'documents': [{
            'type': 'cpf',
            'number': guestCPF
          }],
          'phone_numbers': [ guestCelular ]
        },
        'billing': {
          'name': context.auth.token.name,
          'address': {
            'country': 'br',
            'state': reservaAcomod.billing.state,
            'city': reservaAcomod.billing.city,
            'neighborhood': reservaAcomod.billing.neighborhood,
            'street': reservaAcomod.billing.street,
            'street_number': reservaAcomod.billing.street_number,
            'zipcode': zipcode
          }
        },
        'items': [{
          'id': acomod.acomodID,
          'title': acomod.title,
          'category': 'Acomod',
          'unit_price': acomod.valorNoite * 100,
          'quantity': reservaAcomod.noites,
          'tangible': false
        }]
      })

      reservaAcomod.reservaID = transaction.id.toString()

      /* Criar reserva na Firestore */
      await admin.firestore().collection('reservasAcomods').doc(reservaAcomod.reservaID).set(reservaAcomod)

      /* Atualizar visit */
      await admin.firestore().collection('acomods').doc(acomod.acomodID).collection('visits').doc(visitID).update({ concludedReserva: true })

      return { reservaID: reservaAcomod.reservaID }

    } catch (err) {
      console.log(err)
      throw new functions.https.HttpsError('aborted', err.message, err)
    }

  /* ------------------- BOLETO ------------------- */
  } else {
    try {
      const Pagarme = await pagarme.client.connect({ api_key: 'ak_test_E3I46o4e7guZDqwRnSY9sW8o8HrL9D' })

      const transaction = await Pagarme.transactions.create({
        'amount': reservaAcomod.valorReservaTotal * 100,
        'capture': false,
        'payment_method': 'boleto',
        'customer': {
          'external_id': context.auth.token.uid,
          'name': reservaAcomod.guestName,
          'type': 'individual',
          'country': 'br',
          'email': context.auth.token.email,
          'documents': [{
            'type': 'cpf',
            'number': guestCPF
          }],
          'phone_numbers': [ guestCelular ]
        },
        'items': [{
          'id': acomod.acomodID,
          'title': acomod.title,
          'category': 'Acomod',
          'unit_price': acomod.valorNoite * 100,
          'quantity': reservaAcomod.noites,
          'tangible': false
        }]
      })
      
      reservaAcomod.reservaID = transaction.id.toString()

      /* Criar reserva na Firestore */
      await admin.firestore().collection('reservasAcomods').doc(reservaAcomod.reservaID).set(reservaAcomod)

      /* Atualizar visit */
      await admin.firestore().collection('acomods').doc(acomod.acomodID).collection('visits').doc(visitID).update({ concludedReserva: true })

      return { reservaID: reservaAcomod.reservaID }
      
    } catch (err) {
      console.log(err)
      throw new functions.https.HttpsError('aborted', err.message, err)
    }
  }
})




exports.payHostAcomod = functions.https.onCall(async data => {
  /* ENVIAR PAGAMENTO PARA O HOST NO DIA SEGUINTE DO CHECK-IN */
})





/* ________________________________________________ E-MAILS ________________________________________________ */


exports.email_newReservaToHost = functions.firestore
  .document('reservasAcomods/{reservaID}')
  .onCreate(async snap => {
    const reservaAcomod = snap.data()

    try {
      /* Get acomod data */
      const docAcomod = await admin.firestore().collection('acomods').doc(reservaAcomod.acomodID).get()
      const acomod = docAcomod.data()

      const startDate = new Date(reservaAcomod.periodoReserva.start)
      const endDate = new Date(reservaAcomod.periodoReserva.end)

      /* Enviar e-mail */
      await Mailjet.post('send', {'version': 'v3.1'}).request({
        'Messages': [{
          'From': { 'Email': ESemail, 'Name': ESname },
          'To': [{
            'Email': reservaAcomod.hostEmail,
            'Name': reservaAcomod.hostName
          }],
          'TemplateID': 477332,
          'TemplateLanguage': true,
          'Subject': 'Novo Pedido de Reserva',
          'Variables': {
            'reservaID': reservaAcomod.reservaID,
            'acomodURL': `https://www.escarpastrip.com/acomodacoes/${reservaAcomod.acomodID}`,
            'guestFirstName': reservaAcomod.guestName.split(' ')[0],
            'hostFirstName': reservaAcomod.hostName.split(' ')[0],
            'title': acomod.title,
            'acomodPhoto': acomod.images[0].HJ,
            'checkIn': dayjs(startDate).format('ddd, DD MMM YYYY'),
            'checkOut': dayjs(endDate).format('ddd, DD MMM YYYY'),
            'dayAfterCheckin': dayjs(startDate).add(1, 'day').format('DD/MM/YYYY'),
            'totalHospedes': reservaAcomod.totalHospedes,
            'noites': reservaAcomod.noites,
            'valorNoite': numeral(acomod.valorNoite).format('$0,0'),
            'valorNoitesTotal': numeral(reservaAcomod.valorNoitesTotal).format('$0,0'),
            'limpezaFee': numeral(reservaAcomod.limpezaFee).format('$0,0'),
            'hostAmount': numeral(reservaAcomod.valorNoitesTotal + reservaAcomod.limpezaFee).format('$0,0'),
            'guestPhoto': reservaAcomod.guestPhoto,
            'message': reservaAcomod.message
          }
        }]
      })
    } 
    catch (err) {
      console.log(err)
    }
  })



exports.email_reservaAcceptedToGuest = functions.firestore
  .document('reservasAcomods/{reservaID}')
  /* Quando Status = 'awaiting_payment' */
  .onUpdate(async change => {
    const reservaAcomod = change.after.data()

    if (reservaAcomod.status === 'awaiting_payment') {
      try {
        /* Get acomod data */
        const docAcomod = await admin.firestore().collection('acomods').doc(reservaAcomod.acomodID).get()
        const acomod = docAcomod.data()

        /* Ajustar datas */
        const startDate = new Date(reservaAcomod.periodoReserva.start)
        const endDate = new Date(reservaAcomod.periodoReserva.end)
        const checkIn = dayjs(startDate).format('ddd, DD MMM YYYY')
        const checkOut = dayjs(endDate).format('ddd, DD MMM YYYY')

        /* Enviar e-mail */
        await Mailjet.post('send', {'version': 'v3.1'}).request({
          'Messages': [{
            'From': { 'Email': ESemail, 'Name': ESname },
            'To': [{
              'Email': reservaAcomod.guestEmail,
              'Name': reservaAcomod.guestName
            }],
            'TemplateID': 448210,
            'TemplateLanguage': true,
            'Subject': `Ótimas notícias, ${reservaAcomod.guestName.split(' ')[0]}`,
            'Variables': {
              'reservaID': reservaAcomod.reservaID,
              'acomodURL': `https://www.escarpastrip.com/acomodacoes/${reservaAcomod.acomodID}`,
              'guestFirstName': reservaAcomod.guestName.split(' ')[0],
              'hostFirstName': reservaAcomod.hostName.split(' ')[0],
              'hostPhoto': reservaAcomod.hostPhoto,
              'hostEmail': reservaAcomod.hostEmail,
              'hostCelular': reservaAcomod.hostCelular,
              'whatsAppHostHREF': reservaAcomod.whatsAppHostHREF,
              'title': acomod.title,
              'acomodPhoto': acomod.images[0].HJ,
              'address': acomod.address,
              'positionLAT': acomod.positionLAT,
              'positionLNG': acomod.positionLNG,
              'checkIn': checkIn,
              'checkOut': checkOut
            }
          }]
        })
      } 
      catch (err) {
        console.log(err)
      }
    }
  })