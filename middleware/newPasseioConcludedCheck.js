/* Checar se o usuário anunciou um passeio.
   Necessário para o correto funcionamento do backBtn _id */

export default function ({ store, redirect }) {
  return store.state.concludedNewPasseio ? redirect('/') : ''
}
