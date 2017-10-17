import Vuex from 'vuex'
/* import * as firebase from 'firebase' */

const store = () => new Vuex.Store({
  /* ******* STATE ******* */
  state: {
    showMenu: false,
    menuIconAnime: false
  },
  /* ******* GETTERS ******* */
  getters: {
    showMenu (state) {
      return state.showMenu
    },
    menuIconAnime (state) {
      return state.menuIconAnime
    }
  },
  /* ******* MUTATIONS ******* */
  mutations: {
    m_showMenu (state, payload) {
      state.showMenu = payload
    },
    m_menuIconAnime (state, payload) {
      state.menuIconAnime = payload
    }
  },
  /* ******* ACTIONS ******* */
  actions: {
  }
})

export default store
