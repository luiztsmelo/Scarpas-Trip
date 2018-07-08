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
const Airtable = require("airtable");
const pagarme = require("pagarme");
const dayjs = require("dayjs");
require("dayjs/locale/pt-br");
const numeral = require("numeral");
require("numeral/locales/pt-br");
/* Firebase admin */
admin.initializeApp(functions.config().firebase);
/* Airtable */
const base = new Airtable({ apiKey: functions.config().airtable.key }).base('appfQX2S7rMRlBWoh');
/* Mailjet */
const Mailjet = require('node-mailjet').connect('2213afd9febdc226190169a58fc26afa', '74d6c365c8fa5de11a937017c5545165');
const ESemail = 'contato@escarpastrip.com';
const ESname = 'Escarpas Trip';
/* Day.js */
dayjs.locale('pt-br');
/* Numeral */
numeral.locale('pt-br');
/* ________________________________________________ PAGARME ________________________________________________ */
exports.pagarme_newAcomod = functions.https.onCall(data => {
    const bankAccount = data.bankAccount;
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
    }))
        .then(recipient => {
        return { recipientID: recipient.id };
    })
        .catch(err => {
        console.log(err.response);
        if (err.response.errors.some(e => e.parameter_name === 'bank_code')) {
            throw new functions.https.HttpsError('invalid-argument', 'Banco não permitido.', 'bank_code');
        }
        if (err.response.errors.some(e => e.parameter_name === 'agencia')) {
            throw new functions.https.HttpsError('invalid-argument', 'Agência incorreta.', 'agencia');
        }
        if (err.response.errors.some(e => e.parameter_name === 'agencia_dv')) {
            throw new functions.https.HttpsError('invalid-argument', 'Dígito de agência incorreto.', 'agencia_dv');
        }
        if (err.response.errors.some(e => e.parameter_name === 'conta')) {
            throw new functions.https.HttpsError('invalid-argument', 'Conta incorreta.', 'conta');
        }
        if (err.response.errors.some(e => e.parameter_name === 'conta_dv')) {
            throw new functions.https.HttpsError('invalid-argument', 'Dígito de conta incorreto.', 'conta_dv');
        }
        if (err.response.errors.some(e => e.parameter_name === 'legal_name')) {
            throw new functions.https.HttpsError('invalid-argument', 'Nome digitado incorretamente.', 'legal_name');
        }
        if (err.response.errors.some(e => e.parameter_name === 'document_number')) {
            throw new functions.https.HttpsError('invalid-argument', 'CPF inválido.', 'document_number');
        }
    });
});
exports.pagarme_newReservaAcomod = functions.https.onCall((data, context) => {
    const reservaAcomod = data.reservaAcomod;
    const acomod = data.acomod;
    const guestCPF = reservaAcomod.guestCPF.replace(/[^0-9\.]+/g, '').replace(/\./g, '');
    const guestCelular = '+55' + reservaAcomod.guestCelular.replace(/[^0-9\.]+/g, '');
    const zipcode = reservaAcomod.billing.zipcode.replace(/[^0-9\.]+/g, '');
    /* ------------------- CREDIT CARD ------------------- */
    if (reservaAcomod.paymentMethod === 'credit_card') {
        const cardNumber = data.creditCard.cardNumber.replace(/[^0-9\.]+/g, '');
        const cardHolderName = data.creditCard.cardHolderName;
        const cardExpirationDate = data.creditCard.cardExpirationDate.replace(/[^0-9\.]+/g, '');
        const cardCVV = data.creditCard.cardCVV;
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
                'phone_numbers': [guestCelular]
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
            return { reservaID: transaction.id.toString() };
        })
            .catch(err => {
            console.log(err.response);
            if (err.response.errors.some(e => e.type === 'action_forbidden' || e.parameter_name === 'card_number')) {
                throw new functions.https.HttpsError('invalid-argument', 'Número do cartão inválido.', 'card_number');
            }
            if (err.response.errors.some(e => e.parameter_name === 'card_holder_name')) {
                throw new functions.https.HttpsError('invalid-argument', 'Nome do portador inválido.', 'card_holder_name');
            }
            if (err.response.errors.some(e => e.parameter_name === 'card_expiration_date')) {
                throw new functions.https.HttpsError('invalid-argument', 'Data de expiração inválida.', 'card_expiration_date');
            }
            if (err.response.errors.some(e => e.parameter_name === 'card_cvv')) {
                throw new functions.https.HttpsError('invalid-argument', 'Código de segurança inválido.', 'card_cvv');
            }
            if (err.response.errors.some(e => e.parameter_name === 'customer')) {
                throw new functions.https.HttpsError('invalid-argument', 'CPF inválido.', 'customer');
            }
        });
        /* ------------------- BOLETO ------------------- */
    }
    else {
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
                'phone_numbers': [guestCelular]
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
            return { reservaID: transaction.id.toString() };
        })
            .catch(err => {
            console.log(err.response);
            if (err.response.errors.some(e => e.parameter_name === 'customer')) {
                throw new functions.https.HttpsError('invalid-argument', 'CPF inválido.', 'customer');
            }
        });
    }
});
exports.pagarme_payHostAcomod = functions.https.onCall(data => {
    /* ENVIAR PAGAMENTO PARA O HOST NO DIA SEGUINTE DO CHECK-IN */
});
/* ________________________________________________ AIRTABLE ________________________________________________ */
exports.airtable_newReservaAcomod = functions.firestore
    .document('reservasAcomods/{reservaID}')
    .onCreate(snap => {
    const reservaAcomod = snap.data();
    /*
    CORRIGIR VALORES
    */
    /* IDs: string to number */
    reservaAcomod.reservaID = Number(reservaAcomod.reservaID);
    reservaAcomod.acomodID = Number(reservaAcomod.acomodID);
    /* Dates: converter para formato válido ao Airtable */
    const checkIn = new Date(reservaAcomod.periodoReserva.start);
    reservaAcomod.checkIn = dayjs(checkIn).format('YYYY-MM-DD');
    const checkOut = new Date(reservaAcomod.periodoReserva.end);
    reservaAcomod.checkOut = dayjs(checkOut).format('YYYY-MM-DD');
    /* Deletar valores não suportados ou desnecessários para o Airtable */
    delete reservaAcomod.periodoReserva;
    delete reservaAcomod.message;
    delete reservaAcomod.guestCPF;
    delete reservaAcomod.guestPhoto;
    delete reservaAcomod.billing;
    delete reservaAcomod.hostPhoto;
    delete reservaAcomod.whatsAppHostHREF;
    /* Criar reserva no Airtable */
    return base('Acomods').create(reservaAcomod);
});
/* ________________________________________________ E-MAILS ________________________________________________ */
exports.email_newUser = functions.firestore
    .document('users/{userID}')
    .onCreate(snap => {
    const user = snap.data();
    /* Send Email */
    const request = Mailjet
        .post('send', { 'version': 'v3.1' })
        .request({
        'Messages': [{
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
    });
    return request
        .then(result => console.log(result.body))
        .catch(err => console.log(err.statusCode));
});
exports.email_newReservaToHost = functions.firestore
    .document('reservasAcomods/{reservaID}')
    .onCreate((snap) => __awaiter(this, void 0, void 0, function* () {
    const reservaAcomod = snap.data();
    try {
        /* Get acomod data */
        const docAcomod = yield admin.firestore().collection('acomods').doc(reservaAcomod.acomodID).get();
        const acomod = docAcomod.data();
        /* Ajustar datas */
        const startDate = new Date(reservaAcomod.periodoReserva.start);
        const endDate = new Date(reservaAcomod.periodoReserva.end);
        const checkIn = dayjs(startDate).format('ddd, DD MMM YYYY');
        const checkOut = dayjs(endDate).format('ddd, DD MMM YYYY');
        const dayAfterCheckin = dayjs(startDate).add(1, 'day').format('DD/MM/YYYY');
        /* Ajustar valores */
        const valorNoite = numeral(acomod.valorNoite).format('$0,0');
        const valorNoitesTotal = numeral(reservaAcomod.valorNoitesTotal).format('$0,0');
        const limpezaFee = numeral(reservaAcomod.limpezaFee).format('$0,0');
        const hostAmount = numeral(reservaAcomod.valorNoitesTotal + reservaAcomod.limpezaFee).format('$0,0');
        /* Send Email */
        const request = Mailjet
            .post('send', { 'version': 'v3.1' })
            .request({
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
                        'dayAfterCheckin': dayAfterCheckin,
                        'noites': reservaAcomod.noites,
                        'valorNoite': valorNoite,
                        'valorNoitesTotal': valorNoitesTotal,
                        'limpezaFee': limpezaFee,
                        'hostAmount': hostAmount,
                        'guestPhoto': reservaAcomod.guestPhoto,
                        'message': reservaAcomod.message
                    }
                }]
        });
        return request
            .then(result => console.log(result.body))
            .catch(err => console.log(err.statusCode));
    }
    catch (err) {
        return err;
    }
}));
exports.email_reservaAcceptedToGuest = functions.firestore
    .document('reservasAcomods/{reservaID}')
    /* Quando Status = 'accepted' */
    .onUpdate((change) => __awaiter(this, void 0, void 0, function* () {
    const reservaAcomod = change.after.data();
    if (reservaAcomod.status === 'accepted') {
        try {
            /* Get acomod data */
            const docAcomod = yield admin.firestore().collection('acomods').doc(reservaAcomod.acomodID).get();
            const acomod = docAcomod.data();
            /* Ajustar datas */
            const startDate = new Date(reservaAcomod.periodoReserva.start);
            const endDate = new Date(reservaAcomod.periodoReserva.end);
            const checkIn = dayjs(startDate).format('ddd, DD MMM YYYY');
            const checkOut = dayjs(endDate).format('ddd, DD MMM YYYY');
            /* Send Email */
            const request = Mailjet
                .post('send', { 'version': 'v3.1' })
                .request({
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
            return request
                .then(result => console.log(result.body))
                .catch(err => console.log(err.statusCode));
        }
        catch (err) {
            return err;
        }
    }
}));
//# sourceMappingURL=index.js.map