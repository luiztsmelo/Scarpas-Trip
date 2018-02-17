<template>
  <div class="anunciar-acomodacao">

    <!-- PLANO ACOMODAÇÃO -->
    <div class="plano-acomodacao" v-show="$store.state.cadastroAcomod0">
      
      <img class="__img-header" src="../../../assets/img/estadia.svg">
       
      <h1 class="__title">Amplie seus ganhos anunciando sua casa com a gente!</h1>
      
      <span class="__subtitle">Como funciona?</span>
      <h3 class="__item">A Escarpas Trip </h3>


      <span class="__subtitle">Quais as vantagens?</span>
      <h3 class="__item">Destaque nas redes sociais</h3>
      <h3 class="__item">Transparência</h3>
      <h3 class="__item">Segurança</h3>
      
      <span class="__subtitle">Investimento Mensal</span>
      <span class="__price">R$49</span>
      <h3 class="__subitem">Primeiro mês grátis</h3>
      <h3 class="__subitem">Cancele quando quiser</h3>

      <button class="__anunciar-btn" @click="$store.commit('m_cadastroAcomod1', true), $store.commit('m_cadastroAcomod0', false), $store.commit('m_acomodProgressBar', (100/11)), hashAcomod()">Anunciar</button>

    </div><!-- PLANO ACOMODAÇÃO -->


    <div class="progress-bar" v-show="!$store.state.cadastroAcomod0" :style="'width:' + $store.state.acomodProgressBar + '%'"></div>


    <!-- BACK BUTTON -->
    <div class="back-bar" :style="backBarPage0">
      <div class="back-box" @click="backBtn">
        <img class="__back-btn" :style="backBtnPage0" src="../../../assets/img/back.svg" alt="voltar">
      </div>
    </div><!-- BACK BUTTON -->




    <!-- CADASTRO ACOMODAÇÃO -->



    <!-- ########## TIPO DE ACOMODAÇÃO PG.1 ########## -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod1">

      <h1 class="__form-title">Que tipo de propriedade deseja anunciar?</h1>

      <div class="item-form">
        <label>Tipo</label>
        <select v-model="$store.state.acomodData.tipoAcomod">
          <option>Casa</option>
          <option>Apartamento</option>
          <option>Rancho</option>
          <option>Chácara</option>
          <option>Pousada</option>
          <option>Camping</option>
          <option>Sítio</option>
          <option>Fazenda</option>
          <option>Hostel</option>
        </select>
      </div> 

      <!-- <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn1">Voltar</button>
          <button type="button" class="__next" :style="form1ok" @click="nextBtn1">Próximo</button>
        </div>
      </div> -->

      <button type="button" class="__next-btn" :style="form1ok" @click="nextBtn1">Próximo</button>
    
    </form><!-- ########## TIPO DE ACOMODAÇÃO PG.1 ########## -->




    <!-- ########## TOTAL DE HÓSPEDES PG.2 ########## -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod2">

      <h1 class="__form-title">Quantas pessoas podem se hospedar?</h1>

      <div class="item-form">
        <label>Total de Hóspedes</label>
        <select v-model="$store.state.acomodData.totalHospedes">
          <option v-for="n in 20">{{ n }}</option>
          <option>Mais de 20</option>
        </select>
      </div> 

      <!-- <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn2">Voltar</button>
          <button type="button" class="__next" :style="form2ok" @click="nextBtn2">Próximo</button>
        </div>
      </div>  -->

      <button type="button" class="__next-btn" :style="form2ok" @click="nextBtn2">Próximo</button>

    </form><!-- ########## TOTAL DE HÓSPEDES PG.2 ########## -->




    <!-- ########## CARACTERÍSTICAS PG.3 ########## -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod3">

      <h1 class="__form-title">Características físicas {{ tipoAcomodText }}</h1>

      <div class="item-form">
        <label>Nº de Quartos</label>
        <select v-model="$store.state.acomodData.totalQuartos">
          <option v-for="n in 10">{{ n }}</option>
          <option>Mais de 10</option>
        </select>
      </div> 

      <div class="item-form">
        <label>Quantos são Suítes?</label>
        <select v-model="$store.state.acomodData.totalSuites">
          <option>0</option>
          <option v-for="n in 7">{{ n }}</option>
          <option>Mais de 7</option>
        </select>
      </div>

      <div class="item-form">
        <label>Nº de Banheiros</label>
        <select v-model="$store.state.acomodData.totalBanheiros">
          <option v-for="n in 7">{{ n }}</option>
          <option>Mais de 7</option>
        </select>
      </div> 

      <div class="item-form">
        <label>Lugares na Garagem</label>
        <select v-model="$store.state.acomodData.totalGaragem">
          <option v-for="n in 7">{{ n }}</option>
          <option>Mais de 7</option>
        </select>
      </div> 


      <!-- <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn3">Voltar</button>
          <button type="button" class="__next" :style="form3ok" @click="nextBtn3">Próximo</button>
        </div>
      </div>  -->

      <button type="button" class="__next-btn" :style="form3ok" @click="nextBtn3">Próximo</button>
    
    </form><!-- ########## CARACTERÍSTICAS PG.3 ########## -->




    <!-- ########## COMODIDADES PG.4 ########## -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod4">

      <h1 class="__form-title">Quais comodidades são oferecidas?</h1>

      <div class="comodidades-box">

        <div class="item-form-switches" @click="sliderRoupasCama">
          <h3>Roupas de Cama e Toalhas</h3>
          <label class="switch" ref="sliderRoupasCama" @click="sliderRoupasCama">
            <input type="checkbox" v-model="$store.state.acomodData.hasRoupasCama">
            <span class="slider round"></span>
          </label>
        </div>

        <div class="item-form-switches" @click="sliderPiscina">
          <h3>Piscina</h3>
          <label class="switch" ref="sliderPiscina" @click="sliderPiscina">
            <input type="checkbox" v-model="$store.state.acomodData.hasPiscina">
            <span class="slider round"></span>
          </label>
        </div>

        <div class="item-form-switches" @click="sliderChurrasqueira">
          <h3>Churrasqueira</h3>
          <label class="switch" ref="sliderChurrasqueira" @click="sliderChurrasqueira">
            <input type="checkbox" v-model="$store.state.acomodData.hasChurrasqueira">
            <span class="slider round"></span>
          </label>
        </div>

        <div class="item-form-switches" @click="sliderCozinha">
          <h3>Cozinha Preparada</h3>
          <label class="switch" ref="sliderCozinha" @click="sliderCozinha">
            <input type="checkbox" v-model="$store.state.acomodData.hasCozinha">
            <span class="slider round"></span>
          </label>
        </div>

        <div class="item-form-switches" @click="sliderWifi">
          <h3>Wi-Fi</h3>
          <label class="switch" ref="sliderWifi" @click="sliderWifi">
            <input type="checkbox" v-model="$store.state.acomodData.hasWifi">
            <span class="slider round"></span>
          </label>
        </div>

        <div class="item-form-switches" @click="sliderArCond">
          <h3>Ar condicionado</h3>
          <label class="switch" ref="sliderArCond" @click="sliderArCond">
            <input type="checkbox" v-model="$store.state.acomodData.hasArCond">
            <span class="slider round"></span>
          </label>
        </div>

        <div class="item-form-switches" @click="sliderCaixaSom">
          <h3>Caixa de Som</h3>
          <label class="switch" ref="sliderCaixaSom" @click="sliderCaixaSom">
            <input type="checkbox" v-model="$store.state.acomodData.hasCaixaSom">
            <span class="slider round"></span>
          </label>
        </div>

        <div class="item-form-switches" @click="sliderBarracas">
          <h3>Barracas</h3>
          <label class="switch" ref="sliderBarracas" @click="sliderBarracas">
            <input type="checkbox" v-model="$store.state.acomodData.hasBarracas">
            <span class="slider round"></span>
          </label>
        </div>

        <div class="item-form-switches" @click="sliderPier" style="border:none">
          <h3>Pier</h3>
          <label class="switch" ref="sliderPier" @click="sliderPier">
            <input type="checkbox" v-model="$store.state.acomodData.hasPier">
            <span class="slider round"></span>
          </label>
        </div>

        
      </div>
      


      <!-- <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn4">Voltar</button>
          <button type="button" class="__next" :style="form4ok" @click="nextBtn4">Próximo</button>
        </div>
      </div>  -->

      <button type="button" class="__next-btn" :style="form4ok" @click="nextBtn4">Próximo</button>
    
    </form><!-- ########## COMODIDADES PG.4 ########## -->




    <!-- ########## LOCAL PG.5 ########## -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod5">

      <h1 class="__form-title">Qual a localização?</h1>

      <div class="gmap-autocomplete-box">
        <gmap-autocomplete 
        class="__gmap-autocomplete"
        placeholder="Digite o endereço aqui"
        @place_changed="setPlace">
        </gmap-autocomplete>
      </div>

      <gmap-map
      v-if="$store.state.cadastroAcomod5"
      :center="{lat: $store.state.acomodData.positionLAT, lng: $store.state.acomodData.positionLNG}"
      :zoom="mapZoom"
      :options="{styles: styles, mapTypeControl:false, streetViewControl:false}"
      style="width: 100%; height: 230px">
        <Gmap-Marker
        v-if="$store.state.acomodPlace"
        :clickable="true"
        :draggable="true"
        :animation="4"
        :position="{lat: $store.state.acomodData.positionLAT, lng: $store.state.acomodData.positionLNG}"
        :icon="{url: markerUrl, scaledSize: markerSize}"
        ></Gmap-Marker>
      </gmap-map>


      <!-- <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn5">Voltar</button>
          <button type="button" class="__next" :style="form5ok" @click="nextBtn5">Próximo</button>
        </div>
      </div>  -->

      <button type="button" class="__next-btn" :style="form5ok" @click="nextBtn5">Próximo</button>
    
    </form><!-- ########## LOCAL PG.5 ########## -->




    <!-- ########## IMAGEM E VÍDEOS PG.6 ########## -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod6">

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
        <div class="image-box">
          <div class="__foto-principal">Imagem principal</div>
          <img :src="imageURL1" class="__preview-img" @click="showCroppaModal1=true">
        </div>
        
        <div class="image-box">
          <img src="./../../../assets/img/add-image.svg" class="__preview-img" v-if="imageURL2 === null" @click="$refs.myCroppa2.chooseFile()" style="padding:2rem">
          <img :src="imageURL2" class="__preview-img" @click="showCroppaModal2=true" v-else>
        </div>

      </div><!-- Preview Image -->

     <!--  <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn6">Voltar</button>
          <button type="button" class="__next" :style="form6ok" @click="nextBtn6">Próximo</button>
        </div>
      </div>  -->

      <button type="button" class="__next-btn" :style="form6ok" @click="nextBtn6">Próximo</button>
    
    </form><!-- ########## IMAGEM E VÍDEOS PG.6 ########## -->




    <!-- ########## VALOR DA ESTADIA PG.7 ########## -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod7">

      <h1 class="__form-title">Qual será o valor da diária?</h1>

      <div class="item-form">
        <label>Em dias normais</label>
        <money v-model="$store.state.acomodData.valorDiariaNormal"></money>
      </div> 

      <div class="item-form">
        <label>Nos feriados</label>
        <money v-model="$store.state.acomodData.valorDiariaFeriado"></money>
      </div> 


      <!-- <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn7">Voltar</button>
          <button type="button" class="__next" :style="form7ok" @click="nextBtn7">Próximo</button>
        </div>
      </div>  -->

      <button type="button" class="__next-btn" :style="form7ok" @click="nextBtn7">Próximo</button>
    
    </form><!-- ########## VALOR DA ESTADIA PG.7 ########## -->




    <!-- ########## TÍTULO PG.8 ########## -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod8">

      <h1 class="__form-title">Dê um título para seu anúncio</h1>

      <textarea 
      v-model="$store.state.acomodData.title"
      v-autosize="title"
      maxlength="50"
      rows="1"
      placeholder="ex: Linda casa em Capitólio"
      required>
      {{title}}</textarea>

      <span class="__lenght-calc">{{ titleLength }}</span>

      <!-- <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn8">Voltar</button>
          <button type="button" class="__next" :style="form8ok" @click="nextBtn8">Próximo</button>
        </div>
      </div>  -->

      <button type="button" class="__next-btn" :style="form8ok" @click="nextBtn8">Próximo</button>
    
    </form><!-- ########## TÍTULO PG.8 ########## -->




    <!-- ########## DESCRIÇÃO PG.9 ########## -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod9">

      <h1 class="__form-title">Descreva seu anúncio</h1>   

      <textarea 
      v-model="$store.state.acomodData.subtitle"
      v-autosize="subtitle"
      maxlength="400"
      rows="1"
      placeholder="Coloque informações importantes aqui, que não foram perguntadas antes"
      required>
      {{subtitle}}</textarea>

      <span class="__lenght-calc">{{ subtitleLength }}</span> 

      <!-- <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn9">Voltar</button>
          <button type="button" class="__next" :style="form9ok" @click="nextBtn9">Próximo</button>
        </div>
      </div>  -->

      <button type="button" class="__next-btn" :style="form9ok" @click="nextBtn9">Próximo</button>
    
    </form><!-- ########## DESCRIÇÃO PG.9 ########## -->





    <!-- ########## IDENTIFICAÇÃO PG.10 ########## -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod10">

      <h1 class="__form-title">Sua identificação</h1>   


      <h3 style="padding: .5rem 7% .7rem 7%" v-if="this.$store.state.acomodData.proprietario === null">Continuar com:</h3>

      <div class="signin-btns" v-if="$store.state.acomodData.proprietario === null">
        <button type="button" class="facebook-btn" @click="facebookSignIn()">Facebook</button>
        <button type="button" class="google-btn" @click="googleSignIn()">Google</button>
      </div>

      <h3 style="padding: 0 7%" v-if="$store.state.acomodData.proprietario !== null">Ótimo {{ firstName }}! Só mais algumas informações:</h3>

      <div v-if="$store.state.acomodData.proprietario !== null">
        <div class="item-form">
          <label>Celular</label>
          <masked-input
            type="tel"
            v-model="$store.state.acomodData.celular"
            :mask="['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
            :guide="false"
            placeholder="(  )      -    ">
          </masked-input>
        </div>
      </div>

      <!-- <h3 style="padding: .5rem 7%;font-size:16px;line-height:22px">Ao prosseguir você concorda com nossos <span style="color:#64B5F6">Termos de Serviço</span>.</h3> -->

      <!-- <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn10">Voltar</button>
          <button type="button" class="__next" :style="form10ok" @click="nextBtn10">Próximo</button>
        </div>
      </div>  -->

      <button type="button" class="__next-btn" :style="form10ok" @click="nextBtn10">Próximo</button>
    
    </form><!-- ########## IDENTIFICAÇÃO PG.10 ########## -->





    <!-- ########## INVESTIMENTO PG.11 ########## -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod11">

      <h1 class="__form-title">Investimento</h1>   

      <h3 style="padding: 0 7%">{{ firstName }}, cobraremos um valor mensal de R$49,00. O primeiro mês será gratuito e não haverá multa caso queira cancelar. Pagar com:</h3>

      <div class="payment-box">
        <div class="item-form-payment" @click="showCreditCard = true">
          <span class="__payment-type">Cartão de Crédito</span>
          <img class="__payment-img" src="../../../assets/img/credit-card.svg">
        </div>

        <div class="credit-card">

          <div class="item-form">
            <label>Número do Cartão</label>
            <masked-input
              type="tel"
              v-model="$store.state.acomodData.creditCard.cardNumber"
              :mask="[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]"
              :guide="false">
            </masked-input>
          </div>

          <div class="item-form">
            <label>Seu nome no Cartão</label>
            <input type="text" pattern="[A-Za-z]" v-model="$store.state.acomodData.creditCard.cardHolderName">
          </div>

          <div class="flex-row" style="display: flex; transform: translateY(-1.7rem)">
            <div class="item-form">
              <label>Validade</label>
              <masked-input
                type="tel"
                v-model="$store.state.acomodData.creditCard.cardExpirationDate"
                :mask="[/\d/, /\d/, '/', /\d/, /\d/]"
                :guide="false">
              </masked-input>
            </div>
            <div class="item-form">
              <label>CVV*</label>
              <masked-input
                type="tel"
                v-model="$store.state.acomodData.creditCard.cardCVV"
                :mask="[/\d/, /\d/, /\d/]"
                :guide="false">
              </masked-input>
            </div>
          </div>

        </div>

        <!-- <div class="item-form-payment">
          <span class="__payment-type">Boleto</span>
          <img class="__payment-img" src="../../../assets/img/boleto.svg">
        </div> -->

      </div>

      

      <!-- <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn11">Voltar</button>
          <button type="button" class="__next" :style="form11ok" @click="concluir">Anunciar</button>
        </div>
      </div>  -->

      <button type="button" class="__next-btn" :style="form11ok" @click="concluir">Concluir</button>
    
    </form><!-- ########## INVESTIMENTO PG.11 ########## -->


    <!-- CADASTRO ACOMODAÇÃO -->


  </div>
