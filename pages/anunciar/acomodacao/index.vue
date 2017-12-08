<template>
  <div class="anunciar-acomodacao">

    <!-- PLANO ACOMODAÇÃO -->
    <div class="plano-acomodacao" v-show="$store.state.cadastroAcomod0">
      
      <img class="__img-header" src="../../../assets/img/anuncio-estadia.svg">
       
      <h1 class="__title">Amplie seus ganhos anunciando sua casa com a gente!</h1>
      
      <span class="__subtitle">Como funciona?</span>
      <h3 class="__item">A Escarpas Trip </h3>


      <span class="__subtitle">Quais as vantagens?</span>
      <h3 class="__item">Destaque nas redes sociais</h3>
      <h3 class="__item">Transparência</h3>
      <h3 class="__item">Segurança</h3>
      
      <span class="__subtitle">Investimento Mensal</span>
      <span class="__price">R$59</span>
      <h3 class="__subitem">Primeiro mês grátis</h3>
      <h3 class="__subitem">Cancele quando quiser</h3>

      <button class="__anunciar-btn" @click="$store.commit('m_cadastroAcomod1', true), $store.commit('m_cadastroAcomod0', false), $store.commit('m_acomodProgressBar', (100/11))">Anunciar</button>

    </div><!-- PLANO ACOMODAÇÃO -->




    <div class="progress-bar" v-show="!$store.state.cadastroAcomod0" :style="'width:' + $store.state.acomodProgressBar + '%'"></div>




    <!-- CADASTRO ACOMODAÇÃO -->



    <!-- ########## TIPO DE ACOMODAÇÃO PG.1 ########## -->
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod1">

      <h1 class="__form-title">Que tipo de propriedade deseja anunciar?</h1>

      <div class="item-form">
        <label>Tipo</label>
        <select v-model="$store.state.acomodData.tipoAcomod">
          <option>Casa</option>
          <option>Rancho</option>
          <option>Chácara</option>
          <option>Pousada</option>
          <option>Camping</option>
          <option>Sítio</option>
          <option>Fazenda</option>
          <option>Hostel</option>
        </select>
      </div> 

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn1">Voltar</button>
          <button type="button" class="__next" :style="form1ok" @click="nextBtn1">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## TIPO DE ACOMODAÇÃO PG.1 ########## -->




    <!-- ########## TOTAL DE HÓSPEDES PG.2 ########## -->
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod2">

      <h1 class="__form-title">Quantas pessoas podem se hospedar?</h1>

      <div class="item-form">
        <label>Total de Hóspedes</label>
        <select v-model="$store.state.acomodData.totalHospedes">
          <option v-for="n in 20">{{ n }}</option>
          <option>Mais de 20</option>
        </select>
      </div> 

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn2">Voltar</button>
          <button type="button" class="__next" :style="form2ok" @click="nextBtn2">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## TOTAL DE HÓSPEDES PG.2 ########## -->




    <!-- ########## CARACTERÍSTICAS PG.3 ########## -->
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod3">

      <h1 class="__form-title">Características físicas {{ tipoAcomodText }}</h1>

      <div class="item-form">
        <label>Nº de Suítes</label>
        <select v-model="$store.state.acomodData.totalSuites">
          <option>0</option>
          <option v-for="n in 6">{{ n }}</option>
          <option>Mais de 6</option>
        </select>
      </div> 

      <div class="item-form">
        <label>Nº de Quartos</label>
        <select v-model="$store.state.acomodData.totalQuartos">
          <option>0</option>
          <option v-for="n in 10">{{ n }}</option>
          <option>Mais de 10</option>
        </select>
      </div> 

      <div class="item-form">
        <label>Nº de Camas Casal</label>
        <select v-model="$store.state.acomodData.totalCamasCasal">
          <option>0</option>
          <option v-for="n in 10">{{ n }}</option>
          <option>Mais de 10</option>
        </select>
      </div> 

      <div class="item-form">
        <label>Nº de Camas Solteiro</label>
        <select v-model="$store.state.acomodData.totalCamasSolteiro">
          <option>0</option>
          <option v-for="n in 10">{{ n }}</option>
          <option>Mais de 10</option>
        </select>
      </div> 

      <div class="item-form">
        <label>Nº de Banheiros</label>
        <select v-model="$store.state.acomodData.totalBanheiros">
          <option v-for="n in 6">{{ n }}</option>
          <option>Mais de 6</option>
        </select>
      </div> 

      <div class="item-form">
        <label>Lugares na Garagem</label>
        <select v-model="$store.state.acomodData.totalGaragem">
          <option v-for="n in 6">{{ n }}</option>
          <option>Mais de 6</option>
        </select>
      </div> 


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn3">Voltar</button>
          <button type="button" class="__next" :style="form3ok" @click="nextBtn3">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## CARACTERÍSTICAS PG.3 ########## -->




    <!-- ########## COMODIDADES PG.4 ########## -->
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod4">

      <h1 class="__form-title">Quais comodidades são oferecidas?</h1>

      <div class="comodidades-box">
        <div class="item-form-switches">
          <h3>Roupas de Cama</h3>
          <label class="switch">
            <input type="checkbox" v-model="$store.state.acomodData.hasRoupasCama">
            <span class="slider round"></span>
          </label>
        </div>

        <div class="item-form-switches">
          <h3>Toalhas</h3>
          <label class="switch">
            <input type="checkbox" v-model="$store.state.acomodData.hasToalhas">
            <span class="slider round"></span>
          </label>
        </div>

        <div class="item-form-switches">
          <h3>Churrasqueira</h3>
          <label class="switch">
            <input type="checkbox" v-model="$store.state.acomodData.hasChurrasqueira">
            <span class="slider round"></span>
          </label>
        </div>

        <div class="item-form-switches">
          <h3>Piscina</h3>
          <label class="switch">
            <input type="checkbox" v-model="$store.state.acomodData.hasPiscina">
            <span class="slider round"></span>
          </label>
        </div>

        <div class="item-form-switches">
          <h3>Sauna</h3>
          <label class="switch">
            <input type="checkbox" v-model="$store.state.acomodData.hasSauna">
            <span class="slider round"></span>
          </label>
        </div>

        <div class="item-form-switches">
          <h3>Wi-Fi</h3>
          <label class="switch">
            <input type="checkbox" v-model="$store.state.acomodData.hasWifi">
            <span class="slider round"></span>
          </label>
        </div>

        <div class="item-form-switches">
          <h3>Ar condicionado</h3>
          <label class="switch">
            <input type="checkbox" v-model="$store.state.acomodData.hasArCond">
            <span class="slider round"></span>
          </label>
        </div>

        <div class="item-form-switches" style="border:none">
          <h3>Marina</h3>
          <label class="switch">
            <input type="checkbox" v-model="$store.state.acomodData.hasMarina">
            <span class="slider round"></span>
          </label>
        </div>

        
      </div>
      


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn4">Voltar</button>
          <button type="button" class="__next" :style="form4ok" @click="nextBtn4">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## COMODIDADES PG.4 ########## -->




    <!-- ########## LOCAL PG.5 ########## -->
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod5">

      <h1 class="__form-title">Qual a localização?</h1>

      


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn5">Voltar</button>
          <button type="button" class="__next" :style="form5ok" @click="nextBtn5">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## LOCAL PG.5 ########## -->




    <!-- ########## IMAGEM E VÍDEOS PG.6 ########## -->
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod6">

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
          :placeholder-color="'rgb(232,232,222)'"
          :accept="'image/*'"
          :zoom-speed="2"
          :prevent-white-space="true"
          :show-remove-button="false"
          @file-choose="imageChoose1">
          </croppa>
          <div class="modal-croppa-btns">
            <button class="__croppa-btn" type="button" @click="showCroppaModal1=false, imageConfirmed1()">Confirmar</button>
            <button class="__croppa-btn"type="button" @click="$refs.myCroppa1.chooseFile(), $refs.myCroppa1.remove(), imageURL1 = null"  style="background:transparent">Escolher outra</button>
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
            <button class="__croppa-btn"type="button" @click="$refs.myCroppa2.chooseFile(), $refs.myCroppa2.remove(), imageURL2 = null"  style="background:transparent">Escolher outra</button>
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
          <button type="button" class="__back" @click="backBtn6">Voltar</button>
          <button type="button" class="__next" :style="form6ok" @click="nextBtn6">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## IMAGEM E VÍDEOS PG.6 ########## -->




    <!-- ########## VALOR DO ALUGUEL PG.7 ########## -->
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod7">

      <h1 class="__form-title">Quanto será cobrado?</h1>

      


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn7">Voltar</button>
          <button type="button" class="__next" :style="form7ok" @click="nextBtn7">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## VALOR DO ALUGUEL PG.7 ########## -->




    <!-- ########## TÍTULO PG.8 ########## -->
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod8">

      <h1 class="__form-title">Dê um nome para seu anúncio</h1>

      <textarea 
      v-model="$store.state.acomodData.title"
      v-autosize="title"
      maxlength="50"
      rows="1"
      placeholder="ex: Linda casa em Escarpas do Lago"
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
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod9">

      <h1 class="__form-title">Descreva melhor seu anúncio</h1>   

      <textarea 
      v-model="$store.state.acomodData.subtitle"
      v-autosize="subtitle"
      maxlength="400"
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
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod10">

      <h1 class="__form-title">Seus dados pessoais para contato</h1>   


      <h3 style="padding: .5rem 7% .7rem 7%" v-if="this.$store.state.acomodData.proprietario === null">Obter dados com:</h3>

      <div class="signin-btns" v-if="$store.state.acomodData.proprietario === null">
        <button type="button" class="facebook-btn" @click="facebookSignIn()">Facebook</button>
        <button type="button" class="google-btn" @click="googleSignIn()">Google</button>
      </div>

      <h3 style="padding: .5rem 7% 0 7%" v-if="$store.state.acomodData.proprietario !== null">Ótimo {{ firstName }}! Só mais algumas informações:</h3>

      <div v-if="$store.state.acomodData.proprietario !== null">
        <div class="item-form">
          <label>Celular</label>
          <masked-input
            type="tel"
            v-model="$store.state.acomodData.celular"
            :mask="['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
            :guide="true"
            placeholder="(__) _____-____"
            placeholderChar="_">
          </masked-input>
        </div>
      </div>

      <!-- <h3 style="padding: .5rem 7%;font-size:16px;line-height:22px">Ao prosseguir você concorda com nossos <span style="color:#49A5FC">Termos de Serviço</span>.</h3> -->

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn10">Voltar</button>
          <button type="button" class="__next" :style="form10ok" @click="nextBtn10">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## IDENTIFICAÇÃO PG.10 ########## -->





    <!-- ########## INVESTIMENTO PG.11 ########## -->
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod11">

      <h1 class="__form-title">Investimento</h1>   


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn11">Voltar</button>
          <button type="button" class="__next" :style="form11ok" @click="concluir">Concluir</button>
        </div>
      </div> 
    
    </form><!-- ########## INVESTIMENTO PG.11 ########## -->


    <!-- CADASTRO ACOMODAÇÃO -->


  </div>
