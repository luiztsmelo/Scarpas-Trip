<template>
  <div class="anunciar-evento">

    <!-- PLANO EVENTO -->
    <div class="plano-evento" v-show="$store.state.cadastroEvento0">
      
      <img class="__img-header" src="../../../assets/img/anuncio-evento.svg">

      <h1 class="__title">Divulgação: a chave para o sucesso do seu evento!</h1>

      <div class="pricing-box">
        <h2 class="__pricing-box-title">Selecione um plano:</h2>

        <div class="plano-row casual" @click="$store.commit('m_cadastroEvento1', true), $store.commit('m_cadastroEvento0', false), $store.commit('m_planoCasual', true), $store.commit('m_planoPro', false), $store.commit('m_eventoProgressBar', (100/7))">
          <span class="__plano-valor">R$30</span>
          <span class="__plano-title">CASUAL</span>
          <div class="__arrow-down-black"></div>
        </div>

        <div class="plano-row profissional" @click="$store.commit('m_cadastroEvento1', true), $store.commit('m_cadastroEvento0', false), $store.commit('m_planoPro', true), $store.commit('m_planoCasual', false), $store.commit('m_eventoProgressBar', (100/7))">
          <span class="__plano-valor">R$100</span>
          <span class="__plano-title">PROFISSIONAL</span>
          <div class="__arrow-down-white"></div>
        </div>

      </div>
    </div><!-- PLANO EVENTO -->


    <div class="progress-bar" v-show="!$store.state.cadastroEvento0" :style="'width:' + $store.state.eventoProgressBar + '%'"></div>


    

    <!-- ########## DATA E HORÁRIO PG.1 ########## -->
    <form class="cadastro-evento" v-show="$store.state.cadastroEvento1">

      <h1 class="__form-title">Quando será o evento?</h1>

      <div class="item-form">
        <label>Data</label>
        <input type="date" v-model="date" :min="today" required pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}">
      </div>  

      <div class="item-form">
        <label>Horário</label>
        <input type="time" v-model="$store.state.eventoData.hour" required>
      </div>  

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn1">Voltar</button>
          <button type="button" class="__next" :style="form1ok" @click="nextBtn1">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## DATA E HORÁRIO PG.1 ########## -->




    <!-- ########## LOCAL PG.2 ########## -->
    <form class="cadastro-evento" v-show="$store.state.cadastroEvento2">

      <h1 class="__form-title">Qual será o Local?</h1>

      <gmap-autocomplete 
      class="__gmap-autocomplete"
      placeholder="Digite o endereço aqui"
      @place_changed="setPlace">
      </gmap-autocomplete>

      <gmap-map
      v-if="$store.state.cadastroEvento2"
      :center="{lat: $store.state.eventoData.positionLAT, lng: $store.state.eventoData.positionLNG}"
      :zoom="mapZoom"
      :options="{styles: styles, mapTypeControl:false, streetViewControl:false}"
      style="width: 100%; height: 260px">
        <Gmap-Marker
        v-if="$store.state.eventoPlace"
        :clickable="true"
        :draggable="true"
        :animation="4"
        :position="{lat: $store.state.eventoData.positionLAT, lng: $store.state.eventoData.positionLNG}"
        :icon="markerIcon"
        ></Gmap-Marker>
      </gmap-map>

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn2">Voltar</button>
          <button type="button" class="__next" :style="form2ok" @click="nextBtn2">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## LOCAL PG.2 ########## -->




    <!-- ########## VALOR DO INGRESSO PG.3 ########## -->
    <form class="cadastro-evento" v-show="$store.state.cadastroEvento3">

      <h1 class="__form-title">Qual será o Valor do Ingresso?</h1>

      <div class="item-form">
        <label>1º Lote</label>
        <money v-model="$store.state.eventoData.valorIngresso"></money>
      </div>  
    
      <button type="button" @click="" class="__image-input-btn">Mais lotes?</button>

    
      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn3">Voltar</button>
          <button type="button" class="__next" :style="form3ok" @click="nextBtn3">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## VALOR DO INGRESSO PG.3 ########## -->




    <!-- ########## IMAGEM E VÍDEOS PG.4 ########## -->
    <form class="cadastro-evento" v-show="$store.state.cadastroEvento4">

      <h1 class="__form-title">Adicione Imagens e Vídeo</h1>

      <div class="before-choose-image" v-show="imageURL1 === null">
        <h2 class="__form-subtitle">Imagens e vídeo legais farão toda a diferença na hora da divulgação do seu evento</h2>
        <button type="button" @click="$refs.myCroppa1.chooseFile()" class="__image-input-btn">Adicionar Imagem</button>
      </div>
      
      <div class="modal-croppa" v-show="showCroppaModal1" @click="showCroppaModal1=false">
        <div class="modal-croppa-body" @click.stop>
          <h1>Ajustar imagem</h1>
          <croppa
          ref="myCroppa1"
          :width="320"
          :height="214"
          :quality="3"
          :placeholder="'Carregando...'"
          :placeholder-color="'rgb(222,222,222)'"
          :accept="'image/*'"
          :zoom-speed="2"
          :prevent-white-space="true"
          :show-remove-button="false"
          @file-choose="imageChoose1">
          </croppa>
          <div class="modal-croppa-btns">
            <button type="button" @click="showCroppaModal1=false, imageConfirmed1()" class="__image-input-btn">Confirmar</button>
            <button type="button" @click="$refs.myCroppa1.chooseFile(), $refs.myCroppa1.remove(), imageURL1 = null" class="__image-input-btn" style="background:transparent;margin-top:.9rem;">Escolher outra</button>
            <button type="button" @click="removeImage1()" class="__image-input-btn" style="background:transparent;margin-top:.2rem">Remover</button>
          </div>
        </div>
      </div>

      <div class="modal-croppa" v-show="showCroppaModal2" @click="showCroppaModal2=false">
        <div class="modal-croppa-body" @click.stop>
          <h1>Ajustar imagem</h1>
          <croppa
          ref="myCroppa2"
          @new-image-drawn="imageChoose2"
          :width="320"
          :height="214"
          :quality="3"
          :placeholder="'Carregando...'"
          :accept="'image/*'"
          :prevent-white-space="true"
          :show-remove-button="false">
          </croppa>
          <div class="modal-croppa-btns">
            <button type="button" @click="showCroppaModal2=false, imageChoose2()" class="__image-input-btn">Confirmar</button>
            <button type="button" @click="$refs.myCroppa2.chooseFile(), $refs.myCroppa2.remove(), imageURL2 = null" class="__image-input-btn" style="background:transparent;margin-top:.7rem;">Escolher outra</button>
            <button type="button" @click="removeImage2()" class="__image-input-btn" style="background:transparent">Remover</button>
          </div>
        </div>
      </div>

      <!-- Preview Image -->
      <div class="after-choose-image" v-show="imageURL1 !== null">
        <img :src="imageURL1" class="__preview-img" @click="showCroppaModal1=true">
        <div class="image2">
          <img src="./../../../assets/img/add-image.svg" class="__preview-img" v-if="imageURL2 === null" @click="$refs.myCroppa2.chooseFile(), showCroppaModal2=true" style="padding:2rem">
          <img :src="imageURL2" class="__preview-img" @click="showCroppaModal2=true" v-else>
        </div>
        
      </div><!-- Preview Image -->
      

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn4">Voltar</button>
          <button type="button" class="__next" :style="form4ok" @click="nextBtn4">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## IMAGEM E VÍDEOS PG.4 ########## -->




    <!-- ########## TÍTULO PG.5 ########## -->
    <form class="cadastro-evento" v-show="$store.state.cadastroEvento5">

      <h1 class="__form-title">Dê um Título legal</h1>  
      
      <textarea 
      v-model="$store.state.eventoData.title"
      v-autosize="title"
      maxlength="50"
      placeholder="ex: Show Jorge e Mateus em Escarpas do Lago"
      required>
      {{title}}</textarea>

      <span class="__lenght-calc">{{ titleLength }}</span>

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn5">Voltar</button>
          <button type="button" class="__next" :style="form5ok" @click="nextBtn5">Próximo</button>
        </div>
      </div> 

    </form><!-- ########## TÍTULO PG.5 ########## -->




    <!-- ########## DESCRIÇÃO PG.6 ########## -->
    <form class="cadastro-evento" v-show="$store.state.cadastroEvento6">

      <h1 class="__form-title">Descreva seu evento</h1>   

      <textarea 
      v-model="$store.state.eventoData.subtitle"
      v-autosize="subtitle"
      maxlength="500"
      placeholder="Coloque informações importantes sobre seu evento aqui"
      required>
      {{subtitle}}</textarea>

      <span class="__lenght-calc">{{ subtitleLength }}</span> 

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn6">Voltar</button>
          <button type="button" class="__next" :style="form6ok" @click="nextBtn6">Próximo</button>
        </div>
      </div> 

    </form><!-- ########## DESCRIÇÃO PG.6 ########## -->




    <!-- ########## INVESTIMENTO PG.7 ########## -->
    <form class="cadastro-evento" v-show="$store.state.cadastroEvento7">

      <h1 class="__form-title">Investimento</h1>

      <div class="back-next">
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn7">Voltar</button>
          <button type="button" class="__next" :style="form7ok" @click="finalizar">Finalizar</button>
        </div>
      </div>
    
    </form><!-- ########## INVESTIMENTO PG.7 ########## -->
  



  </div>
