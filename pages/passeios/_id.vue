<template>
  <div class="passeios_id" :class="{ onShare: showShare }">

    <div class="backbar">
      <div class="backbar-body">
        <nuxt-link to="/">
        <img class="__back-btn" src="../../assets/img/back.svg" alt="voltar">
        </nuxt-link>
        <img class="__share-btn" src="../../assets/img/share.svg" alt="compartilhar" @click="$store.commit('m_showShare', true)">
      </div>
    </div>



    <!-- ####### IMAGE ####### -->
    <div class="image-box">
      <img class="__image1" :src="imageH(passeio)">
    </div><!-- ####### IMAGE ####### -->



    <h1 class="__passeio-title">{{ passeio.title }}</h1>



    
    <!-- ####### SOBRE ####### -->
    <h1 class="box-title">Sobre</h1>

    <div class="sobre-box">
      <h3>{{ passeio.subtitle }}</h3>
    </div><!-- ####### SOBRE ####### -->

    

    <!-- ####### LOTACAO ####### -->
    <h1 class="box-title">Lotação</h1>

    <div class="lotacao-box">
      <h3>{{ passeio.lotacao }}</h3>
    </div><!-- ####### LOTACAO ####### -->



    <!-- ####### PROPRIETÁRIO ####### -->
    <h1 class="box-title">Proprietário</h1>

    <div class="proprietario-box">
      <img class="__proprietario-img" :src="passeio.photoURL" alt="">
      <h3 class="__proprietario-name">{{ passeio.proprietario }}</h3>
    </div><!-- ####### PROPRIETÁRIO ####### -->

    

  </div>
</template>

<script>
/* import _ from 'lodash' */
import supportsWebP from 'supports-webp'
import { mapstyle } from '../../mixins/mapstyle'
import * as firebase from 'firebase'

export default {
  mixins: [mapstyle],
  data () {
    return {
      markerIcon: {
        url: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fmarker.svg?alt=media&token=fcbfd76e-ee93-41e8-a816-98906e19859b',
        scaledSize: new google.maps.Size(42, 42)
      }
    }
  },
  head () {
    return {
      title: this.$store.state.passeio.title + ' ‒ ' + 'Escarpas Trip',
      meta: [
        { hid: 'description', name: 'description', content: this.$store.state.passeio.subtitle },
        { property: 'og:url', content: 'https://escarpastrip.com/passeios/' + this.$route.params.id },
        { property: 'og:title', content: this.$store.state.passeio.title },
        { property: 'og:description', content: this.$store.state.passeio.subtitle },
        { property: 'og:image', content: this.$store.state.passeio.imageH1J },
        { property: 'og:site_name', content: 'Escarpas Trip' }
      ]
    }
  },
  transition: 'evento',
  fetch ({ store, params }) {
    /* if (store.state.eventos !== null) {
      const eventodata = _.pick(store.state.eventos, [store.state.eventos.eventoID = store.state.getEventoID])
      store.commit('m_evento', evento)
    } else { */
      return firebase.database().ref('passeios/' + params.id).once('value')
      .then(snapshot => {
        store.commit('m_passeio', snapshot.val())
        store.commit('m_showNavbar', false)
        store.commit('m_showFoobar', false)
      })
    /* } */
  },
  methods: {
    imageH (passeio) {
      if (supportsWebP) {
        return passeio.imageH1W
      } else {
        return passeio.imageH1J
      }
    },
    enterFullscreen () {
      if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      }
    }
  },
  computed: {
    passeio () {
      return this.$store.state.passeio
    },
    showShare () {
      return this.$store.state.showShare
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.$store.state.showNavbar === false && this.$store.state.showFoobar === false) {
      this.$store.commit('m_showNavbar', true)
      this.$store.commit('m_showFoobar', true)
      next()
    } else {
      next(false)
    }
  }
}
</script>

<style>
@import url('../../assets/css/main.css');

.passeios_id {
  display: flex;
  flex-flow: column;
  background-color: white;
  transition: all .3s cubic-bezier(.15,.97,.43,.93);


  /* ####### BACKBAR ####### */
  & .backbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    height: 3.1rem;
    width:  100%;
    background: transparent;
    padding: 0 6%;
    & .backbar-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      & .__back-btn {
        transform: translateY(1px);/* A imagem ta errada */
        cursor: pointer;
        width: 1.3rem;
        height: auto;
      }
      & .__share-btn {
        cursor: pointer;
        width: 1.5rem;
        height: auto;
      }
    }
  }/* ####### BACKBAR ####### */


  & .box-title {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 15px;
    padding: 2rem 7% .5rem 7%;
  }

  & .__passeio-title {
    padding: 0 7%;
    margin: 1rem 0 2rem 0;
    font-size: 34px;
    font-weight: 600;
  }



  /* ####### IMAGE BOX ####### */
  & .image-box {
    position: relative;
    & .__image1 {
      width: 100%;
      height: auto;
    }
  }/* ####### IMAGE BOX ####### */



  /* ####### SOBRE BOX ####### */
  & .sobre-box {
    padding: 0 7%;
  }/* ####### SOBRE BOX ####### */


  /* ####### LOTACAO BOX ####### */
  & .lotacao-box {
    padding: 0 7%;
  }/* ####### LOTACAO BOX ####### */


  /* ####### PROPRIETARIO BOX ####### */
  & .proprietario-box {
    display: flex;
    padding: 0 7%;
    align-items: center;
    & .__proprietario-img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
    & .__proprietario-name {
      padding-left: .5rem;
    }
  }/* ####### PROPRIETARIO BOX ####### */


}

.onShare {
  filter: brightness(30%);
}

@media (min-width: 1281px) {
  .eventos_id {
    /* padding: 0 13%; */
  }
}
</style>
