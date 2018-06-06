<template>
  <div class="anunciar-acomodacao">

    <v-dialog style="z-index:10000"/>

    <!-- PLANO ACOMODAÇÃO MOBILE -->
    <div class="plano-acomodacao-mobile" v-show="$store.state.cadastroAcomod0">
      
      <img class="__img-header" src="../../../assets/img/anuncio-acomod.svg">
      
      <h1 class="__title">Ainda gasta anunciando sua casa? Aqui é gratuito.</h1>
      
      <button class="__anunciar-btn" @click="$store.commit('m_cadastroAcomod1', true), $store.commit('m_cadastroAcomod0', false), $store.commit('m_acomodProgressBar', (100/11)), hashAcomod()">Anunciar</button>

    </div><!-- PLANO ACOMODAÇÃO MOBILE -->


    <!-- PLANO ACOMODAÇÃO DESKTOP -->
    <div class="plano-acomodacao-desktop" v-show="$store.state.cadastroAcomod0">
      
      <img class="__img-header" src="../../../assets/img/anuncio-acomod.svg">

      <div class="flex1">
        <h1 class="__title">Ainda paga para anunciar sua casa?</h1>
        <h1 class="__subtitle">Aqui é gratuito.</h1>

        <h3 class="__text">Além disso...</h3>
        
        <button class="__anunciar-btn" @click="$store.commit('m_cadastroAcomod1', true), $store.commit('m_cadastroAcomod0', false), $store.commit('m_acomodProgressBar', (100/11)), hashAcomod()">Anunciar</button>
      </div>

    </div><!-- PLANO ACOMODAÇÃO DESKTOP -->




    <div class="progress-bar" v-show="!$store.state.cadastroAcomod0" :style="'width:' + $store.state.acomodProgressBar + '%'"></div>




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

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn1">Voltar</button>
          <button type="button" class="__next" :style="form1ok" @click="nextBtn1">Próximo</button>
        </div>
      </div>
    
    </form><!-- ########## TIPO DE ACOMODAÇÃO PG.1 ########## -->




    <!-- ########## TOTAL DE HÓSPEDES PG.2 ########## -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod2">

      <h1 class="__form-title">Quantas pessoas {{ tipoAcomodTextLower }} consegue acomodar?</h1>

      <div class="item-form">
        <label>Total de Hóspedes</label>
        <select v-model="$store.state.acomodData.totalHospedes">
          <option v-for="n in 25">{{ n }}</option>
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
          <option v-for="n in totalSuites">{{ n }}</option>
        </select>
      </div>

      <div class="item-form">
        <label>Nº de Banheiros</label>
        <select v-model="$store.state.acomodData.totalBanheiros">
          <option v-for="n in 10">{{ n }}</option>
        </select>
      </div> 

      <div class="item-form">
        <label>Vagas na Garagem</label>
        <select v-model="$store.state.acomodData.totalGaragem">
          <option v-for="n in 10">{{ n }}</option>
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

      <div class="item-form">
        <label>Local</label>
        <gmap-autocomplete
          onKeyPress="if (event.which == 13) return false" 
          placeholder="Digite o endereço completo aqui"
          @place_changed="setPlace">
        </gmap-autocomplete>
      </div>

      <h3 class="without-address" @click="$modal.show('local-map-modal'), $store.state.fromWithoutAddress=true">
        {{ tipoAcomodTextLocal }} não tem endereço?
      </h3>

      <localMap/>

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn5">Voltar</button>
          <button type="button" class="__next" :style="form5ok" @click="nextBtn5">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## LOCAL PG.5 ########## -->




    <!-- ########## IMAGEM E VÍDEOS PG.6 ########## -->
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod6">

      <h1 class="__form-title">Adicione imagens {{ tipoAcomodText }}</h1>


      <div class="modal-croppa" v-show="showCroppaModal" @click="showCroppaModal=false">
        <div class="modal-croppa-body" @click.stop>
          <h1>Ajustar imagem</h1>
          <croppa
            ref="myCroppa"
            @file-choose="showCroppaModal = true"
            :width="$store.state.isMobile === true ? 720/2.25 : 720/1.2"
            :height="$store.state.isMobile === true ? 480/2.25 : 480/1.2"
            :quality="$store.state.isMobile === true ? 2.25 : 1.2"
            :placeholder="'Carregando...'"
            :placeholder-color="'white'"
            :accept="'.jpg, .jpeg, .png, .webp'"
            :zoom-speed="$store.state.isMobile === true ? 2 : 4"
            :prevent-white-space="true"
            :show-remove-button="false">
          </croppa>
          <button class="__croppa-btn" type="button" @click="showCroppaModal=false, imageConfirm()">Confirmar</button>
        </div>
      </div>


      <!-- Preview images -->
      <div class="after-choose-image" :class="[ $store.state.acomodData.images.length == 0 ? 'center-first-image' : '' ]">

        <div class="image-box" v-for="(image, index) in $store.state.acomodData.images">
          <div class="delete" @click="deleteImage(image, index)">
            <img src="../../../assets/img/delete.svg" class="__delete-img">
          </div>
          <progressive-background class="__image" :src="image.HJ" :placeholder="image.L" :aspect-ratio="2/3"/>
        </div>


        <div class="image-box __add-image" @click="!isUploading ? $refs.myCroppa.chooseFile() : ''">
          <svg class="loader-svg" v-if="isUploading">
            <circle
              class="__circle"
              stroke-width="4"
              stroke="#484848"
              :stroke-dasharray="`${18*2*Math.PI} ${18*2*Math.PI}`"
              :stroke-dashoffset="18*2*Math.PI - this.uploadProgress/100*18*2*Math.PI"
              fill="transparent"
              r="18"
              cx="20"
              cy="20"
            />
          </svg>
          <img src="../../../assets/img/add-image.svg" class="__add-image-svg" v-else>
          <progressive-background src="../../../assets/img/add-image.png" :aspect-ratio="2/3"/>
        </div>

      </div><!-- Preview images -->


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn6">Voltar</button>
          <button type="button" class="__next" :style="form6ok" @click="nextBtn6">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## IMAGEM E VÍDEOS PG.6 ########## -->




    <!-- ########## VALOR DA ESTADIA PG.7 ########## -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod7">

      <h1 class="__form-title">Qual será o valor da estadia?</h1>

      <h3 class="__form-text">Será possível ajustar o valor após a publicação do anúncio, para adequar a períodos de baixa e alta temporada. Também será possível oferecer descontos personalizados. A taxa de limpeza é opcional.</h3>

      <div class="item-form">
        <label>Valor por noite</label>
        <money v-model="$store.state.acomodData.valorNoite"></money>
      </div> 

      <div class="item-form">
        <label>Taxa de limpeza</label>
        <money v-model="$store.state.acomodData.limpezaFee"></money>
      </div> 


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn7">Voltar</button>
          <button type="button" class="__next" :style="form7ok" @click="nextBtn7">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## VALOR DA ESTADIA PG.7 ########## -->




    <!-- ########## REGRAS PG.8 ########## -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod8">

      <h1 class="__form-title">Quais são as regras {{ tipoAcomodText }}?</h1>

      <div class="regras-box">


        <!-- Horário Check-in -->
        <h3 class="__form-subtitle">Horário para Check-in</h3>

        <div style="display:flex">
          <div class="item-form" style="padding:0;margin:1rem .5rem 1.5rem 0;flex:50%">
            <label>De:</label>
            <input type="time" v-model="$store.state.acomodData.checkinFrom">
          </div> 
          <div class="item-form" style="padding:0;margin:1rem 0 1.5rem .5rem;flex:50%">
            <label>Até:</label>
            <input type="time" v-model="$store.state.acomodData.checkinTo">
          </div> 
        </div>
        <!-- Horário Check-in -->


        <!-- Regras -->
        <h3 class="__form-subtitle" style="margin-top:.4rem">Regras</h3>

        <div class="item-form-regras">
          <h3>Festas são permitidas?</h3>
          <div class="yes-or-no">
            <div class="__no" :class="[ !$store.state.acomodData.allowFestas ? 'is-false' : '' ]" @click="$store.state.acomodData.allowFestas = false">Não</div>
            <div class="__yes" :class="[ $store.state.acomodData.allowFestas ? 'is-true' : '' ]" @click="$store.state.acomodData.allowFestas = true">Sim</div>
          </div>
        </div>

        <div class="item-form-regras">
          <h3>Animais de estimação são permitidos?</h3>
          <div class="yes-or-no">
            <div class="__no" :class="[ !$store.state.acomodData.allowPets ? 'is-false' : '' ]" @click="$store.state.acomodData.allowPets = false">Não</div>
            <div class="__yes" :class="[ $store.state.acomodData.allowPets ? 'is-true' : '' ]" @click="$store.state.acomodData.allowPets = true">Sim</div>
          </div>
        </div>

        <div class="item-form-regras">
          <h3>É adequado para bebês?</h3>
          <div class="yes-or-no">
            <div class="__no" :class="[ !$store.state.acomodData.allowBabys ? 'is-false' : '' ]" @click="$store.state.acomodData.allowBabys = false">Não</div>
            <div class="__yes" :class="[ $store.state.acomodData.allowBabys ? 'is-true' : '' ]" @click="$store.state.acomodData.allowBabys = true">Sim</div>
          </div>
        </div>

        <div class="item-form-regras" style="border: none">
          <h3>Fumar é permitido?</h3>
          <div class="yes-or-no">
            <div class="__no" :class="[ !$store.state.acomodData.allowFumar ? 'is-false' : '' ]" @click="$store.state.acomodData.allowFumar = false">Não</div>
            <div class="__yes" :class="[ $store.state.acomodData.allowFumar ? 'is-true' : '' ]" @click="$store.state.acomodData.allowFumar = true">Sim</div>
          </div>
        </div>
        <!-- Regras -->


        <!-- Regras adicionais -->
        <h3 class="__form-subtitle" style="margin-top:.6rem">Regras adicionais</h3>

        <div class="new-regras" v-for="(regra, index) in $store.state.acomodData.regrasAdicionais">
          <h3 class="__regra-text">{{ regra }}</h3>
          <button class="__regra-remove" type="button" @click="removeRegra(index)"></button>
        </div>
        
        <div class="input-row">
          <input type="text" class="__input" placeholder="Nova regra?" v-model="newRegra" @keyup.enter="addRegra" onKeyPress="if (event.which == 13) return false">
          <button class="__add-btn" type="button" @click="addRegra"></button>
        </div>
        <!-- Regras adicionais -->


      </div>
      

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn8">Voltar</button>
          <button type="button" class="__next" :style="form8ok" @click="nextBtn8">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## REGRAS PG.8 ########## -->




    <!-- ########## TÍTULO PG.9 ########## -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod9">

      <h1 class="__form-title">Dê um título para seu anúncio</h1>

      <textarea 
      v-model="$store.state.acomodData.title"
      v-autosize="title"
      maxlength="50"
      rows="1"
      :placeholder="'ex: ' + tipoAcomodTitulo + ' em Capitólio' + totalSuitesTitulo"
      required>
      {{title}}</textarea>

      <span class="__lenght-calc">{{ titleLength }}</span>

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn9">Voltar</button>
          <button type="button" class="__next" :style="form9ok" @click="nextBtn9">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## TÍTULO PG.9 ########## -->




    <!-- ########## DESCRIÇÃO PG.10 ########## -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod10">

      <h1 class="__form-title">Descreva melhor {{ tipoAcomodTextLower }}</h1>   

      <textarea 
      v-model="$store.state.acomodData.subtitle"
      v-autosize="subtitle"
      maxlength="600"
      rows="1"
      placeholder="Dica: Escreva detalhes importantes aqui, que não foram perguntados antes."
      required>
      {{subtitle}}</textarea>

      <span class="__lenght-calc">{{ subtitleLength }}</span> 

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn10">Voltar</button>
          <button type="button" class="__next" :style="form10ok" @click="nextBtn10">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## DESCRIÇÃO PG.10 ########## -->





    <!-- ########## IDENTIFICAÇÃO PG.11 ########## -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod11">

      <h1 class="__form-title">Sua identificação</h1>   

      <div class="signin-btns" v-if="$store.state.user.email === null">
        <button type="button" class="facebook-btn" @click="facebookSignIn()">Continuar com Facebook</button>
        <button type="button" class="google-btn" @click="googleSignIn()">Continuar com Google</button>
        <button type="button" class="email-btn" @click="emailSignIn()">Continuar com E-mail</button>
      </div>

      <h3 class="__form-text" v-if="$store.state.user.email !== null">Ótimo {{ $store.state.user.firstName }}! Só mais algumas informações:</h3>

      <div v-if="$store.state.user.email !== null">

        <div class="item-form">
          <label>Celular / WhatsApp</label>
          <masked-input
            type="tel"
            v-model="$store.state.acomodData.celular"
            :mask="['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
            :guide="false"
            placeholder="(  )          ">
          </masked-input>
        </div>

        <div class="item-form">
          <label>Celular / WhatsApp 2 <light>(Opcional)</light></label>
          <masked-input
            type="tel"
            v-model="$store.state.acomodData.celular2"
            :mask="['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
            :guide="false"
            placeholder="(  )          ">
          </masked-input>
        </div>

      </div>


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn11">Voltar</button>
          <button type="button" class="__next" :style="form11ok" @click="nextBtn11">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## IDENTIFICAÇÃO PG.11 ########## -->





    <!-- ########## DADOS BANCÁRIOS PG.12 ########## -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod12">

      <h1 class="__form-title">Seus dados bancários para transferência</h1>   

      <h3 class="__form-text">{{ $store.state.user.firstName }}, para finalizar precisamos dos dados de sua conta bancária para podermos transferir seus ganhos financeiros. Não se preocupe, suas informações estarão seguras.</h3>

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
              <div class="agencia" style="flex:50%; margin-right:.5rem">
                <label>Agência</label>
                <masked-input
                  :class="[ agenciaError ? 'has-error' : '' ]"
                  type="tel"
                  v-model="$store.state.bankAccount.agencia"
                  :mask="[/\d/, /\d/, /\d/, /\d/, /\d/]"
                  :guide="false">
                </masked-input>
              </div>
              <div class="agencia-dv" style="flex:50%; margin-left:.5rem">
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
              <div class="conta" style="flex:50%; margin-right:.5rem">
                <label>Conta Corrente</label>
                <masked-input
                  :class="[ contaError ? 'has-error' : '' ]"
                  type="tel"
                  v-model="$store.state.bankAccount.conta"
                  :mask="[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]"
                  :guide="false">
                </masked-input>
              </div>
              <div class="conta-dv" style="flex:50%; margin-left:.5rem">
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
          <button type="button" class="__back" @click="backBtn12">Voltar</button>
          <button type="button" class="__next" :style="form12ok" @click="concluir">Publicar</button>
        </div>
      </div> 
    
    </form><!-- ########## DADOS BANCÁRIOS PG.12 ########## -->


    <!-- CADASTRO ACOMODAÇÃO -->


  </div>