</template>

<script>
import * as firebase from 'firebase'
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
      title: '',/* Vue Autosize */
      subtitle: '',/* Vue Autosize */
      markerIcon: {
        url: 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fmarker.svg?alt=media&token=fcbfd76e-ee93-41e8-a816-98906e19859b',
        scaledSize: new google.maps.Size(42, 42)
      },
      showCroppaModal1: false,
      showCroppaModal2: false,
      date: null,
      imageURL1: null,
      imageURL2: null
    }
  },
  watch: {
    date (value) {
      if (value !== null) {
        const y = value.slice(0, 4)
        const m = value.slice(5, 7)
        const d = value.slice(8, 10)
        this.$store.state.eventoData.date = d + '/' + m + '/' + y
      }
    }
  },
  methods: {
    /* ******************** IMAGE INPUT ******************** */
    imageChoose1 () {
      this.showCroppaModal1 = true
    },
    imageConfirmed1 () {
      if (this.imageURL1 !== null) {
        return 
      } else {
        this.$refs.myCroppa1.generateBlob((blob) => {
          let url1 = URL.createObjectURL(blob)
          this.imageURL1 = url1
        })
      }
    },
    removeImage1 () {
      this.imageURL1 = null
      this.$refs.myCroppa1.remove()
      this.showCroppaModal1 = false
    },
    async imageChoose2 () {
      if (this.imageURL2 !== null) {
        return
      } else {
        const blob = await this.$refs.myCroppa2.promisedBlob()
        let url2 = URL.createObjectURL(blob)
        this.$store.state.eventoData.imageURL2 = url2
      }
    },
    removeImage2 () {
      this.imageURL2 = null
      this.$refs.myCroppa2.remove()
      this.showCroppaModal2 = false
    },
    /* ******************** GOOGLE MAPS ******************** */
    setPlace (place) {
      this.$store.commit('m_eventoPlace', place)
      this.$store.state.eventoData.positionLAT = this.$store.state.eventoPlace.geometry.location.lat()
      this.$store.state.eventoData.positionLNG = this.$store.state.eventoPlace.geometry.location.lng()
      this.$store.state.eventoData.address = this.$store.state.eventoPlace.name
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
    backBtn7 () {
      return this.$store.commit('m_cadastroEvento7', false), this.$store.commit('m_cadastroEvento6', true)
    },
    /* ******************** NEXT BUTTONS ******************** */
    nextBtn1 () {
      if (this.$store.state.eventoData.date.length > 0 && this.$store.state.eventoData.hour.length > 0) {
        return this.$store.commit('m_cadastroEvento1', false), this.$store.commit('m_cadastroEvento2', true), this.$store.commit('m_eventoProgressBar', (100/7)*2)
      } else if (this.$store.state.eventoData.date.length > 0 && this.$store.state.eventoData.hour.length === 0) {
        alert('Adicione o horário')
      } else if (this.$store.state.eventoData.date.length === 0 && this.$store.state.eventoData.hour.length > 0) {
        alert('Adicione a data')
      } else {
        alert('Adicione uma data e horário')
      }
    },  
    nextBtn2 () {
      if (this.$store.state.eventoPlace !== null) {
        return this.$store.commit('m_cadastroEvento2', false), this.$store.commit('m_cadastroEvento3', true), this.$store.commit('m_eventoProgressBar', (100/7)*3)
      } else {
        alert('Adicione um endereço')
      }
    },
    nextBtn3 () {
      if (this.$store.state.eventoData.valorIngresso >= 0) {
        return this.$store.commit('m_cadastroEvento3', false), this.$store.commit('m_cadastroEvento4', true), this.$store.commit('m_eventoProgressBar', (100/7)*4)
      }
    },  
    nextBtn4 () {
      if (this.imageURL1 !== null) {
        return this.$store.commit('m_cadastroEvento4', false), this.$store.commit('m_cadastroEvento5', true), this.$store.commit('m_eventoProgressBar', (100/7)*5)
      } else {
        alert('Adicione pelo menos uma imagem')
      }
    },
    nextBtn5 () {
      if (this.$store.state.eventoData.title.length > 0) {
        return this.$store.commit('m_cadastroEvento5', false), this.$store.commit('m_cadastroEvento6', true), this.$store.commit('m_eventoProgressBar', (100/7)*6)
      }
    },
    nextBtn6 () {
      if (this.$store.state.eventoData.subtitle.length > 0) {
        return this.$store.commit('m_cadastroEvento6', false), this.$store.commit('m_cadastroEvento7', true), this.$store.commit('m_eventoProgressBar', (100/7)*7)
      }
    },
    finalizar () {
      if (1<2) {
        this.$store.commit('m_loader', true)
        const eventoID = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000)
        this.$store.commit('m_eventoID', eventoID)
        const storageRef = firebase.storage().ref('eventos/' + eventoID + '/')
        /* 
        Upload image 1 LQ JPEG
        */
        this.$refs.myCroppa1.generateBlob(blob => {
          storageRef.child('imageL1.jpeg').put(blob)
          .then(snapshot => {
            console.log(eventoID + 'L1' + '.jpeg')
            storageRef.child('imageL1.jpeg').getDownloadURL().then(url => {
              this.$store.commit('m_imageL1', url)
            })
          })
        }, 'image/jpeg', 0.01)
        /* 
        Upload image 1 HQ WEBP 
        */
        this.$refs.myCroppa1.generateBlob(blob => {
          storageRef.child('imageH1W.webp').put(blob)
          .then(snapshot => {
            console.log(eventoID + 'H1W' + '.webp')
            storageRef.child('imageH1W.webp').getDownloadURL().then(url => {
              this.$store.commit('m_imageH1W', url)
            })
          })
        }, 'image/webp')
        /* 
        Upload image 1 HQ JPEG 
        */
        this.$refs.myCroppa1.generateBlob(blob => {
          storageRef.child('imageH1J.jpeg').put(blob)
          .then(snapshot => {
            console.log(eventoID + 'H1J' + '.jpeg')
            storageRef.child('imageH1J.jpeg').getDownloadURL().then(url => {
              this.$store.commit('m_imageH1J', url)
              this.$store.commit('m_eventos', null) /* Para não bugar as imagens */
            })
            .then(() => {
              this.$store.dispatch('a_uploadEvento')
              this.$router.push('/')
            })
          })
        }, 'image/jpeg')
      }
    }
  },
  computed: {
    titleLength () {
      return 50 - this.$store.state.eventoData.title.length
    },
    subtitleLength () {
      return 500 - this.$store.state.eventoData.subtitle.length
    },
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
    mapZoom () {
      if (this.$store.state.eventoPlace !== null) {
        return 15
      } else {
        return 11
      }
    },
    form1ok () {
      if (this.$store.state.eventoData.date.length > 0 && this.$store.state.eventoData.hour.length > 0) {
        return 'background:rgb(255, 88, 88);cursor:pointer'
      }
    },
    form2ok () {
      if (this.$store.state.eventoPlace !== null) {
        return 'background:rgb(255, 88, 88);cursor:pointer'
      }
    },
    form3ok () {
      if (this.$store.state.eventoData.valorIngresso >= 0) {
        return 'background:rgb(255, 88, 88);cursor:pointer'
      }
    },
    form4ok () {
      if (this.imageURL1 !== null) {
        return 'background:rgb(255, 88, 88);cursor:pointer'
      }
    },
    form5ok () {
      if (this.$store.state.eventoData.title.length > 0) {
        return 'background:rgb(255, 88, 88);cursor:pointer'
      }
    },
    form6ok () {
      if (this.$store.state.eventoData.subtitle.length > 0) {
        return 'background:rgb(255, 88, 88);cursor:pointer'
      }
    },
    form7ok () {
      if (1<2) {
        return 'background:rgb(255, 88, 88);cursor:pointer'
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.$store.state.showFoobar === false) {
      this.$store.commit('m_showFoobar', true)
      next()
    } else {
      next(false)
    }
  }
}
</script>