</template>

<script>
import * as firebase from 'firebase'
import MaskedInput from 'vue-text-mask'

export default {
  components: { 
    MaskedInput
  },
  head () {
    return {
      title: 'Anunciar Acomodação em Escarpas do Lago ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
  data() {
    return {
      title: '',/* Vue Autosize */
      subtitle: '',/* Vue Autosize */
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
    /* ******************** IMAGE INPUT ******************** */
    /* --- Image 1 --- */
    imageChoose1 () {
      this.showCroppaModal1 = true
    },
    async imageConfirmed1 () {
      if (this.imageURL1 !== null) {
        return 
      } else {
        const blobAcL1 = await this.$refs.myCroppa1.promisedBlob('image/jpeg', 0.01)
        const blobAcH1J = await this.$refs.myCroppa1.promisedBlob('image/jpeg')
        const blobAcH1W = await this.$refs.myCroppa1.promisedBlob('image/webp')
        let url1 = URL.createObjectURL(blobAcH1J)
        this.imageURL1 = url1
        this.$store.state.blobAcL1 = blobAcL1
        this.$store.state.blobAcH1J = blobAcH1J
        this.$store.state.blobAcH1W = blobAcH1W
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
        const blobAcL2 = await this.$refs.myCroppa2.promisedBlob('image/jpeg', 0.01)
        const blobAcH2J = await this.$refs.myCroppa2.promisedBlob('image/jpeg')
        const blobAcH2W = await this.$refs.myCroppa2.promisedBlob('image/webp')
        let url2 = URL.createObjectURL(blobAcH2J)
        this.imageURL2 = url2
        this.$store.state.blobAcL2 = blobAcL2
        this.$store.state.blobAcH2J = blobAcH2J
        this.$store.state.blobAcH2W = blobAcH2W
      }
    },
    removeImage2 () {
      this.imageURL2 = null
      this.$refs.myCroppa2.remove()
      this.showCroppaModal2 = false
    },
    /* ******************** BACK BUTTONS ******************** */
    backBtn1 () {
      this.$store.commit('m_cadastroAcomod1', false), this.$store.commit('m_cadastroAcomod0', true)
    },
    backBtn2 () {
      this.$store.commit('m_cadastroAcomod2', false), this.$store.commit('m_cadastroAcomod1', true)
    },
    backBtn3 () {
      this.$store.commit('m_cadastroAcomod3', false), this.$store.commit('m_cadastroAcomod2', true)
    },
    backBtn4 () {
      this.$store.commit('m_cadastroAcomod4', false), this.$store.commit('m_cadastroAcomod3', true)
    },
    backBtn5 () {
      this.$store.commit('m_cadastroAcomod5', false), this.$store.commit('m_cadastroAcomod4', true)
    },
    backBtn6 () {
      this.$store.commit('m_cadastroAcomod6', false), this.$store.commit('m_cadastroAcomod5', true)
    },
    backBtn7 () {
      this.$store.commit('m_cadastroAcomod7', false), this.$store.commit('m_cadastroAcomod6', true)
    },
    backBtn8 () {
      this.$store.commit('m_cadastroAcomod8', false), this.$store.commit('m_cadastroAcomod7', true)
    },
    backBtn9 () {
      this.$store.commit('m_cadastroAcomod9', false), this.$store.commit('m_cadastroAcomod8', true)
    },
    backBtn10 () {
      this.$store.commit('m_cadastroAcomod10', false), this.$store.commit('m_cadastroAcomod9', true)
    },
    backBtn11 () {
      this.$store.commit('m_cadastroAcomod11', false), this.$store.commit('m_cadastroAcomod10', true)
    },
    /* ******************** NEXT BUTTONS ******************** */
    nextBtn1 () {
      if (this.$store.state.acomodData.tipoAcomod !== null) {
        this.$store.commit('m_cadastroAcomod1', false), this.$store.commit('m_cadastroAcomod2', true), this.$store.commit('m_acomodProgressBar', (100/11)*2)
      }
    },
    nextBtn2 () {
      if (this.$store.state.acomodData.totalHospedes !== null) {
        this.$store.commit('m_cadastroAcomod2', false), this.$store.commit('m_cadastroAcomod3', true), this.$store.commit('m_acomodProgressBar', (100/11)*3)
      }
    },
    nextBtn3 () {
      if (1<2) {
        this.$store.commit('m_cadastroAcomod3', false), this.$store.commit('m_cadastroAcomod4', true), this.$store.commit('m_acomodProgressBar', (100/11)*4)
      }
    },
    nextBtn4 () {
      if (1<2) {
        this.$store.commit('m_cadastroAcomod4', false), this.$store.commit('m_cadastroAcomod5', true), this.$store.commit('m_acomodProgressBar', (100/11)*5)
      }
    },
    nextBtn5 () {
      if (1<2) {
        this.$store.commit('m_cadastroAcomod5', false), this.$store.commit('m_cadastroAcomod6', true), this.$store.commit('m_acomodProgressBar', (100/11)*6)
      }
    },
    nextBtn6 () {
      if (this.imageURL1 !== null) {
        this.$store.commit('m_cadastroAcomod6', false), this.$store.commit('m_cadastroAcomod7', true), this.$store.commit('m_acomodProgressBar', (100/11)*7)
      }
    },
    nextBtn7 () {
      if (1<2) {
        this.$store.commit('m_cadastroAcomod7', false), this.$store.commit('m_cadastroAcomod8', true), this.$store.commit('m_acomodProgressBar', (100/11)*8)
      }
    },
    nextBtn8 () {
      if (this.$store.state.acomodData.title !== '') {
        this.$store.commit('m_cadastroAcomod8', false), this.$store.commit('m_cadastroAcomod9', true), this.$store.commit('m_acomodProgressBar', (100/11)*9)
      }
    },
    nextBtn9 () {
      if (this.$store.state.acomodData.subtitle !== '') {
        this.$store.commit('m_cadastroAcomod9', false), this.$store.commit('m_cadastroAcomod10', true), this.$store.commit('m_acomodProgressBar', (100/11)*10)
      }
    },
    nextBtn10 () {
      if (this.$store.state.acomodData.celular.length === 15) {
        this.$store.commit('m_cadastroAcomod10', false), this.$store.commit('m_cadastroAcomod11', true), this.$store.commit('m_acomodProgressBar', (100/11)*11)
      }
    },
    concluir () {
      if (1<2) {/* IF PAGAMENTO CONCLUIDO */
        this.$store.commit('m_loader', true)
        const acomodID = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000)
        this.$store.commit('m_acomodID', acomodID)
        const storageRef = firebase.storage().ref('acomodacoes/' + acomodID + '/')
        /* 
        UPLOAD IMAGE 1 
        */
        /* imageAcL1 */
        storageRef.child('imageL1.jpeg').put(this.$store.state.blobAcL1).then(snapshot => {
          console.log(acomodID + 'L1' + '.jpeg')
          storageRef.child('imageL1.jpeg').getDownloadURL().then(url => {
            this.$store.commit('m_imageAcL1', url)
            this.ifUpload1()
          })
        })
        /* imageAcH1J */
        storageRef.child('imageH1J.jpeg').put(this.$store.state.blobAcH1J).then(snapshot => {
          console.log(acomodID + 'H1J' + '.jpeg')
          storageRef.child('imageH1J.jpeg').getDownloadURL().then(url => {
            this.$store.commit('m_imageAcH1J', url)
            this.ifUpload1()
          })
        })
        /* imageAcH1W */
        storageRef.child('imageH1W.webp').put(this.$store.state.blobAcH1W).then(snapshot => {
          console.log(acomodID + 'H1W' + '.webp')
          storageRef.child('imageH1W.webp').getDownloadURL().then(url => {
            this.$store.commit('m_imageAcH1W', url)
            this.ifUpload1()
          })
        })
        /* 
        UPLOAD IMAGE 2 
        */
        if (this.$store.state.blobPasH2J !== null) {
          /* imageAcL2 */
          storageRef.child('imageL2.jpeg').put(this.$store.state.blobAcL2).then(snapshot => {
            console.log(acomodID + 'L2' + '.jpeg')
            storageRef.child('imageL2.jpeg').getDownloadURL().then(url => {
              this.$store.commit('m_imageAcL2', url)
              this.ifUpload2()
            })
          })
          /* imageAcH2J */
          storageRef.child('imageH2J.jpeg').put(this.$store.state.blobAcH2J).then(snapshot => {
            console.log(acomodID + 'H2J' + '.jpeg')
            storageRef.child('imageH2J.jpeg').getDownloadURL().then(url => {
              this.$store.commit('m_imageAcH2J', url)
              this.ifUpload2()
            })
          })
          /* imageAcH2W */
          storageRef.child('imageH2W.webp').put(this.$store.state.blobAcH2W).then(snapshot => {
            console.log(acomodID + 'H2W' + '.webp')
            storageRef.child('imageH2W.webp').getDownloadURL().then(url => {
              this.$store.commit('m_imageAcH2W', url)
              this.ifUpload2()
            })
          })
        }
      }
    },
    ifUpload1 () {
      if (this.$store.state.acomodData.imageL1 !== null && this.$store.state.acomodData.imageH1J !== null && this.$store.state.acomodData.imageH1W !== null) {
        this.$store.dispatch('a_uploadAcomod')
        this.$store.commit('m_acomods', null) /* Para não bugar as imagens */
        this.$router.push('/acomodacoes/' + this.$store.state.acomodData.acomodID)
      }
    },
    ifUpload2 () {
      if (this.$store.state.acomodData.imageL1 !== null && this.$store.state.acomodData.imageH1J !== null && this.$store.state.acomodData.imageH1W !== null && this.$store.state.acomodData.imageL2 !== null && this.$store.state.acomodData.imageH2J !== null && this.$store.state.acomodData.imageH2W !== null) {
        this.$store.dispatch('a_uploadAcomod')
        this.$store.commit('m_acomods', null) /* Para não bugar as imagens */
        this.$router.push('/acomodacoes/' + this.$store.state.acomodData.acomodID)
      }
    }
  },
  computed: {
    tipoAcomodText () {
      const path = this.$store.state.acomodData.tipoAcomod
      return path === 'Casa' ? 'da sua casa' 
           : path === 'Rancho' ? 'do seu rancho'
           : path === 'Chácara' ? 'da sua chácara'
           : path === 'Pousada' ? 'da sua pousada'
           : path === 'Camping' ? 'do seu camping'
           : path === 'Sítio' ? 'do seu sítio'
           : path === 'Fazenda' ? 'da sua fazenda'
           : path === 'Hostel' ? 'do seu hostel'
           : ''
    },
    titleLength () {
      return 50 - this.$store.state.acomodData.title.length
    },
    subtitleLength () {
      return 400 - this.$store.state.acomodData.subtitle.length
    },
    firstName () {
      let fullName = this.$store.state.acomodData.proprietario.split(' ')
      let firstName = fullName[0]
      return firstName
    },
    form1ok () {
      return this.$store.state.acomodData.tipoAcomod !== null ? 'background:#1CD8D2;cursor:pointer' : ''
    },
    form2ok () {
      return this.$store.state.acomodData.totalHospedes !== null ? 'background:#1CD8D2;cursor:pointer' : ''
    },
    form3ok () {
      return 1<2 ? 'background:#1CD8D2;cursor:pointer' : ''
    },
    form4ok () {
      return 1<2 ? 'background:#1CD8D2;cursor:pointer' : ''
    },
    form5ok () {
      return 1<2 ? 'background:#1CD8D2;cursor:pointer' : ''
    },
    form6ok () {
      return this.imageURL1 !== null ? 'background:#1CD8D2;cursor:pointer' : ''
    },
    form7ok () {
      return 1<2 ? 'background:#1CD8D2;cursor:pointer' : ''
    },
    form8ok () {
      return this.$store.state.acomodData.title !== '' ? 'background:#1CD8D2;cursor:pointer' : ''
    },
    form9ok () {
      return this.$store.state.acomodData.subtitle !== '' ? 'background:#1CD8D2;cursor:pointer' : ''
    },
    form10ok () {
      return this.$store.state.acomodData.celular.length === 15 ? 'background:#1CD8D2;cursor:pointer' : ''
    },
    form11ok () {
      return 1<2 ? 'background:#1CD8D2;cursor:pointer' : ''
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

<style>
@import url('../../../assets/css/main.css');
@import url('../../../assets/css/switcher.css');

.anunciar-acomodacao {
  margin-top: 3.2rem;
  background: linear-gradient(45deg, #93EDC7, #1CD8D2);
  color: white;
  transition: var(--main-transition);
  & .progress-bar {
    position: fixed;
    top: 3.2rem;
    height: 3px;
    z-index: 8888;
    background: linear-gradient(80deg, #93EDC7, #1CD8D2);
    transition: all .3s ease;
  }
  /* ******************** PLANO ACOMODAÇÃO ******************** */
  & .plano-acomodacao {
    display: flex;
    flex-flow: column;
    align-items: center;
    & .__img-header {
      margin: 2rem 0;
      width: 6rem;
      height: auto;
    }
    & .__title {
      font-size: 26px;
      font-weight: 500;
      padding: 0 7%;
      text-align: center;
    }
    & .__subtitle {
      text-transform: uppercase;
      margin: 3rem 0 .5rem 0;
      font-size: 17px;
      font-weight: 600;
      padding: 0 7%;
      text-align: center;
    }
    & .__item {
      padding: 0 7%;
      font-size: 20px;
      font-weight: 300;
      margin: 0 0 .2rem 0;
      color: white;
    }
    & .__subitem {
      padding: 0 7%;
      font-size: 15px;
      font-weight: 400;
      margin: 0 ;
      color: white;
      line-height: 21px;
    }
    & .__price {
      font-size: 48px;
      font-weight: 200;
      margin-bottom: .5rem;
    }
    & .__anunciar-btn {
      color: var(--color01);
      width: 65%;
      background: white;
      padding: 1rem 0;
      border-radius: 100px;
      font-size: 17px;
      font-weight: 500;
      margin: 3rem 0 2rem 0;
      box-shadow: 2px 2px 7px 2px rgba(0,0,0,0.17);
    }
  }
  /* ******************** CADASTRO ACOMODAÇÃO ******************** */
  & .cadastro-acomodacao {
    height: 100%;
    background: white;
    color: var(--color01);
    padding: 0 0 5.5rem 0;
    & .__form-title {
      padding: 3rem 7% 1.5rem 7%;
      line-height: 35px;
      font-size: 29px;
      font-weight: 600;
      z-index: 999;
    }
    & textarea {
      padding: 0 7%;
      margin-bottom: .5rem;
      width: 100%;
      font-size: 18px;
      font-weight: 300;
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
      font-size: 20px;
      font-weight: 600;
      color: rgb(112, 112, 112);
    }
    & .item-form {
      padding: 0 7%;
      display: flex;
      flex-flow: column;
      margin: 1.7rem 0;
      & label {
        text-transform: uppercase;
        font-weight: 600;
        font-size: 14px;
      }
      & input {
        width: 100%;
        font-size: 18px;
        font-weight: 300;
        background: white;
        color: var(--color01);
        padding: .5rem 0 .6rem 0;
        border: none;
        border-bottom: 1px solid rgb(222, 222, 222);
        outline: none;
      }
      & select {
        width: 100%;
        font-size: 18px;
        font-weight: 300;
        background: white;
        color: var(--color01);
        padding: .5rem 0 .6rem 0;
        border: none;
        border-bottom: 1px solid rgb(222, 222, 222);
        outline: none;
      }
      & .__local-saida-text {
        padding: .5rem 0 .6rem 0;
        border-bottom: 1px solid rgb(222, 222, 222);
      }
    }
    & .comodidades-box {
      padding: 0 7%;
      & .item-form-switches {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgb(227, 227, 227);
        padding: 1.2rem 0;
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
    & .__input-btn {
      margin: 1rem 7%;
      font-size: 16px;
      background: #1CD8D2;
      color: white;
      padding: .8rem 1.2rem;
      border-radius: 2rem;
    }
    & .__croppa-btn {
      margin: .3rem 0;
      font-size: 16px;
      background: #1CD8D2;
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
        border-radius: 4px;
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
          border-radius: 2rem 0 0 2rem;
          cursor: pointer;
          background: white;
        }
        & .__next {
          border-radius: 0 2rem 2rem 0;
          transition: all .3s ease;
          cursor: no-drop;
          background: rgb(222, 222, 222);
          color: white;
        }
      }
    }
  }
}

</style>
