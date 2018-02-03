<template>
  <transition name="proprietario-animation">
    <div class="proprietario-modal" v-if="$store.state.showProprietario">
      <div class="proprietario-body">

        <!-- BACK BUTTON -->
        <div class="back-box">
          <div class="back-body">
            <img class="__back-btn" src="../assets/img/back.svg" alt="voltar" @click="$store.state.showProprietario = false">
          </div>
        </div><!-- BACK BUTTON -->

        <div class="info-header">
          <img class="__img" :src="photoURL">
          <h1 class="__name">{{ name }}</h1>
        </div>

        <div class="info-contato">
          <h2 class="info-title">E-mail</h2>
          <h3 class="__email"><a :href="emailHREF" class="__email">{{ email }}</a></h3>

          <h2 class="info-title">Celular</h2>
          <h3><a href="https://api.whatsapp.com/send?phone=5534991410085" class="__celular">{{ celular }}</a></h3>
        </div>

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
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
    }
  }
}
</script>

<style>
@import url('../assets/css/main.css');

.proprietario-modal {
  position: fixed;
  z-index: 9999;
  overflow-y: auto;
  width:  100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
  transition: var(--menus-transition);
  & .back-box {
    position: fixed;
    background: white;
    width:  100%;
    & .back-body {
      display: flex;
      height: 3rem;
      & .__back-btn {
        align-items: center;
        transform: translateY(2px);/* A imagem ta errada */
        cursor: pointer;
        width: 1.05rem;
        height: auto;
        filter: invert(75%);
        margin-left: 7%;
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
        width: 7rem;
        height: 7rem;
        border-radius: 50%;
        margin-top: 3.5rem;
        text-align: center;
      }
      & .__name {
        font-size: 27px;
        padding: 1rem 0 2rem 0;
      }
    }
    & .info-contato {
      padding: 0 7%;
      & .info-title {
        font-size: 15px;
        padding-top: .5rem;
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