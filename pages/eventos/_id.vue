<template>
  <div class="eventos_id" :class="{ onShare: showShare }">

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
      <img class="__image1" :src="imageH(evento)">
    </div><!-- ####### IMAGE ####### -->



    <!-- ####### HEADING ####### -->
    <div class="heading-box">
      <h1 class="__title">{{ evento.title }}</h1>
      <h1 class="__subtitle">{{ evento.subtitle }}</h1>
    </div><!-- ####### HEADING ####### -->



    <!-- ####### DATA E HORÁRIO ####### -->
    <h1 class="box-title">Data e Horário</h1>

    <div class="date-hour-box">
      <h1 class="__date-hour">{{ evento.date}}&#160;-&#160;</h1>
      <h1 class="__date-hour">{{ evento.hour }}</h1>
    </div><!-- ####### DATA E HORÁRIO ####### -->
    



    <!-- ####### VALOR DO INGRESSO ####### -->
    <h1 class="box-title">Valor do Ingresso</h1>

    <div class="ingresso-box">

      <div class="gender-box">
        <img class="__img" src="../../assets/img/woman.svg">
        <h1 class="__valor-ingresso">R${{ evento.valorIngresso }}</h1>
      </div>

      <div class="gender-box">
        <img class="__img" src="../../assets/img/man.svg">
        <h1 class="__valor-ingresso">R${{ evento.valorIngresso }}</h1>
      </div>
      
    </div><!-- ####### VALOR DO INGRESSO ####### -->



    <!-- ####### LOCAL ####### -->
    <h1 class="box-title">Local</h1>

    <div class="local-box" >
      <gmap-map
      :center="{lat: evento.positionLAT, lng: evento.positionLNG}"
      :zoom="15"
      :options="{styles: styles, draggable:false, fullscreenControl:false, zoomControl:false, mapTypeControl:false, streetViewControl:false}"
      style="width: 100%; height: 220px"
      @click="$store.commit('m_eventoMap', evento), enterFullscreen()">
        <Gmap-Marker
        :position="{lat: evento.positionLAT, lng: evento.positionLNG}"
        ></Gmap-Marker>
      </gmap-map>
    </div><!-- ####### LOCAL ####### -->
    

  </div>
</template>

<script>
/* import _ from 'lodash' */
import supportsWebP from 'supports-webp'
import { mapstyle } from '../../mixins/mapstyle'
import * as firebase from 'firebase'

export default {
  mixins: [mapstyle],
  head () {
    return {
      title: this.$store.state.evento.title + ' ‒ ' + 'Escarpas Trip',
      meta: [
        { hid: 'description', name: 'description', content: this.$store.state.evento.subtitle },
        { property: 'og:url', content: 'https://escarpastrip.com/eventos/' + this.$route.params.id },
        { property: 'og:title', content: this.$store.state.evento.title },
        { property: 'og:description', content: this.$store.state.evento.subtitle },
        { property: 'og:image', content: this.$store.state.evento.imageH1J },
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
      return firebase.database().ref('eventos/' + params.id).once('value')
      .then(snapshot => {
        store.commit('m_evento', snapshot.val())
        store.commit('m_showNavbar', false)
        store.commit('m_showFoobar', false)
      })
    /* } */
  },
  methods: {
    imageH (evento) {
      if (supportsWebP) {
        return evento.imageH1W
      } else {
        return evento.imageH1J
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
    evento () {
      return this.$store.state.evento
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

<style scope>
@import url('../../assets/css/main.css');

.eventos_id {
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
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
      }
    }
  }/* ####### BACKBAR ####### */


  & .box-title {
    font-weight: 500;
    font-size: 20px;
    padding: 3rem 6% 1rem 6%;
  }


  /* ####### IMAGE BOX ####### */
  & .image-box {
    position: relative;
    & .__image1 {
      width: 100%;
      height: auto;
    }
  }/* ####### IMAGE BOX ####### */


  /* ####### HEADING BOX ####### */
  & .heading-box {
    padding: 0 6%;
    & .__title {
      margin: 1rem 0 2rem 0;
      font-size: 34px;
      font-weight: 600;
    }
    & .__subtitle {
      font-size: 19px;
      font-weight: 300;
    }
  }/* ####### HEADING BOX ####### */


  /* ####### DATA E HORÁRIO ####### */
  & .date-hour-box {
    display: flex;
    padding: 0 6%;
    & .__date-hour {
      font-size: 19px;
      font-weight: 300;
    }
  }/* ####### DATA E HORÁRIO ####### */


  /* ####### VALOR INGRESSO ####### */
  & .ingresso-box {
    display: flex;
    flex-flow: row;
    padding: 0 6%;
    & .gender-box {
      padding: 0 4% 0 0;
      display: flex;
      align-items: center;
      & .__img {
        margin-right: .4rem;
        width: 1.7rem;
        height: auto;
      }
      & .__valor-ingresso {
        font-size: 19px;
        font-weight: 300;
      }
    }
    
  }/* ####### VALOR INGRESSO ####### */


}

.onShare {
  filter: brightness(30%);
}

@media (min-width: 1281px) {
  .eventos_id {
    /* padding: 0 12%; */
  }
}
</style>
