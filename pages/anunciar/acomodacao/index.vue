<template>
  <div class="anunciar-acomodacao">



    <!-- FIRST PAGE -->
    <div class="first-page" v-if="$store.state.cadastroAcomod0">
      
      <img class="img" src="../../../assets/img/anuncio-acomod.svg">

      <div class="copy">

        <h1 class="__title">Aumente suas reservas anunciando na Escarpas Trip</h1>


        <div class="benefits">

          <div class="benefit">
            <img class="__img" src="../../../assets/img/visibility.svg">
            <p class="__text">Ganhe maior visibilidade na internet</p>
          </div>

          <div class="benefit">
            <img class="__img" src="../../../assets/img/investment.svg">
            <p class="__text">Aumente seus ganhos reservando sem intermediários</p>
          </div>

        </div>
        

        <button class="__anunciar-btn" @click="$store.commit('m_cadastroAcomod1', true), $store.commit('m_cadastroAcomod0', false), $store.commit('m_acomodProgressBar', (100/12)), hashAcomod()">Anunciar</button>
        
      </div>

    </div><!-- FIRST PAGE -->




    <div class="progress-bar" v-if="!$store.state.cadastroAcomod0" :style="progressBarStyle"></div>




    <!-- CADASTRO ACOMODAÇÃO -->




    <!-- ________________________________________ 1 - TIPO DE ACOMODAÇÃO ________________________________________ -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod1">

      <h1 class="__form-title">Que tipo de propriedade deseja anunciar?</h1>

      <div class="item-form">
        <label>Tipo</label>
        <select v-model="$store.state.acomodData.tipoAcomod">
          <option>Casa</option>
          <option>Apartamento</option>
          <option>Rancho</option>
          <option>Chácara</option>
          <option>Sítio</option>
          <option>Fazenda</option>
          <option>Suítes</option>
          <option>Camping</option>
          <option>Hostel</option>
        </select>
      </div>

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn1">Voltar</button>
          <button type="button" class="__next" :style="form1ok" @click="nextBtn1">Próximo</button>
        </div>
      </div>
    
    </form><!-- ________________________________________ 1 - TIPO DE ACOMODAÇÃO ________________________________________ -->






    <!-- ________________________________________ 2 - CARACTERÍSTICAS ________________________________________ -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod2">

      <h1 class="__form-title">Quais são as instalações?</h1>

      <div class="item-form" v-if="$store.state.acomodData.tipoAcomod !== 'Suítes' && !$store.getters.tipoAcomodCampingHostel">
        <label>Nº de Quartos</label>
        <select v-model="$store.state.acomodData.totalQuartos">
          <option v-for="n in 10" :key="n">{{ n }}</option>
        </select>
      </div>

      <div class="item-form" v-if="!$store.getters.tipoAcomodCampingHostel">
        <label>{{ $store.state.acomodData.tipoAcomod === 'Suítes' ? 'Nº de' : 'Quantos são' }} Suítes</label>
        <select v-model="$store.state.acomodData.totalSuites">
          <option v-for="n in 10" :key="n">{{ n }}</option>
        </select>
      </div>

      <div class="item-form" v-if="!$store.getters.tipoAcomodSuites">
        <label>Nº de Banheiros</label>
        <select v-model="$store.state.acomodData.totalBanheiros">
          <option v-for="n in 10" :key="n">{{ n }}</option>
        </select>
      </div>

      <div class="item-form">
        <label>Vagas na Garagem</label>
        <select v-model="$store.state.acomodData.totalGaragem">
          <option :key="0">0</option>
          <option v-for="n in 10" :key="n">{{ n }}</option>
        </select>
      </div>


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn2">Voltar</button>
          <button type="button" class="__next" :style="form2ok" @click="nextBtn2">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 2 - CARACTERÍSTICAS ________________________________________ -->






    <!-- ________________________________________ 3 - QUARTOS ________________________________________ -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod3">

      <h1 class="__form-title">Configuração {{ $store.state.acomodData.tipoAcomod === 'Suítes' ? 'das Suítes' : 'dos quartos' }}</h1>

      <h3 class="__form-text" v-if="$store.getters.tipoAcomodSuites">Recomendamos que dê um nome para cada suíte, a fim de diferenciá-las. Ex: Suíte Dupla Standard, Suíte Tripla, Suíte Deluxe etc.</h3>


      <div class="quartos">


          <div class="quarto" v-for="(quarto, index) in $store.state.acomodData.quartos" :key="index" @click="$store.commit('m_indexQuarto', index)">
            <div class="quarto-body">


              <h1 class="__name" style="cursor:default" v-if="$store.getters.tipoAcomodInteira">{{ quarto.name }}</h1>
              <input class="__name" type="text" v-model="quarto.name" v-else>


              <div class="questions">

                <div class="question">
                  <label>Acomoda até:</label>
                  <select v-model="quarto.acomoda">
                    <option v-for="n in 12" :key="n" :value="n">{{ n }} {{ n === 1 ? 'hóspede' : 'hóspedes' }}</option>
                  </select>
                </div>

              </div>

              
              <transition-group name="mobilias-animation" tag="div" class="mobilias">
                <div class="mobilia" v-for="(mobilia, index) in quarto.mobilias" :key="index+1" @click="$store.commit('m_removeMobilia', index)">
                  <img class="remove-mobilia" src="../../../assets/img/close-mobile.svg">
                  <img :src="mobiliaImage(mobilia)" style="width: 1.7rem; height: auto">
                  <p style="user-select: none">{{ mobiliaText(mobilia) }}</p>
                </div>

                <div class="add-mobilia" @click="$modal.show('add-mobilia-modal')" key="add">
                  <img src="../../../assets/img/add.svg" style="width: 1.5rem; height: auto">
                  <p style="user-select: none">Adicionar mobília</p>
                </div>
              </transition-group>

              <add-mobilia></add-mobilia>


            </div>
          </div>

      </div>


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn3">Voltar</button>
          <button type="button" class="__next" :style="form3ok" @click="nextBtn3">Próximo</button>
        </div>
      </div>

    </form><!-- ________________________________________ 3 - QUARTOS ________________________________________ -->








    <!-- ________________________________________ 4 - COMODIDADES ________________________________________ -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod4">

      <h1 class="__form-title">Quais comodidades são oferecidas?</h1>


      <div class="comodidades-box">

        <div class="item-form-switches" v-for="(comodidade, index) in $store.state.acomodData.comodidades" :key="comodidade.name" @click="comodidade.condition = !comodidade.condition">
          <div class="desc">
            <img class="__img" :src="comodidadeImgSrc(comodidade)">
            <h3 class="__name">{{ comodidade.name }}</h3>
          </div>
          
          <div class="switch" :class="[ comodidade.condition === true ? 'switch-on' : '' ]">
            <div class="slider"></div>
          </div>
        </div>
        
      </div>
      

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn4">Voltar</button>
          <button type="button" class="__next" :style="form4ok" @click="nextBtn4">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 4 - COMODIDADES ________________________________________ -->





    <!-- ________________________________________ 5 - LOCAL ________________________________________ -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod5">

      <h1 class="__form-title">Qual é a localização?</h1>

      <div class="item-form">
        <label>Local</label>
        <gmap-autocomplete
          onKeyPress="if (event.which == 13) return false" 
          placeholder="Digite o endereço completo aqui"
          @place_changed="setPlace">
        </gmap-autocomplete>
      </div>

      <h3 class="without-address" @click="$modal.show('local-map-modal'), $store.state.fromWithoutAddress=true">
        {{ $store.state.acomodData.tipoAcomod === 'Suítes' ? 'Não' : `${tipoAcomodSd.charAt(0).toUpperCase() + tipoAcomodSd.slice(1)} não ` }} possui endereço?
      </h3>

      <localMap/>


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn5">Voltar</button>
          <button type="button" class="__next" :style="form5ok" @click="nextBtn5">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 5 - LOCAL ________________________________________ -->





    <!-- ________________________________________ 6 - IMAGENS ________________________________________ -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod6">

      <h1 class="__form-title">Adicione imagens {{ $store.state.acomodData.tipoAcomod === 'Suítes' ? '' : tipoAcomodDd }}</h1>


      <div class="modal-croppa" v-show="showCroppaModal" @click="showCroppaModal=false">
        <div class="modal-croppa-body" @click.stop>
          <h1>Ajustar imagem</h1>
          <croppa
            ref="myCroppa"
            @file-choose="showCroppaModal = true"
            @new-image-drawn="newImageDrawn = true"
            :width="$store.state.isMobile ? 720/2.2 : 720/1.2"
            :height="$store.state.isMobile ? 480/2.2 : 480/1.2"
            :quality="$store.state.isMobile ? 2.2 : 1.2"
            :placeholder="'Carregando...'"
            :placeholder-color="'white'"
            :accept="'.jpg, .jpeg, .png, .webp'"
            :zoom-speed="$store.state.isMobile ? 2 : 4"
            :prevent-white-space="true"
            :show-remove-button="false">
          </croppa>
          <button class="__croppa-btn" type="button" @click="showCroppaModal=false, imageConfirm()" v-if="newImageDrawn">Confirmar</button>
        </div>
      </div>


      <!-- Preview images -->
      <div class="after-choose-image" :class="[ $store.state.acomodData.images.length == 0 ? 'center-first-image' : '' ]">

        <div class="image-box" v-for="(image, index) in $store.state.acomodData.images" :key="index">
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
              stroke="#343434"
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
          <button type="button" class="__back" @click="backBtn6">Voltar</button>
          <button type="button" class="__next" :style="form6ok" @click="nextBtn6">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 6 - IMAGENS ________________________________________ -->





    <!-- ________________________________________ 7 - VALORES DA ESTADIA ________________________________________ -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod7">

      <h1 class="__form-title">Quais são os valores da estadia?</h1>


      <h3 class="__form-text">Será possível ajustar os valores após a publicação do anúncio.</h3>


      <!-- Suítes -->
      <div v-if="$store.getters.tipoAcomodSuites">

        <div v-for="(quarto, index) in $store.state.acomodData.quartos" :key="index">

          <h3 class="__form-subtitle">{{ quarto.name }}</h3>

          <div class="item-form">
            <label>Valor por noite (Domingo a Quinta)</label>
            <money v-model="quarto.valorNoiteWeekdays"></money>
          </div>

          <div class="item-form">
            <label>Valor por noite (Sexta e Sábado)</label>
            <money v-model="quarto.valorNoiteWeekend"></money>
          </div> 

          <div class="item-form">
            <label>Valor por noite (Feriados)</label>
            <money v-model="quarto.valorNoiteFeriados"></money>
          </div>

        </div>

      </div><!-- Suítes -->


      <!-- Outros tipos -->
      <div v-else>

        <div class="item-form">
          <label>Valor por noite (Domingo a Quinta)</label>
          <money v-model="$store.state.acomodData.valorNoiteWeekdays"></money>
        </div>

        <div class="item-form">
          <label>Valor por noite (Sexta e Sábado)</label>
          <money v-model="$store.state.acomodData.valorNoiteWeekend"></money>
        </div> 

        <div class="item-form">
          <label>Valor por noite (Feriados)</label>
          <money v-model="$store.state.acomodData.valorNoiteFeriados"></money>
        </div>

      </div><!-- Outros tipos -->
      

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn7">Voltar</button>
          <button type="button" class="__next" :style="form7ok" @click="nextBtn7">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 7 - VALORES DA ESTADIA ________________________________________ -->





    <!-- ________________________________________ 8 - REGRAS ________________________________________ -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod8">

      <h1 class="__form-title">Regulamentos {{ $store.state.acomodData.tipoAcomod === 'Suítes' ? '' : tipoAcomodDd }}</h1>

      <div class="regras-box">

        
        <h3 class="__form-subtitle" style="margin:1.3rem 0; padding:0">Horários de check-in e check-out</h3>


        <!-- Horário Check-in -->
        <div style="display:flex">
          <div class="item-form" style="padding:0;margin:1rem .5rem 1.5rem 0;flex:50%">
            <label>Check-in após:</label>
            <select v-model="$store.state.acomodData.checkInApos">
              <option v-for="horario in horarios" :key="horario">{{ horario }}</option>
            </select>
          </div> 
          <div class="item-form" style="padding:0;margin:1rem 0 1.5rem .5rem;flex:50%">
            <label>Check-in até:</label>
            <select v-model="$store.state.acomodData.checkInAte">
              <option v-for="horario in horarios" :key="horario">{{ horario }}</option>
            </select>
          </div> 
        </div>
        <!-- Horário Check-in -->

        <!-- Horário Check-out -->
        <div style="display:flex">
          <div class="item-form" style="padding:0;margin:1rem .5rem 1.5rem 0;flex:50%">
            <label>Check-out após:</label>
            <select v-model="$store.state.acomodData.checkOutApos">
              <option v-for="horario in horarios" :key="horario">{{ horario }}</option>
            </select>
          </div> 
          <div class="item-form" style="padding:0;margin:1rem 0 1.5rem .5rem;flex:50%">
            <label>Check-out até:</label>
            <select v-model="$store.state.acomodData.checkOutAte">
              <option v-for="horario in horarios" :key="horario">{{ horario }}</option>
            </select>
          </div> 
        </div>
        <!-- Horário Check-out -->


        <!-- Regras -->
        <h3 class="__form-subtitle" style="margin-top:1.3rem; padding:0">Regras</h3>

        <div class="item-form-switches" v-for="(regra, index) in $store.state.acomodData.regras" :key="index" @click="regra.condition = !regra.condition">
          <h3>{{ regra.name }}</h3>
          <div class="switch" :class="[ regra.condition === true ? 'switch-on' : '' ]">
            <div class="slider"></div>
          </div>
        </div><!-- Regras -->


        <!-- Regras adicionais -->
        <h3 class="__form-subtitle" style="margin-top:2.6rem; padding:0">Regras adicionais</h3>

        <div class="new-regras" v-for="(regra, index) in $store.state.acomodData.regrasAdicionais" :key="index">
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
    
    </form><!-- ________________________________________ 8 - REGRAS ________________________________________ -->





    <!-- ________________________________________ 9 - TÍTULO ________________________________________ -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod9">

      <h1 class="__form-title">Dê um título para seu anúncio</h1>


      <textarea 
        v-model="$store.state.acomodData.title"
        v-autosize="title"
        maxlength="60"
        rows="1"
        :placeholder="'ex: ' + tipoAcomodUpperLinda + ' em Capitólio'"
        required>
        {{title}}
      </textarea>

      <span class="__lenght-calc">{{ 60 - $store.state.acomodData.title.length }}</span>


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn9">Voltar</button>
          <button type="button" class="__next" :style="form9ok" @click="nextBtn9">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 9 - TÍTULO ________________________________________ -->





    <!-- ________________________________________ 10 - DESCRIÇÃO ________________________________________ -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod10">

      <h1 class="__form-title">Descreva melhor {{ tipoAcomodSd }}</h1>   


      <textarea 
      v-model="$store.state.acomodData.subtitle"
      v-autosize="subtitle"
      maxlength="1000"
      rows="1"
      placeholder="Dica: Escreva detalhes importantes aqui, que não foram perguntados antes."
      required>
      {{subtitle}}</textarea>

      <span class="__lenght-calc">{{ 1000 - $store.state.acomodData.subtitle.length }}</span> 


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn10">Voltar</button>
          <button type="button" class="__next" :style="form10ok" @click="nextBtn10">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 10 - DESCRIÇÃO ________________________________________ -->






    <!-- ________________________________________ 11 - IDENTIFICAÇÃO ________________________________________ -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod11">

      <h1 class="__form-title">Identificação</h1> 


      <div class="signin-btns" v-if="!$store.state.isEmailSignin">
        <button type="button" class="facebook-btn" @click="$store.dispatch('a_facebookSignIn')">Continuar com Facebook</button>
        <button type="button" class="google-btn" @click="$store.dispatch('a_googleSignIn')">Continuar com Google</button>
        <button type="button" class="email-btn" @click="$store.state.isEmailSignin = true">Continuar com E-mail</button>
      </div>


      <div class="signin-email" v-else>

        <!-- NOME -->
        <div class="item-form">
          <label :class="[ nameError ? 'has-error-label' : '' ]">Seu nome</label>
          <input
            :class="[ nameError ? 'has-error' : '' ]"
            type="text" pattern="[A-Za-z]"
            v-model="$store.state.user.fullName">
        </div><!-- NOME -->

        <!-- E-MAIL -->
        <div class="item-form">
          <label :class="[ emailError ? 'has-error-label' : '' ]">E-mail</label>
          <input
            ref="email"
            :class="[ emailError ? 'has-error' : '' ]"
            @blur="validateEmail"
            type="email"
            v-model="$store.state.user.email">
        </div><!-- E-MAIL -->

        <!-- SENHA -->
        <div class="item-form">
          <label :class="[ passwordError ? 'has-error-label' : '' ]">Senha</label>
          <input
            ref="password"
            :class="[ passwordError ? 'has-error' : '' ]"
            type="password"
            v-model="password">
        </div><!-- SENHA -->

      </div>


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn11">Voltar</button>
          <button type="button" class="__next" :style="form11ok" @click="nextBtn11">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 11 - IDENTIFICAÇÃO ________________________________________ -->





    <!-- ________________________________________ 12 - PAGAMENTO ________________________________________ -->
    <form class="cadastro-acomodacao" v-if="$store.state.cadastroAcomod12">

      <h1 class="__form-title">Dados para pagamento e confirmação</h1>   

      <h3 class="__form-text">Ótimo {{ user.firstName }}! Será feita uma cobrança mensal em seu cartão de crédito no valor de <span style="font-weight:500">R$29,90</span>, sendo os primeiros 30 dias gratuitos para sua avaliação. Se não gostar do serviço, cancelaremos na hora pra você.</h3>


      <div class="payment-box">


        <h2 class="__form-subtitle">Informações de contato</h2>

        <!-- CELULAR -->
        <div class="item-form">
          <label :class="[ celularError ? 'has-error-label' : '' ]">Celular / WhatsApp</label>
          <masked-input
            ref="celular"
            type="tel"
            :class="[ celularError ? 'has-error' : '' ]"
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

      
        
        <h2 class="__form-subtitle" style="margin-top: 1.6rem">Dados do cartão de crédito</h2>

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

        <p class="__termos">Ao anunciar, você concorda com os nossos <a href="/termos" target="_blank">Termos de Serviço</a> e <a href="/termos#politica_privacidade" target="_blank">Política de Privacidade</a>.</p>

      </div>

      
      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn12">Voltar</button>
          <button type="button" class="__next" :style="form12ok" @click="concluir" v-shortkey="['ctrl', 'alt', 't']" @shortkey="test()">Anunciar</button>
        </div>
      </div> 
    
    </form><!-- ________________________________________ 12 - PAGAMENTO ________________________________________ -->




    <!-- CADASTRO ACOMODAÇÃO -->


  </div>