<style scope>
@import url('../../../assets/css/main.css');
@import url('../../../assets/css/illustrations.css');

.anunciar-evento {
  margin-top: 3.3rem;
  display: flex;
  flex-flow: column;
  background: linear-gradient(40deg,#f857a6, #ff5858);
  color: white;
  transition: var(--main-transition);
  & .progress-bar {
    position: fixed;
    top: 3.3rem;
    height: 3px;
    background: linear-gradient(80deg, #f857a6, #ff5858);
    transition: all .3s ease;
  }
  /* ******************** PLANO EVENTO ******************** */
  & .plano-evento {
    display: flex;
    flex-flow: column;
    align-items: center;
    height: calc(100vh);
    & .__img-header {
      margin: 2rem 0;
      width: 6rem;
      height: auto;
    }
    & .__title {
      font-size: 27px;
      font-weight: 500;
      padding: 0 7%;
    }
    & .pricing-box {
      display: flex;
      flex-flow: column;
      align-self: stretch;
      padding: 3rem 7% 3rem 7%;
      & .__pricing-box-title {
        font-size: 20px;
        font-weight: 400;
        padding-bottom: .5rem;
      }
      & .plano-row {
        position: relative;
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
        background: rgb(13, 13, 13);
      }
    }
  }
  /* ******************** CADASTRO EVENTO ******************** */
  & .cadastro-evento {
    background: white;
    color: var(--color01);
    height: calc(100vh - 3.3rem);
    padding: 0 7% 3rem 7%;
    & .__form-title {
      line-height: 35px;
      font-size: 29px;
      font-weight: 600;
      padding: 3rem 0 1.5rem 0;
      z-index: 999;
    }
    & .__form-subtitle {
      font-size: 19px;
      font-weight: 300;
      padding: 1.5rem 0 1.5rem 0;
      line-height: 27px;
    }
    & textarea {
      margin-bottom: .5rem;
      width: 100%;
      font-size: 19px;
      font-weight: 300;
      line-height: 26px;
      background: white;
      color: rgb(92, 92, 92);
      border: none;
      outline: none;
      resize: none;
    }
    & .__lenght-calc {
      z-index: 999;
      font-size: 20px;
      font-weight: 600;
      color: rgb(112, 112, 112);
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
        border-bottom: 1px solid rgb(222, 222, 222);
        outline: none;
      }
    }
    & .modal-croppa {
      background: rgba(0, 0, 0, 0.84);
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
        & .modal-croppa-btns {
          display: flex;
          flex-flow: column;
          width: 100%
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
      border-bottom: 1px solid rgb(222, 222, 222);
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
      border-bottom: 1px solid rgb(222, 222, 222);
      outline: none;
    }
    & .__image-input-btn {
      font-size: 15px;
      font-weight: 500;
      background: #ff5858;
      color: white;
      padding: .7rem 1.2rem;
      border-radius: 4px;
    }
    & .after-choose-image {
      margin-top: 1.5rem;
      display: flex;
      flex-flow: row wrap;
      & .__preview-img {
        margin: .2rem;
        width: 145px;
        height: 97px;
        border-radius: 4px;
      }
    }
    & canvas {
      margin: 3rem 0 2rem 0;
      border: 2px dashed white;
    }
  }
}

</style>
