import Vue from 'vue'
import pagarme from 'pagarme'

pagarme.client.connect({ api_key: 'ak_test_E3I46o4e7guZDqwRnSY9sW8o8HrL9D' })
  .then(client => client.transactions.all())
  .then(transactions => console.log(transactions))
  .catch(error => console.error(error))

Vue.use(pagarme)
