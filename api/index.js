'use strict'

const express = require('express')
const admin = require('firebase-admin')
const axios = require('axios')
const ical = require('node-ical')
const icalGenerator = require('ical-generator')
const format = require('date-fns/format')
const addDays = require('date-fns/add_days')
const eachDay = require('date-fns/each_day')

const app = express()

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'escarpas-trip',
    clientEmail: 'firebase-adminsdk-yevlt@escarpas-trip.iam.gserviceaccount.com',
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDBXDizSMMHKOeZ\n/Lec8Vn7kuJt1zaI/5iOJDx9fx51njYeB1jCuMAWY8xDWUvUjuSHm5OwvEMtF6BA\nIlrh44Oc5GlC38pv0gVoLI9g1Ybb4kPQcELhpGYEpmqBEijWXOHDGwOdSBD8phKl\nwU/Ad41q+QGd9NA2lPf29s6CiN8F3GvF6PkGnKAKBEb5EohZZCWaudk8WheGC9Om\nwdnVJ7urLjkIkcaZS2jpYH22khV8gnJScYLGm/BC2W6OdaV9x9vtBeWe5hgynoCk\nFQE7RqNMMQCtsKYHZYa781CAlN87UuNPOwm44VryZxsiQoqISagS13InzounNlNX\njRziuHtPAgMBAAECggEAEJavXJ488SPOvtTCEepY3G7tExxYFufKuEMel2us+s1A\nelIKCOadwC3+q7aA/XLm40VzJcH5B2jT/DyWTHPe6jpkV3LopLBBe377LAUVpU6j\nn8HJ0x7uC68VSw56R22/hqQOKtOwdWRwDB1qEKqRDODhBSKoLE6aeWsSK3u/mnp4\n5tOzhAHNgJIs40q1n/I1NZ7zRmrJIUvUvANwhrID6eljUZzRzknLiGkB/+o62Jdi\n9hn9nOwMXbYFX3UGXnhejxUrcOntuo8ocUs90+m2M7+fAkrsSgY1QVngTu3r9QtD\nIXgIbUP3cdzpsxeFciGvNWGcEC41lFZK+8/jv8V17QKBgQDm9CxJvp1kPehITTSa\n8anISAx0iYFLCP5Xlrd23sE326oxo3crs1oKtWXlqSp9sXCUGwCVe8aZ+UkOmKYk\nybBR13nEPld6Ioatqu48x8+nz3Mr+/gcWTB/li0AH4AEA2WsPx/qTrNnJfYoB7VT\nC5FUgvB1ifbrCic/gRb3UlnoLQKBgQDWVFye5zp4LXhVkcXj/vH5WArxNuKQJ92E\nFVB1H5ToB0ckmnAGjVtlV5Uhps/ktC4BBpxmS7yT4SSZK9xlYojR71A7mXRW4Ao1\nzR0+7F8Yj5OoNsoQS9wMBEfGbZeU/Ohy+L2so7DBG3HP1ueeFcpdNja8yoqq5ser\nc80Ei+AC6wKBgQCB9JFbKZwMxN0ImhDowuUDYq9Hf/w1yai8hn1TsQJOOReqeM3c\n1D3tWqcstKTJN2genpcUhiJ5j5ExWmnat3a0hqfo6h91BSp9XHpTzyckyRGIhW7W\nHMWydUF7GT6Cg5rZcme2A3TlrLG3UqcQRKkRQeCmcuxy0zLEhBH1NuyKPQKBgQCu\nE/TqRyoRI/VBotVUueP0vhKdGhPoO8jKF7myd0UtM4QP8bOdTsB1zi3dGCxwN/vJ\nb4Il/8uZXFqqYZpvahlwUWwcDCYWzX7ddcwUKE2QmES4ck+p7sM5q1xUiPx90PBH\nOUps5sKQBWdqBMU4e8BR9s98hREdf7WaxsI0uBroowKBgEeCZ0FZW85sHT8OIEA8\nvSVmPgV5ocRO+o1GhVFGVV7UWo2Ibuo/vwwuyHCkhwjgoWjYpVro7Wc/A4GEysCR\nar8bePTbAxR8+vG7d1XcpEVRzWLta4ZbcluCNOaIdW1P9YX/0Rzju3qV4hCRESjp\nvi4Mg0YL8oKMkqVWt9CY07T9\n-----END PRIVATE KEY-----\n'
  }),
  databaseURL: 'https://escarpas-trip.firebaseio.com'
})

