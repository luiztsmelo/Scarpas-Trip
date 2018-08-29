<template>
  <div class="anunciar-atracao">

    <div class="progress-bar" :style="'width:' + $store.state.atracaoProgressBar + '%'"></div>


    <!-- ########## TIPO DE ATRACÃO PG.1 ########## -->
    <form class="cadastro-atracao" v-if="$store.state.cadastroAtracao1">

      <h1 class="__form-title">Que tipo de atração?</h1>

      <div class="item-form">
        <label>Tipo</label>
        <select v-model="$store.state.atracaoData.tipoAtracao">
          <option>Cachoeira</option>
          <option>Lagoa</option>
          <option>Montanha</option>
        </select>
      </div> 

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back">Voltar</button>
          <button type="button" class="__next" :style="form1ok" @click="nextBtn1">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## TIPO DE ATRACÃO PG.1 ########## -->




    <!-- ########## LOCAL PG.2 ########## -->
    <form class="cadastro-atracao" v-if="$store.state.cadastroAtracao2">

      <h1 class="__form-title">Qual a localização?</h1>

      <gmap-map
        v-if="$store.state.cadastroAtracao2"
        :center="{lat: $store.state.atracaoData.positionLAT, lng: $store.state.atracaoData.positionLNG}"
        :zoom="15"
        :options="{styles: styles, mapTypeControl:false, streetViewControl:false}"
        style="width: 100%; height: 280px"
        @click="addPointRota">
          <!-- Rota -->
          <gmap-polyline 
            :path="$store.state.atracaoData.rota"
            :options="polylineOptions">
          </gmap-polyline>
          <!-- Marcador partida -->
          <gmap-marker
            v-if="$store.state.atracaoData.rota !== {}"
            :position="$store.state.atracaoData.rota[0]"
            :icon="{url: $store.state.markerUrlPartida, scaledSize: $store.state.markerSize}">
          </gmap-marker>
          <!-- Marcador chegada -->
          <gmap-marker
            v-if="$store.state.atracaoData.rota !== {}"
            :position="$store.state.atracaoData.rota.slice(-1)[0]"
            :icon="{url: $store.state.markerUrlPartida, scaledSize: $store.state.markerSize}">
          </gmap-marker>
      </gmap-map>

      <button class="__map-btn-reset" type="button" @click="resetRota">Reset</button>
      <button class="__map-btn-remove" type="button" @click="removePointRota">Remove last</button>

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn2">Voltar</button>
          <button type="button" class="__next" :style="form2ok" @click="nextBtn2">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## LOCAL PG.2 ########## -->




    <!-- ########## IMAGEM E VÍDEOS PG.3 ########## -->
    <form class="cadastro-atracao" v-if="$store.state.cadastroAtracao3">

      <h1 class="__form-title">Adicione Imagens e Vídeo</h1>

      <div class="before-choose-image" v-if="imageURL1 === null">
        <button class="__input-btn" type="button" @click="$refs.myCroppa1.chooseFile()">Adicionar Imagem</button>
      </div>

      <div class="modal-croppa" v-if="showCroppaModal1" @click="showCroppaModal1=false">
        <div class="modal-croppa-body" @click.stop>
          <h1>Ajustar imagem</h1>
          <croppa
          ref="myCroppa1"
          :width="320"
          :height="214"
          :quality="3"
          :placeholder="'Carregando...'"
          :placeholder-color="'rgb(232,232,222)'"
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

      <div class="modal-croppa" v-if="showCroppaModal2" @click="showCroppaModal2=false">
        <div class="modal-croppa-body" @click.stop>
          <h1>Ajustar imagem</h1>
          <croppa
          ref="myCroppa2"
          :width="320"
          :height="214"
          :quality="3"
          :placeholder="'Carregando...'"
          :placeholder-color="'#dedede'"
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
      <div class="after-choose-image" v-if="imageURL1 !== null">
        <img :src="imageURL1" class="__preview-img" @click="showCroppaModal1=true">

        <div class="image2">
          <img src="./../../../assets/img/add-image.svg" class="__preview-img" v-if="imageURL2 === null" @click="$refs.myCroppa2.chooseFile()" style="padding:2rem">
          <img :src="imageURL2" class="__preview-img" @click="showCroppaModal2=true" v-else>
        </div>

      </div><!-- Preview Image -->

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn3">Voltar</button>
          <button type="button" class="__next" :style="form3ok" @click="nextBtn3">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## IMAGEM E VÍDEOS PG.3 ########## -->




    <!-- ########## TÍTULO PG.4 ########## -->
    <form class="cadastro-atracao" v-if="$store.state.cadastroAtracao4">

      <h1 class="__form-title">Título para a atração</h1>

      <textarea 
      v-model.lazy="$store.state.atracaoData.title"
      v-autosize="title"
      maxlength="50"
      rows="1"
      placeholder="ex: Linda cachoeira"
      required>
      {{title}}</textarea>

      <span class="__lenght-calc">{{ titleLength }}</span>

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn4">Voltar</button>
          <button type="button" class="__next" :style="form4ok" @click="nextBtn4">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## TÍTULO PG.4 ########## -->




    <!-- ########## DESCRIÇÃO PG.5 ########## -->
    <form class="cadastro-atracao" v-if="$store.state.cadastroAtracao5">

      <h1 class="__form-title">Descreva a atração</h1>   

      <textarea 
      v-model.lazy="$store.state.atracaoData.subtitle"
      v-autosize="subtitle"
      maxlength="400"
      rows="1"
      placeholder="Coloque informações importantes aqui, que não foram perguntadas antes"
      required>
      {{subtitle}}</textarea>

      <span class="__lenght-calc">{{ subtitleLength }}</span> 

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn5">Voltar</button>
          <button type="button" class="__next" :style="form5ok" @click="nextBtn5">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## DESCRIÇÃO PG.5 ########## -->




    <!-- ########## IDENTIFICAÇÃO PG.6 ########## -->
    <form class="cadastro-atracao" v-if="$store.state.cadastroAtracao6">

      <h1 class="__form-title">Identificação</h1>   


      <h3 style="padding: .5rem 7% .7rem 7%">Continuar com:</h3>

      <div class="signin-btns">
        <button type="button" class="facebook-btn" @click="facebookSignIn()">Facebook</button>
        <button type="button" class="google-btn" @click="googleSignIn()">Google</button>
      </div>


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn6">Voltar</button>
          <button type="button" class="__next" :style="form6ok" @click="concluir">Cadastrar</button>
        </div>
      </div> 
    
    </form><!-- ########## IDENTIFICAÇÃO PG.6 ########## -->


  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import { mapstyle } from '../../../mixins/mapstyle'

