<template>
  <div class="anunciar-evento">

    <!-- PLANO EVENTO -->
    <div class="plano-evento" v-show="cadastroEvento0">
      
      <h1 class="__title">Divulgação: a chave para o sucesso do seu evento!</h1>

      <div class="pricing-box">
        <h2 class="__pricing-box-title">Selecione um plano:</h2>

        <div class="plano-row casual" @click="$store.commit('m_cadastroEvento1', true), $store.commit('m_cadastroEvento0', false), $store.commit('m_eventoPlanoCasual', true), $store.commit('m_eventoPlanoPro', false), progressBar = (100/7)">
          <span class="__plano-valor">R$30</span>
          <span class="__plano-title">CASUAL</span>
        </div>

        <div class="plano-row profissional" @click="$store.commit('m_cadastroEvento1', true), $store.commit('m_cadastroEvento0', false), $store.commit('m_eventoPlanoPro', true), $store.commit('m_eventoPlanoCasual', false), progressBar = (100/7)">
          <span class="__plano-valor">R$100</span>
          <span class="__plano-title">PROFISSIONAL</span>
        </div>

      </div>
    </div><!-- PLANO CONTAINER -->


    <div class="progress-bar" v-show="!cadastroEvento0" :style="'width:' + progressBar + '%'"></div>


    <!-- ********** CADASTRO EVENTO Pg.1 ********** -->
    <form class="cadastro-evento" v-show="cadastroEvento1">

      <h1 class="__form-title">Informações básicas</h1>

      <div class="item-form">
        <label>Plano</label>
        <span class="__plano-selecionado" v-show="eventoPlanoCasual">Casual</span>
        <span class="__plano-selecionado" v-show="eventoPlanoPro">Profissional</span>
      </div>  

      <div class="item-form">
        <label>Nome do evento</label>
        <input type="text" v-model="event.title" required>
      </div>  

      <div class="item-form">
        <label>Descrição básica</label>
        <input type="text" v-model="event.subtitle" required>
      </div>   

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn1">Voltar</button>
          <button type="button" class="__next" :style="form1ok" @click="nextBtn1">Próximo</button>
        </div>
      </div> 

    </form> <!-- ********** CADASTRO EVENTO Pg.1 ********** -->
  



    <!-- ********** CADASTRO EVENTO Pg.2 ********** -->
    <form class="cadastro-evento" v-show="cadastroEvento2">

      <h1 class="__form-title">Data e Horário</h1>

      <div class="item-form">
        <label>Dia do evento</label>
        <input type="date" v-model="event.date" :min="today" required>
      </div>  

      <div class="item-form">
        <label>Horário</label>
        <input type="time" v-model="event.hour" required>
      </div>  

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn2">Voltar</button>
          <button type="button" class="__next" :style="form2ok" @click="nextBtn2">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ********** CADASTRO EVENTO Pg.2 ********** -->




    <!-- ********** CADASTRO EVENTO Pg.3 ********** -->
    <form class="cadastro-evento" v-show="cadastroEvento3">

      <h1 class="__form-title">Local</h1>

      <gmap-autocomplete class="__gmap-autocomplete"
      type="search"
      placeholder="Digite o endereço aqui"
      @place_changed="setPlace">
      </gmap-autocomplete>

      <gmap-map
      :center="event.position"
      :zoom="mapZoom"
      :options="{styles: styles}"
      style="width: 100%; height: 260px">
        <Gmap-Marker
        v-if="this.place"
        :clickable="true"
        :draggable="true"
        animation="4"
        :position="this.place.geometry.location"
        ></Gmap-Marker>
      </gmap-map>

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn3">Voltar</button>
          <button type="button" class="__next" :style="form3ok" @click="nextBtn3">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ********** CADASTRO EVENTO Pg.3 ********** -->




    <!-- ********** CADASTRO EVENTO Pg.4 ********** -->
    <form class="cadastro-evento" v-show="cadastroEvento4">

      <h1 class="__form-title">Valor do Ingresso</h1>

      <div class="item-form">
        <label>1º Lote</label>
        <vue-numeric class="__vue-numeric" currency="R$" separator="space" :precision="2" v-model="event.valorIngresso" :minus="false"></vue-numeric>
      </div>  
    
      <button type="button" @click="" class="__image-input-btn">Mais lotes?</button>

    
      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn4">Voltar</button>
          <button type="button" class="__next" :style="form4ok" @click="nextBtn4">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ********** CADASTRO EVENTO Pg.4 ********** -->




    <!-- ********** CADASTRO EVENTO Pg.5 ********** -->
    <form class="cadastro-evento" v-show="cadastroEvento5">

      <h1 class="__form-title">Imagens e Vídeo</h1>

      <h2 class="__form-subtitle">Imagens e vídeo legais farão toda a diferença na hora da divulgação do seu evento</h2>


      <button type="button" @click="$refs.myCroppa1.chooseFile(), showCroppaModal=true" class="__image-input-btn">Adicionar Imagem</button>
      
      <div class="modal-croppa" v-show="showCroppaModal" @click="showCroppaModal=false">
        <div class="modal-croppa-body" @click.stop>
          <h1>Ajustar imagem</h1>

          <croppa
          ref="myCroppa1"
          @new-image-drawn="imageChoose1"
          @image-remove="imageRemove1"
          :width="320"
          :height="214"
          :quality="3"
          :placeholder="'Carregando...'"
          :accept="'image/*'"
          :prevent-white-space="true"
          :show-remove-button="false">
          </croppa>

          <div class="modal-croppa-btns" style="display:flex;width:100%;justify-content:space-around">
            <button type="button" @click="$refs.myCroppa1.chooseFile()" class="__image-input-btn" style="background:transparent;border:1px solid rgb(222,222,222)">Escolher outra</button>
            <button type="button" @click="showCroppaModal=false" class="__image-input-btn">Confirmar</button>
          </div>
          

        </div>
      </div>

      
      
      <img :src="event.imageURL1" class="__preview-img">

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn5">Voltar</button>
          <button type="button" class="__next" :style="form5ok" @click="nextBtn5">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ********** CADASTRO EVENTO Pg.5 ********** -->




    <!-- ********** CADASTRO EVENTO Pg.6 ********** -->
    <form class="cadastro-evento" v-show="cadastroEvento6">

      <h1 class="__form-title">Investimento</h1>

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn6">Voltar</button>
          <button type="button" class="__next" :style="form6ok" @click="nextBtn6">Próximo</button>
        </div>
      </div>
    
    </form><!-- ********** CADASTRO EVENTO Pg.6 ********** -->
  



  </div>
