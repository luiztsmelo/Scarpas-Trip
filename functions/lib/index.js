"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const pagarme = require("pagarme");
const dayjs = require("dayjs");
require("dayjs/locale/pt-br");
const numeral = require("numeral");
require("numeral/locales/pt-br");
/* import axios from 'axios' */
/* Firebase admin */
admin.initializeApp(functions.config().firebase);
/* Mailjet */
const Mailjet = require('node-mailjet').connect(`${functions.config().mailjetpublic.key}`, `${functions.config().mailjetprivate.key}`);
const ESemail = 'contato@escarpastrip.com';
const ESname = 'Escarpas Trip';
/* Day.js */
dayjs.locale('pt-br');
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
/* ________________________________________________ UTILS ________________________________________________ */
exports.calcValorParcelas = functions.https.onCall((data) => __awaiter(this, void 0, void 0, function* () {
    try {
        const amount = data.amount;
        const Pagarme = yield pagarme.client.connect({ api_key: 'ak_test_E3I46o4e7guZDqwRnSY9sW8o8HrL9D' });
        const installments = yield Pagarme.transactions.calculateInstallmentsAmount({
            max_installments: 12,
            free_installments: 1,
            interest_rate: 2.5,
            amount: amount
        });
        return { parcelas: installments };
    }
    catch (err) {
        console.log(err);
        throw new functions.https.HttpsError('aborted', err.message, err);
    }
}));
/* _______________________________________________ WATCHERS _______________________________________________ */
/* TRIGGER URL GERAL: https://us-central1-escarpas-trip.cloudfunctions.net/<function-name> */
exports.watch_reservaExpiration = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const snap = yield admin.firestore().collection('reservasAcomods').where('status', '==', 'pending').get();
        const pendingReservas = snap.docs.map(doc => doc.data());
        /* Para evitar bugs, checar se há alguma reserva pending primeiro */
        if (pendingReservas.length > 0) {
            /* Para cada reserva pending */
            pendingReservas.forEach((reserva) => __awaiter(this, void 0, void 0, function* () {
                const requestedDate = dayjs(reserva.requested);
                const dateNow = dayjs();
                /* Se feita a 2 dias atrás */
                if (requestedDate.diff(dateNow, 'day') <= -2) {
                    /* Update status para 'expired' na Firestore */
                    yield admin.firestore().collection('reservasAcomods').doc(reserva.reservaID).update({ status: 'expired', isRunning: false });
                    console.log(`Reserva ${reserva.reservaID} [${requestedDate.diff(dateNow, 'day')}] foi expirada.`);
                }
                else {
                    console.log(`Reserva ${reserva.reservaID} [${requestedDate.diff(dateNow, 'day')}] não precisa ser expirada.`);
                }
            }));
            res.status(200).end();
        }
        else {
            console.log('Nenhuma reserva pending encontrada. Operação abortada sem falhas.');
            res.status(200).end();
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).end();
    }
}));
/* ________________________________________________ USER ________________________________________________ */
exports.newUser = functions.https.onCall((data) => __awaiter(this, void 0, void 0, function* () {
    const user = data.user;
    try {
        /* Criar user na Firestore */
        yield admin.firestore().collection('users').doc(user.userID).set(user);
        /* Enviar welcome e-mail */
        yield Mailjet.post('send', { 'version': 'v3.1' }).request({
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
        });
    }
    catch (err) {
        console.log(err);
        throw new functions.https.HttpsError('aborted', err.message, err);
    }
}));
/* ________________________________________________ ACOMODS ________________________________________________ */
exports.newAcomod = functions.https.onCall((data) => __awaiter(this, void 0, void 0, function* () {
    const acomodData = data.acomodData;
    const bankAccount = data.bankAccount;
    try {
        const Pagarme = yield pagarme.client.connect({ api_key: 'ak_test_E3I46o4e7guZDqwRnSY9sW8o8HrL9D' });
        const recipient = yield Pagarme.recipients.create({
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
        yield admin.firestore().collection('users').doc(acomodData.hostID).update({
            ishost: true,
            celular: '+55' + acomodData.celular.replace(/[^0-9\.]+/g, '')
        });
        delete acomodData.celular;
        /* Set acomod Firestore */
        yield admin.firestore().collection('acomods').doc(acomodData.acomodID).set(acomodData);
    }
    catch (err) {
        console.log(err);
        throw new functions.https.HttpsError('aborted', err.message, err);
    }
}));
exports.newReservaAcomod = functions.https.onCall((data) => __awaiter(this, void 0, void 0, function* () {
    try {
        const reservaAcomod = data.reservaAcomod;
        const creditCard = data.creditCard;
        const customer = data.customer;
        const acomod = data.acomod;
        const host = data.host;
        const visitID = data.visitID;
        /* Get guest */
        const guestSnap = yield admin.firestore().collection('users').doc(reservaAcomod.guestID).get();
        const guest = guestSnap.data();
        reservaAcomod.requested = new Date().getTime();
        reservaAcomod.acomodID = acomod.acomodID;
        const Pagarme = yield pagarme.client.connect({ api_key: 'ak_test_E3I46o4e7guZDqwRnSY9sW8o8HrL9D' });
        let transaction = null;
        if (reservaAcomod.paymentMethod === 'credit_card') {
            transaction = yield Pagarme.transactions.create({
                'amount': reservaAcomod.valorReservaTotal * 100,
                'capture': false,
                'installments': reservaAcomod.parcelas,
                'payment_method': 'credit_card',
                'card_number': creditCard.cardNumber.replace(/[^0-9\.]+/g, ''),
                'card_cvv': creditCard.cardCVV,
                'card_expiration_date': creditCard.cardExpirationDate.replace(/[^0-9\.]+/g, ''),
                'card_holder_name': creditCard.cardHolderName,
                'customer': {
                    'external_id': guest.userID,
                    'name': guest.fullName,
                    'type': 'individual',
                    'country': 'br',
                    'email': guest.email,
                    'documents': [{
                            'type': 'cpf',
                            'number': customer.cpf.replace(/[^0-9\.]+/g, '').replace(/\./g, '')
                        }],
                    'phone_numbers': [customer.celular]
                },
                'billing': {
                    'name': guest.fullName,
                    'address': {
                        'country': 'br',
                        'state': customer.state,
                        'city': customer.city,
                        'neighborhood': customer.neighborhood,
                        'street': customer.street,
                        'street_number': customer.street_number,
                        'zipcode': customer.zipcode.replace(/[^0-9\.]+/g, '')
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
            });
        }
        else {
            transaction = yield Pagarme.transactions.create({
                'amount': reservaAcomod.valorReservaTotal * 100,
                'capture': false,
                'payment_method': 'boleto',
                'customer': {
                    'external_id': guest.userID,
                    'name': guest.fullName,
                    'type': 'individual',
                    'country': 'br',
                    'email': guest.email,
                    'documents': [{
                            'type': 'cpf',
                            'number': customer.cpf.replace(/[^0-9\.]+/g, '').replace(/\./g, '')
                        }],
                    'phone_numbers': [customer.celular]
                },
                'items': [{
                        'id': acomod.acomodID,
                        'title': acomod.title,
                        'category': 'Acomod',
                        'unit_price': acomod.valorNoite * 100,
                        'quantity': reservaAcomod.noites,
                        'tangible': false
                    }]
            });
        }
        reservaAcomod.reservaID = yield transaction.id.toString();
        /* Criar reserva na Firestore */
        yield admin.firestore().collection('reservasAcomods').doc(reservaAcomod.reservaID).set(reservaAcomod);
        /* Atualizar visit */
        yield admin.firestore().collection('acomods').doc(acomod.acomodID).collection('visits').doc(visitID).update({ concludedReserva: true });
        /* Enviar e-mail para Host */
        yield Mailjet.post('send', { 'version': 'v3.1' }).request({
            'Messages': [{
                    'From': { 'Email': ESemail, 'Name': ESname },
                    'To': [{
                            'Email': host.email,
                            'Name': host.fullName
                        }],
                    'TemplateID': 477332,
                    'TemplateLanguage': true,
                    'Subject': 'Novo Pedido de Reserva',
                    'Variables': {
                        'reservaID': reservaAcomod.reservaID,
                        'acomodURL': `https://www.escarpastrip.com/acomodacoes/${reservaAcomod.acomodID}`,
                        'guestFirstName': guest.firstName,
                        'hostFirstName': host.firstName,
                        'title': acomod.title,
                        'acomodPhoto': acomod.images[0].HJ,
                        'checkIn': dayjs(reservaAcomod.periodoReserva.start).format('ddd, DD MMM YYYY'),
                        'checkOut': dayjs(reservaAcomod.periodoReserva.end).format('ddd, DD MMM YYYY'),
                        'dayAfterCheckin': dayjs(reservaAcomod.periodoReserva.start).add(1, 'day').format('DD/MM/YYYY'),
                        'totalHospedes': reservaAcomod.totalHospedes,
                        'noites': reservaAcomod.noites,
                        'valorNoite': numeral(acomod.valorNoite).format('$0,0'),
                        'valorNoitesTotal': numeral(reservaAcomod.valorNoitesTotal).format('$0,0'),
                        'limpezaFee': numeral(reservaAcomod.limpezaFee).format('$0,0'),
                        'hostAmount': numeral(reservaAcomod.valorNoitesTotal + reservaAcomod.limpezaFee).format('$0,0'),
                        'guestPhoto': guest.photoURL,
                        'message': reservaAcomod.message
                    }
                }]
        });
        return { reservaID: reservaAcomod.reservaID };
    }
    catch (err) {
        console.log(err.response);
        throw new functions.https.HttpsError('aborted', err.message, err);
    }
}));
exports.payHostAcomod = functions.https.onCall((data) => __awaiter(this, void 0, void 0, function* () {
    /* ENVIAR PAGAMENTO PARA O HOST NO DIA SEGUINTE DO CHECK-IN */
}));
/* ________________________________________________ E-MAILS ________________________________________________ */
exports.email_reservaAcceptedToGuest = functions.firestore
    .document('reservasAcomods/{reservaID}')
    /* Quando Status = 'awaiting_payment' */
    .onUpdate((change) => __awaiter(this, void 0, void 0, function* () {
    const reservaAcomod = change.after.data();
    if (reservaAcomod.status === 'awaiting_payment') {
        try {
            /* Get acomod data */
            const docAcomod = yield admin.firestore().collection('acomods').doc(reservaAcomod.acomodID).get();
            const acomod = docAcomod.data();
            /* Ajustar datas */
            const startDate = new Date(reservaAcomod.periodoReserva.start);
            const endDate = new Date(reservaAcomod.periodoReserva.end);
            const checkIn = dayjs(startDate).format('ddd, DD MMM YYYY');
            const checkOut = dayjs(endDate).format('ddd, DD MMM YYYY');
            /* Enviar e-mail */
            yield Mailjet.post('send', { 'version': 'v3.1' }).request({
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
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}));
//# sourceMappingURL=index.js.map