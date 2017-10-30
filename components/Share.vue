<template>
  <transition name="share-animation">
    <div class="share" v-show="showShare" @click="$store.commit('m_showShare', false)">
      <div class="share-body">
        <h1 class="__title">Compartilhar</h1>

        <a href="fb-messenger://share/?link= https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fsharing%2Freference%2Fsend-dialog&app_id=123456789">Messenger</a>

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
  transition: all .3s ease;
  & .share-body {
    display: flex;
    flex-flow: column;
    text-align: center;
    padding: 2rem 7% 0 7%;
    height: 100%;
    & .__title {
      font-weight: 600;
    }
    & .share-box {
      padding: 0;
      display: flex;
      flex-flow: column;
      margin: 2rem 0;
      & .__share-item {
        padding: 1rem 0;
        font-size: 20px;
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