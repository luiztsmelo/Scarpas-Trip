<template>
  <div class="anunciar-passeio">


    <!-- PLANO PASSEIO MOBILE -->
    <div class="plano-passeio-mobile" v-if="$store.state.cadastroPasseio0">
      
      <img class="__img-header" src="../../../assets/img/anuncio-passeio.svg">
      
      <h1 class="__title">Ainda gasta anunciando seu passeio? Aqui é gratuito.</h1>
      

      <button class="__anunciar-btn" @click="$store.commit('m_cadastroPasseio1', true), $store.commit('m_cadastroPasseio0', false), $store.commit('m_passeioProgressBar', (100/11)), hashPasseio()">Anunciar</button>

    </div><!-- PLANO PASSEIO MOBILE -->


    <!-- PLANO PASSEIO DESKTOP -->
    <div class="plano-passeio-desktop" v-if="$store.state.cadastroPasseio0">
      
      <img class="__img-header" src="../../../assets/img/anuncio-passeio.svg">

      <div class="flex1">
        <h1 class="__title">Ainda paga para anunciar seu passeio?</h1>
        <h1 class="__subtitle">Aqui é gratuito.</h1>

        <h3 class="__text">Além disso...</h3>
        

        <button class="__anunciar-btn" @click="$store.commit('m_cadastroPasseio1', true), $store.commit('m_cadastroPasseio0', false), $store.commit('m_passeioProgressBar', (100/11)), hashPasseio()">Anunciar</button>
      </div>

    </div><!-- PLANO PASSEIO DESKTOP -->





    <div class="progress-bar" v-if="!$store.state.cadastroPasseio0" :style="'width:' + $store.state.passeioProgressBar + '%'"></div>






    <!-- CADASTRO PASSEIO -->





    <!-- ________________________________________ 1 - TIPO DE PASSEIO ________________________________________ -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio1">

      <h1 class="__form-title">Que tipo de passeio deseja anunciar?</h1>

      <div class="item-form">
        <label>Tipo</label>
        <select v-model="$store.state.passeioData.tipoPasseio">
          <option>Lancha</option>
          <option>4x4</option>
          <option>Buggy</option>
          <option>Helicóptero</option>
        </select>
      </div> 

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn1">Voltar</button>
          <button type="button" class="__next" :style="form1ok" @click="nextBtn1">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 1 - TIPO DE PASSEIO ________________________________________ -->







    <!-- ________________________________________ 2 - CAPACIDADE ________________________________________ -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio2">

      <h1 class="__form-title">Passeio para até quantas pessoas?</h1>

      <div class="item-form">
        <label>Capacidade</label>
        <select v-model="$store.state.passeioData.capacidade">
          <option v-for="n in 25" :value="n">{{ n }}</option>
        </select>
      </div> 


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn2">Voltar</button>
          <button type="button" class="__next" :style="form2ok" @click="nextBtn2">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 2 - CAPACIDADE ________________________________________ -->







    <!-- ________________________________________ 3 - DURAÇÃO ________________________________________ -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio3">

      <h1 class="__form-title">Qual o tempo de duração do passeio?</h1>

      <div class="item-form">
        <label>Duração</label>
        <input type="time" v-model="$store.state.passeioData.duracao" required>
      </div> 


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn3">Voltar</button>
          <button type="button" class="__next" :style="form3ok" @click="nextBtn3">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 3 - DURAÇÃO ________________________________________ -->







    <!-- ________________________________________ 4 - LOCAL DE SAÍDA ________________________________________ -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio4">

      <h1 class="__form-title">O passeio sai de onde?</h1>

      <div class="item-form">
        <label>Local de Saída</label>
        <select v-model="$store.state.passeioData.localSaida" @input="setLocalSaida" v-if="$store.state.passeioData.localSaida !== 'Outro'">
          <option>Capitólio</option>
          <option>Escarpas do Lago</option>
          <option>Ponte do Turvo</option>
          <option>Barragem do Dique</option>
          <option>Kanto da Ilha</option>
          <option>Outro</option>
        </select>
        <textarea class="__local-saida-text" v-model="localSaida" rows="1" v-if="$store.state.passeioData.localSaida === 'Outro'" autofocus></textarea>
      </div> 


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn4">Voltar</button>
          <button type="button" class="__next" :style="form4ok" @click="nextBtn4">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 4 - LOCAL DE SAÍDA ________________________________________ -->







    <!-- ________________________________________ 5 - PONTOS VISITADOS ________________________________________ -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio5">

      <h1 class="__form-title">Quais pontos turísticos são visitados?</h1>

 

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn5">Voltar</button>
          <button type="button" class="__next" :style="form5ok" @click="nextBtn5">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 5 - PONTOS VISITADOS ________________________________________ -->







    <!-- ________________________________________ 6 - VALOR ________________________________________ -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio6">

      <h1 class="__form-title">Quanto você cobra por pessoa?</h1>

      <div class="item-form">
        <label>Valor</label>
        <money 
          v-model="$store.state.passeioData.valorPasseio"
          onKeyPress="if (event.which == 13) return false"
          @keyup.enter="nextBtn6">
        </money>
      </div>


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn6">Voltar</button>
          <button type="button" class="__next" :style="form6ok" @click="nextBtn6">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 6 - VALOR ________________________________________ -->







    <!-- ________________________________________ 7 - IMAGENS ________________________________________ -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio7">

      <h1 class="__form-title">Adicione imagens</h1>


      <div class="modal-croppa" v-show="showCroppaModal" @click="showCroppaModal=false">
        <div class="modal-croppa-body" @click.stop>
          <h1>Ajustar imagem</h1>
          <croppa
            ref="myCroppa"
            @file-choose="showCroppaModal = true"
            :width="$store.state.isMobile ? 639/2 : 639"
            :height="$store.state.isMobile ? 426/2 : 426"
            :quality="$store.state.isMobile ? 2 : 1"
            :placeholder="'Carregando...'"
            :placeholder-color="'white'"
            :accept="'.jpg, .jpeg, .png, .webp'"
            :zoom-speed="$store.state.isMobile ? 2 : 4"
            :prevent-white-space="true"
            :show-remove-button="false">
          </croppa>
          <button class="__croppa-btn" type="button" @click="showCroppaModal=false, imageConfirm()">Confirmar</button>
        </div>
      </div>


      <!-- Preview images -->
      <div class="after-choose-image" :class="[ $store.state.passeioData.images.length == 0 ? 'center-first-image' : '' ]">

        <div class="image-box" v-for="(image, index) in $store.state.passeioData.images">
          <div class="delete" @click="!isUploading ? deleteImage(image, index) : ''">
            <img src="../../../assets/img/delete.svg" class="__delete-img">
          </div>
          <progressive-background class="__image" :src="image.HJ" :placeholder="image.L" :aspect-ratio="2/3"/>
        </div>


        <div class="image-box __add-image" @click="!isUploading ? $refs.myCroppa.chooseFile() : ''">
          <svg class="loader-svg" v-if="isUploading">
            <circle
              class="__circle"
              :stroke-width="$store.state.isMobile ? 3 : 4"
              stroke="#161616"
              :stroke-dasharray="$store.state.isMobile ? `${14.5*2*Math.PI} ${14.5*2*Math.PI}` : `${18*2*Math.PI} ${18*2*Math.PI}`"
              :stroke-dashoffset="$store.state.isMobile ? 14.5*2*Math.PI - this.uploadProgress/100*14.5*2*Math.PI : 18*2*Math.PI - this.uploadProgress/100*18*2*Math.PI"
              fill="transparent"
              :r="$store.state.isMobile ? 14.5 : 18"
              :cx="$store.state.isMobile ? 16 : 20"
              :cy="$store.state.isMobile ? 16 : 20"
            />
          </svg>
          <img src="../../../assets/img/add-image.svg" class="__add-image-svg" v-else>
          <progressive-background src="../../../assets/img/add-image.png" :aspect-ratio="2/3"/>
        </div>

      </div><!-- Preview images -->


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn7">Voltar</button>
          <button type="button" class="__next" :style="form7ok" @click="nextBtn7">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 7 - IMAGENS ________________________________________ -->







    <!-- ________________________________________ 8 - TÍTULO ________________________________________ -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio8">

      <h1 class="__form-title">Dê um título para seu passeio</h1>

      <textarea 
      v-model="$store.state.passeioData.title"
      v-autosize="title"
      maxlength="60"
      rows="1"
      placeholder="ex: Passeio de Lancha no Lago de Furnas"
      required>
      {{title}}</textarea>

      <span class="__lenght-calc">{{ 60 - this.$store.state.passeioData.title.length }}</span>


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn8">Voltar</button>
          <button type="button" class="__next" :style="form8ok" @click="nextBtn8">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 8 - TÍTULO ________________________________________ -->







    <!-- ________________________________________ 9 - DESCRIÇÃO ________________________________________ -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio9">

      <h1 class="__form-title">Descreva seu passeio</h1>   

      <textarea 
      v-model="$store.state.passeioData.subtitle"
      v-autosize="subtitle"
      maxlength="1000"
      rows="1"
      placeholder="Coloque informações importantes aqui, que não foram perguntadas antes"
      required>
      {{subtitle}}</textarea>

      <span class="__lenght-calc">{{ 1000 - this.$store.state.passeioData.subtitle.length }}</span> 


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn9">Voltar</button>
          <button type="button" class="__next" :style="form9ok" @click="nextBtn9">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 9 - DESCRIÇÃO ________________________________________ -->








    <!-- ________________________________________ 10 - CADASTRO ________________________________________ -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio10">

      <h1 class="__form-title">
        {{ !authUser ? 'Antes de continuar, precisamos de seu cadastro' : `Ótimo ${user.firstName}, só mais uma informação` }}
      </h1> 


      <div class="signin-btns" v-if="!authUser">
        <button type="button" class="google-btn" @click="$store.dispatch('a_googleSignIn')">Continuar com Google</button>
        <button type="button" class="facebook-btn" @click="$store.dispatch('a_facebookSignIn')">Continuar com Facebook</button>
      </div>


      <h4 class="__termos" style="padding-top:1rem" v-if="!authUser">Ao se cadastrar com uma das opções acima, somente seu e-mail, nome e foto de perfil serão requisitados. Para mais informações, leia nossa <nuxt-link to="/termos#politica_privacidade">Política de Privacidade</nuxt-link>.</h4>


      <div v-if="authUser">

        <div class="item-form">
          <label>Celular / WhatsApp</label>
          <masked-input
            type="tel"
            v-model="$store.state.passeioData.celular"
            :mask="['+', 5, 5, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]"
            :guide="false"
            placeholder="+55">
          </masked-input>
        </div>

      </div>


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn10">Voltar</button>
          <button type="button" class="__next" :style="form10ok" @click="nextBtn10">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 10 - CADASTRO ________________________________________ -->







    <!-- ________________________________________ 11 - PAGAMENTO ________________________________________ -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio11">

      <h1 class="__form-title">Pagamento</h1>

      <h3 class="__form-text">{{ user.firstName }}, será cobrada uma mensalidade de <span style="font-weight:600">R$49,00</span> em seu cartão de crédito. Não se preocupe, não cobramos multa em caso de cancelamento.</h3>


      <div class="payment-box">
        

        <!-- CARD HOLDER NAME -->
        <div class="item-form">
          <label :class="[ cardHolderNameError ? 'has-error-label' : '' ]">Nome impresso no Cartão</label>
          <input
            :class="[ cardHolderNameError ? 'has-error' : '' ]"
            type="text" pattern="[A-Za-z]"
            @keypress="keyEnterName"
            v-model="$store.state.creditCard.cardHolderName">
        </div><!-- CARD HOLDER NAME -->


        <!-- CARD NUMBER -->
        <div class="item-form">
          <label :class="[ cardNumberError ? 'has-error-label' : '' ]">Número do Cartão</label>
          <masked-input
            ref="cardNumber"
            :style="{ backgroundImage: 'url(' + cardBrand + ')', backgroundPosition: 'left center', backgroundRepeat: 'no-repeat', backgroundSize: '34px', paddingLeft: cardType !== null ? '48px' : '' }"
            :class="[ cardNumberError ? 'has-error' : '' ]"
            type="tel"
            v-model="$store.state.creditCard.cardNumber"
            :mask="[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]"
            :guide="false"
            placeholder="0000 0000 0000 0000">
          </masked-input>
        </div><!-- CARD NUMBER -->


        <div style="display:flex; justify-content:space-between">
                
          <!-- CARD EXPIRATION -->
          <div class="item-form" style="flex: 50%; padding-right:.7rem">
            <label :class="[ cardExpirationDateError ? 'has-error-label' : '' ]">Validade</label>
            <masked-input
              ref="cardExpirationDate"
              :class="[ cardExpirationDateError ? 'has-error' : '' ]"
              type="tel"
              v-model="$store.state.creditCard.cardExpirationDate"
              :mask="[/\d/, /\d/, ' ', '/', ' ', /\d/, /\d/]"
              :guide="false"
              placeholder="MM / AA">
            </masked-input>
          </div><!-- CARD EXPIRATION -->

          <!-- CVV -->
          <div class="item-form" style="flex:50%; padding-left:.7rem">
            <label :class="[ cardCvvError ? 'has-error-label' : '' ]">CVV</label>
            <masked-input
              ref="cvv"
              :class="[ cardCvvError ? 'has-error' : '' ]"
              type="tel"
              @keypress="keyEnterCVV"
              v-model="$store.state.creditCard.cardCVV"
              :mask="[/\d/, /\d/, /\d/, /\d/]"
              :guide="false"
              placeholder="123">
            </masked-input>
          </div><!-- CVV -->

        </div>


        <!-- CPF -->
        <div class="item-form">
          <label :class="[ cpfError ? 'has-error-label' : '' ]">CPF</label>
          <masked-input
            ref="cpf"
            :class="[ cpfError ? 'has-error' : '' ]"
            type="tel"
            v-model="$store.state.customer.cpf"
            :mask="[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]"
            :guide="false"
            placeholder="000.000.000-00">
          </masked-input>
        </div><!-- CPF -->


        <h4 class="__termos">Ao anunciar, você concorda com a nossa <a href="/termos#politica_privacidade" target="_blank">Política de Privacidade</a> e <a href="/termos" target="_blank">Termos de Serviço</a>.</h4>

      </div> 


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn11">Voltar</button>
          <button type="button" class="__next" :style="form11ok" @click="concluir">Anunciar</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 11 - PAGAMENTO ________________________________________ -->




    <!-- CADASTRO PASSEIO -->

  </div>
