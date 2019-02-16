<template>
  <div class="anunciar-evento">

  

    <div class="progress-bar" :style="progressBarStyle"></div>



    <!-- CADASTRO EVENTO -->



    <!-- ________________________________________ 1 - DATAS ________________________________________ -->
    <form class="cadastro-evento" v-if="$store.state.cadastroEvento1">

      <h1 class="__form-title">Datas e horários do evento</h1>


      <div class="date" v-for="(date, index) in $store.state.eventoData.dates" :key="index+1">

        <h2 class="__form-subtitle">Dia {{ index + 1 }}</h2>

        <button type="button" class="remove-date" @click="$store.commit('m_removeDateEvento', index)">REMOVER</button>

        <div class="item-form">
          <label>Data</label>
          <input type="date" v-model="date.date">
        </div> 

        <div class="item-form">
          <label>Começa às</label>
          <input type="time" v-model="date.startTime">
        </div>

        <div class="item-form">
          <label>Terminas às</label>
          <input type="time" v-model="date.endTime">
        </div>

      </div>


      <button type="button" class="add-date" @click="$store.commit('m_addDateEvento')">Adicionar data</button>


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn1">Voltar</button>
          <button type="button" class="__next" :style="form1ok" @click="nextBtn1">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 1 - DATAS ________________________________________ -->







    <!-- ________________________________________ 2 - DETALHES ________________________________________ -->
    <form class="cadastro-evento" v-if="$store.state.cadastroEvento2">

      <h1 class="__form-title">Detalhes do evento</h1>
      

      
      <h2 class="__form-subtitle">Organização</h2>

      <div class="item-form">
        <label>Nome do organizador</label>
        <input type="text" v-model="$store.state.eventoData.organizador.name">
      </div>

      <div class="item-form">
        <label>Celular / WhatsApp</label>
        <masked-input
          type="tel"
          v-model="$store.state.eventoData.organizador.whatsapp"
          :mask="['+', 5, 5, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]"
          :guide="false"
          placeholder="+55">
        </masked-input>
      </div>

      <div class="item-form">
        <label>Telefone Fixo</label>
        <masked-input
          type="tel"
          v-model="$store.state.eventoData.organizador.telefoneFixo"
          :mask="['+', 5, 5, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]"
          :guide="false"
          placeholder="+55">
        </masked-input>
      </div>

      <div class="item-form">
        <label>E-mail</label>
        <input type="email" v-model="$store.state.eventoData.organizador.email">
      </div>



      <h2 class="__form-subtitle">Regras</h2>

      <div class="item-form">
        <label>Classificação de idade</label>
        <select v-model="$store.state.eventoData.classificacao">
          <option :value="0">Livre</option>
          <option :value="12">12 anos</option>
          <option :value="14">14 anos</option>
          <option :value="16">16 anos</option>
          <option :value="18">18 anos</option>
        </select>
      </div>


      <div class="item-form-switches" @click="$store.state.eventoData.openBar = !$store.state.eventoData.openBar">
        <p>Open bar</p>
        <div class="switch" :class="[ $store.state.eventoData.openBar === true ? 'switch-on' : '' ]">
          <div class="slider"></div>
        </div>
      </div>



      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn2">Voltar</button>
          <button type="button" class="__next" :style="form2ok" @click="nextBtn2">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 2 - DETALHES ________________________________________ -->







    <!-- ________________________________________ 3 - FLYER ________________________________________ -->
    <form class="cadastro-evento" v-if="$store.state.cadastroEvento3">

      <h1 class="__form-title">Flyer</h1>


      <button type="button" class="add-image-btn" @click="$refs.myCroppa.chooseFile()" v-if="$store.state.eventoData.flyerHJ === ''">Adicionar flyer</button>


      <div class="modal-croppa" v-show="showCroppaModal" @click="showCroppaModal=false">
        <div class="modal-croppa-body" @click.stop>
          <h1>Ajustar imagem</h1>
          <croppa
            ref="myCroppa"
            @file-choose="showCroppaModal = true"
            @new-image-drawn="newImageDrawn = true"
            :width="$store.state.isMobile ? 720/aspectRatio/2.8 : 720/aspectRatio/1.8"
            :height="$store.state.isMobile ? 720/2.8 : 720/1.8"
            :quality="$store.state.isMobile ? 2.8 : 1.8"
            :placeholder="'Carregando...'"
            :placeholder-color="'white'"
            :accept="'.jpg, .jpeg, .png, .webp'"
            :zoom-speed="$store.state.isMobile ? 2 : 4"
            :prevent-white-space="true"
            :show-remove-button="false">
          </croppa>
          <div style="display:flex; align-items: center">
            <button class="__aspect-ratio" type="button" @click="aspectRatio = 1/2">2:1</button>
            <button class="__aspect-ratio" type="button" @click="aspectRatio = 9/16">16:9</button>
            <button class="__aspect-ratio" type="button" @click="aspectRatio = 2/3">3:2</button>
            <button class="__croppa-btn" type="button" @click="showCroppaModal=false, imageConfirm()" v-if="newImageDrawn">Confirmar</button>
          </div>
        </div>
      </div>


      <div class="image-preview" v-if="$store.state.eventoData.flyerHJ !== ''">
        <progressive-background class="__image" :src="$store.state.eventoData.flyerHJ" :placeholder="$store.state.eventoData.flyerL" :aspect-ratio="aspectRatio"/>
        <button type="button" @click="deleteImage()">Remover</button>
      </div>



      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn3">Voltar</button>
          <button type="button" class="__next" :style="form3ok" @click="nextBtn3">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 3 - FLYER ________________________________________ -->








    <!-- ________________________________________ 4 - LOCAL ________________________________________ -->
    <form class="cadastro-evento" v-if="$store.state.cadastroEvento4">

      <h1 class="__form-title">Local do evento</h1>

      <div class="item-form">
        <label>Local</label>
        <gmap-autocomplete
          onKeyPress="if (event.which == 13) return false" 
          placeholder="Digite o endereço completo aqui"
          @place_changed="setPlace">
        </gmap-autocomplete>
      </div>

      <h3 class="without-address" @click="$modal.show('local-map-modal'), $store.state.fromWithoutAddress=true">
        O local não possui endereço?
      </h3>

      <localMap/>


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn4">Voltar</button>
          <button type="button" class="__next" :style="form4ok" @click="nextBtn4">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 4 - LOCAL ________________________________________ -->







    <!-- ________________________________________ 5 - VALOR DO INGRESSO ________________________________________ -->
    <form class="cadastro-evento" v-if="$store.state.cadastroEvento5">

      <h1 class="__form-title">Informações sobre o ingresso</h1>


      <h2 class="__form-subtitle">Valor do ingresso</h2>

      <div class="item-form">
        <label>Valor do ingresso:</label>
        <money 
          v-model="$store.state.eventoData.valorIngresso"
          onKeyPress="if (event.which == 13) return false">
        </money>
      </div>



      <h2 class="__form-subtitle">Venda de ingresso físico</h2>

      <div class="item-form">
        <label>Nome do Estabelecimento</label>
        <input type="text" v-model="$store.state.eventoData.ingressoFisicoEstabelecimento">
      </div>

      <div class="item-form">
        <label>WhatsApp</label>
        <masked-input
          type="tel"
          v-model="$store.state.eventoData.ingressoFisicoWhatsapp"
          :mask="['+', 5, 5, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]"
          :guide="false"
          placeholder="+55">
        </masked-input>
      </div>



      <h2 class="__form-subtitle">Venda de ingresso digital</h2>

      <div class="item-form">
        <label>URL</label>
        <input type="text" v-model="$store.state.eventoData.ingressoDigitalURL">
      </div>



      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn5">Voltar</button>
          <button type="button" class="__next" :style="form5ok" @click="nextBtn5">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 5 - VALOR DO INGRESSO ________________________________________ -->








    <!-- ________________________________________ 6 - TÍTULO ________________________________________ -->
    <form class="cadastro-evento" v-if="$store.state.cadastroEvento6">

      <h1 class="__form-title">Título do evento</h1>

      <textarea 
      v-model="$store.state.eventoData.title"
      v-autosize="title"
      maxlength="60"
      rows="1"
      placeholder="ex: Sunset em Escarpas do Lago"
      required>
      {{title}}</textarea>

      <span class="__lenght-calc">{{ 60 - $store.state.eventoData.title.length }}</span>


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn6">Voltar</button>
          <button type="button" class="__next" :style="form6ok" @click="nextBtn6">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 6 - TÍTULO ________________________________________ -->







    <!-- ________________________________________ 7 - DESCRIÇÃO ________________________________________ -->
    <form class="cadastro-evento" v-if="$store.state.cadastroEvento7">

      <h1 class="__form-title">Descrição do evento</h1>   

      <textarea 
      v-model="$store.state.eventoData.subtitle"
      v-autosize="subtitle"
      maxlength="1000"
      rows="1"
      placeholder="Informações sobre o evento"
      required>
      {{subtitle}}</textarea>

      <span class="__lenght-calc">{{ 1000 - $store.state.eventoData.subtitle.length }}</span> 


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn7">Voltar</button>
          <button type="button" class="__next" :style="form7ok" @click="nextBtn7">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 7 - DESCRIÇÃO ________________________________________ -->







    <!-- ________________________________________ 8 - IDENTIFICAÇÃO ________________________________________ -->
    <form class="cadastro-evento" v-if="$store.state.cadastroEvento8">

      <h1 class="__form-title">Identificação</h1> 


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn8">Voltar</button>
          <button type="button" class="__next" :style="form8ok" @click="$store.dispatch('a_googleSignIn')">Anunciar</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 8 - IDENTIFICAÇÃO ________________________________________ -->




    <!-- CADASTRO EVENTO -->


  </div>
