<template>
  <transition name="host-animation">
    <div class="host-modal" v-if="$store.state.showHost">
      <div class="host-body">


        <img class="back-btn" src="../assets/img/back.svg" @click="backBtn" ref="backBtn">


        <div class="head">
          <img class="__host-img" :src="host.photoURL">

          <h1 class="__host-name">{{ host.fullName }}</h1>

          <p class="__host-member">Membro desde {{ createdAt }}</p>

          <div class="rating">
            <star-rating
              :rating="4.5"
              :increment="0.1"
              :read-only="true"
              :show-rating="false"
              active-color="#161616"
              inactive-color="#dedede"
              :star-size="18"
              :padding="3">
            </star-rating>
            <p class="rating-number">Ótimo</p>
          </div>

          <h3 class="__subtitle">Entre em contato com {{ host.firstName }} para negociar os detalhes da reserva.</h3>
        </div>


        <div class="contatos">

          <div class="contato">
            <h3 class="__label">WhatsApp</h3>
            <a class="__link" href="https://api.whatsapp.com/send?phone=5534991410085" target="_blank">+5534991410085</a>
          </div>

          <div class="contato">
            <h3 class="__label">Celular</h3>
            <a class="__link" href="tel:+5534991410085" target="_blank">+5534991410085</a>
          </div>

          <div class="contato">
            <h3 class="__label">Instagram</h3>
            <a class="__link" href="https://www.instagram.com/tarcisiosmelo/" target="_blank">@tarcisiosmelo</a>
          </div>

          <div class="contato" style="border:none">
            <h3 class="__label">E-mail</h3>
            <a class="__link" :href="`mailto:${host.email}`" target="_blank">{{ host.email }}</a>
          </div>

        </div>



      </div>
    </div>
  </transition>
</template>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

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
      const month = dayjs(this.host.createdAt).format('MMMM')
      const year = dayjs(this.host.createdAt).format('YYYY')
      return month.toLowerCase() + ' de ' + year
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
        width: 6rem;
        height: auto;
        border-radius: 50%;
        text-align: center;
      }
      & .__host-name {
        font-size: 31px;
        padding: 1rem 0 .2rem;
        text-align: center;
      }
      & .__host-member {
        text-align: center;
        font-size: 15px;
      }
      & .rating {
        display: flex;
        align-items: center;
        margin: 1rem 0;
        & .rating-number {
          font-size: 16px;
          font-weight: 600;
          padding-left: 3px;
        }
      }
      & .__subtitle {
        text-align: center;
      }
    }
    & .contatos {
      padding: .8rem 7% 0;
      & .contato {
        display: flex;
        flex-flow: column;
        align-items: center;
        padding: 1.5rem 0;
        border-bottom: 1px solid #dedede;
        & .__label {
          padding-bottom: .5rem;
          font-size: 15px;
          font-weight: 500;
        }
        & .__link {
          font-size: 18px;
          font-weight: 500;
          color: var(--colorPasseio);
        }
      }
    }
  }
}

/* TRANSITIONS */
.host-animation-enter {
  transform: translateX(100%);
}
.host-animation-leave-active {
  transform: translateX(100%);
}
</style>