</template>

<script>
import isMobile from 'ismobilejs'
import pagarme from 'pagarme'
import { loaded } from '~/node_modules/vue2-google-maps/src/manager'
import * as firebase from 'firebase'
import MaskedInput from 'vue-text-mask'
import { bancos } from '../../../mixins/bancos'
import VueSimpleSuggest from 'vue-simple-suggest'
import localMap from '~/components/localMap.vue'

export default {
  components: { 
    MaskedInput, VueSimpleSuggest, localMap
  },
  mixins: [bancos],
  head () {
    return {
      title: 'Anunciar Acomodação em Capitólio ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
  data () {
    return {
      title: '',/* Vue Autosize */
      subtitle: '',/* Vue Autosize */
      showCroppaModal: false,
      isUploading: false,
      uploadProgress: 0,
      newRegra: '',
      monthsPermitted: ['01','02','03','04','05','06','07','08','09','10','11','12'],
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
    scrollTop () {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    /* ******************** IMAGE INPUT ******************** */
    async imageConfirm () {
      this.isUploading = true
      const storageRef = firebase.storage().ref('acomods/' + this.$store.state.acomodData.acomodID + '/')
      let blobL = await this.$refs.myCroppa.promisedBlob('image/jpeg', 0.01)
      let blobHJ = await this.$refs.myCroppa.promisedBlob('image/jpeg')
      let blobHW = await this.$refs.myCroppa.promisedBlob('image/webp')
      this.uploadProgress = 35
      let n = this.$store.state.imageCountAc
      let key = this.$store.state.acomodData.images.length
      /* L */
      storageRef.child('L' + n + '.jpeg').put(blobL).then(snapshot => {
        storageRef.child('L' + n + '.jpeg').getDownloadURL().then(url => {
          this.$store.state.acomodData.images.push({ id: null, L: null, HJ: null, HW: null })
          this.$store.state.acomodData.images[key].L = url
          this.uploadProgress = 70
          /* HJ */
          storageRef.child('H' + n + 'J.jpeg').put(blobHJ).then(snapshot => {
            storageRef.child('H' + n + 'J.jpeg').getDownloadURL().then(url => {
              this.$store.state.acomodData.images[key].HJ = url
              this.uploadProgress = 92
              /* HW */
              storageRef.child('H' + n + 'W.webp').put(blobHW).then(snapshot => {
                storageRef.child('H' + n + 'W.webp').getDownloadURL().then(url => {
                  this.$store.state.acomodData.images[key].HW = url
                  this.$store.state.acomodData.images[key].id = n
                  this.uploadProgress = 100
                  this.$refs.myCroppa.remove()
                  this.$store.commit('m_imageCountAc')
                  this.isUploading = false
                  this.uploadProgress = 0
                })
              })
            })
          })
        })
      })
    },
    deleteImage (image, index) {
      const storageRef = firebase.storage().ref('acomods/' + this.$store.state.acomodData.acomodID + '/')
      storageRef.child('L' + image.id + '.jpeg').delete()
      storageRef.child('H' + image.id + 'J.jpeg').delete()
      storageRef.child('H' + image.id + 'W.webp').delete()
      this.$store.state.acomodData.images.splice(index, 1)
      this.$refs.myCroppa.remove()
    },
    /* ******************** GOOGLE MAPS ******************** */
    setPlace (place) {
      console.log(place)
      this.$store.commit('m_acomodPlace', place)
      this.$store.state.acomodData.positionLAT = this.$store.state.acomodPlace.geometry.location.lat()
      this.$store.state.acomodData.positionLNG = this.$store.state.acomodPlace.geometry.location.lng()
      this.$store.state.acomodData.address = this.$store.state.acomodPlace.formatted_address
      this.$modal.show('local-map-modal')
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
    /* ******************** REGRAS ******************** */
    addRegra () {
      if (this.newRegra) {
        this.$store.state.acomodData.regrasAdicionais.push(this.newRegra)
        this.newRegra = ''
      }
    },
    removeRegra (index) {
      this.$store.state.acomodData.regrasAdicionais.splice(index, 1)
    },
    /* ******************** BACK BUTTON ******************** */
    backBtn1 () {
      this.$store.commit('m_cadastroAcomod1', false), this.$store.commit('m_cadastroAcomod0', true), window.history.back(1)
    },
    backBtn2 () {
      this.$store.commit('m_cadastroAcomod2', false), this.$store.commit('m_cadastroAcomod1', true), window.history.back(1)
    },
    backBtn3 () {
      this.$store.commit('m_cadastroAcomod3', false), this.$store.commit('m_cadastroAcomod2', true), window.history.back(1)
    },
    backBtn4 () {
      this.$store.commit('m_cadastroAcomod4', false), this.$store.commit('m_cadastroAcomod3', true), window.history.back(1)
    },
    backBtn5 () {
      this.$store.commit('m_cadastroAcomod5', false), this.$store.commit('m_cadastroAcomod4', true), window.history.back(1)
    },
    backBtn6 () {
      this.$store.commit('m_cadastroAcomod6', false), this.$store.commit('m_cadastroAcomod5', true), window.history.back(1)
    },
    backBtn7 () {
      this.$store.commit('m_cadastroAcomod7', false), this.$store.commit('m_cadastroAcomod6', true), window.history.back(1)
    },
    backBtn8 () {
      this.$store.commit('m_cadastroAcomod8', false), this.$store.commit('m_cadastroAcomod7', true), window.history.back(1)
    },
    backBtn9 () {
      this.$store.commit('m_cadastroAcomod9', false), this.$store.commit('m_cadastroAcomod8', true), window.history.back(1)
    },
    backBtn10 () {
      this.$store.commit('m_cadastroAcomod10', false), this.$store.commit('m_cadastroAcomod9', true), window.history.back(1)
    },
    backBtn11 () {
      this.$store.commit('m_cadastroAcomod11', false), this.$store.commit('m_cadastroAcomod10', true), window.history.back(1)
    },
    backBtn12 () {
      this.$store.commit('m_cadastroAcomod12', false), this.$store.commit('m_cadastroAcomod11', true), window.history.back(1)
    },
    /* ******************** NEXT BUTTONS ******************** */
    nextBtn1 () {
      if (this.$store.state.acomodData.tipoAcomod !== null) {
        this.$store.commit('m_cadastroAcomod1', false), this.$store.commit('m_cadastroAcomod2', true), this.$store.commit('m_acomodProgressBar', (100/12)*2), this.scrollTop(), window.location.hash = "capacidade"
      }
    },
    nextBtn2 () {
      if (this.$store.state.acomodData.totalHospedes !== null) {
        this.$store.commit('m_cadastroAcomod2', false), this.$store.commit('m_cadastroAcomod3', true), this.$store.commit('m_acomodProgressBar', (100/12)*3), this.scrollTop(), window.location.hash = "caracteristicas"
      }
    },
    nextBtn3 () {
      if (1<2) {
        this.$store.commit('m_cadastroAcomod3', false), this.$store.commit('m_cadastroAcomod4', true), this.$store.commit('m_acomodProgressBar', (100/12)*4), this.scrollTop(), window.location.hash = "comodidades"
      }
    },
    nextBtn4 () {
      if (1<2) {
        this.$store.commit('m_cadastroAcomod4', false), this.$store.commit('m_cadastroAcomod5', true), this.$store.commit('m_acomodProgressBar', (100/12)*5), this.scrollTop(), window.location.hash = "local"
      }
    },
    nextBtn5 () {
      if (this.$store.state.acomodPlace !== null || this.$store.state.acomodData.positionLAT !== -20.6141320) {
        this.$store.commit('m_cadastroAcomod5', false), this.$store.commit('m_cadastroAcomod6', true), this.$store.commit('m_acomodProgressBar', (100/12)*6), this.scrollTop(), window.location.hash = "imagens"
      } else {
        this.$modal.show('dialog', {
          title: 'Ops',
          text: 'Adicione um endereço.',
          buttons: [{ title: 'OK' }]
        })
      }
    },
    nextBtn6 () {
      if (this.$store.state.acomodData.images.length >= 3) {
        this.$store.commit('m_cadastroAcomod6', false), this.$store.commit('m_cadastroAcomod7', true), this.$store.commit('m_acomodProgressBar', (100/12)*7), this.scrollTop(), window.location.hash = "valor"
      } else {
        this.$modal.show('dialog', {
          title: 'Ops',
          text: 'Adicione pelo menos 3 imagens.',
          buttons: [{ title: 'OK' }]
        })
      }
    },
    nextBtn7 () {
      if (this.$store.state.acomodData.valorNoite !== 0) {
        this.$store.commit('m_cadastroAcomod7', false), this.$store.commit('m_cadastroAcomod8', true), this.$store.commit('m_acomodProgressBar', (100/12)*8), this.scrollTop(), window.location.hash = "regras"
      } else {
        this.$modal.show('dialog', {
          title: 'Ops',
          text: 'O valor por noite não pode ser zero.',
          buttons: [{ title: 'OK' }]
        })
      }
    },
    nextBtn8 () {
      if (1<2) {
        this.$store.commit('m_cadastroAcomod8', false), this.$store.commit('m_cadastroAcomod9', true), this.$store.commit('m_acomodProgressBar', (100/12)*9), this.scrollTop(), window.location.hash = "titulo"
      } else {
        this.$modal.show('dialog', {
          title: 'Ops',
          text: 'É preciso definir as regras.',
          buttons: [{ title: 'OK' }]
        })
      }
    },
    nextBtn9 () {
      if (this.$store.state.acomodData.title !== '') {
        this.$store.commit('m_cadastroAcomod9', false), this.$store.commit('m_cadastroAcomod10', true), this.$store.commit('m_acomodProgressBar', (100/12)*10), this.scrollTop(), window.location.hash = "subtitulo"
      } else {
        this.$modal.show('dialog', {
          title: 'Ops',
          text: 'Adicione um título.',
          buttons: [{ title: 'OK' }]
        })
      }
    },
    nextBtn10 () {
      if (this.$store.state.acomodData.subtitle !== '') {
        this.$store.commit('m_cadastroAcomod10', false), this.$store.commit('m_cadastroAcomod11', true), this.$store.commit('m_acomodProgressBar', (100/12)*11), this.scrollTop(), window.location.hash = "identificacao"
      } else {
        this.$modal.show('dialog', {
          title: 'Ops',
          text: 'Adicione uma descrição.',
          buttons: [{ title: 'OK' }]
        })
      }
    },
    nextBtn11 () {
      if (this.$store.state.user.email === null) {
        this.$modal.show('dialog', {
          text: 'Conecte-se com uma de suas contas ou crie uma conta com seu e-mail.',
          buttons: [{ title: 'Ok' }]
        })
      }
      if (this.$store.state.acomodData.celular.length === 15) {
        this.$store.commit('m_cadastroAcomod11', false), this.$store.commit('m_cadastroAcomod12', true), this.$store.commit('m_acomodProgressBar', (100/12)*12), this.scrollTop(), window.location.hash = "dados"
      } else {
        this.$modal.show('dialog', {
          title: 'Ops',
          text: 'Adicione pelo menos um número de celular.',
          buttons: [{ title: 'OK' }]
        })
      }
    },
    hashAcomod () {
      window.location.hash = "tipo"
    },
    concluir () {
      if (this.bankCode !== '' && this.agencia !== '' && this.agenciaDV !== '' && this.conta !== '' && this.contaDV !== '' && this.legalName !== '' && this.docNumber.length === 14) {
        this.$store.commit('m_loader', true)
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
          this.$store.state.acomodData.recipientID = recipient.id.toString()
          this.$store.dispatch('a_uploadAcomod')
          this.$router.push('/acomodacoes/' + this.$store.state.acomodData.acomodID)
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
    }
  },
  async mounted () {
    loaded.then(() => {
      this.$store.state.googleMapsInitialized = true
    })
  },
  computed: {
    hash () {
      return this.$route.hash
    },
    /* ******************** BANK ACCOUNT ******************** */
    bankCode () { return this.$store.state.bankAccount.bankCode },
    type () { return this.$store.state.bankAccount.type },
    agencia () { return this.$store.state.bankAccount.agencia },
    agenciaDV () { return this.$store.state.bankAccount.agenciaDV },
    conta () { return this.$store.state.bankAccount.conta },
    contaDV () { return this.$store.state.bankAccount.contaDV },
    legalName () { return this.$store.state.bankAccount.legalName },
    docNumber () { return this.$store.state.bankAccount.docNumber },
    totalSuites () {
      if (this.$store.state.acomodData.totalQuartos !== '1') {
        return Array.from({length: this.$store.state.acomodData.totalQuartos}, (v, k) => k+1)
      } else {
        return 10
      }
    },
    totalSuitesTitulo () {
      return this.$store.state.acomodData.totalSuites != 1 ? ', ' + this.$store.state.acomodData.totalSuites + ' suítes' : ''
    },
    tipoAcomodText () {
      const path = this.$store.state.acomodData.tipoAcomod
      return path === 'Casa' ? 'da casa' 
           : path === 'Apartamento' ? 'do apartamento'
           : path === 'Rancho' ? 'do rancho'
           : path === 'Chácara' ? 'da chácara'
           : path === 'Pousada' ? 'da pousada'
           : path === 'Camping' ? 'do camping'
           : path === 'Sítio' ? 'do sítio'
           : path === 'Fazenda' ? 'da fazenda'
           : path === 'Hostel' ? 'do hostel'
           : ''
    },
    tipoAcomodTextLower () {
      const path = this.$store.state.acomodData.tipoAcomod
      return path === 'Casa' ? 'sua casa' 
           : path === 'Apartamento' ? 'seu apartamento'
           : path === 'Rancho' ? 'seu rancho'
           : path === 'Chácara' ? 'sua chácara'
           : path === 'Pousada' ? 'sua pousada'
           : path === 'Camping' ? 'seu camping'
           : path === 'Sítio' ? 'seu sítio'
           : path === 'Fazenda' ? 'sua fazenda'
           : path === 'Hostel' ? 'seu hostel'
           : ''
    },
    tipoAcomodTextLocal () {
      const path = this.$store.state.acomodData.tipoAcomod
      return path === 'Casa' ? 'Sua casa' 
           : path === 'Apartamento' ? 'Seu apartamento'
           : path === 'Rancho' ? 'Seu rancho'
           : path === 'Chácara' ? 'Sua chácara'
           : path === 'Pousada' ? 'Sua pousada'
           : path === 'Camping' ? 'Seu camping'
           : path === 'Sítio' ? 'Seu sítio'
           : path === 'Fazenda' ? 'Sua fazenda'
           : path === 'Hostel' ? 'Seu hostel'
           : ''
    },
    tipoAcomodTitulo () {
      const path = this.$store.state.acomodData.tipoAcomod
      return path === 'Casa' ? 'Linda casa' 
           : path === 'Apartamento' ? 'Lindo apartamento'
           : path === 'Rancho' ? 'Lindo rancho'
           : path === 'Chácara' ? 'Linda chácara'
           : path === 'Pousada' ? 'Linda pousada'
           : path === 'Camping' ? 'Lindo camping'
           : path === 'Sítio' ? 'Lindo sítio'
           : path === 'Fazenda' ? 'Linda fazenda'
           : path === 'Hostel' ? 'Lindo hostel'
           : ''
    },
    titleLength () {
      return 50 - this.$store.state.acomodData.title.length
    },
    subtitleLength () {
      return 600 - this.$store.state.acomodData.subtitle.length
    },
    yearsPermitted () {
      let year = new Date().getFullYear().toString()
      let shortYear = Number(year.slice(-2))
      let n1 = shortYear + 1
      let n2 = shortYear + 2
      let n3 = shortYear + 3
      let n4 = shortYear + 4
      let n5 = shortYear + 5
      let n6 = shortYear + 6
      let n7 = shortYear + 7
      let n8 = shortYear + 8
      let n9 = shortYear + 9
      let n10 = shortYear + 10
      let yearsPermitted = [shortYear, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10]
      return yearsPermitted
    },
    form1ok () {
      return this.$store.state.acomodData.tipoAcomod !== null ? 'background:#FFA04F' : ''
    },
    form2ok () {
      return this.$store.state.acomodData.totalHospedes !== null ? 'background:#FFA04F' : ''
    },
    form3ok () {
      return 1<2 ? 'background:#FFA04F' : ''
    },
    form4ok () {
      return 1<2 ? 'background:#FFA04F' : ''
    },
    form5ok () {
      return this.$store.state.acomodPlace !== null || this.$store.state.acomodData.positionLAT !== -20.6141320 ? 'background:#FFA04F' : ''
    },
    form6ok () {
      return this.$store.state.acomodData.images.length >= 3 ? 'background:#FFA04F' : ''
    },
    form7ok () {
      return this.$store.state.acomodData.valorNoite !== 0 ? 'background:#FFA04F' : ''
    },
    form8ok () {
      return 1<2 ? 'background:#FFA04F' : ''
    },
    form9ok () {
      return this.$store.state.acomodData.title !== '' ? 'background:#FFA04F' : ''
    },
    form10ok () {
      return this.$store.state.acomodData.subtitle !== '' ? 'background:#FFA04F' : ''
    },
    form11ok () {
      return this.$store.state.acomodData.celular.length === 15 ? 'background:#FFA04F' : ''
    },
    form12ok () {
      return this.bankCode !== null && this.agencia !== '' && this.agenciaDV !== '' && this.conta !== '' && this.contaDV !== '' && this.legalName !== '' && this.docNumber.length === 14 ? 'background:#FFA04F' : ''
    }
  },
  watch: {
    bankCode (value) { value !== '' ? this.bankCodeError = false : '' },
    agencia (value) { value !== '' ? this.agenciaError = false : '' },
    agenciaDV (value) { value !== '' ? this.agenciaDVError = false : '' },
    conta (value) { value !== '' ? this.contaError = false : '' },
    contaDV (value) { value !== '' ? this.contaDVError = false : '' },
    legalName (value) { value !== '' ? this.legalNameError = false : '' },
    docNumber (value) { value !== '' ? this.docNumberError = false : ''},
    hash (value) {
      if (value === '') {
        this.$store.commit('m_cadastroAcomod0', true)
        this.$store.commit('m_cadastroAcomod1', false)
        this.$store.commit('m_cadastroAcomod2', false)
        this.$store.commit('m_cadastroAcomod3', false)
        this.$store.commit('m_cadastroAcomod4', false)
        this.$store.commit('m_cadastroAcomod5', false)
        this.$store.commit('m_cadastroAcomod6', false)
        this.$store.commit('m_cadastroAcomod7', false)
        this.$store.commit('m_cadastroAcomod8', false)
        this.$store.commit('m_cadastroAcomod9', false)
        this.$store.commit('m_cadastroAcomod10', false)
        this.$store.commit('m_cadastroAcomod11', false)
        this.$store.commit('m_cadastroAcomod12', false)
      } 
      if (value === '#tipo') {
        this.$store.commit('m_cadastroAcomod0', false)
        this.$store.commit('m_cadastroAcomod1', true)
        this.$store.commit('m_cadastroAcomod2', false)
        this.$store.commit('m_cadastroAcomod3', false)
        this.$store.commit('m_cadastroAcomod4', false)
        this.$store.commit('m_cadastroAcomod5', false)
        this.$store.commit('m_cadastroAcomod6', false)
        this.$store.commit('m_cadastroAcomod7', false)
        this.$store.commit('m_cadastroAcomod8', false)
        this.$store.commit('m_cadastroAcomod9', false)
        this.$store.commit('m_cadastroAcomod10', false)
        this.$store.commit('m_cadastroAcomod11', false)
        this.$store.commit('m_cadastroAcomod12', false)
      } 
      if (value === '#capacidade') {
        this.$store.commit('m_cadastroAcomod0', false)
        this.$store.commit('m_cadastroAcomod1', false)
        this.$store.commit('m_cadastroAcomod2', true)
        this.$store.commit('m_cadastroAcomod3', false)
        this.$store.commit('m_cadastroAcomod4', false)
        this.$store.commit('m_cadastroAcomod5', false)
        this.$store.commit('m_cadastroAcomod6', false)
        this.$store.commit('m_cadastroAcomod7', false)
        this.$store.commit('m_cadastroAcomod8', false)
        this.$store.commit('m_cadastroAcomod9', false)
        this.$store.commit('m_cadastroAcomod10', false)
        this.$store.commit('m_cadastroAcomod11', false)
        this.$store.commit('m_cadastroAcomod12', false)
      } 
      if (value === '#caracteristicas') {
        this.$store.commit('m_cadastroAcomod0', false)
        this.$store.commit('m_cadastroAcomod1', false)
        this.$store.commit('m_cadastroAcomod2', false)
        this.$store.commit('m_cadastroAcomod3', true)
        this.$store.commit('m_cadastroAcomod4', false)
        this.$store.commit('m_cadastroAcomod5', false)
        this.$store.commit('m_cadastroAcomod6', false)
        this.$store.commit('m_cadastroAcomod7', false)
        this.$store.commit('m_cadastroAcomod8', false)
        this.$store.commit('m_cadastroAcomod9', false)
        this.$store.commit('m_cadastroAcomod10', false)
        this.$store.commit('m_cadastroAcomod11', false)
        this.$store.commit('m_cadastroAcomod12', false)
      } 
      if (value === '#comodidades') {
        this.$store.commit('m_cadastroAcomod0', false)
        this.$store.commit('m_cadastroAcomod1', false)
        this.$store.commit('m_cadastroAcomod2', false)
        this.$store.commit('m_cadastroAcomod3', false)
        this.$store.commit('m_cadastroAcomod4', true)
        this.$store.commit('m_cadastroAcomod5', false)
        this.$store.commit('m_cadastroAcomod6', false)
        this.$store.commit('m_cadastroAcomod7', false)
        this.$store.commit('m_cadastroAcomod8', false)
        this.$store.commit('m_cadastroAcomod9', false)
        this.$store.commit('m_cadastroAcomod10', false)
        this.$store.commit('m_cadastroAcomod11', false)
        this.$store.commit('m_cadastroAcomod12', false)
      } 
      if (value === '#local') {
        this.$store.commit('m_cadastroAcomod0', false)
        this.$store.commit('m_cadastroAcomod1', false)
        this.$store.commit('m_cadastroAcomod2', false)
        this.$store.commit('m_cadastroAcomod3', false)
        this.$store.commit('m_cadastroAcomod4', false)
        this.$store.commit('m_cadastroAcomod5', true)
        this.$store.commit('m_cadastroAcomod6', false)
        this.$store.commit('m_cadastroAcomod7', false)
        this.$store.commit('m_cadastroAcomod8', false)
        this.$store.commit('m_cadastroAcomod9', false)
        this.$store.commit('m_cadastroAcomod10', false)
        this.$store.commit('m_cadastroAcomod11', false)
        this.$store.commit('m_cadastroAcomod12', false)
      } 
      if (value === '#imagens') {
        this.$store.commit('m_cadastroAcomod0', false)
        this.$store.commit('m_cadastroAcomod1', false)
        this.$store.commit('m_cadastroAcomod2', false)
        this.$store.commit('m_cadastroAcomod3', false)
        this.$store.commit('m_cadastroAcomod4', false)
        this.$store.commit('m_cadastroAcomod5', false)
        this.$store.commit('m_cadastroAcomod6', true)
        this.$store.commit('m_cadastroAcomod7', false)
        this.$store.commit('m_cadastroAcomod8', false)
        this.$store.commit('m_cadastroAcomod9', false)
        this.$store.commit('m_cadastroAcomod10', false)
        this.$store.commit('m_cadastroAcomod11', false)
        this.$store.commit('m_cadastroAcomod12', false)
      } 
      if (value === '#valor') {
        this.$store.commit('m_cadastroAcomod0', false)
        this.$store.commit('m_cadastroAcomod1', false)
        this.$store.commit('m_cadastroAcomod2', false)
        this.$store.commit('m_cadastroAcomod3', false)
        this.$store.commit('m_cadastroAcomod4', false)
        this.$store.commit('m_cadastroAcomod5', false)
        this.$store.commit('m_cadastroAcomod6', false)
        this.$store.commit('m_cadastroAcomod7', true)
        this.$store.commit('m_cadastroAcomod8', false)
        this.$store.commit('m_cadastroAcomod9', false)
        this.$store.commit('m_cadastroAcomod10', false)
        this.$store.commit('m_cadastroAcomod11', false)
        this.$store.commit('m_cadastroAcomod12', false)
      } 
      if (value === '#regras') {
        this.$store.commit('m_cadastroAcomod0', false)
        this.$store.commit('m_cadastroAcomod1', false)
        this.$store.commit('m_cadastroAcomod2', false)
        this.$store.commit('m_cadastroAcomod3', false)
        this.$store.commit('m_cadastroAcomod4', false)
        this.$store.commit('m_cadastroAcomod5', false)
        this.$store.commit('m_cadastroAcomod6', false)
        this.$store.commit('m_cadastroAcomod7', false)
        this.$store.commit('m_cadastroAcomod8', true)
        this.$store.commit('m_cadastroAcomod9', false)
        this.$store.commit('m_cadastroAcomod10', false)
        this.$store.commit('m_cadastroAcomod11', false)
        this.$store.commit('m_cadastroAcomod12', false)
      } 
      if (value === '#titulo') {
        this.$store.commit('m_cadastroAcomod0', false)
        this.$store.commit('m_cadastroAcomod1', false)
        this.$store.commit('m_cadastroAcomod2', false)
        this.$store.commit('m_cadastroAcomod3', false)
        this.$store.commit('m_cadastroAcomod4', false)
        this.$store.commit('m_cadastroAcomod5', false)
        this.$store.commit('m_cadastroAcomod6', false)
        this.$store.commit('m_cadastroAcomod7', false)
        this.$store.commit('m_cadastroAcomod8', false)
        this.$store.commit('m_cadastroAcomod9', true)
        this.$store.commit('m_cadastroAcomod10', false)
        this.$store.commit('m_cadastroAcomod11', false)
        this.$store.commit('m_cadastroAcomod12', false)
      } 
      if (value === '#subtitulo') {
        this.$store.commit('m_cadastroAcomod0', false)
        this.$store.commit('m_cadastroAcomod1', false)
        this.$store.commit('m_cadastroAcomod2', false)
        this.$store.commit('m_cadastroAcomod3', false)
        this.$store.commit('m_cadastroAcomod4', false)
        this.$store.commit('m_cadastroAcomod5', false)
        this.$store.commit('m_cadastroAcomod6', false)
        this.$store.commit('m_cadastroAcomod7', false)
        this.$store.commit('m_cadastroAcomod8', false)
        this.$store.commit('m_cadastroAcomod9', false)
        this.$store.commit('m_cadastroAcomod10', true)
        this.$store.commit('m_cadastroAcomod11', false)
        this.$store.commit('m_cadastroAcomod12', false)
      } 
      if (value === '#identificacao') {
        this.$store.commit('m_cadastroAcomod0', false)
        this.$store.commit('m_cadastroAcomod1', false)
        this.$store.commit('m_cadastroAcomod2', false)
        this.$store.commit('m_cadastroAcomod3', false)
        this.$store.commit('m_cadastroAcomod4', false)
        this.$store.commit('m_cadastroAcomod5', false)
        this.$store.commit('m_cadastroAcomod6', false)
        this.$store.commit('m_cadastroAcomod7', false)
        this.$store.commit('m_cadastroAcomod8', false)
        this.$store.commit('m_cadastroAcomod9', false)
        this.$store.commit('m_cadastroAcomod10', false)
        this.$store.commit('m_cadastroAcomod11', true)
        this.$store.commit('m_cadastroAcomod12', false)
      } 
      if (value === '#dados') {
        this.$store.commit('m_cadastroAcomod0', false)
        this.$store.commit('m_cadastroAcomod1', false)
        this.$store.commit('m_cadastroAcomod2', false)
        this.$store.commit('m_cadastroAcomod3', false)
        this.$store.commit('m_cadastroAcomod4', false)
        this.$store.commit('m_cadastroAcomod5', false)
        this.$store.commit('m_cadastroAcomod6', false)
        this.$store.commit('m_cadastroAcomod7', false)
        this.$store.commit('m_cadastroAcomod8', false)
        this.$store.commit('m_cadastroAcomod9', false)
        this.$store.commit('m_cadastroAcomod10', false)
        this.$store.commit('m_cadastroAcomod11', false)
        this.$store.commit('m_cadastroAcomod12', true)
      } 
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.state.showFoobar === true) {
        vm.$store.commit('m_showFoobar', false)
      }
      if (vm.$store.state.acomodData.acomodID === null) {
        let acomodID = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000).toString()
        firebase.firestore().collection('acomods').doc(acomodID).get().then(doc => {
          if (doc.exists) {
            do {
              acomodID = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000).toString()
              vm.$store.commit('m_acomodID', acomodID)
            } while (!doc.exists)
          } else {
            vm.$store.commit('m_acomodID', acomodID)
          }
        })
      }
    })
  }
}
</script>

<style>
@import url('~/assets/css/main.css');
@import url('~/assets/css/switcher.css');
@import url('~/assets/css/yes-or-no.css');
@import url('~/assets/css/vue-simple-suggest.css');

.anunciar-acomodacao {
  margin-top: 3.4rem;
  transition: var(--main-transition);
  & .progress-bar {
    position: fixed;
    top: 3.4rem;
    height: 3px;
    z-index: 8888;
    background: var(--colorAcomod);
    transition: all .3s ease;
  }
  /* ******************** PLANO ACOMODAÇÃO ******************** */
  & .plano-acomodacao-mobile {
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
      background: var(--colorAcomod);
      border-radius: 2rem;
      font-size: var(--fontSizeAnuncioText);
      font-weight: 600;
      box-shadow: 3px 3px 20px 1px rgba(0,0,0,0.18);
    }
  }
  & .plano-acomodacao-desktop {
    display: none;
  }
  /* ******************** CADASTRO ACOMODAÇÃO ******************** */
  & .cadastro-acomodacao {
    height: 100%;
    background: white;
    color: var(--color01);
    padding: 0 0 6rem 0;
    & .__form-title {
      padding: 3rem 7% 1.5rem 7%;
      line-height: 36px;
      font-size: 27px;
      z-index: 999;
      user-select: none !important;
    }
    & .__form-text {
      padding: .7rem 7%;
      font-size: var(--fontSizeAnuncioText);
    }
    & .__form-subtitle {
      padding-top: 1.1rem;
      font-size: 18px;
      font-weight: 600;
      user-select: none;
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
      margin: 1.9rem 0;
      & label {
        font-weight: 600;
        font-size: 15px;
      }
      & input {
        cursor: text;
        position: relative;
        width: 100%;
        font-size: var(--fontSizeAnuncioText);
        font-weight: 400;
        background: white;
        color: var(--color01);
        padding: .6rem 0;
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
        padding: .6rem 0;
        border: none;
        border-bottom: 1px solid rgb(222,222,222);
        outline: none;
      }
    }
    
    & .comodidades-box {
      padding: 0 7%;
      & .item-form-switches {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgb(222,222,222);
        padding: 1.3rem 0;
        & h3 {
          user-select: none;
          font-size: var(--fontSizeAnuncioText);
        }
      }
    }
    & .regras-box {
      padding: .5rem 7% 0;
      & .item-form-regras {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgb(222,222,222);
        padding: 1.1rem 0;
        & h3 {
          user-select: none;
          font-size: var(--fontSizeAnuncioText);
        }
      }
      & .new-regras {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .5rem 0;
        & .__regra-text {
          font-size: var(--fontSizeAnuncioText);
          user-select: none;
        }
        & .__regra-remove {
          background-image: url('../../../assets/img/close-modal.svg');
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: 16px;
          background-color: white;
          width: 3rem;
          min-width: 3rem;
          height: 1rem;
        }
      }
      & .input-row {
        display: flex;
        width: 100%;
        padding-top: .6rem;
        & .__input {
          width: 100%;
          cursor: text;
          position: relative;
          font-size: var(--fontSizeAnuncioText);
          font-weight: 400;
          background: white;
          color: var(--color01);
          padding: .5rem 0 .6rem 0;
          border: none;
          border-bottom: 1px solid rgb(222,222,222);
          outline: none;
        }
        & .__add-btn {
          background-image: url('./../../../assets/img/add-image.svg');
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: 20px;
          background-color: white;
          font-weight: 500;
          border-bottom: 1px solid rgb(222,222,222);
          width: 3rem;
          min-width: 3rem;
        }
      }
    }
    & .without-address {
      display: inline-flex;
      cursor: pointer;
      user-select: none;
      margin: 0 7%;
      font-size: 16px;
      font-weight: 500;
      transform: translateY(-1.2rem);
      color: #1E9297;
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
        & canvas:active {
          cursor: grabbing;
        }
        & .modal-croppa-btns {
          display: flex;
          flex-flow: column;
          width: 70%;
        }
      }
    }
    & .before-choose-image {
      & .__input-btn {
        margin: 1rem 7%;
        font-size: 16px;
        font-weight: 600;
        background: var(--colorAcomod);
        color: white;
        padding: .8rem 1.2rem;
        border-radius: 2rem;
      }
    }
    & .__croppa-btn {
      margin: .3rem 0;
      font-size: 16px;
      font-weight: 500;
      background: var(--colorAcomod);
      color: white;
      padding: .8rem 1.2rem;
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
          border-radius: 4px;
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
        border: 2px dashed rgb(182,182,182);
        border-radius: 4px;
        & .loader-svg {
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          margin: auto;
          width: 4rem;
          height: 4rem;
          & .__circle {
            transition: stroke-dashoffset 1s ease;
            transform: rotate(-90deg);
            transform-origin: 50% 50%;
          }
        }
        & .__add-image-svg {
          position: absolute;
          width: 2.2rem;
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
          background: rgb(192,192,192);
          color: white;
        }
      }
    }
  }
}

