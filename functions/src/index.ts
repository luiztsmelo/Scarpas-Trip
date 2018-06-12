import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as Airtable from 'airtable'

admin.initializeApp(functions.config().firebase)

const base = new Airtable({ apiKey: functions.config().airtable.key }).base('appfQX2S7rMRlBWoh')

const Mailjet = require ('node-mailjet')
  .connect('2213afd9febdc226190169a58fc26afa', '74d6c365c8fa5de11a937017c5545165')

const ESemail = 'tarcisio@escarpastrip.com'
const ESname = 'Escarpas Trip'


exports.addReservaAcomodAirtable = functions.firestore
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


exports.welcomeEmail = functions.firestore
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


exports.bookConfirmationEmail = functions.firestore
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