</template>

<script>
import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import MaskedInput from 'vue-text-mask'
import * as Email from 'email-validator'
import { tipoAcomod } from '@/mixins/tipoAcomod'
import localMap from '~/components/localMap.vue'
import AddMobilia from '~/components/AddMobilia.vue'
import valid from 'card-validator'
import CPF from 'gerador-validador-cpf'
import scrollIntoView from 'scroll-into-view'

export default {
  components: { MaskedInput, localMap, AddMobilia },
  mixins: [ tipoAcomod ],
  head () {
    return {
      title: 'Anunciar Acomodação em Capitólio ‒ Escarpas Trip',
      meta: [
        { hid: 'anuncioAcomod', name: 'description', content: 'Anuncie sua acomodação na Escarpas Trip' }
      ]
    }
  },
  middleware: 'newAcomodConcludedCheck',
  transition: 'opacity',
  data () {
    return {
      title: '', /* Vue Autosize */
      subtitle: '', /* Vue Autosize */
      showCroppaModal: false,
      newImageDrawn: false,
      isUploading: false,
      uploadProgress: 0,
      newRegra: '',
      password: '',
      nameError: false,
      emailError: false,
      cardNumberError: false,
      cardHolderNameError: false,
      cardExpirationDateError: false,
      cardCvvError: false,
      celularError: false,
      cpfError: false,
      zipcodeError: false,
      neighborhoodError: false,
      streetError: false,
      streetNumberError: false,
      cityError: false,
      stateError: false,
      horarios: [ 'A qualquer hora', '07h', '08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h' ]
    }
  },
  methods: {
    test (event) {
      this.$store.state.acomodData.isTest = !this.$store.state.acomodData.isTest
    },
    validateEmail () {
      !Email.validate(this.$store.state.user.email) ? this.emailError = true : this.emailError = false
    },
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
    /* ******************** QUARTOS ******************** */
    mobiliaImage (mobilia) {
      return mobilia === 'cama_solteiro' ? require('@/assets/img/cama_solteiro.svg')
           : mobilia === 'cama_casal' ? require('@/assets/img/cama_casal.svg')
           : mobilia === 'cama_queen' ? require('@/assets/img/cama_casal.svg')
           : mobilia === 'cama_king' ? require('@/assets/img/cama_casal.svg')
           : mobilia === 'bicama' ? require('@/assets/img/bicama.svg')
           : mobilia === 'sofa' ? require('@/assets/img/sofa.svg')
           : ''
    },
    mobiliaText (mobilia) {
      return mobilia === 'cama_solteiro' ? 'Cama solteiro'
           : mobilia === 'cama_casal' ? 'Cama casal'
           : mobilia === 'cama_queen' ? 'Cama queen'
           : mobilia === 'cama_king' ? 'Cama king'
           : mobilia === 'bicama' ? 'Bicama'
           : mobilia === 'sofa' ? 'Sofá'
           : ''
    },
    /* ******************** COMODIDADES ******************** */
    comodidadeImgSrc (comodidade) {
      return require(`@/assets/img/${comodidade.id}.svg`)
    },
    /* ******************** GOOGLE MAPS ******************** */
    setPlace (place) {
      this.$store.commit('m_acomodPlace', place)
      this.$store.state.acomodData.positionLAT = this.$store.state.acomodPlace.geometry.location.lat()
      this.$store.state.acomodData.positionLNG = this.$store.state.acomodPlace.geometry.location.lng()
      this.$store.state.acomodData.address = this.$store.state.acomodPlace.formatted_address
      this.$modal.show('local-map-modal')
    },
    /* ******************** IMAGE INPUT ******************** */
    async imageConfirm () {
      try {
        this.isUploading = true

        /* Storage path */
        const storageRef = firebase.storage().ref('acomods/' + this.$store.state.acomodData.acomodID + '/')

        let blobL = await this.$refs.myCroppa.promisedBlob('image/jpeg', 0.01)
        let blobHJ = await this.$refs.myCroppa.promisedBlob('image/jpeg')
        let blobHW = await this.$refs.myCroppa.promisedBlob('image/webp')
        
        this.uploadProgress = 96

        let n = this.$store.state.imageCountAc
        let key = this.$store.state.acomodData.images.length

        /* Criar objeto em branco para receber a imagem */
        this.$store.state.acomodData.images.push({ id: null, L: null, HJ: null, HW: null })

        /* Upload image L */
        await storageRef.child('L' + n + '.jpeg').put(blobL)
        this.$store.state.acomodData.images[key].L = await storageRef.child('L' + n + '.jpeg').getDownloadURL()
        this.uploadProgress = 98
        
        /* Upload image HJ */
        await storageRef.child('H' + n + 'J.jpeg').put(blobHJ)
        this.$store.state.acomodData.images[key].HJ = await storageRef.child('H' + n + 'J.jpeg').getDownloadURL()
        this.uploadProgress = 99

        /* Upload image HW */
        await storageRef.child('H' + n + 'W.webp').put(blobHW)
        this.$store.state.acomodData.images[key].HW = await storageRef.child('H' + n + 'W.webp').getDownloadURL()
        this.uploadProgress = 100


        /* Definir id da imagem */
        this.$store.state.acomodData.images[key].id = n

        /* Remover imagem do croppa */
        this.$refs.myCroppa.remove()
        
        /* Incrementar n */
        this.$store.commit('m_imageCountAc')

        this.newImageDrawn = false
        this.isUploading = false
        this.uploadProgress = 0
      } catch (err) {
        console.log(err)
        this.isUploading = false
        this.uploadProgress = 0
      }
    },
    deleteImage (image, index) {
      const storageRef = firebase.storage().ref('acomods/' + this.$store.state.acomodData.acomodID + '/')
      storageRef.child('L' + image.id + '.jpeg').delete()
      storageRef.child('H' + image.id + 'J.jpeg').delete()
      storageRef.child('H' + image.id + 'W.webp').delete()
      this.$store.state.acomodData.images.splice(index, 1)
      this.$refs.myCroppa.remove()
    },
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
      this.$store.commit('m_cadastroAcomod4', false)
      if (this.$store.getters.tipoAcomodCampingHostel) {
        this.$store.commit('m_cadastroAcomod2', true)
        window.history.back(2)
      } else {
        this.$store.commit('m_cadastroAcomod3', true)
        window.history.back(1)
      }
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
      this.$store.commit('m_cadastroAcomod12', false), this.$store.commit('m_cadastroAcomod10', true), window.history.back(2)
    },
    /* ******************** NEXT BUTTONS ******************** */
    hashAcomod () {
      this.$store.dispatch('a_generateRandomHashs')
      window.location.hash = this.randomHashs[1]
    },
    nextBtn1 () {
      if (this.$store.state.acomodData.tipoAcomod !== '') {
        this.$store.commit('m_cadastroAcomod1', false), this.$store.commit('m_cadastroAcomod2', true), this.$store.commit('m_acomodProgressBar', (100/12)*2), this.scrollTop(), window.location.hash = `${this.randomHashs[2]}`
      }
    },
    nextBtn2 () {
      if (1<2) {
        this.$store.commit('m_cadastroAcomod2', false)
        if (this.$store.getters.tipoAcomodCampingHostel) {
          this.$store.commit('m_cadastroAcomod4', true)
          window.location.hash = `${this.randomHashs[4]}`
          this.$store.commit('m_acomodProgressBar', (100/12)*4)
        } else {
          this.$store.commit('m_cadastroAcomod3', true)
          window.location.hash = `${this.randomHashs[3]}`
          this.$store.commit('m_acomodProgressBar', (100/12)*3)
        }        
        this.scrollTop()
        this.$store.commit('m_addQuartos')
      }
    },
    nextBtn3 () {
      if (1<2) {
        this.$store.commit('m_cadastroAcomod3', false), this.$store.commit('m_cadastroAcomod4', true), this.$store.commit('m_acomodProgressBar', (100/12)*4), this.scrollTop(), window.location.hash = `${this.randomHashs[4]}`
      }
    },
    nextBtn4 () {
      if (1<2) {
        this.$store.commit('m_cadastroAcomod4', false), this.$store.commit('m_cadastroAcomod5', true), this.$store.commit('m_acomodProgressBar', (100/12)*5), this.scrollTop(), window.location.hash = `${this.randomHashs[5]}`
      }
    },
    nextBtn5 () {
      if (this.$store.state.acomodPlace !== null || this.$store.state.acomodData.positionLAT !== -20.6141320) {
        this.$store.commit('m_cadastroAcomod5', false), this.$store.commit('m_cadastroAcomod6', true), this.$store.commit('m_acomodProgressBar', (100/12)*6), this.scrollTop(), window.location.hash = `${this.randomHashs[6]}`
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione um endereço.'
        })
      }
    },
    nextBtn6 () {
      if (this.$store.state.acomodData.images.length >= 1) {
        this.$store.commit('m_cadastroAcomod6', false), this.$store.commit('m_cadastroAcomod7', true), window.location.hash = `${this.randomHashs[7]}`, this.$store.commit('m_acomodProgressBar', (100/12)*7),this.scrollTop()
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione pelo menos 3 imagens.'
        })
      }
    },
    nextBtn7 () {
      if (this.$store.state.acomodData.valorNoite !== 0) {
        this.$store.commit('m_cadastroAcomod7', false), this.$store.commit('m_cadastroAcomod8', true), this.$store.commit('m_acomodProgressBar', (100/12)*8), this.scrollTop(), window.location.hash = `${this.randomHashs[8]}`
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'O valor por noite não pode ser zero.'
        })
      }
    },
    nextBtn8 () {
      if (1<2) {
        this.$store.commit('m_cadastroAcomod8', false), this.$store.commit('m_cadastroAcomod9', true), this.$store.commit('m_acomodProgressBar', (100/12)*9), this.scrollTop(), window.location.hash = `${this.randomHashs[9]}`
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'É preciso que defina as regras.'
        })
      }
    },
    nextBtn9 () {
      if (this.$store.state.acomodData.title !== '') {
        this.$store.commit('m_cadastroAcomod9', false), this.$store.commit('m_cadastroAcomod10', true), this.$store.commit('m_acomodProgressBar', (100/12)*10), this.scrollTop(), window.location.hash = `${this.randomHashs[10]}`
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione um título.'
        })
      }
    },
    nextBtn10 () {
      if (this.$store.state.acomodData.subtitle !== '') {
        this.$store.commit('m_cadastroAcomod10', false)
        if (this.authUser) {
          this.$store.commit('m_cadastroAcomod12', true), this.$store.commit('m_acomodProgressBar', (100/12)*12), this.scrollTop(), window.location.hash = `${this.randomHashs[12]}`
        } else {
          this.$store.commit('m_cadastroAcomod11', true), this.$store.commit('m_acomodProgressBar', (100/12)*11), this.scrollTop(), window.location.hash = `${this.randomHashs[11]}`
        }
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione uma descrição.'
        })
      }
    },
    async nextBtn11 () {
      if (this.$store.state.isEmailSignin) {
        try {
          this.$store.commit('m_loader', true)

          const user = await firebase.firestore().collection('users').where('email', '==', this.$store.state.user.email).get()

          if (user.empty) {
            console.log('User do not exists')
            await firebase.auth().createUserWithEmailAndPassword(this.$store.state.user.email, this.password)
            this.$store.dispatch('a_authStateObserver')
          } else {
            console.log('User exists')
            await firebase.auth().signInWithEmailAndPassword(this.$store.state.user.email, this.password)
            this.$store.dispatch('a_authStateObserver')
          }

        } catch (err) {
          this.$store.commit('m_loader', false)
          console.log(err)
          if (err.code === 'auth/weak-password') {
            this.$store.commit('show_alert', {
              type: 'warning',
              title: 'Ops',
              message: 'Senha fraca. Precisa ter pelo menos 6 dígitos.'
            })
          }
          if (err.code === 'auth/wrong-password') {
            this.$store.commit('show_alert', {
              type: 'warning',
              title: 'Ops',
              message: 'Senha incorreta.'
            })
          }
        }
        
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Conecte-se com uma de suas contas para continuar.'
        })
      }
    },
    nextTo12 () {
      this.$store.commit('m_cadastroAcomod11', false)
      this.$store.commit('m_cadastroAcomod12', true)
      this.$store.commit('m_acomodProgressBar', (100/12)*12)
      this.scrollTop()
      window.location.hash = `${this.randomHashs[12]}`,
      this.$store.state.creditCard.cardHolderName = this.user.fullName
      this.$store.state.customer.name = this.user.fullName
      this.$store.state.customer.email = this.user.email
    },
    async concluir () {
      const acomodData = this.$store.state.acomodData

      acomodData.createdAt = Date.now()

      acomodData.hostID = this.user.userID

      /* Se Suítes, valorNoiteWeekdays = valor do quarto mais barato && sort suítes */
      if (this.$store.getters.tipoAcomodSuites) {
        let valoresNoiteWeekdays = []
        let valoresNoiteWeekdend = []
        let valoresNoiteFeriados = []
        acomodData.quartos.forEach(quarto => { 
          valoresNoiteWeekdays.push(quarto.valorNoiteWeekdays)
          valoresNoiteWeekdend.push(quarto.valorNoiteWeekend)
          valoresNoiteFeriados.push(quarto.valorNoiteFeriados)
        })
        acomodData.valorNoiteWeekdays = Math.min(...valoresNoiteWeekdays)
        acomodData.valorNoiteWeekdend = Math.min(...valoresNoiteWeekdend)
        acomodData.valorNoiteFeriados = Math.min(...valoresNoiteFeriados)
        acomodData.quartos.sort((a,b) => (a.valorNoiteWeekdays > b.valorNoiteWeekdays) ? 1 : ((b.valorNoiteWeekdays > a.valorNoiteWeekdays) ? -1 : 0))
      }

      /* Se todas as informações preenchidas */
      if (this.formIsCompleted) {

        try {
          this.$store.commit('m_loader', true)

          /* Criar assinatura no Pagarme, criar acomod na Firestore e atualizar user */
          const subscription = await firebase.functions().httpsCallable('newAcomod')({
            acomodData: acomodData,
            creditCard: this.$store.state.creditCard,
            customer: this.$store.state.customer
          })

          /* Necessário para o correto funcionamento do backBtn _id (Ver middleware: newAcomodConcludedCheck.js) */
          this.$store.state.concludedNewAcomod = true
          
          /* Ir para página do acomod criado */
          this.$router.push('/acomodacoes/' + acomodData.acomodID)

          /* Resetar acomodData */
          this.$store.dispatch('a_resetAcomodData')

          this.$store.commit('m_loader', false)

        } catch (err) {
          this.$store.commit('m_loader', false)
          console.log(err.message)
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
        !valid.number(this.cardNumber).isValid ? this.cardNumberError = true : this.cardNumberError = false
        !valid.expirationDate(this.cardExpirationDate).isValid ?  this.cardExpirationDateError = true :  this.cardExpirationDateError = false
        !valid.cvv(this.cardCVV).isValid ? this.cardCvvError = true : this.cardCvvError = false
        this.celular.length < 17 ? this.celularError = true : this.celularError = false
        this.cpf.length < 14 || !CPF.validate(this.cpf) ? this.cpfError = true : this.cpfError = false
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
    celular () { return this.$store.state.customer.celular },
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
      return `width:${this.$store.state.acomodProgressBar}%; ${this.$store.state.cadastroAcomod0 || this.$store.state.cadastroAcomod1 ? '' : 'transition: all .3s ease;'}`
    },
    /* ******************** FORM STYLES ******************** */
    form1ok () {
      return this.$store.state.acomodData.tipoAcomod !== '' ? 'background:#FFA04F' : ''
    },
    form2ok () {
      return 1<2 ? 'background:#FFA04F' : ''
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
      return this.$store.state.acomodData.images.length >= 1 ? 'background:#FFA04F' : ''
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
      return this.$store.state.user.fullName !== '' && this.$store.state.user.email !== '' && this.password !== '' ? 'background: #FFA04F' : ''
    },
    form12ok () {
      if (this.formIsCompleted && this.$store.state.acomodData.isTest) {
        return 'background: #343434'
      }
      if (this.formIsCompleted && !this.$store.state.acomodData.isTest) {
        return 'background: #FFA04F'
      }
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
    authUser (status) {
      if (status === true) {
        this.$store.commit('m_loader', false)
        this.nextTo12()
      }
    },
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
    celular (value) { value !== null ? this.celularError = false : null },
    street (value) { value !== null ? this.streetError = false : null },
    streetNumber (value) { value !== null ? this.streetNumberError = false : null },
    neighborhood (value) { value !== null ? this.neighborhoodError = false : null },
    city (value) { value !== null ? this.cityError = false : null },
    state (value) { value !== null ? this.stateError = false : null },
    hash (value) {
      if (value === '') {
        if (this.$store.state.lastHash === `#${this.randomHashs[1]}`) {
          this.$store.commit('m_cadastroAcomod0', true)
          this.$store.commit('m_cadastroAcomod1', false)
        } else {
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
      } 
      if (value === `#${this.randomHashs[1]}`) {
        this.$store.commit('m_cadastroAcomod1', true)
        this.$store.commit('m_cadastroAcomod2', false)
      } 
      if (value === `#${this.randomHashs[2]}`) {
        this.$store.commit('m_cadastroAcomod2', true)
        if (this.$store.getters.tipoAcomodCampingHostel) {
          this.$store.commit('m_cadastroAcomod4', false)
        } else {
          this.$store.commit('m_cadastroAcomod3', false)
        }
      } 
      if (value === `#${this.randomHashs[3]}`) {
        this.$store.commit('m_cadastroAcomod3', true)
        this.$store.commit('m_cadastroAcomod4', false)
      } 
      if (value === `#${this.randomHashs[4]}`) {
        this.$store.commit('m_cadastroAcomod4', true)
        this.$store.commit('m_cadastroAcomod5', false)
      } 
      if (value === `#${this.randomHashs[5]}`) {
        this.$store.commit('m_cadastroAcomod5', true)
        this.$store.commit('m_cadastroAcomod6', false)
      } 
      if (value === `#${this.randomHashs[6]}`) {
        this.$store.commit('m_cadastroAcomod6', true)
        this.$store.commit('m_cadastroAcomod7', false)
      } 
      if (value === `#${this.randomHashs[7]}`) {
        this.$store.commit('m_cadastroAcomod7', true)
        this.$store.commit('m_cadastroAcomod8', false)
      } 
      if (value === `#${this.randomHashs[8]}`) {
        this.$store.commit('m_cadastroAcomod8', true)
        this.$store.commit('m_cadastroAcomod9', false)
      } 
      if (value === `#${this.randomHashs[9]}`) {
        this.$store.commit('m_cadastroAcomod9', true)
        this.$store.commit('m_cadastroAcomod10', false)
      } 
      if (value === `#${this.randomHashs[10]}`) {
        this.$store.commit('m_cadastroAcomod10', true)
        if (this.authUser) {
          this.$store.commit('m_cadastroAcomod12', false)
        } else {
          this.$store.commit('m_cadastroAcomod11', false)
        }
      } 
      if (value === `#${this.randomHashs[11]}`) {
        if (this.authUser) {
          this.$store.commit('m_cadastroAcomod12', false)
          this.$store.commit('m_cadastroAcomod10', true)
        }
      } 
      if (value === `#${this.randomHashs[12]}`) {
        this.$store.commit('m_cadastroAcomod12', true)
        this.$store.commit('m_cadastroAcomod11', false)
      } 
    }
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      try {
        /* Prevenir bug em caso de F5 */
        if (!vm.$store.state.cadastroAcomod0 && !vm.$store.state.cadastroAcomod1 && !vm.$store.state.cadastroAcomod2 && !vm.$store.state.cadastroAcomod3 && !vm.$store.state.cadastroAcomod4 && !vm.$store.state.cadastroAcomod5 && !vm.$store.state.cadastroAcomod6 && !vm.$store.state.cadastroAcomod7 && !vm.$store.state.cadastroAcomod8 && !vm.$store.state.cadastroAcomod9 && !vm.$store.state.cadastroAcomod10 && !vm.$store.state.cadastroAcomod11 && !vm.$store.state.cadastroAcomod12) {
          vm.$store.commit('m_cadastroAcomod0', true)
        }
        if (vm.$store.state.showFoobar === true) {
          vm.$store.commit('m_showFoobar', false)
        }
        if (vm.$store.state.acomodData.acomodID === null) {
          let acomodID = await Math.floor(Math.random() * (9999 - 1000 + 1) + 1000).toString()
          const acomod = await firebase.firestore().doc(`acomods/${acomodID}`).get()
          if (acomod.exists) {
            do {
              acomodID = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000).toString()
              vm.$store.commit('m_acomodID', acomodID)
            } while (!acomod.exists)
          } else {
            vm.$store.commit('m_acomodID', acomodID)
          }
        }
      } catch (err) {
        console.log(err)
      }
    })
  },
  beforeRouteLeave (to, from, next) {
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
    next()
  }
}
</script>