</template>

<script>
import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import MaskedInput from 'vue-text-mask'
import localMap from '~/components/localMap.vue'
import subDays from 'date-fns/sub_days'
import analyze from 'rgbaster'

export default {
  components: { MaskedInput, localMap },
  head () {
    return {
      title: 'Anunciar Evento em Capitólio ‒ Escarpas Trip',
      meta: [
        { hid: 'anuncioEvento', name: 'description', content: 'Anuncie seu evento na Escarpas Trip' }
      ]
    }
  },
  transition: 'opacity',
  data () {
    return {
      title: '', /* Vue Autosize */
      subtitle: '', /* Vue Autosize */
      showCroppaModal: false,
      newImageDrawn: false,
      aspectRatio: 1/2
    }
  },
  methods: {
    validateEmail () {
      !Email.validate(this.$store.state.user.email) ? this.emailError = true : this.emailError = false
    },
    scrollTop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    /* ******************** GOOGLE MAPS ******************** */
    setPlace (place) {
      this.$store.commit('m_eventoPlace', place)
      this.$store.state.eventoData.positionLAT = this.$store.state.eventoPlace.geometry.location.lat()
      this.$store.state.eventoData.positionLNG = this.$store.state.eventoPlace.geometry.location.lng()
      this.$store.state.eventoData.address = this.$store.state.eventoPlace.formatted_address
      this.$modal.show('local-map-modal')
    },
    /* ******************** IMAGE INPUT ******************** */
    async imageConfirm () {
      try {
        /* Storage path */
        const storageRef = firebase.storage().ref('eventos/' + this.$store.state.eventoData.eventoID + '/')

        let blobL = await this.$refs.myCroppa.promisedBlob('image/jpeg', 0.01)
        let blobHJ = await this.$refs.myCroppa.promisedBlob('image/jpeg')
        let blobHW = await this.$refs.myCroppa.promisedBlob('image/webp')
        
        /* Upload image L */
        await storageRef.child('flyerL.jpeg').put(blobL)
        this.$store.state.eventoData.flyerL = await storageRef.child('flyerL.jpeg').getDownloadURL()
        
        /* Upload image HJ */
        await storageRef.child('flyerHJ.jpeg').put(blobHJ)
        this.$store.state.eventoData.flyerHJ = await storageRef.child('flyerHJ.jpeg').getDownloadURL()

        /* Upload image HW */
        await storageRef.child('flyerHW.webp').put(blobHW)
        this.$store.state.eventoData.flyerHW = await storageRef.child('flyerHW.webp').getDownloadURL()

        /* Remover imagem do croppa */
        this.$refs.myCroppa.remove()

        this.newImageDrawn = false

        this.$store.state.eventoData.flyerAspectRatio = this.aspectRatio

        const flyerDominantColor = await analyze(this.$store.state.eventoData.flyerHJ)

        this.$store.state.eventoData.flyerDominantColor = flyerDominantColor[0].color

      } catch (err) {
        console.log(err)
      }
    },
    deleteImage () {
      const storageRef = firebase.storage().ref('eventos/' + this.$store.state.eventoData.eventoID + '/')
      storageRef.child('flyerL.jpeg').delete()
      storageRef.child('flyerHJ.jpeg').delete()
      storageRef.child('flyerHW.webp').delete()
      this.$store.state.eventoData.flyerL = ''
      this.$store.state.eventoData.flyerHJ = ''
      this.$store.state.eventoData.flyerHW = ''
      this.$refs.myCroppa.remove()
    },
    /* ******************** BACK BUTTONS ******************** */
    backBtn1 () {
      window.history.back(1)
    },
    backBtn2 () {
      this.$store.commit('m_cadastroEvento2', false), this.$store.commit('m_cadastroEvento1', true), window.history.back(1)
    },
    backBtn3 () {
      this.$store.commit('m_cadastroEvento3', false), this.$store.commit('m_cadastroEvento2', true), window.history.back(1)
    },
    backBtn4 () {
      this.$store.commit('m_cadastroEvento4', false), this.$store.commit('m_cadastroEvento3', true), window.history.back(1)
    },
    backBtn5 () {
      this.$store.commit('m_cadastroEvento5', false), this.$store.commit('m_cadastroEvento4', true), window.history.back(1)
    },
    backBtn6 () {
      this.$store.commit('m_cadastroEvento6', false), this.$store.commit('m_cadastroEvento5', true), window.history.back(1)
    },
    backBtn7 () {
      this.$store.commit('m_cadastroEvento7', false), this.$store.commit('m_cadastroEvento6', true), window.history.back(2)
    },
    backBtn8 () {
      this.$store.commit('m_cadastroEvento8', false), this.$store.commit('m_cadastroEvento7', true), window.history.back(1)
    },
    backBtn9 () {
      this.$store.commit('m_cadastroEvento9', false), this.$store.commit('m_cadastroEvento8', true), window.history.back(1)
    },
    /* ******************** NEXT BUTTONS ******************** */
    hashEvento () {
      this.$store.dispatch('a_generateRandomHashs')
      window.location.hash = this.randomHashs[1]
    },
    nextBtn1 () {
      if (1<2) {
        this.$store.commit('m_cadastroEvento1', false), this.$store.commit('m_cadastroEvento2', true), this.$store.commit('m_eventoProgressBar', (100/8)*2), this.scrollTop(), window.location.hash = `${this.randomHashs[2]}`
      }
    },
    nextBtn2 () {
      if (1<2) {
        this.$store.commit('m_cadastroEvento2', false), this.$store.commit('m_cadastroEvento3', true), this.$store.commit('m_eventoProgressBar', (100/8)*3), this.scrollTop(), window.location.hash = `${this.randomHashs[3]}`
      }
    },
    nextBtn3 () {
      if (1<2) {
        this.$store.commit('m_cadastroEvento3', false), this.$store.commit('m_cadastroEvento4', true), this.$store.commit('m_eventoProgressBar', (100/8)*4), this.scrollTop(), window.location.hash = `${this.randomHashs[4]}`
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione um flyer.'
        })
      }
    },
    nextBtn4 () {
      if (this.$store.state.eventoPlace !== null || this.$store.state.eventoData.positionLAT !== -20.6141320) {
        this.$store.commit('m_cadastroEvento4', false), this.$store.commit('m_cadastroEvento5', true), this.$store.commit('m_eventoProgressBar', (100/8)*5), this.scrollTop(), window.location.hash = `${this.randomHashs[5]}`
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione o local do evento.'
        })
      }
    },
    nextBtn5 () {
      if (1<2) {
        this.$store.commit('m_cadastroEvento5', false), this.$store.commit('m_cadastroEvento6', true), this.$store.commit('m_eventoProgressBar', (100/8)*6), this.scrollTop(), window.location.hash = `${this.randomHashs[6]}`
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione o valor do ingresso.'
        })
      }
    },
    nextBtn6 () {
      if (this.$store.state.eventoData.title !== '') {
        this.$store.commit('m_cadastroEvento6', false), this.$store.commit('m_cadastroEvento7', true), this.$store.commit('m_eventoProgressBar', (100/8)*7), this.scrollTop(), window.location.hash = `${this.randomHashs[7]}`
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione o título.'
        })
      }
    },
    nextBtn7 () {
      if (this.$store.state.eventoData.subtitle !== '') {
        this.$store.commit('m_cadastroEvento7', false), this.$store.commit('m_cadastroEvento8', true), this.$store.commit('m_eventoProgressBar', (100/8)*8), this.scrollTop(), window.location.hash = `${this.randomHashs[8]}`
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione uma descrição.'
        })
      }
    }
  },
  computed: {
    /* ******************** PATHS ******************** */
    user () { return this.$store.state.user },
    authUser () { return this.$store.state.authUser },
    hash () { return this.$route.hash },
    randomHashs () { return this.$store.state.randomHashs },
    /* ******************** PROGRESS BAR ******************** */
    progressBarStyle () {
      return `width:${this.$store.state.eventoProgressBar}%; ${this.$store.state.cadastroEvento1 ? '' : 'transition: all .3s ease;'}`
    },
    /* ******************** FORM STYLES ******************** */
    form1ok () {
      return 1<2 ? 'background: #FF7E65' : ''
    },
    form2ok () {
      return 1<2 ? 'background: #FF7E65' : ''
    },
    form3ok () {
      return 1<2 ? 'background: #FF7E65' : ''
    },
    form4ok () {
      return this.$store.state.eventoPlace !== null || this.$store.state.eventoData.positionLAT !== -20.6141320 ? 'background:#FF7E65' : ''
    },
    form5ok () {
      return 1<2 ? 'background: #FF7E65' : ''
    },
    form6ok () {
      return this.$store.state.eventoData.title !== '' ? 'background: #FF7E65' : ''
    },
    form7ok () {
      return this.$store.state.eventoData.subtitle !== '' ? 'background: #FF7E65' : ''
    },
    form8ok () {
      return 1<2 ? 'background: #FF7E65' : ''
    }
  },
  watch: {
    async authUser (status) {
      if (status === true && this.user.email === 'luiztsmelo@gmail.com') {
        try {
          this.$store.state.eventoData.createdAt = Date.now()

          this.$store.commit('m_loader', true)

          /* Criar evento na Firestore */
          await firebase.firestore().doc(`eventos/${this.$store.state.eventoData.eventoID}`).set(this.$store.state.eventoData)

          /* Ir para página do evento criado */
          this.$router.push('/eventos/' + this.$store.state.eventoData.eventoID)

          /* Resetar eventoData */
          this.$store.dispatch('a_resetEventoData')

          this.$store.commit('m_loader', false)
        } catch (err) {
          this.$store.commit('m_loader', false)
          this.$store.commit('show_alert', {
            type: 'warning',
            title: 'Erro',
            message: 'Falha na criação do anúncio.'
          })
        }
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Erro',
          message: 'Você não possui autorização.'
        })
      }
    },
    hash (value) {
      if (value === `#${this.randomHashs[1]}`) {
        this.$store.commit('m_cadastroEvento1', true)
        this.$store.commit('m_cadastroEvento2', false)
      } 
      if (value === `#${this.randomHashs[2]}`) {
        this.$store.commit('m_cadastroEvento2', true)
        this.$store.commit('m_cadastroEvento3', false)
      } 
      if (value === `#${this.randomHashs[3]}`) {
        this.$store.commit('m_cadastroEvento3', true)
        this.$store.commit('m_cadastroEvento4', false)
      } 
      if (value === `#${this.randomHashs[4]}`) {
        this.$store.commit('m_cadastroEvento4', true)
        this.$store.commit('m_cadastroEvento5', false)
      } 
      if (value === `#${this.randomHashs[5]}`) {
        this.$store.commit('m_cadastroEvento5', true)
        this.$store.commit('m_cadastroEvento6', false)
      } 
      if (value === `#${this.randomHashs[6]}`) {
        this.$store.commit('m_cadastroEvento6', true)
        this.$store.commit('m_cadastroEvento7', false)
      } 
      if (value === `#${this.randomHashs[7]}`) {
        this.$store.commit('m_cadastroEvento7', true)
        this.$store.commit('m_cadastroEvento8', false)
      } 
      if (value === `#${this.randomHashs[8]}`) {
        this.$store.commit('m_cadastroEvento8', true)
      } 
    }
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      try {
        vm.hashEvento()
        vm.$store.commit('m_eventoProgressBar', (100/8))
        if (vm.$store.state.showFoobar === true) {
          vm.$store.commit('m_showFoobar', false)
        }
        if (vm.$store.state.eventoData.eventoID === null) {
          let eventoID = await Math.floor(Math.random() * (9999 - 1000 + 1) + 1000).toString()
          const evento = await firebase.firestore().doc(`eventos/${eventoID}`).get()
          if (evento.exists) {
            do {
              eventoID = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000).toString()
              vm.$store.commit('m_eventoID', eventoID)
            } while (!evento.exists)
          } else {
            vm.$store.commit('m_eventoID', eventoID)
          }
        }
      } catch (err) {
        console.log(err)
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('m_cadastroEvento1', true)
    this.$store.commit('m_cadastroEvento2', false)
    this.$store.commit('m_cadastroEvento3', false)
    this.$store.commit('m_cadastroEvento4', false)
    this.$store.commit('m_cadastroEvento5', false)
    this.$store.commit('m_cadastroEvento6', false)
    this.$store.commit('m_cadastroEvento7', false)
    this.$store.commit('m_cadastroEvento8', false)
    next()
  }
}
</script>