export default {
  mixins: [mapstyle],
  head () {
    return {
      title: 'Cadastrar Atração ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
  data() {
    return {
      title: '', /* Vue Autosize */
      subtitle: '', /* Vue Autosize */
      polylineOptions: {
        strokeColor: '#2a2a2a',
        strokeOpacity: 1,
        strokeWeight: 2
      },
      showCroppaModal1: false,
      showCroppaModal2: false,
      imageURL1: null,
      imageURL2: null
    }
  },
  methods: {
    googleSignIn () {
      this.$store.dispatch('a_googleSignIn')
    },
    facebookSignIn () {
      this.$store.dispatch('a_facebookSignIn')
    },
    /* ******************** IMAGE INPUT ******************** */
    /* --- Image 1 --- */
    imageChoose1 () {
      this.showCroppaModal1 = true
    },
    async imageConfirmed1 () {
      if (this.imageURL1 !== null) {
        return 
      } else {
        const blobAtL1 = await this.$refs.myCroppa1.promisedBlob('image/jpeg', 0.01)
        const blobAtH1J = await this.$refs.myCroppa1.promisedBlob('image/jpeg')
        const blobAtH1W = await this.$refs.myCroppa1.promisedBlob('image/webp')
        let url1 = URL.createObjectURL(blobAtH1J)
        this.imageURL1 = url1
        this.$store.state.blobAtL1 = blobAtL1
        this.$store.state.blobAtH1J = blobAtH1J
        this.$store.state.blobAtH1W = blobAtH1W
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
        const blobAtL2 = await this.$refs.myCroppa2.promisedBlob('image/jpeg', 0.01)
        const blobAtH2J = await this.$refs.myCroppa2.promisedBlob('image/jpeg')
        const blobAtH2W = await this.$refs.myCroppa2.promisedBlob('image/webp')
        let url2 = URL.createObjectURL(blobAtH2J)
        this.imageURL2 = url2
        this.$store.state.blobAtL2 = blobAtL2
        this.$store.state.blobAtH2J = blobAtH2J
        this.$store.state.blobAtH2W = blobAtH2W
      }
    },
    removeImage2 () {
      this.imageURL2 = null
      this.$refs.myCroppa2.remove()
      this.showCroppaModal2 = false
    },
    /* ******************** GOOGLE MAPS ******************** */
    addPointRota (event) {
      this.$store.commit('m_addRota', {lat: event.latLng.lat(), lng: event.latLng.lng()})
    }, 
    resetRota () {
      this.$store.commit('m_resetRota', [])
    }, 
    removePointRota () {
      this.$store.commit('m_removePointRota')
    }, 
    /* ******************** BACK BUTTONS ******************** */
    backBtn2 () {
      this.$store.commit('m_cadastroAtracao2', false), this.$store.commit('m_cadastroAtracao1', true)
    },
    backBtn3 () {
      this.$store.commit('m_cadastroAtracao3', false), this.$store.commit('m_cadastroAtracao2', true)
    },
    backBtn4 () {
      this.$store.commit('m_cadastroAtracao4', false), this.$store.commit('m_cadastroAtracao3', true)
    },
    backBtn5 () {
      this.$store.commit('m_cadastroAtracao5', false), this.$store.commit('m_cadastroAtracao4', true)
    },
    backBtn6 () {
      this.$store.commit('m_cadastroAtracao6', false), this.$store.commit('m_cadastroAtracao5', true)
    },

    /* ******************** NEXT BUTTONS ******************** */
    nextBtn1 () {
      if (1<2) {
        this.$store.commit('m_cadastroAtracao1', false), this.$store.commit('m_cadastroAtracao2', true), this.$store.commit('m_atracaoProgressBar', (100/6)*2)
      }
    },
    nextBtn2 () {
      if (1<2) {
        this.$store.commit('m_cadastroAtracao2', false), this.$store.commit('m_cadastroAtracao3', true), this.$store.commit('m_atracaoProgressBar', (100/6)*3)
      }
    },
    nextBtn3 () {
      if (1<2) {
        this.$store.commit('m_cadastroAtracao3', false), this.$store.commit('m_cadastroAtracao4', true), this.$store.commit('m_atracaoProgressBar', (100/6)*4)
      }
    },
    nextBtn4 () {
      if (1<2) {
        this.$store.commit('m_cadastroAtracao4', false), this.$store.commit('m_cadastroAtracao5', true), this.$store.commit('m_atracaoProgressBar', (100/6)*5)
      }
    },
    nextBtn5 () {
      if (1<2) {
        this.$store.commit('m_cadastroAtracao5', false), this.$store.commit('m_cadastroAtracao6', true), this.$store.commit('m_atracaoProgressBar', (100/6)*6)
      }
    },
    concluir () {
      this.$store.state.atracaoData.email = this.user.email
      if (this.$store.state.atracaoData.email === 'luiztsmelo@gmail.com') {/* IF ME */
        this.$store.commit('m_loader', true)
        const atracaoID = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000).toString()
        this.$store.commit('m_atracaoID', atracaoID)
        const storageRef = firebase.storage().ref('atracoes/' + atracaoID + '/')
        /* 
        UPLOAD IMAGE 1 
        */
        /* imageAtL1 */
        storageRef.child('imageL1.jpeg').put(this.$store.state.blobAtL1).then(snapshot => {
          console.log(atracaoID + 'L1' + '.jpeg')
          storageRef.child('imageL1.jpeg').getDownloadURL().then(url => {
            this.$store.commit('m_imageAtL1', url)
            this.ifUpload1()
          })
        })
        /* imageAtH1J */
        storageRef.child('imageH1J.jpeg').put(this.$store.state.blobAtH1J).then(snapshot => {
          console.log(atracaoID + 'H1J' + '.jpeg')
          storageRef.child('imageH1J.jpeg').getDownloadURL().then(url => {
            this.$store.commit('m_imageAtH1J', url)
            this.ifUpload1()
          })
        })
        /* imageAtH1W */
        storageRef.child('imageH1W.webp').put(this.$store.state.blobAtH1W).then(snapshot => {
          console.log(atracaoID + 'H1W' + '.webp')
          storageRef.child('imageH1W.webp').getDownloadURL().then(url => {
            this.$store.commit('m_imageAtH1W', url)
            this.ifUpload1()
          })
        })
        /* 
        UPLOAD IMAGE 2 
        */
        if (this.$store.state.blobAtH2J !== null) {
          /* imageAtL2 */
          storageRef.child('imageL2.jpeg').put(this.$store.state.blobAtL2).then(snapshot => {
            console.log(atracaoID + 'L2' + '.jpeg')
            storageRef.child('imageL2.jpeg').getDownloadURL().then(url => {
              this.$store.commit('m_imageAtL2', url)
              this.ifUpload2()
            })
          })
          /* imageAtH2J */
          storageRef.child('imageH2J.jpeg').put(this.$store.state.blobAtH2J).then(snapshot => {
            console.log(atracaoID + 'H2J' + '.jpeg')
            storageRef.child('imageH2J.jpeg').getDownloadURL().then(url => {
              this.$store.commit('m_imageAtH2J', url)
              this.ifUpload2()
            })
          })
          /* imageAtH2W */
          storageRef.child('imageH2W.webp').put(this.$store.state.blobAtH2W).then(snapshot => {
            console.log(atracaoID + 'H2W' + '.webp')
            storageRef.child('imageH2W.webp').getDownloadURL().then(url => {
              this.$store.commit('m_imageAtH2W', url)
              this.ifUpload2()
            })
          })
        }
      } else {
        alert('Cadastro não autorizado')
      }
    },
    ifUpload1 () {
      if (this.$store.state.atracaoData.imageL1 !== null && this.$store.state.atracaoData.imageH1J !== null && this.$store.state.atracaoData.imageH1W !== null) {
        this.$store.dispatch('a_uploadAtracao')
        this.$router.push('/atracoes/' + this.$store.state.atracaoData.atracaoID)
      }
    },
    ifUpload2 () {
      if (this.$store.state.atracaoData.imageL1 !== null && this.$store.state.atracaoData.imageH1J !== null && this.$store.state.atracaoData.imageH1W !== null && this.$store.state.atracaoData.imageL2 !== null && this.$store.state.atracaoData.imageH2J !== null && this.$store.state.atracaoData.imageH2W !== null) {
        this.$store.dispatch('a_uploadAtracao')
        this.$router.push('/atracoes/' + this.$store.state.atracaoData.atracaoID)
      }
    }
  },
  computed: {
    titleLength () {
      return 50 - this.$store.state.atracaoData.title.length
    },
    subtitleLength () {
      return 400 - this.$store.state.atracaoData.subtitle.length
    },
    mapZoom () {
      return this.$store.state.atracaoPlace !== null ? 16 : 12
    },
    form1ok () {
      return 1<2 ? 'background:#81C784;cursor:pointer' : ''
    },
    form2ok () {
      return 1<2 ? 'background:#81C784;cursor:pointer' : ''
    },
    form3ok () {
      return 1<2 ? 'background:#81C784;cursor:pointer' : ''
    },
    form4ok () {
      return 1<2 ? 'background:#81C784;cursor:pointer' : ''
    },
    form5ok () {
      return 1<2 !== null ? 'background:#81C784;cursor:pointer' : ''
    },
    form6ok () {
      return this.$store.state.atracaoData.email === 'luiztsmelo@gmail.com' ? 'background:#81C784;cursor:pointer' : ''
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.$store.state.showFoobar === false) {
      this.$store.commit('m_showFoobar', true)
      next()
    } else {
      next(false)
    }
  }/* ,
  beforeRouteEnter (to, from, next) {
    if (this.$store.state.showFoobar === true) {
      this.$store.commit('m_showFoobar', false)
      next()
    } else {
      next(false)
    }
  } */
}
</script>

<style>
@import url('~/assets/css/main.css');

.anunciar-atracao {
  margin-top: 3.4rem;
  & .progress-bar {
    position: fixed;
    top: 3.4rem;
    height: 3px;
    z-index: 8888;
    background: #81C784;
    transition: all .3s ease;
  }
  & .cadastro-atracao {
    height: 100%;
    background: white;
    color: var(--color01);
    padding: 0 0 5.5rem 0;
    & .__form-title {
      padding: 3rem 7% 1.5rem 7%;
      line-height: 35px;
      font-size: 28px;
      font-weight: 700;
      z-index: 999;
    }
    & textarea {
      padding: 0 7%;
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
      padding: 0 7%;
      padding-bottom: 6rem;
      z-index: 999;
      font-size: var(--fontSizeAnuncioText);
      font-weight: 600;
      color: rgb(90, 90, 90);
    }
    & .item-form {
      padding: 0 7%;
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
        border-bottom: 1px solid #dedede;
        outline: none;
      }
      & select {
        width: 100%;
        font-size: var(--fontSizeAnuncioText);
        font-weight: 400;
        background: white;
        color: var(--color01);
        padding: .5rem 0 .6rem 0;
        border: none;
        border-bottom: 1px solid #dedede;
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
    & .__map-btn-reset {
      width: 30%;
      height: 2rem;
      color: white;
      background: #2a2a2a;
    }
    & .__map-btn-remove {
      width: 70%;
      height: 2rem;
      color: white;
      background: #FF7D6C;
    }
    & .__input-btn {
      margin: 1rem 7%;
      font-size: 15px;
      font-weight: 600;
      background: #81C784;
      color: white;
      padding: .8rem 1.2rem;
      border-radius: 2rem;
    }
    & .__croppa-btn {
      margin: .3rem 0;
      font-size: 15px;
      font-weight: 500;
      background: #81C784;
      color: white;
      padding: .8rem 1.2rem;
      border-radius: 2rem;
    }
    & .after-choose-image {
      margin-top: 1.5rem;
      padding: 0 calc(7% - .3rem);
      display: flex;
      flex-flow: row wrap;
      & .__preview-img {
        margin: 0 .3rem;
        width: 145px;
        height: 97px;
        border-radius: 2px;
      }
    }
    & .signin-btns {
      display: flex;
      padding: 0 7%;
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
      box-shadow: 2px 2px 6px 1px rgba(0,0,0,0.1);
      border-radius: 2rem;
      & .back-next-body {
        display: flex;
        align-items: center;
        & button {
          width: 50%;
          height: 3rem;
        }
        & .__back {
          font-size: var(--fontSizeAnuncioText);
          font-weight: 500;
          border-radius: 2rem 0 0 2rem;
          cursor: pointer;
          background: white;
        }
        & .__next {
          font-size: var(--fontSizeAnuncioText);
          font-weight: 500;
          border-radius: 0 2rem 2rem 0;
          transition: all .3s ease;
          cursor: no-drop;
          background: #dedede;
          color: white;
        }
      }
    }
  }
}

</style>
