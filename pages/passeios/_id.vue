<template>
  <div class="passeios-id">
    

    <proprietario/>



    <!-- ______________________________ TOPBAR ______________________________ -->
    <div class="topbar" v-scroll="scrollTopbarBg">
      <div class="topbar-body">

        <div class="back-box" @click="backBtn">
          <img class="__back-btn" v-scroll="scrollTopbarBtns" src="../../assets/img/back.svg" alt="voltar">
        </div>
        
        <div class="share-box" @click="$store.commit('m_showShare', true), hashShare()">
          <img class="__share-btn" v-scroll="scrollTopbarBtns" src="../../assets/img/share.svg" alt="compartilhar" >
        </div>

      </div>
    </div><!-- ______________________________ TOPBAR ______________________________ -->






    <!-- ______________________________ IMAGE ______________________________ -->
    <div class="image-box" ref="imageBox">
      <swiper :options="swiperOptions">
        
        <swiper-slide class="slide" v-for="image in passeio.images" :key="image.id">
          <progressive-background class="__img" :src="imageH(image)" :placeholder="image.L" :aspect-ratio="2/3"/>
        </swiper-slide>

      </swiper>
    </div> 
    <!-- ______________________________ IMAGE ______________________________ -->






    <div class="desktop-view"><!-- Desktop View -->


    

      <div class="desktop-view-info"><!-- Desktop View Info -->





        <h1 class="id-title">{{ passeio.title }}</h1>





        <!-- ______________________________ ANUNCIANTE ______________________________ -->
        <div class="anunciante-box" @click="$store.commit('m_showProprietario', true), hashProprietario()">
          <img class="__anunciante-img" :src="passeio.photoURL" alt="">
          <div class="box-flex-column">
            <h3 style="user-select:none">Guiado por</h3>
            <a class="__anunciante-name">{{ passeio.proprietario }}</a>
          </div>
        </div><!-- ______________________________ ANUNCIANTE ______________________________ -->


        



        <!-- ______________________________ SOBRE ______________________________ -->
        <h1 class="item-title">Sobre o Passeio</h1>

        <div class="sobre-box">
          <h3>{{ passeio.subtitle }}</h3>
        </div><!-- ______________________________ SOBRE ______________________________ -->





        <!-- ______________________________ CAPACIDADE ______________________________ -->
        <h1 class="item-title">Capacidade</h1>

        <div class="capacidade-box">
          <h3>{{ passeio.capacidade }}</h3>
        </div><!-- ______________________________ CAPACIDADE ______________________________ -->





        <!-- ______________________________ DURAÇÃO ______________________________ -->
        <h1 class="item-title">Duração</h1>

        <div class="duracao-box">
          <h3>{{ passeio.duracao }}</h3>
        </div><!-- ______________________________ DURAÇÃO ______________________________ -->




        <!-- ______________________________ PONTOS VISITADOS ______________________________ -->
        <h1 class="item-title">Pontos Visitados</h1>

        <div class="pontos-box">
          <h3>Pontos aqui...</h3>
        </div><!-- ______________________________ PONTOS VISITADOS ______________________________ -->




        <!-- ______________________________ DISPONIBILIDADE ______________________________ -->
        <h1 class="item-title">Disponibilidade</h1>

        <v-calendar
          mode='single'
          :month-labels='monthLabels'
          :weekday-labels='weekdayLabels'
          :theme-styles='themeStyles'
          is-inline
          >
        </v-calendar>
        <!-- ______________________________ DISPONIBILIDADE ______________________________ -->




        <!-- ______________________________ LOCAL SAÍDA ______________________________ -->
        <h1 class="item-title">Local de Saída</h1>

        <div class="local-saida-box">
          <h3>{{ passeio.localSaida }}</h3>
          <h3>Mapa aqui...</h3>
        </div><!-- ______________________________ LOCAL SAÍDA ______________________________ -->




      
        <!-- ______________________________ AVALIAÇÕES ______________________________ -->
        <h1 class="item-title">Avaliações</h1>

        <div class="avaliacoes-box">
          <h3>Comentários aqui...</h3>
        </div><!-- ______________________________ AVALIAÇÕES ______________________________ -->




      </div><!-- Desktop View Info -->




      <!-- ______________________________ RESERVA DESKTOP ______________________________ -->
      <div class="reserva-desktop">
        <form class="reserva-desktop-form">
          

          <div class="valor-box">
            <h1 class="__valor">R${{ passeio.valorPasseio.toLocaleString() }}<span class="__valor-pessoa"> por pessoa</span></h1>
          </div>


        </form>
      </div><!-- ______________________________ RESERVA DESKTOP ______________________________ -->




    </div><!-- Desktop View -->




    <!-- ______________________________ RESERVA MOBILE ______________________________ --> 
    <div class="reserva">
      <div class="reserva-body">
        <h3 class="__reserva-valor">R${{ passeio.valorPasseio }}<span class="__reserva-valor-pessoa">/pessoa</span></h3>
        <button class="__reserva-btn">Reservar</button>
      </div>
    </div>
    <!-- ______________________________ RESERVA MOBILE ______________________________ -->
    
    
    
  </div>
