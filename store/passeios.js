export const state = () => ({
  passeioData: {/* Lembrar de atualizar a action */
    passeioID: null,
    planoCasual: false,
    planoPro: false,
    title: '',
    subtitle: '',
    imageH1W: null,
    imageH1J: null,
    imageL1: null
  },
  passeioProgressBar: 0,
  cadastroPasseio0: true,
  cadastroPasseio1: false,
  cadastroPasseio2: false,
  cadastroPasseio3: false,
  cadastroPasseio4: false,
  cadastroPasseio5: false,
  cadastroPasseio6: false,
  cadastroPasseio7: false
})

export const mutations = {
  m_passeioProgressBar (state, payload) {
    state.passeioProgressBar = payload
  }
}
