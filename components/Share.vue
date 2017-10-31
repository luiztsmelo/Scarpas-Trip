<template>
  <transition name="share-animation">
    <div class="share" v-show="showShare" @click="$store.commit('m_showShare', false)">
      <div class="share-body">
        <h1 class="__title">Compartilhar</h1>

        <div class="share-item">
          <img class="__img whatsapp" src="../assets/img/whatsapp.svg" alt="">
          <a class="__text" :href="'whatsapp://send?text= http://escarpas-trip.herokuapp.com/eventos/' + this.$route.params.id">Whatsapp</a>
        </div>

        <div class="share-item">
          <img class="__img messenger" src="../assets/img/messenger.svg" alt="">
          <a class="__text" :href="'fb-messenger://share/?link= http://escarpas-trip.herokuapp.com/eventos/' + this.$route.params.id">Messenger</a>
        </div>


      </div> 
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    showShare () {
      return this.$store.state.showShare
    }
  }
}
</script>

<style scoped>
@import url('../assets/css/main.css');

.share {
  position: fixed;
  z-index: 4;
  width:  100%;
  height: 100%;
  top: 42%;
  background: white;
  overflow: hidden;
  box-shadow: 0px -2px 22px 0px rgba(0,0,0,1);
  transition: all .3s ease;
  & .share-body {
    display: flex;
    flex-flow: column;
    padding: 0 7%;
    height: 100%;
    & .__title {
      text-align: center;
      margin: 2rem 0 1rem 0;
      font-weight: 600;
    }
    & .share-item { 
      display: flex;
      flex-flow: row;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid rgb(210, 210, 210);
      & .__img {
        margin-right: 1rem;
        width: 1.7rem;
        height: auto;
      }
      & .whatsapp {
        transform: scale(1.17);
      }
      & .__text {
        font-size: 18px;
        font-weight: 300;
      }
    }
  }
}

/* TRANSITIONS */
.share-animation-enter,
.share-animation-leave-active {
  transform: translateY(100%);
}
</style>