</template>

<script>
import firebase from '@firebase/app'
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
    imageH (image) {
      return supportsWebP ? image.HW : image.HJ
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
    passeio () { return this.$store.state.passeio },
    showShare () { return this.$store.state.showShare }
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




  /* __________ RESERVA __________ */
  & .reserva {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 8888;
    height: 4.7rem;
    width: 100%;
    background: white;
    overflow: hidden;
    box-shadow: 0px -1px 1px 0px rgba(0,0,0,0.1);
    user-select: none;
    & .reserva-body {
      padding: 0 7%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      & .__reserva-valor {
        padding-right: 15px;
        font-size: 18px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & .__reserva-valor-pessoa {
        font-size: 14px;
        font-weight: 400;
      }
      & .__reserva-btn {
        width: 10rem;
        height: 3.2rem;
        background:var(--colorAcomod);
        border-radius: 5px;
        font-size: 16px;
        font-weight: 700;
        color: white;
        transition: var(--main-transition);
      }
    }
  }/* __________ RESERVA __________ */

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
        border: 1px solid #dedede;
        align-self: flex-start;
        & .reserva-desktop-form {
          padding: 1rem 1.4rem;
          & .valor-box {
            display: flex;
            align-items: flex-end;
            padding-bottom: 1.2rem;
            & .__valor {
              font-size: 34px;
              font-weight: 400;
              & .__valor-pessoa {
                font-size: 16px;
                font-weight: 400;
              }
            }
          }
          & .item-form {
            display: flex;
            flex-flow: column;
            margin-top: 1.2rem;
            & input {
              cursor: pointer;
              width: 100%;
              padding: .75rem .6rem;
              border: 1px solid #dedede;
              outline: none;
              background: white;
              transition: .15s border ease;
            }
            & input:hover {
              border: 1px solid var(--color01) !important;
            }
            & select {
              cursor: pointer;
              width: 100%;
              padding: .75rem .6rem;
              border: 1px solid #dedede;
              outline: none;
              background: white;
              transition: .15s border ease;
              & option {
                background: white;
              }
            }
            & select:hover {
              border: 1px solid var(--color01) !important;
            }
            & .reserva-input-date {
              padding-left: .9rem;
            }
            & .reserva-close-date {
              width: .7rem;
              height: auto;
              position: absolute;
              right: 3%;
              top: 50%;
              transform: translateY(-50%);
              cursor: pointer;
            }
          }
          & .reserva-info {
            margin-top: .9rem;
            & .reserva-info_item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              & h3 {
                font-size: 15px;
              }
            }
            & .reserva-info_item-total {
              display: flex;
              justify-content: space-between;
              border-top: 1px solid #dedede;
              & h3 {
                font-size: 17px;
                font-weight: 500;
              }
            }
          }
          & .__reserva-desktop-btn {
            margin-top: 1.3rem;
            font-size: 17px;
            font-weight: 700;
            background: var(--colorAcomod);
            color: white;
            height: 3.2rem;
            width: 100%;
            border-radius: 5px;
          }
          & .__reserva-desktop-btn-ask {
            font-size: 16px;
            font-weight: 600;
            background: transparent;
            color: var(--colorAcomod);
            height: 2.1rem;
            width: 100%;
          }
          & .__info {
            margin: .5rem 0 .8rem;
            text-align: center;
            font-size: 12px;
            font-weight: 500;
            line-height: 17px;
          }
        }
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
    
  

    /* __________ RESERVA __________ */
    & .reserva {
      display: none;
    }/* __________ RESERVA __________ */
  }
}

</style>
