<template>
  <transition name="share-animation">
    <div class="share" v-show="showShare" @click="$store.commit('m_showShare', false)">
      <div class="share-body">
        <h1 class="__title">Compartilhar</h1>

        <social-sharing 
          url="https://vuejs.org/" 
          title="The Progressive JavaScript Framework"
          description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
          quote="Vue is a progressive framework for building user interfaces."
          hashtags="vuejs,javascript,framework"
          twitter-user="vuejs"
          inline-template>
          <ul class="share-box">
            <li class="__share-item">
              <network network="whatsapp">
                Whatsapp
              </network>
            </li>
            <li class="__share-item">
              <network network="facebook">
                Facebook
              </network>
            </li>
            <li class="__share-item">
              <network network="twitter">
                Twitter
              </network>
            </li>
          </ul>
        </social-sharing>

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