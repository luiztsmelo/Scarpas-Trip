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




    <!-- ####### ANUNCIANTE ####### -->
    <div class="anunciante-box">
      <img class="__anunciante-img" :src="passeio.photoURL" alt="">
      <h3 class="__anunciante-name">{{ passeio.proprietario }}</h3>
    </div><!-- ####### ANUNCIANTE ####### -->


    

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




    <!-- ####### PONTOS VISITADOS ####### -->
    <h1 class="box-title">Pontos Visitados</h1>

    <div class="pontos-box">
      <h3>Pontos aqui...</h3>
    </div><!-- ####### PONTOS VISITADOS ####### -->




    <!-- ####### DISPONIBILIDADE ####### -->
    <h1 class="box-title">Disponibilidade</h1>

    <v-calendar
      mode='single'
      :month-labels='monthLabels'
      :weekday-labels='weekdayLabels'
      :theme-styles='themeStyles'
      is-inline
      >
    </v-calendar>
    <!-- ####### DISPONIBILIDADE ####### -->




    <!-- ####### LOCAL SAÍDA ####### -->
    <h1 class="box-title">Local de Saída</h1>

    <div class="local-saida-box">
      <h3>Mapa aqui...</h3>
    </div><!-- ####### LOCAL SAÍDA ####### -->



  
    <!-- ####### AVALIAÇÕES ####### -->
    <h1 class="box-title">Avaliações</h1>

    <div class="avaliacoes-box">
      <h3>Comentários aqui...</h3>
    </div><!-- ####### AVALIAÇÕES ####### -->





    <div class="reserva">
      <div class="reserva-body">
        <h3 class="__reserva-valor">R${{ passeio.valorPasseio }}</h3>
        <button class="__reserva-btn">Reservar</button>
      </div>
    </div>
    

    

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
      },
      monthLabels: ['Janeiro','Favereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
      weekdayLabels: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      themeStyles: {
        wrapper: {
          color: 'rgb(72,72,72)',
          border: '0',
          padding: '6px 9px 0 9px',
          background: 'white',
          width: '100%'
        },
        header: {
          padding: '0 9px',
        },
        headerArrows: {
          fontSize: '1.5rem',
        },
        headerTitle: {
          fontSize: '19px',
          fontWeight: '300'
        },
        weekdays: {
          color: 'rgb(72,72,72)',
          fontWeight: '600',
          padding: '20px 5px 10px 5px',
        },
        dayContentStyle: {
          fontWeight: '300',
          fontSize: '14px',
        }
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
    z-index: 10;
    height: 3.1rem;
    width:  100%;
    background: transparent;
    padding: 0 7%;
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
    padding: 3rem 7% .5rem 7%;
  }

  & .__passeio-title {
    padding: 0 7%;
    margin: 1rem 0 0 0;
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


  
  /* ####### ANUNCIANTE BOX ####### */
  & .anunciante-box {
    display: flex;
    padding: 1.5rem 7% 0 7%;
    align-items: center;
    & .__anunciante-img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
    & .__anunciante-name {
      padding-left: .5rem;
    }
  }/* ####### ANUNCIANTE BOX ####### */




  /* ####### SOBRE BOX ####### */
  & .sobre-box {
    padding: 0 7%;
  }/* ####### SOBRE BOX ####### */




  /* ####### LOTACAO BOX ####### */
  & .lotacao-box {
    padding: 0 7%;
  }/* ####### LOTACAO BOX ####### */




  /* ####### PONTOS VISITADOS ####### */
  & .pontos-box {
    padding: 0 7%;
  }/* ####### PONTOS VISITADOS ####### */




  /* ####### DISPONIBILIDADE ####### */




  /* ####### LOCAL SAÍDA ####### */
  & .local-saida-box {
    padding: 0 7%;
  }/* ####### LOCAL SAÍDA ####### */





  /* ####### AVALIAÇÕES ####### */
  & .avaliacoes-box {
    padding: 0 7%;
  }/* ####### AVALIAÇÕES ####### */


  /* ####### BACKBAR ####### */
  & .reserva {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 3;
    height: 3rem;
    width:  100%;
    background: white;
    padding: 0 7%;
    box-shadow: 0px -1px 1px 0px rgba(0,0,0,0.1);
    & .reserva-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      & .__reserva-valor {
        color: var(--color01);
        font-size: 23px;
      }
      & .__reserva-btn {
        font-size: 15px;
        background: #49A5FC;
        color: white;
        padding: .5rem 1.2rem;
        border-radius: 4px;
      }
    }
  }/* ####### BACKBAR ####### */

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
