<template>
  <transition name="host-animation">
    <div class="host-modal" v-if="$store.state.showHost">
      <div class="host-body">


        <img class="back-btn" src="../assets/img/back.svg" @click="backBtn" ref="backBtn">


        <div class="head">
          <img class="__host-img" :src="host.photoURL">

          <h1 class="__host-name">{{ host.fullName }}</h1>

          <p class="__host-member">Membro desde {{ createdAt }}</p>

   

          <h3 class="__subtitle">Entre em contato com {{ host.firstName }} para negociarem os detalhes da reserva.</h3>
        </div>


        <div class="contatos">

          <div class="contato">
            <img class="__img" src="../assets/img/whatsapp.svg">
            <a class="__link" :style="linkColor" :href="`https://api.whatsapp.com/send?phone=${host.celular.replace(/[^0-9\.]+/g, '')}`" target="_blank">WhatsApp</a>
          </div>

          <div class="contato">
            <img class="__img" src="../assets/img/phone.svg">
            <a class="__link" :style="linkColor" :href="`tel:+${host.celular.replace(/[^0-9\.]+/g, '')}`" target="_blank">Celular</a>
          </div>

          <div class="contato" v-if="host.instagram !== undefined">
            <img class="__img" src="../assets/img/instagram.svg">
            <a class="__link" :style="linkColor" :href="`https://www.instagram.com/${host.instagram.substring(1)}/`" target="_blank">Instagram</a>
          </div>

          <div class="contato" style="border:none">
            <img class="__img" src="../assets/img/email.svg">
            <a class="__link" :style="linkColor" :href="`mailto:${host.email}`" target="_blank">E-mail</a>
          </div>

        </div>



      </div>
    </div>
  </transition>
</template>

<script>
import format from 'date-fns/format'
import pt from 'date-fns/locale/pt'

export default {
  methods: {
    backBtn () {
      this.$store.commit('m_showHost', false)
      window.history.back(1)
    }
  },
  computed: {
    hash () { return this.$route.hash },
    acomod () { return this.$store.state.acomod },
    host () { return this.$store.state.host },
    createdAt () {
      return format(this.host.createdAt, 'MMMM [de] YYYY', { locale: pt })
    },
    linkColor () {
      if (this.$route.name === 'acomodacoes-id') {
        return 'color: #FFA04F'
      }
      if (this.$route.name === 'passeios-id') {
        return 'color: #198CFE'
      }
    }
  }, 
  watch: {
    hash (value) {
      if (value === '') {
        this.$store.commit('m_showHost', false)
      }
    }
  }
}
</script>

<style>

.host-modal {
  position: fixed;
  z-index: 9999;
  max-height: 100%;
  overflow-y: auto;
  width: 100%;
  top: 0;
  left: 0;
  background: white;
  transition: var(--main-transition);
  & .back-btn {
    margin: 1rem 7%;
    cursor: pointer;
    width: 1.27rem;
    height: auto;
  }
  & .host-body {
    display: flex;
    flex-flow: column;
    padding-bottom: 4rem;
    & .head {
      display: flex;
      flex-flow: column;
      align-items: center;
      padding: 1rem 7% 0;
      & .__host-img {
        width: 6.2rem;
        height: auto;
        border-radius: 50%;
        text-align: center;
      }
      & .__host-name {
        font-size: 34px;
        padding: 1rem 0 .2rem;
        text-align: center;
      }
      & .__host-member {
        text-align: center;
        font-size: 15px;
        padding-bottom: 1.2rem;
      }
      & .__subtitle {
        text-align: center;
      }
    }
    & .contatos {
      padding: .8rem 7% 0;
      & .contato {
        display: flex;
        align-items: center;
        padding: 1.7rem 0;
        border-bottom: 1px solid #dedede;
        & .__img {
          width: 1.8rem;
          height: auto;
          margin-right: .8rem;
        }
        & .__link {
          font-size: 17px;
          font-weight: 500;
        }
      }
    }
  }
}

/* TRANSITIONS */
.host-animation-enter, .host-animation-leave-active {
  transform: translateY(100%);
}

</style>