</template>

<script>
import { loaded } from '~/node_modules/vue2-google-maps/src/manager'
import * as firebase from 'firebase'
import MaskedInput from 'vue-text-mask'
import { mapstyle } from '../../../mixins/mapstyle'

export default {
  components: { 
    MaskedInput
  },
  mixins: [mapstyle],
  head () {
    return {
      title: 'Anunciar Acomodação em Capitólio ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
  data() {
    return {
      title: '',/* Vue Autosize */
      subtitle: '',/* Vue Autosize */
      googleMapsInitialized: false,
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
    scrollTop () {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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
    /* ******************** GOOGLE MAPS ******************** */
    setPlace (place) {
      this.$store.commit('m_acomodPlace', place)
      this.$store.state.acomodData.positionLAT = this.$store.state.acomodPlace.geometry.location.lat()
      this.$store.state.acomodData.positionLNG = this.$store.state.acomodPlace.geometry.location.lng()
      this.$store.state.acomodData.address = this.$store.state.acomodPlace.name
    },
    /* ******************** COMODIDADES ******************** */
    sliderRoupasCama () { this.$refs.sliderRoupasCama.click() },
    sliderPiscina () { this.$refs.sliderPiscina.click() },
    sliderChurrasqueira () { this.$refs.sliderChurrasqueira.click() },
    sliderCozinha () { this.$refs.sliderCozinha.click() },
    sliderWifi () { this.$refs.sliderWifi.click() },
    sliderArCond () { this.$refs.sliderArCond.click() },
    sliderCaixaSom () { this.$refs.sliderCaixaSom.click() },
    sliderBarracas () { this.$refs.sliderBarracas.click() },
    sliderPier () { this.$refs.sliderPier.click() },
    
    /* ******************** BACK BUTTON ******************** */
    backBtn () {
      if (this.$store.state.cadastroAcomod0 === true) {
        window.history.back(1)
        this.$store.commit('m_cadastroAcomod0', false)
      }
      if (this.$store.state.cadastroAcomod1 === true) {
        window.history.back(1)
        this.$store.commit('m_cadastroAcomod1', false)
        this.$store.commit('m_cadastroAcomod0', true)
      }
      if (this.$store.state.cadastroAcomod2 === true) {
        window.history.back(1)
        this.$store.commit('m_cadastroAcomod2', false)
        this.$store.commit('m_cadastroAcomod1', true)
      }
      if (this.$store.state.cadastroAcomod3 === true) {
        window.history.back(1)
        this.$store.commit('m_cadastroAcomod3', false)
        this.$store.commit('m_cadastroAcomod2', true)
      }
      if (this.$store.state.cadastroAcomod4 === true) {
        window.history.back(1)
        this.$store.commit('m_cadastroAcomod4', false)
        this.$store.commit('m_cadastroAcomod3', true)
      }
      if (this.$store.state.cadastroAcomod5 === true) {
        window.history.back(1)
        this.$store.commit('m_cadastroAcomod5', false)
        this.$store.commit('m_cadastroAcomod4', true)
      }
      if (this.$store.state.cadastroAcomod6 === true) {
        window.history.back(1)
        this.$store.commit('m_cadastroAcomod6', false)
        this.$store.commit('m_cadastroAcomod5', true)
      }
      if (this.$store.state.cadastroAcomod7 === true) {
        window.history.back(1)
        this.$store.commit('m_cadastroAcomod7', false)
        this.$store.commit('m_cadastroAcomod6', true)
      }
      if (this.$store.state.cadastroAcomod8 === true) {
        window.history.back(1)
        this.$store.commit('m_cadastroAcomod8', false)
        this.$store.commit('m_cadastroAcomod7', true)
      }
      if (this.$store.state.cadastroAcomod9 === true) {
        window.history.back(1)
        this.$store.commit('m_cadastroAcomod9', false)
        this.$store.commit('m_cadastroAcomod8', true)
      }
      if (this.$store.state.cadastroAcomod10 === true) {
        window.history.back(1)
        this.$store.commit('m_cadastroAcomod10', false)
        this.$store.commit('m_cadastroAcomod9', true)
      }
      if (this.$store.state.cadastroAcomod11 === true) {
        window.history.back(1)
        this.$store.commit('m_cadastroAcomod11', false)
        this.$store.commit('m_cadastroAcomod10', true)
      }
    },
    /* ******************** NEXT BUTTONS ******************** */
    hashAcomod () {
      window.location.hash = "cad1"
    },
    nextBtn1 () {
      if (this.$store.state.acomodData.tipoAcomod !== null) {
        this.$store.commit('m_cadastroAcomod1', false), this.$store.commit('m_cadastroAcomod2', true), this.$store.commit('m_acomodProgressBar', (100/11)*2), window.location.hash = "cad2"
      }
    },
    nextBtn2 () {
      if (this.$store.state.acomodData.totalHospedes !== null) {
        this.$store.commit('m_cadastroAcomod2', false), this.$store.commit('m_cadastroAcomod3', true), this.$store.commit('m_acomodProgressBar', (100/11)*3), window.location.hash = "cad3"
      }
    },
    nextBtn3 () {
      if (1<2) {
        this.$store.commit('m_cadastroAcomod3', false), this.$store.commit('m_cadastroAcomod4', true), this.$store.commit('m_acomodProgressBar', (100/11)*4), this.scrollTop(), window.location.hash = "cad4"
      }
    },
    nextBtn4 () {
      if (1<2) {
        this.$store.commit('m_cadastroAcomod4', false), this.$store.commit('m_cadastroAcomod5', true), this.$store.commit('m_acomodProgressBar', (100/11)*5), this.scrollTop(), window.location.hash = "cad5"
      }
    },
    nextBtn5 () {
      if (this.$store.state.acomodPlace !== null) {
        this.$store.commit('m_cadastroAcomod5', false), this.$store.commit('m_cadastroAcomod6', true), this.$store.commit('m_acomodProgressBar', (100/11)*6), window.location.hash = "cad6"
      } else {
        alert('Adicione um endereço')
      }
    },
    nextBtn6 () {
      if (this.imageURL1 !== null) {
        this.$store.commit('m_cadastroAcomod6', false), this.$store.commit('m_cadastroAcomod7', true), this.$store.commit('m_acomodProgressBar', (100/11)*7), window.location.hash = "cad7"
      } else {
        alert('Adicione pelo menos uma imagem')
      }
    },
    nextBtn7 () {
      if (1<2) {
        this.$store.commit('m_cadastroAcomod7', false), this.$store.commit('m_cadastroAcomod8', true), this.$store.commit('m_acomodProgressBar', (100/11)*8), window.location.hash = "cad8"
      }
    },
    nextBtn8 () {
      if (this.$store.state.acomodData.title !== '') {
        this.$store.commit('m_cadastroAcomod8', false), this.$store.commit('m_cadastroAcomod9', true), this.$store.commit('m_acomodProgressBar', (100/11)*9), window.location.hash = "cad9"
      }
    },
    nextBtn9 () {
      if (this.$store.state.acomodData.subtitle !== '') {
        this.$store.commit('m_cadastroAcomod9', false), this.$store.commit('m_cadastroAcomod10', true), this.$store.commit('m_acomodProgressBar', (100/11)*10), window.location.hash = "cad10"
      }
    },
    nextBtn10 () {
      if (this.$store.state.acomodData.celular.length === 15) {
        this.$store.commit('m_cadastroAcomod10', false), this.$store.commit('m_cadastroAcomod11', true), this.$store.commit('m_acomodProgressBar', (100/11)*11), window.location.hash = "cad11"
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
        if (this.$store.state.blobAcH2J !== null) {
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
        this.$router.push('/acomodacoes/' + this.$store.state.acomodData.acomodID)
      }
    },
    ifUpload2 () {
      if (this.$store.state.acomodData.imageL1 !== null && this.$store.state.acomodData.imageH1J !== null && this.$store.state.acomodData.imageH1W !== null && this.$store.state.acomodData.imageL2 !== null && this.$store.state.acomodData.imageH2J !== null && this.$store.state.acomodData.imageH2W !== null) {
        this.$store.dispatch('a_uploadAcomod')
        this.$router.push('/acomodacoes/' + this.$store.state.acomodData.acomodID)
      }
    }
  },
  async mounted () {
    loaded.then(() => {
      this.googleMapsInitialized = true
    })
  },
  computed: {
    hash () {
      return this.$route.hash
    },
    backBarPage0 () {
      return this.$store.state.cadastroAcomod0 === true ? 'background: transparent' : 'background: white'
    },
    backBtnPage0 () {
      return this.$store.state.cadastroAcomod0 === true ? 'filter: invert(0%)' : ''
    },
    markerUrl () {
      return 'https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fmarker.svg?alt=media&token=fcbfd76e-ee93-41e8-a816-98906e19859b'
    },
    markerSize () {
      if (!this.googleMapsInitialized) return null
      return new window.google.maps.Size(38, 38)
    },
    tipoAcomodText () {
      const path = this.$store.state.acomodData.tipoAcomod
      return path === 'Casa' ? 'da sua casa' 
           : path === 'Apartamento' ? 'do seu apartamento'
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
    mapZoom () {
      return this.$store.state.acomodPlace !== null ? 16 : 12
    },
    form1ok () {
      return this.$store.state.acomodData.tipoAcomod !== null ? 'background:#00D8C7;cursor:pointer' : ''
    },
    form2ok () {
      return this.$store.state.acomodData.totalHospedes !== null ? 'background:#00D8C7;cursor:pointer' : ''
    },
    form3ok () {
      return 1<2 ? 'background:#00D8C7;cursor:pointer' : ''
    },
    form4ok () {
      return 1<2 ? 'background:#00D8C7;cursor:pointer' : ''
    },
    form5ok () {
      return this.$store.state.acomodPlace !== null ? 'background:#00D8C7;cursor:pointer' : ''
    },
    form6ok () {
      return this.imageURL1 !== null ? 'background:#00D8C7;cursor:pointer' : ''
    },
    form7ok () {
      return 1<2 ? 'background:#00D8C7;cursor:pointer' : ''
    },
    form8ok () {
      return this.$store.state.acomodData.title !== '' ? 'background:#00D8C7;cursor:pointer' : ''
    },
    form9ok () {
      return this.$store.state.acomodData.subtitle !== '' ? 'background:#00D8C7;cursor:pointer' : ''
    },
    form10ok () {
      return this.$store.state.acomodData.celular.length === 15 ? 'background:#00D8C7;cursor:pointer' : ''
    },
    form11ok () {
      return 1>2 ? 'background:#00D8C7;cursor:pointer' : ''
    }
  },
  watch: {
    hash (value) {
      if (value === '') {
        this.$store.commit('m_cadastroAcomod0', true)
        this.$store.commit('m_cadastroAcomod1', false)
      } 
      if (value === '#cad1') {
        this.$store.commit('m_cadastroAcomod0', false)
        this.$store.commit('m_cadastroAcomod1', true)
        this.$store.commit('m_cadastroAcomod2', false)
      } 
      if (value === '#cad2') {
        this.$store.commit('m_cadastroAcomod1', false)
        this.$store.commit('m_cadastroAcomod2', true)
        this.$store.commit('m_cadastroAcomod3', false)
      } 
      if (value === '#cad3') {
        this.$store.commit('m_cadastroAcomod2', false)
        this.$store.commit('m_cadastroAcomod3', true)
        this.$store.commit('m_cadastroAcomod4', false)
      } 
      if (value === '#cad4') {
        this.$store.commit('m_cadastroAcomod3', false)
        this.$store.commit('m_cadastroAcomod4', true)
        this.$store.commit('m_cadastroAcomod5', false)
      } 
      if (value === '#cad5') {
        this.$store.commit('m_cadastroAcomod4', false)
        this.$store.commit('m_cadastroAcomod5', true)
        this.$store.commit('m_cadastroAcomod6', false)
      } 
      if (value === '#cad6') {
        this.$store.commit('m_cadastroAcomod5', false)
        this.$store.commit('m_cadastroAcomod6', true)
        this.$store.commit('m_cadastroAcomod7', false)
      } 
      if (value === '#cad7') {
        this.$store.commit('m_cadastroAcomod6', false)
        this.$store.commit('m_cadastroAcomod7', true)
        this.$store.commit('m_cadastroAcomod8', false)
      } 
      if (value === '#cad8') {
        this.$store.commit('m_cadastroAcomod7', false)
        this.$store.commit('m_cadastroAcomod8', true)
        this.$store.commit('m_cadastroAcomod9', false)
      } 
      if (value === '#cad9') {
        this.$store.commit('m_cadastroAcomod8', false)
        this.$store.commit('m_cadastroAcomod9', true)
        this.$store.commit('m_cadastroAcomod10', false)
      } 
      if (value === '#cad10') {
        this.$store.commit('m_cadastroAcomod9', false)
        this.$store.commit('m_cadastroAcomod10', true)
        this.$store.commit('m_cadastroAcomod11', false)
      } 
      if (value === '#cad11') {
        this.$store.commit('m_cadastroAcomod10', false)
        this.$store.commit('m_cadastroAcomod11', true)
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

<style>
@import url('../../../assets/css/main.css');
@import url('../../../assets/css/switcher.css');

.anunciar-acomodacao {
  background: #00D8C7;
  color: white;
  transition: var(--main-transition);
  & .progress-bar {
    position: fixed;
    top: 0;
    height: 4px;
    z-index: 8888;
    background: #00D8C7;
    transition: all .3s ease;
  }
  & .back-bar {
    position: fixed;
    top: 0;
    left: 0;
    width:  100%;
    height: 3rem;
    & .back-box {
      display: inline-flex;
      align-items: center;
      height: 100%;
      padding: 0 7%;
      & .__back-btn {
        cursor: pointer;
        width: 1.07rem;
        height: auto;
        filter: invert(75%);
      }
    }
  }
  /* ******************** PLANO ACOMODAÇÃO ******************** */
  & .plano-acomodacao {
    display: flex;
    flex-flow: column;
    align-items: center;
    & .__img-header {
      margin: 4rem 0 2rem 0;
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
      font-size: 18px;
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
  /* ******************** CADASTRO ACOMODAÇÃO ******************** */
  & .cadastro-acomodacao {
    height: 100%;
    background: white;
    color: var(--color01);
    padding: 0 0 5.5rem 0;
    & .__form-title {
      padding: 4rem 7% 1.5rem 7%;
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
        border-bottom: 1px solid rgb(222, 222, 222);
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
        border-bottom: 1px solid rgb(222, 222, 222);
        outline: none;
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
        & h3 {
          font-size: var(--fontSizeAnuncioText);
        }
      }
    }
    & .payment-box {
      padding-top: 1rem;
      & .item-form-payment {
        margin: 0 7%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0 0 0;
        & .__payment-type {
          font-size: 18px;
          font-weight: 700;
        }
        & .__payment-img {
          width: 1.7rem;
          height: auto;
        }
      }
      & .credit-card {
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
      font-size: 15px;
      font-weight: 600;
      background: #00D8C7;
      color: white;
      padding: .8rem 1.2rem;
      border-radius: 2rem;
    }
    & .__croppa-btn {
      margin: .3rem 0;
      font-size: 15px;
      font-weight: 500;
      background: #00D8C7;
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
        position: relative;
        margin: 0 .3rem;
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
    & .gmap-autocomplete-box {
      margin: 1.5rem 7% 1rem 7%;
      & .__gmap-autocomplete {
        font-size: calc(var(--fontSizeAnuncioText) + 1px);
        font-weight: 400;
        color: var(--color01);
        width: 100%;
        border: none;
        border-bottom: 1px solid rgb(222, 222, 222);
        padding: .5rem 0 .6rem 0;
        outline: none;
      }
    }
    & .signin-btns {
      display: flex;
      padding: 0 7%;
    }
    & .__next-btn {
      position: fixed;
      bottom: 1.3rem;
      right: 7%;
      font-size: 16px;
      font-weight: 600;
      background: rgb(222, 222, 222);
      color: white;
      height: 2.7rem;
      width:  9rem;
      border-radius: 4px;
    }
    /* & .back-next {
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
          cursor: pointer;
          background: white;
        }
        & .__next {
          font-size: 16px;
          font-weight: 500;
          border-radius: 0 2rem 2rem 0;
          transition: all .3s ease;
          cursor: no-drop;
          background: rgb(222, 222, 222);
          color: white;
        }
      }
    } */
  }
}

/* TRANSITIONS */
.payment-animation-enter,
.payment-animation-leave-active {
  transform: scale(0);
}
</style>
