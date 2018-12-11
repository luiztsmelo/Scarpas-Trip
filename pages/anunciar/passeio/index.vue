<template>
  <div class="anunciar-passeio">


    <!-- FIRST PAGE -->
    <div class="first-page" v-if="$store.state.cadastroPasseio0">
      
      <img class="img" src="../../../assets/img/anuncio-passeio.svg">

      <div class="copy">

        <h1 class="__title">Aumente seus ganhos anunciando na Escarpas Trip</h1>


        <div class="benefits">

          <div class="benefit">
            <img class="__img" src="../../../assets/img/visibility.svg">
            <p class="__text">Ganhe maior visibilidade</p>
          </div>

          <div class="benefit">
            <img class="__img" src="../../../assets/img/barracas.svg">
            <p class="__text">Ganhe visibilidade</p>
          </div>

        </div>
        

        <button class="__anunciar-btn" @click="$store.commit('m_cadastroPasseio1', true), $store.commit('m_cadastroPasseio0', false), $store.commit('m_passeioProgressBar', (100/10)), hashPasseio()">Anunciar</button>
        
      </div>

    </div><!-- FIRST PAGE -->





    <div class="progress-bar" v-if="!$store.state.cadastroPasseio0" :style="progressBarStyle"></div>






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
          <option v-for="n in 15" :value="n">{{ n }} {{ n === 1 ? 'pessoa' : 'pessoas' }}</option>
        </select>
      </div> 


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn2">Voltar</button>
          <button type="button" class="__next" :style="form2ok" @click="nextBtn2">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 2 - CAPACIDADE ________________________________________ -->







    <!-- ________________________________________ 3 - IMAGENS ________________________________________ -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio3">

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
          <button type="button" class="__back" @click="backBtn3">Voltar</button>
          <button type="button" class="__next" :style="form3ok" @click="nextBtn3">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 3 - IMAGENS ________________________________________ -->








    <!-- ________________________________________ 4 - LOCAL DE PARTIDA ________________________________________ -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio4">

      <h1 class="__form-title">Seu passeio parte de onde?</h1>

      <div class="item-form">
        <label>Local</label>
        <gmap-autocomplete
          onKeyPress="if (event.which == 13) return false" 
          placeholder="Digite o endereço completo aqui"
          @place_changed="setPlace">
        </gmap-autocomplete>
      </div>

      <h3 class="without-address" @click="$modal.show('local-map-modal'), $store.state.fromWithoutAddress=true">
        Seu local de partida não possui endereço?
      </h3>

      <localMap/>


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn4">Voltar</button>
          <button type="button" class="__next" :style="form4ok" @click="nextBtn4">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 4 - LOCAL DE PARTIDA ________________________________________ -->







    <!-- ________________________________________ 5 - ROTAS ________________________________________ -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio5">

      <h1 class="__form-title">Quais rotas são oferecidas?</h1>


      <div class="rotas">
        
        <transition-group name="rotas-animation" tag="div" style="width: 100%">
          <div class="rota" v-for="(rota, index) in $store.state.passeioData.rotas" :key="index + 1">
            <div class="rota-body">
              

              <div class="heading">
                <h1 class="__name">Rota {{ index + 1 }}</h1>
                <img class="__remove-rota" src="../../../assets/img/exit.svg" @click="$store.commit('m_removeRotaPasseio', index)">
              </div>
              

              <div class="question">
                <label>Valor por pessoa:</label>
                <money 
                  v-model="rota.valor"
                  onKeyPress="if (event.which == 13) return false">
                </money>
              </div>

              <div class="question">
                <label>Horário de partida:</label>
                <input type="time" v-model="rota.horarioPartida">
              </div>

              <div class="question">
                <label>Duração do passeio:</label>
                <select v-model="rota.duracao">
                  <option v-for="n in 12" :value="n">{{ n }} {{ n === 1 ? 'hora' : 'horas' }}</option>
                </select>
              </div>

              <div class="question" style="padding-top: 2px">
                <label>Pontos visitados:</label>
                <multiselect 
                  v-model="rota.pontosVisitados" 
                  placeholder="Adicionar ponto" 
                  tag-placeholder="Adicionar ponto" 
                  :searchable="$store.state.isMobile ? false : true"
                  :hide-selected="true"
                  :options="pontos" 
                  :multiple="true" 
                  :taggable="true">
                </multiselect>
              </div>

            </div>
          </div>
        </transition-group>

        <button class="add-rota-btn" type="button" @click="$store.commit('m_addRotaPasseio')">Adicionar Rota</button>

      </div>
 

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn5">Voltar</button>
          <button type="button" class="__next" :style="form5ok" @click="nextBtn5">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 5 - ROTAS ________________________________________ -->








    <!-- ________________________________________ 6 - FORMAS DE PAGAMENTO ________________________________________ -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio6">

      <h1 class="__form-title">Quais formas de pagamento você aceita?</h1>

    


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn6">Voltar</button>
          <button type="button" class="__next" :style="form6ok" @click="nextBtn6">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 6 - FORMAS DE PAGAMENTO ________________________________________ -->







    <!-- ________________________________________ 7 - TÍTULO ________________________________________ -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio7">

      <h1 class="__form-title">Dê um título para seu passeio</h1>

      <textarea 
      v-model="$store.state.passeioData.title"
      v-autosize="title"
      maxlength="60"
      rows="1"
      placeholder="ex: Passeio de Lancha no Lago de Furnas"
      required>
      {{title}}</textarea>

      <span class="__lenght-calc">{{ 60 - $store.state.passeioData.title.length }}</span>


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn7">Voltar</button>
          <button type="button" class="__next" :style="form7ok" @click="nextBtn7">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 7 - TÍTULO ________________________________________ -->







    <!-- ________________________________________ 8 - DESCRIÇÃO ________________________________________ -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio8">

      <h1 class="__form-title">Descreva seu passeio</h1>   

      <textarea 
      v-model="$store.state.passeioData.subtitle"
      v-autosize="subtitle"
      maxlength="1000"
      rows="1"
      placeholder="Coloque informações importantes aqui, que não foram perguntadas antes"
      required>
      {{subtitle}}</textarea>

      <span class="__lenght-calc">{{ 1000 - $store.state.passeioData.subtitle.length }}</span> 


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn8">Voltar</button>
          <button type="button" class="__next" :style="form8ok" @click="nextBtn8">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 8 - DESCRIÇÃO ________________________________________ -->








    <!-- ________________________________________ 9 - CADASTRO ________________________________________ -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio9">

      <h1 class="__form-title">
        {{ !authUser ? 'Antes de continuar, precisamos de seu cadastro' : `Ótimo ${user.firstName}, só mais algumas informações de contato` }}
      </h1> 


      <div class="signin-btns" v-if="!authUser">
        <button type="button" class="google-btn" @click="$store.dispatch('a_googleSignIn')">Continuar com Google</button>
        <button type="button" class="facebook-btn" @click="$store.dispatch('a_facebookSignIn')">Continuar com Facebook</button>
      </div>


      <h4 class="__termos" style="padding-top:1rem" v-if="!authUser">Ao se cadastrar com uma das opções acima, somente seu e-mail, nome e foto de perfil serão requisitados. Para mais informações, leia nossa <nuxt-link to="/termos#politica_privacidade">Política de Privacidade</nuxt-link>.</h4>


      <div v-if="authUser">

        <!-- CELULAR -->
        <div class="item-form">
          <label>Celular / WhatsApp</label>
          <masked-input
            ref="celular"
            type="tel"
            v-model="$store.state.customer.celular"
            :mask="['+', 5, 5, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]"
            :guide="false"
            placeholder="+55">
          </masked-input>
        </div><!-- CELULAR -->


        <!-- INSTAGRAM -->
        <div class="item-form">
          <label>Instagram (Opcional)</label>
          <input
            ref="instagram"
            onKeyPress="if (event.which == 32) return false"
            type="text"
            maxlength="30"
            v-model="$store.state.customer.instagram"
            placeholder="@username">
        </div><!-- INSTAGRAM -->

      </div>


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn9">Voltar</button>
          <button type="button" class="__next" :style="form9ok" @click="nextBtn9">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 9 - CADASTRO ________________________________________ -->







    <!-- ________________________________________ 10 - PAGAMENTO ________________________________________ -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio10">

      <h1 class="__form-title">Detalhes sobre o pagamento</h1>

      <h3 class="__form-text">{{ user.firstName }}, será cobrada uma mensalidade de <span style="font-weight:600">R$49,00</span> em seu cartão de crédito. Não se preocupe, não cobraremos multa caso queira cancelar futuramente.</h3>


      <div class="payment-box">
        
        
        <h2 class="__form-subtitle">Dados do cartão de crédito</h2>

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




        <h2 class="__form-subtitle" style="margin-top: 1.6rem">Endereço de cobrança</h2>

        <p>Necessário apenas para a validação de seu cartão de crédito.</p>

        <!-- CEP -->
        <div class="item-form">
          <label :class="[ zipcodeError ? 'has-error-label' : '' ]">CEP</label>
          <masked-input
            ref="zipcode"
            :class="[ zipcodeError ? 'has-error' : '' ]"
            type="tel"
            v-model="$store.state.customer.zipcode"
            :mask="[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]"
            :guide="false"
            placeholder="00000-000">
          </masked-input>
        </div><!-- CEP -->


        <!-- ENDEREÇO -->
        <div class="item-form">
          <label :class="[ streetError ? 'has-error-label' : '' ]">Rua</label>
          <input
            ref="street"
            :class="[ streetError ? 'has-error' : '' ]"
            type="text"
            @keypress="keyEnterStreet"
            v-model="$store.state.customer.street"
            placeholder="Endereço">
        </div><!-- ENDEREÇO -->


        <div class="flex" style="display:flex; justify-content:space-between">

        <!-- NÚMERO -->
        <div class="item-form" style="flex:50%; padding-right:.7rem">
          <label :class="[ streetNumberError ? 'has-error-label' : '' ]">Número</label>
          <masked-input
            ref="streetNumber"
            :class="[ streetNumberError ? 'has-error' : '' ]"
            type="tel"
            @keypress="keyEnterStreetNumber"
            v-model="$store.state.customer.street_number"
            :mask="[/\d/, /\d/, /\d/, /\d/]"
            :guide="false">
          </masked-input>
        </div><!-- NÚMERO -->


        <!-- BAIRRO -->
        <div class="item-form" style="flex:50%; padding-left:.7rem">
          <label :class="[ neighborhoodError ? 'has-error-label' : '' ]">Bairro</label>
          <input
            ref="bairro"
            :class="[ neighborhoodError ? 'has-error' : '' ]"
            type="text"
            v-model="$store.state.customer.neighborhood">
        </div><!-- BAIRRO -->

      </div>

      <div class="flex" style="display:flex; justify-content:space-between; align-items:center">

        <!-- CIDADE -->
        <div class="item-form" style="flex:50%; padding-right:.7rem">
          <label :class="[ cityError ? 'has-error-label' : '' ]">Cidade</label>
          <input
            ref="city"
            :class="[ cityError ? 'has-error' : '' ]"
            style="cursor: default"
            type="text"
            v-model="$store.state.customer.city"
            disabled>
        </div><!-- CIDADE -->


        <!-- ESTADO -->
        <div class="item-form" style="flex:50%; padding-left:.7rem">
          <label :class="[ stateError ? 'has-error-label' : '' ]">Estado</label>
          <input
            ref="state"
            :class="[ stateError ? 'has-error' : '' ]"
            style="cursor: default"
            type="text"
            v-model="$store.state.customer.state"
            disabled>
        </div><!-- ESTADO -->

      </div>


        <h4 class="__termos">Ao anunciar, você concorda com a nossa <a href="/termos#politica_privacidade" target="_blank">Política de Privacidade</a> e <a href="/termos" target="_blank">Termos de Serviço</a>.</h4>

      </div>


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn10">Voltar</button>
          <button type="button" class="__next" :style="form10ok" @click="concluir">Anunciar</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 10 - PAGAMENTO ________________________________________ -->




    <!-- CADASTRO PASSEIO -->

  </div>
