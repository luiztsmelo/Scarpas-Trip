<template>
  <transition name="share-animation">
    <div class="share" v-show="showShare">
      <div class="share-body">

        <div class="back-box">
          <img class="__back-btn" src="../assets/img/back.svg" alt="voltar" @click="$store.commit('m_showShare', false)">
        </div>

        <h1 class="__title">Compartilhar</h1>

        <div class="share-item" @click="whatsappShare">
          <img class="__img whatsapp" src="../assets/img/whatsapp.svg">
          <a class="__text" ref="whatsapp" :href="'whatsapp://send?text= https://escarpastrip.com/' + this.$route.params.id">Whatsapp</a>
        </div>

        <div class="share-item" @click="messengerShare">
          <img class="__img messenger" src="../assets/img/messenger.svg">
          <a class="__text" ref="messenger" :href="'fb-messenger://share/?link= https://escarpastrip.com/' + this.$route.params.id">Messenger</a>
        </div>


      </div> 
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    whatsappShare () {
      this.$refs.whatsapp.click()
    },
    messengerShare () {
      this.$refs.messenger.click()
    }
  },
  computed: {
    showShare () {
      return this.$store.state.showShare
    }
  }
}
</script>

<style>
@import url('../assets/css/main.css');

.share {
  position: fixed;
  z-index: 9999;
  overflow: hidden;
  width:  100%;
  height: 100%;
  top: 0;
  background: white;
  transition: var(--menus-transition);
  & .share-body {
    display: flex;
    flex-flow: column;
    padding: 0 7%;
    height: 100%;
    & .back-box {
      display: flex;
      height: 3rem;
      width:  100%;
      & .__back-btn {
        align-items: center;
        transform: translateY(2px);/* A imagem ta errada */
        cursor: pointer;
        width: 1.05rem;
        height: auto;
        filter: invert(75%);
      }
    }
    & .__title {
      margin: 2rem 0 2rem 0;
      font-size: 31px;
      font-weight: 700;
    }
    & .share-item { 
      display: flex;
      flex-flow: row;
      align-items: center;
      padding: 1.1rem 0;
      border-bottom: 1px solid rgb(222, 222, 222);
      & .__img {
        margin-right: 1rem;
        width: 1.8rem;
        height: auto;
      }
      & .__text {
        font-size: 16px;
        font-weight: 400;
      }
    }
  }
}

/* TRANSITIONS */
.share-animation-enter {
  transform: translateY(100%);
}
.share-animation-leave-active {
  transform: translateX(100%);
}
</style>