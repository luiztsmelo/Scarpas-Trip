import * as functions from 'firebase-functions'
import * as Airtable from 'airtable'

const base = new Airtable({ apiKey: functions.config().airtable.key }).base('appfQX2S7rMRlBWoh')

exports.addReservaAcomodAirtable = functions.firestore
  .document('reservasAcomods/{reservaID}')
  .onCreate(snap => {
    const data = snap.data()
    /* 
    CORRIGIR VALORES
    */
    /* IDs: string to number */
    data.reservaID = Number(data.reservaID)
    data.acomodID = Number(data.acomodID)
    /* Dates: converter para formato válido ao Airtable */
    let yyyyStart = data.startDate.slice(6, 10)
    let mmStart = data.startDate.slice(3, 5)
    let ddStart = data.startDate.slice(0, 2)
    data.startDate = yyyyStart + '-' + mmStart + '-' + ddStart
    let yyyyEnd = data.endDate.slice(6, 10)
    let mmEnd = data.endDate.slice(3, 5)
    let ddEnd = data.endDate.slice(0, 2)
    data.endDate = yyyyEnd + '-' + mmEnd + '-' + ddEnd
    /* Deletar valores não suportados pelo Airtable */
    delete data.periodoReserva
    delete data.mensagem
    /* 
    CRIAR RESERVA NO AIRTABLE
    */
    return base('Acomods').create(data)
  })