<style scoped>

.anunciar-evento {
  margin-top: var(--navbarHeightMobile);
  transition: var(--pages-transition);
  & .progress-bar {
    position: fixed;
    top: var(--navbarHeightMobile);
    height: 4px;
    z-index: 8888;
    background: var(--colorEvento);
  }
  /* ******************** CADASTRO EVENTO ******************** */
  & .cadastro-evento {
    height: 100%;
    background: white;
    padding: 0 0 6rem 0;
    & .__form-title {
      padding: 2.7rem 7% 1.4rem 7%;
      line-height: 1.25;
      font-size: 29px;
      font-weight: 700;
      z-index: 999;
      user-select: none !important;
    }
    & .__form-text {
      padding: 1rem 7%;
      font-size: 17px;
    }
    & .__form-subtitle {
      padding: 1.5rem 7% 0;
      font-size: 18px;
      font-weight: 600;
      user-select: none;
    }
    & p {
      font-size: 17px;
      padding: .5rem 7% .2rem;
      line-height: 26px;
    }
    & textarea {
      padding: 0 7%;
      margin-bottom: .5rem;
      width: 100%;
      font-size: 17px;
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
      font-size: 17px;
      font-weight: 600;
      color: rgb(92, 92, 92);
    }
    & .item-form {
      padding: 0 7%;
      display: flex;
      flex-flow: column;
      margin: 1.2rem 0;
      & label {
        font-weight: 500;
        font-size: 14px;
        user-select: none;
      }
      & input {
        cursor: text;
        position: relative;
        width: 100%;
        font-size: 18px;
        font-weight: 400;
        background: white;
        color: var(--color01);
        padding: 1rem 0;
        border: none;
        border-bottom: 1px solid #dedede;
        outline: none;
        transition: .2s all ease;
      }
      & input:focus {
        border-bottom: 1px solid var(--color01);
      }
      & select {
        width: 100%;
        font-size: 18px;
        font-weight: 400;
        background: white;
        color: var(--color01);
        padding: 1rem 0;
        border: none;
        border-bottom: 1px solid #dedede;
        outline: none;
        transition: .2s all ease;
      }
      & select:focus {
        border-bottom: 1px solid var(--color01);
      }
    }
    & .add-date {
      margin: .5rem 7% 0;
      font-size: 17px;
      font-weight: 600;
      color: var(--colorEvento);
      background: transparent;
    }
    & .add-date:hover {
      text-decoration: underline;
    }
    & .remove-date {
      margin: 0 7%;
      font-size: 11px;
      font-weight: 600;
      background: transparent;
    }
    & .remove-date:hover {
      text-decoration: underline;
    }
    & .item-form-switches {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.2rem 7%;
      transition: .2s;
      & p {
        padding: 0;
        user-select: none;
        font-size: 17px;
      }
      & .switch {
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        width: 44px;
        min-width: 44px;
        height: 26px;
        background-color: #dedede;
        border-radius: 100px;
        transition: .3s;
        & .slider {
          margin: 2px;
          height: 22px;
          width: 22px;
          border-radius: 50%;
          background: white;
          transition: .3s;
        }
      }
      & .switch-on {
        align-items: flex-end;
        background: var(--colorEvento);
      }
    }
    & .without-address {
      display: inline-flex;
      cursor: pointer;
      user-select: none;
      margin: 0 7%;
      font-size: 16px;
      font-weight: 500;
      color: var(--colorEvento);
      transition: .2s all ease;
    }
    & .without-address:hover {
      text-decoration: underline;
    }
    & .modal-croppa {
      background: rgba(0, 0, 0, 0.8);
      width:  100%;
      height: 100%;
      position: fixed;
      top: 0;
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
          font-size: 32px;
          font-weight: 300;
        }
        & .croppa-container {
          cursor: grab;
          margin: 2rem 0 1.5rem;
          border: 2px dashed white;
        }
        & .croppa-container:active {
          cursor: grabbing;
        }
      }
    }
    & .__aspect-ratio {
      background: #fff;
      border-radius: 50%;
      width: 2.6rem;
      height: 2.6rem;
      font-weight: 500;
      margin-right: 1rem;
    }
    & .__croppa-btn {
      margin: .4rem 1rem;
      font-size: 16px;
      font-weight: 600;
      background: var(--colorEvento);
      color: white;
      height: 2.9rem;
      padding: 0 1.5rem;
      border-radius: 2rem;
    }
    & .add-image-btn {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 1rem;
      font-weight: 600;
      background: transparent;
    }
    & .add-image-btn:hover {
      text-decoration: underline;
    }
    & .image-preview {
      padding: 0 7%;
      display: flex;
      flex-flow: column;
      align-items: center;
      & .__image {
        border-radius: 6px;
        margin-bottom: 1rem;
      }
      & button {
        font-weight: 600;
        background: transparent;
      }
      & button:hover {
        text-decoration: underline;
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
          font-size: 16px;
          font-weight: 600;
          border-radius: 2rem 0 0 2rem;
          background: white;
        }
        & .__next {
          font-size: 16px;
          font-weight: 600;
          border-radius: 0 2rem 2rem 0;
          transition: all .3s ease;
          background: rgb(212,212,212);
          color: white;
        }
      }
    }
  }
}

