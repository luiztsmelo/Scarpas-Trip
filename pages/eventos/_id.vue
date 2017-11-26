<template>
  <div class="eventos_id" :class="{ onShare: showShare }">

    <!-- ####### TOPBAR ####### -->
    <div class="topbar" :class="{ topbarBg: scrollTopbar }">
      <div class="topbar-body">
        <nuxt-link to="/">
          <img class="__back-btn" :class="{ topbarBtn: scrollTopbar }" src="../../assets/img/back.svg" alt="voltar">
        </nuxt-link>
        <img class="__share-btn" :class="{ topbarBtn: scrollTopbar }" src="../../assets/img/share.svg" alt="compartilhar" @click="$store.commit('m_showShare', true)">
      </div>
    </div><!-- ####### TOPBAR ####### -->




    <!-- ####### IMAGE ####### -->
    <div class="image-box">
      <swiper :options="swiperOption">
        <swiper-slide class="slide"><img class="__img" :src="image1H(evento)"></swiper-slide>
        <swiper-slide class="slide" v-if="ifImage2"><img class="__img" :src="image2H(evento)"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div> 
    <!-- ####### IMAGE ####### -->




    <h1 class="__event-title">{{ evento.title }}</h1>




    <!-- ####### DATA E HORÁRIO ####### -->
    <div class="date-hour-box">
      <h3 class="__date">{{ date }}&#160;&#8231;&#160;</h3>
      <h3 class="__hour">{{ evento.hour }}</h3>
    </div><!-- ####### DATA E HORÁRIO ####### -->




    <!-- ####### SOBRE ####### -->
    <h1 class="box-title">Sobre</h1>

    <div class="sobre-box">
      <h3>{{ evento.subtitle }}</h3>
    </div><!-- ####### SOBRE ####### -->

    


    <!-- ####### VALOR DO INGRESSO ####### -->
    <h1 class="box-title">Valor do Ingresso</h1>

    <div class="ingresso-box">

      <div class="gender-box">
        <img class="__img" src="../../assets/img/woman.svg">
        <h3 style="transform:translateX(2px)">R${{ evento.valorIngresso }}</h3>
      </div>

      <div class="gender-box">
        <img class="__img" src="../../assets/img/man.svg">
        <h3>R${{ evento.valorIngresso }}</h3>
      </div>
      
    </div><!-- ####### VALOR DO INGRESSO ####### -->




    <!-- ####### LOCAL ####### -->
    <h1 class="box-title">Local</h1>
    
    <div class="local-box" >
      <h3 class="__adress">{{ evento.address }}</h3>

      <gmap-map
      :center="{lat: evento.positionLAT, lng: evento.positionLNG}"
      :zoom="15"
      :options="{styles: styles, draggable:false, fullscreenControl:false, zoomControl:false, mapTypeControl:false, streetViewControl:false}"
      style="width: 100%; height: 220px"
      @click="$store.commit('m_eventoMap', evento), enterFullscreen()">
        <Gmap-Marker
        :position="{lat: evento.positionLAT, lng: evento.positionLNG}"
        :icon="markerIcon"
        ></Gmap-Marker>
      </gmap-map>
    </div><!-- ####### LOCAL ####### -->
    


    <!-- ####### RESERVA ####### -->
    <div class="reserva">
      <div class="reserva-body">
        <h3 class="__reserva-valor">R${{ evento.valorIngresso }}</h3>
        <button class="__reserva-btn">Comprar</button>
      </div>
    </div><!-- ####### RESERVA ####### -->


    

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
      scrollTopbar: false,
      swiperOption: {
        pagination: '.swiper-pagination',
        autoplay: 2222
      },
      markerIcon: {
        url: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fmarker.svg?alt=media&token=fcbfd76e-ee93-41e8-a816-98906e19859b',
        scaledSize: new google.maps.Size(42, 42)
      }
    }
  },
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
    image1H (evento) {
      if (supportsWebP) {
        return evento.imageH1W
      } else {
        return evento.imageH1J
      }
    },
    image2H (evento) {
      if (supportsWebP) {
        return evento.imageH2W
      } else {
        return evento.imageH2J
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
    date () {
      const eventoDate = this.$store.state.evento.date
      let d = eventoDate.slice(0, 2)
      let m = eventoDate.slice(3, 5)
      let y = eventoDate.slice(6, 10)
      let dateStr = m + '/' + d + '/' + y
      let date = new Date(dateStr)
      let longWeekday = date.toLocaleDateString('pt-BR', { weekday: 'long' })
      let shortWeekday = longWeekday.substring(0, longWeekday.lastIndexOf('-'))
      let shortWeekdayUppercase = shortWeekday.charAt(0).toUpperCase() + shortWeekday.slice(1)
      let month = date.toLocaleString('pt-BR', { month: "short" });
      return shortWeekdayUppercase + ', ' + d + ' ' + month
    },
    evento () {
      return this.$store.state.evento
    },
    ifImage2 () {
      if (this.evento.imageH2W === null) {
        return
      } else {
        if (supportsWebP) {
          return this.evento.imageH2W
        } else {
          return this.evento.imageH2J
        }
      }
    },
    showShare () {
      return this.$store.state.showShare
    },
    scrollY () {
      return this.$store.state.scrollY
    }
  },
  watch: {
    scrollY (value) {
      if (value >= 250) {
        return this.showReserva = true, this.scrollTopbar = true
      } else {
        return this.showReserva = false, this.scrollTopbar = false
      }
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

.eventos_id {
  display: flex;
  flex-flow: column;
  background-color: white;
  margin-bottom: 3.1rem;
  transition: all .3s cubic-bezier(.15,.97,.43,.93);



  /* ####### TOPBAR ####### */
  & .topbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    height: 3.1rem;
    width:  100%;
    background: transparent;
    padding: 0 7%;
    transition: all .6s ease;
    & .topbar-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      & .__back-btn {
        transform: translateY(2px);/* A imagem ta errada */
        cursor: pointer;
        width: 1.1rem;
        height: auto;
      }
      & .__share-btn {
        cursor: pointer;
        width: 1.5rem;
        height: auto;
      }
    }
  }/* ####### TOPBAR ####### */




  & .box-title {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 15px;
    padding: 3rem 7% .5rem 7%;
  }

  & .__event-title {
    padding: 0 7%;
    margin: 1rem 0 2rem 0;
    font-size: 32px;
    font-weight: 600;
  }




  /* ####### IMAGE BOX ####### */
  & .image-box {
    overflow: hidden;
    & .swiper-container {
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
      & .swiper-pagination {

        & .swiper-pagination-bullet {

        }
      }
    }
  }/* ####### IMAGE BOX ####### */




  /* ####### DATA E HORÁRIO ####### */
  & .date-hour-box {
    display: flex;
    padding: 0 7%;
    & .__date {
      font-size: 22px;
      font-weight: 300;
      /* color: #ff5858; */
    }
    & .__hour {
      font-size: 22px;
      font-weight: 300;
      /* color: #ff5858; */
    }
  }/* ####### DATA E HORÁRIO ####### */




  /* ####### SOBRE BOX ####### */
  & .sobre-box {
    padding: 0 7%;
    & .__subtitle {
    }
  }/* ####### SOBRE BOX ####### */




  /* ####### VALOR INGRESSO ####### */
  & .ingresso-box {
    display: flex;
    flex-flow: row;
    padding: 0 7%;
    & .gender-box {
      padding: 0 1.4rem 0 0;
      display: flex;
      align-items: center;
      & .__img {
        margin-right: .3rem;
        width: 1.6rem;
        height: auto;
      }
    }
    
  }/* ####### VALOR INGRESSO ####### */




  /* ####### LOCAL ####### */
  & .local-box {
    & .__adress {
      padding: 0 7% .5rem 7%;
    }
  }/* ####### LOCAL ####### */




  /* ####### RESERVA ####### */
  & .reserva {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 8888;
    height: 3.4rem;
    width:  100%;
    background: white;
    padding: 0 7%;
    box-shadow: 0px -1px 1px 0px rgba(0,0,0,0.1);
    transition: all .5s ease;
    & .reserva-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      & .__reserva-valor {
        font-size: 19px;
        font-weight: 400;
      }
      & .__reserva-btn {
        font-size: 16px;
        background: #ff5858;
        color: white;
        padding: .6rem 1.2rem;
        border-radius: 4px;
      }
    }
  }/* ####### RESERVA ####### */
}

.onShare {
  filter: brightness(30%);
}
.topbarBg {
  background: white !important;
  box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.1);
}
.topbarBtn {
  filter: invert(65%);
}


@media (min-width: 1281px) {
  .eventos_id {
    /* padding: 0 13%; */
  }
}
</style>
