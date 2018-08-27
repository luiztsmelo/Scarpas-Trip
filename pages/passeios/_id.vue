<template>
  <div class="passeios-id">


    <!-- ####### TOPBAR ####### -->
      <div class="topbar" v-scroll="scrollTopbarBg">
        <div class="topbar-body">

          <div class="back-box" @click="backBtn">
            <img class="__back-btn" v-scroll="scrollTopbarBtns" src="../../assets/img/back.svg" alt="voltar">
          </div>
          
          <div class="share-box" @click="$store.commit('m_showShare', true), hashShare()">
            <img class="__share-btn" v-scroll="scrollTopbarBtns" src="../../assets/img/share.svg" alt="compartilhar" >
          </div>

        </div>
      </div><!-- ####### TOPBAR ####### -->




    <!-- ####### IMAGE ####### -->
    <div class="image-box" ref="imageBox">
      <swiper :options="swiperOptions">

        <swiper-slide class="slide">
          <progressive-background class="__img" :src="image1H(passeio)" :placeholder="passeio.imageL1" :aspect-ratio="2/3"/>
        </swiper-slide>

        <swiper-slide class="slide" v-if="ifImage2">
          <progressive-background class="__img" :src="image2H(passeio)" :placeholder="passeio.imageL2" :aspect-ratio="2/3"/>
        </swiper-slide>

      </swiper>
    </div> 
    <!-- ####### IMAGE ####### -->



    <div class="desktop-view"><!-- Desktop View -->

      

      <div class="desktop-view-info"><!-- Desktop View Info -->

        <h1 class="id-title">{{ passeio.title }}</h1>


        <!-- ####### ANUNCIANTE ####### -->
        <div class="anunciante-box" @click="$store.commit('m_showProprietario', true), hashProprietario()">
          <img class="__anunciante-img" :src="passeio.photoURL" alt="">
          <div class="box-flex-column">
            <h3 style="user-select:none">Guiado por</h3>
            <a class="__anunciante-name">{{ passeio.proprietario }}</a>
          </div>
        </div><!-- ####### ANUNCIANTE ####### -->


        

        <!-- ####### SOBRE ####### -->
        <h1 class="item-title">Sobre o Passeio</h1>

        <div class="sobre-box">
          <h3>{{ passeio.subtitle }}</h3>
        </div><!-- ####### SOBRE ####### -->





        <!-- ####### CAPACIDADE ####### -->
        <h1 class="item-title">Capacidade</h1>

        <div class="capacidade-box">
          <h3>{{ passeio.capacidade }}</h3>
        </div><!-- ####### CAPACIDADE ####### -->





        <!-- ####### DURAÇÃO ####### -->
        <h1 class="item-title">Duração</h1>

        <div class="duracao-box">
          <h3>{{ passeio.duracao }}</h3>
        </div><!-- ####### DURAÇÃO ####### -->




        <!-- ####### PONTOS VISITADOS ####### -->
        <h1 class="item-title">Pontos Visitados</h1>

        <div class="pontos-box">
          <h3>Pontos aqui...</h3>
        </div><!-- ####### PONTOS VISITADOS ####### -->




        <!-- ####### DISPONIBILIDADE ####### -->
        <h1 class="item-title">Disponibilidade</h1>

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
        <h1 class="item-title">Local de Saída</h1>

        <div class="local-saida-box">
          <h3>{{ passeio.localSaida }}</h3>
          <h3>Mapa aqui...</h3>
        </div><!-- ####### LOCAL SAÍDA ####### -->



      
        <!-- ####### AVALIAÇÕES ####### -->
        <h1 class="item-title">Avaliações</h1>

        <div class="avaliacoes-box">
          <h3>Comentários aqui...</h3>
        </div><!-- ####### AVALIAÇÕES ####### -->


      </div><!-- Desktop View Info -->


      <div class="reserva-desktop">
        
      </div>


    </div><!-- Desktop View -->


    <!-- ####### RESERVA ####### --> 
    <div class="reserva">
      <div class="reserva-body">
        <h3 class="__reserva-valor">R${{ passeio.valorPasseio }}<span class="__reserva-valor-pessoa">/pessoa</span></h3>
        <button class="__reserva-btn">Reservar</button>
      </div>
    </div>
    <!-- ####### RESERVA ####### -->
    
    <proprietario/>
    
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import Proprietario from '../../components/Proprietario'
import supportsWebP from 'supports-webp'
import { mapstyle } from '../../mixins/mapstyle'
import { swiperOptions } from '../../mixins/swiper_id'

