"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const pagarme = require("pagarme");
const numeral = require("numeral");
require("numeral/locales/pt-br");
/* const Nexmo = require('nexmo') */
const format = require('date-fns/format');
const pt = require('date-fns/locale/pt');
const escarpasTripEmail = 'contato@escarpastrip.com';
/* const escarpasTripPhone = '5537999325598' */
/* Firebase admin */
admin.initializeApp(functions.config().firebase);
/* Mailjet */
const Mailjet = require('node-mailjet').connect(`${functions.config().mailjetpublic.key}`, `${functions.config().mailjetprivate.key}`);
/* Nexmo */
/* const nexmo = new Nexmo({
  apiKey: functions.config().nexmo.key,
  apiSecret: functions.config().nexmo.secret,
  applicationId: functions.config().nexmo.id,
  privateKey: require('./private.key') ERRADO
}) */
/* Numeral */
numeral.locale('pt-br');
/* Axios */
/* const AirtableAcomodsURL = 'https://api.airtable.com/v0/appfQX2S7rMRlBWoh/Acomods'
const AirtableConfig = {
  headers: {
    'Authorization': `Bearer ${functions.config().airtable.key}`,
    'Content-type': 'application/json'
  }
} */
/* ________________________________________________ USER ________________________________________________ */
exports.newUser = functions.https.onCall(async (data) => {
    const user = data.user;
    try {
        /* Criar user na Firestore */
        await admin.firestore().doc(`users/${user.userID}`).set(user);
        /* Adicionar createdAt ao user */
        await admin.firestore().doc(`users/${user.userID}`).set({ createdAt: Date.now() }, { merge: true });
        /* Enviar welcome e-mail */
        await Mailjet.post('send', { 'version': 'v3.1' }).request({
            'Messages': [{
                    'From': { 'Email': escarpasTripEmail, 'Name': 'Escarpas Trip' },
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
        });
    }
    catch (err) {
        console.log(err);
        throw new functions.https.HttpsError('aborted', err.message, err);
    }
});
/* ________________________________________________ ACOMODS ________________________________________________ */
exports.newAcomod = functions.https.onCall(async (data) => {
    const acomodData = data.acomodData;
    const bankAccount = data.bankAccount;
    try {
        const Pagarme = await pagarme.client.connect({ api_key: 'ak_test_E3I46o4e7guZDqwRnSY9sW8o8HrL9D' });
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
        });
        acomodData.recipientID = recipient.id;
        /* Update user Firestore */
        await admin.firestore().doc(`users/${acomodData.hostID}`).update({
            isAcomodHost: true,
            celular: acomodData.celular.replace(/[^0-9\.]+/g, '')
        });
        delete acomodData.celular;
        /* Set acomod Firestore */
        await admin.firestore().doc(`acomods/${acomodData.acomodID}`).set(acomodData);
    }
    catch (err) {
        console.log(err);
        throw new functions.https.HttpsError('aborted', err.message, err);
    }
});
exports.email_newReservaAcomod_host = functions.firestore.document('reservasAcomods/{reservaID}').onCreate(async (snap, context) => {
    try {
        const reservaAcomod = snap.data();
        const acomodSnap = await admin.firestore().doc(`acomods/${reservaAcomod.acomodID}`).get();
        const acomod = acomodSnap.data();
        const hostSnap = await admin.firestore().doc(`users/${reservaAcomod.hostID}`).get();
        const host = hostSnap.data();
        await Mailjet.post('send', { 'version': 'v3.1' }).request({
            'Messages': [{
                    'From': { 'Email': escarpasTripEmail, 'Name': 'Escarpas Trip' },
                    'To': [{
                            'Email': host.email,
                            'Name': host.fullName
                        }],
                    'TemplateID': 477332,
                    'TemplateLanguage': true,
                    'Subject': `Nova reserva recebida, ${host.firstName}`,
                    'Variables': {
                        'reservaID': reservaAcomod.reservaID,
                        'acomodURL': `https://www.escarpastrip.com/acomodacoes/${reservaAcomod.acomodID}`,
                        'guestFirstName': reservaAcomod.guest.firstName,
                        'hostFirstName': host.firstName,
                        'title': acomod.title,
                        'acomodPhoto': acomod.images[0].HJ,
                        'startDate': format(reservaAcomod.startDate, 'ddd, DD MMM YYYY', { locale: pt }),
                        'endDate': format(reservaAcomod.endDate, 'ddd, DD MMM YYYY', { locale: pt }),
                        'totalHospedes': reservaAcomod.totalHospedes,
                        'noites': reservaAcomod.noites,
                        'valorNoite': numeral(acomod.valorNoite).format('$0,0'),
                        'valorNoitesTotal': numeral(reservaAcomod.valorNoitesTotal).format('$0,0'),
                        'limpezaFee': numeral(reservaAcomod.limpezaFee).format('$0,0'),
                        'hostAmount': numeral(reservaAcomod.valorNoitesTotal + reservaAcomod.limpezaFee).format('$0,0')
                    }
                }]
        });
    }
    catch (err) {
        console.log(err.response);
        throw new functions.https.HttpsError('aborted', err.message, err);
    }
});
/* exports.whatsapp_newReservaAcomod_host = functions.firestore.document('reservasAcomods/{reservaID}').onCreate(async (snap, context) => {
  try {
    const reservaAcomod = snap.data()

    const acomodSnap = await admin.firestore().doc(`acomods/${reservaAcomod.acomodID}`).get()
    const acomod = acomodSnap.data()

    const hostSnap = await admin.firestore().doc(`users/${reservaAcomod.hostID}`).get()
    const host = hostSnap.data()

    nexmo.channel.send(
      { "type": "whatsapp", "number": host.celular },
      { "type": "whatsapp", "number": escarpasTripPhone },
      {
        "content": {
          "type": "text",
          "text": "Nova reserva recebida!"
        }
      },
      (err, data) => { console.log(data.message_uuid) }
    )

  } catch (err) {
    console.log(err.response)
    throw new functions.https.HttpsError('aborted', err.message, err)
  }
}) */
/* ________________________________________________ PASSEIOS ________________________________________________ */
exports.newPasseio = functions.https.onCall(async (data) => {
    const passeioData = data.passeioData;
    const creditCard = data.creditCard;
    const customer = data.customer;
    try {
        const Pagarme = await pagarme.client.connect({ api_key: 'ak_test_E3I46o4e7guZDqwRnSY9sW8o8HrL9D' });
        const subscription = await Pagarme.subscriptions.create({
            'plan_id': 375944,
            'payment_method': 'credit_card',
            'card_holder_name': creditCard.cardHolderName,
            'card_number': creditCard.cardNumber.replace(/[^0-9\.]+/g, ''),
            'card_cvv': creditCard.cardCVV,
            'card_expiration_date': creditCard.cardExpirationDate.replace(/[^0-9\.]+/g, ''),
            'customer': {
                'name': customer.name,
                'email': customer.email,
                'document_number': customer.cpf.replace(/[^0-9\.]+/g, '').replace(/\./g, ''),
                'address': {
                    'zipcode': customer.zipcode.replace(/[^0-9\.]+/g, ''),
                    'street': customer.street,
                    'street_number': customer.street_number,
                    'neighborhood': customer.neighborhood,
                    'city': customer.city,
                    'state': customer.state
                },
                'phone': {
                    'ddd': customer.celular.slice(4, 6),
                    'number': customer.celular.slice(7, 12) + customer.celular.slice(13, 17)
                }
            }
        });
        /* Update user Firestore */
        await admin.firestore().doc(`users/${passeioData.hostID}`).update({
            celular: customer.celular,
            instagram: customer.instagram
        });
        /* Set acomod Firestore */
        await admin.firestore().doc(`passeios/${passeioData.passeioID}`).set(passeioData);
        return { subscription: subscription };
    }
    catch (err) {
        console.log(err);
        throw new functions.https.HttpsError('aborted', err.message, err);
    }
});
//# sourceMappingURL=index.js.map