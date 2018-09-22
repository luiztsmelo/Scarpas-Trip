<template>
  <modal
    name="offline-modal"
    class="offline"
    :width="$store.state.isMobile ? '70%' : '24%'"
    height="auto"
    :clickToClose="false">


    <div class="offline-body">

      <img class="img" src="../assets/img/offline.svg" draggable="false">

      <h1 class="title">Offline</h1>

      <h3 class="subtitle">Tente reconectar sua internet</h3>

    </div>
    

  </modal>
</template>

<script>
export default {
}
</script>

<style scoped>

.offline {
  & .offline-body {
    padding: 2.3rem;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    & .img {
      width: 5.5rem;
      height: auto;
    }
    & .title {
      text-align: center;
      padding: 1rem 0 .8rem;
      user-select: none;
      font-size: 32px;
      font-weight: 700;
    }
    & .subtitle {
      line-height: 23px;
      text-align: center;
      user-select: none;
    }
  }
}

@media (min-width: 1024px) {
  .offline {
    & .offline-body {
      & .img {
        width: 5.5rem;
      }
      & .title {
        font-size: 36px;
      }
      & .subtitle {
      }
    }
  }
}
</style>