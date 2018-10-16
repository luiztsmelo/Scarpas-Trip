<template>
  <div class="roteiro" :style="{ backgroundImage: 'url(' + bgimg + ')'}">
    
    <div class="roteiro-container">
      


      <h1 class="headline">Encontre tudo para sua viagem a Capitólio e região!</h1>



      <form class="roteiro-form">

        <button class="datas-btn" type="button">Chegada / Partida</button>

        <button class="hospedes-btn" type="button">1 Hóspede</button>

        <button class="buscar-btn" type="button">Buscar</button>

      </form>
  


    </div>

  </div>     
</template>

<script>
import supportsWebP from 'supports-webp'

export default {
  computed: {
    bgimg () {
      return supportsWebP ? require('@/assets/img/bgimg.webp') : require('@/assets/img/bgimg.jpg')
    }
  }
}
</script>

<style>

.roteiro {
  width: 100%;
  height: 13rem;
  background-repeat: no-repeat;
  background-size: cover;
  & .roteiro-container {
    background: rgba(0,0,0,.4);
    padding: 1rem 0;
    position: relative;
    display: flex;
    flex-flow: column;
    z-index: 2;
    height: 100%;
    width: 100%;
    justify-content: center;
    & .headline {
      display: flex;
      flex-flow: column;
      padding: 0 7%;
      color: white;
      font-size: 20px;
      font-weight: 600;
      line-height: 30px;
      user-select: none;
    }
  }
}




@media (min-width: 1024px) {
  .roteiro {
    height: 29.5rem;
    background-attachment: fixed;
    background-position: center;
    & .roteiro-container {
      display: flex;
      flex-flow: column;
      align-items: center;
      background: rgba(0,0,0, .2);
      & .headline {
        padding: 0 24% 3rem;
        width: 100%;
        font-size: 38px;
        font-weight: 500;
        line-height: 50px;
        text-align: center;
      }
      & .roteiro-form {
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        height: 3.4rem;
        width: 34rem;
        border-radius: 6px;
        & .datas-btn {
          height: 100%;
          flex: 40%;
          overflow: hidden;
          background: transparent;
          font-weight: 500;
        }
        & .hospedes-btn {
          height: 100%;
          flex: 33%;
          background: transparent;
          font-weight: 500;
          border-left: 1px solid #dedede;
          border-right: 1px solid #dedede;
        }
        & .buscar-btn {
          height: 100%;
          flex: 33%;
          background: var(--colorAcomod);
          color: white;
          font-weight: 600;
          border-radius: 0 6px 6px 0;
        }
      }
    }
  }  
}
</style>