@media (min-width: 1024px) {
  .anunciar-evento {
    margin-top: var(--navbarHeightDesktop);
    & .progress-bar {
      top: var(--navbarHeightDesktop);
      height: 6px;
    }
    & .cadastro-evento {
      padding: 0 0 9rem 0;
      & .__form-title {
        padding: 3.5rem 28% 1.3rem;
        font-size: 32px;
        font-weight: 700;
        text-align: center;
      }
      & .__form-text {
        padding: 1.6rem 28% 1rem;
      }
      & .__form-subtitle {
        padding: 1.7rem 28% .3rem;
        font-size: 18px;
      }
      & p {
        font-size: 17px;
        padding: .4rem 28%;
      }
      & textarea {
        padding: 0 28%;
        margin: 1.7rem 0 .6rem 0;
      }
      & .__lenght-calc {
        padding: 0 28%;
      }
      & .item-form {
        padding: 0 28%;
        margin: 1.3rem 0;
        & label {
          font-size: 15px;
        }
        & input {
        }
        & input:hover {
          border-bottom: 1px solid var(--color01);
        }
        & select {
        }
        & select:hover {
          border-bottom: 1px solid var(--color01);
        }
      }
      & .add-date {
        margin: .5rem 28% 0;
      }
      & .remove-date {
        margin: 0 28%;
      }
      & .item-form-switches {
        padding: 1.8rem 28%;
      }
      & .without-address {
        margin: 0 28%;
      }
      & .modal-croppa {
        & .modal-croppa-body {
          & h1 {
          }
          & .croppa-container {
          }
        }
      }
      & .__croppa-btn {
      }
      & .image-preview {
        padding: 0 32%;
      }
      & .center-first-image {
        flex-flow: column wrap;
      }
      & .back-next {
        bottom: 2rem;
        height: 2.9rem;
        width: 24%;
        box-shadow: 3px 3px 20px 1px rgba(0,0,0,0.18);
        & .back-next-body {
          & button {
            height: 2.9rem;
          }
          & .__back {
            font-size: 17px;
            font-weight: 500;
          }
          & .__next {
            font-size: 17px;
            font-weight: 600;
          }
        }
      }
    }
  }
}

</style>