admin.firestore().settings({
  timestampsInSnapshots: true /* Breaking change. Prevenção de bug */
})

const cal = icalGenerator({
  domain: 'escarpastrip.com',
  prodId: { company: 'escarpastrip.com', product: '7280' },
  events: [
    {
      start: new Date(),
      end: addDays(new Date(), 2),
      summary: 'Example Event',
      description: 'It works ;)'
    }
  ]
})

app.get('/calendar', (req, res) => {
  cal.serve(res)
})

function parseHrtimeToSeconds (hrtime) {
  var seconds = (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3)
  return seconds
}

/* ________________________________________ Sync Airbnb iCalendar ________________________________________ */
app.get('/airbnb', async (req, res) => {
  const startTime = process.hrtime()
  try {
    const acomodsSnap = await admin.firestore().collection('acomods').get()
    const acomods = acomodsSnap.docs.map(doc => doc.data())

    for (const acomod of acomods) {
      if (acomod.iCalendars.airbnb !== '') {
        const icalAirbnb = await axios.get(acomod.iCalendars.airbnb)

        ical.parseICS(icalAirbnb.data, async (err, data) => {
          if (err) {
            res.send('Parse error.')
          } else {
            delete data.prodid

            let disabledDatesArrays = []

            for (const event of Object.values(data)) {
              disabledDatesArrays.push(eachDay(event.start, event.end))
            }

            const mergedDisabledDates = [].concat(...disabledDatesArrays)

            let parsedDisabledDates = []

            mergedDisabledDates.forEach(date => {
              parsedDisabledDates.push(format(date, 'YYYY-MM-DD'))
            })

            await admin.firestore().doc(`acomods/${acomod.acomodID}`).set({
              disabledDates: {
                airbnb: parsedDisabledDates
              }
            }, { merge: true })

            console.log(`${acomod.acomodID}:`, parsedDisabledDates)
          }
        })
      } else {
        console.log(`${acomod.acomodID} não está sincronizada com o Airbnb.`)
      }
    }

    res.status(200).send(`<h1>👍</h1> ${parseHrtimeToSeconds(process.hrtime(startTime))}s`)
  } catch (err) {
    console.log(err)
    res.send('<h1>👎</h1>')
  }
})/* ________________________________________ Sync Airbnb iCalendar ________________________________________ */

/* ________________________________________ Sync Booking iCalendar ________________________________________ */
app.get('/booking', async (req, res) => {
  const startTime = process.hrtime()
  try {
    const acomodsSnap = await admin.firestore().collection('acomods').get()
    const acomods = acomodsSnap.docs.map(doc => doc.data())

    for (const acomod of acomods) {
      if (acomod.iCalendars.booking !== '') {
        const icalBooking = await axios.get(acomod.iCalendars.booking)

        ical.parseICS(icalBooking.data, async (err, data) => {
          if (err) {
            res.send('Parse error.')
          } else {
            delete data.prodid

            let disabledDatesArrays = []

            for (const event of Object.values(data)) {
              disabledDatesArrays.push(eachDay(event.start, event.end))
            }

            const mergedDisabledDates = [].concat(...disabledDatesArrays)

            let parsedDisabledDates = []

            mergedDisabledDates.forEach(date => {
              parsedDisabledDates.push(format(date, 'YYYY-MM-DD'))
            })

            await admin.firestore().doc(`acomods/${acomod.acomodID}`).set({
              disabledDates: {
                booking: parsedDisabledDates
              }
            }, { merge: true })

            console.log(`${acomod.acomodID}:`, parsedDisabledDates)
          }
        })
      } else {
        console.log(`${acomod.acomodID} não está sincronizada com o Booking.`)
      }
    }

    res.status(200).send(`<h1>👍</h1> ${parseHrtimeToSeconds(process.hrtime(startTime))}s`)
  } catch (err) {
    console.log(err)
    res.send('<h1>👎</h1>')
  }
})/* ________________________________________ Sync Booking iCalendar ________________________________________ */

app.listen(7000)

/* module.exports = {
  path: '/api',
  handler: app
} */