<style scoped>

.anunciar-acomodacao {
  margin-top: var(--navbarHeightMobile);
  transition: var(--pages-transition);
  & .progress-bar {
    position: fixed;
    top: var(--navbarHeightMobile);
    height: 4px;
    z-index: 8888;
    background: var(--colorAcomod);
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
        background: var(--colorAcomod);
        border-radius: 100px;
        font-size: 17px;
        font-weight: 700;
      }
    }
  }
  /* ******************** CADASTRO ACOMODAÇÃO ******************** */
  & .cadastro-acomodacao {
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
      font-weight: 700;
      user-select: none;
    }
    & p {
      font-size: 17px;
      padding: .5rem 7% .2rem;
      line-height: 26px;
    }
    & .__termos {
      font-size: 15px;
      font-weight: 500;
      & a {
        color: var(--colorAcomod);
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
      font-weight: 700;
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
    & .quartos {
      display: flex;
      flex-flow: column;
      align-items: center;
      margin: 1.6rem 7% 0;
      & .quarto {
        border: 1px solid #dedede;
        width: 100%;
        transition: var(--main-transition);
        border-radius: 12px;
        margin-bottom: 1.7rem;
        & .quarto-body {
          position: relative;
          display: flex;
          flex-flow: column;
          & .__name {
            padding: .8rem 1.2rem;
            border: none;
            border-bottom: 1px solid #dedede;
            border-radius: 12px 12px 0 0;
            width: 100%;
            cursor: text;
            outline: none;
            font-size: 17px;
            font-weight: 700;
          }
          & .questions {
            display: flex;
            flex-flow: column;
            margin: .8rem 1.2rem;
            & .question {
              margin: .5rem 0;
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
          & .mobilias {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
            grid-auto-rows: 1fr;
            grid-gap: 12px;
            margin: .4rem 1.2rem 1.2rem;
            & .mobilia {
              position: relative;
              cursor: pointer;
              display: flex;
              flex-flow: column;
              align-items: center;
              justify-content: center;
              border: 1px solid #dedede;
              border-radius: 10px;
              padding: 1rem;
              transition: var(--main-transition);
              & .remove-mobilia {
                cursor: pointer;
                position: absolute;
                top: 8px;
                right: 8px;
                width: .7rem;
                height: auto;
              }
              & p {
                padding-top: 10px;
                text-align: center;
                font-size: 14px;
                font-weight: 500;
                line-height: 1.1;
              }
            }
            & .mobilia:hover {
              border: 1px solid #343434;
            }
            & .add-mobilia {
              cursor: pointer;
              display: flex;
              flex-flow: column;
              align-items: center;
              justify-content: center;
              border: 1px solid #dedede;
              border-radius: 10px;
              padding: 1rem;
              transition: var(--main-transition);
              & p {
                padding-top: 10px;
                text-align: center;
                font-size: 14px;
                font-weight: 500;
                line-height: 1.25;
              }
            }
            & .add-mobilia:hover {
              border: 1px solid #343434;
            }
          }
          & .mobilias::before {
            content: '';
            width: 0;
            padding-bottom: 100%;
            grid-row: 1 / 1;
            grid-column: 1 / 1;
          }
          & .mobilias > *:first-child {
            grid-row: 1 / 1;
            grid-column: 1 / 1;
          }
        }
      }
    }
    & .comodidades-box {
      padding: 0 7%;
    }
    & .item-form-switches {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #dedede;
      padding: 2.2rem 0;
      transition: .2s;
      & .desc {
        display: flex;
        align-items: center;
        margin-right: 1rem;
        & .__img {
          width: 1.8rem;
          height: auto;
          margin-right: 1rem;
        }
        & .__name {
          user-select: none;
          font-size: 17px;
        }
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
        background: var(--colorAcomod);
      }
    }
    & .item-form-switches:last-child {
      border-bottom: none;
    }
    & .regras-box {
      padding: .5rem 7% 0;
      & .new-regras {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .5rem 0;
        & .__regra-text {
          font-size: 17px;
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
          font-size: 18px;
          font-weight: 400;
          background: white;
          color: var(--color01);
          padding: 1rem 0;
          border: none;
          border-bottom: 1px solid #dedede;
          outline: none;
        }
        & .__add-btn {
          background-image: url('./../../../assets/img/add-image.svg');
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: 21px;
          background-color: white;
          font-weight: 500;
          border-bottom: 1px solid #dedede;
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
      color: var(--colorAcomod);
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
    & .__croppa-btn {
      margin: .4rem 0;
      font-size: 16px;
      font-weight: 700;
      background: var(--colorAcomod);
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
        margin: .7rem 0;
        height: 3.4rem;
        text-align: start;
        padding-left: 55px;
        font-size: 15px;
      }
      & .google-btn {
        width: 17rem;
        margin: .7rem 0;
        height: 3.4rem;
        text-align: start;
        padding-left: 55px;
        font-size: 15px;
      }
      & .email-btn {
        width: 17rem;
        margin: .7rem 0;
        height: 3.4rem;
        text-align: start;
        padding-left: 55px;
        font-size: 15px;
      }
    }
    & .signin-email {
      display: flex;
      flex-flow: column;
    }
    & .payment-box {
      display: flex;
      flex-flow: column;
      padding-top: 1rem;
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
          font-weight: 700;
          border-radius: 2rem 0 0 2rem;
          background: white;
        }
        & .__next {
          font-size: 16px;
          font-weight: 700;
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
  .anunciar-acomodacao {
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
          background: var(--colorAcomod);
          border-radius: 100px;
          font-size: 17px;
          font-weight: 700;
        }
      }
    }
    & .cadastro-acomodacao {
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
      & .quartos {
        margin: 1.6rem 28% 0;
        & .quarto {
          & .quarto-body {
            & .__name {
            }
            & .questions {
              flex-flow: row;
              align-items: center;
              justify-content: space-between;
              margin: 1.1rem 1.4rem;
              & .question {
                margin: 0;
                & label {
                }
                & input {
                }
                & select {
                }
              }
            }
            & .mobilias {
              & .mobilia {
                & .remove-mobilia {
                  display: none;
                  transition: var(--main-transition);
                }
                & p {
                  padding-top: 8px;
                  font-size: 13px;
                }
              }
              & .mobilia:hover {
                border: 1px solid #343434;
              }
              & .mobilia:hover > .remove-mobilia {
                display: block;
              }
              & .add-mobilia {

                & p {
                  padding-top: 8px;
                  font-size: 13px;
                }
              }
              & .add-mobilia:hover {
                border: 1px solid #343434;
              }
            }
          }
        }
      }
      & .comodidades-box {
        padding: .6rem 28% 0;
      }
      & .item-form-switches {
        padding: 2rem 0;
        & .desc {
          & .__img {
          }
          & .__name {
          }
        }
      }
      & .item-form-switches:hover {
        border-bottom: 1px solid var(--color01);
      }
      & .regras-box {
        padding: .6rem 28% 0;
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
        padding: .8rem 39% 0;
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
      & .signin-email {
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
            font-weight: 700;
          }
        }
      }
    }
  }
}

input[type="password"] {
  font: small-caption;
  font-size: 20px;
}

.has-error-label {
  color:#FF0134 !important;
}
.has-error {
  color:#FF0134 !important;
  border-bottom: 1px solid #FF0134 !important;
}


/* Mobílias transitions */
.mobilias-animation-enter {
  opacity: 0;
}
.mobilias-animation-leave-to {
  opacity: 0;
}
.mobilias-animation-leave-active {
  opacity: 0;
  transform: scale(.94);
}

</style>