@media (min-width: 1024px) {
  .anunciar-acomodacao {
    margin-top: 4rem;
    & .progress-bar {
      top: 4rem;
      height: 6px;
    }
    & .plano-acomodacao-mobile {
      display: none;
    }
    & .plano-acomodacao-desktop {
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
          background: var(--colorAcomod);
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
    & .cadastro-acomodacao {
      padding: 0 0 8rem 0;
      & .__form-title {
        padding: 3.5rem 26% 1.2rem;
        font-size: 32px;
        font-weight: 700;
        text-align: center;
      }
      & .__form-text {
        padding: 1.4rem 26% 0;
        font-size: 17px;
      }
      & .__form-subtitle {
        padding-top: 1.5rem;
        font-size: 19px;
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
        }
        & select {
          font-size: 17px;
          font-weight: 400;
        }
      }
      & .comodidades-box {
        padding: .6rem 26% 0;
        & .item-form-switches {
          padding: 1.5rem 0;
          & h3 {
          }
        }
      }
      & .regras-box {
        padding: .6rem 26% 0;
        & .item-form-regras {
          padding: 1.5rem 0;
          & h3 {
          }
        }
      }
      & .without-address {
        margin: 0 26%;
        transform: translateY(-1.7rem);
      }
      & .recebedor-box {
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
        padding: 0 calc(26% - 1%);
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
