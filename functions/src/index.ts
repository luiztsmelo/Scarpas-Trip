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


/* _______________________________________________ NEW USER _______________________________________________ */

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
  }
})






/* ________________________________________________ PAGARME ________________________________________________ */


exports.pagarme_newAcomod = functions.https.onCall(data => {
  const bankAccount = data.bankAccount

  return pagarme.client.connect({ api_key: 'ak_test_E3I46o4e7guZDqwRnSY9sW8o8HrL9D' })
    .then(client => client.recipients.create({
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
  )
  .then(recipient => {
    return { recipientID: recipient.id }
  })
  .catch (err => {
    console.log(err.response)
    if (err.response.errors.some(e => e.parameter_name === 'bank_code')) {
      throw new functions.https.HttpsError('invalid-argument', 'Banco não permitido.', 'bank_code')
    }
    if (err.response.errors.some(e => e.parameter_name === 'agencia')) {
      throw new functions.https.HttpsError('invalid-argument', 'Agência incorreta.', 'agencia')
    }
    if (err.response.errors.some(e => e.parameter_name === 'agencia_dv')) {
      throw new functions.https.HttpsError('invalid-argument', 'Dígito de agência incorreto.', 'agencia_dv')
    }
    if (err.response.errors.some(e => e.parameter_name === 'conta')) {
      throw new functions.https.HttpsError('invalid-argument', 'Conta incorreta.', 'conta')
    }
    if (err.response.errors.some(e => e.parameter_name === 'conta_dv')) {
      throw new functions.https.HttpsError('invalid-argument', 'Dígito de conta incorreto.', 'conta_dv')
    }
    if (err.response.errors.some(e => e.parameter_name === 'legal_name')) {
      throw new functions.https.HttpsError('invalid-argument', 'Nome digitado incorretamente.', 'legal_name')
    }
    if (err.response.errors.some(e => e.parameter_name === 'document_number')) {
      throw new functions.https.HttpsError('invalid-argument', 'CPF inválido.', 'document_number')
    }
  })
})





exports.pagarme_newReservaAcomod = functions.https.onCall((data, context) => {
  const reservaAcomod = data.reservaAcomod
  const acomod = data.acomod
 
  const guestCPF = reservaAcomod.guestCPF.replace(/[^0-9\.]+/g, '').replace(/\./g, '')
  const guestCelular = '+55' + reservaAcomod.guestCelular.replace(/[^0-9\.]+/g, '')
  const zipcode = reservaAcomod.billing.zipcode.replace(/[^0-9\.]+/g, '')

  
  /* ------------------- CREDIT CARD ------------------- */
  if (reservaAcomod.paymentMethod === 'credit_card') {

    const cardNumber = data.creditCard.cardNumber.replace(/[^0-9\.]+/g, '')
    const cardHolderName = data.creditCard.cardHolderName
    const cardExpirationDate = data.creditCard.cardExpirationDate.replace(/[^0-9\.]+/g, '')
    const cardCVV = data.creditCard.cardCVV

    return pagarme.client.connect({ api_key: 'ak_test_E3I46o4e7guZDqwRnSY9sW8o8HrL9D' })
    .then(client => client.transactions.create({
      'amount': reservaAcomod.valorReservaTotal * 100,
      'capture': false,
      'installments': reservaAcomod.parcelas,
      'payment_method': 'credit_card',
      'card_number': cardNumber,
      'card_cvv': cardCVV,
      'card_expiration_date': cardExpirationDate,
      'card_holder_name': cardHolderName,
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
    }))
    .then(transaction => {
      return { reservaID: transaction.id.toString() }
    })
    .catch(err => {
      console.log(err.response)
      if (err.response.errors.some(e => e.type === 'action_forbidden' || e.parameter_name === 'card_number')) {
        throw new functions.https.HttpsError('invalid-argument', 'Número do cartão inválido.', 'card_number')
      }
      if (err.response.errors.some(e => e.parameter_name === 'card_holder_name')) {
        throw new functions.https.HttpsError('invalid-argument', 'Nome do portador inválido.', 'card_holder_name')
      }
      if (err.response.errors.some(e => e.parameter_name === 'card_expiration_date')) {
        throw new functions.https.HttpsError('invalid-argument', 'Data de expiração inválida.', 'card_expiration_date')
      }
      if (err.response.errors.some(e => e.parameter_name === 'card_cvv')) {
        throw new functions.https.HttpsError('invalid-argument', 'Código de segurança inválido.', 'card_cvv')
      }
      if (err.response.errors.some(e => e.parameter_name === 'customer')) {
        throw new functions.https.HttpsError('invalid-argument', 'CPF inválido.', 'customer')
      }
    })

    /* ------------------- BOLETO ------------------- */
  } else {

    return pagarme.client.connect({ api_key: 'ak_test_E3I46o4e7guZDqwRnSY9sW8o8HrL9D' })
    .then(client => client.transactions.create({
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
    }))
    .then(transaction => {
      return { reservaID: transaction.id.toString() }
    })
    .catch(err => {
      console.log(err.response)
      if (err.response.errors.some(e => e.parameter_name === 'customer')) {
        throw new functions.https.HttpsError('invalid-argument', 'CPF inválido.', 'customer')
      }
    })
  }
})




exports.pagarme_payHostAcomod = functions.https.onCall(data => {
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
            'checkIn': checkIn,
            'checkOut': checkOut,
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