<template>
  <div class="anunciar-acomodacao">

    <v-dialog style="z-index:10000"/>

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

      <h1 class="__form-title">Quantas pessoas podem se hospedar?</h1>

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
        <label>Vagas na Garagem</label>
        <select v-model="$store.state.acomodData.totalGaragem">
          <option v-for="n in 7">{{ n }}</option>
          <option>Mais de 7</option>
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
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod5">

      <h1 class="__form-title">Qual a localização?</h1>

      <div class="item-form">
        <label>Local</label>
        <gmap-autocomplete
          onKeyPress="if (event.which == 13) return false" 
          placeholder="Digite o endereço completo aqui"
          @place_changed="setPlace">
        </gmap-autocomplete>
      </div>

      <h3 class="without-address" @click="$modal.show('local-map-modal')">{{ tipoAcomodTextLocal }} não tem endereço?</h3>

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

      <h1 class="__form-title">Adicione Imagens e Vídeo</h1>

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

      <div class="modal-croppa" v-show="showCroppaModal3" @click="showCroppaModal3=false">
        <div class="modal-croppa-body" @click.stop>
          <h1>Ajustar imagem</h1>
          <croppa
          ref="myCroppa3"
          @file-choose="showCroppaModal3 = true"
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
            <button class="__croppa-btn" type="button" @click="showCroppaModal3=false, imageConfirmed3()">Confirmar</button>
            <button class="__croppa-btn" type="button" @click="$refs.myCroppa3.chooseFile(), $refs.myCroppa3.remove(), imageURL3 = null"  style="background:transparent">Escolher outra</button>
            <button class="__croppa-btn" type="button" @click="removeImage3()" style="background:transparent">Remover</button>
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
          <img src="./../../../assets/img/add-image.svg" class="__preview-img" v-if="imageURL2 === null" @click="$refs.myCroppa2.chooseFile()" style="padding:23%">
          <img :src="imageURL2" class="__preview-img" @click="showCroppaModal2=true" v-else>
        </div>

        <div class="image-box" v-if="imageURL2 !== null">
          <img src="./../../../assets/img/add-image.svg" class="__preview-img" v-if="imageURL3 === null" @click="$refs.myCroppa3.chooseFile()" style="padding:23%">
          <img :src="imageURL3" class="__preview-img" @click="showCroppaModal3=true" v-else>
        </div>

      </div><!-- Preview Image -->

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn6">Voltar</button>
          <button type="button" class="__next" :style="form6ok" @click="nextBtn6">Próximo</button>
        </div>
      </div> 
    
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


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn7">Voltar</button>
          <button type="button" class="__next" :style="form7ok" @click="nextBtn7">Próximo</button>
        </div>
      </div> 
    
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

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn8">Voltar</button>
          <button type="button" class="__next" :style="form8ok" @click="nextBtn8">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## TÍTULO PG.8 ########## -->




    <!-- ########## DESCRIÇÃO PG.9 ########## -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod9">

      <h1 class="__form-title">Descreva seu anúncio</h1>   

      <textarea 
      v-model="$store.state.acomodData.subtitle"
      v-autosize="subtitle"
      maxlength="500"
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
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod10">

      <h1 class="__form-title">Sua identificação</h1>   

      <div class="signin-btns" v-if="$store.state.acomodData.proprietario === null">
        <button type="button" class="facebook-btn" @click="facebookSignIn()">Continuar com Facebook</button>
        <button type="button" class="google-btn" @click="googleSignIn()">Continuar com Google</button>
        <button type="button" class="email-btn" @click="emailSignIn()">Continuar com E-mail</button>
      </div>

      <h3 class="__form-subtitle" v-if="$store.state.acomodData.proprietario !== null">Ótimo {{ firstName }}! Só mais algumas informações:</h3>

      <div v-if="$store.state.acomodData.proprietario !== null">

        <div class="item-form">
          <label>Celular / WhatsApp 1</label>
          <masked-input
            type="tel"
            v-model="$store.state.acomodData.celular"
            :mask="['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
            :guide="false"
            placeholder="(  )      -    ">
          </masked-input>
        </div>

        <div class="item-form">
          <label>Celular / WhatsApp 2 (Opcional)</label>
          <masked-input
            type="tel"
            v-model="$store.state.acomodData.celular2"
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





    <!-- ########## CONCLUIR PG.11 ########## -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod11">

      <h1 class="__form-title">Seus dados bancários para depósito</h1>   

      <h3 class="__form-subtitle">{{ firstName }}, para finalizar precisamos dos dados de sua conta bancária para podermos transferir seus ganhos financeiros advindos das reservas. Não se preocupe, suas informações estarão seguras.</h3>

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
    
    </form><!-- ########## CONCLUIR PG.11 ########## -->


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
      showCroppaModal1: false,
      showCroppaModal2: false,
      showCroppaModal3: false,
      imageURL1: null,
      imageURL2: null,
      imageURL3: null,
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
    /* --- Image 1 --- */
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
    /* --- Image 3 --- */
    async imageConfirmed3 () {
      if (this.imageURL3 !== null) {
        return 
      } else {
        const blobAcL3 = await this.$refs.myCroppa3.promisedBlob('image/jpeg', 0.01)
        const blobAcH3J = await this.$refs.myCroppa3.promisedBlob('image/jpeg')
        const blobAcH3W = await this.$refs.myCroppa3.promisedBlob('image/webp')
        let url3 = URL.createObjectURL(blobAcH3J)
        this.imageURL3 = url3
        this.$store.state.blobAcL3 = blobAcL3
        this.$store.state.blobAcH3J = blobAcH3J
        this.$store.state.blobAcH3W = blobAcH3W
      }
    },
    removeImage3 () {
      this.imageURL3 = null
      this.$refs.myCroppa3.remove()
      this.showCroppaModal3 = false
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
    
    /* ******************** NEXT BUTTONS ******************** */
    hashAcomod () {
      window.location.hash = "tipo"
    },
    nextBtn1 () {
      if (this.$store.state.acomodData.tipoAcomod !== null) {
        this.$store.commit('m_cadastroAcomod1', false), this.$store.commit('m_cadastroAcomod2', true), this.$store.commit('m_acomodProgressBar', (100/11)*2), this.scrollTop(), window.location.hash = "capacidade"
      }
    },
    nextBtn2 () {
      if (this.$store.state.acomodData.totalHospedes !== null) {
        this.$store.commit('m_cadastroAcomod2', false), this.$store.commit('m_cadastroAcomod3', true), this.$store.commit('m_acomodProgressBar', (100/11)*3), this.scrollTop(), window.location.hash = "caracteristicas"
      }
    },
    nextBtn3 () {
      if (1<2) {
        this.$store.commit('m_cadastroAcomod3', false), this.$store.commit('m_cadastroAcomod4', true), this.$store.commit('m_acomodProgressBar', (100/11)*4), this.scrollTop(), window.location.hash = "comodidades"
      }
    },
    nextBtn4 () {
      if (1<2) {
        this.$store.commit('m_cadastroAcomod4', false), this.$store.commit('m_cadastroAcomod5', true), this.$store.commit('m_acomodProgressBar', (100/11)*5), this.scrollTop(), window.location.hash = "local"
      }
    },
    nextBtn5 () {
      if (this.$store.state.acomodPlace !== null) {
        this.$store.commit('m_cadastroAcomod5', false), this.$store.commit('m_cadastroAcomod6', true), this.$store.commit('m_acomodProgressBar', (100/11)*6), this.scrollTop(), window.location.hash = "imagens"
      } else {
        this.$modal.show('dialog', {
          text: 'Adicione um endereço.',
          buttons: [{ title: 'Ok' }]
        })
      }
    },
    nextBtn6 () {
      if (this.imageURL1 !== null) {
        this.$store.commit('m_cadastroAcomod6', false), this.$store.commit('m_cadastroAcomod7', true), this.$store.commit('m_acomodProgressBar', (100/11)*7), this.scrollTop(), window.location.hash = "valor"
      } else {
        this.$modal.show('dialog', {
          text: 'Adicione pelo menos uma imagem.',
          buttons: [{ title: 'Ok' }]
        })
      }
    },
    nextBtn7 () {
      if (1<2) {
        this.$store.commit('m_cadastroAcomod7', false), this.$store.commit('m_cadastroAcomod8', true), this.$store.commit('m_acomodProgressBar', (100/11)*8), this.scrollTop(), window.location.hash = "titulo"
      }
    },
    nextBtn8 () {
      if (this.$store.state.acomodData.title !== '') {
        this.$store.commit('m_cadastroAcomod8', false), this.$store.commit('m_cadastroAcomod9', true), this.$store.commit('m_acomodProgressBar', (100/11)*9), this.scrollTop(), window.location.hash = "subtitulo"
      } else {
        this.$modal.show('dialog', {
          text: 'Adicione um título.',
          buttons: [{ title: 'Ok' }]
        })
      }
    },
    nextBtn9 () {
      if (this.$store.state.acomodData.subtitle !== '') {
        this.$store.commit('m_cadastroAcomod9', false), this.$store.commit('m_cadastroAcomod10', true), this.$store.commit('m_acomodProgressBar', (100/11)*10), this.scrollTop(), window.location.hash = "identificacao"
      } else {
        this.$modal.show('dialog', {
          text: 'Adicione um subtítulo.',
          buttons: [{ title: 'Ok' }]
        })
      }
    },
    nextBtn10 () {
      if (this.$store.state.user.email === null) {
        this.$modal.show('dialog', {
          text: 'Conecte-se com uma de suas contas ou crie uma conta com seu e-mail.',
          buttons: [{ title: 'Ok' }]
        })
      }
      if (this.$store.state.acomodData.celular.length === 15) {
        this.$store.commit('m_cadastroAcomod10', false), this.$store.commit('m_cadastroAcomod11', true), this.$store.commit('m_acomodProgressBar', (100/11)*11), this.scrollTop(), window.location.hash = "dados"
      } else {
        this.$modal.show('dialog', {
          text: 'Adicione pelo menos um número de celular.',
          buttons: [{ title: 'Ok' }]
        })
      }
    },
    concluir () {
      const bankCode = this.$store.state.bankAccount.bankCode
      const type = this.$store.state.bankAccount.type
      const agencia = this.$store.state.bankAccount.agencia
      const agenciaDV = this.$store.state.bankAccount.agenciaDV
      const conta = this.$store.state.bankAccount.conta
      const contaDV = this.$store.state.bankAccount.contaDV
      const legalName = this.$store.state.bankAccount.legalName
      const docNumber = this.$store.state.bankAccount.docNumber

      if (bankCode !== '' && agencia !== '' && agenciaDV !== '' && conta !== '' && contaDV !== '' && legalName !== '' && docNumber.length === 14) {
        this.$store.commit('m_loader', true)
        const acomodID = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000).toString()
        this.$store.commit('m_acomodID', acomodID)
        const storageRef = firebase.storage().ref('acomodacoes/' + acomodID + '/')
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
              bank_code: bankCode.substring(0, 3),
              type: type,
              agencia: agencia,
              agencia_dv: agenciaDV,
              conta: conta,
              conta_dv: contaDV,
              legal_name: legalName,
              document_number: docNumber.replace(/\./g, '').replace(/\-/g, '')
            }
          })
        )
        .then(recipient => {
          console.log(recipient)
          this.$store.state.acomodData.recipientID = recipient.id.toString()
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
          /* 
          UPLOAD IMAGE 3 
          */
          if (this.$store.state.blobAcH3J !== null) {
            /* imageAcL3 */
            storageRef.child('imageL3.jpeg').put(this.$store.state.blobAcL3).then(snapshot => {
              console.log(acomodID + 'L3' + '.jpeg')
              storageRef.child('imageL3.jpeg').getDownloadURL().then(url => {
                this.$store.commit('m_imageAcL3', url)
                this.ifUpload3()
              })
            })
            /* imageAcH3J */
            storageRef.child('imageH3J.jpeg').put(this.$store.state.blobAcH3J).then(snapshot => {
              console.log(acomodID + 'H3J' + '.jpeg')
              storageRef.child('imageH3J.jpeg').getDownloadURL().then(url => {
                this.$store.commit('m_imageAcH3J', url)
                this.ifUpload3()
              })
            })
            /* imageAcH3W */
            storageRef.child('imageH3W.webp').put(this.$store.state.blobAcH3W).then(snapshot => {
              console.log(acomodID + 'H3W' + '.webp')
              storageRef.child('imageH3W.webp').getDownloadURL().then(url => {
                this.$store.commit('m_imageAcH3W', url)
                this.ifUpload3()
              })
            })
          }
          this.$store.commit('m_acomodCreated', true)
          /* Resetar dados */
          this.imageURL1 = null,
          this.imageURL2 = null,
          this.imageURL3 = null
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
        bankCode === '' ? this.bankCodeError = true : this.bankCodeError = false
        agencia === '' ? this.agenciaError = true : this.agenciaError = false
        agenciaDV === '' ?  this.agenciaDVError = true :  this.agenciaDVError = false
        conta === '' ? this.contaError = true : this.contaError = false
        contaDV === '' ? this.contaDVError = true : this.contaDVError = false
        legalName === '' ? this.legalNameError = true : this.legalNameError = false
        docNumber.length !== 14 ? this.docNumberError = true : this.docNumberError = false
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
    },
    ifUpload3 () {
      if (this.$store.state.acomodData.imageL1 !== null && this.$store.state.acomodData.imageH1J !== null && this.$store.state.acomodData.imageH1W !== null && this.$store.state.acomodData.imageL2 !== null && this.$store.state.acomodData.imageH2J !== null && this.$store.state.acomodData.imageH2W !== null && this.$store.state.acomodData.imageL3 !== null && this.$store.state.acomodData.imageH3J !== null && this.$store.state.acomodData.imageH3W !== null) {
        this.$store.dispatch('a_uploadAcomod')
        this.$router.push('/acomodacoes/' + this.$store.state.acomodData.acomodID)
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
    titleLength () {
      return 50 - this.$store.state.acomodData.title.length
    },
    subtitleLength () {
      return 500 - this.$store.state.acomodData.subtitle.length
    },
    firstName () {
      let fullName = this.$store.state.acomodData.proprietario.split(' ')
      let firstName = fullName[0]
      return firstName
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
      return this.$store.state.acomodPlace !== null ? 'background:#FFA04F' : ''
    },
    form6ok () {
      return this.imageURL1 !== null ? 'background:#FFA04F' : ''
    },
    form7ok () {
      return 1<2 ? 'background:#FFA04F' : ''
    },
    form8ok () {
      return this.$store.state.acomodData.title !== '' ? 'background:#FFA04F' : ''
    },
    form9ok () {
      return this.$store.state.acomodData.subtitle !== '' ? 'background:#FFA04F' : ''
    },
    form10ok () {
      return this.$store.state.acomodData.celular.length === 15 ? 'background:#FFA04F' : ''
    },
    form11ok () {
      const bankCode = this.$store.state.bankAccount.bankCode
      const agencia = this.$store.state.bankAccount.agencia
      const agenciaDV = this.$store.state.bankAccount.agenciaDV
      const conta = this.$store.state.bankAccount.conta
      const contaDV = this.$store.state.bankAccount.contaDV
      const legalName = this.$store.state.bankAccount.legalName
      const docNumber = this.$store.state.bankAccount.docNumber
      return bankCode !== null && agencia !== '' && agenciaDV !== '' && conta !== '' && contaDV !== '' && legalName !== '' && docNumber.length === 14 ? 'background:#FFA04F' : ''
    },
    acomodCreated () {
      return this.$store.state.acomodCreated
    }
  },
  watch: {
    acomodCreated (value) {
      if (value === true) {
        this.$router.push('/')
      }
    },
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
        this.$store.commit('m_cadastroAcomod8', true)
        this.$store.commit('m_cadastroAcomod9', false)
        this.$store.commit('m_cadastroAcomod10', false)
        this.$store.commit('m_cadastroAcomod11', false)
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
        this.$store.commit('m_cadastroAcomod9', true)
        this.$store.commit('m_cadastroAcomod10', false)
        this.$store.commit('m_cadastroAcomod11', false)
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
        this.$store.commit('m_cadastroAcomod10', true)
        this.$store.commit('m_cadastroAcomod11', false)
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
        this.$store.commit('m_cadastroAcomod11', true)
      } 
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
@import url('../../../assets/css/main.css');
@import url('../../../assets/css/switcher.css');
@import url('../../../assets/css/vue-simple-suggest.css');

.anunciar-acomodacao {
  margin-top: 3.2rem;
  background: var(--colorAcomod);
  color: white;
  transition: var(--main-transition);
  & .progress-bar {
    position: fixed;
    top: 3.2rem;
    height: 3px;
    z-index: 8888;
    background: var(--colorAcomod);
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
      padding: 3rem 7% 1.5rem 7%;
      line-height: 35px;
      font-size: 28px;
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
      color: rgb(102, 102, 102);
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
        position: relative;
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
    }
    & .comodidades-box {
      padding: 0 7%;
      & .item-form-switches {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgb(222,222,222);
        padding: 1.2rem 0;
        & h3 {
          user-select: none;
          font-size: var(--fontSizeAnuncioText);
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
      transform: translateY(-1.7rem);
      color: #006561;
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
          cursor: pointer;
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
    & .plano-acomodacao {
    & .__img-header {
    }
    & .__title {
    }
    & .__subtitle {
    }
    & .__item {
    }
    & .__subitem {
    }
    & .__price {
    }
    & .__anunciar-btn {
    }
  }
  & .cadastro-acomodacao {
    padding: 0 0 7rem 0;
    & .__form-title {
      padding: 3rem 23% 1.1rem;
      font-size: 32px;
      text-align: center;
    }
    & .__form-subtitle {
      padding: 1.4rem 23% 0;
      font-size: 17px;
    }
    & textarea {
      padding: 0 23%;
      margin: 1.4rem 0 .6rem 0;
    }
    & .__lenght-calc {
      padding: 0 23%;
    }
    & .item-form {
      padding: 0 23%;
      margin: 2.3rem 0;
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
    & .comodidades-box {
      padding: .6rem 23% 0;
      & .item-form-switches {
        padding: 1.4rem 0;
        & h3 {
        }
      }
    }
    & .without-address {
      margin: 0 23%;
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
      padding: 0 calc(23% - .3rem);
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
      position: fixed;
      z-index: 3;
      bottom: 2rem;
      left: 0;
      right: 0;
      margin: auto;
      height: 2.85rem;
      width: 25%;
      background: white;
      box-shadow: 3px 3px 20px 1px rgba(0,0,0,0.18);
      border-radius: 2rem;
      & .back-next-body {
        display: flex;
        align-items: center;
        & button {
          width: 50%;
          height: 2.85rem;
        }
        & .__back {
          font-size: 17px;
          font-weight: 500;
          border-radius: 2rem 0 0 2rem;
          cursor: pointer;
          background: white;
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