</template>

<script>
import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import MaskedInput from 'vue-text-mask'
import { bancos } from '../../../mixins/bancos'
import valid from 'card-validator'
import CPF from 'gerador-validador-cpf'
import scrollIntoView from 'scroll-into-view'

export default {
  components: { MaskedInput },
  mixins: [ bancos ],
  head () {
    return {
      title: 'Anunciar Passeio em Capitólio ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
  data () {
    return {
      title: '', /* Vue Autosize */
      subtitle: '', /* Vue Autosize */
      localSaida: '',
      showCroppaModal: false,
      isUploading: false,
      uploadProgress: 0,
      cpfError: false,
      cardNumberError: false,
      cardHolderNameError: false,
      cardExpirationDateError: false,
      cardCvvError: false
    }
  },
  methods: {
    keyEnterName () {
      if (event.key === 'Enter') {
        scrollIntoView(this.$refs.cardNumber.$el)
        this.$refs.cardNumber.$el.focus()
      }
    },
    keyEnterCVV () {
      if (event.key === 'Enter') {
        scrollIntoView(this.$refs.cpf.$el)
        this.$refs.cpf.$el.focus()
      }
    },
    scrollTop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    /* ******************** IMAGE INPUT ******************** */
    async imageConfirm () {
      try {
        this.isUploading = true

        /* Storage path */
        const storageRef = firebase.storage().ref('passeios/' + this.$store.state.passeioData.passeioID + '/')

        let blobL = await this.$refs.myCroppa.promisedBlob('image/jpeg', 0.01)
        let blobHJ = await this.$refs.myCroppa.promisedBlob('image/jpeg')
        let blobHW = await this.$refs.myCroppa.promisedBlob('image/webp')
        
        this.uploadProgress = 96

        let n = this.$store.state.imageCountPas
        let key = this.$store.state.passeioData.images.length

        /* Criar objeto em branco para receber a imagem */
        this.$store.state.passeioData.images.push({ id: null, L: null, HJ: null, HW: null })

        /* Upload image L */
        await storageRef.child('L' + n + '.jpeg').put(blobL)
        this.$store.state.passeioData.images[key].L = await storageRef.child('L' + n + '.jpeg').getDownloadURL()
        this.uploadProgress = 98
        
        /* Upload image HJ */
        await storageRef.child('H' + n + 'J.jpeg').put(blobHJ)
        this.$store.state.passeioData.images[key].HJ = await storageRef.child('H' + n + 'J.jpeg').getDownloadURL()
        this.uploadProgress = 99

        /* Upload image HW */
        await storageRef.child('H' + n + 'W.webp').put(blobHW)
        this.$store.state.passeioData.images[key].HW = await storageRef.child('H' + n + 'W.webp').getDownloadURL()
        this.uploadProgress = 100


        /* Definir id da imagem */
        this.$store.state.passeioData.images[key].id = n

        /* Remover imagem do croppa */
        this.$refs.myCroppa.remove()
        
        /* Incrementar n */
        this.$store.commit('m_imageCountPas')

        this.isUploading = false
        this.uploadProgress = 0
      } catch (err) {
        console.log(err)
        this.isUploading = false
        this.uploadProgress = 0
      }
    },
    deleteImage (image, index) {
      const storageRef = firebase.storage().ref('passeios/' + this.$store.state.passeioData.passeioID + '/')
      storageRef.child('L' + image.id + '.jpeg').delete()
      storageRef.child('H' + image.id + 'J.jpeg').delete()
      storageRef.child('H' + image.id + 'W.webp').delete()
      this.$store.state.passeioData.images.splice(index, 1)
      this.$refs.myCroppa.remove()
    },
    /* ******************** LOCAL SAÍDA ******************** */
    setLocalSaida (e) {
      this.$store.commit('m_localSaida', e.target.value)
    },
    /* ******************** BACK BUTTONS ******************** */
    backBtn1 () {
      this.$store.commit('m_cadastroPasseio1', false), this.$store.commit('m_cadastroPasseio0', true), window.history.back(1)
    },
    backBtn2 () {
      this.$store.commit('m_cadastroPasseio2', false), this.$store.commit('m_cadastroPasseio1', true), window.history.back(1)
    },
    backBtn3 () {
      this.$store.commit('m_cadastroPasseio3', false), this.$store.commit('m_cadastroPasseio2', true), window.history.back(1)
    },
    backBtn4 () {
      this.$store.commit('m_cadastroPasseio4', false), this.$store.commit('m_cadastroPasseio3', true), window.history.back(1)
    },
    backBtn5 () {
      this.$store.commit('m_cadastroPasseio5', false), this.$store.commit('m_cadastroPasseio4', true), window.history.back(1)
    },
    backBtn6 () {
      this.$store.commit('m_cadastroPasseio6', false), this.$store.commit('m_cadastroPasseio5', true), window.history.back(1)
    },
    backBtn7 () {
      this.$store.commit('m_cadastroPasseio7', false), this.$store.commit('m_cadastroPasseio6', true), window.history.back(1)
    },
    backBtn8 () {
      this.$store.commit('m_cadastroPasseio8', false), this.$store.commit('m_cadastroPasseio7', true), window.history.back(1)
    },
    backBtn9 () {
      this.$store.commit('m_cadastroPasseio9', false), this.$store.commit('m_cadastroPasseio8', true), window.history.back(1)
    },
    backBtn10 () {
      this.$store.commit('m_cadastroPasseio10', false), this.$store.commit('m_cadastroPasseio9', true), window.history.back(1)
    },
    backBtn11 () {
      this.$store.commit('m_cadastroPasseio11', false), this.$store.commit('m_cadastroPasseio10', true), window.history.back(1)
    },
    /* ******************** NEXT BUTTONS ******************** */
    hashPasseio () {
      this.$store.dispatch('a_generateRandomHashs')
      window.location.hash = this.randomHashs[1]
    },
    nextBtn1 () {
      if (this.$store.state.passeioData.tipoPasseio !== null) {
        this.$store.commit('m_cadastroPasseio1', false), this.$store.commit('m_cadastroPasseio2', true), this.$store.commit('m_passeioProgressBar', (100/11)*2), this.scrollTop(), window.location.hash = `${this.randomHashs[2]}`
      }
    },
    nextBtn2 () {
      if (this.$store.state.passeioData.capacidade !== null) {
        this.$store.commit('m_cadastroPasseio2', false), this.$store.commit('m_cadastroPasseio3', true), this.$store.commit('m_passeioProgressBar', (100/11)*3), this.scrollTop(), window.location.hash = `${this.randomHashs[3]}`
      }
    },
    nextBtn3 () {
      if (this.$store.state.passeioData.duracao !== null) {
        this.$store.commit('m_cadastroPasseio3', false), this.$store.commit('m_cadastroPasseio4', true), this.$store.commit('m_passeioProgressBar', (100/11)*4), this.scrollTop(), window.location.hash = `${this.randomHashs[4]}`
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione a duração do passeio.'
        })
      }
    },
    nextBtn4 () {
      if (this.$store.state.passeioData.localSaida !== null && this.$store.state.passeioData.localSaida !== 'Outro') {
        this.$store.commit('m_cadastroPasseio4', false), this.$store.commit('m_cadastroPasseio5', true), this.$store.commit('m_passeioProgressBar', (100/11)*5), this.scrollTop(), window.location.hash = `${this.randomHashs[5]}`
      } else if (this.localSaida !== '') {
        this.$store.commit('m_cadastroPasseio4', false), this.$store.commit('m_cadastroPasseio5', true), this.$store.commit('m_passeioProgressBar', (100/11)*5), this.$store.commit('m_localSaida', this.localSaida), this.scrollTop(), window.location.hash = `${this.randomHashs[5]}`
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione o local de saída do passeio.'
        })
      }
    },
    nextBtn5 () {
      if (1<2) {
        this.$store.commit('m_cadastroPasseio5', false), this.$store.commit('m_cadastroPasseio6', true), this.$store.commit('m_passeioProgressBar', (100/11)*6), this.scrollTop(), window.location.hash = `${this.randomHashs[6]}`
      }
    },
    nextBtn6 () {
      if (this.$store.state.passeioData.valorPasseio !== 0) {
        this.$store.commit('m_cadastroPasseio6', false), this.$store.commit('m_cadastroPasseio7', true), this.$store.commit('m_passeioProgressBar', (100/11)*7), this.scrollTop(), window.location.hash = `${this.randomHashs[7]}`
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione o valor por pessoa.'
        })
      }
    },
    nextBtn7 () {
      if (this.imageURL1 !== null) {
        this.$store.commit('m_cadastroPasseio7', false), this.$store.commit('m_cadastroPasseio8', true), this.$store.commit('m_passeioProgressBar', (100/11)*8), this.scrollTop(), window.location.hash = `${this.randomHashs[8]}`
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione pelo menos 3 imagens.'
        })
      }
    },
    nextBtn8 () {
      if (this.$store.state.passeioData.title !== '') {
        this.$store.commit('m_cadastroPasseio8', false), this.$store.commit('m_cadastroPasseio9', true), this.$store.commit('m_passeioProgressBar', (100/11)*9), this.scrollTop(), window.location.hash = `${this.randomHashs[9]}`
      }
    },
    nextBtn9 () {
      if (this.$store.state.passeioData.subtitle !== '') {
        this.$store.commit('m_cadastroPasseio9', false), this.$store.commit('m_cadastroPasseio10', true), this.$store.commit('m_passeioProgressBar', (100/11)*10), this.scrollTop(), window.location.hash = `${this.randomHashs[10]}`
      }
    },
    nextBtn10 () {
      if (!this.authUser) {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Conecte-se com uma de suas contas para continuar.'
        })
      } else if (this.$store.state.passeioData.celular.length === 17 && this.authUser) {
          this.$store.commit('m_cadastroPasseio10', false)
          this.$store.commit('m_cadastroPasseio11', true)
          this.$store.commit('m_passeioProgressBar', (100/11)*11)
          this.scrollTop()
          window.location.hash = `${this.randomHashs[11]}`
          this.$store.state.creditCard.cardHolderName = this.user.fullName
          this.$store.state.customer.name = this.user.fullName
          this.$store.state.customer.email = this.user.email
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione um número válido.'
        })
      }
    },
    async concluir () {
      const passeioData = this.$store.state.passeioData

      passeioData.createdAt = Date.now()

      passeioData.hostID = this.user.userID

      /* Se todas as informações preenchidas */
      if (this.cardHolderName !== '' && valid.number(this.cardNumber).isValid && valid.expirationDate(this.cardExpirationDate).isValid && valid.cvv(this.cardCVV).isValid && CPF.validate(this.cpf) && this.cpf.length === 14) {

        try {
          this.$store.commit('m_loader', true)

          /* Criar assinatura no Pagarme, criar passeio na Firestore e atualizar user */
          const subscription = await firebase.functions().httpsCallable('newPasseio')({
            passeioData: passeioData,
            creditCard: this.$store.state.creditCard,
            customer: this.$store.state.customer
          })

          console.log(subscription)

          /* Necessário para o correto funcionamento do backBtn _id (Ver middleware: newAcomodConcludedCheck.js) */
          this.$store.state.concludedNewAcomod = true
          
          /* Ir para página do passeio criado */
          this.$router.push('/passeios/' + passeioData.passeioID)

          /* Resetar passeioData */
          this.$store.dispatch('a_resetPasseioData')

          this.$store.commit('m_loader', false)

        } catch (err) {
          this.$store.commit('m_loader', false)
          console.log(err)
          this.$store.commit('show_alert', {
            type: 'warning',
            title: 'Erro',
            message: 'Falha no servidor. Tente novamente.'
          })
        }
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Erro',
          message: 'Informações incompletas.'
        })
        this.cardHolderName.length < 3 ? this.cardHolderNameError = true : this.cardHolderNameError = false
        !valid.number(this.cardNumber).isValid ? this.cardNumberError = true : this.cardNumberError = false
        !valid.expirationDate(this.cardExpirationDate).isValid ?  this.cardExpirationDateError = true :  this.cardExpirationDateError = false
        !valid.cvv(this.cardCVV).isValid ? this.cardCvvError = true : this.cardCvvError = false
        this.cpf.length < 14 || !CPF.validate(this.cpf) ? this.cpfError = true : this.cpfError = false
      }
    },
  },
  computed: {
    /* ******************** PATHS ******************** */
    user () { return this.$store.state.user },
    authUser () { return this.$store.state.authUser },
    hash () { return this.$route.hash },
    randomHashs () { return this.$store.state.randomHashs },
    creditCard () { return this.$store.state.creditCard },
    cardNumber () { return this.$store.state.creditCard.cardNumber },
    cardHolderName () { return this.$store.state.creditCard.cardHolderName },
    cardExpirationDate () { return this.$store.state.creditCard.cardExpirationDate },
    cardCVV () { return this.$store.state.creditCard.cardCVV },
    cardType () { return this.$store.state.cardType },
    cpf () { return this.$store.state.customer.cpf },
    /* ******************** CREDIT CARD ******************** */
    cardBrand () {
      const cardType = this.$store.state.cardType
      return cardType === 'visa' ? require('@/assets/img/visa.svg')
           : cardType === 'mastercard' ? require('@/assets/img/mastercard.svg')
           : cardType === 'american-express' ? require('@/assets/img/amex.svg')
           : cardType === 'elo' ? require('@/assets/img/elo.svg')
           : cardType === 'discover' ? require('@/assets/img/discover.svg')
           : cardType === 'diners-club' ? require('@/assets/img/diners.svg')
           : cardType === 'jcb' ? require('@/assets/img/jcb.svg')
           : ''
    },
    /* ******************** FORM STYLES ******************** */
    form1ok () {
      return this.$store.state.passeioData.tipoPasseio !== null ? 'background: #198CFE' : ''
    },
    form2ok () {
      return this.$store.state.passeioData.capacidade !== null ? 'background: #198CFE' : ''
    },
    form3ok () {
      return this.$store.state.passeioData.duracao !== null ? 'background: #198CFE' : ''
    },
    form4ok () {
      return this.$store.state.passeioData.localSaida !== null && this.$store.state.passeioData.localSaida !== 'Outro' ? 'background: #198CFE'
      : this.localSaida !== '' ? 'background: #198CFE' 
      : ''
    },
    form5ok () {
      return 1<2 ? 'background: #198CFE' : ''
    },
    form6ok () {
      return this.$store.state.passeioData.valorPasseio !== 0 ? 'background: #198CFE' : ''
    },
    form7ok () {
      return this.$store.state.passeioData.images.length >= 1 ? 'background: #198CFE' : ''
    },
    form8ok () {
      return this.$store.state.passeioData.title !== '' ? 'background: #198CFE' : ''
    },
    form9ok () {
      return this.$store.state.passeioData.subtitle !== '' ? 'background: #198CFE' : ''
    },
    form10ok () {
      return this.$store.state.passeioData.celular.length === 17 && this.authUser ? 'background: #198CFE' : ''
    },
    form11ok () {
      if (this.cardHolderName !== '' && valid.number(this.cardNumber).isValid && valid.expirationDate(this.cardExpirationDate).isValid && valid.cvv(this.cardCVV).isValid && CPF.validate(this.cpf) && this.cpf.length === 14) {
        return 'background: #198CFE'
      }
    }
  },
  watch: {
    cardNumber (value) {
      const cardNumber = valid.number(value)
      cardNumber.isPotentiallyValid ? this.cardNumberError = false : this.cardNumberError = true
      if (cardNumber.card) {
        if (cardNumber.card.type === 'american-express' ? value.length === 18 : value.length === 19) {
          if (cardNumber.isValid) {
            this.cardNumberError = false
            this.$nextTick(() => {
              scrollIntoView(this.$refs.cardExpirationDate.$el)
              this.$refs.cardExpirationDate.$el.focus()
            })
          } else {
            this.cardNumberError = true
            this.$store.commit('show_alert', {
              type: 'warning',
              title: 'Erro',
              message: 'Número inválido.',
            })
          }
        }
        this.$store.state.cardType = cardNumber.card.type
        this.$store.state.cardTypeNice = cardNumber.card.niceType
      }
    },
    cardExpirationDate (value) {
      const firstDigit = value.charAt(0)
      firstDigit > 1 ? this.$store.state.creditCard.cardExpirationDate = `0${firstDigit} / ` : ''
      const cardExpirationDate = valid.expirationDate(value)
      if (cardExpirationDate.isPotentiallyValid) {
        this.cardExpirationDateError = false
      } else {
        this.cardExpirationDateError = true
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Erro',
          message: 'Data inválida.'
        })
      }
      cardExpirationDate.isValid ? this.$refs.cvv.$el.focus() : ''
    },
    cardCVV (value) {
      const cardCVV = valid.cvv(value)
      if (cardCVV.isPotentiallyValid) {
        this.cardCvvError = false
      } else {
        this.cardCvvError = true
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Erro',
          message: 'Código de segurança inválido.'
        })
      }
    },
    cpf (value) {
      value !== '' ? this.cpfError = false : '' 
      if (value.length === 14) {
        if (CPF.validate(value)) {
          this.cpfError = false
        } else {
          this.cpfError = true
          this.$store.commit('show_alert', {
            type: 'warning',
            title: 'Erro',
            message: 'CPF inválido.',
          })
        }
      }
    },
    hash (value) {
      if (value === '') {
        if (this.$store.state.lastHash === `#${this.randomHashs[1]}`) {
          this.$store.commit('m_cadastroPasseio0', true)
          this.$store.commit('m_cadastroPasseio1', false)
        } else {
          this.$store.commit('m_cadastroPasseio1', false)
          this.$store.commit('m_cadastroPasseio2', false)
          this.$store.commit('m_cadastroPasseio3', false)
          this.$store.commit('m_cadastroPasseio4', false)
          this.$store.commit('m_cadastroPasseio5', false)
          this.$store.commit('m_cadastroPasseio6', false)
          this.$store.commit('m_cadastroPasseio7', false)
          this.$store.commit('m_cadastroPasseio8', false)
          this.$store.commit('m_cadastroPasseio9', false)
          this.$store.commit('m_cadastroPasseio10', false)
          this.$store.commit('m_cadastroPasseio11', false)
        }
      } 
      if (value === `#${this.randomHashs[1]}`) {
        this.$store.commit('m_cadastroPasseio1', true)
        this.$store.commit('m_cadastroPasseio2', false)
      } 
      if (value === `#${this.randomHashs[2]}`) {
        this.$store.commit('m_cadastroPasseio2', true)
        this.$store.commit('m_cadastroPasseio3', false)
      } 
      if (value === `#${this.randomHashs[3]}`) {
        this.$store.commit('m_cadastroPasseio3', true)
        this.$store.commit('m_cadastroPasseio4', false)
      } 
      if (value === `#${this.randomHashs[4]}`) {
        this.$store.commit('m_cadastroPasseio4', true)
        this.$store.commit('m_cadastroPasseio5', false)
      } 
      if (value === `#${this.randomHashs[5]}`) {
        this.$store.commit('m_cadastroPasseio5', true)
        this.$store.commit('m_cadastroPasseio6', false)
      } 
      if (value === `#${this.randomHashs[6]}`) {
        this.$store.commit('m_cadastroPasseio6', true)
        this.$store.commit('m_cadastroPasseio7', false)
      } 
      if (value === `#${this.randomHashs[7]}`) {
        this.$store.commit('m_cadastroPasseio7', true)
        this.$store.commit('m_cadastroPasseio8', false)
      } 
      if (value === `#${this.randomHashs[8]}`) {
        this.$store.commit('m_cadastroPasseio8', true)
        this.$store.commit('m_cadastroPasseio9', false)
      } 
      if (value === `#${this.randomHashs[9]}`) {
        this.$store.commit('m_cadastroPasseio9', true)
        this.$store.commit('m_cadastroPasseio10', false)
      } 
      if (value === `#${this.randomHashs[10]}`) {
        this.$store.commit('m_cadastroPasseio10', true)
        this.$store.commit('m_cadastroPasseio11', false)
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      try {
        if (vm.$store.state.showFoobar === true) {
          vm.$store.commit('m_showFoobar', false)
        }
        if (vm.$store.state.passeioData.passeioID === null) {
          let passeioID = await Math.floor(Math.random() * (9999 - 1000 + 1) + 1000).toString()
          const passeio = await firebase.firestore().doc(`passeios/${passeioID}`).get()
          if (passeio.exists) {
            do {
              passeioID = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000).toString()
              vm.$store.commit('m_passeioID', passeioID)
            } while (!passeio.exists)
          } else {
            vm.$store.commit('m_passeioID', passeioID)
          }
        }
      } catch (err) {
        console.log(err)
      }
    })
  }
}
</script>

