'use strict'

const https = require('https')
const fs = require('fs')
const express = require('express')
/* const ICAL = require('ical.js') */
const icalGenerator = require('ical-generator')
const addDays = require('date-fns/add_days')
/* const puppeteer = require('puppeteer') */

const app = express()

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

app.get('/airbnb', (req, res) => {
  const file = fs.createWriteStream('calendar.ics')

  https.get('https://www.airbnb.com.br/calendar/ical/29384793.ics?s=4d585acbdfa1ee2ec7a7096d73067d73', response => {
    response.pipe(file)
    /* var jCalData = ICAL.parse('/calendar.ics')
    res.send(jCalData) */
    res.send('OK')
  })
})

module.exports = {
  path: '/api',
  handler: app
}
