<template>
  <transition name="proprietario-animation">
    <div class="proprietario-modal" v-if="$store.state.showProprietario">
      <div class="proprietario-body">

        <!-- BACK BUTTON -->
        <div class="back-bar">
          <div class="back-box" @click="backBtn">
            <img class="__back-btn" src="../assets/img/back.svg" alt="voltar">
          </div>
        </div><!-- BACK BUTTON -->

        <div class="info-header">
          <img class="__img" :src="photoURL">
          <h1 class="__name">{{ name }}</h1>
        </div>

        <!-- <div class="info-contato">
          <h2 class="info-title">Mandar E-mail</h2>
          <h3 class="__email"><a :href="emailHREF" class="__email">{{ email }}</a></h3>

          <h2 class="info-title">Ligar no Celular</h2>
          <h3><a :href="celularHREF" class="__celular">{{ celular }}</a></h3>

          <h2 class="info-title">Chamar no WhatsApp</h2>
          <h3><a :href="whatsAppHREF" class="__celular">{{ celular }}</a></h3>
        </div> -->

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    backBtn () {
      this.$store.commit('m_showProprietario', false)
      window.history.back(1)
    }
  },
  computed: {
    hash () {
      return this.$route.hash
    },
    acomod () {
      return this.$store.state.acomod
    },
    passeio () {
      return this.$store.state.passeio
    },
    photoURL () {
      return this.$route.name === 'acomodacoes-id' ? this.acomod.photoURL 
           : this.$route.name === 'passeios-id' ? this.passeio.photoURL
           : ''
    },
    name () {
      return this.$route.name === 'acomodacoes-id' ? this.acomod.proprietario 
           : this.$route.name === 'passeios-id' ? this.passeio.proprietario
           : ''
    },
    email () {
      return this.$route.name === 'acomodacoes-id' ? this.acomod.email 
           : this.$route.name === 'passeios-id' ? this.passeio.email
           : ''
    },
    emailHREF () {
      return this.$route.name === 'acomodacoes-id' ? 'mailto:' + this.acomod.email 
           : this.$route.name === 'passeios-id' ? 'mailto:' + this.passeio.email
           : ''
    },
    celular () {
      return this.$route.name === 'acomodacoes-id' ? this.acomod.celular 
           : this.$route.name === 'passeios-id' ? this.passeio.celular
           : ''
    },
    celularHREF () {
      return this.$route.name === 'acomodacoes-id' ? 'tel:' + this.acomod.celular 
           : this.$route.name === 'passeios-id' ? 'tel:' + this.passeio.celular
           : ''
    },
    whatsAppHREF () {
      if (this.$route.name === 'acomodacoes-id') {
        let tel = this.acomod.celular
        let DDD = tel.slice(1, 3)
        let firstNumber = tel.slice(5,10)
        let lastNumber = tel.slice(11,15)
        let whatsAppTelFormat = '+55' + DDD + firstNumber + lastNumber
        return 'https://api.whatsapp.com/send?phone=' + whatsAppTelFormat
      }
      if (this.$route.name === 'passeios-id') {
        let tel = this.passeio.celular
        let DDD = tel.slice(1, 3)
        let firstNumber = tel.slice(5,10)
        let lastNumber = tel.slice(11,15)
        let whatsAppTelFormat = '+55' + DDD + firstNumber + lastNumber
        return 'https://api.whatsapp.com/send?phone=' + whatsAppTelFormat
      }
    }
  }, 
  watch: {
    hash (value) {
      if (value === '') {
        this.$store.commit('m_showProprietario', false)
      }
    }
  }
}
</script>

<style>
@import url('~/assets/css/main.css');

.proprietario-modal {
  position: fixed;
  z-index: 9999;
  overflow-y: auto;
  width:  100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
  transition: var(--main-transition);
  & .back-bar {
    position: fixed;
    top: 0;
    left: 0;
    width:  100%;
    height: 3.2rem;
    background: white;
    & .back-box {
      display: inline-flex;
      align-items: center;
      height: 100%;
      padding: 0 7%;
      & .__back-btn {
        cursor: pointer;
        width: 1.35rem;
        height: auto;
      }
    }
  }
  & .proprietario-body {
    display: flex;
    flex-flow: column;
    height: 100%;
    & .info-header {
      display: flex;
      flex-flow: column;
      align-items: center;
      & .__img {
        width: 6rem;
        height: auto;
        border-radius: 50%;
        margin-top: 3.6rem;
        text-align: center;
      }
      & .__name {
        font-size: 30px;
        padding: 1rem 0 1.8rem 0;
      }
    }
    & .info-contato {
      padding: 0 7%;
      display: flex;
      flex-flow: column;
      align-items: center;
      & .info-title {
        font-size: 15px;
        padding: 1.5rem 0 .1rem 0;
      }
      & .__email {
        font-size: 17px;
        color: #00BAAC;
        user-select: none;
      }
      & .__celular {
        font-size: 16px;
        color: #00BAAC;
        user-select: none;
      }
    }
  }
}

/* TRANSITIONS */
.proprietario-animation-enter {
  transform: translateY(100%);
}
.proprietario-animation-leave-active {
  transform: translateY(100%);
}
</style>