</template>

<script>
import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import MaskedInput from 'vue-text-mask'
import localMap from '~/components/localMap.vue'
import { pontosTuristicos } from '@/mixins/pontosTuristicos'
import valid from 'card-validator'
import CPF from 'gerador-validador-cpf'
import scrollIntoView from 'scroll-into-view'

export default {
  components: { MaskedInput, localMap },
  mixins: [ pontosTuristicos ],
  head () {
    return {
      title: 'Anunciar Passeio em Capitólio ‒ Escarpas Trip'
    }
  },
  middleware: 'newPasseioConcludedCheck',
  transition: 'opacity',
  data () {
    return {
      title: '', /* Vue Autosize */
      subtitle: '', /* Vue Autosize */
      showCroppaModal: false,
      isUploading: false,
      uploadProgress: 0,
      cardNumberError: false,
      cardHolderNameError: false,
      cardExpirationDateError: false,
      cardCvvError: false,
      cpfError: false,
      zipcodeError: false,
      neighborhoodError: false,
      streetError: false,
      streetNumberError: false,
      cityError: false,
      stateError: false
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
    keyEnterStreet () {
      if (event.key === 'Enter') {
        scrollIntoView(this.$refs.streetNumber.$el)
        this.$refs.streetNumber.$el.focus() 
      }  
    },
    keyEnterStreetNumber () {
      if (event.key === 'Enter') {
        this.$refs.bairro.focus()
      } 
    },
    scrollTop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    /* ******************** GOOGLE MAPS ******************** */
    setPlace (place) {
      this.$store.commit('m_passeioPlace', place)
      this.$store.state.passeioData.positionLAT = this.$store.state.passeioPlace.geometry.location.lat()
      this.$store.state.passeioData.positionLNG = this.$store.state.passeioPlace.geometry.location.lng()
      this.$store.state.passeioData.address = this.$store.state.passeioPlace.formatted_address
      this.$modal.show('local-map-modal')
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
    /* ******************** NEXT BUTTONS ******************** */
    hashPasseio () {
      this.$store.dispatch('a_generateRandomHashs')
      window.location.hash = this.randomHashs[1]
    },
    nextBtn1 () {
      if (this.$store.state.passeioData.tipoPasseio !== null) {
        this.$store.commit('m_cadastroPasseio1', false), this.$store.commit('m_cadastroPasseio2', true), this.$store.commit('m_passeioProgressBar', (100/10)*2), this.scrollTop(), window.location.hash = `${this.randomHashs[2]}`
      }
    },
    nextBtn2 () {
      if (this.$store.state.passeioData.capacidade !== null) {
        this.$store.commit('m_cadastroPasseio2', false), this.$store.commit('m_cadastroPasseio3', true), this.$store.commit('m_passeioProgressBar', (100/10)*3), this.scrollTop(), window.location.hash = `${this.randomHashs[3]}`
      }
    },
    nextBtn3 () {
      if (this.$store.state.passeioData.images.length > 0) {
        this.$store.commit('m_cadastroPasseio3', false), this.$store.commit('m_cadastroPasseio4', true), this.$store.commit('m_passeioProgressBar', (100/10)*4), this.scrollTop(), window.location.hash = `${this.randomHashs[4]}`
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione pelo menos 3 imagens.'
        })
      }
    },
    nextBtn4 () {
      if (this.$store.state.passeioPlace !== null || this.$store.state.passeioData.positionLAT !== -20.6141320) {
        this.$store.commit('m_cadastroPasseio4', false), this.$store.commit('m_cadastroPasseio5', true), this.$store.commit('m_passeioProgressBar', (100/10)*5), this.scrollTop(), window.location.hash = `${this.randomHashs[5]}`
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione um local de partida.'
        })
      }
    },
    nextBtn5 () {
      if (this.$store.state.passeioData.rotas.length > 0) {
        this.$store.commit('m_cadastroPasseio5', false), this.$store.commit('m_cadastroPasseio6', true), this.$store.commit('m_passeioProgressBar', (100/10)*6), this.scrollTop(), window.location.hash = `${this.randomHashs[6]}`
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione uma rota.'
        })
      }
    },
    nextBtn6 () {
      if (1<2) {
        this.$store.commit('m_cadastroPasseio6', false), this.$store.commit('m_cadastroPasseio7', true), this.$store.commit('m_passeioProgressBar', (100/10)*7), this.scrollTop(), window.location.hash = `${this.randomHashs[7]}`
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione um horário de partida.'
        })
      }
    },
    nextBtn7 () {
      if (this.$store.state.passeioData.title !== '') {
        this.$store.commit('m_cadastroPasseio7', false), this.$store.commit('m_cadastroPasseio8', true), this.$store.commit('m_passeioProgressBar', (100/10)*8), this.scrollTop(), window.location.hash = `${this.randomHashs[8]}`
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione um título.'
        })
      }
    },
    nextBtn8 () {
      if (this.$store.state.passeioData.subtitle !== '') {
        this.$store.commit('m_cadastroPasseio8', false), this.$store.commit('m_cadastroPasseio9', true), this.$store.commit('m_passeioProgressBar', (100/10)*9), this.scrollTop(), window.location.hash = `${this.randomHashs[9]}`
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione uma descrição.'
        })
      }
    },
    nextBtn9 () {
      if (!this.authUser) {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Conecte-se com uma de suas contas para continuar.'
        })
      } else if (this.$store.state.customer.celular.length === 17 && this.authUser) {
          this.$store.commit('m_cadastroPasseio9', false)
          this.$store.commit('m_cadastroPasseio10', true)
          this.$store.commit('m_passeioProgressBar', (100/10)*10)
          this.scrollTop()
          window.location.hash = `${this.randomHashs[10]}`
          this.$store.state.creditCard.cardHolderName = this.user.fullName
          this.$store.state.customer.name = this.user.fullName
          this.$store.state.customer.email = this.user.email
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione um número de celular válido.'
        })
      }
    },
    async concluir () {
      const passeioData = this.$store.state.passeioData

      passeioData.createdAt = Date.now()

      passeioData.hostID = this.user.userID

      /* Se todas as informações preenchidas */
      if (this.formIsCompleted) {

        try {
          this.$store.commit('m_loader', true)

          /* Criar assinatura no Pagarme, criar passeio na Firestore e atualizar user */
          const subscription = await firebase.functions().httpsCallable('newPasseio')({
            passeioData: passeioData,
            creditCard: this.$store.state.creditCard,
            customer: this.$store.state.customer
          })

          console.log(subscription)

          /* Necessário para o correto funcionamento do backBtn _id (Ver middleware: newPasseioConcludedCheck.js) */
          this.$store.state.concludedNewPasseio = true
          
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
        this.zipcode.length < 9 || !this.$store.state.validZipcode ? this.zipcodeError = true : this.zipcodeError = false
        this.street === null || this.street === '' ? this.streetError = true : this.streetError = false
        this.streetNumber === null || this.streetNumber === '' ? this.streetNumberError = true : this.streetNumberError = false
        this.neighborhood === null || this.neighborhood === '' ? this.neighborhoodError = true : this.neighborhoodError = false
        this.city === null || this.city === '' ? this.cityError = true : this.cityError = false
        this.state === null || this.state === '' ? this.stateError = true : this.stateError = false
      }
    }
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
    instagram () { return this.$store.state.customer.instagram },
    zipcode () { return this.$store.state.customer.zipcode },
    street () { return this.$store.state.customer.street },
    streetNumber () { return this.$store.state.customer.street_number },
    neighborhood () { return this.$store.state.customer.neighborhood },
    city () { return this.$store.state.customer.city },
    state () { return this.$store.state.customer.state },
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
    /* ******************** PROGRESS BAR ******************** */
    progressBarStyle () {
      return `width:${this.$store.state.passeioProgressBar}%; ${this.$store.state.cadastroPasseio0 || this.$store.state.cadastroPasseio1 ? '' : 'transition: all .3s ease;'}`
    },
    /* ******************** FORM STYLES ******************** */
    form1ok () {
      return this.$store.state.passeioData.tipoPasseio !== null ? 'background: #198CFE' : ''
    },
    form2ok () {
      return this.$store.state.passeioData.capacidade !== null ? 'background: #198CFE' : ''
    },
    form3ok () {
      return this.$store.state.passeioData.images.length > 0 ? 'background: #198CFE' : ''
    },
    form4ok () {
      return this.$store.state.passeioPlace !== null || this.$store.state.passeioData.positionLAT !== -20.6141320 ? 'background:#198CFE' : ''
    },
    form5ok () {
      return this.$store.state.passeioData.rotas.length > 0 ? 'background: #198CFE' : ''
    },
    form6ok () {
      return 1<2 ? 'background: #198CFE' : ''
    },
    form7ok () {
      return this.$store.state.passeioData.title !== '' ? 'background: #198CFE' : ''
    },
    form8ok () {
      return this.$store.state.passeioData.subtitle !== '' ? 'background: #198CFE' : ''
    },
    form9ok () {
      return this.$store.state.customer.celular.length === 17 && this.authUser ? 'background: #198CFE' : ''
    },
    form10ok () {
      return this.formIsCompleted ? 'background: #198CFE' : ''
    },
    formIsCompleted () {
      if (this.cardHolderName !== '' && valid.number(this.cardNumber).isValid && valid.expirationDate(this.cardExpirationDate).isValid && valid.cvv(this.cardCVV).isValid && CPF.validate(this.cpf) && this.cpf.length === 14 && this.zipcode.length === 9 && this.$store.state.validZipcode && this.street !== '' && this.street !== null && this.streetNumber !== '' && this.streetNumber !== null && this.neighborhood !== '' && this.neighborhood !== null && this.city !== '' && this.city !== null && this.state !== '' && this.state !== null) {
        return true
      } else {
        return false
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
    instagram (value) {
      console.log(value)
      const firstDigit = value.charAt(0)
      if (value.length === 1 && firstDigit !== '@') {
        this.$store.state.customer.instagram = `@${value}`
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
          scrollIntoView(this.$refs.zipcode.$el)
          this.$refs.zipcode.$el.focus()
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
    async zipcode (value) {
      if (value.length === 9) {
        try {
          this.$store.commit('m_loader', true)
          const zipcode = this.zipcode.replace(/[^0-9\.]+/g, '')
          const zipcodeData = await this.$axios.$get('https://api.pagar.me/1/zipcodes/' + zipcode)
          this.$store.state.customer.state = zipcodeData.state
          this.$store.state.customer.city = zipcodeData.city
          this.$store.state.customer.neighborhood = zipcodeData.neighborhood
          this.$store.state.customer.street = zipcodeData.street
          this.$store.state.validZipcode = true
          this.$store.commit('m_loader', false)
          this.$nextTick(() => {
            if (this.street === null || this.street === '') {
              scrollIntoView(this.$refs.street)
              this.$refs.street.focus()
            } else {
              scrollIntoView(this.$refs.streetNumber.$el)
              this.$refs.streetNumber.$el.focus() 
            }
          })
        } catch (err) {
          if (err.response.status === 404) {
            this.$store.commit('show_alert', {
              type: 'warning',
              title: 'Erro',
              message: 'CEP inválido.',
            })
          } else {
            this.$store.commit('show_alert', {
              type: 'warning',
              title: 'Erro',
              message: 'Falha na conexão. Tente novamente.',
            })
          }
          this.zipcodeError = true
          this.$store.state.validZipcode = false
          this.$store.commit('m_loader', false)
        }
      } else {
        this.zipcodeError = false
      }
    },
    street (value) { value !== null ? this.streetError = false : null },
    streetNumber (value) { value !== null ? this.streetNumberError = false : null },
    neighborhood (value) { value !== null ? this.neighborhoodError = false : null },
    city (value) { value !== null ? this.cityError = false : null },
    state (value) { value !== null ? this.stateError = false : null },
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
        /* Prevenir bug em caso de F5 */
        if (!vm.$store.state.cadastroPasseio0 && !vm.$store.state.cadastroPasseio1 && !vm.$store.state.cadastroPasseio2 && !vm.$store.state.cadastroPasseio3 && !vm.$store.state.cadastroPasseio4 && !vm.$store.state.cadastroPasseio5 && !vm.$store.state.cadastroPasseio6 && !vm.$store.state.cadastroPasseio7 && !vm.$store.state.cadastroPasseio8 && !vm.$store.state.cadastroPasseio9 && !vm.$store.state.cadastroPasseio10 && !vm.$store.state.cadastroPasseio11) {
          vm.$store.commit('m_cadastroPasseio0', true)
        }
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
  },
  beforeRouteLeave (to, from, next) {
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
    next()
  }
}
</script>

<style scoped>

.anunciar-passeio {
  margin-top: var(--navbarHeightMobile);
  transition: var(--pages-transition);
  & .progress-bar {
    position: fixed;
    top: var(--navbarHeightMobile);
    height: 4px;
    z-index: 8888;
    background: var(--colorPasseio);
  }
  /* ******************** FIRST PAGE ******************** */
  & .first-page {
    padding: 2rem 7%;
    display: flex;
    flex-flow: column;
    align-items: center;
    & .img {
      width: 6rem;
      height: auto;
    }
    & .copy {
      display: flex;
      flex-flow: column;
      align-items: center;
      & .__title {
        font-size: 28px;
        font-weight: 700;
        text-align: center;
        margin-top: 1rem;
      }
      & .benefits {
        display: flex;
        flex-flow: column;
        align-items: center;
        width: 100%;
        margin: 2.5rem 0 4.5rem;
        padding: 0 2rem;
        & .benefit {
          width: 100%;
          display: flex;
          flex-flow: column;
          align-items: center;
          margin-bottom: 2.5rem;
          & .__img {
            width: 3.3rem;
            height: auto;
            margin-bottom: .7rem;
          }
          & .__text {
            line-height: 1.3;
            text-align: center;
            font-weight: 400;
          }
        } 
      }
      & .__anunciar-btn {
        position: fixed;
        bottom: 1rem;
        left: 0;
        right: 0;
        margin: auto;
        width: 13rem;
        height: 3.1rem;
        color: white;
        background: var(--colorPasseio);
        border-radius: 100px;
        font-size: 17px;
        font-weight: 700;
      }
    }
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
    & .__termos {
      padding: 0 7%;
      font-size: 15px;
      font-weight: 400;
      line-height: 20px;
      & a {
        color: var(--colorPasseio);
      }
      & a:hover {
        text-decoration: underline;
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
    & .without-address {
      display: inline-flex;
      cursor: pointer;
      user-select: none;
      margin: 0 7%;
      font-size: 16px;
      font-weight: 500;
      color: var(--colorPasseio);
      transition: .2s all ease;
    }
    & .without-address:hover {
      text-decoration: underline;
    }
    & .rotas {
      display: flex;
      flex-flow: column;
      align-items: center;
      margin: 1rem 7% 0;
      & .rota {
        border: 1px solid #dedede;
        border-radius: 12px;
        width: 100%;
        margin-bottom: 1.7rem;
        transition: var(--main-transition);
        & .rota-body {
          position: relative;
          display: flex;
          flex-flow: column;
          & .heading {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: .8rem 1.2rem;
            margin-bottom: 1.2rem;
            border-radius: 12px 12px 0 0;
            border-bottom: 1px solid #dedede;
            & .__name {
              font-size: 17px;
              font-weight: 600;
            }
            & .__remove-rota {
              cursor: pointer;
              width: .8rem;
              height: auto;
            }
          }
          & .question {
            min-height: 2.4rem;
            margin: 0 1.2rem;
            & label {
              font-size: 16px;
              font-weight: 400;
              padding-right: 2px;
            }
            & input {
              cursor: text;
              width: 3.8rem;
              border: none;
              outline: none;
              background: white;
              color: var(--color01);
              font-size: 16px;
              font-weight: 500;
            }
            & select {
              cursor: pointer;
              border: none;
              outline: none;
              background: white;
              color: var(--color01);
              font-size: 16px;
              font-weight: 500;
            }
          }
        }
      }
      & .add-rota-btn {
        background: white;
        font-size: 17px;
        font-weight: 600;
        color: var(--colorPasseio);
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
    & .first-page {
      padding: 0 7%;
      flex-flow: row;
      height: calc(100vh - var(--navbarHeightDesktop));
      & .img {
        flex: 25%;
        width: 1rem;
      }
      & .copy {
        flex: 70%;
        & .__title {
          font-size: 37px;
          margin-top: 0;
        }
        & .benefits {
          flex-flow: row;
          align-items: flex-start;
          justify-content: space-around;
          width: 100%;
          margin: 3.5rem 0 4.5rem;
          padding: 0 5rem;
          & .benefit {
            width: 24%;
            margin-bottom: 0;
            & .__img {
              width: 3.2rem;
            }
            & .__text {
            }
          } 
        }
        & .__anunciar-btn {
          position: initial;
          width: 13rem;
          height: 3.1rem;
          color: white;
          background: var(--colorPasseio);
          border-radius: 100px;
          font-size: 17px;
          font-weight: 700;
        }
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
        padding: 1.7rem 28% .3rem;
        font-size: 18px;
      }
      & p {
        font-size: 17px;
        padding: .4rem 28%;
      }
      & .__termos {
        padding: 1rem 35% 0;
        text-align: center;
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
      & .without-address {
        margin: 0 28%;
      }
      & .rotas {
        margin: 1.6rem 28% 0;
        & .rota {
          & .rota-body {
            & .heading {
              & .__name {
              }
              & .__remove-rota {
              }
            }
            & .question {
              & label {
              }
              & input {
              }
            }
          }
        }
        & .add-rota-btn {
        }
        & .add-rota-btn:hover {
          text-decoration: underline;
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

/* Remove default appearance from input time */
input[type=time]::-webkit-inner-spin-button, 
input[type=time]::-webkit-outer-spin-button,
input[type=time]::-webkit-clear-button {
  display: none;
  appearance: none;
  margin: 0;
}

/* Error */
.has-error-label {
  color: #F31431 !important;
}
.has-error {
  color: #F31431 !important;
  border-bottom: 1px solid #F31431 !important;
}

/* Multiselect */
.multiselect, .multiselect__input, .multiselect__single {
  margin: 1rem 0 1.2rem;
  font-size: 15px;
}
.multiselect__tags {
  cursor: text;
  padding: 0;
  border: none;
  font-size: 15px;
  border-radius: 0px;
  & .multiselect__tag {
    background: var(--colorPasseio);
    line-height: 1.1;
    & .multiselect__tag-icon::after {
      color: white;
      font-size: 25px;
      font-weight: 400;
    }
    & .multiselect__tag-icon:hover {
      background: var(--colorPasseio);
      opacity: .8;
    }
  }
}
.multiselect__select {
  cursor: text;
}
.multiselect__select::before {
  display: none;
}

/* Rotas transitions */
.rotas-animation-enter {
  opacity: 0;
  transform: translateY(15px);
}
.rotas-animation-leave-to {
  opacity: 0;
}
.rotas-animation-leave-active {
  opacity: 0;
  transform: scale(.94);
}
</style>
