"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const Airtable = require("airtable");
const base = new Airtable({ apiKey: functions.config().airtable.key }).base('appfQX2S7rMRlBWoh');
const Mailjet = require('node-mailjet')
    .connect('2213afd9febdc226190169a58fc26afa', '74d6c365c8fa5de11a937017c5545165');
const ESemail = 'tarcisio@escarpastrip.com';
const ESname = 'Escarpas Trip';
exports.addReservaAcomodAirtable = functions.firestore
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
    const yyyyStart = reservaAcomod.startDate.slice(6, 10);
    const mmStart = reservaAcomod.startDate.slice(3, 5);
    const ddStart = reservaAcomod.startDate.slice(0, 2);
    reservaAcomod.startDate = yyyyStart + '-' + mmStart + '-' + ddStart;
    const yyyyEnd = reservaAcomod.endDate.slice(6, 10);
    const mmEnd = reservaAcomod.endDate.slice(3, 5);
    const ddEnd = reservaAcomod.endDate.slice(0, 2);
    reservaAcomod.endDate = yyyyEnd + '-' + mmEnd + '-' + ddEnd;
    /* Deletar valores não suportados pelo Airtable */
    delete reservaAcomod.periodoReserva;
    delete reservaAcomod.mensagem;
    /*
    CRIAR RESERVA NO AIRTABLE
    */
    return base('Acomods').create(reservaAcomod);
});
exports.welcomeEmail = functions.firestore
    .document('users/{userID}')
    .onCreate(snap => {
    const user = snap.data();
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
exports.bookConfirmationEmail = functions.firestore
    .document('reservasAcomods/{reservaID}')
    /* MUDAR PARA onUpdate() "when confirmed = true" */
    .onCreate(snap => {
    const reservaAcomod = snap.data();
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
                'Subject': 'Sua reserva foi confirmada!',
                'Variables': {
                    'reservaID': reservaAcomod.reservaID,
                    'guestFirstName': reservaAcomod.guestName.split(' ')[0],
                    'hostFirstName': reservaAcomod.hostName.split(' ')[0]
                }
            }]
    });
    return request
        .then(result => console.log(result.body))
        .catch(err => console.log(err.statusCode));
});
//# sourceMappingURL=index.js.map