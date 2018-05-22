<template>
  <div class="anunciar-passeio">


    <!-- PLANO PASSEIO MOBILE -->
    <div class="plano-passeio-mobile" v-show="$store.state.cadastroPasseio0">
      
      <img class="__img-header" src="../../../assets/img/anuncio-passeio.svg">
      
      <h1 class="__title">Ainda gasta anunciando seu passeio? Aqui é gratuito.</h1>
      
      <button class="__anunciar-btn" @click="$store.commit('m_cadastroPasseio1', true), $store.commit('m_cadastroPasseio0', false), $store.commit('m_acomodProgressBar', (100/11))">Anunciar</button>

    </div><!-- PLANO PASSEIO MOBILE -->


    <!-- PLANO PASSEIO DESKTOP -->
    <div class="plano-passeio-desktop" v-show="$store.state.cadastroPasseio0">
      
      <img class="__img-header" src="../../../assets/img/anuncio-passeio.svg">

      <div class="flex1">
        <h1 class="__title">Ainda paga para anunciar seu passeio?</h1>
        <h1 class="__subtitle">Aqui é gratuito.</h1>

        <h3 class="__text">Além disso...</h3>
        
        <button class="__anunciar-btn" @click="$store.commit('m_cadastroPasseio1', true), $store.commit('m_cadastroPasseio0', false), $store.commit('m_acomodProgressBar', (100/11))">Anunciar</button>
      </div>

    </div><!-- PLANO PASSEIO DESKTOP -->



    <div class="progress-bar" v-show="!$store.state.cadastroPasseio0" :style="'width:' + $store.state.passeioProgressBar + '%'"></div>




    <!-- CADASTRO EVENTO -->



    <!-- ########## TIPO DE PASSEIO PG.1 ########## -->
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
    
    </form><!-- ########## TIPO DE PASSEIO PG.1 ########## -->




    <!-- ########## CAPACIDADE PG.2 ########## -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio2">

      <h1 class="__form-title">Passeio para até quantas pessoas?</h1>

      <div class="item-form">
        <label>Capacidade</label>
        <select v-model="$store.state.passeioData.capacidade">
          <option v-for="n in 20">{{ n }}</option>
        </select>
      </div> 

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn2">Voltar</button>
          <button type="button" class="__next" :style="form2ok" @click="nextBtn2">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## CAPACIDADE PG.2 ########## -->




    <!-- ########## DURAÇÃO PG.3 ########## -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio3">

      <h1 class="__form-title">Quanto tempo de passeio?</h1>

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
    
    </form><!-- ########## DURAÇÃO PG.3 ########## -->




    <!-- ########## LOCAL DE SAÍDA PG.4 ########## -->
    <form class="cadastro-passeio" v-show="$store.state.cadastroPasseio4">

      <h1 class="__form-title">O passeio sairá de onde?</h1>

      <div class="item-form">
        <label>Local de Saída</label>
        <select v-model="$store.state.passeioData.localSaida" @input="setLocalSaida" v-if="$store.state.passeioData.localSaida !== 'Outro'">
          <option>Capitólio</option>
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
    
    </form><!-- ########## LOCAL DE SAÍDA PG.4 ########## -->




    <!-- ########## PONTOS VISITADOS PG.5 ########## -->
    <form class="cadastro-passeio" v-show="$store.state.cadastroPasseio5">

      <h1 class="__form-title">Quais serão os pontos visitados?</h1>

 

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn5">Voltar</button>
          <button type="button" class="__next" :style="form5ok" @click="nextBtn5">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## PONTOS VISITADOS PG.5 ########## -->




    <!-- ########## VALOR PASSEIO PG.6 ########## -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio6">

      <h1 class="__form-title">Qual será o valor por pessoa?</h1>

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
    
    </form><!-- ########## VALOR PASSEIO PG.6 ########## -->




    <!-- ########## IMAGENS E VÍDEO PG.7 ########## -->
    <form class="cadastro-passeio" v-show="$store.state.cadastroPasseio7">

      <h1 class="__form-title">Adicione imagens e vídeo</h1>

      <div class="before-choose-image" v-show="imageURL1 === null">
        <button class="__input-btn" type="button" @click="$refs.myCroppa1.chooseFile()">Adicionar Imagem</button>
      </div>
      
      <div class="modal-croppa" v-show="showCroppaModal1" @click="showCroppaModal1=false">
        <div class="modal-croppa-body" @click.stop>
          <h1>Ajustar imagem</h1>
          <croppa
            ref="myCroppa1"
            @file-choose="showCroppaModal1 = true"
            :width="$store.state.isMobile === true ? 720/2.25 : 720/1.5"
            :height="$store.state.isMobile === true ? 480/2.25 : 480/1.5"
            :quality="$store.state.isMobile === true ? 2.25 : 1.5"
            :placeholder="'Carregando...'"
            :placeholder-color="'white'"
            :accept="'.jpg, .jpeg, .png, .webp'"
            :zoom-speed="$store.state.isMobile === true ? 2 : 4"
            :prevent-white-space="true"
            :show-remove-button="false">
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
            @file-choose="showCroppaModal2 = true"
            :width="$store.state.isMobile === true ? 720/2.25 : 720/1.5"
            :height="$store.state.isMobile === true ? 480/2.25 : 480/1.5"
            :quality="$store.state.isMobile === true ? 2.25 : 1.5"
            :placeholder="'Carregando...'"
            :placeholder-color="'white'"
            :accept="'.jpg, .jpeg, .png, .webp'"
            :zoom-speed="$store.state.isMobile === true ? 2 : 4"
            :prevent-white-space="true"
            :show-remove-button="false">
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

        <div class="image-box">
          <div class="__foto-principal">Imagem principal</div>
          <img :src="imageURL1" class="__preview-img" @click="showCroppaModal1=true">
        </div>
        
        <div class="image-box">
          <img src="./../../../assets/img/add-image.svg" class="__preview-img" v-if="imageURL2 === null" @click="$refs.myCroppa2.chooseFile()" style="padding:26%">
          <img :src="imageURL2" class="__preview-img" @click="showCroppaModal2=true" v-else>
        </div>

      </div><!-- Preview Image -->



      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn7">Voltar</button>
          <button type="button" class="__next" :style="form7ok" @click="nextBtn7">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## IMAGENS E VÍDEO PG.7 ########## -->




    <!-- ########## TÍTULO PG.8 ########## -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio8">

      <h1 class="__form-title">Dê um título para seu passeio</h1>

      <textarea 
      v-model="$store.state.passeioData.title"
      v-autosize="title"
      maxlength="50"
      rows="1"
      placeholder="ex: Passeio de Lancha no Lago de Furnas"
      required>
      {{title}}</textarea>

      <span class="__lenght-calc">{{ titleLength }}</span>

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn8">Voltar</button>
          <button type="button" class="__next" :style="form8ok" @click="nextBtn8">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## TÍTULO PG.8 ########## -->




    <!-- ########## DESCRIÇÃO PG.9 ########## -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio9">

      <h1 class="__form-title">Descreva seu passeio</h1>   

      <textarea 
      v-model="$store.state.passeioData.subtitle"
      v-autosize="subtitle"
      maxlength="600"
      rows="1"
      placeholder="Coloque informações importantes aqui, que não foram perguntadas antes"
      required>
      {{subtitle}}</textarea>

      <span class="__lenght-calc">{{ subtitleLength }}</span> 

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn9">Voltar</button>
          <button type="button" class="__next" :style="form9ok" @click="nextBtn9">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## DESCRIÇÃO PG.9 ########## -->




    <!-- ########## IDENTIFICAÇÃO PG.10 ########## -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio10">

      <h1 class="__form-title">Sua identificação</h1>   

      <div class="signin-btns" v-if="$store.state.user.email === null">
        <button type="button" class="facebook-btn" @click="facebookSignIn()">Continuar com Facebook</button>
        <button type="button" class="google-btn" @click="googleSignIn()">Continuar com Google</button>
        <button type="button" class="email-btn" @click="emailSignIn()">Continuar com E-mail</button>
      </div>

      <h3 class="__form-subtitle" v-if="$store.state.user.email !== null">Ótimo {{ firstName }}! Só mais algumas informações:</h3>

      <div v-if="$store.state.user.email !== null">
        <div class="item-form">
          <label>Celular</label>
          <masked-input
            type="tel"
            v-model="$store.state.passeioData.celular"
            :mask="['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
            :guide="false"
            placeholder="(  )      -    ">
          </masked-input>
        </div>
      </div>

      <!-- <h3 style="padding: .5rem 7%;font-size:16px;line-height:22px">Ao prosseguir você concorda com nossos <span style="color:#198CFE">Termos de Serviço</span>.</h3> -->

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn10">Voltar</button>
          <button type="button" class="__next" :style="form10ok" @click="nextBtn10">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## IDENTIFICAÇÃO PG.10 ########## -->




    <!-- ########## DADOS BANCÁRIOS PG.11 ########## -->
    <form class="cadastro-passeio" v-if="$store.state.cadastroPasseio11">

      <h1 class="__form-title">Seus dados bancários para depósito</h1>

      <h3 class="__form-subtitle">{{ firstName }}, para finalizar precisamos dos dados de sua conta bancária para podermos transferir seus ganhos financeiros. Não se preocupe, suas informações estarão seguras.</h3>

      <div class="recebedor-box">

          <div class="item-form">
            <label>Nome do Banco</label>
            <vue-simple-suggest
              :class="[ bankCodeError ? 'has-error' : '' ]"
              mode="select"
              v-model="$store.state.bankAccount.bankCode"
              :list="bancos"
              :filter-by-query="true">
            </vue-simple-suggest>
          </div>

          <div class="item-form">
            <label>Tipo de Conta</label>
            <select v-model="$store.state.bankAccount.type">
              <option selected :value="'conta_corrente'">Conta Corrente</option>
              <option :value="'conta_poupanca'">Conta Poupança</option>
              <option :value="'conta_corrente_conjunta'">Conta Corrente Conjunta</option>
              <option :value="'conta_poupanca_conjunta'">Conta Poupança Conjunta</option>
            </select>
          </div>

          <div class="item-form">
            <div class="flex-row" style="display:flex">
              <div class="agencia" style="flex:50%; margin-right:1rem">
                <label>Agência</label>
                <masked-input
                  :class="[ agenciaError ? 'has-error' : '' ]"
                  type="tel"
                  v-model="$store.state.bankAccount.agencia"
                  :mask="[/\d/, /\d/, /\d/, /\d/, /\d/]"
                  :guide="false">
                </masked-input>
              </div>
              <div class="agencia-dv" style="flex:50%">
                <label>Dígito</label>
                <masked-input
                  :class="[ agenciaDVError ? 'has-error' : '' ]"
                  type="tel"
                  v-model="$store.state.bankAccount.agenciaDV"
                  :mask="[/\d/]"
                  :guide="false">
                </masked-input>
              </div>
            </div>
          </div>

          <div class="item-form">
            <div class="flex-row" style="display:flex">
              <div class="conta" style="flex:50%; margin-right:1rem">
                <label>Conta Corrente</label>
                <masked-input
                  :class="[ contaError ? 'has-error' : '' ]"
                  type="tel"
                  v-model="$store.state.bankAccount.conta"
                  :mask="[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]"
                  :guide="false">
                </masked-input>
              </div>
              <div class="conta-dv" style="flex:50%">
                <label>Dígito</label>
                <masked-input
                :class="[ contaDVError ? 'has-error' : '' ]"
                  type="tel"
                  v-model="$store.state.bankAccount.contaDV"
                  :mask="[/\d/, /\d/]"
                  :guide="false">
                </masked-input>
              </div>
            </div>
          </div>

          <div class="item-form">
            <label>Seu Nome Completo</label>
            <input type="text" v-model="$store.state.bankAccount.legalName" :class="[ legalNameError ? 'has-error' : '' ]">
          </div>

          <div class="item-form">
            <label>CPF</label>
            <masked-input
              :class="[ docNumberError ? 'has-error' : '' ]"
              type="tel"
              v-model="$store.state.bankAccount.docNumber"
              :mask="[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]"
              :guide="false">
            </masked-input>
          </div>

      </div> 


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn11">Voltar</button>
          <button type="button" class="__next" :style="form11ok" @click="concluir">Anunciar</button>
        </div>
      </div> 
    
    </form><!-- ########## DADOS BANCÁRIOS PG.11 ########## -->




    <!-- CADASTRO EVENTO -->

  </div>