</template>

<script>
import { mapstyle } from '../../../mixins/mapstyle'

export default {
  mixins: [mapstyle],
  head () {
    return {
      title: 'Anunciar Evento em Escarpas do Lago ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
  data () {
    return {
      showCroppaModal: false,
      progressBar: 0,
      place: null,
      event: {  
        position: {lat:-20.6141320, lng:-46.0478760},
        title: '',
        subtitle: '',
        date: '',
        hour: '',
        valorIngresso: 0,
        imageURL1: null,
        image: ''
      }
    }
  },
  methods: {
    /* ******************** IMAGE INPUT ******************** */
    imageChoose1 () {
      let URL1 = this.$refs.myCroppa1.generateDataUrl()
      this.event.imageURL1 = URL1
    },
    imageRemove1 () {
      this.event.imageURL1 = null
    },
    /* ******************** GOOGLE MAPS ******************** */
    setPlace (place) {
      this.place = place
      this.event.position = this.place.geometry.location
    },
    /* ******************** BACK BUTTONS ******************** */
    backBtn1 () {
      return this.$store.commit('m_cadastroEvento1', false), this.$store.commit('m_cadastroEvento0', true)
    },
    backBtn2 () {
      return this.$store.commit('m_cadastroEvento2', false), this.$store.commit('m_cadastroEvento1', true)
    },
    backBtn3 () {
      return this.$store.commit('m_cadastroEvento3', false), this.$store.commit('m_cadastroEvento2', true)
    },
    backBtn4 () {
      return this.$store.commit('m_cadastroEvento4', false), this.$store.commit('m_cadastroEvento3', true)
    },
    backBtn5 () {
      return this.$store.commit('m_cadastroEvento5', false), this.$store.commit('m_cadastroEvento4', true)
    },
    backBtn6 () {
      return this.$store.commit('m_cadastroEvento6', false), this.$store.commit('m_cadastroEvento5', true)
    },
    /* ******************** NEXT BUTTONS ******************** */
    nextBtn1 () {
      if (this.event.title.length > 0 && this.event.subtitle.length > 0) {
        return this.$store.commit('m_cadastroEvento1', false), this.$store.commit('m_cadastroEvento2', true), this.progressBar = (100/7)*2
      }
    },  
    nextBtn2 () {
      if (this.event.date.length > 0 && this.event.hour.length > 0) {
        return this.$store.commit('m_cadastroEvento2', false), this.$store.commit('m_cadastroEvento3', true), this.progressBar = (100/7)*3
      }
    },
    nextBtn3 () {
      if (this.place != null) {
        return this.$store.commit('m_cadastroEvento3', false), this.$store.commit('m_cadastroEvento4', true), this.progressBar = (100/7)*4
      }
    },  
    nextBtn4 () {
      if (this.event.valorIngresso >= 0) {
        return this.$store.commit('m_cadastroEvento4', false), this.$store.commit('m_cadastroEvento5', true), this.progressBar = (100/7)*5
      }
    },
    nextBtn5 () {
      if (this.event.imageURL1 !== null) {
        return this.$store.commit('m_cadastroEvento5', false), this.$store.commit('m_cadastroEvento6', true), this.progressBar = (100/7)*6
      } else {
        alert('Adicione pelo menos uma imagem')
      }
    }  
  },
  computed: {
    today () {
      let dd = new Date().getDate()
      let mm = new Date().getMonth() + 1
      let yyyy = new Date().getFullYear()
      if (dd < 10) {
        dd = '0' + dd
      } 
      if (mm < 10) {
        mm = '0' + mm
      } 
      return yyyy + '-' + mm + '-' + dd
    },
    eventPosition() {
      if (this.place !== null) {
        return this.eventPosition = {lat: this.place.geometry.location.lat, lng: this.place.geometry.location.lng}
      }
    },
    mapZoom () {
      if (this.place != null) {
        return 15
      } else {
        return 11
      }
    },
    form1ok () {
      if (this.event.title.length > 0 && this.event.subtitle.length > 0) {
        return 'background:rgb(255, 88, 88);cursor:pointer'
      }
    },
    form2ok () {
      if (this.event.date.length > 0 && this.event.hour.length > 0) {
        return 'background:rgb(255, 88, 88);cursor:pointer'
      }
    },
    form3ok () {
      if (this.place !== null) {
        return 'background:rgb(255, 88, 88);cursor:pointer'
      }
    },
    form4ok () {
      if (this.event.valorIngresso >= 0) {
        return 'background:rgb(255, 88, 88);cursor:pointer'
      }
    },
    form5ok () {
      if (this.event.imageURL1 !== null) {
        return 'background:rgb(255, 88, 88);cursor:pointer'
      }
    },
    form6ok () {
      if (1<2) {
        return 'background:rgb(255, 88, 88);cursor:pointer'
      }
    },
    eventoPlanoCasual () {
      return this.$store.state.eventoPlanoCasual
    },
    eventoPlanoPro () {
      return this.$store.state.eventoPlanoPro
    },
    cadastroEvento0 () {
      return this.$store.state.cadastroEvento0
    },
    cadastroEvento1 () {
      return this.$store.state.cadastroEvento1
    },
    cadastroEvento2 () {
      return this.$store.state.cadastroEvento2
    },
    cadastroEvento3 () {
      return this.$store.state.cadastroEvento3
    },
    cadastroEvento4 () {
      return this.$store.state.cadastroEvento4
    },
    cadastroEvento5 () {
      return this.$store.state.cadastroEvento5
    },
    cadastroEvento6 () {
      return this.$store.state.cadastroEvento6
    }
  }
}
</script>

<style scope>
@import url('../../../assets/css/main.css');

.anunciar-evento {
  margin-top: 3.3rem;
  display: flex;
  flex-flow: column;
  background: linear-gradient(40deg,#f857a6, #ff5858);
  color: white;
  transition: all .222s ease;
  height: calc(100vh - 3.3rem);
  & .progress-bar {
    position: fixed;
    top: 3.3rem;
    height: 3px;
    background: linear-gradient(80deg, #f857a6, #ff5858);
    transition: all .3s ease;
  }
  /* ******************** PLANO EVENTO ******************** */
  & .plano-evento {
    & .__title {
      font-size: 29px;
      font-weight: 600;
      padding: 3rem 7% 0 7%;
    }
    & .pricing-box {
      display: flex;
      flex-flow: column;
      padding: 3rem 7% 0 7%;
      & .__pricing-box-title {
        font-size: 20px;
        font-weight: 400;
        padding-bottom: .5rem;
      }
      & .plano-row {
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 3.3rem;
        margin: .5rem 0;
        border-radius: 3px;
        & .__plano-valor {
          font-size: 23px;
          font-weight: 300;
          padding: 0 .7rem;
        }
        & .__plano-title {
          font-size: 14px;
          font-weight: 500;
        }
      }
      & .casual {
        background: white;
        color: var(--color01);
      }
      & .profissional {
        background: black;
      }
    }
  }
  /* ******************** CADASTRO EVENTO ******************** */
  & .cadastro-evento {
    background: white;
    color: var(--color01);
    height: calc(100vh - 3.3rem);
    padding: 0 7%;
    & .__title {
      font-size: 30px;
      font-weight: 600;
      padding-top: 3rem;
    }
    & .__plano-selecionado {
      font-size: 19px;
      font-weight: 300;
      padding: .4rem 0 .6rem 0;
      color: rgb(92, 92, 92);
      border-bottom: 1px solid rgb(210, 210, 210);
    }
    & .__form-title {
      font-size: 29px;
      font-weight: 600;
      padding: 3rem 0 1.5rem 0;
    }
    & .__form-subtitle {
      font-size: 18px;
      font-weight: 400;
      padding: 1.5rem 0 1.5rem 0;
      line-height: 25px;
    }
    & .item-form {
      display: flex;
      flex-flow: column;
      margin: 1.7rem 0;
      & label {
        font-size: 18px;
        font-weight: 500;
      }
      & input {
        width: 100%;
        font-size: 20px;
        font-weight: 300;
        background: white;
        color: rgb(92, 92, 92);
        padding: .5rem 0 .6rem 0;
        border: none;
        border-bottom: 1px solid rgb(210, 210, 210);
        outline: none;
      }
    }
    & .modal-croppa {
      background: rgba(0, 0, 0, 0.92);
      width:  100%;
      height: 100%;
      position: fixed;
      top:  0;
      left: 0;
      z-index: 10;
      & .modal-croppa-body {
        display: flex;
        flex-flow: column;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        color: white;
        & h1 {
          font-weight: 300;
        }
      }
    }
    & .back-next {
      position: fixed;
      z-index: 4;
      bottom: 0;
      left: 0;
      height: 3rem;
      width: 100%;
      background: white;
      box-shadow: 0px -1px 1px 0px rgba(0,0,0,0.15);
      & .back-next-body {
        display: flex;
        & button {
          width: 50%;
          height: 3rem;
        }
        & .__back {
          cursor: pointer;
          background: white;
        }
        & .__next {
          cursor: no-drop;
          background:rgb(255, 167, 167);
          color: white;
        }
      }
    }
    & .__gmap-autocomplete {
      font-size: 20px;
      font-weight: 300;
      color: rgb(92, 92, 92);
      width: 100%;
      border: none;
      border-bottom: 1px solid rgb(210, 210, 210);
      margin: 1.5rem 0 1rem 0;
      padding: .5rem 0 .6rem 0;
      outline: none;
    }
    & .__vue-numeric {
      font-size: 20px;
      font-weight: 300;
      color: rgb(92, 92, 92);
      width: 100%;
      padding: .5rem 0 .6rem 0;
      border: none;
      border-bottom: 1px solid rgb(210, 210, 210);
      outline: none;
    }
    & .lote-box {
      display: flex;
      margin-top: 1rem;
    }
    & .__image-input-btn {
      font-size: 15px;
      font-weight: 500;
      background: #ff5858;
      color: white;
      padding: .6rem 1.1rem;
      border-radius: 4px;
    }
    & .__preview-img {
      width: 100%;
      height: auto;
    }
    & canvas {
      margin: 2rem 0;
      border: 2px dashed white;
    }
  }
}

/* TRANSITIONS */

.cadastro-evento-animation-enter-active, .cadastro-evento-animation-leave-active {
  transition: all .3s ease;
}
.cadastro-evento-animation-enter {
  opacity: 0;
  transform: translateY(100%);
}
.cadastro-evento-animation-leave-to {
  opacity: 1;
  transform: translateY(-100%);
}
</style>
