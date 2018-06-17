import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as Airtable from 'airtable'
import * as pagarme from 'pagarme'


/* Firebase admin */
admin.initializeApp(functions.config().firebase)


/* Airtable */
const base = new Airtable({ apiKey: functions.config().airtable.key }).base('appfQX2S7rMRlBWoh')


/* Mailjet */
const Mailjet = require ('node-mailjet').connect('2213afd9febdc226190169a58fc26afa', '74d6c365c8fa5de11a937017c5545165')
const ESemail = 'tarcisio@escarpastrip.com'
const ESname = 'Escarpas Trip'


exports.pagarme_newAcomod = functions.https.onCall(data => {
  const bankAccount = data.bankAccount

  return pagarme.client.connect({ api_key: 'ak_test_E3I46o4e7guZDqwRnSY9sW8o8HrL9D' })
    .then(client => client.recipients.create({
      transfer_enabled: false,
      transfer_interval: "daily",
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
    console.log(err)
    throw new functions.https.HttpsError(err)
  })
})


exports.pagarme_newReservaAcomod = functions.https.onCall((data, context) => {
  const reservaAcomod = data.reservaAcomod
  const creditCard = data.creditCard
  const acomod = data.acomod

  const paymentMethod = creditCard.paymentMethod
  const cardNumber = creditCard.cardNumber.replace(/[^0-9\.]+/g, '')
  const cardHolderName = creditCard.cardHolderName
  const cardExpirationDate = creditCard.cardExpirationDate.replace(/[^0-9\.]+/g, '')
  const cardCVV = creditCard.cardCVV

  const amountAnunciante = (reservaAcomod.valorNoitesTotal + reservaAcomod.limpezaFee) * 100
  const amountEscarpasTrip = reservaAcomod.serviceFeeTotal * 100

  return pagarme.client.connect({ api_key: 'ak_test_E3I46o4e7guZDqwRnSY9sW8o8HrL9D' })
    .then(client => client.transactions.create({
      'amount': amountAnunciante + amountEscarpasTrip,
      'payment_method': paymentMethod,
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
          'number': '00000000000'
        }],
        'phone_numbers': ['+5511999998888']
      },
      'billing': {
        'name': context.auth.token.name,
        'address': {
          'country': 'br',
          'state': 'sp',
          'city': 'Cotia',
          'neighborhood': 'Rio Cotia',
          'street': 'Rua Matrix',
          'street_number': '9999',
          'zipcode': '06714360'
        }
      },
      'items': [{
        'id': acomod.acomodID,
        'title': acomod.title,
        'category': 'Acomod',
        'unit_price': acomod.valorNoite * 100,
        'quantity': reservaAcomod.noites,
        'tangible': false
      }],
      'split_rules': [
        {
          'recipient_id': 're_cjfcpgjli007ggb6dku6oc33s',
          'amount': amountEscarpasTrip,
          'liable': true,
          'charge_processing_fee': true
        },
        {
          'recipient_id': acomod.recipientID,
          'amount': amountAnunciante,
          'liable': true,
          'charge_processing_fee': true
        }
      ]
      }))
    .then(transaction => {
      return { reservaID: transaction.id.toString() }
    })
    .catch(err => {
      console.log(err.response)
      if (err.response.errors.some(e => e.parameter_name === 'card_number')) {
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
    })
})



exports.airtable_newReservaAcomod = functions.firestore
  .document('reservasAcomods/{reservaID}')
  .onCreate(snap => {
    const reservaAcomod = snap.data()
    /* 
    CORRIGIR VALORES
    */
    /* IDs: string to number */
    reservaAcomod.reservaID = Number(reservaAcomod.reservaID)
    reservaAcomod.acomodID = Number(reservaAcomod.acomodID)
    /* Dates: converter para formato válido ao Airtable */
    const yyyyStart = reservaAcomod.startDate.slice(6, 10)
    const mmStart = reservaAcomod.startDate.slice(3, 5)
    const ddStart = reservaAcomod.startDate.slice(0, 2)
    reservaAcomod.startDate = yyyyStart + '-' + mmStart + '-' + ddStart
    const yyyyEnd = reservaAcomod.endDate.slice(6, 10)
    const mmEnd = reservaAcomod.endDate.slice(3, 5)
    const ddEnd = reservaAcomod.endDate.slice(0, 2)
    reservaAcomod.endDate = yyyyEnd + '-' + mmEnd + '-' + ddEnd
    /* Deletar valores não suportados pelo Airtable */
    delete reservaAcomod.periodoReserva
    delete reservaAcomod.mensagem
    /* 
    CRIAR RESERVA NO AIRTABLE
    */
    return base('Acomods').create(reservaAcomod)
  })


exports.email_newUser = functions.firestore
  .document('users/{userID}')
  .onCreate(snap => {
    const user = snap.data()

    /* Send Email */
    const request = Mailjet
    .post('send', {'version': 'v3.1'})
    .request({
      'Messages':[{
        'From': { 'Email': ESemail, 'Name': ESname },
        'To': [{
          'Email': user.email,
          'Name': user.fullName
        }],
        'TemplateID': 448198,
        'TemplateLanguage': true,
        'Subject': 'Bem-vindo à Escarpas Trip!',
        'Variables': {
          'firstName': user.firstName
        }
      }]
    })

    return request
      .then(result => console.log(result.body))
      .catch(err => console.log(err.statusCode))
  })


exports.email_reservaAcomodConfirmed = functions.firestore
  .document('reservasAcomods/{reservaID}')
  /* MUDAR PARA onUpdate() "when confirmed = true" */
  .onCreate(async snap => {
    const reservaAcomod = snap.data()
    try {
      /* Get acomod data */
      const docAcomod = await admin.firestore().collection('acomods').doc(reservaAcomod.acomodID).get()
      const acomod = docAcomod.data()

      /* Send Email */
      const request = Mailjet
      .post('send', {'version': 'v3.1'})
      .request({
        'Messages':[{
          'From': { 'Email': ESemail, 'Name': ESname },
          'To': [{
            'Email': reservaAcomod.guestEmail,
            'Name': reservaAcomod.guestName
          }],
          'TemplateID': 448210,
          'TemplateLanguage': true,
          'Subject': 'Ótimas notícias, ' + reservaAcomod.guestName.split(' ')[0],
          'Variables': {
            'reservaID': reservaAcomod.reservaID,
            'acomodURL': 'https://www.escarpastrip.com/acomodacoes/' + reservaAcomod.acomodID,
            'guestFirstName': reservaAcomod.guestName.split(' ')[0],
            'hostFirstName': reservaAcomod.hostName.split(' ')[0],
            'title': acomod.title,
            'imageURL': acomod.images[0].HJ,
            'address': acomod.address,
            'positionLAT': acomod.positionLAT,
            'positionLNG': acomod.positionLNG,
            'startDate': reservaAcomod.startDate,
            'endDate': reservaAcomod.endDate
          }
        }]
      })

      return request
        .then(result => console.log(result.body))
        .catch(err => console.log(err.statusCode))
    } 
    catch (err) {
      return err
    }
  })