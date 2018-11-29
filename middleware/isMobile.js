import isMobile from 'ismobilejs'

export default function ({ store }) {
  if (!process.server) {
    /* Detect Device */
    isMobile.any ? store.commit('m_isMobile', true) : store.commit('m_isMobile', false)
  }
}
