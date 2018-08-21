<template>
  <div class="anunciar-evento">

    <!-- PLANO EVENTO -->
    <div class="plano-evento" v-show="$store.state.cadastroEvento0">
      
      <img class="__img-header" src="../../../assets/img/eventos.svg">

      <h1 class="__title">Divulgação: a chave para o sucesso do seu evento!</h1>

      <span class="__subtitle">Como funciona?</span>
      <h3 class="__item">A Escarpas Trip </h3>


      <span class="__subtitle">Quais as vantagens?</span>
      <h3 class="__item">Destaque nas redes sociais</h3>
      <h3 class="__item">Transparência</h3>
      <h3 class="__item">Segurança</h3>
      
      <span class="__subtitle">Investimento</span>
      <span class="__price">R$49</span>

      <button class="__anunciar-btn" @click="$store.commit('m_cadastroEvento1', true), $store.commit('m_cadastroEvento0', false), $store.commit('m_eventoProgressBar', (100/7))">Anunciar</button>


    </div><!-- PLANO EVENTO -->



    <div class="progress-bar" v-show="!$store.state.cadastroEvento0" :style="'width:' + $store.state.eventoProgressBar + '%'"></div>


    
    <!-- CADASTRO EVENTO -->




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
      style="width: 100%; height: 230px;margin-bottom:2rem">
        <Gmap-Marker
        v-if="$store.state.eventoPlace"
        :clickable="true"
        :draggable="true"
        :animation="4"
        :position="{lat: $store.state.eventoData.positionLAT, lng: $store.state.eventoData.positionLNG}"
        :icon="{url: markerUrl, scaledSize: markerSize}"
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
    
      <button class="__input-btn" type="button" @click="">Mais lotes?</button>

    
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
        <button class="__input-btn" type="button" @click="$refs.myCroppa1.chooseFile()">Adicionar Imagem</button>
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
            <button class="__croppa-btn" type="button" @click="showCroppaModal1=false, imageConfirmed1()">Confirmar</button>
            <button class="__croppa-btn" type="button" @click="$refs.myCroppa1.chooseFile(), $refs.myCroppa1.remove(), imageURL1 = null"  style="background:transparent">Escolher outra</button>
            <button class="__croppa-btn" type="button" @click="removeImage1()" style="background:transparent">Remover</button>
          </div>
        </div>
      </div>

      <div class="modal-croppa" v-show="showCroppaModal2" @click="showCroppaModal2=false">
        <div class="modal-croppa-body" @click.stop>
          <h1>Ajustar imagem</h1>
          <croppa
          ref="myCroppa2"
          :width="320"
          :height="214"
          :quality="3"
          :placeholder="'Carregando...'"
          :placeholder-color="'rgb(222,222,222)'"
          :accept="'image/*'"
          :prevent-white-space="true"
          :show-remove-button="false"
          @file-choose="imageChoose2">
          </croppa>
          <div class="modal-croppa-btns">
            <button class="__croppa-btn" type="button" @click="showCroppaModal2=false, imageConfirmed2()">Confirmar</button>
            <button class="__croppa-btn" type="button" @click="$refs.myCroppa2.chooseFile(), $refs.myCroppa2.remove(), imageURL2 = null"  style="background:transparent">Escolher outra</button>
            <button class="__croppa-btn" type="button" @click="removeImage2()" style="background:transparent">Remover</button>
          </div>
        </div>
      </div>

      <!-- Preview Image -->
      <div class="after-choose-image" v-show="imageURL1 !== null">
        <img :src="imageURL1" class="__preview-img" @click="showCroppaModal1=true">
        <div class="image2">
          <img src="./../../../assets/img/add-image.svg" class="__preview-img" v-if="imageURL2 === null" @click="$refs.myCroppa2.chooseFile()" style="padding:2rem">
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

      <h1 class="__form-title">Dê um título para seu evento</h1>  
      
      <textarea 
      v-model.lazy="$store.state.eventoData.title"
      v-autosize="title"
      maxlength="50"
      rows="1"
      placeholder="Ex: Show Jorge e Mateus em Capitólio"
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
      v-model.lazy="$store.state.eventoData.subtitle"
      v-autosize="subtitle"
      maxlength="400"
      rows="1"
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
          <button type="button" class="__next" :style="form7ok" @click="concluir">Anunciar</button>
        </div>
      </div>
    
    </form><!-- ########## INVESTIMENTO PG.7 ########## -->
  


  </div>
