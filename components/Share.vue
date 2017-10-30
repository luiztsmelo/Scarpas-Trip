<template>
  <transition name="share-animation">
    <div class="share" v-show="showShare" @click="$store.commit('m_showShare', false)">
      <div class="share-body">
        <h1>Compartilhe</h1>

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
    padding: 2rem 7%;
    height: 100%;
  }
}

/* TRANSITIONS */
.share-animation-enter,
.share-animation-leave-active {
  transform: translateY(100%);
}
</style>