<style>

.anunciar-passeio {
  margin-top: var(--navbarHeightMobile);
  transition: var(--pages-transition);
  & .progress-bar {
    position: fixed;
    top: var(--navbarHeightMobile);
    height: 4px;
    z-index: 8888;
    background: var(--colorPasseio);
    transition: var(--main-transition);
  }
  /* ******************** PLANO PASSEIO ******************** */
  & .plano-passeio-mobile {
    display: flex;
    flex-flow: column;
    align-items: center;
    & .__img-header {
      margin: 3rem 0 2rem 0;
      width: 7rem;
      height: auto;
    }
    & .__title {
      font-size: 28px;
      font-weight: 700;
      padding: 0 7%;
      text-align: center;
    }
    & .__anunciar-btn {
      position: fixed;
      bottom: 1rem;
      left: 0;
      right: 0;
      margin: auto;
      height: 3rem;
      color: white;
      width: 13rem;
      background: var(--colorPasseio);
      border-radius: 2rem;
      font-size: var(--fontSizeAnuncioText);
      font-weight: 600;
      box-shadow: 3px 3px 20px 1px rgba(0,0,0,0.18);
    }
  }
  & .plano-passeio-desktop {
    display: none;
  }

  /* ******************** CADASTRO PASSEIO ******************** */
  & .cadastro-passeio {
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
      padding-top: 1.1rem;
      font-size: 18px;
      font-weight: 600;
      user-select: none;
    }
    & .__termos {
      padding: 0 7%;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      & a {
        color: var(--colorPasseio);
      }
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
    & .payment-box {
      display: flex;
      flex-flow: column;
      padding-top: 1rem;
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
          font-weight: 300;
        }
        & canvas {
          cursor: grab;
          margin: 2.5rem 0 1rem 0;
          border: 2px dashed white;
        }
        & canvas:active {
          cursor: grabbing;
        }
      }
    }
    & .__croppa-btn {
      margin: .4rem 0;
      font-size: 16px;
      font-weight: 600;
      background: var(--colorPasseio);
      color: white;
      height: 2.9rem;
      padding: 0 1.5rem;
      border-radius: 2rem;
    }
    & .after-choose-image {
      margin-top: 1.4rem;
      padding: 0 calc(7% - 1%);
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      align-content: flex-start;
      & .image-box {
        position: relative;
        margin: 1%;
        width: 48%;
        height: auto;
        & .__image {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
        & .delete {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: absolute;
          top: .4rem;
          right: .4rem;
          z-index: 5;
          width: 2rem;
          height: 2rem;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          & .__delete-img {
            width: 1rem;
            height: auto;
          }
        }
        & .__foto-principal {
          position: absolute;
          color: white;
          background: rgba(0, 0, 0, 0.4);
          font-size: 12px;
          padding: .2rem 0;
          width: 100%;
          text-align: center;
        }
      }
      & .__add-image {
        position: relative;
        cursor: pointer;
        border: 2px dashed rgb(202,202,202);
        border-radius: 5px;
        & .loader-svg {
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          margin: auto;
          width: 32px;
          height: 32px;
          & .__circle {
            transition: stroke-dashoffset .8s ease;
            transform: rotate(-90deg);
            transform-origin: 50% 50%;
          }
        }
        & .__add-image-svg {
          position: absolute;
          width: 1.8rem;
          height: auto;
          top: 0; left: 0; bottom: 0; right: 0;
          margin: auto;
          z-index: 5;
        }
      }
    }
    & .signin-btns {
      display: flex;
      flex-flow: column;
      padding: 0 7%;
      & .facebook-btn {
        width: 17rem;
        margin: .6rem 0;
        height: 3.4rem;
        text-align: start;
        padding-left: 50px;
        font-size: 15px;
      }
      & .google-btn {
        width: 17rem;
        margin: .6rem 0;
        height: 3.4rem;
        text-align: start;
        padding-left: 50px;
        font-size: 15px;
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
  .anunciar-passeio {
    margin-top: var(--navbarHeightDesktop);
    & .progress-bar {
      top: var(--navbarHeightDesktop);
      height: 6px;
    }
    & .plano-passeio-mobile {
      display: none;
    }
    & .plano-passeio-desktop {
      padding: 0 7%;
      display: flex;
      height: calc(100vh - var(--navbarHeightDesktop));
      & .flex1 {
        display: flex;
        flex-flow: column;
        padding: 5rem 0 0 0;
        flex: 70%;
        align-items: center;
        & .__title {
          font-size: 36px;
          font-weight: 700;
        }
        & .__subtitle {
          padding-top: .2rem;
          font-size: 32px;
          font-weight: 400;
        }
        & .__text {
          text-align: center;
          padding: 2rem 0 3rem 0;
          font-size: 18px;
          font-weight: 400;
        }
        & .__anunciar-btn {
          width: 13rem;
          height: 3rem;
          color: white;
          background: var(--colorPasseio);
          border-radius: 100px;
          font-size: 17px;
          font-weight: 600;
        }
      }
      & .__img-header {
        flex: 25%;
        width: 1rem;
        height: auto;
      }
    }
    & .cadastro-passeio {
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
        padding-top: 1.5rem;
        font-size: 19px;
      }
      & .__termos {
        padding: 0 35%;
        text-align: center;
      }
      & textarea {
        padding: 0 26%;
        margin: 1.7rem 0 .6rem 0;
      }
      & .__lenght-calc {
        padding: 0 26%;
      }
      & .item-form {
        padding: 0 28%;
        margin: 1.5rem 0;
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
      & .modal-croppa {
        & .modal-croppa-body {
          & h1 {
          }
          & canvas {
            border: 3px dashed white;
          }
        }
      }
      & .__croppa-btn {
      }
      & .after-choose-image {
        margin-top: 2rem;
        padding: 0 calc(28% - 1%);
        & .image-box {
          margin: 1%;
          width: 48%;
          & .__image {
          }
          & .delete {
            display: none;
            top: .7rem;
            right: .7rem;
            width: 2.3rem;
            height: 2.3rem;
            & .__delete-img {
              display: none;
              width: 1.2rem;
            }
          }
          & .__foto-principal {
            position: absolute;
            color: white;
            background: rgba(0, 0, 0, 0.4);
            font-size: 12px;
            padding: .2rem 0;
            width: 100%;
            text-align: center;
          }
        }
        & .image-box:hover .delete {
          display: flex;
        }
        & .image-box:hover .__delete-img {
          display: initial;
        }
        & .__add-image {
          transition: .2s all ease;
          & .loader-svg {
            width: 40px;
            height: 40px;
            & .__circle {
            }
          }
          & .__add-image-svg {
            width: 2.2rem;
          }
        }
        & .__add-image:hover {
          border: 2px dashed var(--color01);
        }
      }
      & .center-first-image {
        flex-flow: column wrap;
      }
      & .signin-btns {
        padding: .8rem 40% 0;
        & .facebook-btn {
          width: 100%;
        }
        & .google-btn {
          width: 100%;
        }
      }
      & .back-next {
        bottom: 2rem;
        height: 2.85rem;
        width: 25%;
        box-shadow: 3px 3px 20px 1px rgba(0,0,0,0.18);
        & .back-next-body {
          & button {
            height: 2.85rem;
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

.has-error-label {
  color: #F31431 !important;
}
.has-error {
  color: #F31431 !important;
  border-bottom: 1px solid #F31431 !important;
}

</style>
