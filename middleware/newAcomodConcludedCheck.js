/* Checar se o usuário anunciou uma acomodação.
   Necessário para o correto funcionamento do backBtn _id */

export default function ({ store, redirect }) {
  return store.state.concludedNewAcomod ? redirect('/') : ''
}