export default {
  components: { Proprietario },
  mixins: [ mapstyle, swiperOptions ],
  data () {
    return {
      monthLabels: ['Janeiro','Favereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
      weekdayLabels: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      themeStyles: {
        wrapper: {
          color: 'rgb(62, 62, 62)',
          border: '0',
          padding: '6px 9px 0 9px',
          background: 'white',
          width: '100%'
        },
        header: {
          padding: '0 9px',
        },
        headerArrows: {
          fontSize: '1.4rem',
        },
        headerTitle: {
          fontSize: '16px',
          fontWeight: '400'
        },
        weekdays: {
          color: 'rgb(62, 62, 62)',
          fontWeight: '700',
          padding: '15px 5px 8px 5px',
        },
        dayCell: {
          height: '30px'
        },
        dayContent: {
          fontWeight: '400',
          fontSize: '15px',
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
  transition: 'id',
  fetch ({ store, params }) {
    store.commit('m_loader', true)
    return firebase.firestore().collection('passeios').doc(params.id).get()
    .then(doc => {
      store.commit('m_passeio', doc.data())
      store.commit('m_loader', false)
      if (store.state.isMobile === true) {
        store.commit('m_showNavbar', false)
        store.commit('m_showFoobar', false)
      }
      if (doc.exists) {
        firebase.firestore().collection('passeios').doc(params.id).collection('visits').add({ 
          date: new Date().getTime(),
          fromMobile: store.state.isMobile,
          clickedReservaBtn: false,
          wentToReservaPage: false,
          concludedReserva: false
        })
        .then(doc => store.state.visitID = doc.id)
        .catch(err => console.log(err))
      }
    })
    .catch(err => {
      store.commit('m_loader', false)
      console.log(err)
    })
  },
  methods: {
    scrollTopbarBg (evt, el) {
      return window.scrollY >= this.$store.state.heightImageBox
        ? el.setAttribute("style", "background: white; box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.1)")
        : el.removeAttribute("style")
    },
    scrollTopbarBtns (evt, el) {
      return window.scrollY >= this.$store.state.heightImageBox
        ? el.setAttribute("style", "filter: invert(90%)")
        : el.removeAttribute("style")
    },
    backBtn () {
      window.history.back(1)
    },
    hashProprietario () {
       window.location.hash = "contato"
    },
    hashShare () {
       window.location.hash = "compartilhar"
    },
    image1H (passeio) {
      return supportsWebP ? passeio.imageH1W : passeio.imageH1J
    },
    image2H (passeio) {
      return supportsWebP ? passeio.imageH2W : passeio.imageH2J
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
  async mounted () {
    this.$store.state.heightImageBox === null ? this.$store.state.heightImageBox = this.$refs.imageBox.clientHeight : null
  },
  computed: {
    passeio () {
      return this.$store.state.passeio
    },
    ifImage2 () {
      return this.passeio.imageH2W === null ? '' : supportsWebP ? this.passeio.imageH2W : this.passeio.imageH2J
    },
    showShare () {
      return this.$store.state.showShare
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('m_loader', false) /* Evitar bugs com o loader */
    if (this.$store.state.showNavbar === false && this.$store.state.showFoobar === false) {
      this.$store.commit('m_showNavbar', true)
      this.$store.commit('m_showFoobar', true)
      next()
    } else {
      next()
    }
  }
}
</script>

<style>
@import url('~/assets/css/main.css');
@import url('~/assets/css/_id.css');

.passeios-id {
  display: flex;
  flex-flow: column;
  background-color: white;
  margin-bottom: 5.5rem;
  transition: all .27s cubic-bezier(.15,.97,.43,.93);
  


  /* ####### IMAGE BOX ####### */
  & .image-box {
    overflow: hidden;
    & .swiper-container {
      position: relative;
      & .swiper-wrapper {
        display: inline-flex;
        overflow: hidden;
        & .slide {
          & .__img {
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }/* ####### IMAGE BOX ####### */


  
  /* ####### ANUNCIANTE BOX ####### */
  & .anunciante-box {
    display: flex;
    padding: 1.5rem 7% 0 7%;
    align-items: center;
    & .__anunciante-img {
      width: 3.3rem;
      height: 3.3rem;
      border-radius: 50%;
      user-select: none;
      margin-right: .6rem;
    }
    & .__anunciante-name {
      color: #00BAAC;
      user-select: none;
    }
  }/* ####### ANUNCIANTE BOX ####### */




  /* ####### SOBRE BOX ####### */
  & .sobre-box {
    padding: 0 7%;
  }/* ####### SOBRE BOX ####### */




  /* ####### CAPACIDADE BOX ####### */
  & .capacidade-box {
    padding: 0 7%;
  }/* ####### CAPACIDADE BOX ####### */





  /* ####### DURAÇÃO ####### */
  & .duracao-box {
    padding: 0 7%;
  }/* ####### DURAÇÃO ####### */




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


  /* ####### RESERVA ####### */
  & .reserva {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 8888;
    height: 3.8rem;
    width:  100%;
    background: white;
    padding: 0 7%;
    box-shadow: 0px -1px 1px 0px rgba(0,0,0,0.1);
    user-select: none;
    & .reserva-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      & .__reserva-valor {
        font-size: 17px;
        font-weight: 500;
      }
      & .__reserva-valor-pessoa {
        font-size: 15px;
      }
      & .__reserva-btn {
        font-size: 16px;
        font-weight: 700;
        background: var(--colorPasseio);
        line-height: 2.6rem;
        color: white;
        height: 2.7rem;
        width:  50%;
        border-radius: 4px;
      }
    }
  }/* ####### RESERVA ####### */

}


/* TRANSITIONS */

@media (max-width: 1023px) {
  .reserva-desktop {
    display: none;
  }
}

@media (min-width: 1024px) {
  .passeios-id {
    margin-top: var(--navbarHeightDesktop);

    /* ####### IMAGE BOX ####### */
    & .image-box {
      cursor: grab;
      overflow: hidden;
      & .swiper-container {
        position: relative;
        & .swiper-wrapper {
          display: inline-flex;
          overflow: hidden;
          & .slide {
            & .__img {
              width: 100%;
              height: auto;
            }
          }
        }
      }
    }
    & .image-box:active {
      cursor: grabbing;
    }/* ####### IMAGE BOX ####### */
    & .desktop-view {
      display: flex;
      margin: 1.7rem 8% 0 8%;
      & .reserva-desktop {
        flex-basis: 31%;
        border: 1px solid rgb(222,222,222);
        align-self: flex-start;
      }
      & .desktop-view-info {
        margin-right: 5%;
        flex-basis: 69%;
        /* ####### ANUNCIANTE BOX ####### */
        & .anunciante-box {
          padding: 1.5rem 0 0 0;
          & .__anunciante-img {
            width: 4rem;
            height: 4rem;
            margin-right: .7rem;
          }
          & .__anunciante-name {
            color: #00BAAC;
            user-select: none;
          }
        }/* ####### ANUNCIANTE BOX ####### */


        /* ####### SOBRE BOX ####### */
        & .sobre-box {
          padding: 0;
        }/* ####### SOBRE BOX ####### */




        /* ####### CAPACIDADE BOX ####### */
        & .capacidade-box {
          padding: 0;
        }/* ####### CAPACIDADE BOX ####### */



        /* ####### LOCAL ####### */
        & .local-box {
          & .__adress {
            padding: 0 0 .6rem 0;
          }
          & .vue-map-container {
            height: 400px;
          }
        }/* ####### LOCAL ####### */


        /* ####### AVALIAÇÕES ####### */
        & .avaliacoes-box {
          padding: 0;
        }/* ####### AVALIAÇÕES ####### */
      }
    }
    
  

    /* ####### RESERVA ####### */
    & .reserva {
      display: none;
    }/* ####### RESERVA ####### */
  }
}

</style>