</template>

<script>
import { loaded } from '~/node_modules/vue2-google-maps/src/manager'
import * as firebase from 'firebase'
import { mapstyle } from '../../../mixins/mapstyle'

export default {
  mixins: [mapstyle],
  head () {
    return {
      title: 'Anunciar Evento em Capitólio ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
  data () {
    return {
      title: '',/* Vue Autosize */
      subtitle: '',/* Vue Autosize */
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
    /* --- Image 1 --- */
    imageChoose1 () {
      this.showCroppaModal1 = true
    },
    async imageConfirmed1 () {
      if (this.imageURL1 !== null) {
        return 
      } else {
        const blobEvL1 = await this.$refs.myCroppa1.promisedBlob('image/jpeg', 0.01)
        const blobEvH1J = await this.$refs.myCroppa1.promisedBlob('image/jpeg')
        const blobEvH1W = await this.$refs.myCroppa1.promisedBlob('image/webp')
        let url1 = URL.createObjectURL(blobEvH1J)
        this.imageURL1 = url1
        this.$store.state.blobEvL1 = blobEvL1
        this.$store.state.blobEvH1J = blobEvH1J
        this.$store.state.blobEvH1W = blobEvH1W
      }
    },
    removeImage1 () {
      this.imageURL1 = null
      this.$refs.myCroppa1.remove()
      this.showCroppaModal1 = false
    },
    /* --- Image 2 --- */
    imageChoose2 () {
      this.showCroppaModal2 = true
    },
    async imageConfirmed2 () {
      if (this.imageURL2 !== null) {
        return 
      } else {
        const blobEvL2 = await this.$refs.myCroppa2.promisedBlob('image/jpeg', 0.01)
        const blobEvH2J = await this.$refs.myCroppa2.promisedBlob('image/jpeg')
        const blobEvH2W = await this.$refs.myCroppa2.promisedBlob('image/webp')
        let url2 = URL.createObjectURL(blobEvH2J)
        this.imageURL2 = url2
        this.$store.state.blobEvL2 = blobEvL2
        this.$store.state.blobEvH2J = blobEvH2J
        this.$store.state.blobEvH2W = blobEvH2W
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
      this.$store.commit('m_cadastroEvento1', false), this.$store.commit('m_cadastroEvento0', true)
    },
    backBtn2 () {
      this.$store.commit('m_cadastroEvento2', false), this.$store.commit('m_cadastroEvento1', true)
    },
    backBtn3 () {
      this.$store.commit('m_cadastroEvento3', false), this.$store.commit('m_cadastroEvento2', true)
    },
    backBtn4 () {
      this.$store.commit('m_cadastroEvento4', false), this.$store.commit('m_cadastroEvento3', true)
    },
    backBtn5 () {
      this.$store.commit('m_cadastroEvento5', false), this.$store.commit('m_cadastroEvento4', true)
    },
    backBtn6 () {
      this.$store.commit('m_cadastroEvento6', false), this.$store.commit('m_cadastroEvento5', true)
    },
    backBtn7 () {
      this.$store.commit('m_cadastroEvento7', false), this.$store.commit('m_cadastroEvento6', true)
    },
    /* ******************** NEXT BUTTONS ******************** */
    nextBtn1 () {
      if (this.$store.state.eventoData.date.length > 0 && this.$store.state.eventoData.hour.length > 0) {
        this.$store.commit('m_cadastroEvento1', false), this.$store.commit('m_cadastroEvento2', true), this.$store.commit('m_eventoProgressBar', (100/7)*2)
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
        this.$store.commit('m_cadastroEvento2', false), this.$store.commit('m_cadastroEvento3', true), this.$store.commit('m_eventoProgressBar', (100/7)*3)
      } else {
        alert('Adicione um endereço')
      }
    },
    nextBtn3 () {
      if (this.$store.state.eventoData.valorIngresso >= 0) {
        this.$store.commit('m_cadastroEvento3', false), this.$store.commit('m_cadastroEvento4', true), this.$store.commit('m_eventoProgressBar', (100/7)*4)
      }
    },  
    nextBtn4 () {
      if (this.imageURL1 !== null) {
        this.$store.commit('m_cadastroEvento4', false), this.$store.commit('m_cadastroEvento5', true), this.$store.commit('m_eventoProgressBar', (100/7)*5)
      } else {
        alert('Adicione pelo menos uma imagem')
      }
    },
    nextBtn5 () {
      if (this.$store.state.eventoData.title.length > 0) {
        this.$store.commit('m_cadastroEvento5', false), this.$store.commit('m_cadastroEvento6', true), this.$store.commit('m_eventoProgressBar', (100/7)*6)
      }
    },
    nextBtn6 () {
      if (this.$store.state.eventoData.subtitle.length > 0) {
        this.$store.commit('m_cadastroEvento6', false), this.$store.commit('m_cadastroEvento7', true), this.$store.commit('m_eventoProgressBar', (100/7)*7)
      }
    },
    concluir () {
      if (1<2) {/* IF PAGAMENTO CONCLUIDO */
        this.$store.commit('m_loader', true)
        const eventoID = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000).toString()
        this.$store.commit('m_eventoID', eventoID)
        const storageRef = firebase.storage().ref('eventos/' + eventoID + '/')
        /* 
        UPLOAD IMAGE 1 
        */
        /* imageEvL1 */
        storageRef.child('imageL1.jpeg').put(this.$store.state.blobEvL1).then(snapshot => {
          console.log(eventoID + 'L1' + '.jpeg')
          storageRef.child('imageL1.jpeg').getDownloadURL().then(url => {
            this.$store.commit('m_imageEvL1', url)
            this.ifUpload1()
          })
        })
        /* imageEvH1J */
        storageRef.child('imageH1J.jpeg').put(this.$store.state.blobEvH1J).then(snapshot => {
          console.log(eventoID + 'H1J' + '.jpeg')
          storageRef.child('imageH1J.jpeg').getDownloadURL().then(url => {
            this.$store.commit('m_imageEvH1J', url)
            this.ifUpload1()
          })
        })
        /* imageEvH1W */
        storageRef.child('imageH1W.webp').put(this.$store.state.blobEvH1W).then(snapshot => {
          console.log(eventoID + 'H1W' + '.webp')
          storageRef.child('imageH1W.webp').getDownloadURL().then(url => {
            this.$store.commit('m_imageEvH1W', url)
            this.ifUpload1()
          })
        })
        /* 
        UPLOAD IMAGE 2 
        */
        if (this.$store.state.blobEvH2J !== null) {
          /* imageEvL2 */
          storageRef.child('imageL2.jpeg').put(this.$store.state.blobEvL2).then(snapshot => {
            console.log(eventoID + 'L2' + '.jpeg')
            storageRef.child('imageL2.jpeg').getDownloadURL().then(url => {
              this.$store.commit('m_imageEvL2', url)
              this.ifUpload2()
            })
          })
          /* imageEvH2J */
          storageRef.child('imageH2J.jpeg').put(this.$store.state.blobEvH2J).then(snapshot => {
            console.log(eventoID + 'H2J' + '.jpeg')
            storageRef.child('imageH2J.jpeg').getDownloadURL().then(url => {
              this.$store.commit('m_imageEvH2J', url)
              this.ifUpload2()
            })
          })
          /* imageEvH2W */
          storageRef.child('imageH2W.webp').put(this.$store.state.blobEvH2W).then(snapshot => {
            console.log(eventoID + 'H2W' + '.webp')
            storageRef.child('imageH2W.webp').getDownloadURL().then(url => {
              this.$store.commit('m_imageEvH2W', url)
              this.ifUpload2()
            })
          })
        }
      }
    },
    ifUpload1 () {
      if (this.$store.state.eventoData.imageL1 !== null && this.$store.state.eventoData.imageH1J !== null && this.$store.state.eventoData.imageH1W !== null) {
        this.$store.dispatch('a_uploadEvento')
        this.$router.push('/eventos/' + this.$store.state.eventoData.eventoID)
      }
    },
    ifUpload2 () {
      if (this.$store.state.eventoData.imageL1 !== null && this.$store.state.eventoData.imageH1J !== null && this.$store.state.eventoData.imageH1W !== null && this.$store.state.eventoData.imageL2 !== null && this.$store.state.eventoData.imageH2J !== null && this.$store.state.eventoData.imageH2W !== null) {
        this.$store.dispatch('a_uploadEvento')
        this.$router.push('/eventos/' + this.$store.state.eventoData.eventoID)
      }
    }
  },
  async mounted () {
    loaded.then(() => {
      this.$store.state.googleMapsInitialized = true
    })
  },
  computed: {
    markerUrl () {
      return 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fmarker.svg?alt=media&token=fcbfd76e-ee93-41e8-a816-98906e19859b'
    },
    markerSize () {
      return !this.$store.state.googleMapsInitialized ? null : new window.google.maps.Size(38, 38)
    },
    titleLength () {
      return 50 - this.$store.state.eventoData.title.length
    },
    subtitleLength () {
      return 400 - this.$store.state.eventoData.subtitle.length
    },
    today () {
      let dd = new Date().getDate()
      let mm = new Date().getMonth() + 1
      let yyyy = new Date().getFullYear()
      dd < 10 ? dd = '0' + dd : ''
      mm < 10 ? mm = '0' + mm : ''
      return yyyy + '-' + mm + '-' + dd
    },
    mapZoom () {
      return this.$store.state.eventoPlace !== null ? 16 : 12
    },
    form1ok () {
      return this.$store.state.eventoData.date.length > 0 && this.$store.state.eventoData.hour.length > 0 ? 'background:#FF7D6C;cursor:pointer' : ''
    },
    form2ok () {
      return this.$store.state.eventoPlace !== null ? 'background:#FF7D6C;cursor:pointer' : ''
    },
    form3ok () {
      return this.$store.state.eventoData.valorIngresso >= 0 ? 'background:#FF7D6C;cursor:pointer' : ''
    },
    form4ok () {
      return this.imageURL1 !== null ? 'background:#FF7D6C;cursor:pointer' : ''
    },
    form5ok () {
      return this.$store.state.eventoData.title.length > 0 ? 'background:#FF7D6C;cursor:pointer' : ''
    },
    form6ok () {
      return this.$store.state.eventoData.subtitle.length > 0 ? 'background:#FF7D6C;cursor:pointer' : ''
    },
    form7ok () {
      return 1<2 ? 'background:#FF7D6C;cursor:pointer' : ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.state.showFoobar === true) {
        vm.$store.commit('m_showFoobar', false)
      }
    })
  }
}
</script>

<style>
@import url('~/assets/css/main.css');

.anunciar-evento {
  margin-top: 3.4rem;
  background: #FF7D6C;
  color: white;
  transition: var(--main-transition);
  & .progress-bar {
    position: fixed;
    top: 3.4rem;
    height: 3px;
    z-index: 8888;
    background: #FF7D6C;
    transition: all .3s ease;
  }
  /* ******************** PLANO EVENTO ******************** */
  & .plano-evento {
    display: flex;
    flex-flow: column;
    align-items: center;
    & .__img-header {
      margin: 2rem 0;
      width: 6rem;
      height: auto;
      filter: grayscale(100%) brightness(250%);
    }
    & .__title {
      font-size: 26px;
      font-weight: 700;
      padding: 0 7%;
      text-align: center;
    }
    & .__subtitle {
      text-transform: uppercase;
      margin: 3rem 0 .5rem 0;
      font-size: 15px;
      font-weight: 700;
      padding: 0 7%;
      text-align: center;
    }
    & .__item {
      padding: 0 7%;
      font-size: var(--fontSizeAnuncioText);
      font-weight: 400;
      margin: 0 0 .2rem 0;
      color: white;
    }
    & .__subitem {
      padding: 0 7%;
      font-size: 14px;
      font-weight: 400;
      margin: 0 ;
      color: white;
      line-height: 21px;
    }
    & .__price {
      font-size: 52px;
      font-weight: 100;
      margin-bottom: .5rem;
    }
    & .__anunciar-btn {
      color: var(--color01);
      width: 65%;
      background: white;
      padding: 1rem 0;
      border-radius: 100px;
      font-size: var(--fontSizeAnuncioText);
      font-weight: 600;
      margin: 3rem 0 2rem 0;
      box-shadow: 2px 2px 9px 4px rgba(0,0,0,0.13);
    }
  }
  /* ******************** CADASTRO EVENTO ******************** */
  & .cadastro-evento {
    height: 100%;
    background: white;
    color: var(--color01);
    padding: 0 7% 3rem 7%;
    & .__form-title {
      line-height: 35px;
      font-size: 28px;
      font-weight: 700;
      padding: 3rem 0 1.5rem 0;
      z-index: 999;
    }
    & textarea {
      margin-bottom: .5rem;
      width: 100%;
      font-size: var(--fontSizeAnuncioText);
      font-weight: 400;
      line-height: 26px;
      background: white;
      color: var(--color01);
      border: none;
      outline: none;
      resize: none;
    }
    & .__lenght-calc {
      padding-bottom: 6rem;
      z-index: 999;
      font-size: var(--fontSizeAnuncioText);
      font-weight: 600;
      color: rgb(90, 90, 90);
    }
    & .item-form {
      display: flex;
      flex-flow: column;
      margin: 1.7rem 0;
      & label {
        font-weight: 700;
        font-size: 15px;
      }
      & input {
        width: 100%;
        font-size: var(--fontSizeAnuncioText);
        font-weight: 400;
        background: white;
        color: var(--color01);
        padding: .5rem 0 .6rem 0;
        border: none;
        border-bottom: 1px solid rgb(222,222,222);
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
      z-index: 9999;
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
        & canvas {
          margin: 3rem 0 1rem 0;
          border: 2px dashed white;
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
      z-index: 3;
      bottom: 1rem;
      left: 0;
      right: 0;
      margin: auto;
      height: 3rem;
      width: 86%;
      background: white;
      box-shadow: 2px 2px 7px 2px rgba(0,0,0,0.1);
      border-radius: 2rem;
      & .back-next-body {
        display: flex;
        align-items: center;
        & button {
          width: 50%;
          height: 3rem;
        }
        & .__back {
          font-size: 16px;
          font-weight: 500;
          border-radius: 2rem 0 0 2rem;
          cursor: pointer;
          background: white;
        }
        & .__next {
          font-size: 16px;
          font-weight: 500;
          border-radius: 0 2rem 2rem 0;
          transition: all .3s ease;
          cursor: no-drop;
          background: rgb(222,222,222);
          color: white;
        }
      }
    }
    & .__gmap-autocomplete {
      font-size: calc(var(--fontSizeAnuncioText) + 1px);
      font-weight: 400;
      color: var(--color01);
      width: 100%;
      border: none;
      border-bottom: 1px solid rgb(222,222,222);
      margin: 1.5rem 0 1rem 0;
      padding: .5rem 0 .6rem 0;
      outline: none;
    }
    & .__input-btn {
      margin: 1rem 0;
      font-size: 15px;
      font-weight: 600;
      background: #FF7D6C;
      color: white;
      padding: .8rem 1.2rem;
      border-radius: 2rem;
    }
    & .__croppa-btn {
      margin: .3rem 0;
      font-size: 15px;
      font-weight: 500;
      background: #FF7D6C;
      color: white;
      padding: .8rem 1.2rem;
      border-radius: 2rem;
    }
    & .after-choose-image {
      margin-top: 1.5rem;
      padding: 0 calc(0% - .3rem);
      display: flex;
      flex-flow: row wrap;
      & .__preview-img {
        margin: 0 .3rem;
        width: 145px;
        height: 97px;
        border-radius: 4px;
      }
    }
  }
}

/* TRANSITIONS */
.anuncio-evento-enter {
  transform: translateX(100%);
}
.anuncio-evento-leave-active {
  transform: translateX(0%);
}

</style>