</template>

<script>
import isMobile from 'ismobilejs'
import pagarme from 'pagarme'
import * as firebase from 'firebase'
import MaskedInput from 'vue-text-mask'
import { bancos } from '../../../mixins/bancos'
import VueSimpleSuggest from 'vue-simple-suggest'


export default {
  components: { 
    MaskedInput, VueSimpleSuggest
  },
  mixins: [bancos],
  head () {
    return {
      title: 'Anunciar Passeio em Capitólio ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
  data () {
    return {
      title: '',/* Vue Autosize */
      subtitle: '',/* Vue Autosize */
      localSaida: '',
      showCroppaModal1: false,
      showCroppaModal2: false,
      imageURL1: null,
      imageURL2: null,
      bankCodeError: false,
      agenciaError: false,
      agenciaDVError: false,
      contaError: false,
      contaDVError: false,
      legalNameError: false,
      docNumberError: false
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
        const blobPasL1 = await this.$refs.myCroppa1.promisedBlob('image/jpeg', 0.01)
        const blobPasH1J = await this.$refs.myCroppa1.promisedBlob('image/jpeg')
        const blobPasH1W = await this.$refs.myCroppa1.promisedBlob('image/webp')
        let url1 = URL.createObjectURL(blobPasH1J)
        this.imageURL1 = url1
        this.$store.state.blobPasL1 = blobPasL1
        this.$store.state.blobPasH1J = blobPasH1J
        this.$store.state.blobPasH1W = blobPasH1W
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
        const blobPasL2 = await this.$refs.myCroppa2.promisedBlob('image/jpeg', 0.01)
        const blobPasH2J = await this.$refs.myCroppa2.promisedBlob('image/jpeg')
        const blobPasH2W = await this.$refs.myCroppa2.promisedBlob('image/webp')
        let url2 = URL.createObjectURL(blobPasH2J)
        this.imageURL2 = url2
        this.$store.state.blobPasL2 = blobPasL2
        this.$store.state.blobPasH2J = blobPasH2J
        this.$store.state.blobPasH2W = blobPasH2W
      }
    },
    removeImage2 () {
      this.imageURL2 = null
      this.$refs.myCroppa2.remove()
      this.showCroppaModal2 = false
    },
    /* ******************** LOCAL SAÍDA ******************** */
    setLocalSaida (e) {
      this.$store.commit('m_localSaida', e.target.value)
    },
    /* ******************** BACK BUTTONS ******************** */
    backBtn1 () {
      this.$store.commit('m_cadastroPasseio1', false), this.$store.commit('m_cadastroPasseio0', true)
    },
    backBtn2 () {
      this.$store.commit('m_cadastroPasseio2', false), this.$store.commit('m_cadastroPasseio1', true)
    },
    backBtn3 () {
      this.$store.commit('m_cadastroPasseio3', false), this.$store.commit('m_cadastroPasseio2', true)
    },
    backBtn4 () {
      this.$store.commit('m_cadastroPasseio4', false), this.$store.commit('m_cadastroPasseio3', true)
    },
    backBtn5 () {
      this.$store.commit('m_cadastroPasseio5', false), this.$store.commit('m_cadastroPasseio4', true)
    },
    backBtn6 () {
      this.$store.commit('m_cadastroPasseio6', false), this.$store.commit('m_cadastroPasseio5', true)
    },
    backBtn7 () {
      this.$store.commit('m_cadastroPasseio7', false), this.$store.commit('m_cadastroPasseio6', true)
    },
    backBtn8 () {
      this.$store.commit('m_cadastroPasseio8', false), this.$store.commit('m_cadastroPasseio7', true)
    },
    backBtn9 () {
      this.$store.commit('m_cadastroPasseio9', false), this.$store.commit('m_cadastroPasseio8', true)
    },
    backBtn10 () {
      this.$store.commit('m_cadastroPasseio10', false), this.$store.commit('m_cadastroPasseio9', true)
    },
    backBtn11 () {
      this.$store.commit('m_cadastroPasseio11', false), this.$store.commit('m_cadastroPasseio10', true)
    },
    /* ******************** NEXT BUTTONS ******************** */
    nextBtn1 () {
      if (this.$store.state.passeioData.tipoPasseio !== null) {
        this.$store.commit('m_cadastroPasseio1', false), this.$store.commit('m_cadastroPasseio2', true), this.$store.commit('m_passeioProgressBar', (100/11)*2)
      }
    },
    nextBtn2 () {
      if (this.$store.state.passeioData.capacidade !== null) {
        this.$store.commit('m_cadastroPasseio2', false), this.$store.commit('m_cadastroPasseio3', true), this.$store.commit('m_passeioProgressBar', (100/11)*3)
      }
    },
    nextBtn3 () {
      if (this.$store.state.passeioData.duracao !== null) {
        this.$store.commit('m_cadastroPasseio3', false), this.$store.commit('m_cadastroPasseio4', true), this.$store.commit('m_passeioProgressBar', (100/11)*4)
      }
    },
    nextBtn4 () {
      if (this.$store.state.passeioData.localSaida !== null && this.$store.state.passeioData.localSaida !== 'Outro') {
        this.$store.commit('m_cadastroPasseio4', false), this.$store.commit('m_cadastroPasseio5', true), this.$store.commit('m_passeioProgressBar', (100/11)*5)
      } else if (this.localSaida !== '') {
        this.$store.commit('m_cadastroPasseio4', false), this.$store.commit('m_cadastroPasseio5', true), this.$store.commit('m_passeioProgressBar', (100/11)*5), this.$store.commit('m_localSaida', this.localSaida)
      }
    },
    nextBtn5 () {
      if (1<2) {
        this.$store.commit('m_cadastroPasseio5', false), this.$store.commit('m_cadastroPasseio6', true), this.$store.commit('m_passeioProgressBar', (100/11)*6)
      }
    },
    nextBtn6 () {
      if (this.$store.state.passeioData.valorPasseio !== 0) {
        this.$store.commit('m_cadastroPasseio6', false), this.$store.commit('m_cadastroPasseio7', true), this.$store.commit('m_passeioProgressBar', (100/11)*7)
      }
    },
    nextBtn7 () {
      if (this.imageURL1 !== null) {
        this.$store.commit('m_cadastroPasseio7', false), this.$store.commit('m_cadastroPasseio8', true), this.$store.commit('m_passeioProgressBar', (100/11)*8)
      }
    },
    nextBtn8 () {
      if (this.$store.state.passeioData.title !== '') {
        this.$store.commit('m_cadastroPasseio8', false), this.$store.commit('m_cadastroPasseio9', true), this.$store.commit('m_passeioProgressBar', (100/11)*9)
      }
    },
    nextBtn9 () {
      if (this.$store.state.passeioData.subtitle !== '') {
        this.$store.commit('m_cadastroPasseio9', false), this.$store.commit('m_cadastroPasseio10', true), this.$store.commit('m_passeioProgressBar', (100/11)*10)
      }
    },
    nextBtn10 () {
      if (this.$store.state.passeioData.celular.length === 15) {
        this.$store.commit('m_cadastroPasseio10', false), this.$store.commit('m_cadastroPasseio11', true), this.$store.commit('m_passeioProgressBar', (100/11)*11)
      }
    },
    concluir () {
      if (this.bankCode !== '' && this.agencia !== '' && this.agenciaDV !== '' && this.conta !== '' && this.contaDV !== '' && this.legalName !== '' && this.docNumber.length === 14) {
        this.$store.commit('m_loader', true)
        const passeioID = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000).toString()
        this.$store.commit('m_passeioID', passeioID)
        const storageRef = firebase.storage().ref('passeios/' + passeioID + '/')
        /* 
        CRIAR RECEBEDOR
        */
        pagarme.client.connect({ api_key: 'ak_test_E3I46o4e7guZDqwRnSY9sW8o8HrL9D' })
          .then(client => client.recipients.create({
            transfer_enabled: false,
            transfer_interval: "daily",
            automatic_anticipation_enabled: true,
            anticipatable_volume_percentage: 100,
            bank_account: {
              bank_code: this.bankCode.substring(0, 3),
              type: this.type,
              agencia: this.agencia,
              agencia_dv: this.agenciaDV,
              conta: this.conta,
              conta_dv: this.contaDV,
              legal_name: this.legalName,
              document_number: this.docNumber.replace(/\./g, '').replace(/\-/g, '')
            }
          })
        )
        .then(recipient => {
          console.log(recipient)
          this.$store.state.passeioData.recipientID = recipient.id.toString()
          /* 
          UPLOAD IMAGE 1 
          */
          /* imagePasL1 */
          storageRef.child('imageL1.jpeg').put(this.$store.state.blobPasL1).then(snapshot => {
            console.log(passeioID + 'L1' + '.jpeg')
            storageRef.child('imageL1.jpeg').getDownloadURL().then(url => {
              this.$store.commit('m_imagePasL1', url)
              this.ifUpload1()
            })
          })
          /* imagePasH1J */
          storageRef.child('imageH1J.jpeg').put(this.$store.state.blobPasH1J).then(snapshot => {
            console.log(passeioID + 'H1J' + '.jpeg')
            storageRef.child('imageH1J.jpeg').getDownloadURL().then(url => {
              this.$store.commit('m_imagePasH1J', url)
              this.ifUpload1()
            })
          })
          /* imagePasH1W */
          storageRef.child('imageH1W.webp').put(this.$store.state.blobPasH1W).then(snapshot => {
            console.log(passeioID + 'H1W' + '.webp')
            storageRef.child('imageH1W.webp').getDownloadURL().then(url => {
              this.$store.commit('m_imagePasH1W', url)
              this.ifUpload1()
            })
          })
          /* 
          UPLOAD IMAGE 2 
          */
          if (this.$store.state.blobPasH2J !== null) {
            /* imagePasL2 */
            storageRef.child('imageL2.jpeg').put(this.$store.state.blobPasL2).then(snapshot => {
              console.log(passeioID + 'L2' + '.jpeg')
              storageRef.child('imageL2.jpeg').getDownloadURL().then(url => {
                this.$store.commit('m_imagePasL2', url)
                this.ifUpload2()
              })
            })
            /* imagePasH2J */
            storageRef.child('imageH2J.jpeg').put(this.$store.state.blobPasH2J).then(snapshot => {
              console.log(passeioID + 'H2J' + '.jpeg')
              storageRef.child('imageH2J.jpeg').getDownloadURL().then(url => {
                this.$store.commit('m_imagePasH2J', url)
                this.ifUpload2()
              })
            })
            /* imagePasH2W */
            storageRef.child('imageH2W.webp').put(this.$store.state.blobPasH2W).then(snapshot => {
              console.log(passeioID + 'H2W' + '.webp')
              storageRef.child('imageH2W.webp').getDownloadURL().then(url => {
                this.$store.commit('m_imagePasH2W', url)
                this.ifUpload2()
              })
            })
          }
          this.$store.commit('m_passeioCreated', true)
          /* Resetar imagens */
          this.imageURL1 = null,
          this.imageURL2 = null
        })
        .catch(err => {
          if (err) {
            console.log(err.response.errors)
            this.$store.commit('m_loader', false)
            err.response.errors.some(e => e.parameter_name === 'bank_code') ? this.bankCodeError = true : this.bankCodeError = false
            err.response.errors.some(e => e.parameter_name === 'agencia') ? this.agenciaError = true : this.agenciaError = false
            err.response.errors.some(e => e.parameter_name === 'agencia_dv') ?  this.agenciaDVError = true :  this.agenciaDVError = false
            err.response.errors.some(e => e.parameter_name === 'conta') ? this.contaError = true : this.contaError = false
            err.response.errors.some(e => e.parameter_name === 'conta_dv') ? this.contaDVError = true : this.contaDVError = false
            err.response.errors.some(e => e.parameter_name === 'legal_name') ? this.legalNameError = true : this.legalNameError = false
            err.response.errors.some(e => e.parameter_name === 'document_number') ? this.docNumberError = true : this.docNumberError = false
          }
        })
      } else {
        this.bankCode === '' ? this.bankCodeError = true : this.bankCodeError = false
        this.agencia === '' ? this.agenciaError = true : this.agenciaError = false
        this.agenciaDV === '' ?  this.agenciaDVError = true :  this.agenciaDVError = false
        this.conta === '' ? this.contaError = true : this.contaError = false
        this.contaDV === '' ? this.contaDVError = true : this.contaDVError = false
        this.legalName === '' ? this.legalNameError = true : this.legalNameError = false
        this.docNumber.length !== 14 ? this.docNumberError = true : this.docNumberError = false
      }
    },
    ifUpload1 () {
      if (this.$store.state.passeioData.imageL1 !== null && this.$store.state.passeioData.imageH1J !== null && this.$store.state.passeioData.imageH1W !== null) {
        this.$store.dispatch('a_uploadPasseio')
        this.$router.push('/passeios/' + this.$store.state.passeioData.passeioID)
      }
    },
    ifUpload2 () {
      if (this.$store.state.passeioData.imageL1 !== null && this.$store.state.passeioData.imageH1J !== null && this.$store.state.passeioData.imageH1W !== null && this.$store.state.passeioData.imageL2 !== null && this.$store.state.passeioData.imageH2J !== null && this.$store.state.passeioData.imageH2W !== null) {
        this.$store.dispatch('a_uploadPasseio')
        this.$router.push('/passeios/' + this.$store.state.passeioData.passeioID)
      }
    }
  },
  computed: {
    bankCode () { return this.$store.state.bankAccount.bankCode },
    type () { return this.$store.state.bankAccount.type },
    agencia () { return this.$store.state.bankAccount.agencia },
    agenciaDV () { return this.$store.state.bankAccount.agenciaDV },
    conta () { return this.$store.state.bankAccount.conta },
    contaDV () { return this.$store.state.bankAccount.contaDV },
    legalName () { return this.$store.state.bankAccount.legalName },
    docNumber () { return this.$store.state.bankAccount.docNumber },
    titleLength () {
      return 50 - this.$store.state.passeioData.title.length
    },
    subtitleLength () {
      return 600 - this.$store.state.passeioData.subtitle.length
    },
    firstName () {
      let fullName = this.$store.state.passeioData.proprietario.split(' ')
      let firstName = fullName[0]
      return firstName
    },
    form1ok () {
      return this.$store.state.passeioData.tipoPasseio !== null ? 'background:#198CFE' : ''
    },
    form2ok () {
      return this.$store.state.passeioData.capacidade !== null ? 'background:#198CFE' : ''
    },
    form3ok () {
      return this.$store.state.passeioData.duracao !== null ? 'background:#198CFE' : ''
    },
    form4ok () {
      return this.$store.state.passeioData.localSaida !== null && this.$store.state.passeioData.localSaida !== 'Outro' ? 'background:#198CFE'
      : this.localSaida !== '' ? 'background:#198CFE' 
      : ''
    },
    form5ok () {
      return 1<2 ? 'background:#198CFE' : ''
    },
    form6ok () {
      return this.$store.state.passeioData.valorPasseio !== 0 ? 'background:#198CFE' : ''
    },
    form7ok () {
      return this.imageURL1 !== null ? 'background:#198CFE' : ''
    },
    form8ok () {
      return this.$store.state.passeioData.title !== '' ? 'background:#198CFE' : ''
    },
    form9ok () {
      return this.$store.state.passeioData.subtitle !== '' ? 'background:#198CFE' : ''
    },
    form10ok () {
      return this.$store.state.passeioData.celular.length === 15 ? 'background:#198CFE' : ''
    },
    form11ok () {
      return this.bankCode !== null && this.agencia !== '' && this.agenciaDV !== '' && this.conta !== '' && this.contaDV !== '' && this.legalName !== '' && this.docNumber.length === 14 ? 'background:#198CFE' : ''
    },
    passeioCreated () {
      return this.$store.state.passeioCreated
    }
  },
  watch: {
    passeioCreated (value) {
      value === true ? this.$router.push('/') : ''
    },
    bankCode (value) { value !== '' ? this.bankCodeError = false : '' },
    agencia (value) { value !== '' ? this.agenciaError = false : '' },
    agenciaDV (value) { value !== '' ? this.agenciaDVError = false : '' },
    conta (value) { value !== '' ? this.contaError = false : '' },
    contaDV (value) { value !== '' ? this.contaDVError = false : '' },
    legalName (value) { value !== '' ? this.legalNameError = false : '' },
    docNumber (value) { value !== '' ? this.docNumberError = false : ''},
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
@import url('../../../assets/css/main.css');
@import url('../../../assets/css/vue-simple-suggest.css');

.anunciar-passeio {
  margin-top: 3.4rem;
  transition: var(--main-transition);
  & .progress-bar {
    position: fixed;
    top: 3.4rem;
    height: 3px;
    z-index: 8888;
    background: var(--colorPasseio);
    transition: all .3s ease;
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
    color: var(--color01);
    padding: 0 0 3rem 0;
    & .__form-title {
      padding: 3rem 7% 1.5rem 7%;
      line-height: 35px;
      font-size: 27px;
      font-weight: 700;
      z-index: 999;
    }
    & .__form-subtitle {
      padding: 0 7%;
      font-size: var(--fontSizeAnuncioText);
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
      color: rgb(92, 92, 92);
    }
    & .item-form {
      padding: 0 7%;
      display: flex;
      flex-flow: column;
      margin: 1.7rem 0;
      & label {
        font-weight: 600;
        font-size: 15px;
      }
      & input {
        cursor: text;
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
      & select {
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
      & .__local-saida-text {
        padding: .5rem 0 .6rem 0;
        border-bottom: 1px solid rgb(222,222,222);
      }
    }
    & .recebedor-box {
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
        & .modal-croppa-btns {
          display: flex;
          flex-flow: column;
          width: 70%;
        }
      }
    }
    & .__input-btn {
      margin: 1rem 7%;
      font-size: 15px;
      font-weight: 600;
      background: #198CFE;
      color: white;
      padding: .8rem 1.2rem;
      border-radius: 2rem;
    }
    & .__croppa-btn {
      margin: .3rem 0;
      font-size: 16px;
      font-weight: 500;
      background: var(--colorPasseio);
      color: white;
      padding: .8rem 1.2rem;
      border-radius: 2rem;
    }
    & .after-choose-image {
      margin-top: 1.5rem;
      padding: 0 calc(7% - .3rem);
      display: flex;
      flex-flow: row wrap;
      & .image-box {
        cursor: pointer;
        position: relative;
        margin: .3rem;
        width: 145px;
        height: 97px;
        & .__foto-principal {
          position: absolute;
          color: white;
          background: rgba(0, 0, 0, 0.4);
          font-size: 12px;
          padding: .2rem 0;
          width: 100%;
          text-align: center;
        }
        & .__preview-img {
          width: 100%;
          height: 100%;
          border-radius: 2px;
        }
      }
    }
    & .signin-btns {
      display: flex;
      flex-flow: column;
      padding: 0 7%;
      & .facebook-btn {
        width: 17rem;
        margin: .7rem 0;
        height: 2.9rem;
        text-align: start;
        padding-left: 50px;
        font-size: 15px;
      }
      & .google-btn {
        width: 17rem;
        margin: .7rem 0;
        height: 2.9rem;
        text-align: start;
        padding-left: 50px;
        font-size: 15px;
      }
      & .email-btn {
        width: 17rem;
        margin: .7rem 0;
        height: 2.9rem;
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
          font-weight: 500;
          border-radius: 2rem 0 0 2rem;
          background: white;
        }
        & .__next {
          font-size: 16px;
          font-weight: 500;
          border-radius: 0 2rem 2rem 0;
          transition: all .3s ease;
          background: rgb(222,222,222);
          color: white;
        }
      }
    }
  }
}

@media (min-width: 1024px) {
  .anunciar-passeio {
    margin-top: 4rem;
    & .progress-bar {
      top: 4rem;
      height: 6px;
    }
    & .plano-passeio-mobile {
      display: none;
    }
    & .plano-passeio-desktop {
      padding: 0 7%;
      display: flex;
      height: calc(100vh - 4rem);
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
          font-weight: 700;
          width: 13rem;
          height: 3rem;
          color: white;
          background: var(--colorPasseio);
          border-radius: 2rem;
          font-size: var(--fontSizeAnuncioText);
        }
      }
      & .__img-header {
        flex: 30%;
        width: 1rem;
        height: auto;
      }
    }
    & .cadastro-passeio {
      padding: 0 0 7rem 0;
      & .__form-title {
        padding: 3.5rem 26% 1.2rem;
        font-size: 32px;
        font-weight: 700;
        text-align: center;
      }
      & .__form-subtitle {
        padding: 1.4rem 26% 0;
        font-size: 17px;
      }
      & textarea {
        padding: 0 26%;
        margin: 1.7rem 0 .6rem 0;
      }
      & .__lenght-calc {
        padding: 0 26%;
      }
      & .item-form {
        padding: 0 26%;
        margin: 2.6rem 0;
        & label {
          font-size: 16px;
        }
        & input {
          font-size: 17px;
          font-weight: 400;
          padding: .5rem 0 .6rem 0;
        }
        & select {
          font-size: 17px;
          font-weight: 400;
          padding: .5rem 0 .6rem 0;
        }
      }
      & .modal-croppa {
        & .modal-croppa-body {
          & h1 {
          }
          & canvas {
            border: 3px dashed white;
          }
          & .modal-croppa-btns {
            width: 50%
          }
        }
      }
      & .before-choose-image {
        display: flex;
        flex-flow: column;
        align-items: center;
        & .__input-btn {
          margin: 2rem 0 0 0;
        }
      }
      & .__croppa-btn {
      }
      & .after-choose-image {
        margin-top: 2rem;
        padding: 0 calc(26% - .3rem);
        & .image-box {
          width: 165px;
          height: 110px;
          & .__foto-principal {
          }
          & .__preview-img {
          }
        }
      }
      & .signin-btns {
        padding: .8rem 40% 0;
        & .facebook-btn {
          width: 100%;
        }
        & .google-btn {
          width: 100%;
        }
        & .email-btn {
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
            cursor: pointer;
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
